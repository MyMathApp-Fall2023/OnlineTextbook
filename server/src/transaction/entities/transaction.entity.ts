/* eslint-disable prettier/prettier */
import {Column, CreateDateColumn, Double, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Exclude} from '@nestjs/class-transformer'

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn({name: "transaction_id"})
    public readonly id: number;

    @Exclude()
    @Column()
    public readonly item_id: number;

    @Exclude()  
    @Column()
    public readonly code_id: number;

    @Exclude()
    @Column()
    public readonly user_id: number;

    @Column()
    public readonly price: Double;

    @CreateDateColumn({name: "created_at"})
    public readonly createdAt: Date;
}
