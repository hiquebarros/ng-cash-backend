import AppDataSource from "../data-source"
import { User } from "../entities/User"

class AccountService {
    static async retrieveAccountService(id: string) {
        const UserManager = AppDataSource.getRepository(User)

        const user = await UserManager.findOne({ where: { id: id }, relations: ["account"] })

        return user?.account
    }
}

export default AccountService