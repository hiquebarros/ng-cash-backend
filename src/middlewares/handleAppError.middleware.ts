import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const handleAppErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    console.log(error)
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: error.message,
  });
};
export default handleAppErrorMiddleware;