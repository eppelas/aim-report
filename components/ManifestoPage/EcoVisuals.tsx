import React from 'react';
import { EcoVisualProps } from './types';

export const EcoVisual: React.FC<EcoVisualProps> = ({ type, theme }) => {
    const isDark = theme === 'dark';
    // In light mode, we make the visuals slightly more subtle/gray so they don't overpower
    const commonClass = `w-full h-full ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`;
    const accentColor = "#DC2626";

    if (type === 'psych') return (
        <svg className={commonClass} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <defs>
                <pattern id={`pat-psych-${theme}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.2" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pat-psych-${theme})`} />
            <circle cx="180" cy="20" r="100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <circle cx="180" cy="20" r="60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <circle cx="180" cy="20" r="30" fill="none" stroke={accentColor} strokeWidth="2" opacity="0.8" />
            <rect x="20" y="160" width="40" height="40" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
            <path d="M 0 180 Q 90 90 180 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </svg>
    );
    if (type === 'attention') return (
        <svg className={commonClass} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <defs>
                <pattern id={`pat-attn-${theme}`} width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="10" height="10" fill="currentColor" opacity="0.05"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pat-attn-${theme})`} />
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="100" y1="0" x2="100" y2="200" stroke={accentColor} strokeWidth="1" opacity="0.5" />
            <line x1="0" y1="100" x2="200" y2="100" stroke={accentColor} strokeWidth="1" opacity="0.5" />
            <rect x="20" y="20" width="10" height="10" fill={accentColor} opacity="0.4" />
            <rect x="170" y="170" width="10" height="10" fill={accentColor} opacity="0.4" />
        </svg>
    );
    if (type === 'philo') return (
        <svg className={commonClass} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <rect x="100" y="-50" width="150" height="150" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 175 25)" opacity="0.4" />
            <rect x="50" y="50" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 100 100)" opacity="0.6" />
            <circle cx="100" cy="100" r="5" fill={accentColor} />
            <text x="10" y="190" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.2">LOGIC // REASON</text>
            <line x1="0" y1="0" x2="200" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        </svg>
    );
    if (type === 'ark') return (
        <svg className={`w-full h-full ${isDark ? 'text-neutral-300' : 'text-neutral-400'}`} viewBox="0 0 200 100" preserveAspectRatio="none">
            <defs><pattern id={`grid-ark-restore-${theme}`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/></pattern></defs>
            <rect width="100%" height="100%" fill={`url(#grid-ark-restore-${theme})`} />
            <path d="M 50 80 L 100 30 L 150 80" fill="none" stroke={accentColor} strokeWidth="2" />
            <rect x="90" y="20" width="20" height="20" fill={accentColor} opacity="0.2" />
        </svg>
    );
    if (type === 'media') return (
        <svg className={commonClass} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <defs>
                <pattern id={`pat-media-${theme}`} width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.5" fill="currentColor" opacity="0.3"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pat-media-${theme})`} />
            <path d="M -50 100 Q 100 0 250 100" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
            <path d="M -50 120 Q 100 20 250 120" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
            <path d="M -50 140 Q 100 40 250 140" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.6" />
            <circle cx="180" cy="180" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" fill="none" opacity="0.2" />
            <rect x="20" y="20" width="20" height="20" stroke={accentColor} fill="none" opacity="0.5" />
        </svg>
    );
    if (type === 'code') return (
        <svg className={commonClass} viewBox="0 0 200 200" preserveAspectRatio="none">
            <defs>
                <pattern id={`pat-code-${theme}`} width="100" height="20" patternUnits="userSpaceOnUse">
                    <text x="0" y="15" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.1">0101 1010</text>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pat-code-${theme})`} />
            <rect x="20" y="20" width="120" height="10" fill="currentColor" opacity="0.2" />
            <rect x="20" y="40" width="80" height="10" fill="currentColor" opacity="0.2" />
            <rect x="20" y="60" width="140" height="10" fill={accentColor} opacity="0.4" />
            <rect x="20" y="80" width="100" height="10" fill="currentColor" opacity="0.2" />
            <line x1="180" y1="0" x2="180" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />
        </svg>
    );
    if (type === 'community') return (
        <svg className={commonClass} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <circle cx="180" cy="20" r="80" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
            <circle cx="20" cy="180" r="60" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
            <line x1="20" y1="180" x2="180" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <circle cx="100" cy="100" r="40" stroke={accentColor} strokeWidth="1" fill="none" />
            
            <circle cx="100" cy="60" r="5" fill="currentColor" opacity="0.5" />
            <circle cx="60" cy="100" r="5" fill="currentColor" opacity="0.5" />
            <circle cx="140" cy="100" r="5" fill="currentColor" opacity="0.5" />
            <circle cx="100" cy="140" r="5" fill="currentColor" opacity="0.5" />
            <line x1="100" y1="60" x2="140" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <line x1="60" y1="100" x2="100" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        </svg>
    );
    return null;
};