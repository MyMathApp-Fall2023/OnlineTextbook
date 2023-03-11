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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {IncomingMessage} from "http";
import {User} from "./entities/user.entity";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @HttpCode(200)
  @Post("local/signup")
  create(@Body() user:User) {
    console.log(user)
    return this.userService.create(user);
  }

  @Post("local/login")
  @HttpCode(200)
  public async localLogin(@Body() loginUser:User): Promise<User> {

    const authenticatedUser = await this.userService.authenticate(loginUser)

    if (!authenticatedUser) {
      throw new UnauthorizedException("Email or password is not correct");
    }
    // if (!user.activatedAccount) {
    //   throw new ConflictException("User has not activated the account");
    // }
    //
    // /* eslint-disable  @typescript-eslint/ban-ts-comment, require-atomic-updates */
    // // @ts-ignore 2551
    // req._cookies = [
    //   {
    //     name: "jwt",
    //     value: await this.authenticationService.createJwt(user),
    //     options: {
    //       sameSite: "strict",
    //       httpOnly: false
    //     }
    //   }
    // ] as CookieSettings[];
    // /* eslint-enable */
    return authenticatedUser;
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
  update(@Param('id') id: string, @Body() updateUser: User) {
    return this.userService.update(+id, updateUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
