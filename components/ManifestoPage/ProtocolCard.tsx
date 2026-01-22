import React, { useRef, useState } from 'react';
import { ProtocolCardProps } from './types';

export const ProtocolCard: React.FC<ProtocolCardProps> = ({ 
    level, 
    title, 
    subtitle, 
    items, 
    color = "white",
    theme 
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const isDark = theme === 'dark';
    
    const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(items.length).fill(false));

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    const toggleItem = (index: number) => {
        const newChecked = [...checkedItems];
        newChecked[index] = !newChecked[index];
        setCheckedItems(newChecked);
    };

    const isRed = color === 'red';

    // --- THEME STYLES ---
    const bgBase = isDark ? 'bg-[#0f0f0f]' : 'bg-white';
    const borderBase = isDark ? 'border-white/5' : 'border-black/5';
    const borderHover = isDark ? 'hover:border-white/10' : 'hover:border-black/10';
    const titleColor = isRed 
        ? (isDark ? 'text-white' : 'text-[#DC2626]') 
        : (isDark ? 'text-neutral-200' : 'text-neutral-900');
    
    // Level Badge
    const levelBadgeStyle = isRed 
        ? (isDark ? 'border-red-900/50 text-red-400 bg-red-900/10' : 'border-red-200 text-red-600 bg-red-50')
        : (isDark ? 'border-white/10 text-neutral-400 bg-white/5' : 'border-neutral-200 text-neutral-500 bg-neutral-100');

    // Glow Gradient
    const glowColor = isRed 
        ? 'rgba(220,38,38,0.08)' 
        : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)');

    return (
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`group relative w-full rounded-[2rem] border ${borderBase} ${bgBase} overflow-hidden transition-all duration-500 ${borderHover} shadow-sm`}
        >
            {/* Dynamic Soft Glow */}
            <div 
                className="pointer-events-none absolute -inset-px transition-opacity duration-500 will-change-[opacity]"
                style={{
                    opacity: opacity,
                    background: `radial-gradient(800px circle at ${mouse.x}px ${mouse.y}px, ${glowColor}, transparent 40%)`
                }}
            />

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16">
                {/* Header Section */}
                <div className="md:w-1/3 flex flex-col justify-between shrink-0">
                    <div>
                        <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest mb-4 border ${levelBadgeStyle}`}>
                            {level}
                        </div>
                        <h3 className={`text-4xl font-medium tracking-tight mb-2 ${titleColor}`}>
                            {title}
                        </h3>
                        <p className={`font-sans text-lg ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>{subtitle}</p>
                    </div>
                    {/* Decorative Abstract Shape */}
                    <div className="hidden md:block mt-8 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                        {isRed ? (
                            <svg width="60" height="60" viewBox="0 0 100 100" className="text-red-500 animate-[spin_10s_linear_infinite]">
                                <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                                <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.5" />
                            </svg>
                        ) : (
                            <svg width="60" height="60" viewBox="0 0 100 100" className={`${isDark ? 'text-white' : 'text-neutral-900'} animate-[pulse_4s_ease-in-out_infinite]`}>
                                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Content List */}
                <div className="flex-1">
                    <ul className="grid grid-cols-1 gap-5">
                        {items.map((item, i) => {
                            const isChecked = checkedItems[i];
                            
                            // Checkbox Styles
                            const checkboxBorderBase = isDark ? 'border-neutral-700 group-hover/item:border-neutral-500' : 'border-neutral-300 group-hover/item:border-neutral-400';
                            const checkboxActive = isRed 
                                ? 'bg-[#DC2626] border-[#DC2626]' 
                                : (isDark ? 'bg-white border-white' : 'bg-black border-black');
                            const checkIconColor = isRed 
                                ? 'text-white' 
                                : (isDark ? 'text-black' : 'text-white');

                            // Text Styles
                            const textInactive = isDark ? 'text-neutral-400 group-hover/item:text-neutral-200' : 'text-neutral-600 group-hover/item:text-black';
                            const textActive = 'text-neutral-500 line-through decoration-neutral-500/50';

                            return (
                                <li 
                                    key={i} 
                                    className="flex items-start gap-4 group/item cursor-pointer select-none"
                                    onClick={() => toggleItem(i)}
                                >
                                    {/* Small Square Checkbox */}
                                    <div className={`mt-1.5 w-4 h-4 shrink-0 rounded-[4px] border flex items-center justify-center transition-all duration-300 ${isChecked ? checkboxActive : `${checkboxBorderBase} bg-transparent`}`}>
                                        <svg 
                                            className={`w-2.5 h-2.5 transition-transform duration-300 ${isChecked ? 'scale-100' : 'scale-0'} ${checkIconColor}`} 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="4" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <span className={`font-mono text-sm md:text-base leading-relaxed transition-colors duration-300 ${isChecked ? textActive : textInactive}`}>
                                        <span dangerouslySetInnerHTML={{ __html: item }} />
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};