export type Player = {
    id: string;
    name: string;
};

export type Phase = 'SETUP' | 'BIDDING' | 'RESULTS' | 'GAME_OVER';

export type TrumpSuit = 'SPADES' | 'HEARTS' | 'DIAMONDS' | 'CLUBS' | 'NO_TRUMP' | 'WIZARD' | 'NONE';

export type RoundData = {
    roundNumber: number;
    dealerId: string;
    trumpSuit: TrumpSuit;
    bids: Record<string, number>; // playerId -> bid
    tricks: Record<string, number>; // playerId -> tricks taken
    scores: Record<string, number>; // playerId -> score delta for this round
};

export type GameState = {
    players: Player[];
    phase: Phase;
    currentRound: number;
    totalRounds: number;
    dealerIndex: number;
    // Map round ID (number) to round data
    rounds: Record<number, RoundData>;
};

export type GameAction =
    | { type: 'START_GAME'; payload: { players: string[] } } // names
    | { type: 'SUBMIT_BIDS'; payload: { bids: Record<string, number> } }
    | { type: 'SUBMIT_RESULTS'; payload: { tricks: Record<string, number> } }
    | { type: 'SET_TRUMP'; payload: { trumpSuit: TrumpSuit } }
    | { type: 'END_GAME_EARLY' }
    | { type: 'RESET_GAME' };
