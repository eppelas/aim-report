import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap-config';
import { LayerData } from './shiftsData';

interface LayerViewProps {
    data: LayerData;
    onNext: () => void;
    onPrev: () => void;
    onBack: () => void;
    nextTitle: string;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}

export const LayerView: React.FC<LayerViewProps> = ({ data, onNext, onPrev, onBack, nextTitle, theme }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const isDark = theme === 'dark';

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // SVG Animations - SLOWED DOWN (3-4x slower) for ambient feel
            if (data.metaphor === 'globe') {
                gsap.to(".radar-scan", { rotation: 360, transformOrigin: "50px 50px", duration: 15, repeat: -1, ease: "linear" });
                gsap.to(".rotate-slow", { rotation: 360, transformOrigin: "50px 50px", duration: 80, repeat: -1, ease: "linear" });
                gsap.to([".arc-rotate-1", ".arc-rotate-3"], { rotation: -360, transformOrigin: "50px 50px", duration: 100, repeat: -1, ease: "linear" });
                gsap.to(".arc-rotate-2", { rotation: 360, transformOrigin: "50px 50px", duration: 90, repeat: -1, ease: "linear" });
                gsap.to(".pulse-fast", { scale: 1.3, opacity: 0.4, transformOrigin: "50px 50px", duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
            } 
            else if (data.metaphor === 'neural') {
                gsap.to(".neural-pulse", { scale: 1.5, opacity: 0, transformOrigin: "center", duration: 6, repeat: -1, ease: "sine.out", stagger: 1.5 });
                gsap.to(".node-float", { y: "random(-10, 10)", x: "random(-10, 10)", duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5 });
            }
            else if (data.metaphor === 'construct') {
                gsap.to(".construct-rotate", { rotation: 360, transformOrigin: "center", duration: 80, repeat: -1, ease: "linear" });
                gsap.to(".block-float", { y: -20, opacity: 0.8, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5 });
            }
            else if (data.metaphor === 'human') {
                gsap.to(".ripple", { scale: 2, opacity: 0, transformOrigin: "center", duration: 12, repeat: -1, ease: "sine.out", stagger: 2.5 });
            }

        }, containerRef);
        return () => ctx.revert();
    }, [data, isDark]);

    // Styles
    const bgMain = isDark ? 'bg-[#0A0A0A]' : 'bg-[#F4F4F5]';
    const textMain = isDark ? 'text-white' : 'text-neutral-900';
    const textSec = isDark ? 'text-neutral-300' : 'text-neutral-600';
    const strokeMain = isDark ? 'currentColor' : '#333';
    // Remove mix-blend in light mode to avoid dirty trails
    const svgBlend = isDark ? 'mix-blend-screen opacity-30' : 'opacity-20'; 

    return (
        <div ref={containerRef} className={`relative w-full min-h-screen ${bgMain} ${textMain} flex flex-col items-center justify-center overflow-hidden transition-colors duration-500`}>
             
             {/* BACKGROUND SVG METAPHOR */}
             <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${svgBlend}`}>
                <svg ref={svgRef} viewBox="0 0 100 100" className="w-[100vw] h-[100vw] md:w-[800px] md:h-[800px] overflow-visible">
                    <defs>
                        <filter id="glow-layer" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur>
                            <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                        </filter>
                        <linearGradient id="grad-radar" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#DC2626" stopOpacity="0" />
                            <stop offset="100%" stopColor="#DC2626" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>

                    {data.metaphor === 'globe' && (
                        <g transform="translate(50 50) scale(0.9) translate(-50 -50)">
                            <path className="radar-scan" d="M50 50 L50 5 A45 45 0 0 1 95 50 Z" fill="url(#grad-radar)" opacity="0.3"></path>
                            <circle cx="50" cy="50" r="34.6" fill="#DC2626" opacity="0.05" filter="url(#glow-layer)" className="pulse-fast"></circle>
                            <circle cx="50" cy="50" r="32" stroke={strokeMain} strokeWidth="0.5" fill="none" opacity="0.5"></circle>
                            <ellipse cx="50" cy="50" rx="32" ry="10" stroke={strokeMain} strokeWidth="0.2" fill="none" opacity="0.3"></ellipse>
                            <path d="M50 18 A 32 32 0 0 1 82 50" stroke={strokeMain} strokeWidth="1.5" fill="none" opacity="0.6" className="arc-rotate-1"></path>
                            <path d="M50 82 A 32 32 0 0 1 18 50" stroke="#DC2626" strokeWidth="1.5" fill="none" filter="url(#glow-layer)" opacity="0.8" className="arc-rotate-2"></path>
                            <path d="M18 50 A 32 32 0 0 1 50 18" stroke={strokeMain} strokeWidth="1.5" fill="none" opacity="0.4" className="arc-rotate-3"></path>
                        </g>
                    )}

                    {data.metaphor === 'neural' && (
                         <g transform="translate(50 50)">
                            <circle className="neural-pulse" r="10" fill="none" stroke="#DC2626" strokeWidth="0.5" />
                            <circle className="neural-pulse" r="20" fill="none" stroke="#DC2626" strokeWidth="0.5" />
                            <line x1="-30" y1="-20" x2="30" y2="20" stroke={strokeMain} strokeWidth="0.2" opacity="0.5" />
                            <line x1="-30" y1="20" x2="30" y2="-20" stroke={strokeMain} strokeWidth="0.2" opacity="0.5" />
                            <circle className="node-float" cx="-30" cy="-20" r="2" fill={isDark ? "#fff" : "#333"} />
                            <circle className="node-float" cx="30" cy="20" r="2" fill={isDark ? "#fff" : "#333"} />
                            <circle className="node-float" cx="-30" cy="20" r="2" fill={isDark ? "#fff" : "#333"} />
                            <circle className="node-float" cx="30" cy="-20" r="2" fill={isDark ? "#fff" : "#333"} />
                            <circle cx="0" cy="0" r="5" fill="#DC2626" filter="url(#glow-layer)" />
                         </g>
                    )}

                    {data.metaphor === 'construct' && (
                        <g transform="translate(50 50)">
                           <g className="construct-rotate">
                              <rect x="-20" y="-20" width="40" height="40" fill="none" stroke="#DC2626" strokeWidth="1" />
                              <rect x="-15" y="-15" width="30" height="30" fill="none" stroke={strokeMain} strokeWidth="0.5" transform="rotate(45)" />
                           </g>
                           <rect className="block-float" x="-30" y="-40" width="10" height="10" fill={isDark ? "#fff" : "#333"} opacity="0.5" />
                           <rect className="block-float" x="20" y="30" width="10" height="10" fill={isDark ? "#fff" : "#333"} opacity="0.5" style={{ animationDelay: '1s'}} />
                        </g>
                    )}

                    {data.metaphor === 'human' && (
                        <g transform="translate(50 50)">
                            <circle className="ripple" r="10" fill="none" stroke="#DC2626" strokeWidth="0.5" />
                            <circle className="ripple" r="15" fill="none" stroke={strokeMain} strokeWidth="0.2" />
                            <circle className="ripple" r="5" fill="#DC2626" opacity="0.5" />
                            <path d="M-10 0 Q0 10 10 0" stroke={strokeMain} fill="none" strokeWidth="0.5" />
                        </g>
                    )}

                </svg>
             </div>

             <div ref={textRef} className="relative z-10 text-center max-w-4xl px-6 w-full">
                
                <div className="flex flex-col items-center mb-12">
                    <span className="font-mono text-[#DC2626] text-xs md:text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#DC2626] rounded-full"></span>
                        Layer {data.id}: Analysis
                    </span>
                    <div className="w-full max-w-2xl border-t border-white/10 mb-8"></div>
                    
                    <h1 className={`text-3xl md:text-5xl font-light ${textMain} leading-tight mb-6`}>
                        {data.subtitle}
                    </h1>
                    
                    <p className={`font-mono text-base md:text-xl text-neutral-500 max-w-xl mx-auto leading-relaxed`}>
                        {data.desc}
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6 mt-12 max-w-lg mx-auto text-left">
                    <div className="flex items-center gap-2 w-full">
                        <svg className="w-4 h-4 text-[#DC2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        <span className="font-mono text-xs text-[#DC2626] uppercase tracking-widest">The Constraint</span>
                    </div>
                    <div className={`pl-6 border-l-2 border-[#DC2626]`}>
                        <p className={`text-xl md:text-2xl font-bold ${textMain} leading-tight`}>
                            {data.constraint}
                        </p>
                    </div>
                </div>
                
                <div className="flex justify-center gap-4 mt-20">
                     {onPrev && (
                         <button onClick={onPrev} className={`px-6 py-3 border ${isDark ? 'border-neutral-800 text-neutral-500' : 'border-neutral-300 text-neutral-600'} hover:text-[#DC2626] hover:border-[#DC2626] transition-all font-mono text-xs uppercase tracking-widest`}>
                             Back
                         </button>
                     )}
                     <button onClick={onNext} className="group px-8 py-3 bg-[#DC2626] text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-2">
                         <span>Begin Layer</span>
                         <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                     </button>
                </div>
             </div>

             {/* Footer Nav Hint */}
             <div className="absolute bottom-10 w-full text-center">
                <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">{nextTitle}</p>
             </div>
        </div>
    );
};