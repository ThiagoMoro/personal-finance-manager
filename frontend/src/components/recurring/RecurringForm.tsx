interface RecurringFormProps {
  newRecurring: { description: string; amount: string; type: string; dayOfMonth: string; category: string };
  setNewRecurring: (recurring: { description: string; amount: string; type: string; dayOfMonth: string; category: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const INCOME_CATEGORIES = [
  { value: 'salary', label: '💼 Salary' },
  { value: 'bonus', label: '🎉 Bonus' },
  { value: 'freelance', label: '💻 Freelance' },
  { value: 'commission', label: '💰 Commission' },
  { value: 'investments', label: '📈 Investments' },
  { value: 'interest', label: '🏦 Interest' },
  { value: 'rental', label: '🏠 Rental Income' },
  { value: 'side-hustle', label: '🚀 Side Hustle' },
  { value: 'other', label: '📦 Other Income' },
];

const EXPENSE_CATEGORIES = [
  { value: 'home', label: '🏠 Home' },
  { value: 'utilities', label: '💡 Utilities' },
  { value: 'phone', label: '📱 Phone' },
  { value: 'insurance', label: '🛡️ Insurance' },
  { value: 'food', label: '🍔 Food & Groceries' },
  { value: 'restaurants', label: '🍽️ Restaurants' },
  { value: 'transport', label: '🚗 Transport' },
  { value: 'fuel', label: '⛽ Fuel' },
  { value: 'car', label: '🔧 Car Maintenance' },
  { value: 'healthcare', label: '🏥 Healthcare' },
  { value: 'gym', label: '💪 Gym & Sports' },
  { value: 'beauty', label: '💅 Beauty & Personal Care' },
  { value: 'education', label: '🎓 Education' },
  { value: 'entertainment', label: '🎬 Entertainment' },
  { value: 'subscriptions', label: '📺 Subscriptions' },
  { value: 'travel', label: '✈️ Travel & Holidays' },
  { value: 'shopping', label: '👕 Shopping' },
  { value: 'children', label: '👶 Children' },
  { value: 'pets', label: '🐾 Pets' },
  { value: 'taxes', label: '🧾 Taxes' },
  { value: 'fees', label: '🏦 Bank Fees' },
  { value: 'other', label: '📦 Other' },
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
