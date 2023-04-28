import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('payment')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService) {}

    // @UseGuards(JwtAuthGuard)
    @Post('create-paypal-order')
    async create(@Req() req: Request, @Res() res: Response) {
        this.paymentService.create(req, res);
    }

    @Post('capture-paypal-order')
    async capture(@Req() req: Request, @Res() res: Response) {
        this.paymentService.capture(req, res);
    }
}

