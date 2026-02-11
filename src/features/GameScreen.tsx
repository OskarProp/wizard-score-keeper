import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Leaderboard } from './Leaderboard';
import { ActiveRound } from './ActiveRound';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';

export const GameScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleEndGame = () => {
        dispatch({ type: 'END_GAME_EARLY' });
        setShowConfirm(false);
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Premium Header */}
            <header className="relative z-50 h-20 px-6 flex items-center justify-between glass border-b-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsLeaderboardOpen(!isLeaderboardOpen)}
                        className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors lg:hidden"
                    >
                        {isLeaderboardOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <div className="flex flex-col">
                        <span className="text-primary font-serif font-bold text-lg leading-tight tracking-tight">
                            Wizard <span className="opacity-50">Arcane</span>
                        </span>
                    </div>
                </div>

                {/* Round Overview - Prominent Center Display */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-4 bg-black/20 backdrop-blur-md rounded-full px-6 py-2 border border-white/5 shadow-xl">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Round</span>
                        <span className="text-xl font-serif font-bold text-white">{state.currentRound} <span className="text-white/30 text-sm">/ {state.totalRounds}</span></span>
                    </div>
                    <div className="h-8 w-px bg-white/10" />
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Phase</span>
                        <span className="text-sm font-bold text-primary">{state.phase === 'BIDDING' ? 'Prophecy' : 'Outcome'}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <AnimatePresence>
                        {state.phase !== 'GAME_OVER' && (
                            <div className="flex items-center gap-2">
                                {showConfirm ? (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex items-center gap-2 bg-error/10 border border-error/20 p-1 rounded-xl"
                                    >
                                        <button
                                            onClick={handleEndGame}
                                            className="px-3 py-1.5 rounded-lg bg-error text-white text-[10px] font-bold uppercase tracking-wider hover:bg-error/80 transition-colors"
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            onClick={() => setShowConfirm(false)}
                                            className="px-3 py-1.5 rounded-lg bg-white/5 text-text-muted text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setShowConfirm(true)}
                                        className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-error/20 hover:text-error transition-all"
                                    >
                                        <span className="hidden md:inline text-xs font-bold uppercase tracking-wider">End Game</span>
                                        <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                    </motion.button>
                                )}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Desktop Leaderboard Sidebar */}
                <aside className="hidden lg:block w-[400px] border-r border-white/5 bg-black/20 overflow-y-auto">
                    <Leaderboard />
                </aside>

                {/* Mobile Leaderboard Drawer */}
                <AnimatePresence>
                    {isLeaderboardOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsLeaderboardOpen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                            />
                            <motion.aside
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-20 bottom-0 left-0 w-[85%] max-w-[360px] glass z-[70] lg:hidden overflow-y-auto rounded-r-3xl"
                            >
                                <Leaderboard />
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto pb-12">
                    <div className="max-w-3xl mx-auto p-6 lg:p-12">
                        <ActiveRound />
                    </div>
                </main>
            </div>
        </div>
    );
};
