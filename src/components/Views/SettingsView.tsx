import React from 'react';
import { Settings as SettingsIcon, Database, Shield, Globe, Cpu, RefreshCw, LogOut, Key, Info, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const SettingsView = () => {
    // 模拟检测环境变量 (在真实后端逻辑中通过 /api/health 获取)
    const isGEEActive = false; 

    return (
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#0d121f]">
            <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-sans">系统配置</h2>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">引擎参数与 Google Earth Engine (GEE) 管理</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 space-y-8">
                    {/* GEE Configuration */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                        <div className="flex justify-between items-start relative z-10 mb-8">
                            <div className="flex items-center gap-3">
                                <Database size={20} className="text-blue-400" />
                                <h3 className="text-lg font-bold text-white uppercase tracking-tight font-sans">Earth Engine 集成服务</h3>
                            </div>
                            <div className={cn(
                                "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5",
                                isGEEActive ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                            )}
                            >
                                {isGEEActive ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                                {isGEEActive ? "API 已激活" : "凭据缺失"}
                            </div>
                        </div>

                        <div className="space-y-6 font-sans">
                            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                                系统集成了 Google Earth Engine 云端计算能力。激活后可实现动态变化监测、植被指数合成（NDVI）及水位退耕分析任务。
                            </p>

                            <div className="p-5 bg-[#0B0F1A] border border-white/5 rounded-xl flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <Key size={18} className="text-slate-500" />
                                    <div>
                                        <p className="text-[11px] font-bold text-slate-300 uppercase">Service Account Email</p>
                                        <p className="text-[10px] font-mono text-slate-600 mt-1">未检测到环境变量 (.env)</p>
                                    </div>
                                </div>
                                <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300">更新凭据</button>
                            </div>

                            <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-4 items-start">
                                <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">如何连接我的账号？</h4>
                                    <ol className="text-[11px] text-slate-400 space-y-2 list-decimal list-inside">
                                        <li>前往 Google Cloud Console 并启用 Earth Engine API。</li>
                                        <li>创建 Service Account 并下载 JSON 格式的私钥。</li>
                                        <li>在项目根目录的 <code className="text-blue-300 font-mono">.env</code> 文件中配置 <code className="text-blue-300">GEE_PRIVATE_KEY</code>。</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Backend Engine Settings */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-2 font-sans">
                            <Cpu size={14} className="text-emerald-400" />
                            计算引擎参数
                        </h3>
                        
                        <div className="space-y-8 font-sans">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">并行处理</span>
                                    <span className="text-[10px] text-slate-500">GPU 加速用于大型矢量数据渲染</span>
                                </div>
                                <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-lg" />
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">默认 EPSG 坐标系</span>
                                    <span className="text-[10px] text-slate-500">统一所有栅格切片的投影标准</span>
                                </div>
                                <select className="bg-[#0B0F1A] border border-white/10 rounded px-2 py-1.5 text-[10px] font-mono text-emerald-400 outline-none">
                                    <option>EPSG:4326 (WGS 84)</option>
                                    <option>EPSG:3857 (Web Mercator)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-4 space-y-8 font-sans">
                     <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">服务路由健康</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'GEE Node Proxy', status: '在线' },
                                { name: 'Static File Server', status: '在线' },
                                { name: 'Tile Cache Layer', status: '维护中' },
                                { name: 'Auth Server', status: '在线' },
                            ].map(s => (
                                <div key={s.name} className="flex justify-between items-center">
                                    <span className="text-[11px] font-medium text-slate-300">{s.name}</span>
                                    <span className={cn(
                                        "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                                        s.status === '在线' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10'
                                    )}>{s.status}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2 rounded-xl">
                            <RefreshCw size={12} />
                            执行系统自检
                        </button>
                     </div>

                     <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
                        <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-4">危险与安全</h3>
                        <p className="text-[10px] text-slate-500 mb-6 italic leading-relaxed">全系统重置或 API 密钥失效将导致所有活跃的地图会话断开连接。</p>
                        <button className="w-full py-3 bg-rose-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500 transition-all flex items-center justify-center gap-2">
                            <LogOut size={12} />
                            终止授权访问
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};
