import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Map as MapIcon, Database, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const LandCoverView = () => {
    return (
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#0d121f]">
            <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Land Utilization Analysis</h2>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Multi-temporal classification & ecological change</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Stats */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 bento-card">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Total Surveyed Area</span>
                    <p className="text-3xl font-light text-white mt-2">1,540.2 <span className="text-xs text-slate-500">km²</span></p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 bento-card">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Vegetation Cover</span>
                    <p className="text-3xl font-light text-emerald-400 mt-2">64.2%</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 bento-card">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Urban Expansion Rate</span>
                    <p className="text-3xl font-light text-orange-400 mt-2">2.4% <span className="text-xs text-slate-500">y/y</span></p>
                </div>

                {/* Transition Matrix */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Database size={16} className="text-blue-400" />
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Transition Matrix (2020-2024)</h3>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
                        {['', 'Water', 'Forest', 'Urban', 'Grass'].map(h => (
                            <div key={h} className="bg-[#0B0F1A] p-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">{h}</div>
                        ))}
                        {['Water', 'Forest', 'Urban', 'Grass'].map(row => (
                            <React.Fragment key={row}>
                                <div className="bg-[#0B0F1A] p-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">{row}</div>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="bg-white/5 p-3 text-[11px] font-mono text-center flex items-center justify-center">
                                        {Math.random() > 0.8 ? (
                                            <span className="text-emerald-400">{(Math.random() * 10).toFixed(1)}%</span>
                                        ) : (
                                            <span className="text-slate-600">{(Math.random() * 5).toFixed(1)}%</span>
                                        )}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.div>

                {/* Top Changes */}
                <div className="col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Critical Class Changes</h3>
                    <div className="space-y-6">
                        {[
                            { from: 'Marshland', to: 'Deep Water', val: '+450 ha', color: 'text-blue-400' },
                            { from: 'Agriculture', to: 'Urban', val: '+120 ha', color: 'text-orange-400' },
                            { from: 'Barren', to: 'Forest', val: '+85 ha', color: 'text-emerald-400' },
                        ].map((c, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                                    <span>{c.from}</span>
                                    <ArrowRight size={12} className="text-slate-600" />
                                    <span>{c.to}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className={cn("h-full w-full opacity-50", c.color.replace('text', 'bg'))} />
                                    </div>
                                    <span className={cn("text-[10px] font-mono font-bold", c.color)}>{c.val}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Imagery Source */}
                <div className="col-span-3 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                            <Leaf size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">NDVI Anomaly Detected</h4>
                            <p className="text-xs text-slate-500 mt-1">Satellite analysis indicates unusually high biomass in Unit Sector 14-B. Potential invasive species growth.</p>
                        </div>
                    </div>
                    <button className="px-6 py-2.5 bg-emerald-500 text-black rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all">
                        Inspect Layer
                    </button>
                </div>
            </div>
        </div>
    );
};
