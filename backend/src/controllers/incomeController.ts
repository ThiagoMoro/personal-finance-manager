import { Request, Response } from 'express';
import { IncomeModel } from '../models/Income';
import { BankModel } from '../models/Bank';

export const incomeController = {
  getAll: (req: Request, res: Response) => {
    try {
      const incomes = IncomeModel.getAll();
      res.json(incomes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch incomes' });
    }
  },

  create: (req: Request, res: Response) => {
    try {
      const income = IncomeModel.create(req.body);
      // Atualizar saldo do banco
      BankModel.updateBalance(req.body.bank, req.body.amount);
      res.status(201).json(income);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create income' });
    }
  },

  delete: (req: Request, res: Response) => {
    try {
      const success = IncomeModel.delete(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ error: 'Income not found' });
      }
      res.json({ message: 'Income deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete income' });
    }
  }
};
