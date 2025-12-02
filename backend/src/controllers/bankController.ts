import { Request, Response } from 'express';
import { BankModel } from '../models/Bank';

export const bankController = {
  getAll: (req: Request, res: Response) => {
    try {
      const banks = BankModel.getAll();
      res.json(banks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch banks' });
    }
  },

  getById: (req: Request, res: Response) => {
    try {
      const bank = BankModel.getById(parseInt(req.params.id));
      if (!bank) {
        return res.status(404).json({ error: 'Bank not found' });
      }
      res.json(bank);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch bank' });
    }
  },

  create: (req: Request, res: Response) => {
    try {
      const bank = BankModel.create(req.body);
      res.status(201).json(bank);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create bank' });
    }
  },

  update: (req: Request, res: Response) => {
    try {
      const success = BankModel.update(parseInt(req.params.id), req.body);
      if (!success) {
        return res.status(404).json({ error: 'Bank not found' });
      }
      res.json({ message: 'Bank updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update bank' });
    }
  },

  delete: (req: Request, res: Response) => {
    try {
      const success = BankModel.delete(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ error: 'Bank not found' });
      }
      res.json({ message: 'Bank deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete bank' });
    }
  }
};
