import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Thermometer, Wind, Eye } from 'lucide-react';

export const MeteorologyView = () => {
    return (
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#0d121f]">
            <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Meteorological Intelligence</h2>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Atmospheric dynamics & seasonal forecasting</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-1 items-center justify-center">
                    <Thermometer size={20} className="text-orange-400 mb-2" />
                    <span className="text-3xl font-light text-white tracking-tight">24.5<span className="text-sm text-slate-500">°C</span></span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Avg. Temp (Monthly)</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-1 items-center justify-center">
                    <CloudRain size={20} className="text-blue-400 mb-2" />
                    <span className="text-3xl font-light text-white tracking-tight">125<span className="text-sm text-slate-500">mm</span></span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Acc. Rainfall</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-1 items-center justify-center">
                    <Wind size={20} className="text-teal-400 mb-2" />
                    <span className="text-3xl font-light text-white tracking-tight">4.2<span className="text-sm text-slate-500">m/s</span></span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Wind Velocity</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-1 items-center justify-center">
                    <Eye size={20} className="text-slate-400 mb-2" />
                    <span className="text-3xl font-light text-white tracking-tight">12.4<span className="text-sm text-slate-500">km</span></span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Visibility</span>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="col-span-3 bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden h-[360px]"
                >
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Seasonal Anomaly Plot</h3>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-2">Historical Deviation vs Current Epoch</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Normal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-44 relative flex items-end gap-1">
                        {Array.from({ length: 60 }).map((_, i) => (
                           <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
                               <div className="w-full bg-blue-500/20 rounded-sm" style={{ height: `${20 + Math.random() * 60}%` }} />
                               <div className="w-full bg-emerald-400/40 rounded-sm" style={{ height: `${10 + Math.random() * 80}%` }} />
                           </div>
                        ))}
                        <div className="absolute inset-0 border-b border-white/10 border-dashed" style={{ bottom: '50%' }} />
                    </div>
                </motion.div>

                <div className="col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Local Alerts</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">High Temperature</span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed italic">Extreme heat warning for southern marsh zones. Fire risk elevated to Tier 3.</p>
                        </div>

                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Heavy Runoff</span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed italic">Upstream discharge surge expected within 24 hours. Level adjustment recommended.</p>
                        </div>
                    </div>

                    <button className="mt-auto w-full py-2.5 bg-white text-black rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors">
                        Generate Forecast
                    </button>
                </div>
            </div>
        </div>
    );
};
