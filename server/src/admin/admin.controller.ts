import {Controller, Get, UseGuards} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {NeedRole} from "../roles/roles.decorator";
import {Role} from "../roles/role.enum";
import {RolesGuard} from "../auth/guards/roles.guard";
import {AuthGuard} from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller('admin')
@NeedRole(Role.Admin)
export class AdminController {
    constructor(private readonly userService:UserService) {}

    @Get("user")
    findAllUser() {
        return this.userService.findAll();
    }

    @Get("transaction")
    findAllTransaction() {
        return 'here return this.transactionService.findAll()'
    }

}
