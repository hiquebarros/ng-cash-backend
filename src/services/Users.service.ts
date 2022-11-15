import AppDataSource from "../data-source"
import { User } from "../entities/User";
import { AppError } from "../errors/AppError";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRequest } from "./interfaces";

class UserService {
    static async listUsersService() {
        const manager = AppDataSource.getRepository(User)
        const users = manager.find()
        return users
    }

    static async createUsersService(data: IUserRequest) {
        const manager = AppDataSource.getRepository(User)

        const findUserByUsername = await manager.findOneBy({
            username: data.username,
        });

        if (findUserByUsername) {
            throw new AppError("Username is already been used", 400);
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        data.password = hashedPassword

        const user = manager.create(data)

        await manager.save(user)

        return user
    }

    static async loginUserService(data: IUserRequest) {
        const manager = AppDataSource.getRepository(User)
        const user = await manager.findOneBy({
            username: data.username,
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
                id: user.id,
                email: user.username,
            },
            process.env.SECRET_KEY as string,
            {
                expiresIn: "24h",
            }
        );

        return { token };
    }

}
export default UserService;