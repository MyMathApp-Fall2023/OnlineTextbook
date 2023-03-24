import {Controller, Get} from '@nestjs/common';
import {UserService} from "../user/user.service";

@Controller('admin')
export class AdminController {
    constructor(private readonly userService:UserService) {}

    @Get("user/data")
    findAllUserg() {
        return this.userService.findAll();
    }

}
