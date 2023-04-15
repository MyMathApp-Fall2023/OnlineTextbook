import { Injectable } from '@nestjs/common';
import "dotenv/config"; // loads variables from .env file
import * as paypal from "./paypal-api";
const {PORT = 8888} = process.env;

@Injectable()
export class PaymentService {

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
        try {
            const captureData = await paypal.capturePayment(orderID);
            res.json(captureData);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}
