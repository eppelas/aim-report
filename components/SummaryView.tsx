import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-config';
import { ShiftMetaphor } from './ShiftMetaphor';
import { useI18n } from '../hooks/useI18n';

interface SummaryViewProps {
  layer?: any;
  shifts?: any;
  onNext: () => void;
  onPrev: () => void;
  onBack?: () => void;
  nextLabel?: string;
  theme: 'dark' | 'light';
  toggleTheme?: () => void;
  lang?: 'en' | 'ru' | 'by' | 'ro';
}

// --- SUBCOMPONENT: RuptureLine ---
const RuptureLine: React.FC = () => {
  const rupturePathRef = useRef<SVGPathElement>(null);
  const ruptureContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const points = Array.from({ length: 40 }, (_, i) => ({ x: 0, baseY: i * (1000 / 39) })); 
    
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const mouse = { x: isTouch ? window.innerWidth / 2 : -9999, y: isTouch ? window.innerHeight / 2 : -9999 };
    const ruptureRect = { top: 0, height: 0, width: 0, left: 0 };
    const SVG_WIDTH = 80; 
    const SVG_CENTER = SVG_WIDTH / 2;

    const updateRuptureRect = () => {
        if (ruptureContainerRef.current) {
            const r = ruptureContainerRef.current.getBoundingClientRect();
            ruptureRect.top = r.top;
            ruptureRect.height = r.height;
            ruptureRect.width = r.width;
            ruptureRect.left = r.left;
        }
    };

    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleTouchMove = (e: TouchEvent) => { if (e.touches.length > 0) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; } };
    
    const animateRupture = () => {
        if (!rupturePathRef.current) return;
        updateRuptureRect(); 
        const pathData = points.map((p, i) => {
            const pointScreenY = ruptureRect.top + (p.baseY / 1000) * ruptureRect.height;
            const distY = Math.abs(mouse.y - pointScreenY);
            let offsetX = 0;
            const interactionDist = 150; 
            
            if (distY < interactionDist && mouse.x > -100) {
                const intensity = Math.pow(1 - (distY / interactionDist), 2);
                const centerX = ruptureRect.left + (ruptureRect.width / 2);
                const dirX = mouse.x < centerX ? 1 : -1; 
                const noise = (Math.random() - 0.5) * 1.5; 
                offsetX = (dirX * intensity * 15) + noise; 
            } else {
                 const time = Date.now() * 0.001; 
                 const wave = Math.sin(i * 0.1 + time); 
                 offsetX = wave * 0.5; 
            }
            p.x += (offsetX - p.x) * 0.1;
            return `${i === 0 ? 'M' : 'L'} ${SVG_CENTER + p.x} ${p.baseY}`; 
        }).join(' ');
        rupturePathRef.current.setAttribute('d', pathData);
        animationFrameId = requestAnimationFrame(animateRupture);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', updateRuptureRect);
    window.addEventListener('resize', updateRuptureRect);
    animationFrameId = requestAnimationFrame(animateRupture);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('scroll', updateRuptureRect);
        window.removeEventListener('resize', updateRuptureRect);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={ruptureContainerRef} className="absolute left-1/2 top-0 bottom-0 w-[80px] -translate-x-1/2 pointer-events-none h-full z-0">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 80 1000" preserveAspectRatio="none">
            <path ref={rupturePathRef} d="" fill="none" stroke="#DC2626" strokeWidth="2" vectorEffect="non-scaling-stroke" filter="drop-shadow(0 0 5px #DC2626)" />
        </svg>
    </div>
  );
};

export const SummaryView: React.FC<SummaryViewProps> = ({ onNext, onPrev, theme, lang = 'en' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgSvgRef = useRef<SVGSVGElement>(null);
  const i18n = useI18n(lang);
  const isDark = theme === 'dark';
  const bgCol = isDark ? 'bg-[#0A0A0A]' : 'bg-[#F4F4F5]';
  const textMain = isDark ? 'text-white' : 'text-neutral-900';
  const gradientColor = isDark ? '#0A0A0A' : '#F4F4F5';

  const bgMetaphors = [
      { id: '01', x: 150, y: 150, scale: 1.5, opacity: 0.1 }, 
      { id: '03', x: 850, y: 200, scale: 1.2, opacity: 0.1 }, 
      { id: '07', x: 200, y: 800, scale: 1.8, opacity: 0.08 },
      { id: '11', x: 800, y: 700, scale: 1.4, opacity: 0.1 },
  ];

  const gapConflicts = [
    { left: "infinite ideas", right: "physical matter" },
    { left: "global internet", right: "sovereign clouds" },
    { left: "machine speed", right: "human bandwidth" },
    { left: "infinite context", right: "finite attention" },
    { left: "algorithmic attack", right: "manual defense" },
    { left: "what ai knows", right: "what ai will say" },
    { left: "attention", right: "care" }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!bgSvgRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        gsap.to(bgSvgRef.current.querySelectorAll('.bg-metaphor'), {
            x: (i) => x * (i % 2 === 0 ? 1 : -1),
            y: (i) => y * (i % 2 === 0 ? 1 : -1),
            duration: 2,
            ease: "power2.out"
        });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(".sub-header-anim", 
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.5 }
        );
        gsap.from(".trend-bg", {
            scrollTrigger: { trigger: ".trend-container", start: "top 80%" },
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
        const rows = gsap.utils.toArray('.gap-row');
        rows.forEach((row: any) => {
            gsap.from(row.querySelector('.gap-left'), {
                x: -30, opacity: 0,
                scrollTrigger: { trigger: row, start: "top 90%" },
                duration: 0.8
            });
            gsap.from(row.querySelector('.gap-right'), {
                x: 30, opacity: 0,
                scrollTrigger: { trigger: row, start: "top 90%" },
                duration: 0.8
            });
        });
        gsap.from(".final-quote", {
            scrollTrigger: { trigger: ".final-quote-container", start: "top 75%" },
            y: 30,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const renderTrendText = () => {
      const text = i18n?.summary.trend || "The trend is: as energy becomes the primary bottleneck, AI agents with wallets will emerge as autonomous economic actors within a landscape of fragmented regional sovereignty and embedded ideology. Synthetic data saturation will shift the focus toward provenance literacy, while users navigate context obesity and orchestration anxiety. In this zero-trust environment, privacy will serve as a status symbol, fueling a crisis of authorship and the mainstream acceptance of synthetic intimacy.";
      const highlights = ["energy", "bottleneck", "agents", "wallets", "sovereignty", "ideology", "synthetic", "provenance", "context obesity", "privacy", "authorship", "intimacy"];
      const baseTextColor = isDark ? 'text-neutral-200' : 'text-neutral-600';
      return text.split(' ').map((word, i) => {
          const cleanWord = word.replace(/[.,]/g, '');
          const isHighlight = highlights.some(h => cleanWord.toLowerCase().includes(h) || h.includes(cleanWord.toLowerCase()));
          return (
              <span key={i} className={`inline-block mr-[0.3em] ${isHighlight ? 'text-[#DC2626] font-bold' : baseTextColor} transition-colors duration-300 hover:text-[#DC2626]`}>
                  {word}
              </span>
          );
      });
  };

  return (
    <div ref={containerRef} className={`relative w-full min-h-[200vh] ${bgCol} overflow-hidden font-sans transition-colors duration-500`}>
      <div className={`fixed inset-0 pointer-events-none z-0 ${bgCol}`}>
          <svg ref={bgSvgRef} viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-30">
              {bgMetaphors.map((m, i) => (
                  <g key={i} className="bg-metaphor" transform={`translate(${m.x}, ${m.y}) scale(${m.scale})`} style={{ opacity: m.opacity }}>
                      <ShiftMetaphor id={m.id} isDark={isDark} />
                  </g>
              ))}
          </svg>
          <div className="absolute inset-0 opacity-95" style={{ background: `linear-gradient(to bottom, ${gradientColor}, transparent 50%, ${gradientColor})` }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full pt-32 pb-32">
          <div className="w-full max-w-7xl mb-24 relative text-center px-4 flex flex-col items-center">
              <div className="main-header flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
                  <h1 className={`text-6xl md:text-8xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>{i18n?.summary.title1 || 'MACHINES'}</h1>
                  <span className="text-4xl md:text-6xl text-[#DC2626] font-light">↔</span>
                  <h1 className={`text-6xl md:text-8xl font-black tracking-tighter text-transparent`} style={{ WebkitTextStroke: `1px ${isDark ? 'white' : 'black'}` }}>{i18n?.summary.title2 || 'HUMANS'}</h1>
              </div>
              <div className="sub-header-anim flex flex-col items-center gap-3">
                  <p className="font-mono text-[#DC2626] text-xs uppercase tracking-[0.2em] border border-[#DC2626] px-3 py-1 rounded-full bg-[#DC2626]/10">{i18n?.summary.badge || 'Summarised'}</p>
                  <p className="font-mono text-[#737373] text-sm uppercase tracking-[0.4em]">{i18n?.summary.period || '2025 → 2026'}</p>
              </div>
          </div>

          <div className="trend-container w-full max-w-4xl px-6 mb-32 relative z-10">
              <div className={`${isDark ? 'bg-neutral-900/60' : 'bg-white/70'} trend-bg backdrop-blur-md border ${isDark ? 'border-white/10' : 'border-black/10'} p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden`}>
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#DC2626] opacity-10 blur-[80px] rounded-full pointer-events-none"></div>
                  <p className={`font-mono text-lg md:text-lg leading-loose tracking-wide opacity-90 text-justify md:text-left relative z-10 ${isDark ? 'text-white' : 'text-black'}`}>
                       {renderTrendText()}
                  </p>
              </div>
          </div>

          <div className="gap-list-container relative w-full max-w-7xl px-4 mb-24">
              <RuptureLine />
              <div className="space-y-4 py-6 relative z-10">
                  {gapConflicts.map((row, i) => (
                      <div key={i} className="gap-row grid grid-cols-[1fr_80px_1fr] items-center group cursor-default">
                          <div className="gap-left text-right pr-4"><span className={`block font-mono font-bold text-xs md:text-base tracking-tight ${textMain} group-hover:text-[#DC2626] transition-colors`}>{row.left}</span></div>
                          <div className="gap-dot relative flex justify-center items-center w-full h-full"><div className="w-1 h-1 bg-[#DC2626] rounded-full opacity-30"></div></div>
                          <div className="gap-right text-left pl-4"><span className={`block font-sans font-light text-sm md:text-lg text-neutral-400 group-hover:text-[#DC2626] transition-colors`}>{row.right}</span></div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="final-quote-container w-full max-w-5xl px-8 text-center mb-10 relative">
              <div className="relative inline-block">
                <div className="absolute -top-8 -left-12 text-[#DC2626] text-6xl opacity-20 font-serif">“</div>
                <h2 className={`final-quote text-3xl md:text-5xl font-black leading-tight tracking-tight ${isDark ? 'text-white' : 'text-black'} relative z-10`}>
                    {i18n?.summary.finalQuote || 'The gap between what machines generate and what humans can integrate is the'} <span className="text-[#DC2626] underline decoration-2 underline-offset-8">{i18n?.summary.finalQuoteHighlight || 'defining challenge'}</span> {i18n?.summary.finalQuoteEnd || 'of our time.'}
                </h2>
                <div className="absolute -bottom-12 -right-12 text-[#DC2626] text-6xl opacity-20 font-serif">”</div>
              </div>
              
              <div className="flex justify-between items-center mt-32 md:mt-64 nav-buttons max-w-4xl mx-auto">
                  <button onClick={onPrev} className="group flex items-center gap-3 hover:opacity-70 transition-opacity">
                    <div className={`w-12 h-12 rounded-full border ${isDark ? 'border-neutral-800' : 'border-neutral-300'} flex items-center justify-center flex-shrink-0`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M15 19l-7-7 7-7"/>
                      </svg>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className={`font-mono text-[10px] tracking-widest ${isDark ? 'text-neutral-500' : 'text-neutral-600'} mb-1 lowercase`}>{i18n?.ui.prev || 'previous'}</span>
                      <span className={`font-sans text-[11px] md:text-base font-semibold ${isDark ? 'text-white' : 'text-black'} max-w-[100px] md:max-w-[200px] line-clamp-2 lowercase leading-tight`}>{i18n?.summary.reviewButton || 'shifts'}</span>
                    </div>
                  </button>
                  <button onClick={onNext} className="group flex items-center gap-3 hover:opacity-70 transition-opacity">
                    <div className="flex flex-col items-end">
                      <span className={`font-mono text-[10px] tracking-widest ${isDark ? 'text-neutral-500' : 'text-neutral-600'} mb-1 lowercase`}>{i18n?.ui.next || 'next'}</span>
                      <span className={`font-sans text-[11px] md:text-base font-semibold ${isDark ? 'text-white' : 'text-black'} max-w-[100px] md:max-w-[200px] line-clamp-2 lowercase leading-tight text-right`}>{i18n?.summary.manifestoButton || 'manifesto'}</span>
                    </div>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#DC2626] flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};