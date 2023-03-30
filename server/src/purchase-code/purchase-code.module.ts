import { Module } from '@nestjs/common';
import { PurchaseCodeService } from './purchase-code.service';
import { PurchaseCodeController } from './purchase-code.controller';

@Module({
  controllers: [PurchaseCodeController],
  providers: [PurchaseCodeService]
})
export class PurchaseCodeModule {}
