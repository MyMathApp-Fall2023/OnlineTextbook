import {Controller, Get, UseGuards} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {NeedRole} from "../roles/roles.decorator";
import {Role} from "../roles/role.enum";
import {RolesGuard} from "../auth/guards/roles.guard";
import {AuthGuard} from "@nestjs/passport";
import {PurchaseCodeService} from '../purchaseCode/purchaseCode.service';

@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller('admin')
@NeedRole(Role.Admin)
export class AdminController {
    constructor(private readonly userService:UserService, private readonly PurchaseCodeService:PurchaseCodeService) {}

    @Get("user")
    findAllUser() {
        return this.userService.findAll();
    }

    @Get("transaction")
    findAllTransaction() {
        return 'here return this.transactionService.findAll()'
    }

    @Get("purchaseCode")
    findAllPurchaseCode() {
        return this.PurchaseCodeService.findAll();
    }

}
