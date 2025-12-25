import { AlertTriangle } from 'lucide-react';

const ExplainabilitySection = ({ reasons }) => {
  if (!reasons || reasons.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
        <AlertTriangle className="w-3 h-3" />
        Why This Risk Level?
      </h4>
      <ul className="space-y-1.5">
        {reasons.map((reason, index) => (
          <li 
            key={index}
            className="flex items-start gap-2 text-xs text-foreground"
          >
            <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExplainabilitySection;
