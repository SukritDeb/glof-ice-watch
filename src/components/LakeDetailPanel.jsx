import { X, MapPin, Mountain, Ruler, Calendar, FileText, FileJson, ChevronDown, ChevronRight, ExternalLink, Shield, Image, ClipboardList, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import RiskTag from './RiskTag';
import TimeSeriesChart from './TimeSeriesChart';
import ModelExplanation from './ModelExplanation';
import RiskTrendChart from './RiskTrendChart';
import ExplainabilitySection from './ExplainabilitySection';
import VerificationBadge from './VerificationBadge';
import ReportOriginBadge from './ReportOriginBadge';
import ConfidenceIndicator from './ConfidenceIndicator';
import DataFreshnessIndicator from './DataFreshnessIndicator';
import RoleAwareActions from './RoleAwareActions';
import { useState } from 'react';
import { USER_ROLES } from '@/data/lakesData';

const LakeDetailPanel = ({ lake, onClose, userRole = USER_ROLES.PUBLIC }) => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);

  if (!lake) return null;

  const handleVerify = (lakeId) => {
    console.log('Verify lake:', lakeId);
    // In a real app, this would trigger a verification workflow
  };

  return (
    <div className="fixed top-16 right-0 bottom-0 w-full sm:w-[420px] z-40 slide-in-right">
      <div className="h-full glass-panel border-l border-glass rounded-none flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-foreground">{lake.name}</h2>
                <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">{lake.id}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <RiskTag level={lake.riskLevel} score={lake.riskScore} />
                <VerificationBadge status={lake.verificationStatus} size="small" />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Confidence Bar */}
          <ConfidenceIndicator confidence={lake.confidence} />

          {/* Report Origin & Freshness */}
          <div className="flex items-center justify-between gap-2">
            <ReportOriginBadge origin={lake.reportOrigin} />
            <DataFreshnessIndicator lastUpdated={lake.lastUpdated} />
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 scrollbar-thin">
          <div className="p-4 space-y-4">
            {/* Risk Trend Mini-Chart */}
            <section className="glass-panel p-3 rounded-lg">
              <RiskTrendChart data={lake.riskTrend} />
            </section>

            {/* Explainability Section */}
            <section className="glass-panel p-3 rounded-lg">
              <ExplainabilitySection reasons={lake.riskReasons} />
            </section>

            <Separator className="bg-border" />

            {/* Verification Details */}
            <section className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                Verification Details
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="glass-panel p-2 rounded-lg">
                  <span className="text-muted-foreground block">Last Verified</span>
                  <span className="text-foreground font-medium">
                    {new Date(lake.lastVerifiedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="glass-panel p-2 rounded-lg">
                  <span className="text-muted-foreground block">Verified By</span>
                  <span className="text-foreground font-medium text-[11px] leading-tight">
                    {lake.verifiedBy}
                  </span>
                </div>
              </div>
              <div className="glass-panel p-2 rounded-lg">
                <span className="text-muted-foreground block text-xs mb-1">Evidence Used</span>
                <div className="flex flex-wrap gap-1">
                  {lake.evidenceUsed.map((evidence, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {evidence === 'Satellite Imagery' && <Image className="w-2.5 h-2.5" />}
                      {evidence === 'Field Survey' && <ClipboardList className="w-2.5 h-2.5" />}
                      {evidence === 'Historical Records' && <History className="w-2.5 h-2.5" />}
                      {evidence}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <Separator className="bg-border" />

            {/* Lake Overview - Collapsible */}
            <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-2 w-full text-left">
                  {detailsOpen ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <div className="w-1 h-3 bg-primary rounded-full" />
                    Lake Overview
                  </h3>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="glass-panel p-2.5 rounded-lg">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px]">Coordinates</span>
                    </div>
                    <p className="text-xs font-medium text-foreground font-mono">
                      {lake.coordinates[1].toFixed(4)}°N, {lake.coordinates[0].toFixed(4)}°E
                    </p>
                  </div>
                  <div className="glass-panel p-2.5 rounded-lg">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Mountain className="w-3 h-3" />
                      <span className="text-[10px]">Elevation</span>
                    </div>
                    <p className="text-xs font-medium text-foreground">
                      {lake.elevation.toLocaleString()} m
                    </p>
                  </div>
                  <div className="glass-panel p-2.5 rounded-lg">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Ruler className="w-3 h-3" />
                      <span className="text-[10px]">Surface Area</span>
                    </div>
                    <p className="text-xs font-medium text-foreground">
                      {lake.area} km²
                    </p>
                  </div>
                  <div className="glass-panel p-2.5 rounded-lg">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[10px]">Last Updated</span>
                    </div>
                    <p className="text-xs font-medium text-foreground">
                      {new Date(lake.lastUpdated).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator className="bg-border" />

            {/* Historical Events */}
            <Collapsible open={historyOpen} onOpenChange={setHistoryOpen}>
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-2 w-full text-left">
                  {historyOpen ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <div className="w-1 h-3 bg-destructive rounded-full" />
                    Previous GLOF Events
                  </h3>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {lake.history.length} recorded
                  </span>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                {lake.history.length > 0 ? (
                  <div className="space-y-2">
                    {lake.history.map((event, index) => (
                      <div
                        key={index}
                        className="glass-panel p-2.5 rounded-lg border-l-2 border-destructive/50"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">
                            {new Date(event.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            event.magnitude === 'Catastrophic' ? 'bg-destructive/20 text-destructive' :
                            event.magnitude === 'Major' ? 'bg-warning/20 text-warning' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {event.magnitude}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mb-1">{event.impact}</p>
                        <div className="flex items-center gap-1 text-[10px] text-primary">
                          <ExternalLink className="w-2.5 h-2.5" />
                          <span>{event.source}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-panel p-3 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">No recorded GLOF history</p>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>

            <Separator className="bg-border" />

            {/* Time Series - Compact */}
            <section>
              <TimeSeriesChart data={lake.timeSeries} title="Area & Precipitation Trends" />
            </section>

            <Separator className="bg-border" />

            {/* Model Explanation */}
            <section>
              <ModelExplanation features={lake.modelFeatures} />
            </section>

            <Separator className="bg-border" />

            {/* Role-Aware Actions */}
            <RoleAwareActions 
              userRole={userRole}
              lake={lake}
              onVerify={handleVerify}
            />

            {/* Download Options */}
            <section className="space-y-2 pt-2">
              <h4 className="text-xs font-semibold text-muted-foreground">Export Data</h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1.5 border-border hover:bg-secondary/50 text-xs h-8"
                >
                  <FileText className="w-3.5 h-3.5" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1.5 border-border hover:bg-secondary/50 text-xs h-8"
                >
                  <FileJson className="w-3.5 h-3.5" />
                  GeoJSON
                </Button>
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LakeDetailPanel;
