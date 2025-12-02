import type { RecurringPayment } from '../../types';

interface RecurringListProps {
  recurring: RecurringPayment[];
  onRemove: (id: number) => void;
}

export default function RecurringList({ recurring, onRemove }: RecurringListProps) {
  const sortedRecurring = [...recurring].sort((a, b) => a.dayOfMonth - b.dayOfMonth);

  const totalIncome = recurring.filter(r => r.type === 'income').reduce((acc, r) => acc + r.amount, 0);
  const totalExpense = recurring.filter(r => r.type === 'expense').reduce((acc, r) => acc + r.amount, 0);
  const monthlyBalance = totalIncome - totalExpense;

  return (
    <div className="card p-6 card-animate animate-fade-in">
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-repeat text-purple-600" />
          Monthly Recurring Payments
        </h2>
        <span className="text-sm font-medium text-slate-500">
          {recurring.length} {recurring.length === 1 ? 'payment' : 'payments'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
          <p className="text-xs text-slate-600 mb-1">Monthly Income</p>
          <p className="text-lg font-bold text-green-600">€{totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 border border-red-100">
          <p className="text-xs text-slate-600 mb-1">Monthly Expenses</p>
          <p className="text-lg font-bold text-red-600">€{totalExpense.toFixed(2)}</p>
        </div>
        <div className={`bg-gradient-to-br rounded-lg p-4 border ${monthlyBalance >= 0 ? 'from-blue-50 to-indigo-50 border-blue-100' : 'from-red-50 to-orange-50 border-red-100'}`}>
          <p className="text-xs text-slate-600 mb-1">Net Balance</p>
          <p className={`text-lg font-bold ${monthlyBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            €{monthlyBalance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-0 border border-slate-100 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
        {sortedRecurring.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-calendar-days text-4xl text-slate-300 mb-3" />
            <p className="text-slate-400">No recurring payments yet</p>
            <p className="text-xs text-slate-400 mt-1">Add recurring incomes or expenses to plan ahead</p>
          </div>
        ) : (
          sortedRecurring.map((r) => (
            <div key={r.id} className="list-item">
              <div className="flex items-start gap-3 flex-1">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${r.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <i className={`fas ${r.type === 'income' ? 'fa-plus' : 'fa-minus'} ${r.type === 'income' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{r.description}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                      <i className="fas fa-calendar mr-1" />
                      Day {r.dayOfMonth}
                    </span>
                    {r.category && (
                      <span className={`text-xs px-2 py-0.5 rounded ${r.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {r.category}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded ${r.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {r.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <p className={`text-lg font-bold ${r.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {r.type === 'income' ? '+' : '-'}€{r.amount.toFixed(2)}
                </p>
                <button
                  onClick={() => onRemove(r.id!)}
                  className="btn-danger"
                  title="Delete recurring payment"
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
