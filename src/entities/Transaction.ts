import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./Account";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @Column("decimal", {precision: 10, scale: 2, default: 0})
    value: number;
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
    @ManyToOne(() => Account, (account) => account.debitedTransactions)
    debitedAccount: Account
    @ManyToOne(() => Account, (account) => account.creditedTransactions)
    creditedAccount: Account
}