import { CheckSquare, Settings, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { USER_ROLES } from '@/data/lakesData';

const RoleAwareActions = ({ 
  userRole, 
  lake, 
  showUnverified, 
  onToggleUnverified,
  onVerify 
}) => {
  // Public users see nothing
  if (userRole === USER_ROLES.PUBLIC) return null;

  return (
    <div className="space-y-3 pt-3 border-t border-border">
      {/* Official Actions */}
      {(userRole === USER_ROLES.OFFICIAL || userRole === USER_ROLES.ADMIN) && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground">Official Actions</h4>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/10"
            onClick={() => onVerify?.(lake?.id)}
          >
            <CheckSquare className="w-4 h-4" />
            Verify Report
          </Button>
        </div>
      )}

      {/* Admin Actions */}
      {userRole === USER_ROLES.ADMIN && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground">Admin Controls</h4>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full gap-2 border-border hover:bg-secondary/50"
          >
            <Settings className="w-4 h-4" />
            Threshold Settings
          </Button>
        </div>
      )}
    </div>
  );
};

export const UnverifiedToggle = ({ userRole, showUnverified, onToggle }) => {
  // Only show for officials and admins
  if (userRole === USER_ROLES.PUBLIC) return null;

  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2 bg-card/50 rounded-lg border border-border">
      <div className="flex items-center gap-2">
        {showUnverified ? (
          <Eye className="w-4 h-4 text-warning" />
        ) : (
          <EyeOff className="w-4 h-4 text-muted-foreground" />
        )}
        <span className="text-xs font-medium text-foreground">Show Unverified</span>
      </div>
      <Switch 
        checked={showUnverified} 
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-warning"
      />
    </div>
  );
};

export default RoleAwareActions;
