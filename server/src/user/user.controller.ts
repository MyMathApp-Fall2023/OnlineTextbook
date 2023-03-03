import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {IncomingMessage} from "http";
import {User} from "./entities/user.entity";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("local-signup")
  create(@Body() user:User) {
    console.log(user)
    return this.userService.create(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }


  @Post("local/sign-up")

  public async localSignUp(@Req() req: IncomingMessage & Request): Promise<void> {
    // const user = req.user as User;
    console.log(req)
    // This shouldn't be necessary but why not check for it anyway
    // if (!user.activatedAccount) {
    //   return this.emailService.activateAccount(user);
    // }
  }
}
