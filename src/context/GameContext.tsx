import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { GameState, GameAction, Player } from '../types';

const STORAGE_KEY = 'wizard-score-keeper-v1';

const initialState: GameState = {
    players: [],
    phase: 'SETUP',
    currentRound: 0,
    totalRounds: 0,
    dealerIndex: 0,
    rounds: {},
};

// Helper: Calculate score for a single player in a round
const calculateScore = (bid: number, tricks: number): number => {
    if (bid === tricks) {
        return 20 + (tricks * 10);
    }
    return -10 * Math.abs(bid - tricks);
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'START_GAME': {
            const playerNames = action.payload.players;
            const players: Player[] = playerNames.map((name, index) => ({
                id: `p${index}-${Date.now()}`,
                name,
            }));
            const numPlayers = players.length;
            // Standard Wizard deck is 60 cards. Rounds = 60 / numPlayers
            const totalRounds = Math.floor(60 / numPlayers);

            return {
                ...initialState,
                players,
                totalRounds,
                currentRound: 1,
                dealerIndex: 0, // First player is dealer
                phase: 'BIDDING',
                rounds: {
                    1: {
                        roundNumber: 1,
                        dealerId: players[0].id,
                        trumpSuit: 'NONE',
                        bids: {},
                        tricks: {},
                        scores: {}
                    }
                }
            };
        }

        case 'SET_TRUMP': {
            const { trumpSuit } = action.payload;
            const currentRoundData = state.rounds[state.currentRound];
            if (!currentRoundData) return state;

            return {
                ...state,
                rounds: {
                    ...state.rounds,
                    [state.currentRound]: {
                        ...currentRoundData,
                        trumpSuit,
                    }
                }
            };
        }

        case 'SUBMIT_BIDS': {
            const { bids } = action.payload;
            const currentRoundData = state.rounds[state.currentRound];
            if (!currentRoundData) return state;

            return {
                ...state,
                phase: 'RESULTS',
                rounds: {
                    ...state.rounds,
                    [state.currentRound]: {
                        ...currentRoundData,
                        bids,
                    },
                },
            };
        }

        case 'SUBMIT_RESULTS': {
            const { tricks } = action.payload;
            const currentRoundData = state.rounds[state.currentRound];
            const bids = currentRoundData.bids;

            const roundScores: Record<string, number> = {};

            state.players.forEach(player => {
                const bid = bids[player.id] || 0;
                const playerTricks = tricks[player.id] || 0;
                roundScores[player.id] = calculateScore(bid, playerTricks);
            });

            const updatedRounds = {
                ...state.rounds,
                [state.currentRound]: {
                    ...currentRoundData,
                    tricks,
                    scores: roundScores,
                },
            };

            if (state.currentRound >= state.totalRounds) {
                return {
                    ...state,
                    rounds: updatedRounds,
                    phase: 'GAME_OVER',
                };
            }

            const nextRound = state.currentRound + 1;
            const nextDealerIndex = (state.dealerIndex + 1) % state.players.length;

            return {
                ...state,
                rounds: {
                    ...updatedRounds,
                    [nextRound]: {
                        roundNumber: nextRound,
                        dealerId: state.players[nextDealerIndex].id,
                        trumpSuit: 'NONE',
                        bids: {},
                        tricks: {},
                        scores: {}
                    }
                },
                currentRound: nextRound,
                dealerIndex: nextDealerIndex,
                phase: 'BIDDING',
            };
        }

        case 'END_GAME_EARLY':
            return {
                ...state,
                phase: 'GAME_OVER',
            };

        case 'RESET_GAME':
            return initialState;

        default:
            return state;
    }
};

const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState, (initial) => {
        // Load from local storage
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : initial;
        } catch (e) {
            console.warn('Failed to load from localStorage', e);
            return initial;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Failed to save to localStorage', e);
        }
    }, [state]);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
