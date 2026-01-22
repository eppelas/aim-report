
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BackgroundLayer } from './BackgroundLayer';
import { TrendText } from './TrendText';
import { GapList } from './GapList';

gsap.registerPlugin(ScrollTrigger);

interface SummaryViewProps {
  onNext: () => void;
  onPrev: () => void;
  theme: 'dark' | 'light';
  isDark: boolean;
}

export const SummaryView: React.FC<SummaryViewProps> = ({ onNext, onPrev, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const bgCol = isDark ? 'bg-[#0A0A0A]' : 'bg-[#F4F4F5]';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        
        // --- 1. HEADER ANIMATION ---
        gsap.fromTo(".main-header", 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
        );
        gsap.fromTo(".sub-header-anim", 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.8 }
        );

        // --- 2. TREND TEXT HIGHLIGHTS ---
        gsap.from(".trend-bg", {
            scrollTrigger: { trigger: ".trend-container", start: "top 80%" },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
        
        gsap.from(".trend-word", {
            scrollTrigger: { trigger: ".trend-container", start: "top 80%" },
            opacity: 0,
            y: 10,
            stagger: 0.005,
            duration: 0.5,
            delay: 0.3
        });

        // --- 3. RUPTURE LINE REVEAL ---
        // Rupture line animates via its own internal physics, but we can trigger fade-in via GapList logic if needed.

        // --- 4. GAP ITEMS ---
        const rows = gsap.utils.toArray('.gap-row');
        rows.forEach((row: any, i) => {
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

        // --- 5. FINAL QUOTE ---
        gsap.from(".final-quote", {
            scrollTrigger: { trigger: ".final-quote-container", start: "top 75%" },
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full min-h-[200vh] ${bgCol} overflow-hidden font-sans`}>
      
      {/* Background with Metaphors */}
      <BackgroundLayer isDark={isDark} />

      <div className="relative z-10 flex flex-col items-center w-full pt-32 pb-32">
          
          {/* --- 1. HEADER --- */}
          <div className="w-full max-w-7xl mb-24 relative text-center px-4 flex flex-col items-center">
              <div className="main-header flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
                  <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
                      MACHINES
                  </h1>
                  <span className="text-4xl md:text-6xl text-[#DC2626] font-light">↔</span>
                  <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px white' }}>
                      HUMANS
                  </h1>
              </div>
              <div className="sub-header-anim flex flex-col items-center gap-3">
                  <p className="font-mono text-[#DC2626] text-xs uppercase tracking-[0.2em] border border-[#DC2626] px-3 py-1 rounded-full bg-[#DC2626]/10">Summarised</p>
                  <p className="font-mono text-[#737373] text-sm uppercase tracking-[0.4em]">2025 → 2026</p>
              </div>
          </div>

          {/* --- 2. TREND TEXT --- */}
          <TrendText />

          {/* --- 3. THE GAP LIST (Interactive Rupture) --- */}
          <GapList isDark={isDark} />

          {/* --- 4. FINAL QUOTE --- */}
          <div className="final-quote-container w-full max-w-5xl px-8 text-center mb-10 relative">
              <div className="relative inline-block">
                <div className="absolute -top-8 -left-12 text-[#DC2626] text-6xl opacity-20 font-serif">“</div>
                <h2 className="final-quote text-3xl md:text-5xl font-black leading-tight tracking-tight text-white relative z-10">
                    The gap between what machines generate and what humans can integrate is the <span className="text-[#DC2626] underline decoration-2 underline-offset-8">defining challenge</span> of our time.
                </h2>
                <div className="absolute -bottom-12 -right-12 text-[#DC2626] text-6xl opacity-20 font-serif">”</div>
              </div>
              
              <div className="flex justify-center mt-64 gap-8 nav-buttons">
                  <button onClick={onPrev} className="px-8 py-4 border border-neutral-800 text-neutral-500 font-mono text-xs uppercase tracking-[0.2em] hover:text-white hover:border-white transition-all">
                      Review
                  </button>
                  <button onClick={onNext} className="px-10 py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#DC2626] hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                      The Manifesto
                  </button>
              </div>
          </div>

      </div>

    </div>
  );
};
