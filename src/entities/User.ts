import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Length } from "class-validator"
import { Account } from "./Account";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @Column("varchar", { length: 50, nullable: false})
    @Length(3, 50)
    username: string;
    @Column("varchar", { length: 200, nullable: false, select: false })
    password: string;
    @OneToOne(() => Account)
    @JoinColumn()
    account: Account
}