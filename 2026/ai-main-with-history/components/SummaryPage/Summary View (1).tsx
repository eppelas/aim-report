
import React, { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShiftMetaphor } from './ShiftMetaphor';

gsap.registerPlugin(ScrollTrigger);

interface SummaryViewProps {
  onNext: () => void;
  onPrev: () => void;
  theme: 'dark' | 'light';
  isDark: boolean;
}

export const SummaryView: React.FC<SummaryViewProps> = ({ onNext, onPrev, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgSvgRef = useRef<SVGSVGElement>(null);
  const rupturePathRef = useRef<SVGPathElement>(null);
  const ruptureContainerRef = useRef<HTMLDivElement>(null);
  
  // Metaphors for background ambiance
  const bgMetaphors = [
      { id: '01', x: 150, y: 150, scale: 1.5, opacity: 0.1 }, // Energy
      { id: '03', x: 850, y: 200, scale: 1.2, opacity: 0.1 }, // Sovereignty
      { id: '07', x: 200, y: 800, scale: 1.8, opacity: 0.08 }, // Craft
      { id: '11', x: 800, y: 700, scale: 1.4, opacity: 0.1 }, // Intimacy
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

  // --- MOUSE PHYSICS FOR RUPTURE LINE ---
  useEffect(() => {
    let animationFrameId: number;
    // Create points for the line strip
    const points = Array.from({ length: 40 }, (_, i) => ({ x: 0, baseY: i * (1000 / 39) })); 
    
    // Initialize off-screen
    const mouse = { x: -9999, y: -9999 };
    const ruptureRect = { top: 0, height: 0, width: 0, left: 0 };
    
    // STRICT ALIGNMENT: 80px width
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

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };
    
    const animateRupture = () => {
        if (!rupturePathRef.current) return;

        updateRuptureRect(); 
        
        const pathData = points.map((p, i) => {
            // Map Point Y (0-1000) to Screen Y
            const pointScreenY = ruptureRect.top + (p.baseY / 1000) * ruptureRect.height;
            const distY = Math.abs(mouse.y - pointScreenY);
            
            let offsetX = 0;
            const interactionDist = 150; // Much tighter interaction radius
            
            if (distY < interactionDist && mouse.x > -100) {
                // Calculate intensity
                const intensity = Math.pow(1 - (distY / interactionDist), 2);
                
                const centerX = ruptureRect.left + (ruptureRect.width / 2);
                
                // Repel logic
                const dirX = mouse.x < centerX ? 1 : -1; 
                
                // Reduced noise
                const noise = (Math.random() - 0.5) * 1.5; 
                
                // REDUCED max distortion to 15px (subtle)
                offsetX = (dirX * intensity * 15) + noise; 
            } else {
                 // Minimal idle movement
                 const time = Date.now() * 0.001; 
                 const wave = Math.sin(i * 0.1 + time); 
                 offsetX = wave * 0.5; 
            }

            // Higher damping (0.1) for faster stabilization/less floaty
            p.x += (offsetX - p.x) * 0.1;

            return `${i === 0 ? 'M' : 'L'} ${SVG_CENTER + p.x} ${p.baseY}`; 
        }).join(' ');

        rupturePathRef.current.setAttribute('d', pathData);
        animationFrameId = requestAnimationFrame(animateRupture);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', updateRuptureRect);
    window.addEventListener('resize', updateRuptureRect);
    animationFrameId = requestAnimationFrame(animateRupture);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', updateRuptureRect);
        window.removeEventListener('resize', updateRuptureRect);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- BACKGROUND PARALLAX ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!bgSvgRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        
        gsap.to(bgSvgRef.current.querySelectorAll('.bg-metaphor'), {
            x: (i) => x * (i % 2 === 0 ? 1 : -1), // Opposite directions
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
        gsap.fromTo(ruptureContainerRef.current, 
            { scaleY: 0, opacity: 0 },
            { 
                scaleY: 1, 
                opacity: 1,
                duration: 2, 
                ease: "power3.inOut",
                scrollTrigger: { trigger: ".gap-list-container", start: "top 70%", end: "bottom 80%", scrub: false }
            }
        );

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

  const bgCol = isDark ? 'bg-[#0A0A0A]' : 'bg-[#F4F4F5]';
  const textMain = isDark ? 'text-white' : 'text-neutral-900';

  const renderTrendText = () => {
      const text = "The trend is: as energy becomes the primary bottleneck, AI agents with wallets will emerge as autonomous economic actors within a landscape of fragmented regional sovereignty and embedded ideology. Synthetic data saturation will shift the focus toward provenance literacy, while users navigate context obesity and orchestration anxiety. In this zero-trust environment, privacy will serve as a status symbol, fueling a crisis of authorship and the mainstream acceptance of synthetic intimacy.";
      
      const highlights = ["energy", "bottleneck", "agents", "wallets", "sovereignty", "ideology", "synthetic", "provenance", "context obesity", "privacy", "authorship", "intimacy"];
      
      return text.split(' ').map((word, i) => {
          const cleanWord = word.replace(/[.,]/g, '');
          const isHighlight = highlights.some(h => cleanWord.toLowerCase().includes(h) || h.includes(cleanWord.toLowerCase()));
          
          return (
              <span key={i} className={`trend-word inline-block mr-[0.3em] ${isHighlight ? 'text-[#DC2626] font-bold' : 'text-neutral-200'} transition-colors duration-300 hover:text-white`}>
                  {word}
              </span>
          );
      });
  };

  return (
    <div ref={containerRef} className={`relative w-full min-h-[200vh] ${bgCol} overflow-hidden font-sans`}>
      
      <div className="fixed inset-0 pointer-events-none z-0">
          <svg ref={bgSvgRef} viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-30">
              {bgMetaphors.map((m, i) => (
                  <g key={i} className="bg-metaphor" transform={`translate(${m.x}, ${m.y}) scale(${m.scale})`} style={{ opacity: m.opacity }}>
                      <ShiftMetaphor id={m.id} isDark={isDark} />
                  </g>
              ))}
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] opacity-90"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full pt-32 pb-32">
          
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
              <div className="sub-header-anim">
                  <p className="font-mono text-[#737373] text-sm uppercase tracking-[0.4em]">2025 → 2026</p>
              </div>
          </div>

          <div className="trend-container w-full max-w-4xl px-6 mb-32 relative z-10">
              <div className="trend-bg bg-neutral-900/60 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#DC2626] opacity-10 blur-[80px] rounded-full pointer-events-none"></div>
                  <p className="font-mono text-lg md:text-xl leading-loose tracking-wide opacity-90 text-justify md:text-left relative z-10">
                       {renderTrendText()}
                  </p>
              </div>
          </div>

          {/* --- GAP LIST CONTAINER --- */}
          {/* Reduced margin-bottom significantly to 24 to bring Quote closer */}
          <div className="gap-list-container relative w-full max-w-7xl px-4 mb-24">
              
              {/* Rupture Line: 80px Width Strict */}
              <div ref={ruptureContainerRef} className="absolute left-1/2 top-0 bottom-0 w-[80px] -translate-x-1/2 pointer-events-none h-full z-0">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 80 1000" preserveAspectRatio="none">
                      <path 
                        ref={rupturePathRef}
                        d="" // Populated by JS
                        fill="none" 
                        stroke="#DC2626" 
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        filter="drop-shadow(0 0 5px #DC2626)"
                      />
                  </svg>
              </div>

              {/* Tighter Spacing: space-y-4 */}
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

                          {/* Center Spacer with Dots */}
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


          {/* --- FINAL QUOTE --- */}
          <div className="final-quote-container w-full max-w-5xl px-8 text-center mb-10 relative">
              <div className="relative inline-block">
                <div className="absolute -top-8 -left-12 text-[#DC2626] text-6xl opacity-20 font-serif">“</div>
                <h2 className="final-quote text-3xl md:text-5xl font-black leading-tight tracking-tight text-white relative z-10">
                    The gap between what machines generate and what humans can integrate is the <span className="text-[#DC2626] underline decoration-2 underline-offset-8">defining challenge</span> of our time.
                </h2>
                <div className="absolute -bottom-12 -right-12 text-[#DC2626] text-6xl opacity-20 font-serif">”</div>
              </div>
              
              {/* Increased top margin to 64 to push buttons down */}
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
