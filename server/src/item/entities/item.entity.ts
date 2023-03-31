/* eslint-disable prettier/prettier */
import {Column, CreateDateColumn, Double, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Exclude} from '@nestjs/class-transformer'

@Entity()
export class Item {
    @PrimaryGeneratedColumn({name: "item_id"})
    public readonly id: number;

    @Column()
    public readonly name: string;

    @Column()
    public readonly length: number;

    @Column()
    public readonly price: number;

}
