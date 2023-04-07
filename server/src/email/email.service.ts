import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../user/entities/user.entity";

@Injectable()
export class EmailService {

    constructor(private readonly userService:UserService) {
    }

    async activateAccount(user:User):Promise<any> {
        console.log(user)
    }
}
