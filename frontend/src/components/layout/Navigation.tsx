interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line', color: 'blue' },
    { id: 'banks', label: 'Banks', icon: 'fa-building-columns', color: 'indigo' },
    { id: 'transfers', label: 'Transfers', icon: 'fa-right-left' },
    { id: 'incomes', label: 'Incomes', icon: 'fa-arrow-trend-up', color: 'green' },
    { id: 'expenses', label: 'Expenses', icon: 'fa-arrow-trend-down', color: 'red' },
    { id: 'recurring', label: 'Recurring', icon: 'fa-calendar-days', color: 'purple' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex overflow-x-auto space-x-2 py-3 scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                  ${isActive
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                <i className={`fas ${tab.icon} mr-2 text-xs`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
