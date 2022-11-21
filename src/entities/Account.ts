import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { ColumnNumericTransformer } from "../transformers";
import { Transaction } from "./Transaction";

@Entity()
export class Account {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @Column("decimal", {precision: 10, scale: 2, default: 100, transformer: new ColumnNumericTransformer()})
    balance: number;
    @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
    debitedTransactions: Transaction[]
    @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
    creditedTransactions: Transaction[]
}