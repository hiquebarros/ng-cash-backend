import { Request, Response, NextFunction } from "express";

const validate = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
        return res.status(400).json({message: "Bad request"});
    }
  };

export default validate