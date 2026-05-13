import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { LayerConfig } from '@/src/types/gis';
import { cn } from '@/src/lib/utils';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { ThematicLayerSwitcher } from './ThematicLayerSwitcher';
import { SpatialAnalysisTools } from './SpatialAnalysisTools';
import { MapLegend } from './MapLegend';

import { TimeSlider } from './TimeSlider';

interface Props {
  className?: string;
  onMapClick?: (coord: [number, number]) => void;
  layers: LayerConfig[];
}

export const MapViewport: React.FC<Props> = ({ className, onMapClick, layers }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [zoomLevel, setZoomLevel] = useState(8);

  useEffect(() => {
    if (!mapElement.current) return;

    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
          properties: { id: 'osm' }
        })
      ],
      view: new View({
        center: fromLonLat([116.3, 29.1]), // Center of Poyang Lake
        zoom: 8,
      }),
      controls: []
    });

    initialMap.on('click', (event) => {
      const coord = event.coordinate;
      onMapClick?.([coord[0], coord[1]]);
    });

    initialMap.on('moveend', () => {
      setZoomLevel(Math.round(initialMap.getView().getZoom() || 8));
    });

    mapRef.current = initialMap;

    return () => {
      initialMap.setTarget(undefined);
    };
  }, []);

  return (
    <div className={cn("relative w-full h-full bg-slate-900 overflow-hidden rounded-xl border border-slate-800 shadow-inner", className)}>
      <div ref={mapElement} className="w-full h-full" />
      
      {/* Overlays */}
      <ThematicLayerSwitcher />
      <SpatialAnalysisTools />
      <MapLegend />
      <TimeSlider />

      {/* Map UI Overlay */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
        <div className="bg-slate-900/80 backdrop-blur-md p-1 border border-slate-700/50 rounded-lg flex flex-col gap-1">
          <button 
            onClick={() => mapRef.current?.getView().animate({ zoom: (mapRef.current?.getView().getZoom() || 8) + 1, duration: 250 })}
            className="p-2 hover:bg-slate-800 text-slate-300 rounded-md transition-colors"
          >
            <ZoomIn size={18} />
          </button>
          <div className="h-[1px] bg-slate-800 w-4 mx-auto" />
          <button 
             onClick={() => mapRef.current?.getView().animate({ zoom: (mapRef.current?.getView().getZoom() || 8) - 1, duration: 250 })}
             className="p-2 hover:bg-slate-800 text-slate-300 rounded-md transition-colors"
          >
            <ZoomOut size={18} />
          </button>
        </div>
        
        <button className="bg-slate-900/80 backdrop-blur-md p-2 border border-slate-700/50 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors">
          <Maximize2 size={18} />
        </button>
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-slate-900/80 backdrop-blur-md px-4 py-1.5 border border-slate-700/50 rounded-full shadow-2xl text-[10px] uppercase font-bold tracking-[0.3em] text-blue-400">
          已激活实时点云同步
        </div>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-2 border border-slate-700/50 rounded-lg shadow-xl text-xs font-mono text-slate-400 flex flex-col items-end gap-1">
          <span>Z: {zoomLevel}</span>
          <span className="text-[10px] text-slate-600">116.32E 29.14N</span>
        </div>
      </div>
    </div>
  );
};
