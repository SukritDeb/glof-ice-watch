import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GlacierLake, glacierLakes, getRiskColor } from '@/data/lakesData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Key, Eye, EyeOff } from 'lucide-react';

interface MapViewProps {
  filters: {
    riskLevels: string[];
    yearRange: [number, number];
    searchQuery: string;
  };
  onLakeSelect: (lake: GlacierLake) => void;
  selectedLake: GlacierLake | null;
}

const MapView = ({ filters, onLakeSelect, selectedLake }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const filteredLakes = glacierLakes.filter((lake) => {
    if (!filters.riskLevels.includes(lake.riskLevel)) return false;
    if (filters.searchQuery && !lake.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    return true;
  });

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [86.5, 27.9],
      zoom: 8,
      pitch: 45,
      bearing: -10,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      'top-right'
    );

    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-right');

    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(10, 22, 40)',
        'high-color': 'rgb(30, 50, 80)',
        'horizon-blend': 0.1,
      });

      map.current?.addSource('terrain', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });

      map.current?.setTerrain({ source: 'terrain', exaggeration: 1.5 });
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      map.current?.remove();
    };
  }, [tokenSubmitted, mapboxToken]);

  useEffect(() => {
    if (!map.current || !tokenSubmitted) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add markers for filtered lakes
    filteredLakes.forEach((lake) => {
      const color = getRiskColor(lake.riskLevel);
      const isHighRisk = lake.riskLevel === 'high';
      const isSelected = selectedLake?.id === lake.id;

      // Create marker element
      const el = document.createElement('div');
      el.className = 'relative cursor-pointer';
      el.innerHTML = `
        <div class="relative">
          ${isHighRisk ? `
            <div class="absolute inset-0 rounded-full animate-ping" style="background: ${color}; opacity: 0.4;"></div>
            <div class="absolute inset-[-4px] rounded-full" style="background: radial-gradient(circle, ${color}40 0%, transparent 70%);"></div>
          ` : ''}
          <div 
            class="w-4 h-4 rounded-full border-2 transition-all duration-200 ${isSelected ? 'scale-150' : ''}"
            style="background: ${color}; border-color: white; box-shadow: 0 0 ${isHighRisk ? '20' : '10'}px ${color};"
          ></div>
        </div>
      `;

      // Create popup
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 15,
        className: 'lake-popup',
      }).setHTML(`
        <div class="p-2 rounded-lg" style="background: hsl(220, 35%, 10%); border: 1px solid hsl(195, 50%, 50%, 0.2);">
          <div class="font-semibold text-sm" style="color: hsl(210, 40%, 96%);">${lake.name}</div>
          <div class="text-xs mt-1" style="color: hsl(215, 20%, 55%);">
            Risk: <span style="color: ${color}; font-weight: 600;">${(lake.riskScore * 100).toFixed(0)}%</span>
          </div>
          <div class="text-xs" style="color: hsl(215, 20%, 55%);">
            ${lake.riskLevel.charAt(0).toUpperCase() + lake.riskLevel.slice(1)} Risk
          </div>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(lake.coordinates)
        .addTo(map.current!);

      // Event listeners
      el.addEventListener('mouseenter', () => {
        popup.setLngLat(lake.coordinates).addTo(map.current!);
        popupRef.current = popup;
      });

      el.addEventListener('mouseleave', () => {
        popup.remove();
        popupRef.current = null;
      });

      el.addEventListener('click', () => {
        onLakeSelect(lake);
        map.current?.flyTo({
          center: lake.coordinates,
          zoom: 11,
          duration: 1500,
        });
      });

      markersRef.current.push(marker);
    });
  }, [filteredLakes, selectedLake, tokenSubmitted, onLakeSelect]);

  if (!tokenSubmitted) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background">
        <div className="glass-panel p-8 max-w-md w-full mx-4 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Key className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Mapbox Access Token Required</h2>
            <p className="text-sm text-muted-foreground">
              To display the interactive map, please enter your Mapbox public token.
              You can get one for free at{' '}
              <a
                href="https://mapbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showToken ? 'text' : 'password'}
                placeholder="pk.eyJ1Ijoi..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="pr-10 bg-secondary/50 border-border focus:border-primary font-mono text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <Button
              onClick={() => setTokenSubmitted(true)}
              disabled={!mapboxToken.startsWith('pk.')}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Initialize Map
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Your token is only used locally and is not stored or transmitted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default MapView;
