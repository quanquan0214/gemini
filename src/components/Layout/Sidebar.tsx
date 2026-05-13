import React from 'react';
import { cn } from '@/src/lib/utils';
import { 
  BarChart3, 
  Map as MapIcon, 
  Waves, 
  Leaf, 
  CloudRain, 
  Layers, 
  Settings,
  Activity,
  Box
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, active, onClick }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative",
      active 
        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
        : "text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent"
    )}
  >
    <div className={cn(
      "transition-transform group-hover:scale-110",
      active ? "text-emerald-400" : "text-slate-500"
    )}>
      {icon}
    </div>
    <span className="font-bold text-[10px] uppercase tracking-wider">{label}</span>
    {active && (
      <div className="absolute right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
    )}
  </button>
);

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 border-r border-white/10 flex flex-col bg-[#0B0F1A] h-screen sticky top-0 z-50">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Activity size={20} className="text-black" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-white uppercase text-sm leading-tight">EcoGIS</h1>
            <span className="text-[10px] text-emerald-400 font-medium tracking-widest uppercase">Poyang Lake</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-6 flex flex-col gap-1">
        <SidebarItem 
          icon={<MapIcon size={18} />} 
          label="Explorer" 
          active={activeTab === 'explorer'} 
          onClick={() => setActiveTab('explorer')}
        />
        <SidebarItem 
          icon={<Waves size={18} />} 
          label="Hydrology" 
          active={activeTab === 'hydrology'} 
          onClick={() => setActiveTab('hydrology')}
        />
        <SidebarItem 
          icon={<Leaf size={18} />} 
          label="Land Cover" 
          active={activeTab === 'landcover'} 
          onClick={() => setActiveTab('landcover')}
        />
        <SidebarItem 
          icon={<CloudRain size={18} />} 
          label="Meteorology" 
          active={activeTab === 'weather'} 
          onClick={() => setActiveTab('weather')}
        />

        <div className="my-4 border-t border-white/5 mx-4" />

        <SidebarItem 
          icon={<Box size={18} />} 
          label="Analysis" 
          active={activeTab === 'analysis'} 
          onClick={() => setActiveTab('analysis')}
        />
        <SidebarItem 
          icon={<Layers size={18} />} 
          label="Layers" 
          active={activeTab === 'layers'} 
          onClick={() => setActiveTab('layers')}
        />
      </div>

      <div className="p-4 border-t border-white/10">
        <SidebarItem 
          icon={<Settings size={18} />} 
          label="Settings" 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
        />
      </div>
    </aside>
  );
};
