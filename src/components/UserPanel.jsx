import { useState } from 'react';
import { User, ChevronRight, Shield, Building2, Briefcase, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Mock user data - will be replaced with auth later
const MOCK_OFFICIAL = {
  name: 'Dr. Rajesh Kumar',
  photo: null,
  position: 'Director',
  department: 'National Disaster Management Authority',
  role: 'admin', // 'admin' or 'official'
  email: 'rajesh.kumar@ndma.gov.in',
  employeeId: 'NDMA-2024-0142',
};

const UserPanel = ({ isLoggedIn = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = MOCK_OFFICIAL;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return (
        <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30">
          <Shield className="w-3 h-3 mr-1" />
          Administrator
        </Badge>
      );
    }
    return (
      <Badge className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30">
        <Building2 className="w-3 h-3 mr-1" />
        Government Official
      </Badge>
    );
  };

  // Guest/Not logged in state
  if (!isLoggedIn) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Register as Government Official</span>
            <span className="sm:hidden">Register</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[340px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-border">
          <SheetHeader className="text-left pb-6 border-b border-border">
            <SheetTitle className="text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Official Registration
            </SheetTitle>
          </SheetHeader>
          <div className="py-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-primary/50" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Government Official Access
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Register with your official credentials to access advanced features and data management.
                </p>
              </div>
            </div>
            <Button 
              className="w-full gap-2" 
              size="lg"
              onClick={() => {
                // Auth implementation will go here
                setIsOpen(false);
              }}
            >
              <UserPlus className="w-4 h-4" />
              Register as Government Official
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Only verified government officials can register. Your credentials will be validated.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Logged in state
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-secondary/50 transition-colors group cursor-pointer">
          <Avatar className="h-8 w-8 border-2 border-primary/30">
            <AvatarImage src={user.photo} alt={user.name} />
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      </SheetTrigger>
      <SheetContent className="w-[340px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-border">
        <SheetHeader className="text-left pb-6 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Official Profile
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-primary/30 shadow-lg shadow-primary/10">
                <AvatarImage src={user.photo} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary/30 to-primary/10 text-primary text-2xl font-bold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              {user.role === 'admin' && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center border-2 border-background">
                  <Shield className="w-4 h-4 text-amber-950" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <p className="text-sm text-primary font-medium">{user.position}</p>
            </div>
            {getRoleBadge(user.role)}
          </div>

          {/* Details Section */}
          <div className="space-y-3 bg-secondary/30 rounded-xl p-4 border border-border">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Department</p>
                <p className="text-sm text-foreground font-medium truncate">{user.department}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Employee ID</p>
                <p className="text-sm text-foreground font-medium font-mono">{user.employeeId}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                <p className="text-sm text-foreground font-medium truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Government Emblem/Branding */}
          <div className="flex items-center justify-center gap-3 py-4 border-t border-border">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <span className="text-lg">🇮🇳</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-foreground">Government of India</p>
              <p className="text-xs text-muted-foreground">Official Portal Access</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <Button variant="outline" className="w-full justify-start gap-2" size="sm">
              <User className="w-4 h-4" />
              Edit Profile
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10" 
              size="sm"
            >
              <X className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserPanel;
