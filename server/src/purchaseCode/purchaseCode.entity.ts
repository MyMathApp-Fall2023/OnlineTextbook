import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany} from "typeorm";
import {Exclude} from '@nestjs/class-transformer'
import {Transaction} from "../transaction/entities/transaction.entity";

@Entity()
export class PurchaseCode {


    @PrimaryGeneratedColumn({name: "purchaseCode_id"})
    public readonly code_id: number;

    @Column()
    public name: string;

    @Column()
    public priceOff: number;

    @OneToMany(() => Transaction, transaction => transaction.purchasecode)
    transaction: Transaction[]

}
