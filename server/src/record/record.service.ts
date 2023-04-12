import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './entities/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordRepo: Repository<Record>,  // 使用泛型注入对应类型的存储库实例
) {}
  create(createRecordDto: CreateRecordDto) {
    return 'This action adds a new record';
  }

  async findAll(user_id:number) {
    console.log("For records, server: "+ user_id);
    // const records = await this.recordRepo.find({
    //   where:{
    //     user_id: user_id
    //   }
    // })
    const records = await this.recordRepo.find({
    relations: ["item"],
    where: {
      user_id: user_id
    }
    })
    console.log(records)
    return records;
  }




  findOne(id: number) {
    return `This action returns a #${id} record`;
  }

  update(id: number, updateRecordDto: UpdateRecordDto) {
    return `This action updates a #${id} record`;
  }

  remove(id: number) {
    return `This action removes a #${id} record`;
  }
}
