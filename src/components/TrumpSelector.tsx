import React from 'react';
import type { TrumpSuit } from '../types';
import { motion } from 'framer-motion';
import { Crown, Ban, Zap } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type TrumpOption = {
    id: TrumpSuit;
    label: string;
    icon: React.ReactNode;
    color: string;
};

const TRUMP_OPTIONS: TrumpOption[] = [
    { id: 'SPADES', label: 'Spades', icon: '♠', color: 'text-spades' },
    { id: 'HEARTS', label: 'Hearts', icon: '♥', color: 'text-hearts' },
    { id: 'DIAMONDS', label: 'Diamonds', icon: '♦', color: 'text-diamonds' },
    { id: 'CLUBS', label: 'Clubs', icon: '♣', color: 'text-clubs' },
    { id: 'NO_TRUMP', label: 'No Trump', icon: <Ban size={20} />, color: 'text-white' },
    { id: 'WIZARD', label: 'Wizard', icon: <Zap size={20} />, color: 'text-wizard' },
];

interface TrumpSelectorProps {
    value: TrumpSuit;
    onChange: (value: TrumpSuit) => void;
}

export const TrumpSelector: React.FC<TrumpSelectorProps> = ({ value, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary/70 mb-1">
                <Crown size={16} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Declare Trump</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {TRUMP_OPTIONS.map((opt) => {
                    const isActive = value === opt.id;
                    return (
                        <motion.button
                            key={opt.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onChange(opt.id)}
                            className={cn(
                                "relative h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all",
                                "border backdrop-blur-md",
                                isActive
                                    ? "bg-primary/20 border-primary shadow-[0_0_30px_rgba(242,191,78,0.15)] scale-105 z-10"
                                    : "bg-white/5 border-white/5 hover:bg-white/10 opacity-70 hover:opacity-100"
                            )}
                        >
                            <div className={cn("text-2xl font-bold", opt.color)}>
                                {opt.icon}
                            </div>
                            <span className={cn("text-[10px] font-medium tracking-wide transition-opacity", isActive ? "opacity-100" : "opacity-40")}>
                                {opt.label}
                            </span>

                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};
