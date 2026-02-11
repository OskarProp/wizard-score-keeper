import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileText, X } from 'lucide-react';

export const Footer: React.FC = () => {
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showImpressum, setShowImpressum] = useState(false);

    return (
        <>
            <footer className="fixed bottom-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-md border-t border-white/10 px-6 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 text-xs">
                    <button
                        onClick={() => setShowPrivacy(true)}
                        className="flex items-center gap-1.5 text-text-muted hover:text-primary transition-colors"
                    >
                        <Shield size={12} />
                        <span>Privacy</span>
                    </button>
                    <div className="w-px h-3 bg-white/10" />
                    <button
                        onClick={() => setShowImpressum(true)}
                        className="flex items-center gap-1.5 text-text-muted hover:text-primary transition-colors"
                    >
                        <FileText size={12} />
                        <span>Impressum</span>
                    </button>
                </div>
            </footer>

            {/* Privacy Modal */}
            <AnimatePresence>
                {showPrivacy && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
                        onClick={() => setShowPrivacy(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#1c1c1e] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl overflow-hidden relative max-h-[80vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setShowPrivacy(false)}
                                className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
                                    <Shield className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-serif font-bold">Data Privacy</h2>
                            </div>

                            <div className="space-y-4 text-sm text-text-muted leading-relaxed">
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
                                <p className="text-xs text-text-muted/70 pt-4 border-t border-white/5">
                                    By using WizScore, you acknowledge that game data is stored locally on your device for functionality purposes only.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Impressum Modal */}
            <AnimatePresence>
                {showImpressum && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
                        onClick={() => setShowImpressum(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#1c1c1e] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl overflow-hidden relative"
                        >
                            <button
                                onClick={() => setShowImpressum(false)}
                                className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
                                    <FileText className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-serif font-bold">Impressum</h2>
                            </div>

                            <div className="space-y-4 text-sm text-text-muted leading-relaxed">
                                <div>
                                    <p className="text-white font-bold mb-1">Angaben gemäß § 5 TMG</p>
                                    <p>WizScore</p>
                                    <p>Open Source Project</p>
                                </div>

                                <div>
                                    <p className="text-white font-bold mb-1">Kontakt</p>
                                    <p>GitHub: <a href="https://github.com/OskarProp/wizard-score-keeper" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OskarProp/wizard-score-keeper</a></p>
                                </div>

                                <div>
                                    <p className="text-white font-bold mb-1">Haftungsausschluss</p>
                                    <p className="text-xs">
                                        Die Inhalte dieser Anwendung wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                                    </p>
                                </div>

                                <p className="text-xs text-text-muted/70 pt-4 border-t border-white/5">
                                    Diese Anwendung ist ein Open-Source-Projekt und wird ohne Gewährleistung bereitgestellt.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
