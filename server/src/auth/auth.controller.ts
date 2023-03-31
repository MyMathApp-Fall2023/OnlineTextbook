import {Body, Controller, Get, HttpCode, Post, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../user/entities/user.entity";
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService,
                private authService:AuthService) {}


    @HttpCode(200)
    @Post("local-signup")
    create(@Body() user:User) {
        return this.userService.create(user);
    }

    @Post("local-login")
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    // local strategy has a default name of 'local'. code supplied by the passport-local package
    public async localLogin(@Request() req) {
        return this.authService.login(req.user)
    }


    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
