import { Mountain, LayoutDashboard, Brain, Upload, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TopNavbar = ({ activeTab, onTabChange }: TopNavbarProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'insights', label: 'Model Insights', icon: Brain },
    { id: 'upload', label: 'Upload Data', icon: Upload },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-glass">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Mountain className="w-8 h-8 text-primary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              GLOF Risk Intelligence
            </h1>
            <p className="text-xs text-muted-foreground -mt-0.5">
              Glacier Lake Outburst Flood Predictor
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onTabChange(item.id)}
                className={`
                  gap-2 transition-all duration-200
                  ${isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* Status Indicator */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Live Monitoring</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
