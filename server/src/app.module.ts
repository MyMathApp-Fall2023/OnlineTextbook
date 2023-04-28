import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from "@nestjs/config";
import {ServeStaticModule} from "@nestjs/serve-static";
import {UserModule } from './user/user.module';
import {User} from "./user/entities/user.entity";
import {AuthModule } from './auth/auth.module';
import {AdminModule } from './admin/admin.module';
import {TransactionModule } from './transaction/transaction.module';
import {RecordModule } from './record/record.module';
import {ItemModule } from './item/item.module';
import {PurchaseCodeModule } from './purchaseCode/purchaseCode.module';
import {Item} from "./item/entities/item.entity";
import {PurchaseCode} from "./purchaseCode/purchaseCode.entity";
import {Transaction} from "./transaction/entities/transaction.entity";
import {Record} from "./record/entities/record.entity";
import {EmailSubscription} from "./email-subscription/email-subscription.entity";
import {EmailModule } from './email/email.module';
import {BookModule } from './book/book.module';
import {PaymentModule } from './payment/payment.module';
import { EmailSubscriptionModule } from './email-subscription/email-subscription.module';
import {join} from 'path'


let envFilePath = [];
if (process.env.RUNNING_ENV === 'dev') {
    envFilePath.unshift('.env.dev');
}
if (process.env.RUNNING_ENV === 'heroku') {
    envFilePath.unshift('.env.heroku');
}
if (process.env.RUNNING_ENV === 'prod') {
    envFilePath.unshift('.env.prod');
}

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../', 'public')
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: envFilePath
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_Host,
            port: Number(process.env.DB_Port),
            username: process.env.DB_Username,
            password: process.env.DB_Password,
            database: process.env.DB_Database,
            entities:[User,Item,PurchaseCode,Record,Transaction,EmailSubscription],
            synchronize: false,
        }),
        UserModule,
        AuthModule,
        AdminModule,
        TransactionModule,
        RecordModule,
        ItemModule,
        PurchaseCodeModule,
        EmailModule,
        PaymentModule,
        BookModule,
        EmailSubscriptionModule,

    ],
    providers: [],
})

export class AppModule {
    constructor() {
    }
}
