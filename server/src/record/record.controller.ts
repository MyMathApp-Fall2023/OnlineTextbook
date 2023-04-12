import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Record } from './entities/record.entity';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.create(createRecordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('record')
  findAll(@Request() req) {
    console.log(req.user);
    return this.recordService.findAll(req.user.user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() newRecord: Record) {
    return this.recordService.update(newRecord.user_id, newRecord.expirationDate, newRecord.item_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordService.remove(+id);
  }
}
