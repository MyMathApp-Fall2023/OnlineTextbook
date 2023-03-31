import {Module} from '@nestjs/common';
import {DataSource} from 'typeorm'
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from "@nestjs/config";
import {UserModule } from './user/user.module';
import {User} from "./user/entities/user.entity";
import {AuthModule } from './auth/auth.module';
import {AdminModule } from './admin/admin.module';
import {TransactionModule } from './transaction/transaction.module';
import {RecordModule } from './record/record.module';
import {ItemModule } from './item/item.module';
import {PurchaseCodeModule } from './purchase-code/purchase-code.module';
import {Item} from "./item/entities/item.entity";
import {PurchaseCode} from "./purchase-code/entities/purchase-code.entity";
import {Transaction} from "./transaction/entities/transaction.entity";
import {Record} from "./record/entities/record.entity";

let envFilePath = ['.env'];
export const IS_DEV = process.env.RUNNING_ENV !== 'prod';
if (IS_DEV) {
    envFilePath.unshift('.env.dev');
} else {
    envFilePath.unshift('.env.prod');
}

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: envFilePath
        }),
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: process.env.DB_Host,
            port: Number(process.env.DB_Port),
            username: process.env.DB_Username,
            password: process.env.DB_Password,
            database: process.env.DB_Database,
            entities:[User,Item,PurchaseCode,Record,Transaction],
            synchronize: true,
        }),
        UserModule,
        AuthModule,
        AdminModule,
        TransactionModule,
        RecordModule,
        ItemModule,
        PurchaseCodeModule,

    ],
    providers: [],
})

export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
