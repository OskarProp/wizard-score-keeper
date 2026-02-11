import { useGame } from './context/GameContext';
import { SetupScreen } from './features/SetupScreen';
import { GameScreen } from './features/GameScreen';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { state } = useGame();

  return (
    <div className="min-h-screen bg-background text-text font-sans selection:bg-primary/30 relative">
      <div className="mystic-bg" />
      <div className="aurora" />

      <AnimatePresence mode="wait">
        <motion.main
          key={state.phase === 'SETUP' ? 'setup' : 'game'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10"
        >
          {state.phase === 'SETUP' ? (
            <SetupScreen />
          ) : (
            <GameScreen />
          )}
        </motion.main>
      </AnimatePresence>

      <CookieBanner />
      <Footer />
    </div>
  )
}

export default App
