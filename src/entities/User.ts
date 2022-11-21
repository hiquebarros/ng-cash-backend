import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./Account";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @Column("varchar", { length: 50, nullable: false})
    username: string;
    @Column("varchar", { length: 200, nullable: false, select: false })
    password: string;
    @OneToOne(() => Account)
    @JoinColumn()
    account: Account
}