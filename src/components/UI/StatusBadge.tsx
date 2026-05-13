import React from 'react';
import { cn } from '@/src/lib/utils';

interface StatusBadgeProps {
    status: 'operational' | 'alert' | 'maintenance' | 'syncing';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
    const config = {
        operational: { label: 'System Active', color: 'bg-emerald-500', text: 'text-emerald-400' },
        alert: { label: 'Sync Alert', color: 'bg-orange-500', text: 'text-orange-400' },
        maintenance: { label: 'Maintenance', color: 'bg-amber-500', text: 'text-amber-400' },
        syncing: { label: 'Syncing...', color: 'bg-blue-500', text: 'text-blue-400' },
    };

    const { label, color, text } = config[status];

    return (
        <div className="flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/10 rounded">
            <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", color)} />
            <span className={cn("text-[9px] font-bold uppercase tracking-[0.2em]", text)}>{label}</span>
        </div>
    );
};
