import { Router, Request, Response } from 'express';
import { db } from '../database';

const router = Router();

// GET all recurring payments
router.get('/', (req: Request, res: Response) => {
  db.all('SELECT * FROM recurring_payments', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

// POST create recurring payment
router.post('/', (req: Request, res: Response) => {
  const { description, amount, type, dayOfMonth, category } = req.body;
  
  db.run(
    'INSERT INTO recurring_payments (description, amount, type, dayOfMonth, category) VALUES (?, ?, ?, ?, ?)',
    [description, amount, type, dayOfMonth, category],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        data: { id: this.lastID, description, amount, type, dayOfMonth, category }
      });
    }
  );
});

// DELETE recurring payment
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  db.run('DELETE FROM recurring_payments WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Recurring payment deleted', changes: this.changes });
  });
});

export default router;
