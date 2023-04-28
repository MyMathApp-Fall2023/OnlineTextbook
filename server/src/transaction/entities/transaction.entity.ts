/* eslint-disable prettier/prettier */
import {Column, CreateDateColumn, Double, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Exclude} from '@nestjs/class-transformer'

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn({name: "transaction_id"})
    public readonly id: number;

    @Exclude()
    @Column()
    public item_id: number;

    @Exclude()
    @Column()
    public code_id: number;

    @Exclude()
    @Column()
    public user_id: number;

    @Column()
    public price: number;

    @CreateDateColumn({name: "created_at"})
    public createdAt: Date;
}
