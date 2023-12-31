import {ConflictException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {EmailService} from "../email/email.service";
import {hash, compare} from 'bcrypt';
import { UserDto } from './user.dto';
import { Roles } from 'src/roles/role.enum';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Injectable()
export class UserService {

	constructor(
			@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
			@Inject(forwardRef(()=> EmailService)) private readonly emailService: EmailService,
			@Inject(forwardRef(()=> SubscriptionService)) private readonly subscrService: SubscriptionService,
	) {}

	/**
	 * Returns true if a password repeats a string of 4 or more characters and false if it doesn't
	**/
	doesPasswordRepeat(pass: String): boolean {
		const REP_LIMIT = 4;
		for(let i = 0; i <= pass.length - REP_LIMIT; i++) {
			let searchExp = pass.substring(i, i + REP_LIMIT);
			if(pass.indexOf(searchExp, i+1) != -1)
				return true
		}
		return false
	}

	/**
	 * Inserts a new user into the database after checking that the email address is not already in use
	 **/
	async localSignUp(userFromClient: UserDto): Promise<UserDto> {
		const exists = await this.userRepo.exist({where: {email: userFromClient.email}})
		if (exists) {
			throw new ConflictException("User email address already exists")
		}
		const newUserToCreate = this.userRepo.create(userFromClient)
		if (userFromClient.password) {
			if(userFromClient.password.length < 12 || this.doesPasswordRepeat(userFromClient.password)) {
				throw new ConflictException("User password invalid")
			}
			const hashed = await hash(userFromClient.password, 10)
			newUserToCreate.passwordHash = hashed
		}
		newUserToCreate.role = Roles.User // default to regular user. TODO: allow admin/instructor roles
		newUserToCreate.activatedAccount = false
		newUserToCreate.activationCode = this.generateActivationCode(userFromClient.firstName + userFromClient.lastName)
		const retUserEntity = await this.userRepo.save(newUserToCreate)
		const retUserDTO = this.convertToUserDTO(retUserEntity)
		await this.emailService.sendActivateAccountEmail(retUserDTO)
		return retUserDTO
	}

	/**
	 * Creates an entire group of users at once. Used by instructors to create a class of students
	 **/
	async localSignUpForClass(createUsers: UserDto[]) {
		const createResults: Promise<UserDto>[] = []
		for (const newUser of createUsers) {
			let res = this.localSignUp(newUser)
			createResults.push(res)
		}
		return Promise.all(createResults)
	}

	generateActivationCode(username: string): string {
			return 'MYCode'+ Date.now().toString()+'ncclovekk'
	}

	async authenticate(loginUser: UserDto): Promise<UserEntity> {
		const email = loginUser.email
		const password = loginUser.password
		const user = await this.userRepo.findOne({ where:{email} });
		console.log("in authenticate")
		console.log(user.passwordHash)
		console.log(password)
		const validCredentials = await compare(password, user.passwordHash)
		if (!validCredentials) {
			throw new UnauthorizedException("Incorrect email or password. Please ensure your email and password are correct and try again.")
			// Promise.reject(new UnauthorizedException("Incorrect email or password"))
		}
		return user
	}

	async activateAccount(activationCode: string): Promise<UserEntity | null> {
		const user = await this.userRepo.findOne({ where: { activationCode:activationCode} });
		if (user === null) {
			throw new NotFoundException;
		}
		user.activatedAccount = true;
		await this.userRepo.save(user);
		return user
	}

	async deactivateAccount(userId: number): Promise<UserEntity | null> {
		const user = await this.userRepo.findOne({ where: { userId:userId} });
		if (user === null) {
			throw new NotFoundException;
		}
		user.activatedAccount = false;
		await this.userRepo.save(user);
		return user
	}

	async findAll(): Promise<UserDto[]> {
		const users = await this.userRepo.find()
		const dtoArr = users.map(user => this.convertToUserDTO(user))
		return Promise.resolve(dtoArr)
	}

	async findOneByEmail(email: string): Promise<UserEntity | undefined> {
		const user = await this.userRepo.findOne({where: {email}});
		return user || null;
	}

	async findOneById(id: number): Promise<UserEntity | undefined> {
		const user = await this.userRepo.findOne({where: {userId: id}});
		return user || null;
	}

	async deleteOne(id: number): Promise<void> {
		(await this.userRepo.delete(id))
	}

	/**
	 * Updates a user's profile information, with only the fields that are provided.
	 * User email updates are not currently supported because email is a unique user identifier.
	 */
	async updateOne(user: UserDto): Promise<UserEntity | undefined> {
		const email = user.email;
		const userToUpdate = await this.userRepo.findOne({where: {email: email}});
		if (userToUpdate === null) {
			throw new NotFoundException;
		}
		if (user.email && user.email !== userToUpdate.email) {
			throw new Error("Unsupported Operation: cannot update user email")
		}
		userToUpdate.firstName = user.firstName || userToUpdate.firstName;
		userToUpdate.lastName = user.lastName || userToUpdate.lastName;
		userToUpdate.role = user.role || userToUpdate.role;
		userToUpdate.activatedAccount = user.activatedAccount;
		if (user.password) {
				const hashed = await hash(user.password, 10)
				userToUpdate.passwordHash =  hashed
		}
		await this.userRepo.update(userToUpdate.userId,userToUpdate);
		return userToUpdate
	}

	// password will not be included in the returned DTO
	private convertToUserDTO(user: UserEntity): UserDto {
		let result = new UserDto()
		result.userId = user.userId
		result.firstName = user.firstName
		result.lastName = user.lastName
		result.email = user.email
		result.role = user.role
		result.activatedAccount = user.activatedAccount
		result.createdAt = user.createdAt
		result.updatedAt = user.updatedAt
		return result
	}

}
