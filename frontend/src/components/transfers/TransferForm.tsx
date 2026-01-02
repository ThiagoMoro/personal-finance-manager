import type { Bank } from '../../types';

interface TransferFormProps {
  banks: Bank[];
  newTransfer: { description: string; amount: string; date: string; fromBank: string; toBank: string };
  setNewTransfer: (transfer: { description: string; amount: string; date: string; fromBank: string; toBank: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function TransferForm({ banks, newTransfer, setNewTransfer, onSubmit }: TransferFormProps) {
  const availableBanks = banks.filter(bank => bank.name !== newTransfer.fromBank);
  const fromBankBalance = banks.find(b => b.name === newTransfer.fromBank)?.balance || 0;
  const transferAmount = parseFloat(newTransfer.amount) || 0;
  const hasInsufficientFunds = transferAmount > fromBankBalance;

  return (
    <div className="card p-6 card-animate animate-fade-in">
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-exchange-alt text-blue-600" />
          Transfer Between Banks
        </h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label">Description</label>
          <input
            type="text"
            value={newTransfer.description}
            onChange={(e) => setNewTransfer({ ...newTransfer, description: e.target.value })}
            className="input"
            placeholder="e.g. Monthly Savings, Emergency Fund"
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
                value={newTransfer.amount}
                onChange={(e) => setNewTransfer({ ...newTransfer, amount: e.target.value })}
                className={`input pl-8 ${hasInsufficientFunds && newTransfer.fromBank ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="0.00"
                required
              />
            </div>
            {hasInsufficientFunds && newTransfer.fromBank && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <i className="fas fa-exclamation-circle" />
                Insufficient funds (Available: €{fromBankBalance.toFixed(2)})
              </p>
            )}
          </div>
          <div>
            <label className="label">Date</label>
            <input
              type="date"
              value={newTransfer.date}
              onChange={(e) => setNewTransfer({ ...newTransfer, date: e.target.value })}
              className="input"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label flex items-center gap-2">
              <i className="fas fa-arrow-right text-red-600" />
              From Bank
            </label>
            <select
              value={newTransfer.fromBank}
              onChange={(e) => {
                const newFromBank = e.target.value;
                setNewTransfer({ 
                  ...newTransfer, 
                  fromBank: newFromBank,
                  toBank: newFromBank === newTransfer.toBank ? '' : newTransfer.toBank
                });
              }}
              className="select"
              required
            >
              <option value="">Select source bank</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.name}>
                  {bank.name} - €{bank.balance.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label flex items-center gap-2">
              <i className="fas fa-arrow-left text-green-600" />
              To Bank
            </label>
            <select
              value={newTransfer.toBank}
              onChange={(e) => setNewTransfer({ ...newTransfer, toBank: e.target.value })}
              className="select"
              required
              disabled={!newTransfer.fromBank}
            >
              <option value="">Select destination bank</option>
              {availableBanks.map((bank) => (
                <option key={bank.id} value={bank.name}>
                  {bank.name} - €{bank.balance.toFixed(2)}
                </option>
              ))}
            </select>
            {!newTransfer.fromBank && (
              <p className="text-xs text-slate-500 mt-1">
                Select source bank first
              </p>
            )}
          </div>
        </div>

        {newTransfer.fromBank && newTransfer.toBank && newTransfer.amount && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <i className="fas fa-info-circle" />
              Transfer Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">From:</span>
                <span className="font-medium text-red-600">
                  {newTransfer.fromBank} (-€{parseFloat(newTransfer.amount).toFixed(2)})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">To:</span>
                <span className="font-medium text-green-600">
                  {newTransfer.toBank} (+€{parseFloat(newTransfer.amount).toFixed(2)})
                </span>
              </div>
              <div className="pt-2 border-t border-blue-200">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>New balance ({newTransfer.fromBank}):</span>
                  <span className="font-medium">
                    €{(fromBankBalance - parseFloat(newTransfer.amount)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>New balance ({newTransfer.toBank}):</span>
                  <span className="font-medium">
                    €{((banks.find(b => b.name === newTransfer.toBank)?.balance || 0) + parseFloat(newTransfer.amount)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <button 
          type="submit" 
          className="btn-primary w-full"
          disabled={hasInsufficientFunds}
        >
          <i className="fas fa-exchange-alt mr-2" />
          Transfer Funds
        </button>
      </form>
    </div>
  );
}
