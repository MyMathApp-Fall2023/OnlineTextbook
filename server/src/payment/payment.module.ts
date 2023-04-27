import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { RecordModule } from 'src/record/record.module';

@Module({
    imports: [RecordModule],
    controllers: [PaymentController],
    providers: [PaymentService]
})
export class PaymentModule {}
