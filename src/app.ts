import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import cors from "cors";
import usersRoute from "./routes/users";
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware";

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/users", usersRoute);

app.use(handleAppErrorMiddleware);

app.listen(process.env.PORT || 3001, () => {
  console.log("App running");
});
export default app;
