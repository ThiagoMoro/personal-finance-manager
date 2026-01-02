import type { Bank } from '../../types';

interface IncomeFormProps {
  banks: Bank[];
  newIncome: { description: string; amount: string; date: string; bank: string; category: string };
  setNewIncome: (income: { description: string; amount: string; date: string; bank: string; category: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const INCOME_CATEGORIES = [
  { value: 'Salary', label: '💼 Salary' },
  { value: 'Bonus', label: '🎉 Bonus' },
  { value: 'Freelance', label: '💻 Freelance' },
  { value: 'Commission', label: '💰 Commission' },
  { value: 'Investments', label: '📈 Investments' },
  { value: 'Dividends', label: '💵 Dividends' },
  { value: 'Interest', label: '🏦 Interest' },
  { value: 'Rental', label: '🏠 Rental Income' },
  { value: 'Side-Hustle', label: '🚀 Side Hustle' },
  { value: 'Refunds', label: '↩️ Refunds' },
  { value: 'Gifts', label: '🎁 Gifts Received' },
  { value: 'Cashback', label: '💳 Cashback' },
  { value: 'Other', label: '📦 Other Income' },
];

export default function IncomeForm({ banks, newIncome, setNewIncome, onSubmit }: IncomeFormProps) {
  return (
    <div className="card p-6 card-animate animate-fade-in">
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-arrow-trend-up text-green-600" />
          Add Income
        </h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label">Description</label>
          <input
            type="text"
            value={newIncome.description}
            onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
            className="input"
            placeholder="e.g. Monthly Salary, Freelance Project"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">€</span>
              <input
                type="number"
                step="0.01"
                value={newIncome.amount}
                onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
                className="input pl-8"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <div>
            <label className="label">Date</label>
            <input
              type="date"
              value={newIncome.date}
              onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
              className="input"
              required
            />
          </div>
        </div>
        <div>
          <label className="label">Bank Account</label>
          <select
            value={newIncome.bank}
            onChange={(e) => setNewIncome({ ...newIncome, bank: e.target.value })}
            className="select"
            required
          >
            <option value="">Select bank</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.name}>
                {bank.name} - €{bank.balance.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Category</label>
          <select
            value={newIncome.category}
            onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
            className="select"
            required
          >
            <option value="">Select a category</option>
            {INCOME_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-primary w-full">
          <i className="fas fa-plus mr-2" />
          Add Income
        </button>
      </form>
    </div>
  );
}
