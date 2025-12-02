import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { PieData } from '../../types';
import type { PieLabelRenderProps } from 'recharts';

interface PieChartComponentProps {
  data: PieData[];
  colors: string[];
}

export default function PieChartComponent({ data, colors }: PieChartComponentProps) {
  const renderLabel = (props: PieLabelRenderProps) => {
    const name = props.name ?? '';
    const percent = props.percent ?? 0;
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number | string) => `€${Number(value).toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}