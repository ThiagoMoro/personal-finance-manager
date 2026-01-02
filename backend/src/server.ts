import express from 'express';
import cors from 'cors';
import banksRouter from './routes/banks';
import incomesRouter from './routes/incomes';
import expensesRouter from './routes/expenses';
import recurringRouter from './routes/recurring';
import transfersRouter from './routes/transfers';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/banks', banksRouter);
app.use('/api/incomes', incomesRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/recurring', recurringRouter);
app.use('/api/transfers', transfersRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
