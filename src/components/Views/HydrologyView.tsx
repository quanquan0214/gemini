import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Droplet, ArrowUpRight, Navigation, Download, Wind, Droplets } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Sparkline, BarChart, AreaChart } from '../UI/Charts';

const WATER_LEVEL_DATA = Array.from({ length: 48 }, (_, i) => ({ v: 12 + Math.sin(i / 10) * 3 + Math.random() }));
const PRECIP_DATA = Array.from({ length: 12 }, () => ({ v: 50 + Math.random() * 100 }));

export const HydrologyView = () => {
    return (
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#0d121f]">
            <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-sans">水文系统状态</h2>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">实时水体动力学与流域遥测站高频数据</p>
                </div>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2 font-sans">
                    <Download size={14} />
                    导出水文日报
                </button>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Stats Grid */}
                <div className="col-span-12 grid grid-cols-4 gap-6">
                    {[
                        { label: "平均水位 (吴淞)", value: "12.4", unit: "m", icon: Droplets, color: "text-blue-400", change: "+1.2环比" },
                        { label: "水体透明度 SD", value: "0.85", unit: "m", icon: Waves, color: "text-emerald-400", change: "-5%环比" },
                        { label: "湖心流速", value: "0.45", unit: "m/s", icon: Navigation, color: "text-orange-400", change: "稳定" },
                        { label: "溶解氧 (DO)", value: "8.2", unit: "mg/L", icon: Wind, color: "text-teal-400", change: "优化" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 bento-card">
                            <div className="flex justify-between items-center mb-1">
                                <stat.icon size={18} className={stat.color} />
                                <span className={cn("text-[9px] font-bold uppercase tracking-widest", stat.color)}>{stat.change}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">{stat.label}</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-light text-white tracking-tight">{stat.value}</span>
                                    <span className="text-xs text-slate-500 font-sans">{stat.unit}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Hydro Graph */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-8 bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden h-[450px] flex flex-col"
                >
                    <div className="flex justify-between items-start mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                <Waves size={20} className="text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight font-sans">星库水位站 - 实测时序趋势</h3>
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1 italic">T-48H 连续监测精度 ±0.01m</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-right">
                                <span className="text-[10px] text-slate-500 uppercase font-bold">入流量</span>
                                <p className="text-sm font-mono text-emerald-400">2,450 m³/s</p>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] text-slate-500 uppercase font-bold">出流量</span>
                                <p className="text-sm font-mono text-orange-400">1,820 m³/s</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 relative border-l border-b border-white/5">
                        <div className="absolute inset-0">
                             <AreaChart data={WATER_LEVEL_DATA} color="#3b82f6" height={260} />
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                        <span>24H 前</span>
                        <span>12H 前</span>
                        <span>当前时刻</span>
                    </div>
                </motion.div>

                {/* Hydro Stats Sidebar */}
                <div className="col-span-4 flex flex-col gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">入断面数据解析</h3>
                            <div className="space-y-6 font-sans">
                                {[
                                    { name: '赣江', val: '450 m³/s', perc: 45, color: 'bg-blue-500' },
                                    { name: '修河', val: '120 m³/s', perc: 12, color: 'bg-emerald-500' },
                                    { name: '饶河', val: '85 m³/s', perc: 8, color: 'bg-orange-500' },
                                    { name: '信江', val: '180 m³/s', perc: 18, color: 'bg-cyan-500' },
                                ].map(river => (
                                    <div key={river.name} className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-[11px]">
                                            <span className="font-bold text-slate-300">{river.name}</span>
                                            <span className="font-mono text-slate-400">{river.val}</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${river.perc * 2}%` }} className={cn("h-full", river.color)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                            <p className="text-[10px] text-blue-400/80 leading-relaxed font-sans italic">
                                正在采用 GEE 云端计算引擎分析流域地表水动态演变，当前计算任务队列正常。
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stations Table */}
                <div className="col-span-12 bg-white/5 border border-white/10 rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                             <h3 className="text-sm font-bold text-white uppercase tracking-widest font-sans">骨干遥测站实时报送</h3>
                        </div>
                        <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">展开全部站点</button>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                <th className="pb-6">站点编号</th>
                                <th className="pb-6">空间位置</th>
                                <th className="pb-6">实测水位 (m)</th>
                                <th className="pb-6">24H 变化</th>
                                <th className="pb-6 font-sans">数据状态</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-mono">
                            {[
                                { id: 'ST-XINGZI', loc: '星子', lvl: '12.45', delta: '+0.12', status: '在线' },
                                { id: 'ST-HUKOU', loc: '湖口', lvl: '11.82', delta: '-0.05', status: '在线' },
                                { id: 'ST-DUCHANG', loc: '都昌', lvl: '13.10', delta: '+0.24', status: '在线' },
                                { id: 'ST-KANGSHAN', loc: '康山', lvl: '10.95', delta: '+0.08', status: '在线' },
                            ].map((s) => (
                                <tr key={s.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                    <td className="py-5 text-slate-500">{s.id}</td>
                                    <td className="py-5 text-white font-sans font-medium">{s.loc}</td>
                                    <td className="py-5 text-emerald-400 font-bold">{s.lvl}</td>
                                    <td className={cn("py-5 font-bold", s.delta.startsWith('+') ? 'text-emerald-400' : 'text-orange-400')}>{s.delta}</td>
                                    <td className="py-5">
                                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20">
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
    );
};
