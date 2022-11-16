import { Router } from "express";
import UserController from "../controllers/Users.controller";


const usersRouter = Router();

usersRouter.get("", UserController.listUserController);
usersRouter.post("", UserController.createUserController);
usersRouter.post("/login", UserController.loginUserController);

export default usersRouter;