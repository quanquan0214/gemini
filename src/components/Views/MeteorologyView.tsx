import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Thermometer, Wind, Eye, Droplet, Sun, Download, Map as MapIcon, Maximize2, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Sparkline, AreaChart } from '../UI/Charts';

const TEMP_SERIES = Array.from({ length: 48 }, (_, i) => ({ v: 18 + Math.sin(i / 12) * 8 + Math.random() * 2 }));

export const MeteorologyView = () => {
    return (
        <div className="flex-1 flex flex-col gap-4 p-4 overflow-hidden bg-[#0d121f]">
            {/* GIS Top Bar */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold tracking-tight text-white uppercase font-sans">气象环境空间监测</h2>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest px-2 py-0.5 bg-cyan-500/10 rounded flex items-center gap-1.5">
                                <Activity size={10} />
                                ERA5 Reanalysis 同步中
                            </span>
                            <span className="text-[9px] text-slate-500 font-mono uppercase">Update: 15 mins ago</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2 font-sans group">
                        <Maximize2 size={12} />
                        全屏投影
                    </button>
                    <button className="px-3 py-1.5 bg-cyan-500 text-black rounded text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors flex items-center gap-2 font-sans">
                        <Download size={12} />
                        气象栅格导出
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
                {/* Left: Meteorology Heatmap */}
                <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
                    <div className="flex-1 relative bg-slate-900 rounded-2xl border border-white/5 overflow-hidden group">
                        {/* Map Overlay Simulation (Atmospheric Heatmap) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-900 to-indigo-900/20" />
                        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                        
                        {/* Thermal Plumes simulation */}
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full animate-pulse" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <Thermometer size={48} className="text-cyan-500/20 mx-auto mb-3" />
                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">气温空间场 (2m Temperature)</p>
                            </div>
                        </div>

                        {/* Coordinate Grid Overlay */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            <defs>
                                <pattern id="geo-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#geo-grid)" />
                        </svg>

                        {/* Map UI */}
                        <div className="absolute bottom-4 left-4 z-10">
                            <div className="bg-slate-900/80 backdrop-blur-md p-2 px-3 border border-white/10 rounded-lg flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-gradient-to-r from-blue-600 via-emerald-500 to-red-600 rounded-full" />
                                    <span className="text-[8px] text-slate-400 font-mono">12°C - 34°C</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 shrink-0">
                        {[
                            { label: "平均气温", value: "24.5", unit: "°C", icon: Thermometer, color: "text-orange-400" },
                            { label: "相对湿度", value: "72", unit: "%", icon: Droplet, color: "text-blue-400" },
                            { label: "平均风速", value: "4.2", unit: "m/s", icon: Wind, color: "text-emerald-400" },
                        ].map((s, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">{s.label}</span>
                                    <s.icon size={12} className={s.color} />
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className={cn("text-xl font-bold font-mono", s.color)}>{s.value}</span>
                                    <span className="text-[10px] text-slate-600">{s.unit}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Analytical Side */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 overflow-hidden">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col shrink-0">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <Sun size={14} className="text-orange-400" />
                                气温 48H 变化序列
                            </h3>
                            <button className="text-[9px] text-slate-500 font-bold uppercase tracking-widest border border-white/10 px-2 py-1 rounded">2m Temp</button>
                        </div>
                        <div className="h-40">
                             <AreaChart data={TEMP_SERIES} color="#f97316" height={160} />
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex-1 flex flex-col overflow-hidden">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">区域气象特征</h3>
                        <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                            {[
                                { label: '总云量 (TCC)', val: '42%', color: 'bg-slate-400' },
                                { label: '短波辐射 (SSR)', val: '185 W/m²', color: 'bg-orange-500' },
                                { label: '露点温度', val: '18.2 °C', color: 'bg-blue-400' },
                                { label: '大气压力', val: '1012 hPa', color: 'bg-cyan-500' },
                                { label: '能见度', val: '12.4 km', color: 'bg-emerald-400' },
                            ].map(item => (
                                <div key={item.label} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{item.label}</span>
                                        <span className="text-[11px] font-mono font-bold text-white">{item.val}</span>
                                    </div>
                                    <div className="mt-2 h-0.5 bg-white/5 w-full rounded-full overflow-hidden">
                                        <div className={cn("h-full opacity-60", item.color)} style={{ width: '60%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                <span className="text-[9px] text-cyan-400 uppercase font-bold tracking-widest italic">气象同化完成</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
