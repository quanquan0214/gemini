import React from 'react';
import { Settings as SettingsIcon, Database, Shield, Globe, Cpu, RefreshCw, LogOut } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const SettingsView = () => {
    return (
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#0d121f]">
            <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase">System Configuration</h2>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Engine parameters & user entitlements</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 space-y-8">
                    {/* General Settings */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                            <Cpu size={14} className="text-emerald-400" />
                            Compute Engine
                        </h3>
                        
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Parallel Processing</span>
                                    <span className="text-[10px] text-slate-500">Accelerate spatial joins using multi-threaded execution</span>
                                </div>
                                <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Cache Retention</span>
                                    <span className="text-[10px] text-slate-500">Control TTL for large raster datasets in system memory</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-emerald-400">12.0 GB</span>
                                    <div className="w-32 bg-white/5 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 h-full w-[60%]" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Default EPSG</span>
                                    <span className="text-[10px] text-slate-500">Standard projection for all new spatial calculations</span>
                                </div>
                                <select className="bg-[#0B0F1A] border border-white/10 rounded px-2 py-1 text-[10px] font-mono text-emerald-400 outline-none">
                                    <option>EPSG:4326 (WGS 84)</option>
                                    <option>EPSG:3857 (Web Mercator)</option>
                                    <option>EPSG:32650 (UTM 50N)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* API Configuration */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                            <Shield size={14} className="text-emerald-400" />
                            API & Security
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Master Service Token</label>
                                <div className="flex gap-2">
                                    <input type="password" value="************************" readOnly className="flex-1 bg-[#0B0F1A] border border-white/10 rounded px-3 py-2 text-xs font-mono text-slate-400 outline-none" />
                                    <button className="px-4 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase hover:bg-white/10 transition-colors">Roll Key</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-4 space-y-8">
                     <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Service Health</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Main DB', status: 'online' },
                                { name: 'Imagery Proxy', status: 'online' },
                                { name: 'Compute Node A-12', status: 'maintenance' },
                                { name: 'Tile Server', status: 'online' },
                            ].map(s => (
                                <div key={s.name} className="flex justify-between items-center">
                                    <span className="text-[11px] font-medium text-slate-300">{s.name}</span>
                                    <span className={cn(
                                        "text-[9px] font-bold uppercase tracking-widest",
                                        s.status === 'online' ? 'text-emerald-400' : 'text-amber-500'
                                    )}>{s.status}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                            <RefreshCw size={12} />
                            Full Diagnostics
                        </button>
                     </div>

                     <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
                        <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-4">Danger Zone</h3>
                        <p className="text-[10px] text-slate-500 mb-6 italic leading-relaxed">System-wide resets or data purges are permanent and session-terminating.</p>
                        <button className="w-full py-3 bg-rose-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500 transition-all flex items-center justify-center gap-2">
                            <LogOut size={12} />
                            Terminate Session
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};
