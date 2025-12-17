import type { Income } from '../../types';

interface IncomeListProps {
  incomes: Income[];
  onRemove: (id: number) => void;
}

const INCOME_CATEGORY_LABELS: Record<string, string> = {
  'salary': '💼 Salary',
  'bonus': '🎉 Bonus',
  'freelance': '💻 Freelance',
  'commission': '💰 Commission',
  'investments': '📈 Investments',
  'interest': '🏦 Interest',
  'rental': '🏠 Rental Income',
  'gifts': '🎁 Gifts',
  'refunds': '↩️ Refunds',
  'side-hustle': '🚀 Side Hustle',
  'other': '📦 Other Income',
};

export default function IncomeList({ incomes, onRemove }: IncomeListProps) {
  const totalIncome = incomes.reduce((acc, i) => acc + i.amount, 0);

  const getCategoryLabel = (category?: string) => {
    if (!category) return '📦 Other';
    return INCOME_CATEGORY_LABELS[category] || category;
  };

  return (
    <div className="card p-6 card-animate animate-fade-in">
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-money-bill-trend-up text-green-600" />
          My Incomes
        </h2>
        <span className="text-sm font-medium text-slate-500">
          {incomes.length} {incomes.length === 1 ? 'income' : 'incomes'}
        </span>
      </div>

      {totalIncome > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-100">
          <p className="text-xs text-slate-600 mb-1">Total Incomes</p>
          <p className="text-2xl font-bold text-green-600">+€{totalIncome.toFixed(2)}</p>
        </div>
      )}

      <div className="space-y-0 border border-slate-100 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
        {incomes.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-arrow-trend-up text-4xl text-slate-300 mb-3" />
            <p className="text-slate-400">No incomes recorded yet</p>
            <p className="text-xs text-slate-400 mt-1">Add your first income to track earnings</p>
          </div>
        ) : (
          incomes.slice().reverse().map((income) => (
            <div key={income.id} className="list-item">
              <div className="flex items-start gap-3 flex-1">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-plus text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{income.description}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs text-slate-500">
                      <i className="fas fa-calendar mr-1" />
                      {new Date(income.date).toLocaleDateString('en-GB')}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      {getCategoryLabel(income.category)}
                    </span>
                    <span className="text-xs text-slate-500">
                      <i className="fas fa-building-columns mr-1" />
                      {income.bank}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <p className="text-lg font-bold text-green-600">+€{income.amount.toFixed(2)}</p>
                <button
                  onClick={() => onRemove(income.id!)}
                  className="btn-danger"
                  title="Delete income"
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
