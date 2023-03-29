import {Module} from '@nestjs/common';
import {DataSource} from 'typeorm'
import {TypeOrmModule} from '@nestjs/typeorm';
import {BookController} from './book/book.controller';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import {User} from "./user/entities/user.entity";
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { TransactionModule } from './transaction/transaction.module';

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
            entities:[User],
            synchronize: true,
        }),
        UserModule,
        AuthModule,
        AdminModule,
        TransactionModule,

    ],
    controllers: [BookController],
    providers: [],
})

export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
