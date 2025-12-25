import { User, Building2 } from 'lucide-react';
import { REPORT_ORIGINS } from '@/data/lakesData';

const ReportOriginBadge = ({ origin }) => {
  const isCitizen = origin === REPORT_ORIGINS.CITIZEN;

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${
      isCitizen 
        ? 'bg-accent/10 text-accent border border-accent/20' 
        : 'bg-primary/10 text-primary border border-primary/20'
    }`}>
      {isCitizen ? <User className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
      {origin}
    </span>
  );
};

export default ReportOriginBadge;
