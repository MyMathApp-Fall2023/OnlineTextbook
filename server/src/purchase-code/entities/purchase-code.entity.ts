/* eslint-disable prettier/prettier */
import {Column, CreateDateColumn, Double, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Exclude} from '@nestjs/class-transformer'

@Entity()
export class PurchaseCode {
    @PrimaryGeneratedColumn({name: "code_id"})
    public readonly id: number;

    @Column()
    public readonly name: string;

    @Column()
    public readonly priceOff: number;

}
