import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Record} from "./entities/record.entity";
import { Item } from 'src/item/entities/item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Record, Item])],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService]
})
export class RecordModule {}
