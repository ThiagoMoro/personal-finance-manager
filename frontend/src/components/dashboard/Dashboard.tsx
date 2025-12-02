import type { Bank, Income, Expense } from '../../types';
import StatCard from '../layout/StatCard';
import PieChartComponent from './PieChartComponent';

interface DashboardProps {
  banks: Bank[];
  incomes: Income[];
  expenses: Expense[];
}

export default function Dashboard({ banks, incomes, expenses }: DashboardProps) {
  const totalBanks = banks.reduce((acc, b) => acc + b.balance, 0);
  const totalIncomes = incomes.reduce((acc, i) => acc + i.amount, 0);
  const totalExpenses = expenses.reduce((acc, d) => acc + d.amount, 0);
  const netBalance = totalIncomes - totalExpenses;

  const incomesByCategory = incomes.reduce((acc, income) => {
    const category = income.category || 'Uncategorised';
    acc[category] = (acc[category] || 0) + income.amount;
    return acc;
  }, {} as Record<string, number>);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Uncategorised';
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const incomePieData = Object.keys(incomesByCategory).map(category => ({
    name: category,
    value: incomesByCategory[category]
  }));

  const expensePieData = Object.keys(expensesByCategory).map(category => ({
    name: category,
    value: expensesByCategory[category]
  }));

  const INCOME_COLORS = ['#10b981', '#22c55e', '#4ade80', '#0ea5e9', '#38bdf8'];
  const EXPENSE_COLORS = ['#ef4444', '#f97316', '#fb923c', '#b91c1c', '#facc15'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Bank Balances" 
          value={`€${totalBanks.toFixed(2)}`} 
          color="text-blue-600" 
          icon="fa-building-columns"
        />
        <StatCard 
          label="Total Incomes" 
          value={`€${totalIncomes.toFixed(2)}`} 
          color="text-green-600" 
          icon="fa-arrow-trend-up"
        />
        <StatCard 
          label="Total Expenses" 
          value={`€${totalExpenses.toFixed(2)}`} 
          color="text-red-600" 
          icon="fa-arrow-trend-down"
        />
        <StatCard 
          label="Net Balance" 
          value={`€${netBalance.toFixed(2)}`} 
          color={netBalance >= 0 ? 'text-green-600' : 'text-red-600'} 
          icon={netBalance >= 0 ? 'fa-circle-check' : 'fa-circle-exclamation'}
        />
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 card-animate">
          <h3 className="card-title mb-4 flex items-center gap-2">
            <i className="fas fa-chart-pie text-green-600" />
            Incomes by Category
          </h3>
          {incomePieData.length > 0 ? (
            <PieChartComponent data={incomePieData} colors={INCOME_COLORS} />
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-chart-pie text-4xl text-slate-300 mb-3" />
              <p className="text-slate-400">No income data to display</p>
            </div>
          )}
        </div>

        <div className="card p-6 card-animate">
          <h3 className="card-title mb-4 flex items-center gap-2">
            <i className="fas fa-chart-pie text-red-600" />
            Expenses by Category
          </h3>
          {expensePieData.length > 0 ? (
            <PieChartComponent data={expensePieData} colors={EXPENSE_COLORS} />
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-chart-pie text-4xl text-slate-300 mb-3" />
              <p className="text-slate-400">No expense data to display</p>
            </div>
          )}
        </div>
      </div>

      {/* Latest Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 card-animate">
          <h3 className="card-title mb-4 flex items-center gap-2">
            <i className="fas fa-clock-rotate-left text-green-600" />
            Latest Incomes
          </h3>
          <div className="space-y-3">
            {incomes.length === 0 ? (
              <div className="text-center py-8">
                <i className="fas fa-inbox text-3xl text-slate-300 mb-2" />
                <p className="text-slate-400 text-sm">No income records yet</p>
              </div>
            ) : (
              incomes.slice(-5).reverse().map(i => (
                <div key={i.id} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-plus text-green-600 text-xs" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{i.description}</p>
                      <p className="text-xs text-slate-500">{new Date(i.date).toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                  <p className="text-green-600 font-bold text-sm">+€{i.amount.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card p-6 card-animate">
          <h3 className="card-title mb-4 flex items-center gap-2">
            <i className="fas fa-clock-rotate-left text-red-600" />
            Latest Expenses
          </h3>
          <div className="space-y-3">
            {expenses.length === 0 ? (
              <div className="text-center py-8">
                <i className="fas fa-inbox text-3xl text-slate-300 mb-2" />
                <p className="text-slate-400 text-sm">No expense records yet</p>
              </div>
            ) : (
              expenses.slice(-5).reverse().map(d => (
                <div key={d.id} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-minus text-red-600 text-xs" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{d.description}</p>
                      <p className="text-xs text-slate-500">{new Date(d.date).toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                  <p className="text-red-600 font-bold text-sm">-€{d.amount.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
