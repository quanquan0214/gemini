import React from 'react';
import { motion } from 'framer-motion';
import { Box, Shapes, Download, Play, Code } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { RadialGauge } from '../UI/Charts';

export const AnalysisView = () => {
    return (
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#0d121f]">
            <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase">空间回归分析套件</h2>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">高级机制分析与相关性引擎</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2">
                        <Download size={14} />
                        导出 GWR 结果
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Configuration Panel */}
                <div className="col-span-4 flex flex-col gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Box size={14} className="text-emerald-400" />
                            模型参数
                        </h3>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">因变量 (Y)</label>
                                <select className="w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-emerald-500/50">
                                    <option>RSEI 生态指数</option>
                                    <option>水面面积</option>
                                    <option>归一化植被指数 (NDVI)</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">自变量 (X)</label>
                                <div className="space-y-2">
                                    {['降水量', 'LST 地表温度', '土地利用强度', '高程 (DEM)'].map(v => (
                                        <div key={v} className="flex items-center gap-3 p-2 bg-white/[0.03] border border-white/5 rounded-lg">
                                            <input type="checkbox" defaultChecked className="accent-emerald-500" />
                                            <span className="text-[11px] text-slate-300 font-medium">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">核函数形状</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['高斯 (Gaussian)', '双平方 (Bisquare)'].map(k => (
                                        <button key={k} className={cn(
                                            "py-2 rounded-lg text-[10px] font-bold uppercase border transition-all",
                                            k.includes('Gaussian') ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-transparent border-white/10 text-slate-500'
                                        )}>{k}</button>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full py-3 bg-emerald-500 text-black rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group">
                                <Play size={14} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                                执行回归计算
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#1A1F2E] border border-emerald-500/30 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Code size={16} className="text-emerald-400" />
                            <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">GWR 汇总统计</h3>
                        </div>
                        <div className="space-y-3">
                            {[
                                { label: 'R-Squared', val: '0.892' },
                                { label: 'Adj. R-Squared', val: '0.874' },
                                { label: 'AICc', val: '14,245.2' },
                                { label: 'Sigma', val: '0.124' },
                            ].map(s => (
                                <div key={s.label} className="flex justify-between items-center text-[11px] font-mono">
                                    <span className="text-slate-500">{s.label}</span>
                                    <span className="text-white font-bold">{s.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Analysis Viz */}
                <div className="col-span-8 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">系数分布可视化</h3>
                            <p className="text-[10px] text-slate-500 uppercase font-mono mt-1">降水量影响的空间非平稳性</p>
                        </div>
                        <div className="bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            网格: 1km 栅格
                        </div>
                    </div>

                    <div className="flex-1 border-2 border-white/5 bg-[#0B0F1A] rounded-xl relative overflow-hidden group">
                        {/* Simulated Spatial Viz */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                        <div className="absolute inset-0 flex items-center justify-center italic">
                            <div className="text-center group-hover:scale-110 transition-transform duration-700">
                                <Shapes size={64} className="text-emerald-500/20 mx-auto mb-4" />
                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.4em]">空间输出矩阵渲染中...</p>
                            </div>
                        </div>
                        
                        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                             <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping mx-auto" />
                             <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">GPU 加速中</span>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-4 gap-6">
                        {[
                            { label: 'Moran\'s I', val: '0.42', desc: '空间正相关' },
                            { label: 'Z-Score', val: '12.4', desc: '显著聚集' },
                            { label: 'P-Value', val: '0.001', desc: '99% 置信度' },
                            { label: '带宽 (Bandwidth)', val: '12.4km', desc: '最佳固定距离' },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                <span className="text-sm font-mono text-white">{stat.val}</span>
                                <span className="text-[9px] text-slate-600 italic whitespace-nowrap">{stat.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Influence Gauges */}
                <div className="col-span-12 grid grid-cols-5 gap-6 mt-6">
                    {[
                        { label: "降水量", value: 0.72, color: "#06b6d4" },
                        { label: "地表温度", value: 0.58, color: "#f97316" },
                        { label: "NDVI 指数", value: 0.89, color: "#10b981" },
                        { label: "高程 DEM", value: 0.44, color: "#f59e0b" },
                        { label: "土地利用", value: 0.61, color: "#3b82f6" },
                    ].map(({ label, value, color }) => (
                        <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4">
                            <RadialGauge value={value} label={label} color={color} size={84} />
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest text-center">空间影响权重</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
