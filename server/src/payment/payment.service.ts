import { Injectable } from '@nestjs/common';
import "dotenv/config"; // loads variables from .env file
import * as paypal from "./paypal-api";
const {PORT = 8888} = process.env;
import { RecordService } from 'src/record/record.service';


@Injectable()
export class PaymentService {

    constructor(private readonly recordService: RecordService) {}

    async create(req, res) {
        const amount = req.body['cart'][0]['amount'];
        console.log('Create an order with amount', amount);
        try {
            const order = await paypal.createOrder(amount);
            res.json(order);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async capture(req, res) {
        const { orderID } = req.body;
        const item_id = req.body['cart'][0]['sku'];
        const purchase_code = req.body['cart'][0]['purchaseCode'];
        const user_id = req.user.user_id;

        try {
            const captureData = await paypal.capturePayment(orderID);
            res.json(captureData);
            this.recordService.update(user_id, item_id);

        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}
