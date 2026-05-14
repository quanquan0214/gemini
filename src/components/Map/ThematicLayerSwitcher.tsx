import React from 'react';
import { cn } from '@/src/lib/utils';
import { Database, Waves, Thermometer, Wind, Eye, EyeOff, Layers } from 'lucide-react';

interface LayerItem {
  id: string;
  name: string;
  type: 'raster' | 'vector' | 'wms';
  icon: React.ReactNode;
  active: boolean;
}

const layers: LayerItem[] = [
  { id: 'ndvi', name: 'Veg. Index (NDVI)', type: 'raster', icon: <Database size={14} />, active: true },
  { id: 'lst', name: 'Surface Temp (LST)', type: 'raster', icon: <Thermometer size={14} />, active: false },
  { id: 'water', name: 'Water Mask', type: 'vector', icon: <Waves size={14} />, active: false },
  { id: 'wind', name: 'Wind Vectors', type: 'wms', icon: <Wind size={14} />, active: false },
];

export const ThematicLayerSwitcher = () => {
  return (
    <div className="w-56 bg-[#0B0F1A]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Layers size={14} className="text-emerald-400" />
        <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">专项专题图层</h3>
      </div>
      
      <div className="space-y-1.5">
        {[
            { id: 'ndvi', name: '植被指数 (NDVI)', icon: <Database size={14} />, active: true },
            { id: 'lst', name: '地表温度 (LST)', icon: <Thermometer size={14} />, active: false },
            { id: 'water', name: '水体掩膜', icon: <Waves size={14} />, active: false },
            { id: 'wind', name: '风场矢量', icon: <Wind size={14} />, active: false },
        ].map(layer => (
          <div 
            key={layer.id}
            className={cn(
               "flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer group",
               layer.active ? "bg-emerald-500/10 border border-emerald-500/20" : "hover:bg-white/5 border border-transparent"
            )}
          >
            <div className="flex items-center gap-3">
              <span className={cn(
                "p-1 rounded bg-white/5",
                layer.active ? "text-emerald-400" : "text-slate-600"
              )}>
                {layer.icon}
              </span>
              <span className={cn("text-[10px] font-bold uppercase tracking-tight", layer.active ? "text-slate-100" : "text-slate-500")}>
                {layer.name}
              </span>
            </div>
            
            {layer.active ? <Eye size={12} className="text-emerald-400" /> : <EyeOff size={12} className="text-slate-700" />}
          </div>
        ))}
      </div>
    </div>
  );
};
