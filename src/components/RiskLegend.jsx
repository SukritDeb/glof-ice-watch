import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

const RiskLegend = () => {
  const legendItems = [
    {
      level: 'High Risk',
      color: 'bg-destructive',
      textColor: 'text-destructive',
      icon: AlertTriangle,
      description: 'Immediate attention required',
      glow: 'shadow-[0_0_12px_hsl(4,90%,58%,0.5)]',
    },
    {
      level: 'Medium Risk',
      color: 'bg-warning',
      textColor: 'text-warning',
      icon: AlertCircle,
      description: 'Monitor closely',
      glow: 'shadow-[0_0_8px_hsl(32,95%,50%,0.4)]',
    },
    {
      level: 'Low Risk',
      color: 'bg-safe',
      textColor: 'text-safe',
      icon: CheckCircle,
      description: 'Stable conditions',
      glow: 'shadow-[0_0_8px_hsl(195,100%,50%,0.3)]',
    },
  ];

  return (
    <div className="absolute bottom-6 left-6 z-10 glass-panel p-4 min-w-[200px]">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <div className="w-1 h-4 bg-primary rounded-full" />
        Risk Classification
      </h3>
      <div className="space-y-3">
        {legendItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.level} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${item.color} ${item.glow}`} />
              <div className="flex-1">
                <div className={`text-sm font-medium ${item.textColor}`}>
                  {item.level}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              </div>
              <Icon className={`w-4 h-4 ${item.textColor} opacity-60`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RiskLegend;
