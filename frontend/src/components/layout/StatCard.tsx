interface StatCardProps {
  label: string;
  value: string;
  color: string;
  icon?: string;
}

export default function StatCard({ label, value, color, icon }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
            {label}
          </p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        {icon && (
          <div className={`h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center ${color}`}>
            <i className={`fas ${icon} text-lg`} />
          </div>
        )}
      </div>
    </div>
  );
}
