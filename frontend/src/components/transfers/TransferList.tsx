import type { Transfer } from '../../types';

interface TransferListProps {
  transfers: Transfer[];
  onDelete: (id: number) => void;
}

export default function TransferList({ transfers, onDelete }: TransferListProps) {
  const sortedTransfers = [...transfers].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  if (transfers.length === 0) {
    return (
      <div className="card p-8 text-center animate-fade-in">
        <div className="text-slate-300 mb-3">
          <i className="fas fa-exchange-alt text-6xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">No Transfers Yet</h3>
        <p className="text-slate-500 text-sm">
          Start transferring funds between your bank accounts
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6 animate-fade-in">
      <div className="card-header mb-4">
        <h2 className="card-title flex items-center gap-2">
          <i className="fas fa-list text-blue-600" />
          Transfer History
        </h2>
        <span className="text-sm text-slate-500">
          {transfers.length} {transfers.length === 1 ? 'transfer' : 'transfers'}
        </span>
      </div>

      <div className="space-y-3">
        {sortedTransfers.map((transfer) => (
          <div
            key={transfer.id}
            className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-exchange-alt text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 truncate">
                      {transfer.description}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {formatDate(transfer.date)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-12">
                  <div className="flex items-center gap-2 text-sm">
                    <i className="fas fa-arrow-right text-red-600 text-xs" />
                    <span className="text-slate-600">From:</span>
                    <span className="font-medium text-red-600">{transfer.fromBank}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <i className="fas fa-arrow-left text-green-600 text-xs" />
                    <span className="text-slate-600">To:</span>
                    <span className="font-medium text-green-600">{transfer.toBank}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="text-lg font-bold text-blue-600">
                  €{transfer.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this transfer? This will reverse the transaction.')) {
                      onDelete(transfer.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  title="Delete transfer"
                >
                  <i className="fas fa-trash text-sm" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Total Transferred:</span>
          <span className="text-lg font-bold text-blue-600">
            €{transfers.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
