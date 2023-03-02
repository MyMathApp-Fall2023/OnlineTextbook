import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import {InjectRepository} from "@nestjs/typeorm";
import { Cat } from './entities/cat.entity';
import {Repository} from "typeorm";

@Injectable()
export class CatService {

  constructor( @InjectRepository(Cat)
              private catRepository:Repository<Cat>) {}

  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  async findAll() {
    return await this.catRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
