import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { getDaysSinceUpdate } from '@/data/lakesData';

const DataFreshnessIndicator = ({ lastUpdated, variant = 'badge' }) => {
  const days = getDaysSinceUpdate(lastUpdated);
  
  const getStatus = () => {
    if (days <= 7) return { label: 'Fresh', color: 'text-safe', icon: CheckCircle, bg: 'bg-safe/10' };
    if (days <= 30) return { label: 'Recent', color: 'text-warning', icon: Clock, bg: 'bg-warning/10' };
    return { label: 'Stale', color: 'text-destructive', icon: AlertTriangle, bg: 'bg-destructive/10' };
  };

  const status = getStatus();
  const Icon = status.icon;

  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center gap-1 text-xs ${status.color}`}>
        <Icon className="w-3 h-3" />
        Updated {days} day{days !== 1 ? 's' : ''} ago
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
      <Icon className="w-3 h-3" />
      <span className="text-xs font-medium">
        {days} day{days !== 1 ? 's' : ''} old
      </span>
    </div>
  );
};

export default DataFreshnessIndicator;
