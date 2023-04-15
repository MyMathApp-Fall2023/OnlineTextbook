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


    @Get(":name")
    checkValidPurchaseCode(@Param('name') name: string){

        return this.PurchaseCodeService.validateCode(name).then(async (res) => {
            return res;
            })
            .catch((err) => {
                throw new ConflictException("Purchase code doesn't exist!");
            }
            );
    }

}
