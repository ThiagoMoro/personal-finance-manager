import type { PieData } from '../../types';

interface CategoryListComponentProps {
  data: PieData[];
  title: string;
  color: string; // Cor principal em hex (ex: "#10b981")
  icon: string;
}

export default function CategoryListComponent({ data, title, color, icon }: CategoryListComponentProps) {
  const categoryIcons: { [key: string]: string } = {
    // Income categories
    'Salary': '💼', 'Bonus': '🎉', 'Freelance': '💻', 'Commission': '💰',
    'Investments': '📈', 'Dividends': '💵', 'Interest': '🏦', 'Rental': '🏠',
    'Side-Hustle': '🚀', 'Refunds': '↩️', 'Gifts': '🎁', 'Cashback': '💳',
    // Expense categories
    'Home': '🏠', 'Food': '🍔', 'Restaurants': '🍽️', 'Delivery': '🛵',
    'Snacks': '🍿', 'Transport': '🚗', 'Fuel': '⛽', 'Car': '🔧',
    'Parking': '🅿️', 'Taxi': '🚕', 'Utilities': '💡', 'Phone': '📱',
    'Insurance': '🛡️', 'Healthcare': '🏥', 'Gym': '💪', 'Beauty': '💅',
    'Education': '🎓', 'Books': '📚', 'Courses': '💻', 'Entertainment': '🎬',
    'Subscriptions': '📺', 'Hobbies': '🎨', 'Games': '🎮', 'Travel': '✈️',
    'Shopping': '👕', 'Electronics': '📱', 'Children': '👶',
    'Pets': '🐾', 'Work': '💼', 'Office': '📎', 'Taxes': '🧾',
    'Fees': '🏦', 'Donations': '❤️', 'Other': '📦'
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Função para gerar variações de cor (mais claro/escuro)
  const generateColorVariations = (baseColor: string, count: number): string[] => {
    const colors: string[] = [];
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    for (let i = 0; i < count; i++) {
      const factor = 1 - (i * 0.15); // Escurece gradualmente
      const newR = Math.round(r * factor);
      const newG = Math.round(g * factor);
      const newB = Math.round(b * factor);
      colors.push(`rgb(${newR}, ${newG}, ${newB})`);
    }
    return colors;
  };

  const colors = generateColorVariations(color, data.length);

  if (data.length === 0) {
    return (
      <div className="card p-6 card-animate">
        <h3 className="card-title mb-4 flex items-center gap-2">
          <i className={`fas ${icon}`} style={{ color }} />
          {title}
        </h3>
        <div className="text-center py-12">
          <i className="fas fa-chart-simple text-4xl text-slate-300 mb-3" />
          <p className="text-slate-400">No data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 card-animate">
      <h3 className="card-title mb-4 flex items-center gap-2">
        <i className={`fas ${icon}`} style={{ color }} />
        {title}
      </h3>
      
      <div className="space-y-3">
        {data
          .sort((a, b) => b.value - a.value)
          .map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            const emoji = categoryIcons[item.name] || '📦';
            
            return (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{emoji}</span>
                    <span className="font-medium text-slate-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{percentage}%</span>
                    <span className="font-bold" style={{ color }}>
                      €{item.value.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                {/* Barra de progresso com cor gradiente */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: colors[index] || color
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-700">Total</span>
          <span className="text-xl font-bold" style={{ color }}>
            €{total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
