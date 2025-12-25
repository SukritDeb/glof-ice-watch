import { getConfidenceLabel } from '@/data/lakesData';

const ConfidenceIndicator = ({ confidence, showLabel = true }) => {
  const percentage = Math.round(confidence * 100);
  const label = getConfidenceLabel(confidence);

  const getColor = () => {
    if (confidence >= 0.85) return 'bg-safe text-safe';
    if (confidence >= 0.70) return 'bg-warning text-warning';
    return 'bg-destructive text-destructive';
  };

  const getBgColor = () => {
    if (confidence >= 0.85) return 'bg-safe/20';
    if (confidence >= 0.70) return 'bg-warning/20';
    return 'bg-destructive/20';
  };

  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Model Confidence</span>
          <span className={`text-xs font-medium ${getColor().split(' ')[1]}`}>
            {percentage}% ({label})
          </span>
        </div>
      )}
      <div className={`h-1.5 rounded-full ${getBgColor()}`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 ${getColor().split(' ')[0]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ConfidenceIndicator;
