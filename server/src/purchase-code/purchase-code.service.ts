import { Injectable } from '@nestjs/common';
import { CreatePurchaseCodeDto } from './dto/create-purchase-code.dto';
import { UpdatePurchaseCodeDto } from './dto/update-purchase-code.dto';

@Injectable()
export class PurchaseCodeService {
  create(createPurchaseCodeDto: CreatePurchaseCodeDto) {
    return 'This action adds a new purchaseCode';
  }

  findAll() {
    return `This action returns all purchaseCode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseCode`;
  }

  update(id: number, updatePurchaseCodeDto: UpdatePurchaseCodeDto) {
    return `This action updates a #${id} purchaseCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseCode`;
  }
}
