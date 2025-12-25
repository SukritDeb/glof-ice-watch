import { useState } from 'react';
import TopNavbar from '@/components/TopNavbar';
import FilterSidebar from '@/components/FilterSidebar';
import MapView from '@/components/MapView';
import RiskLegend from '@/components/RiskLegend';
import LakeDetailPanel from '@/components/LakeDetailPanel';
import AdvisoryDisclaimer from '@/components/AdvisoryDisclaimer';
import { UnverifiedToggle } from '@/components/RoleAwareActions';
import { USER_ROLES } from '@/data/lakesData';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLake, setSelectedLake] = useState(null);
  const [filters, setFilters] = useState({
    riskLevels: ['high', 'medium', 'low'],
    yearRange: [2018, 2024],
    searchQuery: '',
  });

  // For demo purposes - in production this would come from auth
  // Change to USER_ROLES.OFFICIAL or USER_ROLES.ADMIN to test different views
  const [userRole] = useState(USER_ROLES.OFFICIAL);
  const [showUnverified, setShowUnverified] = useState(false);

  const handleLakeSelect = (lake) => {
    setSelectedLake(lake);
  };

  const handleClosePanel = () => {
    setSelectedLake(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <TopNavbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="pt-16 h-screen">
        {activeTab === 'dashboard' ? (
          <div className="relative h-full">
            {/* Filter Sidebar */}
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />

            {/* Unverified Toggle - For Officials Only */}
            {userRole !== USER_ROLES.PUBLIC && (
              <div className="absolute top-4 left-[calc(256px+1rem)] z-20">
                <UnverifiedToggle
                  userRole={userRole}
                  showUnverified={showUnverified}
                  onToggle={setShowUnverified}
                />
              </div>
            )}

            {/* Map View */}
            <div className="h-full ml-64 transition-all duration-300">
              <MapView
                filters={filters}
                onLakeSelect={handleLakeSelect}
                selectedLake={selectedLake}
                userRole={userRole}
                showUnverified={showUnverified}
              />
            </div>

            {/* Risk Legend */}
            <RiskLegend />

            {/* Advisory Disclaimer */}
            <AdvisoryDisclaimer />

            {/* Lake Detail Panel */}
            <LakeDetailPanel 
              lake={selectedLake} 
              onClose={handleClosePanel}
              userRole={userRole}
            />

            {/* Click outside to close panel */}
            {selectedLake && (
              <div
                className="fixed inset-0 z-30 sm:hidden"
                onClick={handleClosePanel}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="glass-panel p-8 text-center max-w-md">
              <h2 className="text-xl font-bold text-foreground mb-2">
                {activeTab === 'insights' && 'Model Insights'}
                {activeTab === 'upload' && 'Upload Data'}
                {activeTab === 'about' && 'About GLOF Predictor'}
              </h2>
              <p className="text-muted-foreground">
                This section is coming soon. The dashboard view provides full glacier lake monitoring and risk assessment.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
