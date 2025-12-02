import type { Bank } from '../../types';

interface IncomeFormProps {
  newIncome: { description: string; amount: string; date: string; category: string; bank: string };
  setNewIncome: (income: { description: string; amount: string; date: string; category: string; bank: string }) => void;
  banks: Bank[];
  onSubmit: (e: React.FormEvent) => void;
}

export default function IncomeForm({ newIncome, setNewIncome, banks, onSubmit }: IncomeFormProps) {
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
            placeholder="e.g. Salary, Freelance work"
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
          <label className="label">Category</label>
          <input
            type="text"
            value={newIncome.category}
            onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
            className="input"
            placeholder="e.g. Salary, Investment, Gift"
          />
        </div>
        <div>
          <label className="label">Bank</label>
          <select
            value={newIncome.bank}
            onChange={(e) => setNewIncome({ ...newIncome, bank: e.target.value })}
            className="select"
            required
          >
            <option value="">Select a bank</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.name}>
                {bank.name}
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
