import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Map as MapIcon, Database, ArrowRight, TrendingUp, PieChart } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { RadialGauge } from '../UI/Charts';

const LAND_CLASSES = [
    { name: '湿地/水域', area: '124,500', percent: 45, color: '#3b82f6' },
    { name: '草丛/灌木', area: '68,200', percent: 25, color: '#10b981' },
    { name: '裸地/滩涂', area: '42,300', percent: 15, color: '#f59e0b' },
    { name: '人工建筑', area: '28,100', percent: 10, color: '#ef4444' },
    { name: '其他', area: '14,000', percent: 5, color: '#64748b' },
];

export const LandCoverView = () => {
    return (
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#0d121f]">
            <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-sans">土地利用分析 (LULC)</h2>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">多时序分类与生态演变监测 (基于 ESA 10m 数据)</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2 font-sans">
                        <TrendingUp size={14} />
                        导出转移矩阵
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Stats */}
                <div className="col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 bento-card flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">总调查面积</span>
                        <p className="text-3xl font-light text-white mt-2">1,540.2 <span className="text-xs text-slate-500">km²</span></p>
                    </div>
                    <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-blue-500 opacity-30" />
                    </div>
                </div>
                <div className="col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 bento-card flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">植被覆盖率 (FVC)</span>
                        <p className="text-3xl font-light text-emerald-400 mt-2">64.2%</p>
                    </div>
                    <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '64.2%' }} className="h-full bg-emerald-500" />
                    </div>
                </div>
                <div className="col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 bento-card flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">城镇扩张率</span>
                        <p className="text-3xl font-light text-orange-400 mt-2">2.4% <span className="text-xs text-slate-500 font-sans italic">同比</span></p>
                    </div>
                    <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '2.4%' }} className="h-full bg-orange-500" />
                    </div>
                </div>
                <div className="col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 bento-card flex flex-col items-center justify-center">
                    <RadialGauge value={0.88} label="分类精度 OA" color="#10b981" size={72} />
                </div>

                {/* Left: Detailed Classes */}
                <div className="col-span-8 bg-white/5 border border-white/10 rounded-2xl p-8">
                    <div className="flex justify-between items-center mb-8">
                         <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 font-sans text-emerald-400">
                             <MapIcon size={16} />
                             地表覆盖类型细分
                         </h3>
                         <span className="text-[10px] text-slate-500 font-mono italic">单位: Hectares (ha)</span>
                    </div>

                    <div className="space-y-6">
                        {LAND_CLASSES.map((lc, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lc.color }} />
                                        <span className="text-xs font-bold text-slate-300 font-sans tracking-wide">{lc.name}</span>
                                    </div>
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-xs font-mono text-slate-500">{lc.area}</span>
                                        <span className="text-sm font-mono text-white font-bold w-12 text-right">{lc.percent}%</span>
                                    </div>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${lc.percent}%` }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: lc.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Transition Matrix Mini */}
                <div className="col-span-4 flex flex-col gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Database size={16} className="text-blue-400" />
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest font-sans">关键地类变化</h3>
                        </div>
                        <div className="space-y-5">
                            {[
                                { from: '湿地', to: '深水区', val: '+450 ha', color: 'text-blue-400' },
                                { from: '农业', to: '城镇', val: '+120 ha', color: 'text-orange-400' },
                                { from: '裸地', to: '森林', val: '+85 ha', color: 'text-emerald-400' },
                            ].map((c, i) => (
                                <div key={i} className="flex flex-col gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span>{c.from}</span>
                                        <ArrowRight size={12} className="text-slate-600" />
                                        <span>{c.to}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                         <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden mr-4">
                                             <div className={cn("h-full w-full opacity-40", c.color.replace('text', 'bg'))} />
                                         </div>
                                         <span className={cn("text-[10px] font-mono font-bold", c.color)}>{c.val}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                        <h4 className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2 font-sans">
                            <PieChart size={14} />
                            GEE 分类引擎
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-sans mb-4 italic">
                            正在接入 Google Earth Engine 二次解译流程。激活 Service Account 以获取最新高分影像。
                        </p>
                        <button className="w-full py-2.5 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-blue-400 transition-all font-sans">
                            启动 GEE 转移任务
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
