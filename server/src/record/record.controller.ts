import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpCode} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Record } from './entities/record.entity';
import { Item } from 'src/item/entities/item.entity';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}
  @HttpCode(200)
  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.create(createRecordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('record')
  findAll(@Request() req) {
    return this.recordService.findAll(req.user.user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordService.findOne(+id);
  }
  @HttpCode(200)
  @Patch('record')
  update(@Param('id') id: string, user_id:number, item_id:number) {
    return this.recordService.update(user_id, item_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordService.remove(+id);
  }
}
