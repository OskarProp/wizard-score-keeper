import React, { useEffect, useState } from 'react';
import { useSpring, useTransform } from 'framer-motion';

export const CountUp: React.FC<{ value: number }> = ({ value }) => {
    const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current));
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    useEffect(() => {
        return display.on('change', (latest) => {
            setDisplayValue(latest);
        });
    }, [display]);

    return <span>{displayValue}</span>;
};
