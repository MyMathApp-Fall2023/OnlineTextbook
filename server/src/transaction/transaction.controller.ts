/* eslint-disable prettier/prettier */
import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @HttpCode(200)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }
  @HttpCode(200)
  @Patch('transaction')
  update(@Param('id') id: string, @Body() newTran:Transaction) {
    console.log("Add transaction");
    console.log(newTran.user_id);
    return this.transactionService.update(newTran.user_id, newTran.item_id, newTran.code_id, newTran.price);
  }
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
