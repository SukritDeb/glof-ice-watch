import { useState } from 'react';
import TopNavbar from '@/components/TopNavbar';
import FilterSidebar from '@/components/FilterSidebar';
import MapView from '@/components/MapView';
import RiskLegend from '@/components/RiskLegend';
import LakeDetailPanel from '@/components/LakeDetailPanel';
import UploadDataPage from '@/components/UploadDataPage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLake, setSelectedLake] = useState(null);
  const [filters, setFilters] = useState({
    riskLevels: ['high', 'medium', 'low'],
    yearRange: [2018, 2024],
    searchQuery: '',
  });

  const handleLakeSelect = (lake) => {
    setSelectedLake(lake);
  };

  const handleClosePanel = () => {
    setSelectedLake(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="relative h-full">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            <div className="h-full ml-64 transition-all duration-300">
              <MapView
                filters={filters}
                onLakeSelect={handleLakeSelect}
                selectedLake={selectedLake}
              />
            </div>
            <RiskLegend />
            <LakeDetailPanel lake={selectedLake} onClose={handleClosePanel} />
            {selectedLake && (
              <div
                className="fixed inset-0 z-30 sm:hidden"
                onClick={handleClosePanel}
              />
            )}
          </div>
        );
      case 'upload':
        return <UploadDataPage />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="glass-panel p-8 text-center max-w-md">
              <h2 className="text-xl font-bold text-foreground mb-2">
                {activeTab === 'insights' && 'Model Insights'}
                {activeTab === 'about' && 'About GLOF Predictor'}
              </h2>
              <p className="text-muted-foreground">
                This section is coming soon. The dashboard view provides full glacier lake monitoring and risk assessment.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pt-16 h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
