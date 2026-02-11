import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BidInput } from '../components/BidInput';
import { Trophy, ArrowRight, AlertCircle, Zap, Ban } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const TRUMP_ICONS: Record<string, React.ReactNode> = {
    'SPADES': <span className="text-spades">♠</span>,
    'HEARTS': <span className="text-hearts">♥</span>,
    'DIAMONDS': <span className="text-diamonds">♦</span>,
    'CLUBS': <span className="text-clubs">♣</span>,
    'NO_TRUMP': <Ban size={18} />,
    'WIZARD': <Zap size={18} className="text-wizard" />,
};

export const ResultsForm: React.FC = () => {
    const { state, dispatch } = useGame();
    const [tricks, setTricks] = useState<Record<string, number>>(() => {
        const initialTricks: Record<string, number> = {};
        state.players.forEach(p => initialTricks[p.id] = 0);
        return initialTricks;
    });

    const numPlayers = state.players.length;
    const currentRoundData = state.rounds[state.currentRound];
    const bids = currentRoundData?.bids || {};
    const trumpSuit = currentRoundData?.trumpSuit || 'NONE';

    const currentTricksSum = Object.values(tricks).reduce((a, b) => a + b, 0);
    const allHaveEntered = Object.keys(tricks).length === numPlayers;
    const isValid = currentTricksSum === state.currentRound;

    const handleTrickChange = (playerId: string, val: number) => {
        setTricks(prev => ({ ...prev, [playerId]: val }));
    };

    const [showSummary, setShowSummary] = useState(false);
    const [roundScores, setRoundScores] = useState<Record<string, number>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (allHaveEntered && isValid) {
            const calculatedScores: Record<string, number> = {};
            state.players.forEach(p => {
                const bid = bids[p.id];
                const took = tricks[p.id];
                const diff = Math.abs(took - bid);
                if (took === bid) {
                    calculatedScores[p.id] = 20 + (took * 10);
                } else {
                    calculatedScores[p.id] = -(diff * 10);
                }
            });
            setRoundScores(calculatedScores);
            setShowSummary(true);
        }
    };

    const confirmNextRound = () => {
        dispatch({ type: 'SUBMIT_RESULTS', payload: { tricks } });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Trump Display Banner */}
            <div className="glass rounded-2xl p-4 flex items-center justify-between border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-xl font-bold">
                        {TRUMP_ICONS[trumpSuit] || '—'}
                    </div>
                    <div>
                        <div className="text-[9px] uppercase tracking-widest text-primary/70 font-bold">Dominant Trump</div>
                        <div className="text-sm font-serif font-bold tracking-tight">{trumpSuit.replace('_', ' ')}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[9px] uppercase tracking-widest text-text-muted font-bold">Round Total</div>
                    <div className="text-sm font-bold">{state.currentRound} Tricks</div>
                </div>
            </div>

            <section className="glass rounded-[2.5rem] p-6 md:p-12 w-full max-w-4xl mx-auto">
                <div className="flex items-center gap-2 text-primary/70 mb-8">
                    <Trophy size={16} />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Manifest Outcomes</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-3">
                        {state.players.map((player) => {
                            const bid = bids[player.id];
                            const took = tricks[player.id];
                            const isSet = true; // Always set now due to default 0
                            const success = isSet && took === bid;



                            return (
                                <div
                                    key={player.id}
                                    className="flex items-center justify-between p-5 rounded-2xl transition-all border bg-white/2 border-white/5"
                                >
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-serif font-bold tracking-tight">{player.name}</span>
                                            <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold">Bid: {bid}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {isSet && (
                                                <span className={cn(
                                                    "text-[10px] font-bold uppercase tracking-widest",
                                                    (state.phase === 'RESULTS' && !showSummary) ? "text-text-muted" : (success ? "text-success" : "text-error")
                                                )}>
                                                    {/* Hide details until summary */}
                                                    {state.phase === 'RESULTS' ? 'Ready' : (success ? "Ascended" : "Stumbled")}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {/* Hiding live points */}
                                        <div className="text-right opacity-0">
                                            <div className="text-xs font-bold">0</div>
                                            <div className="text-[9px] text-text-muted uppercase tracking-tighter">Points</div>
                                        </div>
                                        <BidInput
                                            value={isSet ? took : 0}
                                            onChange={(val) => handleTrickChange(player.id, val)}
                                            min={0}
                                            max={state.currentRound}
                                            className="w-20"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={!allHaveEntered || !isValid}
                            className={cn(
                                "w-full py-5 rounded-2xl font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-3",
                                allHaveEntered && isValid
                                    ? "bg-primary text-charcoal-900 shadow-[0_4px_20px_rgba(242,191,78,0.3)] hover:brightness-110 active:scale-[0.98]"
                                    : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                            )}
                        >
                            Next Cycle
                            <ArrowRight size={18} />
                        </button>


                    </div>

                    <div className="relative h-6 mt-4">
                    </div>

                    <div className="relative h-6 mt-4">
                        <AnimatePresence>
                            {!isValid && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="absolute top-0 left-0 right-0 flex items-center justify-center gap-2 text-error text-center"
                                >
                                    <AlertCircle size={16} strokeWidth={2.5} />
                                    <p className="text-xs font-black uppercase tracking-widest drop-shadow-md">
                                        Total tricks must equal the round number
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </form>
            </section>

            {/* Round Summary Modal */}
            <AnimatePresence>
                {showSummary && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-[#1c1c1e] border border-white/10 rounded-[2rem] p-8 max-w-lg w-full shadow-2xl overflow-hidden relative"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                            <h2 className="text-2xl font-serif font-bold text-center mb-2">Cycle Complete</h2>
                            <p className="text-center text-text-muted text-xs uppercase tracking-widest mb-8">Fate has been sealed</p>

                            <div className="space-y-3 mb-8">
                                {state.players.map(p => {
                                    const score = roundScores[p.id];
                                    return (
                                        <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                            <span className="font-bold">{p.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-text-muted uppercase tracking-wider">{tricks[p.id]} Tricks</span>
                                                <span className={cn("text-lg font-bold", score >= 0 ? "text-success" : "text-error")}>
                                                    {score > 0 ? '+' : ''}{score}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={confirmNextRound}
                                className="w-full py-4 rounded-xl bg-primary text-charcoal-900 font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                            >
                                Continue Journey
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
