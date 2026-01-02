import { useState } from 'react';
import type { Income } from '../../types';

interface IncomeListProps {
  incomes: Income[];
  onRemove: (id: number) => void;
}

const INCOME_CATEGORY_LABELS: Record<string, string> = {
  'Salary': '💼 Salary',
  'Bonus': '🎉 Bonus',
  'Freelance': '💻 Freelance',
  'Commission': '💰 Commission',
  'Investments': '📈 Investments',
  'Dividends': '💵 Dividends',
  'Interest': '🏦 Interest',
  'Rental': '🏠 Rental Income',
  'Side-Hustle': '🚀 Side Hustle',
  'Refunds': '↩️ Refunds',
  'Gifts': '🎁 Gifts Received',
  'Cashback': '💳 Cashback',
  'Other': '📦 Other Income',
};

export default function IncomeList({ incomes, onRemove }: IncomeListProps) {
  const [filterBank, setFilterBank] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const getCategoryLabel = (category?: string) => {
    if (!category) return '📦 Other Income';
    return INCOME_CATEGORY_LABELS[category] || category;
  };

  // Obter lista única de bancos
  const uniqueBanks = Array.from(new Set(incomes.map(i => i.bank))).sort();

  // Obter categorias baseadas no banco selecionado
  const incomesForSelectedBank = filterBank === 'all' 
    ? incomes 
    : incomes.filter(i => i.bank === filterBank);

  const uniqueCategories = Array.from(
    new Set(incomesForSelectedBank.map(i => i.category).filter(Boolean))
  ).sort();

  // Filtrar incomes
  const filteredIncomes = incomes.filter(income => {
    const matchBank = filterBank === 'all' || income.bank === filterBank;
    const matchCategory = filterCategory === 'all' || income.category === filterCategory;
    return matchBank && matchCategory;
  });

  const totalIncome = filteredIncomes.reduce((acc, i) => acc + i.amount, 0);

  // Quando muda o banco, reseta a categoria se ela não existir no novo banco
  const handleBankChange = (newBank: string) => {
    setFilterBank(newBank);
    
    if (filterCategory !== 'all') {
      const newBankIncomes = newBank === 'all' 
        ? incomes 
        : incomes.filter(i => i.bank === newBank);
      
      const categoriesInNewBank = new Set(newBankIncomes.map(i => i.category));
      
      if (!categoriesInNewBank.has(filterCategory)) {
        setFilterCategory('all');
      }
    }
  };

  return (
    <div className="card p-6 card-animate animate-fade-in">
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-arrow-trend-up text-green-600" />
          My Incomes
        </h2>
        <span className="text-sm font-medium text-slate-500">
          {filteredIncomes.length} of {incomes.length} {incomes.length === 1 ? 'income' : 'incomes'}
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
            <option value="all">🏦 All Banks ({incomes.length})</option>
            {uniqueBanks.map(bank => {
              const count = incomes.filter(i => i.bank === bank).length;
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
              📦 All Categories ({incomesForSelectedBank.length})
            </option>
            {uniqueCategories.map(category => {
              const count = incomesForSelectedBank.filter(i => i.category === category).length;
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
      {totalIncome > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-100">
          <p className="text-xs text-slate-600 mb-1">
            {filterBank !== 'all' || filterCategory !== 'all' ? 'Filtered Total' : 'Total Incomes'}
          </p>
          <p className="text-2xl font-bold text-green-600">+€{totalIncome.toFixed(2)}</p>
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
        {filteredIncomes.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-arrow-trend-up text-4xl text-slate-300 mb-3" />
            <p className="text-slate-400">
              {incomes.length === 0 ? 'No incomes recorded yet' : 'No incomes match the filters'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {incomes.length === 0 ? 'Add your first income to start tracking' : 'Try adjusting your filters'}
            </p>
          </div>
        ) : (
          filteredIncomes.slice().reverse().map((income) => (
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
