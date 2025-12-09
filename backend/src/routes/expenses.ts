import { Router, Request, Response } from 'express';
import { db } from '../database';

const router = Router();

// GET all expenses
router.get('/', (req: Request, res: Response) => {
  db.all('SELECT * FROM expenses', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

// POST create expense
router.post('/', (req: Request, res: Response) => {
  const { description, amount, date, category, bank } = req.body;
  
  db.run(
    'INSERT INTO expenses (description, amount, date, category, bank) VALUES (?, ?, ?, ?, ?)',
    [description, amount, date, category, bank],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      // Atualizar saldo do banco
      db.run('UPDATE banks SET balance = balance - ? WHERE name = ?', [amount, bank]);
      
      res.status(201).json({
        data: { id: this.lastID, description, amount, date, category, bank }
      });
    }
  );
});

// DELETE expense
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  // Primeiro buscar o expense para reverter o saldo
  db.get('SELECT * FROM expenses WHERE id = ?', [id], (err, row: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (row) {
      // Reverter saldo do banco
      db.run('UPDATE banks SET balance = balance + ? WHERE name = ?', [row.amount, row.bank]);
    }
    
    // Deletar expense
    db.run('DELETE FROM expenses WHERE id = ?', [id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Expense deleted', changes: this.changes });
    });
  });
});

export default router;
