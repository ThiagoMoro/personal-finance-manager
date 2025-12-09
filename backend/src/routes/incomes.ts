import { Router, Request, Response } from 'express';
import { db } from '../database';

const router = Router();

// GET all incomes
router.get('/', (req: Request, res: Response) => {
  db.all('SELECT * FROM incomes', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

// POST create income
router.post('/', (req: Request, res: Response) => {
  const { description, amount, date, category, bank } = req.body;
  
  db.run(
    'INSERT INTO incomes (description, amount, date, category, bank) VALUES (?, ?, ?, ?, ?)',
    [description, amount, date, category, bank],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      // Atualizar saldo do banco
      db.run('UPDATE banks SET balance = balance + ? WHERE name = ?', [amount, bank]);
      
      res.status(201).json({
        data: { id: this.lastID, description, amount, date, category, bank }
      });
    }
  );
});

// DELETE income
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  // Primeiro buscar o income para reverter o saldo
  db.get('SELECT * FROM incomes WHERE id = ?', [id], (err, row: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (row) {
      // Reverter saldo do banco
      db.run('UPDATE banks SET balance = balance - ? WHERE name = ?', [row.amount, row.bank]);
    }
    
    // Deletar income
    db.run('DELETE FROM incomes WHERE id = ?', [id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Income deleted', changes: this.changes });
    });
  });
});

export default router;
