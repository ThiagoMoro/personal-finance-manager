import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '..', 'database.sqlite');

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to SQLite:', err.message);
  } else {
    console.log('✅ Connected to SQLite database at:', dbPath);
    initDatabase();
  }
});

function initDatabase() {
  db.serialize(() => {
    // Tabela Banks
    db.run(`
      CREATE TABLE IF NOT EXISTS banks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        balance REAL NOT NULL DEFAULT 0
      )
    `);

    // Tabela Incomes
    db.run(`
      CREATE TABLE IF NOT EXISTS incomes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        category TEXT,
        bank TEXT NOT NULL
      )
    `);

    // Tabela Expenses
    db.run(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        category TEXT,
        bank TEXT NOT NULL
      )
    `);

    // Tabela Recurring Payments
    db.run(`
      CREATE TABLE IF NOT EXISTS recurring_payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        dayOfMonth INTEGER NOT NULL,
        category TEXT
      )
    `);

    console.log('✅ Database tables initialized');
  });
}
