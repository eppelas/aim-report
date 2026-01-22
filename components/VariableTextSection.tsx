import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../hooks/useI18n';

// Register globally
gsap.registerPlugin(ScrollTrigger);

interface VariableTextSectionProps {
  lang?: 'en' | 'ru' | 'by' | 'ro';
}

export const VariableTextSection: React.FC<VariableTextSectionProps> = ({ lang = 'en' }) => {
  const i18n = useI18n(lang);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Captions Refs
  const aiTopRef = useRef<HTMLDivElement>(null);
  const aiBotRef = useRef<HTMLDivElement>(null);
  const huTopRef = useRef<HTMLDivElement>(null);
  const huBotRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Elements
      const aiCells = gsap.utils.toArray('.cell-ai');
      const humanCells = gsap.utils.toArray('.cell-human');
      const aiChars = gsap.utils.toArray('.char-ai');
      const humanChars = gsap.utils.toArray('.char-human');

      // --- INITIAL STATE (Set immediately to prevent FOUC) ---
      // AI: Tiny. Human: Dominant.
      gsap.set(aiCells, { flexBasis: "0.5%" });
      gsap.set(humanCells, { flexBasis: "19.8%" });

      // Character Styles - Start
      gsap.set(aiChars, {
        "--wght": 100,      
        "--wdth": 25,       
        "--opsz": 144,      
        scaleX: 0.5,        
        opacity: 1,         
      });

      // Human Styles - Start
      gsap.set(humanChars, {
        "--wght": 1000,
        "--wdth": 151,
        "--opsz": 8,
        scaleX: 1.3,
        opacity: 1,         
      });

      // --- CAPTIONS INITIAL STATE ---
      gsap.set([aiTopRef.current, aiBotRef.current], { 
        x: -150, 
        autoAlpha: 0,
        filter: "blur(10px)"
      });

      gsap.set([huTopRef.current, huBotRef.current], { 
        x: 150, 
        autoAlpha: 0,
        filter: "blur(10px)"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2500",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1
        }
      });

      // --- 1. CORE ANIMATION ---
      
      // Grid Shift
      tl.to(aiCells, {
        flexBasis: "49.75%",
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      tl.to(humanCells, {
        flexBasis: "0.1%", 
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      // Character Transform
      tl.to(aiChars, {
        "--wght": 1000,     
        "--wdth": 151,      
        "--opsz": 50,       
        scaleX: 3.2,        
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      tl.to(humanChars, {
        "--wght": 100,
        "--wdth": 25,
        "--opsz": 144,
        scaleX: 0.5,
        opacity: 1,       
        duration: 1,
        ease: "power2.inOut"
      }, 0);


      // --- 2. CAPTION SEQUENCE ---
      
      const animConfig = {
        x: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out"
      };
      
      // 1. "AI Is Evolving" (From Left)
      tl.to(aiTopRef.current, animConfig, 0.2);
      
      // 2. "Faster. Deeper. Smarter." (From Left, DELAYED)
      tl.to(aiBotRef.current, animConfig, 0.8);
      
      // 3. "Humans Are Reacting" (From Right)
      tl.to(huTopRef.current, animConfig, 0.55);
      
      // 4. "Slower. Overwhelmed. Adapting." (From Right, DELAYED)
      tl.to(huBotRef.current, animConfig, 1.15);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const chars = [
    { id: 'A1', char: 'A', type: 'ai' },
    { id: 'I1', char: 'I', type: 'ai' },
    { id: 'H1', char: 'H', type: 'human' },
    { id: 'U1', char: 'U', type: 'human' },
    { id: 'M1', char: 'M', type: 'human' },
    { id: 'A2', char: 'A', type: 'human' },
    { id: 'N1', char: 'N', type: 'human' },
  ];

  return (
    <div className="relative w-full bg-[#0A0A0A] text-[#F5F5F5]">
      <section 
        ref={containerRef} 
        className="h-screen w-full flex flex-col justify-center px-[2vw] overflow-hidden relative" 
      >
        <div className="flex w-full items-center justify-between h-full">
          {chars.map((item, index) => {
            let justifyClass = "justify-center";
            let originClass = "origin-center";
            let textAlign = "text-center";
            // Red for AI, White for Human
            let colorClass = item.type === 'ai' ? "text-[#DC2626]" : "text-[#F5F5F5]";

            if (index === 0) {
              justifyClass = "justify-start";
              originClass = "origin-left";
              textAlign = "text-left";
            }
            if (index === 1 || index === chars.length - 1) {
              justifyClass = "justify-end";
              originClass = "origin-right";
              textAlign = "text-right";
            }

            return (
              <div 
                key={item.id} 
                className={`cell-${item.type} flex items-center ${justifyClass} h-full relative`}
              >
                <span 
                  className={`char-${item.type} vf-anim ${colorClass} leading-none block will-change-transform ${originClass} ${textAlign} whitespace-nowrap`}
                  style={{ 
                    fontSize: "18vw",
                    width: "100%", 
                    // CSS Vars
                    "--wght": item.type === 'ai' ? 100 : 1000,
                    "--wdth": item.type === 'ai' ? 25 : 151,
                  } as React.CSSProperties}
                >
                  {item.char}
                </span>
              </div>
            );
          })}
        </div>

        {/* --- CAPTIONS --- */}
        
        {/* AI TOP */}
        <div 
          ref={aiTopRef}
          className="absolute left-[2vw] pointer-events-none origin-left"
          style={{ top: 'calc(50% - 11vw)' }}
        >
          <p className="font-sans text-[#F5F5F5] text-2xl md:text-4xl uppercase tracking-tighter font-black leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            {i18n?.variable.aiEvolving || 'AI Is Evolving'}
          </p>
        </div>

        {/* AI BOTTOM */}
        <div 
          ref={aiBotRef}
          className="absolute left-[2vw] pointer-events-none origin-left"
          style={{ top: 'calc(50% + 11vw)' }}
        >
          <p className="font-sans text-[#DC2626] text-sm md:text-lg font-bold uppercase tracking-wider leading-tight">
            {i18n?.variable.aiFaster || 'Faster. Deeper. Smarter.'}
          </p>
        </div>

        {/* HUMAN TOP */}
        <div 
          ref={huTopRef}
          className="absolute right-[2vw] text-right pointer-events-none origin-right flex flex-col items-end"
          style={{ top: 'calc(50% - 11vw)' }}
        >
          <p className="font-sans text-[#F5F5F5] text-2xl md:text-4xl uppercase tracking-tighter font-black leading-none">
            {i18n?.variable.humanReacting || 'Humans Are Reacting'}
          </p>
        </div>

        {/* HUMAN BOTTOM */}
        <div 
          ref={huBotRef}
          className="absolute right-[2vw] text-right pointer-events-none origin-right flex flex-col items-end"
          style={{ top: 'calc(50% + 11vw)' }}
        >
          <p className="font-sans text-neutral-400 text-sm md:text-lg font-bold uppercase tracking-wider leading-tight">
            {i18n?.variable.humanSlower || 'Slower. Overwhelmed. Adapting.'}
          </p>
        </div>

      </section>
    </div>
  );
};