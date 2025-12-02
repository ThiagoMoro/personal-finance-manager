export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-coins text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Personal Finance Manager
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Track your banks, incomes, expenses and recurring payments
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
            <i className="fas fa-circle text-green-500 text-xs animate-pulse" />
            <span>Connected</span>
          </div>
        </div>
      </div>
    </header>
  );
}
