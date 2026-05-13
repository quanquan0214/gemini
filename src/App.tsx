import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { MapViewport } from './components/Map/MapViewport';
import { AnalysisPanel } from './components/Dashboard/AnalysisPanel';
import { StatusBadge } from './components/UI/StatusBadge';
import { HydrologyView } from './components/Views/HydrologyView';
import { LandCoverView } from './components/Views/LandCoverView';
import { MeteorologyView } from './components/Views/MeteorologyView';
import { AnalysisView } from './components/Views/AnalysisView';
import { LayersView } from './components/Views/LayersView';
import { SettingsView } from './components/Views/SettingsView';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Globe2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('explorer');

  const renderContent = () => {
    switch (activeTab) {
      case 'explorer':
        return (
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Top Title Bar */}
            <div className="flex items-end justify-between">
               <div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest">{activeTab} Interface</span>
                    <span className="w-1 h-1 bg-slate-600 rounded-full" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Active Session: POY-2024-B</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-white capitalize leading-none">Poyang Basin Explorer</h2>
               </div>
               
               <div className="flex gap-2 h-fit">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold hover:bg-white/10 transition-colors uppercase tracking-widest">
                    Telemetry Key
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-black rounded-lg text-[10px] font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest">
                    Run Analysis
                  </button>
               </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative">
               <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2dd4bf 0.5px, transparent 0)', backgroundSize: '24px 24px' }} />
               <MapViewport layers={[]} />
            </div>

            {/* Bottom Overlay Legend/Stats */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
               <div className="bg-[#0B0F1A]/90 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-2xl pointer-events-auto">
                 <div className="flex gap-8">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Observation Target</span>
                      <span className="font-mono text-[11px] text-emerald-400 lowercase">29.2° N, 116.2° E</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Spatial Res</span>
                      <span className="font-mono text-[11px] text-emerald-400">10m / Sentinel-2</span>
                    </div>
                 </div>
               </div>
               
               <div className="flex gap-2 pointer-events-auto">
                  <div className="bg-emerald-500 text-black text-[9px] font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 uppercase tracking-widest">
                    Live Telemetry <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                  </div>
               </div>
            </div>
          </div>
        );
      case 'hydrology':
        return <HydrologyView />;
      case 'landcover':
        return <LandCoverView />;
      case 'weather':
        return <MeteorologyView />;
      case 'analysis':
        return <AnalysisView />;
      case 'layers':
        return <LayersView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <div className="flex-1 flex items-center justify-center text-slate-500 uppercase tracking-widest font-bold">Module Under Construction</div>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0B0F1A] text-slate-200 overflow-hidden font-sans select-none">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navigation / Header */}
        <header className="h-14 border-b border-white/10 flex items-center justify-between px-8 bg-[#0B0F1A]/80 backdrop-blur-md z-[60]">
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6">
               <button 
                 onClick={() => setActiveTab('analysis')}
                 className={cn("text-[11px] font-bold uppercase tracking-widest h-14 transition-all pb-[2px]", activeTab === 'analysis' ? "text-white border-b-2 border-emerald-500 translate-y-[1px]" : "text-slate-400 hover:text-white")}
               >
                 Analysis
               </button>
               <button 
                 onClick={() => setActiveTab('hydrology')}
                 className={cn("text-[11px] font-bold uppercase tracking-widest h-14 transition-all pb-[2px]", activeTab === 'hydrology' ? "text-white border-b-2 border-emerald-500 translate-y-[1px]" : "text-slate-400 hover:text-white")}
               >
                 Hydrology
               </button>
               <button 
                onClick={() => setActiveTab('weather')}
                className={cn("text-[11px] font-bold uppercase tracking-widest h-14 transition-all pb-[2px]", activeTab === 'weather' ? "text-white border-b-2 border-emerald-500 translate-y-[1px]" : "text-slate-400 hover:text-white")}
               >
                 Forecasting
               </button>
            </nav>
            
            <div className="h-4 w-[1px] bg-white/10" />
            
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={14} />
              <input 
                type="text" 
                placeholder="Region Lookup..." 
                className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-[11px] focus:outline-none focus:border-emerald-500/30 w-48 transition-all font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <StatusBadge status="operational" />
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-500 hover:text-white transition-colors">
                <Bell size={16} />
              </button>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-bold">
                  LL
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 flex overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex overflow-hidden"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>

          {(activeTab === 'explorer' || activeTab === 'landcover') && <AnalysisPanel />}
        </main>
      </div>
    </div>
  );
}
