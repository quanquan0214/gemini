import React, { useState } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const TIME_STEPS = [
    '2024-01-15', '2024-02-15', '2024-03-15', '2024-04-15', 
    '2024-05-15', '2024-06-15', '2024-07-15', '2024-08-15',
    '2024-09-15', '2024-10-15', '2024-11-15', '2024-12-15'
];

export const TimeSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(6);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => setIsPlaying(!isPlaying);

    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-6">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center gap-6">
                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        <button 
                            onClick={togglePlay}
                            className="w-10 h-10 bg-emerald-500 text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
                        >
                            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                        </button>
                        <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Timeline */}
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <Calendar size={12} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{TIME_STEPS[currentIndex]}</span>
                            </div>
                            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Sentinel-2 L2A / GEE Composite</span>
                        </div>
                        
                        <div className="relative h-1.5 bg-white/5 rounded-full group cursor-pointer">
                            <div className="absolute inset-0 flex justify-between px-1">
                                {TIME_STEPS.map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={cn(
                                            "w-1 h-1 rounded-full mt-0.5 transition-colors",
                                            i <= currentIndex ? "bg-emerald-500/40" : "bg-white/10"
                                        )} 
                                    />
                                ))}
                            </div>
                            <div 
                                className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full transition-all duration-300"
                                style={{ width: `${(currentIndex / (TIME_STEPS.length - 1)) * 100}%` }}
                            />
                            <div 
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-emerald-500 rounded-full shadow-lg transition-all duration-300 pointer-events-none"
                                style={{ left: `${(currentIndex / (TIME_STEPS.length - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
