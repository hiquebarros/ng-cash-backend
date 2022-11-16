import { Router } from "express";
import TransactionController from "../controllers/Transactions.controller";
import AuthenticationMiddlewares from "../middlewares/Authentication.middlewares";


const transactionsRouter = Router();

transactionsRouter.get("/:id", AuthenticationMiddlewares.VerifyToken, AuthenticationMiddlewares.VerifyAccountOwner, TransactionController.listTransactionController);
transactionsRouter.post("/:id", AuthenticationMiddlewares.VerifyToken, TransactionController.createTransactionController);
export default transactionsRouter;