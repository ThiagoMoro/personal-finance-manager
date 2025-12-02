import db from '../config/database';

export interface Bank {
  id?: number;
  name: string;
  balance: number;
}

export const BankModel = {
  getAll: (): Bank[] => {
    return db.prepare('SELECT * FROM banks').all() as Bank[];
  },

  getById: (id: number): Bank | undefined => {
    return db.prepare('SELECT * FROM banks WHERE id = ?').get(id) as Bank | undefined;
  },

  create: (bank: Omit<Bank, 'id'>): Bank => {
    const result = db.prepare('INSERT INTO banks (name, balance) VALUES (?, ?)').run(bank.name, bank.balance);
    return { id: result.lastInsertRowid as number, ...bank };
  },

  update: (id: number, bank: Partial<Bank>): boolean => {
    const result = db.prepare('UPDATE banks SET name = ?, balance = ? WHERE id = ?').run(bank.name, bank.balance, id);
    return result.changes > 0;
  },

  delete: (id: number): boolean => {
    const result = db.prepare('DELETE FROM banks WHERE id = ?').run(id);
    return result.changes > 0;
  },

  updateBalance: (name: string, amount: number): boolean => {
    const result = db.prepare('UPDATE banks SET balance = balance + ? WHERE name = ?').run(amount, name);
    return result.changes > 0;
  }
};
