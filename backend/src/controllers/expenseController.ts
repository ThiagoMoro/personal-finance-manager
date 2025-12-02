import { Request, Response } from 'express';
import { ExpenseModel } from '../models/Expense';
import { BankModel } from '../models/Bank';

export const expenseController = {
  getAll: (req: Request, res: Response) => {
    try {
      const expenses = ExpenseModel.getAll();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  },

  create: (req: Request, res: Response) => {
    try {
      const expense = ExpenseModel.create(req.body);
      // Atualizar saldo do banco (subtrair)
      BankModel.updateBalance(req.body.bank, -req.body.amount);
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create expense' });
    }
  },

  delete: (req: Request, res: Response) => {
    try {
      const success = ExpenseModel.delete(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete expense' });
    }
  }
};
