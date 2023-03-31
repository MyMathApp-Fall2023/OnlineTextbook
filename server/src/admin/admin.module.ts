import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import {UserModule} from "../user/user.module";
import {RolesGuard} from "../auth/guards/roles.guard";
import { PurchaseCodeModule } from 'src/purchaseCode/purchaseCode.module';

@Module({
  imports:[UserModule, PurchaseCodeModule],
  controllers: [AdminController],
  providers:[RolesGuard]
})
export class AdminModule {}
