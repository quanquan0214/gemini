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
import { LiveFeedView } from './components/Views/LiveFeedView';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Globe2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('explorer');

  const renderContent = () => {
    switch (activeTab) {
      case 'explorer':
        return (
          <div className="flex-1 flex flex-col gap-6 min-w-0 font-sans">
            {/* Top Title Bar */}
            <div className="flex items-end justify-between px-6 pt-6 pb-2">
               <div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest">地图探索中心</span>
                    <span className="w-1 h-1 bg-slate-600 rounded-full" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">会话编号: POY-2024-B</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-white leading-none">鄱阳湖流域资源监测探索器</h2>
               </div>
               
               <div className="flex gap-2 h-fit">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold hover:bg-white/10 transition-colors uppercase tracking-widest text-slate-400">
                    遥测密钥同步
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-black rounded-lg text-[10px] font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest font-sans">
                    执行深度回归分析
                  </button>
               </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative mx-6 mb-6">
               <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2dd4bf 0.5px, transparent 0)', backgroundSize: '24px 24px' }} />
               <MapViewport layers={[]} />
               
               <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none z-10">
                 <div className="bg-[#0B0F1A]/90 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-2xl pointer-events-auto">
                   <div className="flex gap-8">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">当前观测坐标</span>
                        <span className="font-mono text-[11px] text-emerald-400">29.2° N, 116.2° E</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">传感器分辨率</span>
                        <span className="font-mono text-[11px] text-emerald-400">10米 / 哨兵-2</span>
                      </div>
                   </div>
                 </div>
                 
                 <div className="flex gap-2 pointer-events-auto">
                    <div className="bg-emerald-500 text-black text-[9px] font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 uppercase tracking-widest">
                      实时遥测活动中 <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                    </div>
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
      case 'livefeed':
        return <LiveFeedView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <div className="flex-1 flex items-center justify-center text-slate-500 uppercase tracking-widest font-bold">模块开发中</div>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0B0F1A] text-slate-200 overflow-hidden font-sans select-none">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navigation / Header */}
        <header className="h-14 border-b border-white/10 flex items-center justify-between px-8 bg-[#0B0F1A]/80 backdrop-blur-md z-[60]">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={14} />
              <input 
                type="text" 
                placeholder="搜索坐标或区域..." 
                className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-[11px] focus:outline-none focus:border-emerald-500/30 w-64 transition-all font-mono"
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
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">管理员</span>
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
