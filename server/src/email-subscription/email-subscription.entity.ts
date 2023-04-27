import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Exclude} from '@nestjs/class-transformer'

@Entity()
export class EmailSubscription {


  @PrimaryGeneratedColumn({name: "email_subscription_id"})
  public readonly email_sub_id: number;

  @Column()
  public suffix: string;

}
