import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const RiskTrendChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const getBarColor = (risk) => {
    if (risk >= 0.7) return 'hsl(4, 90%, 58%)';
    if (risk >= 0.5) return 'hsl(32, 95%, 50%)';
    return 'hsl(195, 100%, 50%)';
  };

  const getTrendDirection = () => {
    if (data.length < 2) return 'stable';
    const first = data[0].risk;
    const last = data[data.length - 1].risk;
    const change = last - first;
    if (change > 0.05) return 'increasing';
    if (change < -0.05) return 'decreasing';
    return 'stable';
  };

  const trend = getTrendDirection();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium text-muted-foreground">Risk Trend (2018-2024)</h4>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          trend === 'increasing' ? 'bg-destructive/20 text-destructive' :
          trend === 'decreasing' ? 'bg-safe/20 text-safe' :
          'bg-muted text-muted-foreground'
        }`}>
          {trend === 'increasing' ? '↑ Worsening' : trend === 'decreasing' ? '↓ Improving' : '→ Stable'}
        </span>
      </div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: 'hsl(215, 20%, 55%)' }}
            />
            <YAxis hide domain={[0, 1]} />
            <Bar dataKey="risk" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.risk)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskTrendChart;
