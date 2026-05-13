import React, { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { 
  Square, 
  Circle, 
  Hexagon, 
  MapPin, 
  Ruler, 
  Scissors, 
  Shapes,
  Play
} from 'lucide-react';

export const SpatialAnalysisTools = () => {
    const [selectedTool, setSelectedTool] = useState<string | null>(null);

    const tools = [
        { id: 'measure', name: 'Measure', icon: <Ruler size={14} /> },
        { id: 'buffer', name: 'Buffer', icon: <Circle size={14} /> },
        { id: 'clip', name: 'Clip', icon: <Scissors size={14} /> },
        { id: 'zonal', name: 'Stats', icon: <Shapes size={14} /> },
    ];

    return (
        <div className="absolute top-20 right-6 z-10 bg-[#0B0F1A]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4 w-48">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
                <Shapes size={12} className="text-emerald-400" />
                Tools
            </h3>

            <div className="grid grid-cols-2 gap-2">
                {tools.map(tool => (
                    <button
                        key={tool.id}
                        onClick={() => setSelectedTool(tool.id)}
                        className={cn(
                            "flex flex-col items-center justify-center gap-2 px-2 py-3 rounded-lg border transition-all text-[8px] font-bold uppercase tracking-widest",
                            selectedTool === tool.id 
                                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" 
                                : "bg-white/5 border-transparent text-slate-500 hover:bg-white/10 hover:text-slate-300"
                        )}
                    >
                        {tool.icon}
                        {tool.name}
                    </button>
                ))}
            </div>

            {selectedTool && (
                <div className="mt-4 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                    <button className="w-full py-1.5 bg-emerald-500 text-black rounded text-[9px] font-bold uppercase tracking-widest">
                        Execute
                    </button>
                    <button 
                        onClick={() => setSelectedTool(null)}
                        className="w-full mt-2 text-[8px] font-bold text-slate-500 hover:text-white transition-colors"
                    >
                        REFRESH SYSTEM
                    </button>
                </div>
            )}
        </div>
    );
};
