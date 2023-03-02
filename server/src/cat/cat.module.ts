import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cat} from "./entities/cat.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Cat])],
  //use forFeature() method to define register which repository
  //In order to use @InjectRepository() to inject CatRepository into CatService
  controllers: [CatController],
  providers: [CatService]
})
export class CatModule {}
