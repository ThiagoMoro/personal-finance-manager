interface RecurringFormProps {
  newRecurring: { description: string; amount: string; type: string; dayOfMonth: string; category: string };
  setNewRecurring: (recurring: { description: string; amount: string; type: string; dayOfMonth: string; category: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function RecurringForm({ newRecurring, setNewRecurring, onSubmit }: RecurringFormProps) {
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
            onChange={(e) => setNewRecurring({ ...newRecurring, type: e.target.value })}
            className="select"
            required
          >
            <option value="">Select type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label className="label">Category</label>
          <input
            type="text"
            value={newRecurring.category}
            onChange={(e) => setNewRecurring({ ...newRecurring, category: e.target.value })}
            className="input"
            placeholder="e.g. Salary, Rent, Subscription"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          <i className="fas fa-plus mr-2" />
          Add Recurring Payment
        </button>
      </form>
    </div>
  );
}
