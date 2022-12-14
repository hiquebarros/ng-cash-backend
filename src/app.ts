import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import usersRoute from "./routes/users";
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware";
import transactionsRouter from "./routes/transactions";
import accountsRouter from "./routes/accounts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRoute);
app.use("/transactions", transactionsRouter);
app.use("/accounts", accountsRouter);

app.use(handleAppErrorMiddleware);

app.listen(process.env.PORT || 3001, () => {
  console.log("App running");
});
export default app;
