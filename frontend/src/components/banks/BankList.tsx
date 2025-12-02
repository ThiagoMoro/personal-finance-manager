import type { Bank } from '../../types';

interface BankListProps {
  banks: Bank[];
  onRemove: (id: number) => void;
}

export default function BankList({ banks, onRemove }: BankListProps) {
  const totalBalance = banks.reduce((acc, b) => acc + b.balance, 0);

  return (
    <div className="card p-6 card-animate animate-fade-in">
      <div className="card-header">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-wallet text-blue-600" />
          My Banks
        </h2>
        <span className="text-sm font-medium text-slate-500">
          {banks.length} {banks.length === 1 ? 'bank' : 'banks'}
        </span>
      </div>

      {totalBalance > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border border-blue-100">
          <p className="text-xs text-slate-600 mb-1">Total Balance</p>
          <p className="text-2xl font-bold text-blue-600">€{totalBalance.toFixed(2)}</p>
        </div>
      )}

      <div className="space-y-0 border border-slate-100 rounded-lg overflow-hidden">
        {banks.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-building-columns text-4xl text-slate-300 mb-3" />
            <p className="text-slate-400">No banks added yet</p>
            <p className="text-xs text-slate-400 mt-1">Add your first bank to get started</p>
          </div>
        ) : (
          banks.map((bank) => (
            <div key={bank.id} className="list-item">
              <div className="flex items-center gap-3 flex-1">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-building-columns text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{bank.name}</p>
                  <p className="text-xs text-slate-500">Bank account</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold text-blue-600">€{bank.balance.toFixed(2)}</p>
                <button
                  onClick={() => onRemove(bank.id!)}
                  className="btn-danger"
                  title="Delete bank"
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
