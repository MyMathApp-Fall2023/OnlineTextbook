/* eslint-disable prettier/prettier */
import {
    Column,
    CreateDateColumn,
    Double,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Exclude} from '@nestjs/class-transformer'
import {Item} from "../../item/entities/item.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn({name: "transaction_id"})
    public readonly id: number;

    @Exclude()
    @Column()
    public readonly item_id: number;
    //public readonly item_name: string;

    @ManyToOne(() => Item, item => item.transaction)
    @JoinColumn({name: 'item_id'})
    item: Item;

    @Exclude()
    @Column()
    public readonly code_id: number;
    //public readonly code_name: string;

    @Exclude()
    @Column()
    public readonly user_id: number;
    //public readonly user_name: string;
    @Column()
    public readonly price: number;

    @CreateDateColumn({name: "created_at"})
    public readonly createdAt: Date;
}
