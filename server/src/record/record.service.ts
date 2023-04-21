import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';
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

  async update(user_id: number, item_id: number) {
    const records = await this.recordRepo.find({
      where: {
        user_id:user_id,
        item_id:item_id
      }
    })
    // find length from item using item_id
    const length = 5; 
    // const item_info = Item.findOne(item_id);
    // console.log(item_info);
    if (records == null){//add a new record
      const newDate =  new Date(Date.now()+length*30);
      const newrecord = new Record();
      newrecord.item_id = item_id;
      newrecord.expirationDate = newDate;
      newrecord.user_id = user_id;
      console.log(newrecord);
      const record = await this.recordRepo.save(newrecord);
      return record;
    }
    else{//update old record
      
    }
    //return `This action updates a #${id} record`;
  }

  remove(id: number) {
    return `This action removes a #${id} record`;
  }
}
