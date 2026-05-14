import React from 'react';
import { motion } from 'framer-motion';
import { Layers, PieChart, Info, Download, Filter, Maximize2, Map as MapIcon, Database } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const LandCoverView = () => {
    const categories = [
        { name: 'Open Water', area: 2450.4, color: 'bg-blue-500', perc: 52 },
        { name: 'Mudflats', area: 1040.2, color: 'bg-orange-600', perc: 22 },
        { name: 'Wetlands', area: 660.8, color: 'bg-emerald-500', perc: 14 },
        { name: 'Vegetation', area: 378.5, color: 'bg-green-700', perc: 8 },
        { name: 'Barren/Urban', area: 189.2, color: 'bg-slate-500', perc: 4 },
    ];

    return (
        <div className="flex-1 flex flex-col gap-4 p-4 overflow-hidden bg-[#0d121f]">
            {/* GIS Top Bar */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold tracking-tight text-white uppercase font-sans">地表覆盖与土地利用分析</h2>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-[9px] text-orange-400 font-bold uppercase tracking-widest px-2 py-0.5 bg-orange-500/10 rounded flex items-center gap-1.5">
                                <Layers size={10} />
                                LULC 分类任务 active
                            </span>
                            <span className="text-[9px] text-slate-500 font-mono uppercase">Sentinel-2 MSI Level-2A</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2 font-sans group">
                        <Filter size={12} />
                        分类配置
                    </button>
                    <button className="px-3 py-1.5 bg-emerald-500 text-black rounded text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center gap-2 font-sans">
                        <Database size={12} />
                        训练模型
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
                {/* Left: Classification Map */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
                    <div className="flex-1 relative bg-slate-900 rounded-2xl border border-white/5 overflow-hidden group">
                        {/* Map Overlay Simulation */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <MapIcon size={48} className="text-emerald-500/20 mx-auto mb-3" />
                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">LULC 分类分布图层</p>
                            </div>
                        </div>

                        {/* Map HUD Controls */}
                        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                            <div className="bg-slate-900/80 backdrop-blur-md p-1.5 border border-white/10 rounded-lg flex flex-col gap-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[10px] text-slate-400 hover:bg-white/10 cursor-pointer">
                                        {i === 1 ? 'RGB' : i === 2 ? 'CIR' : 'CLS'}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legend Overlay */}
                        <div className="absolute bottom-4 left-4 z-10">
                            <div className="bg-slate-900/80 backdrop-blur-md p-3 border border-white/10 rounded-xl w-40">
                                <div className="text-[9px] text-slate-500 font-bold uppercase mb-2">分类图例</div>
                                <div className="space-y-1.5">
                                    {categories.map(c => (
                                        <div key={c.name} className="flex items-center gap-2">
                                            <div className={cn("w-2 h-2 rounded-sm shrink-0", c.color)} />
                                            <span className="text-[9px] text-slate-300 uppercase tracking-wider">{c.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Analysis Panel */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <PieChart size={14} className="text-emerald-400" />
                                面积占比统计
                            </h3>
                        </div>
                        
                        <div className="space-y-5">
                            {categories.map(cat => (
                                <div key={cat.name} className="group">
                                    <div className="flex justify-between items-end mb-1.5">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cat.name}</span>
                                            <span className="text-[11px] font-mono text-slate-500">{cat.area.toLocaleString()} km²</span>
                                        </div>
                                        <span className={cn("text-xs font-bold font-mono", cat.color.replace('bg-', 'text-'))}>{cat.perc}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${cat.perc}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={cn("h-full rounded-full", cat.color)} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Info size={14} className="text-blue-400" />
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">特征空间分析</h3>
                            </div>
                            <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                                <p className="text-[10px] text-blue-400/80 leading-relaxed font-sans italic">
                                    当前分类采用随机森林 (Random Forest) 算法，基于 Sentinel-2 十个波段及 NDVI/NDWI 特征指数进行实时推理。
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-[8px] text-slate-500 uppercase font-bold tracking-widest mb-1">总体精度 (OA)</div>
                                <div className="text-lg font-mono text-emerald-400">92.4%</div>
                            </div>
                            <div>
                                <div className="text-[8px] text-slate-500 uppercase font-bold tracking-widest mb-1">Kappa 系数</div>
                                <div className="text-lg font-mono text-blue-400">0.89</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
