import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Wizard Hat Base */}
            <path
                d="M496 384H416C416 384 416 368 416 352C416 228.3 320 128 208 128C194.7 128 181.8 129.5 169.4 132.3C182.8 91.4 221.7 64 263.6 64H272C285.3 64 296 53.3 296 40C296 26.7 285.3 16 272 16H263.6C203.9 16 149.3 53.9 127.3 109C55.4 126.3 1.9 193.3 8.3 268.3C11.1 302.3 28.1 332.9 54.1 355.6C34.8 360.8 16 384 16 384C16 384 16 400 16 416C16 460.2 51.8 496 96 496H448C474.5 496 496 474.5 496 448V384Z"
                fill="#F2BF4E"
            />
            {/* Tally Marks (Stylized on the hat) */}
            <path d="M160 220L200 180" stroke="#1c1c1e" strokeWidth="24" strokeLinecap="round" />
            <path d="M190 220L230 180" stroke="#1c1c1e" strokeWidth="24" strokeLinecap="round" />
            <path d="M220 220L260 180" stroke="#1c1c1e" strokeWidth="24" strokeLinecap="round" />
            <path d="M250 220L290 180" stroke="#1c1c1e" strokeWidth="24" strokeLinecap="round" />
            {/* Cross stroke */}
            <path d="M160 200L290 200" stroke="#1c1c1e" strokeWidth="24" strokeLinecap="round" />
        </svg>
    );
};
