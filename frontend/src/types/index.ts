export interface Bank {
  id: number;
  name: string;
  balance: number;
}

export interface Income {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  bank: string;
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  bank: string;
}

export interface PieData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface RecurringPayment {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  dayOfMonth: number;
  category: string;
}

export interface Transfer {
  id: number;
  description: string;
  amount: number;
  date: string;
  fromBank: string;
  toBank: string;
}