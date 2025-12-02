import db from '../config/database';

export interface Income {
  id?: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  bank: string;
}

export const IncomeModel = {
  getAll: (): Income[] => {
    return db.prepare('SELECT * FROM incomes ORDER BY date DESC').all() as Income[];
  },

  getById: (id: number): Income | undefined => {
    return db.prepare('SELECT * FROM incomes WHERE id = ?').get(id) as Income | undefined;
  },

  create: (income: Omit<Income, 'id'>): Income => {
    const result = db.prepare(
      'INSERT INTO incomes (description, amount, date, category, bank) VALUES (?, ?, ?, ?, ?)'
    ).run(income.description, income.amount, income.date, income.category, income.bank);
    return { id: result.lastInsertRowid as number, ...income };
  },

  delete: (id: number): boolean => {
    const result = db.prepare('DELETE FROM incomes WHERE id = ?').run(id);
    return result.changes > 0;
  }
};
