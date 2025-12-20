import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const TimeSeriesChart = ({ data, title }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 border border-glass">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="text-foreground font-medium">
                {entry.name === 'Area' ? `${entry.value} km²` : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <div className="w-1 h-3 bg-primary rounded-full" />
        {title}
      </h4>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="precipGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(210, 100%, 60%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(210, 100%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 25%, 20%)" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
              axisLine={{ stroke: 'hsl(220, 25%, 20%)' }}
              tickLine={{ stroke: 'hsl(220, 25%, 20%)' }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
              axisLine={{ stroke: 'hsl(220, 25%, 20%)' }}
              tickLine={{ stroke: 'hsl(220, 25%, 20%)' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
              axisLine={{ stroke: 'hsl(220, 25%, 20%)' }}
              tickLine={{ stroke: 'hsl(220, 25%, 20%)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="area"
              name="Area"
              stroke="hsl(195, 100%, 50%)"
              fill="url(#areaGradient)"
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="precipitation"
              name="Precipitation"
              stroke="hsl(210, 100%, 60%)"
              fill="url(#precipGradient)"
              strokeWidth={1.5}
              strokeDasharray="5 5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-primary rounded" />
          <span className="text-muted-foreground">Lake Area (km²)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-blue-400 rounded" style={{ background: 'repeating-linear-gradient(90deg, hsl(210, 100%, 60%), hsl(210, 100%, 60%) 3px, transparent 3px, transparent 6px)' }} />
          <span className="text-muted-foreground">Precipitation (mm)</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
