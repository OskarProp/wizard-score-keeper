
import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Trophy, RefreshCcw } from 'lucide-react';

export const GameOverScreen: React.FC = () => {
    const { state, dispatch } = useGame();

    // Calculate total scores
    const scores: Record<string, number> = {};
    state.players.forEach(p => scores[p.id] = 0);

    Object.values(state.rounds).forEach(round => {
        Object.entries(round.scores).forEach(([pid, score]) => {
            scores[pid] = (scores[pid] || 0) + score;
        });
    });

    const sorted = [...state.players].sort((a, b) => scores[b.id] - scores[a.id]);
    const winner = sorted[0];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 py-20 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-4xl glass rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -z-10" />


                <div className="flex flex-col items-center mb-12">
                    <motion.div
                        initial={{ rotate: -15, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(242,191,78,0.4)]"
                    >
                        <Trophy className="text-charcoal-900 w-12 h-12" />
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight mb-4">
                        Destiny <span className="text-primary">Fulfilled</span>
                    </h1>
                    <p className="text-text-muted text-lg uppercase tracking-widest font-bold">The Chronicles are Closed</p>
                </div>

                <div className="bg-white/5 rounded-[2rem] p-8 border border-white/10 mb-12 relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-charcoal-900 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        Grand Archmage
                    </div>
                    <div className="text-4xl md:text-5xl font-serif font-black mb-2 text-primary">{winner.name}</div>
                    <div className="text-xl font-bold opacity-60">{scores[winner.id]} Points Total</div>
                </div>

                <div className="grid gap-3 mb-12">
                    {sorted.slice(1).map((player, i) => (
                        <div key={player.id} className="flex items-center justify-between p-5 rounded-2xl bg-white/2 border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-text-muted">
                                    {i + 2}
                                </div>
                                <span className="font-serif font-bold text-lg">{player.name}</span>
                            </div>
                            <span className="font-bold text-lg opacity-60">{scores[player.id]} pts</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={() => dispatch({ type: 'RESET_GAME' })}
                        className="w-full py-6 rounded-2xl bg-primary text-charcoal-900 font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                    >
                        <RefreshCcw size={20} />
                        Begin New Era
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
