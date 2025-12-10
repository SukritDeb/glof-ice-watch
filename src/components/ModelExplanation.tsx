import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { ModelFeature } from '@/data/lakesData';

interface ModelExplanationProps {
  features: ModelFeature[];
}

const ModelExplanation = ({ features }: ModelExplanationProps) => {
  const chartData = features.map((f) => ({
    name: f.name,
    contribution: f.contribution * 100,
    description: f.description,
  }));

  const getBarColor = (contribution: number) => {
    if (contribution >= 30) return 'hsl(4, 90%, 58%)';
    if (contribution >= 20) return 'hsl(32, 95%, 50%)';
    return 'hsl(195, 100%, 50%)';
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-panel p-3 border border-glass max-w-[200px]">
          <p className="text-sm font-medium text-foreground mb-1">{data.name}</p>
          <p className="text-xs text-muted-foreground mb-2">{data.description}</p>
          <p className="text-sm">
            <span className="text-primary font-semibold">{data.contribution.toFixed(0)}%</span>
            <span className="text-muted-foreground ml-1">contribution</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <div className="w-1 h-3 bg-primary rounded-full" />
        Model Feature Importance
      </h4>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
          >
            <XAxis
              type="number"
              domain={[0, 50]}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
              axisLine={{ stroke: 'hsl(220, 25%, 20%)' }}
              tickLine={{ stroke: 'hsl(220, 25%, 20%)' }}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
              axisLine={{ stroke: 'hsl(220, 25%, 20%)' }}
              tickLine={{ stroke: 'hsl(220, 25%, 20%)' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(220, 25%, 15%)' }} />
            <Bar dataKey="contribution" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.contribution)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        {features.slice(0, 2).map((feature, index) => (
          <div key={index} className="flex items-start gap-2 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
            <div>
              <span className="text-foreground font-medium">{feature.name}:</span>
              <span className="text-muted-foreground ml-1">{feature.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelExplanation;
