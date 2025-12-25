import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { VERIFICATION_STATUS } from '@/data/lakesData';

const VerificationBadge = ({ status, size = 'default' }) => {
  const sizeClasses = size === 'small' 
    ? 'text-[10px] px-1.5 py-0.5 gap-1' 
    : 'text-xs px-2 py-1 gap-1.5';

  const iconSize = size === 'small' ? 'w-2.5 h-2.5' : 'w-3 h-3';

  if (status === VERIFICATION_STATUS.VERIFIED) {
    return (
      <span className={`inline-flex items-center rounded-full bg-safe/20 text-safe border border-safe/30 ${sizeClasses}`}>
        <CheckCircle className={iconSize} />
        Verified
      </span>
    );
  }

  if (status === VERIFICATION_STATUS.PENDING) {
    return (
      <span className={`inline-flex items-center rounded-full bg-warning/20 text-warning border border-warning/30 ${sizeClasses}`}>
        <Clock className={iconSize} />
        Pending
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center rounded-full bg-muted text-muted-foreground border border-border ${sizeClasses}`}>
      <AlertCircle className={iconSize} />
      Unverified
    </span>
  );
};

export default VerificationBadge;
