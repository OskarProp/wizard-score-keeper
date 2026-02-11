import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Wizard Hat Body */}
            <path
                d="M118.7 406.8C75 423.8 24.6 422 13.9 417.8C4.5 414.2 0 403.4 0 395.7C0 380 9 347.1 27 325.7C45 304.3 94.5 282.9 148.5 282.9H153C161.4 207.1 198.8 136.7 261.4 92.5C324.6 47.9 406.7 30.6 480.9 45.4C493 47.8 502.9 57.6 505.4 69.8C508.8 86.6 496.1 102.3 479 102.3C469.7 102.3 460.8 98.7 453.9 92.4C436.4 76.4 411.7 73.1 391.2 83.3C370.7 93.5 357.7 115.6 357.7 138.5V146.3C357.7 217.2 320.7 283 260.6 320.1C246.4 328.8 231.1 335.8 215.1 341.1V368.5C401.5 391.6 466.5 419.6 472.1 422.3C480.1 426.1 485.4 434 485.4 442.9C485.4 457.1 471.2 467.2 457.5 463.8C452.1 462.5 407.7 450.9 337.8 444C268 437.1 169.5 433 118.7 406.8Z"
                fill="#F2BF4E"
            />
            {/* Tally Marks */}
            <g transform="rotate(-10 256 256)">
                <path d="M220 280L220 200" stroke="#1c1c1e" strokeWidth="20" strokeLinecap="round" />
                <path d="M250 280L250 200" stroke="#1c1c1e" strokeWidth="20" strokeLinecap="round" />
                <path d="M280 280L280 200" stroke="#1c1c1e" strokeWidth="20" strokeLinecap="round" />
                <path d="M310 280L310 200" stroke="#1c1c1e" strokeWidth="20" strokeLinecap="round" />
                <path d="M200 220L330 260" stroke="#1c1c1e" strokeWidth="20" strokeLinecap="round" />
            </g>
        </svg>
    );
};
