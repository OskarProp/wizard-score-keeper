import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { CountUp } from '../components/CountUp';
import { Trophy, Medal, Star, ScrollText, History } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const TRUMP_ICONS: Record<string, string> = {
    'SPADES': '♠',
    'HEARTS': '♥',
    'DIAMONDS': '♦',
    'CLUBS': '♣',
    'NO_TRUMP': '∅',
    'WIZARD': 'W',
};

export const Leaderboard: React.FC = () => {
    const { state } = useGame();

    // Calculate total scores per player
    const scores: Record<string, number> = {};
    state.players.forEach(p => scores[p.id] = 0);

    Object.values(state.rounds).forEach(round => {
        Object.entries(round.scores).forEach(([pid, score]) => {
            scores[pid] = (scores[pid] || 0) + score;
        });
    });

    const sortedPlayers = [...state.players].sort((a, b) => scores[b.id] - scores[a.id]);

    const getRankIcon = (index: number) => {
        if (index === 0) return <Trophy className="text-primary" size={16} />;
        if (index === 1) return <Medal className="text-secondary" size={16} />;
        if (index === 2) return <Star className="text-orange-400" size={14} />;
        return <span className="text-[10px] font-bold text-text-muted">{index + 1}</span>;
    };

    return (
        <div className="p-8 space-y-12">
            <div>
                <div className="flex items-center gap-2 text-primary/70 mb-8 border-b border-white/5 pb-4">
                    <History size={16} />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Hall of Honor</span>
                </div>

                <div className="space-y-3">
                    {sortedPlayers.map((player, index) => {
                        const isDealer = player.id === state.rounds[state.currentRound]?.dealerId;
                        const score = scores[player.id];

                        return (
                            <motion.div
                                key={player.id}
                                layout
                                className={cn(
                                    "group relative flex items-center justify-between p-4 rounded-xl transition-all",
                                    index === 0 ? "bg-white/10 ring-1 ring-white/10" : "bg-white/5 hover:bg-white/8"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center border border-white/5">
                                        {getRankIcon(index)}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="font-serif font-bold tracking-tight">{player.name}</span>
                                            {isDealer && (
                                                <span className="w-4 h-4 rounded-md bg-primary text-charcoal-900 text-[8px] font-bold flex items-center justify-center">D</span>
                                            )}
                                        </div>
                                        <span className="text-[9px] text-text-muted uppercase tracking-widest font-bold">
                                            Rank {index + 1}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold tracking-tighter text-primary">
                                        <CountUp value={score} />
                                    </div>
                                    <div className="text-[8px] text-text-muted uppercase font-bold tracking-widest">Points</div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div>
                <div className="flex items-center gap-2 text-primary/70 mb-8 border-b border-white/5 pb-4">
                    <ScrollText size={16} />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Chronicles</span>
                </div>

                <div className="space-y-4">
                    {Object.values(state.rounds).filter(r => Object.keys(r.scores).length > 0).reverse().map((round) => (
                        <div key={round.roundNumber} className="relative pl-6 border-l border-white/10">
                            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary/40 ring-4 ring-background" />
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Round {round.roundNumber}</span>
                                    <span className="px-1.5 py-0.5 rounded-md bg-white/5 text-[9px] font-bold text-primary/70 border border-white/5">
                                        {TRUMP_ICONS[round.trumpSuit] || '∅'}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 pb-4">
                                {Object.entries(round.scores).map(([pid, score]) => {
                                    const p = state.players.find(pl => pl.id === pid);
                                    const bid = round.bids[pid];
                                    const took = round.tricks[pid];
                                    return (
                                        <div key={pid} className="flex flex-col">
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-text-muted truncate mr-2">{p?.name}</span>
                                                <span className={cn("font-bold", score >= 0 ? "text-success" : "text-error")}>
                                                    {score > 0 ? `+${score}` : score}
                                                </span>
                                            </div>
                                            <div className="text-[8px] opacity-40 uppercase tracking-tighter">
                                                Bid {bid} • Won {took}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
