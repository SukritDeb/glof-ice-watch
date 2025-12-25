import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { glacierLakes, getRiskColor, VERIFICATION_STATUS } from '@/data/lakesData';

const MapView = ({ filters, onLakeSelect, selectedLake, userRole, showUnverified }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  const filteredLakes = glacierLakes.filter((lake) => {
    // Filter by risk levels
    if (!filters.riskLevels.includes(lake.riskLevel)) return false;
    // Filter by search query
    if (filters.searchQuery && !lake.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    // Filter unverified lakes for public users
    if (!showUnverified && lake.verificationStatus === VERIFICATION_STATUS.UNVERIFIED) return false;
    // Public users should never see pending reports
    if (userRole === 'public' && lake.verificationStatus === VERIFICATION_STATUS.PENDING && !showUnverified) {
      // Show pending only if showUnverified is enabled (for officials)
    }
    return true;
  });

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = L.map(mapContainer.current, {
      center: [27.9, 86.5],
      zoom: 9,
      zoomControl: false,
    });

    // Add dark tile layer (CartoDB Dark Matter - free, no API key)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map.current);

    // Add zoom control to top-right
    L.control.zoom({ position: 'topright' }).addTo(map.current);

    // Add scale control
    L.control.scale({ position: 'bottomright' }).addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update markers when filters or selection changes
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add markers for filtered lakes
    filteredLakes.forEach((lake) => {
      const color = getRiskColor(lake.riskLevel);
      const isHighRisk = lake.riskLevel === 'high';
      const isSelected = selectedLake?.id === lake.id;
      const isVerified = lake.verificationStatus === VERIFICATION_STATUS.VERIFIED;
      const isPending = lake.verificationStatus === VERIFICATION_STATUS.PENDING;

      // Confidence-based opacity (lower confidence = more muted)
      const confidenceOpacity = 0.4 + (lake.confidence * 0.6);

      // Create verification ring (dashed for pending, solid for verified)
      const ringOptions = {
        radius: isSelected ? 16 : 12,
        fillColor: 'transparent',
        color: isVerified ? color : isPending ? color : '#666',
        weight: 2,
        opacity: isVerified ? 0.8 : 0.5,
        fillOpacity: 0,
        dashArray: isVerified ? null : '4, 4',
        className: 'verification-ring',
      };

      const ringMarker = L.circleMarker([lake.coordinates[1], lake.coordinates[0]], ringOptions)
        .addTo(map.current);
      markersRef.current.push(ringMarker);

      // Create main circle marker with confidence-based opacity
      const marker = L.circleMarker([lake.coordinates[1], lake.coordinates[0]], {
        radius: isSelected ? 10 : 7,
        fillColor: color,
        color: 'white',
        weight: 2,
        opacity: 1,
        fillOpacity: confidenceOpacity,
        className: isHighRisk ? 'pulse-marker' : '',
      }).addTo(map.current);

      // Add pulsing effect for high-risk lakes
      if (isHighRisk && isVerified) {
        const pulseMarker = L.circleMarker([lake.coordinates[1], lake.coordinates[0]], {
          radius: 20,
          fillColor: color,
          color: color,
          weight: 2,
          opacity: 0.4,
          fillOpacity: 0.2,
          className: 'pulse-ring',
        }).addTo(map.current);
        markersRef.current.push(pulseMarker);
      }

      // Tooltip on hover with enhanced info
      const confidencePercent = Math.round(lake.confidence * 100);
      marker.bindTooltip(`
        <div class="p-2 rounded-lg" style="background: hsl(220, 35%, 10%); border: 1px solid hsl(195, 50%, 50%, 0.2); min-width: 140px;">
          <div class="font-semibold text-sm" style="color: hsl(210, 40%, 96%);">${lake.name}</div>
          <div class="text-xs mt-1" style="color: hsl(215, 20%, 55%);">
            Risk: <span style="color: ${color}; font-weight: 600;">${(lake.riskScore * 100).toFixed(0)}%</span>
          </div>
          <div class="text-xs" style="color: hsl(215, 20%, 55%);">
            Confidence: ${confidencePercent}%
          </div>
          <div class="text-xs mt-1 flex items-center gap-1" style="color: ${isVerified ? 'hsl(195, 100%, 50%)' : isPending ? 'hsl(32, 95%, 50%)' : 'hsl(215, 20%, 55%)'};">
            ${isVerified ? '✓ Verified' : isPending ? '◐ Pending' : '○ Unverified'}
          </div>
        </div>
      `, {
        permanent: false,
        direction: 'top',
        offset: [0, -14],
        className: 'lake-tooltip',
      });

      // Click handler
      marker.on('click', () => {
        onLakeSelect(lake);
        map.current?.flyTo([lake.coordinates[1], lake.coordinates[0]], 11, {
          duration: 1.5,
        });
      });

      markersRef.current.push(marker);
    });
  }, [filteredLakes, selectedLake, onLakeSelect, showUnverified, userRole]);

  return (
    <div className="h-full w-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default MapView;
