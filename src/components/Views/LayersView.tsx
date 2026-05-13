import React from 'react';
import { motion } from 'framer-motion';
import { Layers as LayersIcon, Eye, EyeOff, LayoutGrid, List, Sliders, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const LayersView = () => {
    const layerCategories = [
        {
            title: '基础底图',
            layers: [
                { id: 'osm', name: 'OpenStreetMap 标准', active: true, opacity: 100 },
                { id: 'sat', name: 'Sentinel-2 L2A 影像', active: false, opacity: 80 },
                { id: 'ter', name: '地形晕渲图', active: false, opacity: 50 },
            ]
        },
        {
            title: '专题叠加',
            layers: [
                { id: 'lulc', name: '土地覆盖分类', active: true, opacity: 85 },
                { id: 'hydro', name: '水文网络', active: false, opacity: 100 },
                { id: 'precip', name: '降雨热力图', active: false, opacity: 60 },
            ]
        },
        {
            title: '生态指数',
            layers: [
                { id: 'rsei', name: '生态质量 (RSEI)', active: false, opacity: 90 },
                { id: 'ndvi', name: '植被健康 (NDVI)', active: false, opacity: 90 },
                { id: 'lst', name: '地表温度 (LST)', active: false, opacity: 70 },
            ]
        }
    ];

    return (
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#0d121f]">
             <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-sans">图层清单</h2>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">管理地理空间资产与渲染顺序</p>
                </div>
                <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
                    <button className="p-2 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><LayoutGrid size={16} /></button>
                    <button className="p-2 rounded-md text-slate-500 hover:text-white transition-colors"><List size={16} /></button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {layerCategories.map((cat, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        key={cat.title} 
                        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                    >
                        <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cat.title}</h3>
                            <button className="text-[10px] font-bold text-emerald-400 uppercase hover:underline">全选</button>
                        </div>
                        <div className="p-4 space-y-4">
                            {cat.layers.map(layer => (
                                <div key={layer.id} className="p-4 bg-[#0B0F1A] border border-white/5 rounded-xl hover:border-emerald-500/30 transition-all group font-sans">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full",
                                                layer.active ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-700"
                                            )} />
                                            <span className={cn("text-xs font-bold transition-colors uppercase tracking-tight", layer.active ? "text-white" : "text-slate-500")}>{layer.name}</span>
                                        </div>
                                        <button className="text-slate-500 hover:text-white transition-colors">
                                            {layer.active ? <Eye size={12} className="text-emerald-400" /> : <EyeOff size={12} />}
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1 flex flex-col gap-2">
                                            <div className="flex justify-between text-[8px] uppercase font-bold text-slate-600 tracking-wider">
                                                <span>透明度</span>
                                                <span className="font-mono text-emerald-400">{layer.opacity}%</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className="bg-emerald-500 h-full transition-all" style={{ width: `${layer.opacity}%` }} />
                                            </div>
                                        </div>
                                        <button className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                                            <Sliders size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 bg-white/5 border-t border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-emerald-400 hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-sans">
                            加载外部 WMS 服务
                            <ChevronRight size={12} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="bg-[#1A1F2E] border border-emerald-500/30 rounded-2xl p-6 mt-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                            <LayersIcon size={20} className="text-emerald-400" />
                        </div>
                        <div className="font-sans">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">GeoServer 连接: 已激活</h4>
                            <p className="text-xs text-slate-500 mt-1">正在同步 POYANG_WORKSPACE 下的 14 个要素类。延迟: 42ms</p>
                        </div>
                    </div>
                    <div className="flex gap-4 font-sans">
                        <button className="px-6 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-[10px] font-bold uppercase tracking-widest">重索引服务</button>
                        <button className="px-6 py-2.5 bg-emerald-500 text-black rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400">添加数据源</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
