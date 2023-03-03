import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Exclude} from '@nestjs/class-transformer'

@Entity()
export class User {
    @PrimaryGeneratedColumn({name: "user_id"})
    public readonly id: number;

    @Column()
    public readonly name: string;

    @Column({unique: true})
    public readonly email: string;

    @Exclude()
    @Column({name: "google_access_token", nullable: true})
    public googleAccessToken?: string;

    @Exclude()
    @Column({nullable: true, name: "password"})
    public password?: string;

    @Exclude()
    @Column({default: false, name: "requested_temporary_password"})
    public requestedTemporaryPassword?: boolean;

    @Exclude()
    @Column({nullable: true, name: "temporary_password", length: 16})
    public temporaryPassword?: string;

    @Exclude()
    @Column({nullable: true, name: "temporary_password_requested_at"})
    public temporaryPasswordRequestedAt?: Date;

    @Exclude()
    @Column({default: false, name: "activated_account"})
    public activatedAccount: boolean;

    @Exclude()
    @Column({nullable: true, name: "activation_code", length: 32})
    public activationCode?: string;

    @CreateDateColumn({name: "created_at"})
    public readonly createdAt: Date;

    @UpdateDateColumn({name: "updated_at"})
    public readonly updatedAt: Date;
}
