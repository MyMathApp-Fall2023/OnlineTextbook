import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import {RecordModule} from "../record/record.module";
import {EmailSubscriptionModule} from "../email-subscription/email-subscription.module";

@Module({
  imports:[RecordModule,EmailSubscriptionModule],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
