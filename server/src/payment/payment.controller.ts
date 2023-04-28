import {Body, Controller, Post, Req, Res, UseGuards, Request, HttpCode} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {Transaction} from "../transaction/entities/transaction.entity";
import { User } from 'src/user/entities/user.entity';

@Controller('payment')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService) {}

    // @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Post('create-paypal-order')
    async create(@Req() req: Request, @Res() res: Response) {
        await this.paymentService.create(req, res);
    }
    @HttpCode(200)
    @Post('capture-paypal-order')
    async capture(@Req() req: Request, @Res() res: Response) {
        await this.paymentService.capture(req, res);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Post('finish-purchasing')
    async finishPurchasing(@Request() req, @Body() body: Transaction) {
        return this.paymentService.finishPurchasing(req.user.user_id, body.code_id, body.item_id, body.price)
    }
}

