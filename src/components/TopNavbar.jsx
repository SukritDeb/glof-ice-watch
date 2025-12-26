import { useState } from 'react';
import { Mountain, LayoutDashboard, Brain, Upload, Info, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserPanel from '@/components/UserPanel';

const TopNavbar = ({ activeTab, onTabChange }) => {
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'insights', label: 'Model Insights', icon: Brain },
    { id: 'upload', label: 'Upload Data', icon: Upload },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-glass">
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

          {/* Right Section - Status & User Avatar */}
          <div className="flex items-center gap-3">
            {/* Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground">Live Monitoring</span>
            </div>

            {/* User Avatar Button */}
            <button
              onClick={() => {
                console.log('User avatar clicked, opening panel');
                setIsUserPanelOpen(true);
              }}
              className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 hover:border-primary/60 transition-colors cursor-pointer glow-ice"
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-safe rounded-full border-2 border-card" />
            </button>
          </div>
        </div>
      </header>

      {/* User Panel */}
      <UserPanel isOpen={isUserPanelOpen} onClose={() => setIsUserPanelOpen(false)} />
    </>
  );
};

export default TopNavbar;
