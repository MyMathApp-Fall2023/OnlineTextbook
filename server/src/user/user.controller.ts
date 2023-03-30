import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ConflictException,
  UnauthorizedException, HttpCode
} from '@nestjs/common';
import { UserService } from './user.service';
import {IncomingMessage} from "http";
import {User} from "./entities/user.entity";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post("local/login")
  @HttpCode(200)
  public async localLogin(@Body() loginUser:User): Promise<User> {

    const authenticatedUser = await this.userService.authenticate(loginUser)

    if (!authenticatedUser) {
      throw new UnauthorizedException("Email or password is not correct");
    }

    return authenticatedUser;
  }

  @Get("getAll")
  findAll() {
    return this.userService.findAll();
  }

}
