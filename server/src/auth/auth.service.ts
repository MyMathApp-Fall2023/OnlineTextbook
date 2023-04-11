import { Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { JwtService} from "@nestjs/jwt";
import {Exclude, plainToClass, Transform} from "@nestjs/class-transformer";
import {User} from "../user/entities/user.entity";


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService:JwtService
    ) {}

    async validateUserByEmail(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne(email);
        // todo fix @exclude
        if (user && user.password === password) {
           const { password, googleAccessToken, temporaryPassword, activationCode, ...result} = user
            return result
        }
        return null;
    }

    async login(user:any) {
        const payload = {email: user.email, sub: user.id, role:user.role}
        return {
            user:user,
            access_token: this.jwtService.sign(payload)
        }
    }


}
