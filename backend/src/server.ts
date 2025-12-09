import express from 'express';
import cors from 'cors';
import banksRouter from './routes/banks';
import incomesRouter from './routes/incomes';
import expensesRouter from './routes/expenses';
import recurringRouter from './routes/recurring';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/banks', banksRouter);
app.use('/incomes', incomesRouter);
app.use('/expenses', expensesRouter);
app.use('/recurring', recurringRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: '✅ Personal Finance API is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
