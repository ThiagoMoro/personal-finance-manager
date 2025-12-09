import { Router, Request, Response } from 'express';
import { db } from '../database';

const router = Router();

// GET all banks
router.get('/', (req: Request, res: Response) => {
  db.all('SELECT * FROM banks', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

// POST create bank
router.post('/', (req: Request, res: Response) => {
  const { name, balance } = req.body;
  
  db.run(
    'INSERT INTO banks (name, balance) VALUES (?, ?)',
    [name, balance],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        data: { id: this.lastID, name, balance }
      });
    }
  );
});

// DELETE bank
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  db.run('DELETE FROM banks WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Bank deleted', changes: this.changes });
  });
});

export default router;
