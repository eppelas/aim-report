import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HumanSvg } from './assets/HumanSvg';

export const TunnelSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tunnelGroupRef = useRef<SVGGElement>(null);
  const humanRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<SVGFilterElement>(null);
  
  // Configuration for the tunnel 'gates'
  const gatesCount = 7;
  const gates = Array.from({ length: gatesCount }, (_, i) => i);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- SETUP ---
      const gateElements = gsap.utils.toArray('.tunnel-gate');
      const textElements = gsap.utils.toArray('.floating-text');
      const laserLines = gsap.utils.toArray('.laser-line');
      const floorLines = gsap.utils.toArray('.floor-line');
      const particles = gsap.utils.toArray('.particle');
      
      // Filter Primitive for the "Liquid" effect
      // We look for the feGaussianBlur inside the filterRef
      const blurNode = document.getElementById('liquid-blur-node');

      // Initial states
      gsap.set(gateElements, { 
        transformOrigin: "center center",
        opacity: (i) => 1 - (i * 0.15), 
      });

      // Human starts far away
      gsap.set(humanRef.current, { scale: 0.5, opacity: 0, y: 50 });

      // --- LIQUID REVEAL ANIMATION ---
      // This mimics the effect where assets load as blobs and then sharpen
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Start revealing before we are fully pinned
          end: "top 20%",
          scrub: 1,
        }
      });

      // Animate the stdDeviation of the blur filter from High (Liquid) to 0 (Sharp)
      if (blurNode) {
        revealTl.fromTo(blurNode, 
          { attr: { stdDeviation: "20" } }, // Start very blurry
          { attr: { stdDeviation: "0" }, duration: 2, ease: "power2.inOut" } // End sharp
        );
      }
      
      revealTl.to(humanRef.current, { opacity: 1, duration: 1 }, "<");


      // --- MAIN SCROLL TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1,
        }
      });

      // 1. TUNNEL MOVEMENT
      tl.to(gateElements, {
        scale: (i) => 20 - (i * 2), 
        opacity: (i) => i === 0 ? 0 : 1, 
        stagger: { amount: 2, from: "end" },
        duration: 5,
        ease: "expo.in"
      }, 0);

      // 2. FLOOR & CEILING MOVEMENT
      tl.to(laserLines, { strokeDashoffset: -500, duration: 5, ease: "none" }, 0);
      tl.to(floorLines, { y: 100, opacity: 0, stagger: 0.1, duration: 5 }, 0);

      // 3. HUMAN APPROACH
      tl.to(humanRef.current, {
        scale: 1.1, // Slight growth
        y: 0,
        duration: 5,
        ease: "none" // Linear approach feels more like camera movement
      }, 0);

      // 4. PARTICLES (Floating Dust)
      tl.to(particles, {
        y: (i) => (i % 2 === 0 ? -200 : 200),
        x: (i) => (i % 3 === 0 ? -100 : 100),
        scale: (i) => Math.random() * 3,
        opacity: 0,
        duration: 4,
        ease: "power1.in"
      }, 0);

      // 5. TEXT HUD
      textElements.forEach((text, i) => {
        tl.fromTo(text, 
          { y: 150, opacity: 0, scale: 0.8, filter: "blur(10px)" },
          { 
            y: -100, 
            opacity: 1, 
            scale: 1.2,
            filter: "blur(0px)", // Text also sharpens
            duration: 1.5,
            ease: "power2.out",
          }, 
          i * 0.8 
        );
        tl.to(text, { opacity: 0, filter: "blur(5px)", duration: 0.5 }, (i * 0.8) + 1.2);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-[#0A0A0A] overflow-hidden flex items-center justify-center perspective-[2000px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#0A0A0A_80%)] pointer-events-none" />

      {/* MAIN SVG WORLD */}
      <svg 
        className="w-full h-full absolute inset-0 overflow-visible" 
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* LIQUID REVEAL FILTER */}
          <filter id="liquid-reveal">
            {/* The stdDeviation is animated via GSAP */}
            <feGaussianBlur id="liquid-blur-node" in="SourceGraphic" stdDeviation="0" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>

          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <linearGradient id="gridGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0" />
            <stop offset="20%" stopColor="#DC2626" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* APPLY LIQUID FILTER TO EVERYTHING IN THIS GROUP */}
        <g filter="url(#liquid-reveal)">
            
            <g ref={tunnelGroupRef} transform="translate(960, 540)">
              
              {/* FLOOR GRID (The World) */}
              <g transform="translate(0, 100) perspective(500)">
                 {Array.from({length: 12}).map((_, i) => (
                    <line 
                        key={`floor-${i}`}
                        className="floor-line"
                        x1="-1000" y1={i * 50} 
                        x2="1000" y2={i * 50} 
                        stroke="url(#gridGrad)" 
                        strokeWidth="1"
                        opacity={1 - (i/12)}
                    />
                 ))}
                 {/* Vertical Floor Lines */}
                 {[-600, -300, 0, 300, 600].map((x, i) => (
                    <line 
                        key={`v-floor-${i}`}
                        x1={x} y1="0" x2={x * 5} y2="1000"
                        stroke="#DC2626" strokeOpacity="0.2"
                    />
                 ))}
              </g>

              {/* LASER BEAMS - RED */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <line
                  key={`line-${i}`}
                  className="laser-line"
                  x1="0" y1="0" x2="1200" y2="0"
                  stroke="#DC2626"
                  strokeWidth="2"
                  transform={`rotate(${deg})`}
                  strokeDasharray="20 100"
                  opacity="0.5"
                  filter="url(#glow-strong)"
                />
              ))}

              {/* PARTICLES */}
              {Array.from({length: 20}).map((_, i) => (
                  <circle 
                    key={`p-${i}`}
                    className="particle"
                    cx={(Math.random() - 0.5) * 1500}
                    cy={(Math.random() - 0.5) * 800}
                    r={Math.random() * 3}
                    fill="#F5F5F5"
                  />
              ))}

              {/* TUNNEL GATES */}
              {gates.map((_, i) => {
                const size = 150 + (i * 180); 
                return (
                  <g key={i} className="tunnel-gate">
                    <rect 
                      x={-size/2} 
                      y={-size/2} 
                      width={size} 
                      height={size} 
                      fill="none" 
                      stroke="rgba(255, 255, 255, 0.8)" 
                      strokeWidth={i === 0 ? 1 : 2}
                      filter="url(#glow-strong)"
                    />
                    {/* Corner Markers - RED */}
                    <path d={`M${-size/2} ${-size/2 + 20} V${-size/2} H${-size/2 + 20}`} stroke="#DC2626" fill="none" strokeWidth="3"/>
                    <path d={`M${size/2} ${-size/2 + 20} V${-size/2} H${size/2 - 20}`} stroke="#DC2626" fill="none" strokeWidth="3"/>
                    <path d={`M${-size/2} ${size/2 - 20} V${size/2} H${-size/2 + 20}`} stroke="#DC2626" fill="none" strokeWidth="3"/>
                    <path d={`M${size/2} ${size/2 - 20} V${size/2} H${size/2 - 20}`} stroke="#DC2626" fill="none" strokeWidth="3"/>
                  </g>
                );
              })}
            </g>
        </g>
      </svg>

      {/* HUMAN FIGURE (Independent Layer but affected by liquid transition via logic) */}
      <div 
        ref={humanRef}
        className="absolute z-20 w-[20vw] h-[40vw] pointer-events-none"
        style={{ transformOrigin: 'center bottom' }}
      >
        <HumanSvg />
      </div>

      {/* HUD TEXT - Mono & Red */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
         <div className="floating-text absolute text-[#DC2626] font-mono text-sm tracking-[0.5em] font-bold shadow-black drop-shadow-lg">BIOMETRICS: CONNECTING</div>
         <div className="floating-text absolute text-white font-mono text-xl tracking-widest font-black mix-blend-overlay">WORLD GENERATION: 99%</div>
         <div className="floating-text absolute text-[#EF4444] font-mono text-lg tracking-widest bg-black px-2 border border-[#DC2626]">WARNING: REALITY BREACH</div>
      </div>

    </section>
  );
};