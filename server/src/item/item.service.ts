import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,  // 使用泛型注入对应类型的存储库实例
) {}
  create(createItemDto: CreateItemDto) {
    return 'This action adds a new item';
  }

  findAll() {
    return `This action returns all item`;
  }

  async findOne(id: number) {
    const item = await this.itemRepo.find({
      where:{
        id: id
      }
    })
    return item;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
