import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { RecordModule } from 'src/record/record.module';
import {TransactionModule} from "../transaction/transaction.module";

@Module({
    imports: [RecordModule,TransactionModule],
    controllers: [PaymentController],
    providers: [PaymentService]
})
export class PaymentModule {}
