import { Router, Request, Response } from 'express';
import { db } from '../database';

const router = Router();

// GET all transfers
router.get('/', (req: Request, res: Response) => {
  db.all('SELECT * FROM transfers ORDER BY date DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// POST new transfer
router.post('/', (req: Request, res: Response) => {
  const { description, amount, date, fromBank, toBank } = req.body;

  // Validate required fields
  if (!description || !amount || !date || !fromBank || !toBank) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  // Check if trying to transfer to the same bank
  if (fromBank === toBank) {
    res.status(400).json({ error: 'Cannot transfer to the same bank' });
    return;
  }

  // Check if source bank has sufficient funds
  db.get('SELECT balance FROM banks WHERE name = ?', [fromBank], (err, bank: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!bank) {
      res.status(404).json({ error: 'Source bank not found' });
      return;
    }

    if (bank.balance < amount) {
      res.status(400).json({ error: 'Insufficient funds in source bank' });
      return;
    }

    // Check if destination bank exists
    db.get('SELECT id FROM banks WHERE name = ?', [toBank], (err, destBank: any) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (!destBank) {
        res.status(404).json({ error: 'Destination bank not found' });
        return;
      }

      // Insert transfer
      db.run(
        'INSERT INTO transfers (description, amount, date, fromBank, toBank) VALUES (?, ?, ?, ?, ?)',
        [description, amount, date, fromBank, toBank],
        function (err) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }

          const transferId = this.lastID;

          // Update source bank balance (subtract)
          db.run(
            'UPDATE banks SET balance = balance - ? WHERE name = ?',
            [amount, fromBank],
            (err) => {
              if (err) {
                res.status(500).json({ error: err.message });
                return;
              }

              // Update destination bank balance (add)
              db.run(
                'UPDATE banks SET balance = balance + ? WHERE name = ?',
                [amount, toBank],
                (err) => {
                  if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                  }

                  res.status(201).json({
                    data: {
                      id: transferId,
                      description,
                      amount,
                      date,
                      fromBank,
                      toBank,
                    }
                  });
                }
              );
            }
          );
        }
      );
    });
  });
});

// DELETE transfer
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  // Get transfer details first
  db.get('SELECT * FROM transfers WHERE id = ?', [id], (err, transfer: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!transfer) {
      res.status(404).json({ error: 'Transfer not found' });
      return;
    }

    // Delete transfer
    db.run('DELETE FROM transfers WHERE id = ?', [id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      // Reverse the transfer: add back to source bank
      db.run(
        'UPDATE banks SET balance = balance + ? WHERE name = ?',
        [transfer.amount, transfer.fromBank],
        (err) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }

          // Reverse the transfer: subtract from destination bank
          db.run(
            'UPDATE banks SET balance = balance - ? WHERE name = ?',
            [transfer.amount, transfer.toBank],
            (err) => {
              if (err) {
                res.status(500).json({ error: err.message });
                return;
              }

              res.json({
                message: 'Transfer deleted and reversed successfully',
                changes: this.changes,
              });
            }
          );
        }
      );
    });
  });
});

export default router;
