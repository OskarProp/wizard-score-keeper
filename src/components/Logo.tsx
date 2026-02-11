import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="crystalGradient" x1="256" y1="100" x2="256" y2="400" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F2BF4E" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#F2BF4E" stopOpacity="0.05" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="15" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Crystal Ball Orb */}
            <circle cx="256" cy="220" r="140" fill="url(#crystalGradient)" stroke="#F2BF4E" strokeWidth="12" />

            {/* Inner Magical Essence (Swirl/W shape) */}
            <path
                d="M190 220C190 220 210 260 230 220C240 200 245 200 256 240C267 200 272 200 282 220C302 260 322 220 322 220"
                stroke="#F2BF4E"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
            />

            {/* Reflections on the ball */}
            <path d="M180 160C195 140 220 130 256 130" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.6" />

            {/* Stand */}
            <path d="M176 340L160 416H352L336 340" stroke="#F2BF4E" strokeWidth="16" strokeLinejoin="round" fill="none" />
            <path d="M140 416H372" stroke="#F2BF4E" strokeWidth="16" strokeLinecap="round" />

            {/* Sparkles */}
            <g className="text-[#F2BF4E]">
                <path d="M380 120L390 100L400 120L420 130L400 140L390 160L380 140L360 130L380 120Z" fill="currentColor" opacity="0.8" />
                <path d="M120 300L125 290L130 300L140 305L130 310L125 320L120 310L110 305L120 300Z" fill="currentColor" opacity="0.6" />
                <path d="M420 320L424 312L428 320L436 324L428 328L424 336L420 328L412 324L420 320Z" fill="currentColor" opacity="0.6" />
            </g>
        </svg>
    );
};
