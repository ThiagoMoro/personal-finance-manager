import db from '../config/database';

export interface RecurringPayment {
  id?: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  dayOfMonth: number;
  category: string;
}

export const RecurringPaymentModel = {
  getAll: (): RecurringPayment[] => {
    return db.prepare('SELECT * FROM recurring_payments ORDER BY dayOfMonth').all() as RecurringPayment[];
  },

  getById: (id: number): RecurringPayment | undefined => {
    return db.prepare('SELECT * FROM recurring_payments WHERE id = ?').get(id) as RecurringPayment | undefined;
  },

  create: (payment: Omit<RecurringPayment, 'id'>): RecurringPayment => {
    const result = db.prepare(
      'INSERT INTO recurring_payments (description, amount, type, dayOfMonth, category) VALUES (?, ?, ?, ?, ?)'
    ).run(payment.description, payment.amount, payment.type, payment.dayOfMonth, payment.category);
    return { id: result.lastInsertRowid as number, ...payment };
  },

  delete: (id: number): boolean => {
    const result = db.prepare('DELETE FROM recurring_payments WHERE id = ?').run(id);
    return result.changes > 0;
  }
};
