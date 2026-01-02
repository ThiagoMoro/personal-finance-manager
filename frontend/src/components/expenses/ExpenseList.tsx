import { useState } from 'react';
import type { Expense } from '../../types';

interface ExpenseListProps {
  expenses: Expense[];
  onRemove: (id: number) => void;
}

const EXPENSE_CATEGORY_LABELS: Record<string, string> = {
  'Home': '🏠 Home',
  'Utilities': '💡 Utilities',
  'Phone': '📱 Phone',
  'Insurance': '🛡️ Insurance',
  'Food': '🍔 Food & Groceries',
  'Restaurants': '🍽️ Restaurants',
  'Delivery': '🛵 Delivery',
  'Snacks': '🍿 Snacks & Drinks',
  'Transport': '🚗 Transport',
  'Fuel': '⛽ Fuel',
  'Car': '🔧 Car Maintenance',
  'Parking': '🅿️ Parking & Tolls',
  'Taxi': '🚕 Taxi & Uber',
  'Healthcare': '🏥 Healthcare',
  'Gym': '💪 Gym & Sports',
  'Beauty': '💅 Beauty & Personal Care',
  'Education': '🎓 Education',
  'Books': '📚 Books & Magazines',
  'Courses': '💻 Online Courses',
  'Entertainment': '🎬 Entertainment',
  'Subscriptions': '📺 Subscriptions',
  'Hobbies': '🎨 Hobbies',
  'Games': '🎮 Games',
  'Travel': '✈️ Travel & Holidays',
  'Shopping': '👕 Shopping',
  'Electronics': '📱 Electronics',
  'Gifts': '🎁 Gifts',
  'Children': '👶 Children',
  'Pets': '🐾 Pets',
  'Work': '💼 Work Expenses',
  'Office': '📎 Office Supplies',
  'Taxes': '🧾 Taxes',
  'Fees': '🏦 Bank Fees',
  'Donations': '❤️ Donations',
  'Other': '📦 Other',
};

export default function ExpenseList({ expenses, onRemove }: ExpenseListProps) {
  const [filterBank, setFilterBank] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const getCategoryLabel = (category?: string) => {
    if (!category) return '📦 Other';
    return EXPENSE_CATEGORY_LABELS[category] || category;
  };

  // Obter lista única de bancos
  const uniqueBanks = Array.from(new Set(expenses.map(e => e.bank))).sort();

  // Obter categorias baseadas no banco selecionado
  const expensesForSelectedBank = filterBank === 'all' 
    ? expenses 
    : expenses.filter(e => e.bank === filterBank);

  const uniqueCategories = Array.from(
    new Set(expensesForSelectedBank.map(e => e.category).filter(Boolean))
  ).sort();

  // Filtrar despesas
  const filteredExpenses = expenses.filter(expense => {
    const matchBank = filterBank === 'all' || expense.bank === filterBank;
    const matchCategory = filterCategory === 'all' || expense.category === filterCategory;
    return matchBank && matchCategory;
  });

  const totalExpense = filteredExpenses.reduce((acc, e) => acc + e.amount, 0);

  // Quando muda o banco, reseta a categoria se ela não existir no novo banco
  const handleBankChange = (newBank: string) => {
    setFilterBank(newBank);
    
    // Se a categoria atual não existe no novo banco, reseta para 'all'
    if (filterCategory !== 'all') {
      const newBankExpenses = newBank === 'all' 
        ? expenses 
        : expenses.filter(e => e.bank === newBank);
      
      const categoriesInNewBank = new Set(newBankExpenses.map(e => e.category));
      
      if (!categoriesInNewBank.has(filterCategory)) {
        setFilterCategory('all');
      }
    }
  };

  return (
    <div className="card p-6 card-animate animate-fade-in">
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-receipt text-red-600" />
          My Expenses
        </h2>
        <span className="text-sm font-medium text-slate-500">
          {filteredExpenses.length} of {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
        </span>
      </div>

      {/* FILTROS */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="label text-xs">Filter by Bank</label>
          <select
            value={filterBank}
            onChange={(e) => handleBankChange(e.target.value)}
            className="select text-sm"
          >
            <option value="all">🏦 All Banks ({expenses.length})</option>
            {uniqueBanks.map(bank => {
              const count = expenses.filter(e => e.bank === bank).length;
              return (
                <option key={bank} value={bank}>
                  {bank} ({count})
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="label text-xs">
            Filter by Category
            {filterBank !== 'all' && (
              <span className="text-slate-400 ml-1">in {filterBank}</span>
            )}
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="select text-sm"
            disabled={uniqueCategories.length === 0}
          >
            <option value="all">
              📦 All Categories ({expensesForSelectedBank.length})
            </option>
            {uniqueCategories.map(category => {
              const count = expensesForSelectedBank.filter(e => e.category === category).length;
              return (
                <option key={category} value={category}>
                  {getCategoryLabel(category)} ({count})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Botão para limpar filtros */}
      {(filterBank !== 'all' || filterCategory !== 'all') && (
        <button
          onClick={() => {
            setFilterBank('all');
            setFilterCategory('all');
          }}
          className="text-xs text-blue-600 hover:text-blue-700 mb-3 flex items-center gap-1"
        >
          <i className="fas fa-times-circle" />
          Clear filters
        </button>
      )}

      {/* TOTAL */}
      {totalExpense > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-4 mb-4 border border-red-100">
          <p className="text-xs text-slate-600 mb-1">
            {filterBank !== 'all' || filterCategory !== 'all' ? 'Filtered Total' : 'Total Expenses'}
          </p>
          <p className="text-2xl font-bold text-red-600">-€{totalExpense.toFixed(2)}</p>
          {filterBank !== 'all' && (
            <p className="text-xs text-slate-500 mt-1">
              from {filterBank}
              {filterCategory !== 'all' && ` • ${getCategoryLabel(filterCategory)}`}
            </p>
          )}
        </div>
      )}

      {/* LISTA */}
      <div className="space-y-0 border border-slate-100 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-receipt text-4xl text-slate-300 mb-3" />
            <p className="text-slate-400">
              {expenses.length === 0 ? 'No expenses recorded yet' : 'No expenses match the filters'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {expenses.length === 0 ? 'Add your first expense to track spending' : 'Try adjusting your filters'}
            </p>
          </div>
        ) : (
          filteredExpenses.slice().reverse().map((expense) => (
            <div key={expense.id} className="list-item">
              <div className="flex items-start gap-3 flex-1">
                <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-minus text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{expense.description}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs text-slate-500">
                      <i className="fas fa-calendar mr-1" />
                      {new Date(expense.date).toLocaleDateString('en-GB')}
                    </span>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                      {getCategoryLabel(expense.category)}
                    </span>
                    <span className="text-xs text-slate-500">
                      <i className="fas fa-building-columns mr-1" />
                      {expense.bank}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <p className="text-lg font-bold text-red-600">-€{expense.amount.toFixed(2)}</p>
                <button
                  onClick={() => onRemove(expense.id!)}
                  className="btn-danger"
                  title="Delete expense"
                >
                  <i className="fas fa-trash" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
