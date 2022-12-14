import { Request, Response } from "express";
import TransactionService from "../services/Transactions.service";

class TransactionController {
  static async listTransactionController(req: Request, res: Response) {
    const Transactions = await TransactionService.listTransactionsService(req.params.id)

    return res.status(200).json(Transactions);
  }

  static async listDebitedTransactionController(req: Request, res: Response) {
    const Transactions = await TransactionService.listDebitedTransactionsService(req.params.id)

    return res.status(200).json(Transactions);
  }

  static async listCreditedTransactionController(req: Request, res: Response) {
    const Transactions = await TransactionService.listCreditedTransactionsService(req.params.id)

    return res.status(200).json(Transactions);
  }

  static async listTransactionByDateController(req: Request, res: Response) {
    const Transactions = await TransactionService.listTransactionsByDateService(req.params.id, req.params.date)

    return res.status(200).json(Transactions);
  }

  static async createTransactionController(req: Request, res: Response) {
    
    const requestObject = {
      value: req.body.value,
      creditedUserId: req.params.id,
      debitedUserId: req.body.id
    }

    const Transaction = await TransactionService.createTransactionService(requestObject)

    return res.status(201).json(Transaction);
  }

}

export default TransactionController;
