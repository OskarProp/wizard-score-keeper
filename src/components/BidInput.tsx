import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface BidInputProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    className?: string;
    isForbidden?: boolean;
}

export const BidInput: React.FC<BidInputProps> = ({
    value,
    onChange,
    min = 0,
    max = 20,
    className,
    isForbidden = false
}) => {
    const handleIncrement = () => {
        if (value < max) onChange(value + 1);
    };

    const handleDecrement = () => {
        if (value > min) onChange(value - 1);
    };

    return (
        <div className={cn("flex flex-col items-center gap-1", className)}>
            <div className="h-8 w-full flex items-end justify-center">
                <AnimatePresence>
                    {value < max && (
                        <motion.button
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}

                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleIncrement}
                            type="button"
                            className="p-4 rounded-2xl text-primary/80 hover:text-primary transition-colors"
                        >
                            <ChevronUp size={32} strokeWidth={3} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            <div className={cn(
                "w-16 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 font-bold text-2xl transition-all shadow-inner",
                isForbidden ? "border-error text-error bg-error/5 ring-2 ring-error/20" : "text-primary"
            )}>
                {value}
            </div>

            <div className="h-8 w-full flex items-start justify-center">
                <AnimatePresence>
                    {value > min && (
                        <motion.button
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleDecrement}
                            type="button"
                            className="p-4 rounded-2xl text-primary/80 hover:text-primary transition-colors"
                        >
                            <ChevronDown size={32} strokeWidth={3} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
