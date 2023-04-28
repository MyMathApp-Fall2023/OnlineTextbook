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
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
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


  addMonths(date: Date, months: number) {
    date.setMonth(date.getMonth() + months);

    return date;
  }

  async update(user_id: number, item_id: number) {
    // find length from item using item_id
    const items = await this.itemRepo.findOne({
      where:{
        id:item_id
      }
    })
    const length = items.length;
    const records = await this.recordRepo.findOne({
      where: {
        user_id:user_id,
        item_name:items.name
      }
    })
    //return 0;
    const item_info = await this.itemRepo.findOne({
      where: {
        id:item_id
      }
    });
    console.log(item_info);

    if (records == null){//add a new record
      const nowDate =  new Date(Date.now());
      const newDate = this.addMonths(nowDate,length);
      const newrecord = new Record();
      newrecord.item_name = items.name;
      newrecord.expirationDate = newDate;
      newrecord.user_id = user_id;
      console.log("Store a new record");
      console.log(newrecord);
      const record = await this.recordRepo.save(newrecord);
      return record;
    }
    else{//update old record
      const oldDate = records.expirationDate;
      const newDate = this.addMonths(oldDate, length);
      records.expirationDate = newDate;
      console.log("Update a exist record");
      console.log(records);
      await this.recordRepo.save(records);
      return records;
    }
  }

  async checkIfUserPurchaseItem(user_id:number, item_name:string){
    const rec = await this.recordRepo.findOne({
      where:{
        user_id:user_id,
        item_name:item_name
      }
    })
    if (rec == null){
      return false;
    }
    else{ //rec != null
      //check expiration date
      const nowDate = new Date(Date.now());
      if (nowDate < rec.expirationDate){
        return true;
      }
      else{
        return false;
      }
    }
  }


  remove(id: number) {
    return `This action removes a #${id} record`;
  }

}
