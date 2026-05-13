import React from 'react';

const legendData = [
    { label: 'Deep Water', color: '#1d4ed8' },
    { label: 'Shallow Water', color: '#60a5fa' },
    { label: 'Mudflats', color: '#d97706' },
    { label: 'Sparse Veg.', color: '#10b981' },
    { label: 'Dense Veg.', color: '#047857' },
];

export const MapLegend = () => {
    return (
        <div className="absolute bottom-24 left-6 z-10 bg-[#0B0F1A]/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Classification Key</h4>
            <div className="space-y-2">
                {[
                    { label: 'Deep Water', color: '#0ea5e9' },
                    { label: 'Wetlands', color: '#10b981' },
                    { label: 'Vegetation', color: '#047857' },
                    { label: 'Barren Soil', color: '#d97706' },
                ].map(item => (
                    <div key={item.label} className="flex items-center gap-3">
                        <div 
                            className="w-2.5 h-2.5 rounded-sm border border-white/10" 
                            style={{ backgroundColor: item.color }} 
                        />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
