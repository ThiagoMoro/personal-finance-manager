import type { Bank } from '../../types';

interface ExpenseFormProps {
  newExpense: { description: string; amount: string; date: string; category: string; bank: string };
  setNewExpense: (expense: { description: string; amount: string; date: string; category: string; bank: string }) => void;
  banks: Bank[];
  onSubmit: (e: React.FormEvent) => void;
}

const EXPENSE_CATEGORIES = [
  { value: 'home', label: '🏠 Home' },
  { value: 'utilities', label: '💡 Utilities' },
  { value: 'phone', label: '📱 Phone' },
  { value: 'insurance', label: '🛡️ Insurance' },
  { value: 'food', label: '🍔 Food & Groceries' },
  { value: 'restaurants', label: '🍽️ Restaurants' },
  { value: 'delivery', label: '🛵 Delivery' },
  { value: 'snacks', label: '🍿 Snacks & Drinks' },
  { value: 'transport', label: '🚗 Transport' },
  { value: 'fuel', label: '⛽ Fuel' },
  { value: 'car', label: '🔧 Car Maintenance' },
  { value: 'parking', label: '🅿️ Parking & Tolls' },
  { value: 'taxi', label: '🚕 Taxi & Uber' },
  { value: 'healthcare', label: '🏥 Healthcare' },
  { value: 'gym', label: '💪 Gym & Sports' },
  { value: 'beauty', label: '💅 Beauty & Personal Care' },
  { value: 'education', label: '🎓 Education' },
  { value: 'books', label: '📚 Books & Magazines' },
  { value: 'courses', label: '💻 Online Courses' },
  { value: 'entertainment', label: '🎬 Entertainment' },
  { value: 'subscriptions', label: '📺 Subscriptions' },
  { value: 'hobbies', label: '🎨 Hobbies' },
  { value: 'games', label: '🎮 Games' },
  { value: 'travel', label: '✈️ Travel & Holidays' },
  { value: 'shopping', label: '👕 Shopping' },
  { value: 'electronics', label: '📱 Electronics' },
  { value: 'gifts', label: '🎁 Gifts' },
  { value: 'children', label: '👶 Children' },
  { value: 'pets', label: '🐾 Pets' },
  { value: 'work', label: '💼 Work Expenses' },
  { value: 'office', label: '📎 Office Supplies' },
  { value: 'taxes', label: '🧾 Taxes' },
  { value: 'fees', label: '🏦 Bank Fees' },
  { value: 'donations', label: '❤️ Donations' },
  { value: 'other', label: '📦 Other' },
];

export default function ExpenseForm({ newExpense, setNewExpense, banks, onSubmit }: ExpenseFormProps) {
  return (
    <div className="card p-6 card-animate animate-fade-in">
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-arrow-trend-down text-red-600" />
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
            placeholder="e.g. Supermarket, Restaurant, Fuel"
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
        <div>
          <label className="label">Bank</label>
          <select
            value={newExpense.bank}
            onChange={(e) => setNewExpense({ ...newExpense, bank: e.target.value })}
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
        <button type="submit" className="btn-primary w-full bg-red-600 hover:bg-red-700">
          <i className="fas fa-minus mr-2" />
          Add Expense
        </button>
      </form>
    </div>
  );
}
