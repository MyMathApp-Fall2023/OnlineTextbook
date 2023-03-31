import {Controller, Get, UseGuards} from '@nestjs/common';
import {PurchaseCodeService} from "./purchaseCode.service";


@Controller('purchaseCode')
export class PurchaseCodeController {
    constructor(private readonly PurchaseCodeService:PurchaseCodeService) {}

    @Get("purchaseCode")
    findAllUser() {
        return this.PurchaseCodeService.findAll();
    }

}
