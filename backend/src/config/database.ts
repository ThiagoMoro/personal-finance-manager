import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new Database(dbPath);

// Criar tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS banks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    balance REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS incomes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    category TEXT,
    bank TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    category TEXT,
    bank TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS recurring_payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT NOT NULL,
    dayOfMonth INTEGER NOT NULL,
    category TEXT
  );
`);

export default db;
