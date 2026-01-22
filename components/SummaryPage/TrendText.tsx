import React from 'react';

interface TrendTextProps {
    isDark?: boolean;
}

export const TrendText: React.FC<TrendTextProps> = ({ isDark = true }) => {
    // Helper to highlight specific words in the summary
    const renderTrendText = () => {
        const text = "The trend is: as energy becomes the primary bottleneck, AI agents with wallets will emerge as autonomous economic actors within a landscape of fragmented regional sovereignty and embedded ideology. Synthetic data saturation will shift the focus toward provenance literacy, while users navigate context obesity and orchestration anxiety. In this zero-trust environment, privacy will serve as a status symbol, fueling a crisis of authorship and the mainstream acceptance of synthetic intimacy.";
        
        const highlights = ["energy", "bottleneck", "agents", "wallets", "sovereignty", "ideology", "synthetic", "provenance", "context obesity", "privacy", "authorship", "intimacy"];
        
        // Base text color depends on theme
        const baseTextColor = isDark ? 'text-neutral-200' : 'text-neutral-700';
        const hoverColor = isDark ? 'hover:text-white' : 'hover:text-black';

        return text.split(' ').map((word, i) => {
            const cleanWord = word.replace(/[.,]/g, '');
            const isHighlight = highlights.some(h => cleanWord.toLowerCase().includes(h) || h.includes(cleanWord.toLowerCase()));
            
            return (
                <span key={i} className={`trend-word inline-block mr-[0.3em] ${isHighlight ? 'text-[#DC2626] font-bold' : baseTextColor} transition-colors duration-300 ${hoverColor}`}>
                    {word}
                </span>
            );
        });
    };

    return (
        <div className="trend-container w-full max-w-4xl px-6 mb-32 relative z-10">
            <div className={`trend-bg ${isDark ? 'bg-neutral-900/60 border-white/10' : 'bg-white/60 border-black/10'} backdrop-blur-md border p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden`}>
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#DC2626] opacity-10 blur-[80px] rounded-full pointer-events-none"></div>
                <p className="font-mono text-lg md:text-xl leading-loose tracking-wide opacity-90 text-justify md:text-left relative z-10">
                    {renderTrendText()}
                </p>
            </div>
        </div>
    );
};