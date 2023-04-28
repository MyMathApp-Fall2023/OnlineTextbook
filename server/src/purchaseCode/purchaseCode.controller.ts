import {Controller, Get, Post, HttpCode, Request, UseGuards,Body, Patch, Param, Delete} from '@nestjs/common';
import {PurchaseCodeService} from "./purchaseCode.service";
import { ConflictException } from '@nestjs/common';
@Controller('purchaseCode')
export class PurchaseCodeController {
    constructor(private readonly PurchaseCodeService:PurchaseCodeService) {}

    @Get("purchaseCode")
    findAllUser() {
        return this.PurchaseCodeService.findAll();
    }

    @Get('id')
    findOne(@Param('id') id: number) {
        return this.PurchaseCodeService.findOne(id);
    }

    @Get(":name")
    async checkValidPurchaseCode(@Param('name') name: string) {

        const validateResult = await this.PurchaseCodeService.validateCode(name);
        return {priceOff:validateResult}
    }

}
