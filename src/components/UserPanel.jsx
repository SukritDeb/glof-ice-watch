import { useState } from 'react';
import { X, Shield, BadgeCheck, Building2, Briefcase, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock user data - will be replaced with auth later
const MOCK_OFFICIAL = {
  name: 'Dr. Rajesh Kumar Singh',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  position: 'Director - Disaster Management',
  department: 'National Disaster Management Authority',
  role: 'admin', // 'admin' or 'official'
  employeeId: 'NDMA/DIR/2024/0847',
};

const UserPanel = ({ isOpen, onClose }) => {
  const [isAuthenticated] = useState(true); // Mock auth state

  console.log('UserPanel render, isOpen:', isOpen);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-80 sm:w-96 z-[100] slide-in-right">
        <div className="h-full glass-panel border-l border-glass flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">User Profile</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
            {isAuthenticated ? (
              <OfficialProfile user={MOCK_OFFICIAL} />
            ) : (
              <GuestView />
            )}
          </div>

          {/* Footer */}
          {isAuthenticated && (
            <div className="p-4 border-t border-border">
              <Button variant="outline" className="w-full text-muted-foreground hover:text-destructive hover:border-destructive">
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const OfficialProfile = ({ user }) => {
  const isAdmin = user.role === 'admin';

  return (
    <div className="space-y-6">
      {/* Photo & Role Badge */}
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 glow-ice">
            <img 
              src={user.photo} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Role Badge */}
          <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
            isAdmin 
              ? 'bg-destructive/20 text-destructive border border-destructive/30' 
              : 'bg-primary/20 text-primary border border-primary/30'
          }`}>
            {isAdmin ? <Shield className="w-3 h-3" /> : <BadgeCheck className="w-3 h-3" />}
            {isAdmin ? 'Administrator' : 'Official'}
          </div>
        </div>

        {/* Name */}
        <h3 className="mt-6 text-xl font-bold text-foreground">{user.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{user.employeeId}</p>
      </div>

      {/* Government Seal/Emblem Effect */}
      <div className="relative p-4 rounded-xl bg-secondary/30 border border-border overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" fill="none"/>
            <polygon points="50,10 54,40 85,40 60,60 70,90 50,70 30,90 40,60 15,40 46,40" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="space-y-4 relative">
          {/* Position */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Position</p>
              <p className="text-sm font-medium text-foreground">{user.position}</p>
            </div>
          </div>

          {/* Department */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Department</p>
              <p className="text-sm font-medium text-foreground">{user.department}</p>
            </div>
          </div>

          {/* Access Level */}
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${isAdmin ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Access Level</p>
              <p className={`text-sm font-medium ${isAdmin ? 'text-destructive' : 'text-primary'}`}>
                {isAdmin ? 'Full Administrative Access' : 'Standard Official Access'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Badge */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-safe/10 border border-safe/20">
        <BadgeCheck className="w-5 h-5 text-safe" />
        <div>
          <p className="text-sm font-medium text-safe">Verified Government Official</p>
          <p className="text-xs text-muted-foreground">Identity verified via DigiLocker</p>
        </div>
      </div>
    </div>
  );
};

const GuestView = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
      <div className="p-4 rounded-full bg-secondary/50 border border-border">
        <UserPlus className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-foreground">Guest Access</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
          Register as a Government Official to access advanced features and upload data.
        </p>
      </div>

      <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
        <Shield className="w-4 h-4" />
        Register as Government Official
      </Button>
    </div>
  );
};

export default UserPanel;
