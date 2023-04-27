import { Module } from '@nestjs/common';
import { EmailSubscriptionService } from './email-subscription.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmailSubscription} from "./email-subscription.entity";

@Module({
  imports:[TypeOrmModule.forFeature([EmailSubscription])],
  providers: [EmailSubscriptionService],
  exports:[EmailSubscriptionService]
})
export class EmailSubscriptionModule {}
