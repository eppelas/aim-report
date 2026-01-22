
import React from 'react';
import { RuptureLine } from './RuptureLine';

interface GapListProps {
    isDark: boolean;
}

export const GapList: React.FC<GapListProps> = ({ isDark }) => {
    const gapConflicts = [
        { left: "infinite ideas", right: "physical matter" },
        { left: "global internet", right: "sovereign clouds" },
        { left: "machine speed", right: "human bandwidth" },
        { left: "infinite context", right: "finite attention" },
        { left: "algorithmic attack", right: "manual defense" },
        { left: "what ai knows", right: "what ai will say" },
        { left: "attention", right: "care" }
    ];

    const textMain = isDark ? 'text-white' : 'text-neutral-900';

    return (
        <div className="gap-list-container relative w-full max-w-7xl px-4 mb-24">
            
            {/* Interactive Rupture Line SVG */}
            <RuptureLine />

            <div className="space-y-4 py-6 relative z-10">
                {gapConflicts.map((row, i) => (
                    // STRICT GRID: 1fr - 80px - 1fr
                    <div key={i} className="gap-row grid grid-cols-[1fr_80px_1fr] items-center group cursor-default">
                        
                        {/* Left: Machine */}
                        <div className="gap-left text-right pr-4">
                            <span className={`block font-mono font-bold text-xs md:text-base tracking-tight ${textMain} group-hover:text-[#DC2626] transition-colors`}>
                                {row.left}
                            </span>
                        </div>

                        {/* Center Spacer */}
                        <div className="gap-dot relative flex justify-center items-center w-full h-full">
                            <div className="w-1 h-1 bg-[#DC2626] rounded-full opacity-30"></div>
                        </div>

                        {/* Right: Human */}
                        <div className="gap-right text-left pl-4">
                            <span className={`block font-sans font-light text-sm md:text-lg text-neutral-400 group-hover:text-white transition-colors`}>
                                {row.right}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
