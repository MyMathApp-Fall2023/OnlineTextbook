import { Module } from '@nestjs/common';
import { PurchaseCodeService } from './purchase-code.service';
import { PurchaseCodeController } from './purchase-code.controller';
import { PurchaseCode} from "./entities/purchase-code.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports:[TypeOrmModule.forFeature([PurchaseCode])],
  controllers: [PurchaseCodeController],
  providers: [PurchaseCodeService]
})
export class PurchaseCodeModule {}
