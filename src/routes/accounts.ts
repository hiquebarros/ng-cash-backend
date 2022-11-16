import { Router } from "express";
import AccountController from "../controllers/Accounts.controller";
import AuthenticationMiddlewares from "../middlewares/Authentication.middlewares";


const accountsRouter = Router();

accountsRouter.get("/:id", AuthenticationMiddlewares.VerifyToken, AuthenticationMiddlewares.VerifyAccountOwner, AccountController.retrieveAccountController);

export default accountsRouter;