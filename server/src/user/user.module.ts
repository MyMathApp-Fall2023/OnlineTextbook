import { Module } from '@nestjs/common';
import { UserService } from './user.service';

import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {EmailModule} from "../email/email.module";

@Module({
  imports:[TypeOrmModule.forFeature([User]),EmailModule],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
