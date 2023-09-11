import {Body, Controller, Get, HttpCode, Post, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {ClassService} from "../class/class.service";
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import { UserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService,
                private authService:AuthService,
                private readonly classService: ClassService) {}

    @HttpCode(200)
    @Post("local-signup")
    public create(@Body() user: UserDto) {
        return this.userService.localSignUp(user);
    }

    @HttpCode(200)
    @Post("class-signup")
    public async signUpStudents(@Body() instructorAndClass: {instructor: UserDto, students: UserDto[]}) {
        console.log(instructorAndClass);
        // first create the instructor
        const newInstructor = await this.userService.localSignUp(instructorAndClass.instructor)
        // then create accounts for all students
        this.userService.localSignUpForClass(instructorAndClass.students);
        // then create the class and associate it with the instructor
        const newClass = await this.classService.createNewClass(newInstructor.userId);
        // finally add all students to the class
        return this.classService.addMultipleStudentsToClass(instructorAndClass.students.map(s => s.userId), newClass.classId);
    }

    /**
     * Authenticates a user with email and password and returns a JWT token
     */
    @Post("local-login")
    @HttpCode(200)
    public async localLogin(@Body() user: UserDto) {
        await this.userService.authenticate(user)
        return this.authService.login(user)
    }

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    public getProfile(@Request() req) {
        return req.user;
    }

    @HttpCode(200)
    @Post("activate")
    public activateAccount(@Body() body: {activationCode: string}) {
        return this.userService.activateAccount(body.activationCode);
    }

}
