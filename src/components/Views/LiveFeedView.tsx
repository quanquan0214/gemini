import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Activity, AlertTriangle, Database, RefreshCw } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FeedEvent {
    id: number;
    type: 'alert' | 'data' | 'sync' | 'warn' | 'info';
    label: string;
    color: string;
    time: string;
    detail: string;
    ts: number;
}

const eventTypes = [
    { type: 'alert', label: 'NDVI 异常', color: '#f97316' },
    { type: 'data', label: '卫星过境', color: '#3b82f6' },
    { type: 'sync', label: '站点同步', color: '#10b981' },
    { type: 'warn', label: '水位警戒', color: '#f59e0b' },
    { type: 'info', label: '模型更新', color: '#06b6d4' },
] as const;

function generateDetail(type: string) {
    const details = {
        alert: ["14-B 区域 NDVI 指数显著下降 (-0.18)", "7-C 网格检测到异常叶绿素浓度", "29.2°N 附近 NDVI 偏离超过 2σ 阈值"],
        data: ["Sentinel-2A 过境完成 · 已处理 846 个瓦片", "GEE 导出完成: NDVI_2024_Q3.tif", "10米分辨率新影像已就绪"],
        sync: ["ST-003 都昌站: 水位=13.10m Δ+0.24", "ST-001 星子站: 心跳正常, 延迟 842ms", "所有 5 个自动化站点通报正常"],
        warn: ["ST-005 南昌站接近历史洪水阈值", "上游检测到流量激增 +38%", "24小时内水位预报: +0.4m"],
        info: ["GWR 模型已使用 Q3 数据重新训练", "图层缓存已释放: 142 个切片", "空间索引重建完成: 查询耗时 8.2ms"],
    } as Record<string, string[]>;
    const opts = details[type] || ["系统日常自检完成"];
    return opts[Math.floor(Math.random() * opts.length)];
}

export const LiveFeedView = () => {
    const [feed, setFeed] = useState<FeedEvent[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const init = Array.from({ length: 12 }, (_, i) => {
            const et = eventTypes[i % eventTypes.length];
            const mins = (11 - i) * 4 + Math.floor(Math.random() * 4);
            return {
                id: Date.now() - i * 100000,
                ...et,
                time: `${mins} 分钟前`,
                detail: generateDetail(et.type),
                ts: Date.now() - mins * 60000
            };
        });
        setFeed(init.reverse());

        const interval = setInterval(() => {
            const et = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            const newEvent: FeedEvent = {
                id: Date.now(),
                ...et,
                time: "刚刚",
                detail: generateDetail(et.type),
                ts: Date.now()
            };
            setFeed((prev) => [newEvent, ...prev].slice(0, 30));
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-hidden bg-[#0d121f]">
            <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-sans">实时传感器信号流</h2>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">地理空间事件、遥测状态与系统通知</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">实时监控中</span>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: "每小时事件数", value: "142", color: "text-emerald-400", icon: Activity },
                    { label: "活跃传感器数", value: "28", color: "text-blue-400", icon: Radio },
                    { label: "系统预警项", value: "3", color: "text-amber-500", icon: AlertTriangle },
                    { label: "系统可用性", value: "99.8%", color: "text-cyan-400", icon: RefreshCw },
                ].map((m, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">{m.label}</span>
                            <m.icon size={14} className={m.color} />
                        </div>
                        <div className={cn("text-2xl font-mono", m.color)}>{m.value}</div>
                    </div>
                ))}
            </div>

            {/* Feed Area */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col overflow-hidden relative">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">系统遥测日志</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-[#0B0F1A] border border-white/5 rounded text-[9px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">暂停</button>
                        <button className="px-3 py-1 bg-[#0B0F1A] border border-white/5 rounded text-[9px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">清除记录</button>
                    </div>
                </div>

                <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar"
                >
                    <AnimatePresence initial={false}>
                        {feed.map((event, i) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "p-4 rounded-xl border flex gap-4 items-start transition-all",
                                    i === 0 ? "bg-white/[0.03] border-white/10" : "bg-transparent border-white/5"
                                )}
                            >
                                <div 
                                    className="w-2 h-2 rounded-full mt-1.5 shrink-0" 
                                    style={{ backgroundColor: event.color, boxShadow: i === 0 ? `0 0 12px ${event.color}` : 'none' }} 
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: event.color }}>{event.label}</span>
                                        <span className="text-[9px] font-mono text-slate-600">{event.time}</span>
                                        {i === 0 && <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter">最新</span>}
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-mono leading-relaxed truncate">{event.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                
                {/* Decorative fade at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d121f] to-transparent pointer-events-none" />
            </div>
        </div>
    );
};
