import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseCodeService } from './purchase-code.service';
import { CreatePurchaseCodeDto } from './dto/create-purchase-code.dto';
import { UpdatePurchaseCodeDto } from './dto/update-purchase-code.dto';

@Controller('purchase-code')
export class PurchaseCodeController {
  constructor(private readonly purchaseCodeService: PurchaseCodeService) {}

  @Post()
  create(@Body() createPurchaseCodeDto: CreatePurchaseCodeDto) {
    return this.purchaseCodeService.create(createPurchaseCodeDto);
  }

  @Get()
  findAll() {
    return this.purchaseCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseCodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseCodeDto: UpdatePurchaseCodeDto) {
    return this.purchaseCodeService.update(+id, updatePurchaseCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseCodeService.remove(+id);
  }
}
