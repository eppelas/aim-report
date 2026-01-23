import React, { useState, useRef, useEffect } from 'react';

interface IndexTriggerProps {
    onOpen: () => void;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    lang: 'en' | 'ru' | 'by' | 'ro';
    setLang: (lang: 'en' | 'ru' | 'by' | 'ro') => void;
    showThemeToggle?: boolean;
    forceDarkTheme?: boolean;
}

export const IndexTrigger: React.FC<IndexTriggerProps> = ({ onOpen, theme, toggleTheme, lang, setLang, showThemeToggle = true, forceDarkTheme = false }) => {
    const isDark = forceDarkTheme ? true : theme === 'dark';
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    // --- TECHNICAL THEME CONFIG ---
    const borderCol = isDark ? 'border-neutral-800' : 'border-neutral-300';
    const bgCol = isDark ? 'bg-black/80' : 'bg-white/80';
    const textCol = isDark ? 'text-neutral-400' : 'text-neutral-600';
    const hoverText = isDark ? 'hover:text-white' : 'hover:text-black';
    const activeText = isDark ? 'text-white' : 'text-black';

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages = ['en', 'ru', 'by', 'ro'] as const;

    return (
        <div className="fixed top-6 right-6 z-[100] pointer-events-auto flex items-start gap-2 font-mono text-[10px] uppercase tracking-widest">
            
            {/* 1. THEME TOGGLE (Hidden on Landing) */}
            {showThemeToggle && (
                <button 
                    onClick={toggleTheme} 
                    className={`
                        w-10 h-10 flex items-center justify-center 
                        border ${borderCol} ${bgCol} backdrop-blur-md 
                        ${textCol} ${hoverText} transition-all duration-300
                        hover:border-neutral-500
                    `}
                    aria-label="Toggle Theme"
                >
                    {isDark ? (
                        <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                    ) : (
                        <div className="w-3 h-3 border border-black rounded-full"></div>
                    )}
                </button>
            )}

            {/* 2. LANGUAGE SELECTOR */}
            <div ref={langRef} className="relative">
                <button
                    onClick={() => setLangOpen(!langOpen)}
                    className={`
                        h-10 px-4 flex items-center gap-2
                        border ${borderCol} ${bgCol} backdrop-blur-md
                        ${textCol} ${hoverText} transition-all duration-300
                        hover:border-neutral-500 min-w-[80px] justify-between
                        ${langOpen ? 'border-b-transparent' : ''}
                    `}
                >
                    <span className={activeText}>{lang}</span>
                    <svg 
                        className={`w-2 h-2 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} 
                        viewBox="0 0 10 6" 
                        fill="none" 
                        stroke="currentColor"
                    >
                        <path d="M1 1L5 5L9 1" strokeWidth="1.5" strokeLinecap="square"/>
                    </svg>
                </button>

                <div 
                    className={`
                        absolute top-full left-0 w-full 
                        border-x border-b ${borderCol} ${bgCol} backdrop-blur-md
                        flex flex-col overflow-hidden transition-all duration-300 origin-top
                        ${langOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
                    `}
                >
                    {languages.filter(l => l !== lang).map((l) => (
                        <button
                            key={l}
                            onClick={() => { setLang(l); setLangOpen(false); }}
                            className={`
                                h-10 flex items-center px-4 
                                ${textCol} hover:bg-neutral-500/10 ${hoverText} 
                                transition-colors text-left
                            `}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. INDEX TRIGGER */}
            <button 
                onClick={onOpen}
                className={`
                    h-12 md:h-10 px-8 md:px-6 flex items-center gap-3
                    border ${borderCol} ${bgCol} backdrop-blur-md
                    ${textCol} hover:text-[#DC2626] hover:border-[#DC2626] 
                    transition-all duration-300 group
                `}
            >
                <span className="font-bold">Index</span>
                <div className="flex flex-col gap-1 w-3 items-end">
                    <span className="w-full h-[1px] bg-current group-hover:w-full transition-all duration-300"></span>
                    <span className="w-2/3 h-[1px] bg-current group-hover:w-full transition-all duration-300 delay-75"></span>
                    <span className="w-full h-[1px] bg-current group-hover:w-full transition-all duration-300 delay-150"></span>
                </div>
            </button>

        </div>
    );
};