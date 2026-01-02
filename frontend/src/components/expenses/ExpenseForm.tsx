import type { Bank } from '../../types';

interface ExpenseFormProps {
  banks: Bank[];
  newExpense: { description: string; amount: string; date: string; bank: string; category: string };
  setNewExpense: (expense: { description: string; amount: string; date: string; bank: string; category: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EXPENSE_CATEGORIES = [
  { value: 'Home', label: '🏠 Home' },
  { value: 'Utilities', label: '💡 Utilities' },
  { value: 'Phone', label: '📱 Phone' },
  { value: 'Insurance', label: '🛡️ Insurance' },
  { value: 'Food', label: '🍔 Food & Groceries' },
  { value: 'Restaurants', label: '🍽️ Restaurants' },
  { value: 'Delivery', label: '🛵 Delivery' },
  { value: 'Snacks', label: '🍿 Snacks & Drinks' },
  { value: 'Transport', label: '🚗 Transport' },
  { value: 'Fuel', label: '⛽ Fuel' },
  { value: 'Car', label: '🔧 Car Maintenance' },
  { value: 'Parking', label: '🅿️ Parking & Tolls' },
  { value: 'Taxi', label: '🚕 Taxi & Uber' },
  { value: 'Healthcare', label: '🏥 Healthcare' },
  { value: 'Gym', label: '💪 Gym & Sports' },
  { value: 'Beauty', label: '💅 Beauty & Personal Care' },
  { value: 'Education', label: '🎓 Education' },
  { value: 'Books', label: '📚 Books & Magazines' },
  { value: 'Courses', label: '💻 Online Courses' },
  { value: 'Entertainment', label: '🎬 Entertainment' },
  { value: 'Subscriptions', label: '📺 Subscriptions' },
  { value: 'Hobbies', label: '🎨 Hobbies' },
  { value: 'Games', label: '🎮 Games' },
  { value: 'Travel', label: '✈️ Travel & Holidays' },
  { value: 'Shopping', label: '👕 Shopping' },
  { value: 'Electronics', label: '📱 Electronics' },
  { value: 'Gifts', label: '🎁 Gifts' },
  { value: 'Children', label: '👶 Children' },
  { value: 'Pets', label: '🐾 Pets' },
  { value: 'Work', label: '💼 Work Expenses' },
  { value: 'Office', label: '📎 Office Supplies' },
  { value: 'Taxes', label: '🧾 Taxes' },
  { value: 'Fees', label: '🏦 Bank Fees' },
  { value: 'Donations', label: '❤️ Donations' },
  { value: 'Other', label: '📦 Other' },
];

export default function ExpenseForm({ banks, newExpense, setNewExpense, onSubmit }: ExpenseFormProps) {
  return (
    <div className="card p-6 card-animate animate-fade-in">
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-receipt text-red-600" />
          Add Expense
        </h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label">Description</label>
          <input
            type="text"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            className="input"
            placeholder="e.g. Supermarket, Petrol, Netflix"
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
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
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
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              className="input"
              required
            />
          </div>
        </div>
        <div>
          <label className="label">Bank Account</label>
          <select
            value={newExpense.bank}
            onChange={(e) => setNewExpense({ ...newExpense, bank: e.target.value })}
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
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="select"
            required
          >
            <option value="">Select a category</option>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-primary w-full">
          <i className="fas fa-plus mr-2" />
          Add Expense
        </button>
      </form>
    </div>
  );
}
