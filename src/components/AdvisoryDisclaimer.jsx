import { Info } from 'lucide-react';

const AdvisoryDisclaimer = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="bg-card/90 backdrop-blur-md border border-border rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
        <Info className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          Advisory Risk Indicators – Not a public warning system
        </span>
      </div>
    </div>
  );
};

export default AdvisoryDisclaimer;
