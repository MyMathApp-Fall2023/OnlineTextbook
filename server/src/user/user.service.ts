import {ConflictException, forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {EmailService} from "../email/email.service";

@Injectable()
export class UserService {

  constructor(
      @InjectRepository(User)
      private readonly userRepo: Repository<User>,  // 使用泛型注入对应类型的存储库实例
      private readonly emailService: EmailService
  ) {}

  async create(createUser: User) {
    const email = createUser.email
    const user = await this.userRepo.findOne({where:{email}})
    if (user != null) {
      throw new ConflictException("User email already exists")
    }
    else {
      createUser.role = 2
      createUser.activationCode = this.generateActivationCode()
      const createResult = await this.userRepo.save(createUser)
      return await this.emailService.sendActivateAccountEmail(createResult)
    }
  }

<<<<<<< HEAD
  async localSignUp(createUser: User) {
    const email = createUser.email
    const user = await this.userRepo.findOne({where:{email}})
    if (user != null) {
      throw new ConflictException("User email address already exists")
    }
    else {
      createUser.role = 2
      createUser.activatedAccount = false
      return this.userRepo.save(createUser)
    }
=======
  generateActivationCode() : string {
      return 'Naomi2049-'+ Date.now().toString()
>>>>>>> temp
  }

  async authenticate(loginUser:User):Promise<User> {
    const email = loginUser.email
    const password = loginUser.password
    const user = await this.userRepo.findOne({ where:{email,password} });
    return user || null;
  }

  async findAll() {
    const users = await this.userRepo.find({
      select:{
        name: true,
        email: true
      }
    })
    return users
  }


  async findOne(email: string):Promise<User |　undefined> {
    const user = await this.userRepo.findOne({where: {email}});
    return user || null;
  }

}
