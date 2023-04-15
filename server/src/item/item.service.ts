import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { ConflictException } from '@nestjs/common';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {

  constructor(
    @InjectRepository(Item)
    private ItemRepo: Repository<Item>,  // 使用泛型注入对应类型的存储库实例
) {}

  create(createItemDto: CreateItemDto) {
    return 'This action adds a new item';
  }

  async findAll() {
    const items = await this.ItemRepo.find({
      select:{
        id: true,
        name: true,
        length: true,
        price: true
      }
    })
    return items;
  }

  async findOne(id: number):Promise<Item |　undefined> {
    const item = await this.ItemRepo.findOne({where: {id}});
    return item || null;
  }


  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
