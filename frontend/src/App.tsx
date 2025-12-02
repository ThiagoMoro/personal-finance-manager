import { useState, useEffect } from 'react';
import type { Bank, Income, Expense, RecurringPayment } from './types';
import { banksAPI, incomesAPI, expensesAPI, recurringAPI } from './services/api';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Dashboard from './components/dashboard/Dashboard';
import BankForm from './components/banks/BankForm';
import BankList from './components/banks/BankList';
import IncomeForm from './components/incomes/IncomeForm';
import IncomeList from './components/incomes/IncomeList';
import ExpenseForm from './components/expenses/ExpenseForm';
import ExpenseList from './components/expenses/ExpenseList';
import RecurringForm from './components/recurring/RecurringForm';
import RecurringList from './components/recurring/RecurringList';

function App() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [recurring, setRecurring] = useState<RecurringPayment[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newBank, setNewBank] = useState({ name: '', balance: '' });
  const [newIncome, setNewIncome] = useState({ description: '', amount: '', date: '', category: '', bank: '' });
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', date: '', category: '', bank: '' });
  const [newRecurring, setNewRecurring] = useState({ 
    description: '', 
    amount: '', 
    type: '', 
    dayOfMonth: '', 
    category: '' 
  });

  // Carregar dados iniciais
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [banksRes, incomesRes, expensesRes, recurringRes] = await Promise.all([
        banksAPI.getAll(),
        incomesAPI.getAll(),
        expensesAPI.getAll(),
        recurringAPI.getAll(),
      ]);

      setBanks(banksRes.data);
      setIncomes(incomesRes.data);
      setExpenses(expensesRes.data);
      setRecurring(recurringRes.data);
    } catch (err) {
      setError('Failed to load data. Please check if the server is running.');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Banks
  const addBank = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newBank.name && newBank.balance) {
      try {
        const response = await banksAPI.create({
          name: newBank.name,
          balance: parseFloat(newBank.balance),
        });
        setBanks([...banks, response.data]);
        setNewBank({ name: '', balance: '' });
      } catch (err) {
        console.error('Error creating bank:', err);
        alert('Failed to create bank');
      }
    }
  };

  const removeBank = async (id: number) => {
    try {
      await banksAPI.delete(id);
      setBanks(banks.filter(b => b.id !== id));
    } catch (err) {
      console.error('Error deleting bank:', err);
      alert('Failed to delete bank');
    }
  };

  // Incomes
  const addIncome = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newIncome.description && newIncome.amount && newIncome.date && newIncome.bank) {
      try {
        const response = await incomesAPI.create({
          description: newIncome.description,
          amount: parseFloat(newIncome.amount),
          date: newIncome.date,
          category: newIncome.category,
          bank: newIncome.bank,
        });
        
        setIncomes([...incomes, response.data]);
        
        // Atualizar saldo do banco localmente
        setBanks(banks.map(b => 
          b.name === newIncome.bank 
            ? { ...b, balance: b.balance + parseFloat(newIncome.amount) } 
            : b
        ));
        
        setNewIncome({ description: '', amount: '', date: '', category: '', bank: '' });
      } catch (err) {
        console.error('Error creating income:', err);
        alert('Failed to create income');
      }
    }
  };

  const removeIncome = async (id: number) => {
    try {
      await incomesAPI.delete(id);
      setIncomes(incomes.filter(i => i.id !== id));
      // Recarregar bancos para atualizar saldo
      const banksRes = await banksAPI.getAll();
      setBanks(banksRes.data);
    } catch (err) {
      console.error('Error deleting income:', err);
      alert('Failed to delete income');
    }
  };

  // Expenses
  const addExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount && newExpense.date && newExpense.bank) {
      try {
        const response = await expensesAPI.create({
          description: newExpense.description,
          amount: parseFloat(newExpense.amount),
          date: newExpense.date,
          category: newExpense.category,
          bank: newExpense.bank,
        });
        
        setExpenses([...expenses, response.data]);
        
        // Atualizar saldo do banco localmente
        setBanks(banks.map(b => 
          b.name === newExpense.bank 
            ? { ...b, balance: b.balance - parseFloat(newExpense.amount) } 
            : b
        ));
        
        setNewExpense({ description: '', amount: '', date: '', category: '', bank: '' });
      } catch (err) {
        console.error('Error creating expense:', err);
        alert('Failed to create expense');
      }
    }
  };

  const removeExpense = async (id: number) => {
    try {
      await expensesAPI.delete(id);
      setExpenses(expenses.filter(d => d.id !== id));
      // Recarregar bancos para atualizar saldo
      const banksRes = await banksAPI.getAll();
      setBanks(banksRes.data);
    } catch (err) {
      console.error('Error deleting expense:', err);
      alert('Failed to delete expense');
    }
  };

  // Recurring Payments
  const addRecurring = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newRecurring.description && newRecurring.amount && newRecurring.type && newRecurring.dayOfMonth) {
      try {
        const response = await recurringAPI.create({
          description: newRecurring.description,
          amount: parseFloat(newRecurring.amount),
          type: newRecurring.type as 'income' | 'expense',
          dayOfMonth: parseInt(newRecurring.dayOfMonth),
          category: newRecurring.category,
        });
        
        setRecurring([...recurring, response.data]);
        setNewRecurring({ description: '', amount: '', type: '', dayOfMonth: '', category: '' });
      } catch (err) {
        console.error('Error creating recurring payment:', err);
        alert('Failed to create recurring payment');
      }
    }
  };

  const removeRecurring = async (id: number) => {
    try {
      await recurringAPI.delete(id);
      setRecurring(recurring.filter(r => r.id !== id));
    } catch (err) {
      console.error('Error deleting recurring payment:', err);
      alert('Failed to delete recurring payment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading your finances...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-red-600 text-center mb-4">
            <i className="fas fa-exclamation-triangle text-5xl"></i>
          </div>
          <h2 className="text-xl font-bold text-center mb-2 text-slate-900">Connection Error</h2>
          <p className="text-slate-600 text-center mb-6">{error}</p>
          <button
            onClick={loadAllData}
            className="btn-primary w-full"
          >
            <i className="fas fa-rotate-right mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard banks={banks} incomes={incomes} expenses={expenses} />
        )}

        {activeTab === 'banks' && (
          <div className="page-grid">
            <BankForm newBank={newBank} setNewBank={setNewBank} onSubmit={addBank} />
            <BankList banks={banks} onRemove={removeBank} />
          </div>
        )}

        {activeTab === 'incomes' && (
          <div className="page-grid">
            <IncomeForm newIncome={newIncome} setNewIncome={setNewIncome} banks={banks} onSubmit={addIncome} />
            <IncomeList incomes={incomes} onRemove={removeIncome} />
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="page-grid">
            <ExpenseForm newExpense={newExpense} setNewExpense={setNewExpense} banks={banks} onSubmit={addExpense} />
            <ExpenseList expenses={expenses} onRemove={removeExpense} />
          </div>
        )}

        {activeTab === 'recurring' && (
          <div className="page-grid">
            <RecurringForm 
              newRecurring={newRecurring} 
              setNewRecurring={setNewRecurring} 
              onSubmit={addRecurring} 
            />
            <RecurringList recurring={recurring} onRemove={removeRecurring} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
