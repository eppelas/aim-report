import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap-config';
import { layers, shifts } from '../shiftsData';
import { ShiftMetaphor } from '../ShiftMetaphor';

interface IndexOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (type: 'landing' | 'layer' | 'shift' | 'summary' | 'manifesto' | 'thankyou', id?: string) => void;
    theme: 'dark' | 'light';
}

export const IndexOverlay: React.FC<IndexOverlayProps> = ({ isOpen, onClose, onNavigate, theme }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isDark = theme === 'dark';

    // Grid Animation Refs
    const plate1Ref = useRef<SVGRectElement>(null);
    const plate2Ref = useRef<SVGRectElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const pos1 = useRef({ x: 0, y: 0 });
    const pos2 = useRef({ x: 0, y: 0 });

    // Theme Styles
    const bgOverlay = 'bg-black/60 backdrop-blur-md';
    
    // Modal Window Theme
    const modalBg = isDark ? 'bg-[#0A0A0A]/85' : 'bg-[#FAFAFA]/95';
    const backdropBlur = 'backdrop-blur-2xl';
    
    const textMain = isDark ? 'text-white' : 'text-neutral-950';
    const textDim = isDark ? 'text-neutral-400' : 'text-neutral-600'; 
    const borderMain = isDark ? 'border-neutral-800' : 'border-neutral-300'; 
    const scrollbarClass = isDark ? 'scrollbar-dark' : 'scrollbar-light';

    // Interactive States
    const cardHover = isDark ? 'hover:bg-neutral-900 hover:border-[#DC2626]' : 'hover:bg-white hover:border-[#DC2626] hover:shadow-lg';
    const cardBg = isDark ? 'bg-black/40' : 'bg-white';
    const cardShadow = isDark ? '' : 'shadow-sm';
    
    // Grid Color - Reduced opacity for light mode visibility (0.15 -> 0.10)
    const gridColor = isDark ? '#DC2626' : '#000000';
    const gridOpacity = isDark ? 0.15 : 0.10; 

    // --- ANIMATION LOGIC ---
    useEffect(() => {
        if (!isOpen) return;

        // Mouse Tracker
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize -1 to 1
            mousePos.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        let rafId: number;
        const animate = () => {
            // Target positions - Very small amplitude ("barely react")
            const amp = 15; // pixels
            const target1X = mousePos.current.x * -amp; 
            const target1Y = mousePos.current.y * -(amp/2);
            const target2X = mousePos.current.x * amp;
            const target2Y = mousePos.current.y * (amp/2);

            // Interpolation - Ultra slow
            const ease = 0.02;
            pos1.current.x += (target1X - pos1.current.x) * ease;
            pos1.current.y += (target1Y - pos1.current.y) * ease;
            
            pos2.current.x += (target2X - pos2.current.x) * ease;
            pos2.current.y += (target2Y - pos2.current.y) * ease;

            // Apply transforms
            if (plate1Ref.current) {
                plate1Ref.current.setAttribute('transform', `translate(${pos1.current.x}, ${pos1.current.y}) rotate(15)`);
            }
            if (plate2Ref.current) {
                plate2Ref.current.setAttribute('transform', `translate(${pos2.current.x}, ${pos2.current.y}) rotate(-5)`);
            }
            rafId = requestAnimationFrame(animate);
        };
        animate();

        // GSAP Enter Animations
        const ctx = gsap.context(() => {
            gsap.fromTo(overlayRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            );
            gsap.fromTo(contentRef.current, 
                { scale: 0.95, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)", delay: 0.1 }
            );
            gsap.fromTo(".toc-anim", 
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.02, duration: 0.4, ease: "power2.out", delay: 0.2 }
            );
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
            ctx.revert();
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleNavClick = (type: any, id?: string) => {
        gsap.to(contentRef.current, {
            scale: 0.95,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                onNavigate(type, id);
                onClose();
            }
        });
    };

    // Handler to close when clicking empty space in the container
    const handleBackgroundClick = (e: React.MouseEvent) => {
        // If the click target is the element itself (not a child), close it.
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 cursor-pointer`}
            onClick={onClose} // Closing when clicking the padding/backdrop area
        >
            {/* Backdrop */}
            <div 
                ref={overlayRef}
                className={`absolute inset-0 ${bgOverlay}`}
            ></div>

            {/* Modal Window */}
            <div 
                ref={contentRef}
                onClick={handleBackgroundClick}
                className={`relative w-full max-w-6xl h-full max-h-[90vh] ${modalBg} ${backdropBlur} border ${borderMain} rounded-xl shadow-2xl flex flex-col overflow-hidden cursor-auto`}
            >
                {/* Background Tectonic Grid */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ opacity: gridOpacity }}>
                    <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="toc-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="1"/>
                            </pattern>
                            <linearGradient id="toc-fade" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="white" stopOpacity="0" />
                                <stop offset="50%" stopColor="white" stopOpacity="1" />
                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                            <mask id="toc-mask"><rect x="0" y="0" width="1000" height="1000" fill="url(#toc-fade)" /></mask>
                        </defs>
                        <rect ref={plate1Ref} x="-500" y="-500" width="2000" height="2000" fill="url(#toc-grid)" transform="rotate(15)" mask="url(#toc-mask)" />
                        <rect ref={plate2Ref} x="-500" y="-500" width="2000" height="2000" fill="url(#toc-grid)" transform="rotate(-5)" mask="url(#toc-mask)" />
                    </svg>
                </div>

                {/* Fixed Header */}
                <div 
                    onClick={(e) => e.stopPropagation()} // Header clicks shouldn't close
                    className={`relative z-10 flex justify-between items-center p-6 md:p-8 border-b ${borderMain} ${isDark ? 'bg-[#0A0A0A]/50' : 'bg-white/50'} backdrop-blur-sm`}
                >
                    <div>
                        <h2 className={`text-2xl font-black uppercase tracking-tight ${textMain}`}>Index</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className={`group flex items-center gap-2 px-3 py-1.5 border ${borderMain} rounded hover:bg-[#DC2626] hover:border-[#DC2626] transition-all bg-transparent`}
                    >
                        <span className={`font-mono text-[10px] font-bold uppercase ${textMain} group-hover:text-white`}>Close</span>
                        <svg className={`w-3 h-3 ${textMain} group-hover:text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div 
                    onClick={handleBackgroundClick} // Clicking empty space in scroll area closes modal
                    className={`relative z-10 flex-1 overflow-y-auto p-6 md:p-8 ${scrollbarClass}`}
                >
                    
                    {/* Intro */}
                    <div 
                        onClick={(e) => { e.stopPropagation(); handleNavClick('landing'); }}
                        className={`toc-anim mb-8 p-4 ${cardBg} border ${borderMain} ${cardShadow} ${cardHover} rounded-lg cursor-pointer transition-all flex items-center justify-between group`}
                    >
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-[#DC2626] flex items-center justify-center text-white shadow-sm">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                            </div>
                            <span className={`text-lg font-bold uppercase ${textMain}`}>Introduction</span>
                        </div>
                        <span className={`font-mono text-[10px] uppercase tracking-widest hidden md:block ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>The Context Gap</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-12">
                         {layers.map((layer) => {
                            const layerShifts = shifts.filter(s => s.layerId === layer.id);
                            return (
                                <React.Fragment key={layer.id}>
                                    
                                    {/* Layer Header */}
                                    <div 
                                        onClick={(e) => { e.stopPropagation(); handleNavClick('layer', layer.id); }}
                                        className={`toc-anim col-span-1 md:col-span-2 lg:col-span-4 mt-6 pt-2 pb-2 border-b ${borderMain} flex items-end justify-between cursor-pointer group`}
                                    >
                                        <div className="flex items-baseline gap-3">
                                            <span className="font-mono text-[#DC2626] text-xs font-bold">L{layer.id}</span>
                                            <h4 className={`text-xl font-black uppercase ${textMain} tracking-tight group-hover:text-[#DC2626] transition-colors`}>{layer.title}</h4>
                                        </div>
                                        <span className={`text-[10px] font-mono ${textDim} group-hover:text-[#DC2626] opacity-0 group-hover:opacity-100 transition-all`}>Go to Layer →</span>
                                    </div>

                                    {/* Shifts Grid */}
                                    {layerShifts.map((shift) => (
                                        <div 
                                            key={shift.id}
                                            onClick={(e) => { e.stopPropagation(); handleNavClick('shift', shift.id); }}
                                            className={`toc-anim relative h-32 p-4 ${cardBg} border ${borderMain} ${cardShadow} ${cardHover} rounded-lg cursor-pointer transition-all group overflow-hidden flex flex-col justify-between`}
                                        >
                                            {/* Top Right Visual - passing hoverTrigger=true to enforce hover-only animation */}
                                            <div className="absolute -right-4 -bottom-4 w-24 h-24 opacity-20 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0 pointer-events-auto">
                                                <svg width="100%" height="100%" viewBox="-60 -60 120 120" className="overflow-visible">
                                                     <ShiftMetaphor id={shift.id} isDark={isDark} hoverTrigger={true} />
                                                </svg>
                                            </div>

                                            <div className="relative z-10 pointer-events-none">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-mono text-[9px] text-[#DC2626] font-bold border border-[#DC2626]/20 bg-[#DC2626]/5 px-1.5 py-0.5 rounded">
                                                        {shift.id}
                                                    </span>
                                                </div>
                                                <h3 className={`text-sm font-bold uppercase leading-tight ${textMain} pr-8 group-hover:text-[#DC2626] transition-colors`}>
                                                    {shift.title}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </React.Fragment>
                            );
                         })}

                        <div className={`toc-anim col-span-1 md:col-span-2 lg:col-span-4 mt-8 border-b ${borderMain} pb-2`}>
                             <span className={`font-mono text-[10px] uppercase ${textDim}`}>Conclusion</span>
                        </div>

                        {/* Summary */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); handleNavClick('summary'); }}
                            className={`toc-anim h-24 p-4 ${cardBg} border ${borderMain} ${cardShadow} ${cardHover} rounded-lg cursor-pointer transition-all group flex flex-col justify-center`}
                        >
                             <h3 className={`text-sm font-black uppercase ${textMain} group-hover:text-[#DC2626] transition-colors`}>Summary</h3>
                             <p className={`text-[10px] font-mono ${textDim}`}>Recap</p>
                        </div>

                        {/* Manifesto */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); handleNavClick('manifesto'); }}
                            className={`toc-anim h-24 p-4 bg-[#DC2626] text-white rounded-lg cursor-pointer transition-all group flex flex-col justify-center hover:bg-red-600 shadow-md hover:shadow-red-500/20`}
                        >
                             <h3 className="text-sm font-black uppercase">Manifesto</h3>
                             <p className="text-[10px] font-mono opacity-80">The Plan</p>
                        </div>

                        {/* Thank You */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); handleNavClick('thankyou'); }}
                            className={`toc-anim h-24 p-4 ${cardBg} border ${borderMain} ${cardShadow} ${cardHover} rounded-lg cursor-pointer transition-all group flex flex-col justify-center`}
                        >
                             <h3 className={`text-sm font-black uppercase ${textMain} group-hover:text-[#DC2626] transition-colors`}>Thank You</h3>
                             <p className={`text-[10px] font-mono ${textDim}`}>End</p>
                        </div>

                    </div>

                    {/* Footer / Socials */}
                    <div className={`toc-anim border-t ${borderMain} pt-10 mt-20 mb-12`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <a href="https://t.me/ai_mind_set" target="_blank" rel="noreferrer" className="group">
                                <div className={`font-mono text-[10px] uppercase tracking-widest ${textDim} mb-1`}>Telegram</div>
                                <div className={`text-sm font-bold ${textMain} group-hover:text-[#DC2626] transition-colors`}>Subscribe</div>
                            </a>
                            <a href="https://aimindset.org" target="_blank" rel="noreferrer" className="group">
                                <div className={`font-mono text-[10px] uppercase tracking-widest ${textDim} mb-1`}>Website</div>
                                <div className={`text-sm font-bold ${textMain} group-hover:text-[#DC2626] transition-colors`}>aimindset.org</div>
                            </a>
                            <a href="mailto:info@aimindset.org" className="group">
                                <div className={`font-mono text-[10px] uppercase tracking-widest ${textDim} mb-1`}>Email</div>
                                <div className={`text-sm font-bold ${textMain} group-hover:text-[#DC2626] transition-colors`}>info@aimindset.org</div>
                            </a>
                            <a href="https://www.youtube.com/@A-I-Mindset/videos" target="_blank" rel="noreferrer" className="group">
                                <div className={`font-mono text-[10px] uppercase tracking-widest ${textDim} mb-1`}>YouTube</div>
                                <div className={`text-sm font-bold ${textMain} group-hover:text-[#DC2626] transition-colors`}>@A-I-Mindset</div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};