import { Request, Response } from "express";
import { User } from "../entities/User";
import UserService from "../services/Users.service";

class UserController {
  static async listUserController(req: Request, res: Response) {
    const users = await UserService.listUsersService()
    return res.status(200).json({message: "teste"});
  }

  static async createUserController(req: Request, res: Response) {
    const user = await UserService.createUsersService(req.body)

    return res.status(201).json(user);
  }

  static async loginUserController(req: Request, res: Response) {
    const token = await UserService.loginUserService(req.body);
    return res.status(200).json(token);
  }

}

export default UserController;
