import React from 'react';
import { cn } from '@/src/lib/utils';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface MetricProps {
  label: string;
  value: string;
  unit: string;
  trend?: number;
  description?: string;
  color?: 'blue' | 'green' | 'amber' | 'cyan';
}

export const RealtimeMetricCard = ({ label, value, unit, trend, description, color = 'blue' }: MetricProps) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-1 items-center justify-center transition-all hover:bg-white/10">
      <span className="text-2xl font-light text-white tracking-tight">{value}</span>
      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{label} ({unit})</span>
      {trend !== undefined && (
        <span className={cn(
          "text-[10px] font-bold mt-1",
          trend > 0 ? "text-emerald-400" : "text-orange-400"
        )}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
  );
};

export const AnalysisPanel = () => {
    return (
        <aside className="w-80 bg-[#0B0F1A] border-l border-white/10 p-4 overflow-y-auto flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">RSEI Index Trend</h3>
                        <span className="text-emerald-400 text-xs font-bold">+4.2%</span>
                    </div>
                    <div className="h-24 flex items-end gap-1 px-1">
                        {[40, 55, 45, 70, 60, 85, 75, 40].map((h, i) => (
                            <div 
                                key={i}
                                className="bg-emerald-500/40 w-full rounded-t transition-all hover:bg-emerald-500 hover:scale-x-110" 
                                style={{ height: `${h}%` }} 
                            />
                        ))}
                    </div>
                    <div className="text-[9px] text-slate-500 text-center uppercase tracking-widest">Seasonal Vegetation Index Variance</div>
                </div>

                <RealtimeMetricCard 
                    label="Water Level"
                    value="12.4"
                    unit="m"
                />
                <RealtimeMetricCard 
                    label="Flood Risk"
                    value="15%"
                    unit="lvl"
                    trend={-2.4}
                />

                <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Spatial Distribution</h3>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between text-[10px] uppercase font-bold tracking-tight">
                                <span className="text-slate-400">Mudflats</span>
                                <span className="text-emerald-400">35%</span>
                            </div>
                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[35%]" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between text-[10px] uppercase font-bold tracking-tight">
                                <span className="text-slate-400">Open Water</span>
                                <span className="text-blue-400">52%</span>
                            </div>
                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <div className="bg-blue-400 h-full w-[52%]" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between text-[10px] uppercase font-bold tracking-tight">
                                <span className="text-slate-400">Vegetation</span>
                                <span className="text-emerald-600">13%</span>
                            </div>
                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <div className="bg-emerald-600 h-full w-[13%]" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 bg-[#1A1F2E] border border-emerald-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Spatial Regression</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 text-[10px] font-mono">
                        <div className="text-slate-500">R-Squared</div>
                        <div className="text-right text-white">0.892</div>
                        <div className="text-slate-500">AIC Value</div>
                        <div className="text-right text-white">12.42k</div>
                    </div>
                    <button className="w-full mt-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-2.5 rounded-lg text-[10px] font-bold hover:bg-emerald-500 hover:text-black transition-all uppercase tracking-widest">
                        Run Model
                    </button>
                </div>
            </div>
        </aside>
    );
};
