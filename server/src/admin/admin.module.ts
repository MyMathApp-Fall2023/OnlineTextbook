import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import {UserModule} from "../user/user.module";
import {RolesGuard} from "../auth/guards/roles.guard";
import { PurchaseCodeModule } from 'src/purchaseCode/purchaseCode.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import {EmailSubscriptionModule} from "../email-subscription/email-subscription.module";


@Module({
  imports:[UserModule, PurchaseCodeModule, TransactionModule,EmailSubscriptionModule],
  controllers: [AdminController],
  providers:[RolesGuard]
})
export class AdminModule {}
