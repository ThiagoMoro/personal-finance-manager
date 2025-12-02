import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

// CORS - DEVE VIR PRIMEIRO
app.use(cors());

// Body parser
app.use(express.json());

// Dados em memória (temporário para testar)
let banks: any[] = [];
let incomes: any[] = [];
let expenses: any[] = [];
let recurring: any[] = [];

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Banks routes
app.get('/api/banks', (req: Request, res: Response) => {
  res.json(banks);
});

app.post('/api/banks', (req: Request, res: Response) => {
  const newBank = { id: Date.now(), ...req.body };
  banks.push(newBank);
  res.status(201).json(newBank);
});

app.delete('/api/banks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  banks = banks.filter(b => b.id !== id);
  res.json({ message: 'Bank deleted' });
});

// Incomes routes
app.get('/api/incomes', (req: Request, res: Response) => {
  res.json(incomes);
});

app.post('/api/incomes', (req: Request, res: Response) => {
  const newIncome = { id: Date.now(), ...req.body };
  incomes.push(newIncome);
  
  // Atualizar saldo do banco
  banks = banks.map(b => 
    b.name === req.body.bank 
      ? { ...b, balance: b.balance + req.body.amount } 
      : b
  );
  
  res.status(201).json(newIncome);
});

app.delete('/api/incomes/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  incomes = incomes.filter(i => i.id !== id);
  res.json({ message: 'Income deleted' });
});

// Expenses routes
app.get('/api/expenses', (req: Request, res: Response) => {
  res.json(expenses);
});

app.post('/api/expenses', (req: Request, res: Response) => {
  const newExpense = { id: Date.now(), ...req.body };
  expenses.push(newExpense);
  
  // Atualizar saldo do banco
  banks = banks.map(b => 
    b.name === req.body.bank 
      ? { ...b, balance: b.balance - req.body.amount } 
      : b
  );
  
  res.status(201).json(newExpense);
});

app.delete('/api/expenses/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  expenses = expenses.filter(e => e.id !== id);
  res.json({ message: 'Expense deleted' });
});

// Recurring routes
app.get('/api/recurring', (req: Request, res: Response) => {
  res.json(recurring);
});

app.post('/api/recurring', (req: Request, res: Response) => {
  const newRecurring = { id: Date.now(), ...req.body };
  recurring.push(newRecurring);
  res.status(201).json(newRecurring);
});

app.delete('/api/recurring/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  recurring = recurring.filter(r => r.id !== id);
  res.json({ message: 'Recurring payment deleted' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health\n`);
});
