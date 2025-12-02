import db from '../config/database';

export interface Expense {
  id?: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  bank: string;
}

export const ExpenseModel = {
  getAll: (): Expense[] => {
    return db.prepare('SELECT * FROM expenses ORDER BY date DESC').all() as Expense[];
  },

  getById: (id: number): Expense | undefined => {
    return db.prepare('SELECT * FROM expenses WHERE id = ?').get(id) as Expense | undefined;
  },

  create: (expense: Omit<Expense, 'id'>): Expense => {
    const result = db.prepare(
      'INSERT INTO expenses (description, amount, date, category, bank) VALUES (?, ?, ?, ?, ?)'
    ).run(expense.description, expense.amount, expense.date, expense.category, expense.bank);
    return { id: result.lastInsertRowid as number, ...expense };
  },

  delete: (id: number): boolean => {
    const result = db.prepare('DELETE FROM expenses WHERE id = ?').run(id);
    return result.changes > 0;
  }
};
