import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const FilterSidebar = ({ filters, onFiltersChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  const riskOptions = [
    { id: 'high', label: 'High Risk', color: 'bg-destructive' },
    { id: 'medium', label: 'Medium Risk', color: 'bg-warning' },
    { id: 'low', label: 'Low Risk', color: 'bg-safe' },
  ];

  const handleRiskToggle = (riskId) => {
    const newRiskLevels = filters.riskLevels.includes(riskId)
      ? filters.riskLevels.filter((r) => r !== riskId)
      : [...filters.riskLevels, riskId];
    onFiltersChange({ ...filters, riskLevels: newRiskLevels });
  };

  const handleYearChange = (value) => {
    onFiltersChange({ ...filters, yearRange: [value[0], value[1]] });
  };

  const handleSearchChange = (value) => {
    onFiltersChange({ ...filters, searchQuery: value });
  };

  return (
    <div
      className={`fixed top-16 left-0 bottom-0 z-30 transition-all duration-300 ${
        collapsed ? 'w-12' : 'w-64'
      }`}
    >
      <div className="h-full glass-panel border-r border-glass rounded-none flex flex-col">
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-4 z-10 w-6 h-6 rounded-full bg-secondary border border-border hover:bg-muted"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </Button>

        {collapsed ? (
          <div className="flex flex-col items-center py-4 gap-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {riskOptions.map((option) => (
              <div
                key={option.id}
                className={`w-3 h-3 rounded-full ${option.color} ${
                  filters.riskLevels.includes(option.id) ? 'opacity-100' : 'opacity-30'
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Filters</h3>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Search Lakes</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Lake name..."
                  value={filters.searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9 bg-secondary/50 border-border focus:border-primary"
                />
              </div>
            </div>

            {/* Risk Level Filter */}
            <div className="space-y-3">
              <label className="text-xs text-muted-foreground">Risk Level</label>
              <div className="space-y-2">
                {riskOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                    onClick={() => handleRiskToggle(option.id)}
                  >
                    <Checkbox
                      checked={filters.riskLevels.includes(option.id)}
                      onCheckedChange={() => handleRiskToggle(option.id)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <div className={`w-3 h-3 rounded-full ${option.color}`} />
                    <span className="text-sm text-foreground">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Year Range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Year Range</label>
                <span className="text-xs text-primary font-medium">
                  {filters.yearRange[0]} - {filters.yearRange[1]}
                </span>
              </div>
              <Slider
                value={filters.yearRange}
                min={2018}
                max={2024}
                step={1}
                onValueChange={handleYearChange}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>2018</span>
                <span>2024</span>
              </div>
            </div>

            {/* Stats */}
            <div className="glass-panel p-3 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Visible Lakes</span>
                <span className="text-foreground font-medium">7</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">High Risk</span>
                <span className="text-destructive font-medium">3</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Medium Risk</span>
                <span className="text-warning font-medium">2</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Low Risk</span>
                <span className="text-safe font-medium">2</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
