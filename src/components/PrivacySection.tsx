import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, ChevronUp } from 'lucide-react';

export const PrivacySection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-8 w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            >
                <div className="flex items-center gap-2">
                    <Shield size={16} className="text-primary/70" />
                    <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Data Privacy</span>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 py-4 text-xs text-text-muted leading-relaxed space-y-3 bg-white/5 rounded-b-xl border-x border-b border-white/10">
                            <p>
                                <strong className="text-white">Local Storage Only:</strong> WizScore stores all game data locally on your device using browser Local Storage. No data is ever transmitted to external servers or third parties.
                            </p>
                            <p>
                                <strong className="text-white">What We Store:</strong> Player names, game scores, round information, and game state to preserve your progress across sessions.
                            </p>
                            <p>
                                <strong className="text-white">Your Control:</strong> You can clear all stored data at any time by clearing your browser's Local Storage or using your browser's privacy settings.
                            </p>
                            <p>
                                <strong className="text-white">No Tracking:</strong> We do not use cookies, analytics, or any tracking mechanisms. Your privacy is fully protected.
                            </p>
                            <p className="text-[10px] text-text-muted/70 pt-2 border-t border-white/5">
                                By using WizScore, you acknowledge that game data is stored locally on your device for functionality purposes only.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
