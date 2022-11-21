import { Router } from "express";
import { formSchema } from "../middlewares/formSchema";
import UserController from "../controllers/Users.controller";
import validate from "../middlewares/BodyValidation.middleware";


const usersRouter = Router();

usersRouter.get("", UserController.listUserController);
usersRouter.post("", validate(formSchema), UserController.createUserController);
usersRouter.post("/login", UserController.loginUserController);

export default usersRouter;