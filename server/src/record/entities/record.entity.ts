/* eslint-disable prettier/prettier */
import {Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Exclude} from '@nestjs/class-transformer'
import { Item } from "src/item/entities/item.entity";

@Entity()
export class Record {
    @PrimaryGeneratedColumn({name: "record_id"})
    public readonly record_id: number;

    @Exclude()
    @Column()
    public user_id: number;

    @Column()
    public expirationDate: Date;

    @Column()
    public item_name: string;


}
