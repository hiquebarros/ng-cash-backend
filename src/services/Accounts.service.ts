import AppDataSource from "../data-source"
import { Account } from "../entities/Account"
import { User } from "../entities/User"

class AccountService {
    static async retrieveAccountService(id: string) {
        const UserManager = AppDataSource.getRepository(User)
        // const AccountManager = AppDataSource.getRepository(Account)

        const user = await UserManager.findOne({ where: { id: id }, relations: ["account"] })
        // const account = await AccountManager.findOne({ where: { id: user?.account.id }, relations: ["transaction"] })

        return user
    }
}

export default AccountService