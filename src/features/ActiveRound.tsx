import React from 'react';
import { useGame } from '../context/GameContext';
import { BiddingForm } from './BiddingForm';
import { ResultsForm } from './ResultsForm';
import { GameOverScreen } from './GameOverScreen';

export const ActiveRound: React.FC = () => {
    const { state } = useGame();

    switch (state.phase) {
        case 'BIDDING':
            return <BiddingForm />;
        case 'RESULTS':
            return <ResultsForm />;
        case 'GAME_OVER':
            return <GameOverScreen />;
        default:
            return null;
    }
};
