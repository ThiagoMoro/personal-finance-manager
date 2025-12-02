import { Request, Response } from 'express';
import { RecurringPaymentModel } from '../models/RecurringPayment';

export const recurringController = {
  getAll: (req: Request, res: Response) => {
    try {
      const payments = RecurringPaymentModel.getAll();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recurring payments' });
    }
  },

  create: (req: Request, res: Response) => {
    try {
      const payment = RecurringPaymentModel.create(req.body);
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create recurring payment' });
    }
  },

  delete: (req: Request, res: Response) => {
    try {
      const success = RecurringPaymentModel.delete(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ error: 'Recurring payment not found' });
      }
      res.json({ message: 'Recurring payment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete recurring payment' });
    }
  }
};
