import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem('wizard-privacy-accepted');
        if (!accepted) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('wizard-privacy-accepted', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] z-[200]"
                >
                    <div className="glass rounded-3xl p-6 shadow-2xl border border-primary/20 bg-black/40 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 ring-1 ring-primary/20">
                                <ShieldCheck className="text-primary w-6 h-6" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-serif font-bold text-lg">Privacy Portal</h3>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="text-text-muted hover:text-white transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <p className="text-text-muted text-xs leading-relaxed mb-6">
                                    This arcane tool uses <span className="text-primary/80 font-bold">Local Storage</span> to preserve your journey across sessions. No data ever leaves your device.
                                </p>

                                <button
                                    onClick={accept}
                                    className="w-full py-3 rounded-xl bg-primary text-charcoal-900 font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-lg"
                                >
                                    Accept Oracle
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
