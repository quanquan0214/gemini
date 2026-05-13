import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Droplet, ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Sparkline, BarChart } from '../UI/Charts';

const WATER_LEVEL_DATA = Array.from({ length: 48 }, (_, i) => ({ v: 12 + Math.sin(i / 5) * 2 + Math.random() }));
const PRECIP_DATA = Array.from({ length: 12 }, () => ({ v: 50 + Math.random() * 100 }));

export const HydrologyView = () => {
    return (
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#0d121f]">
            <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase">水文状态监测</h2>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">实时水体动力学与流域遥测数据</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Main Hydro Graph */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-8 bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden"
                >
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">流域平均值</span>
                            <h3 className="text-xl font-bold text-white mt-1">储水量容积趋势</h3>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-right">
                                <span className="text-[10px] text-slate-500 uppercase font-bold">入流量</span>
                                <p className="text-sm font-mono text-emerald-400">2.4k m³/s</p>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] text-slate-500 uppercase font-bold">出流量</span>
                                <p className="text-sm font-mono text-orange-400">1.8k m³/s</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-64 flex flex-col justify-end">
                        <Sparkline data={WATER_LEVEL_DATA} color="#3b82f6" height={240} filled />
                    </div>
                    <div className="flex justify-between mt-4 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                        <span>2024年1月</span>
                        <span>2024年4月</span>
                        <span>2024年7月</span>
                        <span>2024年10月</span>
                    </div>
                </motion.div>

                {/* Hydro Stats */}
                <div className="col-span-4 flex flex-col gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center gap-2">
                        <Waves size={24} className="text-blue-500 mb-2" />
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">平均地表水面积</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-light text-white">2,845</span>
                            <span className="text-xs text-slate-500">km²</span>
                        </div>
                        <div className="h-10 mt-2">
                             <Sparkline data={WATER_LEVEL_DATA.slice(-20)} color="#3b82f6" height={40} />
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase">
                            <ArrowUpRight size={12} />
                            较上月增长 4.5%
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center gap-2">
                        <Droplet size={24} className="text-cyan-500 mb-2" />
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">降水指数 (PI)</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-light text-white">142.8</span>
                            <span className="text-xs text-slate-500">mm</span>
                        </div>
                        <div className="h-10 mt-2">
                            <BarChart data={PRECIP_DATA} color="#06b6d4" />
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-orange-400 uppercase">
                            较长期均值低 12%
                        </div>
                    </div>
                </div>

                {/* Stations Table */}
                <div className="col-span-12 bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">水文遥测站状态</h3>
                        <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:underline">地图视图</button>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                <th className="pb-4">站点编号</th>
                                <th className="pb-4">位置</th>
                                <th className="pb-4">水位 (m)</th>
                                <th className="pb-4">24h 变化</th>
                                <th className="pb-4">状态</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-mono">
                            {[
                                { id: 'ST-001', loc: '星子', lvl: '12.45', delta: '+0.12', status: '在线' },
                                { id: 'ST-002', loc: '湖口', lvl: '11.82', delta: '-0.05', status: '在线' },
                                { id: 'ST-003', loc: '都昌', lvl: '13.10', delta: '+0.24', status: '在线' },
                                { id: 'ST-004', loc: '康山', lvl: '10.95', delta: '+0.08', status: '在线' },
                            ].map((s) => (
                                <tr key={s.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                    <td className="py-4 text-slate-400">{s.id}</td>
                                    <td className="py-4 text-white font-sans">{s.loc}</td>
                                    <td className="py-4 text-emerald-400">{s.lvl}</td>
                                    <td className={cn("py-4", s.delta.startsWith('+') ? 'text-emerald-400' : 'text-orange-400')}>{s.delta}</td>
                                    <td className="py-4">
                                        <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20">
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
