import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, CloudRain, Wind, Eye, AlertTriangle, Download } from 'lucide-react';
import { Sparkline, BarChart } from '../UI/Charts';

const TEMP_DATA = Array.from({ length: 24 }, (_, i) => ({ v: 22 + Math.sin(i / 3) * 5 + Math.random() }));
const WIND_DATA = Array.from({ length: 24 }, () => ({ v: 5 + Math.random() * 15 }));

export const MeteorologyView = () => {
    return (
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#0d121f]">
            <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-sans">气象观测情报</h2>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">大气动力学与季节性预报</p>
                </div>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2 font-sans">
                    <Download size={14} />
                    导出每日气象报表
                </button>
            </div>

            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: "月均温度", value: "24.5", unit: "°C", icon: Thermometer, color: "text-orange-400", data: TEMP_DATA, sparkColor: "#fb923c" },
                    { label: "累计降水量", value: "125", unit: "mm", icon: CloudRain, color: "text-blue-400", isBar: true },
                    { label: "平均风速", value: "4.2", unit: "m/s", icon: Wind, color: "text-teal-400", data: WIND_DATA, sparkColor: "#2dd4bf" },
                    { label: "能见度", value: "12.4", unit: "km", icon: Eye, color: "text-slate-400" },
                ].map((m, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <m.icon size={20} className={m.color} />
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{m.label}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-light text-white tracking-tight">{m.value}</span>
                            <span className="text-xs text-slate-500">{m.unit}</span>
                        </div>
                        {m.data && (
                            <div className="h-10 mt-2">
                                <Sparkline data={m.data} color={m.sparkColor} height={40} />
                            </div>
                        )}
                        {m.isBar && (
                            <div className="h-10 mt-2">
                                <BarChart data={TEMP_DATA.slice(0, 12)} color="#60a5fa" />
                            </div>
                        )}
                    </div>
                ))}

                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="col-span-3 bg-white/5 border border-white/10 rounded-2xl p-8 h-[400px] flex flex-col"
                >
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight font-sans">季节性降水偏差分析</h3>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-2">历史距平值 vs 当前时期 (GEE 全球降水监测网)</p>
                        </div>
                        <div className="flex items-center gap-6 font-sans">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-slate-700" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">五年均值</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">当前实测</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 relative border-l border-b border-white/5 min-h-0">
                         <div className="absolute inset-0 flex items-end">
                            <Sparkline data={TEMP_DATA.map(v => ({ v: v.v * 1.1 + 2 }))} color="#1e293b" height={220} filled={false} />
                         </div>
                         <div className="absolute inset-0 flex items-end">
                            <Sparkline data={TEMP_DATA} color="#10b981" height={220} filled={true} />
                         </div>
                    </div>
                    <div className="flex justify-between mt-4 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                        <span>T-48H</span>
                        <span>T-24H</span>
                        <span>Now</span>
                    </div>
                </motion.div>

                <div className="col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-6">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 font-sans">
                         <AlertTriangle size={14} className="text-orange-400" />
                         实时预警
                    </h3>
                    <div className="space-y-4 font-sans">
                        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">高温预警</span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed">南部区域 LST 地表温度上升明显。火险等级: 3级。</p>
                        </div>

                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">强降水径流</span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed">上游泄洪量激增。建议调整站点采样频率。</p>
                        </div>
                    </div>

                    <button className="w-full mt-auto py-3 bg-emerald-500 text-black rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all font-sans">
                        生成详细预报报告
                    </button>
                </div>
            </div>
        </div>
    );
};
