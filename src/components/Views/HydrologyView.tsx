import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Droplet, Navigation, Download, Wind, Droplets, Map as MapIcon, Maximize2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { AreaChart } from '../UI/Charts';

const WATER_LEVEL_DATA = Array.from({ length: 48 }, (_, i) => ({ v: 12 + Math.sin(i / 10) * 3 + Math.random() }));

export const HydrologyView = () => {
    return (
        <div className="flex-1 flex flex-col gap-4 p-4 overflow-hidden bg-[#0d121f]">
            {/* GIS Top Bar */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold tracking-tight text-white uppercase font-sans">水利监测与流域模拟</h2>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest px-2 py-0.5 bg-emerald-500/10 rounded flex items-center gap-1.5">
                                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                                实时遥测流中
                            </span>
                            <span className="text-[9px] text-slate-500 font-mono uppercase">Reference: WGS 84 / EPSG:4326</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2 font-sans group">
                        <Navigation size={12} className="group-hover:rotate-45 transition-transform" />
                        空间定位
                    </button>
                    <button className="px-3 py-1.5 bg-emerald-500 text-black rounded text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center gap-2 font-sans">
                        <Download size={12} />
                        报表导出
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
                {/* Left: Spatial Side (The Map) */}
                <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
                    <div className="flex-1 relative bg-slate-900 rounded-2xl border border-white/5 overflow-hidden group">
                        {/* Simulation of a Map */}
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <Waves size={48} className="text-blue-500/20 mx-auto mb-3" />
                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">水位空间分布场 - 渲染中</p>
                            </div>
                        </div>

                        {/* Map HUD */}
                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                            <div className="bg-slate-900/80 backdrop-blur-md p-3 border border-white/10 rounded-xl">
                                <div className="text-[9px] text-slate-500 font-bold uppercase mb-2">活跃传感器</div>
                                <div className="space-y-1.5">
                                    {['ST-XINGZI', 'ST-HUKOU', 'ST-DUCHANG'].map(s => (
                                        <div key={s} className="flex items-center gap-2 text-[10px] text-white/80 font-mono">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                             <button className="p-2 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-lg text-white hover:bg-slate-800 transition-all">
                                <Maximize2 size={16} />
                             </button>
                        </div>
                    </div>

                    {/* Quick Stats Grid under map */}
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { label: "平均水位", value: "12.4", unit: "m", color: "text-blue-400" },
                            { label: "入库流量", value: "2450", unit: "m³/s", color: "text-emerald-400" },
                            { label: "出库流量", value: "1820", unit: "m³/s", color: "text-orange-400" },
                            { label: "库容百分比", value: "68", unit: "%", color: "text-teal-400" },
                        ].map((s, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-3">
                                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">{s.label}</div>
                                <div className="flex items-baseline gap-1">
                                    <span className={cn("text-lg font-bold font-mono", s.color)}>{s.value}</span>
                                    <span className="text-[9px] text-slate-600">{s.unit}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Data Side */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 overflow-hidden">
                    {/* Time Series Section */}
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col shrink-0">
                         <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <Waves size={14} className="text-blue-500" />
                                实测时序趋势分析
                            </h3>
                            <select className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-[9px] text-slate-400 font-bold uppercase tracking-widest outline-none">
                                <option>Past 48 Hours</option>
                                <option>Past 7 Days</option>
                            </select>
                         </div>
                         <div className="h-48 relative border-l border-b border-white/5">
                            <AreaChart data={WATER_LEVEL_DATA} color="#3b82f6" height={190} />
                         </div>
                         <div className="flex justify-between mt-3 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                            <span>48H AGO</span>
                            <span>24H AGO</span>
                            <span>CURRENT</span>
                         </div>
                    </div>

                    {/* Table Section - Scrolled */}
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex-1 flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">关键遥测断面列表</h3>
                            <button className="text-[9px] text-blue-400 font-bold uppercase tracking-widest hover:text-blue-300">管理站点</button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <table className="w-full text-left">
                                <thead className="sticky top-0 bg-[#161b2a] z-10">
                                    <tr className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                        <th className="py-2">Station</th>
                                        <th className="py-2">Level</th>
                                        <th className="py-2">24H Δ</th>
                                        <th className="py-2 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[11px] font-mono">
                                    {[
                                        { id: 'ST-XINGZI', lvl: '12.45', delta: '+0.12', status: 'OK' },
                                        { id: 'ST-HUKOU', lvl: '11.82', delta: '-0.05', status: 'OK' },
                                        { id: 'ST-DUCHANG', lvl: '13.10', delta: '+0.24', status: 'OK' },
                                        { id: 'ST-KANGSHAN', lvl: '10.95', delta: '+0.08', status: 'OK' },
                                        { id: 'ST-WANG', lvl: '12.10', delta: '+0.02', status: 'OFF' },
                                    ].map((s) => (
                                        <tr key={s.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="py-3 text-white font-bold">{s.id.replace('ST-', '')}</td>
                                            <td className="py-3 text-emerald-400">{s.lvl}m</td>
                                            <td className={cn("py-3", s.delta.startsWith('+') ? 'text-emerald-400' : 'text-orange-400')}>{s.delta}</td>
                                            <td className="py-3 text-right">
                                                <span className={cn(
                                                    "px-1.5 py-0.5 rounded-sm text-[8px] font-bold uppercase",
                                                    s.status === 'OK' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-500'
                                                )}>
                                                    {s.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
