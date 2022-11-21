import AppDataSource from "../data-source"
import { User } from "../entities/User";
import { AppError } from "../errors/AppError";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRequest } from "../interfaces";
import { Account } from "../entities/Account";
import { validate } from "class-validator";

class UserService {
    static async listUsersService() {
        const manager = AppDataSource.getRepository(User)
        const users = manager.find()
        return users
    }

    static async createUsersService(data: IUserRequest) {
        const UserManager = AppDataSource.getRepository(User)

        const findUserByUsername = await UserManager.findOneBy({
            username: data.username,
        });

        if (findUserByUsername) {
            throw new AppError("Username is already been used", 400);
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        data.password = hashedPassword

        const user = UserManager.create(data)

        const errors = await validate(user)

        if (errors.length > 0){
            throw new AppError('Bad request', 400)
        }

        const AccountManager = AppDataSource.getRepository(Account)
        
        const account = new Account()
        
        await AccountManager.save(account)

        user.account = account

        await UserManager.save(user)

        const userToBeReturned = {
            id: user.id,
            username: user.username,
            account: user.account
        }

        return userToBeReturned
    }

    static async loginUserService(data: IUserRequest) {
        const manager = AppDataSource.getRepository(User)
        const user = await manager.findOne({
            select: ['id', 'username', 'password', 'account'],
            where: {username: data.username}, relations: ['account']
        });

        if (!user) {
            throw new AppError("Username or password is incorrect", 400);
        }

        const passwordCompare = bcrypt.compareSync(
            data.password,
            user.password
        );

        if (!passwordCompare) {
            throw new AppError("Username or password is incorrect", 400);
        }

        const token = jwt.sign(
            {
                userId: user.id,
                accountId: user.account.id,
            },
                process.env.SECRET_KEY as string,
            {
                expiresIn: "24h",
            }
        );

        return { token, userId: user.id, accountId: user.account.id};
    }

}
export default UserService;