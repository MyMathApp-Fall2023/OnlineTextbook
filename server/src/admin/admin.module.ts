import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import {UserModule} from "../user/user.module";
import {RolesGuard} from "../auth/guards/roles.guard";

@Module({
  imports:[UserModule],
  controllers: [AdminController],
  providers:[RolesGuard]
})
export class AdminModule {}
