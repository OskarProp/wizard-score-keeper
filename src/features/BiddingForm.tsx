import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { type TrumpSuit } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { TrumpSelector } from '../components/TrumpSelector';
import { BidInput } from '../components/BidInput';
import { Info, AlertCircle, Check, Rocket } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const BiddingForm: React.FC = () => {
    const { state, dispatch } = useGame();
    // Initialize bids with 0 for all players
    const [bids, setBids] = useState<Record<string, number>>(() => {
        const initialBids: Record<string, number> = {};
        state.players.forEach(p => initialBids[p.id] = 0);
        return initialBids;
    });

    const numPlayers = state.players.length;
    const currentRoundData = state.rounds[state.currentRound];
    const dealerId = currentRoundData?.dealerId;
    const trumpSuit = currentRoundData?.trumpSuit || 'NONE';

    // Player order starts from current dealer index + 1
    const orderedPlayers = [
        ...state.players.slice(state.dealerIndex + 1),
        ...state.players.slice(0, state.dealerIndex + 1)
    ];

    const currentBidsSum = Object.values(bids).reduce((a, b) => a + b, 0);
    const allHaveBid = Object.keys(bids).length === numPlayers;

    // Check dealer constraint
    const isSumConstraintViolated = allHaveBid && currentBidsSum === state.currentRound;

    const handleBidChange = (playerId: string, val: number) => {
        setBids(prev => ({ ...prev, [playerId]: val }));
        setHasTriedToSubmit(false);
    };

    const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false);

    const handleSetTrump = (suit: string) => {
        dispatch({ type: 'SET_TRUMP', payload: { trumpSuit: suit as TrumpSuit } });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setHasTriedToSubmit(true);
        if (allHaveBid && !isSumConstraintViolated) {
            dispatch({ type: 'SUBMIT_BIDS', payload: { bids } });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
        >
            <section className="glass rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                <TrumpSelector
                    value={trumpSuit}
                    onChange={handleSetTrump}
                />
            </section>

            <section className="glass rounded-[2.5rem] p-6 md:p-12 w-full max-w-4xl mx-auto">
                <div className="flex items-center gap-2 text-primary/70 mb-8">
                    <Check size={16} />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Cast Bids</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4">
                        {orderedPlayers.map((player) => {
                            const isDealer = player.id === dealerId;
                            const bid = bids[player.id];
                            const isBidSet = bid !== undefined;

                            // Local check for dealer forbidden bid
                            let otherBidsSum = 0;
                            Object.entries(bids).forEach(([pid, b]) => {
                                if (pid !== dealerId) otherBidsSum += b;
                            });
                            const forbiddenBid = isDealer ? state.currentRound - otherBidsSum : -1;
                            const isForbidden = isDealer && bid === forbiddenBid;

                            return (
                                <div
                                    key={player.id}
                                    className={cn(
                                        "relative flex items-center justify-between p-6 rounded-2xl transition-all border",
                                        isBidSet ? "bg-white/5 border-white/10" : "bg-white/2 border-white/5 opacity-80"
                                    )}
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-serif font-bold tracking-tight">{player.name}</span>
                                            {isDealer && (
                                                <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold uppercase tracking-wider">Dealer</span>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-text-muted font-medium uppercase tracking-widest">
                                            {isBidSet ? "Pledge Set" : "Setting Pledge..."}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <BidInput
                                            value={bid}
                                            onChange={(val) => handleBidChange(player.id, val)}
                                            min={0}
                                            max={state.currentRound}
                                            isForbidden={isForbidden}
                                        />
                                        <AnimatePresence>
                                            {isForbidden && hasTriedToSubmit && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                    className="flex items-center gap-1 text-error text-[9px] font-bold uppercase tracking-widest whitespace-nowrap"
                                                >
                                                    <AlertCircle size={10} />
                                                    <span>Forbidden Bid: {bid}</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={!allHaveBid}
                            className={cn(
                                "w-full py-5 rounded-2xl font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-3",
                                allHaveBid && !isSumConstraintViolated
                                    ? "bg-primary text-charcoal-900 shadow-[0_0_30px_rgba(242,191,78,0.2)] hover:scale-[1.01] active:scale-[0.99]"
                                    : "bg-white/5 text-white/20 border border-white/5"
                            )}
                        >
                            <Rocket size={18} />
                            Seal Phase
                        </button>



                        <div className="relative h-8 mt-6 mb-2 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {isSumConstraintViolated && hasTriedToSubmit ? (
                                    <motion.div
                                        key="error"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute inset-0 flex items-center justify-center gap-2 text-error text-center"
                                    >
                                        <AlertCircle size={16} strokeWidth={2.5} />
                                        <p className="text-xs font-black uppercase tracking-widest drop-shadow-md">
                                            Total bids cannot equal {state.currentRound}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="info"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex items-center justify-center gap-2 text-primary/60 text-center"
                                    >
                                        <Info size={14} />
                                        <p className="text-[10px] font-bold uppercase tracking-widest">
                                            Pledged: {currentBidsSum} / {state.currentRound} Tricks
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-2 justify-center text-text-muted/40 pb-2">
                            <Info size={14} />
                            <span className="text-[10px] font-medium uppercase tracking-widest">Dealer must ensure total bids ≠ round number</span>
                        </div>
                    </div>
                </form>
            </section>
        </motion.div>
    );
};
