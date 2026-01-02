interface RecurringFormProps {
  newRecurring: { description: string; amount: string; type: string; dayOfMonth: string; category: string };
  setNewRecurring: (recurring: { description: string; amount: string; type: string; dayOfMonth: string; category: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const INCOME_CATEGORIES = [
  { value: 'Salary', label: '💼 Salary' },
  { value: 'Bonus', label: '🎉 Bonus' },
  { value: 'Freelance', label: '💻 Freelance' },
  { value: 'Commission', label: '💰 Commission' },
  { value: 'Investments', label: '📈 Investments' },
  { value: 'Interest', label: '🏦 Interest' },
  { value: 'Rental', label: '🏠 Rental Income' },
  { value: 'Side-Hustle', label: '🚀 Side Hustle' },
  { value: 'Other', label: '📦 Other Income' },
];

const EXPENSE_CATEGORIES = [
  { value: 'Home', label: '🏠 Home' },
  { value: 'Utilities', label: '💡 Utilities' },
  { value: 'Phone', label: '📱 Phone' },
  { value: 'Insurance', label: '🛡️ Insurance' },
  { value: 'Food', label: '🍔 Food & Groceries' },
  { value: 'Restaurants', label: '🍽️ Restaurants' },
  { value: 'Transport', label: '🚗 Transport' },
  { value: 'Fuel', label: '⛽ Fuel' },
  { value: 'Car', label: '🔧 Car Maintenance' },
  { value: 'Healthcare', label: '🏥 Healthcare' },
  { value: 'Gym', label: '💪 Gym & Sports' },
  { value: 'Beauty', label: '💅 Beauty & Personal Care' },
  { value: 'Education', label: '🎓 Education' },
  { value: 'Entertainment', label: '🎬 Entertainment' },
  { value: 'Subscriptions', label: '📺 Subscriptions' },
  { value: 'Travel', label: '✈️ Travel & Holidays' },
  { value: 'Shopping', label: '👕 Shopping' },
  { value: 'Children', label: '👶 Children' },
  { value: 'Pets', label: '🐾 Pets' },
  { value: 'Taxes', label: '🧾 Taxes' },
  { value: 'Fees', label: '🏦 Bank Fees' },
  { value: 'Other', label: '📦 Other' },
];

export default function RecurringForm({ newRecurring, setNewRecurring, onSubmit }: RecurringFormProps) {
  // Escolhe as categorias baseado no tipo selecionado
  const categories = newRecurring.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="card p-6 card-animate animate-fade-in">
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-calendar-days text-purple-600" />
          Add Recurring Payment
        </h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label">Description</label>
          <input
            type="text"
            value={newRecurring.description}
            onChange={(e) => setNewRecurring({ ...newRecurring, description: e.target.value })}
            className="input"
            placeholder="e.g. Rent, Salary, Netflix"
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
                value={newRecurring.amount}
                onChange={(e) => setNewRecurring({ ...newRecurring, amount: e.target.value })}
                className="input pl-8"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <div>
            <label className="label">Day of Month</label>
            <input
              type="number"
              min="1"
              max="31"
              value={newRecurring.dayOfMonth}
              onChange={(e) => setNewRecurring({ ...newRecurring, dayOfMonth: e.target.value })}
              className="input"
              placeholder="1-31"
              required
            />
          </div>
        </div>
        <div>
          <label className="label">Type</label>
          <select
            value={newRecurring.type}
            onChange={(e) => setNewRecurring({ ...newRecurring, type: e.target.value, category: '' })}
            className="select"
            required
          >
            <option value="">Select type</option>
            <option value="income">💰 Income</option>
            <option value="expense">💸 Expense</option>
          </select>
        </div>
        <div>
          <label className="label">Category</label>
          <select
            value={newRecurring.category}
            onChange={(e) => setNewRecurring({ ...newRecurring, category: e.target.value })}
            className="select"
            required
            disabled={!newRecurring.type}
          >
            <option value="">
              {newRecurring.type ? 'Select a category' : 'Select type first'}
            </option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-primary w-full">
          <i className="fas fa-plus mr-2" />
          Add Recurring Payment
        </button>
      </form>
    </div>
  );
}
