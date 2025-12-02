interface BankFormProps {
  newBank: { name: string; balance: string };
  setNewBank: (bank: { name: string; balance: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BankForm({ newBank, setNewBank, onSubmit }: BankFormProps) {
  return (
    <div className="card p-6 card-animate animate-fade-in">
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-building-columns text-blue-600" />
          Add Bank
        </h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label">Bank Name</label>
          <input
            type="text"
            value={newBank.name}
            onChange={(e) => setNewBank({ ...newBank, name: e.target.value })}
            className="input"
            placeholder="e.g. Revolut, N26, Millennium"
            required
          />
        </div>
        <div>
          <label className="label">Initial Balance</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">€</span>
            <input
              type="number"
              step="0.01"
              value={newBank.balance}
              onChange={(e) => setNewBank({ ...newBank, balance: e.target.value })}
              className="input pl-8"
              placeholder="0.00"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn-primary w-full">
          <i className="fas fa-plus mr-2" />
          Add Bank
        </button>
      </form>
    </div>
  );
}
