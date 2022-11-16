import AppDataSource from "../data-source"
import { Transaction } from "../entities/Transaction";
import { AppError } from "../errors/AppError";
import { Account } from "../entities/Account";
import { User } from "../entities/User";
import { ITransactionRequest } from "../interfaces";

class TransactionService {
    static async listTransactionsService(id: string) {
        const AccountManager = AppDataSource.getRepository(Account)
        const UserManager = AppDataSource.getRepository(User)

        const user = await UserManager.findOne({ where: { id: id }, relations: ["account"] })

        const account = await AccountManager.findOne({ where: { id: user?.account.id }, relations: ["debitedTransactions", "creditedTransactions"] })

        const creditedTransactions = account?.creditedTransactions
        const debitedTransactions = account?.debitedTransactions

        if (creditedTransactions && debitedTransactions) {
            return [...creditedTransactions, ...debitedTransactions].sort((a,b)=>a.createdAt.getTime()+b.createdAt.getTime());
        } else {
            if (creditedTransactions) {
                return [...creditedTransactions].sort((a,b)=>a.createdAt.getTime()+b.createdAt.getTime());
            }
            if (debitedTransactions) {
                return [...debitedTransactions].sort((a,b)=>a.createdAt.getTime()+b.createdAt.getTime());
            }
        }
    }

    static async createTransactionService({ value, creditedUserId, debitedUserId }: ITransactionRequest) {
        const TransactionManager = AppDataSource.getRepository(Transaction)
        const AccountManager = AppDataSource.getRepository(Account)
        const UserManager = AppDataSource.getRepository(User)

        if (creditedUserId === debitedUserId) {
            throw new AppError("User id's must be different", 400)
        }

        const creditedUser = await UserManager.findOne({
            where: { id: creditedUserId },
            relations: ['account']
        });

        const debitedUser = await UserManager.findOne({
            where: { id: debitedUserId },
            relations: ['account']
        });

        const debitedAccount = debitedUser!.account
        const creditedAccount = creditedUser!.account

        if (debitedAccount.balance < value) {
            throw new AppError("Insufficient funds", 400)
        }

        const transaction = new Transaction()
        transaction.value = value
        transaction.creditedAccount = creditedAccount
        transaction.debitedAccount = debitedAccount

        const savedTransaction = await TransactionManager.save(transaction)

        debitedAccount.balance = debitedAccount.balance - value
        creditedAccount.balance = creditedAccount.balance + value

        await AccountManager.save(debitedAccount)
        await AccountManager.save(creditedAccount)

        return savedTransaction
    }
}

export default TransactionService