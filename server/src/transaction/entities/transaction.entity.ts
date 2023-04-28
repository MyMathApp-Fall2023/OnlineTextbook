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
import {PurchaseCode} from "../../purchaseCode/purchaseCode.entity";
import {User} from "../../user/entities/user.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn({name: "transaction_id"})
    public id: number;

    @Exclude()
    @Column()
    public item_id: number;
    //public readonly item_name: string;

    @ManyToOne(() => Item, item => item.transaction)
    @JoinColumn({name: 'item_id'})
    item: Item;

    @Exclude()
    @Column()
    public code_id: number;
    //public readonly code_name: string;

    @ManyToOne(() => PurchaseCode, purchasecode => purchasecode.transaction)
    @JoinColumn({name: 'code_id'})
    purchasecode: PurchaseCode;

    @Exclude()
    @Column()
    public user_id: number;
    //public readonly user_name: string;

    @ManyToOne(() => User, user => user.transaction)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column()
    public price: number;

    @CreateDateColumn({name: "created_at"})
    public createdAt: Date;
}
