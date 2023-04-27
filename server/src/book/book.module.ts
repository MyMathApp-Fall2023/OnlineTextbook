import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import {RecordModule} from "../record/record.module";

@Module({
  imports:[RecordModule],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
