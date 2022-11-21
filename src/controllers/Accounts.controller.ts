import AccountService from "../services/Accounts.service";
import { Request, Response } from "express";

class AccountController {
    static async retrieveAccountController(req: Request, res: Response) {
        
      const account = await AccountService.retrieveAccountService(req.params.id)
  
      return res.status(200).json(account);
    }
  }
  
  export default AccountController;