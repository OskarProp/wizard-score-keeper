import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Users } from 'lucide-react';
import { Logo } from '../components/Logo';
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
        <div className="h-[100dvh] flex flex-col items-center justify-center p-4 md:p-6 pb-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-3xl glass rounded-[2.5rem] flex flex-col max-h-full relative overflow-hidden"
            >
                {/* Decorative glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

                {/* Fixed Header Section */}
                <div className="flex flex-col items-center pt-8 px-8 shrink-0 relative z-10 bg-gradient-to-b from-[#1c1c1e] to-transparent">
                    {/* Logo */}
                    <div className="mb-4">
                        <Logo className="w-24 h-24 drop-shadow-[0_0_20px_rgba(242,191,78,0.6)]" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-2">
                        Wiz<span className="text-primary">Score</span>
                    </h1>
                    <p className="text-text-muted text-sm md:text-base max-w-xs text-center mb-4">
                        Enter the names of the seekers.
                    </p>
                    <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-primary/70 mb-4">
                        Estimated Journey: {players.filter(p => p.trim() !== '').length >= 3 ? Math.floor(60 / players.length) : 0} Phases
                    </div>
                </div>

                {/* Scrollable Player List */}
                <div className="flex-1 overflow-y-auto px-6 py-2 min-h-0">
                    <div className="flex items-center justify-between px-2 mb-2 h-10 sticky top-0 bg-[#1c1c1e]/95 backdrop-blur-sm z-20">
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
                        <div className="space-y-4 pb-4">
                            {players.map((name, i) => (
                                <motion.div
                                    key={i}
                                    layout
                                    initial={{ opacity: 0, height: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                    exit={{ opacity: 0, height: 0, scale: 0.9 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                    className="relative group touch-pan-y"
                                >
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
                                    {players.length > 3 && (
                                        <button
                                            onClick={() => {
                                                const newP = [...players];
                                                newP.splice(i, 1);
                                                setPlayers(newP);
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-error transition-colors z-20 md:hidden"
                                        >
                                            <Minus size={16} />
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                </div>

                {/* Fixed Footer Section */}
                <div className="p-6 md:p-8 pt-4 bg-gradient-to-t from-[#1c1c1e] to-transparent shrink-0 relative z-10">
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
                </div>
            </motion.div>
        </div>
    );
};
