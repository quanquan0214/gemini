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
      
      {/* Overlays Zone */}
      <div className="absolute inset-0 pointer-events-none z-10 p-6">
        {/* Left Control Column */}
        <div className="absolute top-6 bottom-32 left-6 flex flex-col gap-4 pointer-events-auto w-64">
          <ThematicLayerSwitcher />
          <div className="flex-1" /> {/* Spacer */}
          <MapLegend />
        </div>

        {/* Right Control Column */}
        <div className="absolute top-6 right-6 flex flex-col items-end gap-4 pointer-events-auto">
          <div className="bg-slate-900/80 backdrop-blur-md px-3 py-2 border border-white/10 rounded-lg shadow-xl text-xs font-mono text-slate-400 flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">LIVE POY-2024</span>
               <span className="h-2 w-[1px] bg-white/10" />
               <span>Z: {zoomLevel}</span>
            </div>
            <span className="text-[9px] text-slate-600 tracking-wider">29.14°N / 116.32°E</span>
          </div>
          <SpatialAnalysisTools />
        </div>

        {/* Top Center: System Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="bg-emerald-500/10 backdrop-blur-md px-4 py-1.5 border border-emerald-500/20 rounded-full shadow-2xl text-[9px] uppercase font-bold tracking-[0.4em] text-emerald-400 whitespace-nowrap animate-in fade-in slide-in-from-top duration-700 pointer-events-auto">
            已激活实时 GEE 遥测引擎
          </div>
        </div>

        {/* Bottom Right: Map Controls */}
        <div className="absolute bottom-24 right-6 flex flex-col gap-2 pointer-events-auto">
          <div className="bg-slate-900/90 backdrop-blur-md p-1.5 border border-white/10 rounded-xl flex flex-col gap-1.5 shadow-2xl">
            <button 
              onClick={() => mapRef.current?.getView().animate({ zoom: (mapRef.current?.getView().getZoom() || 8) + 1, duration: 250 })}
              className="p-2 hover:bg-emerald-500 hover:text-black text-slate-300 rounded-lg transition-all duration-200"
              title="放大"
            >
              <ZoomIn size={18} />
            </button>
            <div className="h-[1px] bg-white/5 w-4 mx-auto" />
            <button 
               onClick={() => mapRef.current?.getView().animate({ zoom: (mapRef.current?.getView().getZoom() || 8) - 1, duration: 250 })}
               className="p-2 hover:bg-emerald-500 hover:text-black text-slate-300 rounded-lg transition-all duration-200"
               title="缩小"
            >
              <ZoomOut size={18} />
            </button>
          </div>
          
          <button className="bg-slate-900/90 backdrop-blur-md p-2.5 border border-white/10 rounded-xl hover:bg-white/10 text-slate-300 transition-all shadow-2xl">
            <Maximize2 size={18} />
          </button>
        </div>

        {/* Bottom Center: Timeline */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-auto">
           <TimeSlider />
        </div>
      </div>
    </div>
  );
};
