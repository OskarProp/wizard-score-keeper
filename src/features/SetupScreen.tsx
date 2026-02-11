import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Wand2, Users } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const SetupScreen: React.FC = () => {
    const { dispatch } = useGame();
    const [players, setPlayers] = useState(['', '', '']);

    const addPlayer = () => {
        if (players.length < 6) setPlayers([...players, '']);
    };

    const removePlayer = () => {
        if (players.length > 3) setPlayers(players.slice(0, -1));
    };

    const handleNameChange = (index: number, name: string) => {
        const newPlayers = [...players];
        newPlayers[index] = name;
        setPlayers(newPlayers);
    };

    const handleStart = () => {
        if (players.every(p => p.trim() !== '')) {
            dispatch({ type: 'START_GAME', payload: { players } });
        }
    };

    const isReady = players.every(p => p.trim() !== '');

    return (
        <div className="flex flex-col items-center justify-start md:justify-center min-h-screen px-6 py-12 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-3xl glass rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative"
            >
                {/* Decorative glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full" />

                <div className="flex flex-col items-center mb-10 text-center h-[180px] justify-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-primary/30">
                        <Wand2 className="text-primary w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-3">
                        Wizard <span className="text-primary">Arcane</span>
                    </h1>
                    <p className="text-text-muted text-lg max-w-sm">
                        Enter the names of the seekers who dare to challenge fate.
                    </p>
                    <div className="mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-primary/70">
                        Estimated Journey: {players.filter(p => p.trim() !== '').length >= 3 ? Math.floor(60 / players.length) : 0} Phases
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between px-2 mb-2 h-10">
                        <div className="flex items-center gap-2 text-primary">
                            <Users size={18} />
                            <span className="font-semibold uppercase tracking-widest text-xs">Attendees</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={removePlayer}
                                disabled={players.length <= 3}
                                className="p-2 rounded-full hover:bg-white/5 disabled:opacity-30 transition-colors"
                                aria-label="Remove Player"
                            >
                                <Minus size={20} />
                            </button>
                            <span className="w-8 text-center font-serif text-lg">{players.length}</span>
                            <button
                                onClick={addPlayer}
                                disabled={players.length >= 6}
                                className="p-2 rounded-full hover:bg-white/5 disabled:opacity-30 transition-colors"
                                aria-label="Add Player"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="popLayout" initial={false}>
                        {players.map((name, i) => (
                            <motion.div
                                key={i}
                                layout
                                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                exit={{ opacity: 0, height: 0, scale: 0.9 }}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                drag="x"
                                dragConstraints={{ left: -100, right: 0 }}
                                dragElastic={0.1}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x < -60 && players.length > 3) {
                                        // We need to manage state update carefully to avoid index issues during mapping
                                        // Ideally standard remove, but here we just call setPlayers logic
                                        if (players.length > 3) {
                                            const newP = [...players];
                                            newP.splice(i, 1);
                                            setPlayers(newP);
                                        }
                                    }
                                }}
                                className="relative group touch-pan-y"
                            >
                                <div className="absolute inset-y-0 right-0 w-24 bg-error/20 rounded-2xl flex items-center justify-end pr-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Minus className="text-error" />
                                </div>
                                <input
                                    type="text"
                                    placeholder={`Seeker ${i + 1}`}
                                    value={name}
                                    onChange={(e) => handleNameChange(i, e.target.value)}
                                    className={cn(
                                        "w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none transition-all relative z-10",
                                        "focus:bg-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10",
                                        "placeholder:text-white/20 font-medium"
                                    )}
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none z-20">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                </div>
                            </motion.div>
                        ))}

                    </AnimatePresence>
                </div>

                <motion.button
                    layout
                    onClick={handleStart}
                    disabled={!isReady}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                        "w-full py-5 rounded-2xl font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-3 relative z-10",
                        isReady
                            ? "bg-primary text-charcoal-900 shadow-[0_4px_20px_rgba(242,191,78,0.3)]"
                            : "bg-white/5 text-white/30 border border-white/5"
                    )}
                >
                    Start Journey
                </motion.button>
            </motion.div>
        </div>
    );
};
