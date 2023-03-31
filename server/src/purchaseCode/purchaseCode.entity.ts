import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Exclude} from '@nestjs/class-transformer'

@Entity()
export class PurchaseCode {


    @PrimaryGeneratedColumn({name: "purchaseCode_id"})
    public readonly code_id: number;

    @Column()
    public name: string;

    @Column()
    public priceOff: number;

}
