import type { Expense } from '../../types';

interface ExpenseListProps {
  expenses: Expense[];
  onRemove: (id: number) => void;
}

export default function ExpenseList({ expenses, onRemove }: ExpenseListProps) {
  const totalExpense = expenses.reduce((acc, e) => acc + e.amount, 0);

  return (
    <div className="card p-6 card-animate animate-fade-in">
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-receipt text-red-600" />
          My Expenses
        </h2>
        <span className="text-sm font-medium text-slate-500">
          {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
        </span>
      </div>

      {totalExpense > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 mb-4 border border-red-100">
          <p className="text-xs text-slate-600 mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">-€{totalExpense.toFixed(2)}</p>
        </div>
      )}

      <div className="space-y-0 border border-slate-100 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
        {expenses.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-arrow-trend-down text-4xl text-slate-300 mb-3" />
            <p className="text-slate-400">No expenses recorded yet</p>
            <p className="text-xs text-slate-400 mt-1">Add your first expense to track spending</p>
          </div>
        ) : (
          expenses.slice().reverse().map((expense) => (
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
                    {expense.category && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        {expense.category}
                      </span>
                    )}
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
