import { Router } from "express";
import TransactionController from "../controllers/Transactions.controller";
import AuthenticationMiddlewares from "../middlewares/Authentication.middlewares";


const transactionsRouter = Router();

transactionsRouter.get("/:id", AuthenticationMiddlewares.VerifyToken, AuthenticationMiddlewares.VerifyAccountOwner, TransactionController.listTransactionController);
transactionsRouter.post("/:id", AuthenticationMiddlewares.VerifyToken, TransactionController.createTransactionController);
transactionsRouter.get("/credited/:id", AuthenticationMiddlewares.VerifyToken, AuthenticationMiddlewares.VerifyAccountOwner, TransactionController.listCreditedTransactionController);
transactionsRouter.get("/debited/:id", AuthenticationMiddlewares.VerifyToken, AuthenticationMiddlewares.VerifyAccountOwner, TransactionController.listDebitedTransactionController);
transactionsRouter.get("/date/:id/:date", AuthenticationMiddlewares.VerifyToken, AuthenticationMiddlewares.VerifyAccountOwner, TransactionController.listTransactionByDateController);
transactionsRouter.get("/:id", AuthenticationMiddlewares.VerifyToken, AuthenticationMiddlewares.VerifyAccountOwner, TransactionController.listTransactionController);
export default transactionsRouter;