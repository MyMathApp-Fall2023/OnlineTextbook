import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Transaction} from "./entities/transaction.entity";
import {Repository} from "typeorm";

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,  // 使用泛型注入对应类型的存储库实例
) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.transactionRepo.save(createTransactionDto)
    //return 'This action adds a new transaction';
  }

  async findAll() {
    const transactions = await this.transactionRepo.find({
      select:{
        id: true,
        item_id: true,
        code_id: true,
        user_id: true,
        createdAt: true,
        price: true
      }
    })
    return transactions

    //return `This action returns all transaction`;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepo.findOne({where: {id}});
    return transaction || null;
    //return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
