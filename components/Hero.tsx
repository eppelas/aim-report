import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useI18n } from '../hooks/useI18n';

interface HeroProps {
  lang?: 'en' | 'ru' | 'by' | 'ro';
}

export const Hero: React.FC<HeroProps> = ({ lang = 'en' }) => {
  const i18n = useI18n(lang);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  // Magnetic Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Magnetic Hover Logic
  const handleMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height, left, top } = currentTarget.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      setTilt({ x, y });
  };
  
  const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Intro Animation
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.2,
      })
      .from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=1');
      
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);
  
  // Apply Tilt with GSAP
  useEffect(() => {
     if (titleRef.current) {
         gsap.to(titleRef.current, {
             rotationY: tilt.x * 20,
             rotationX: -tilt.y * 20,
             duration: 0.5,
             ease: "power2.out"
         });
     }
  }, [tilt]);

  // Scroll to next section smoothly
  const handleButtonClick = () => {
      window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
      });
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] perspective-[1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DC2626" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
      </div>

      <div className="z-10 text-center px-4" style={{ transformStyle: 'preserve-3d' }}>
        {/* Tighter tracking for headlines (-0.05em) makes them feel bigger and more authoritative */}
        <h1 ref={titleRef} className="text-[10vw] md:text-[9vw] leading-[0.85] font-black tracking-tighter text-[#F5F5F5] uppercase mix-blend-normal will-change-transform drop-shadow-2xl font-sans">
          {i18n?.hero.title || 'AI Mindset 2026 report'}
        </h1>
        <div ref={subtitleRef} className="mt-8 flex flex-col items-center transform translate-z-10">
            <span className="inline-block w-12 h-[2px] bg-[#DC2626] mb-4"></span>
            {/* Wider tracking for small text (0.25em) improves readability and creates "tech" feel */}
            <p className="text-sm md:text-xl font-mono font-medium tracking-[0.25em] text-[#737373] uppercase">
            {i18n?.hero.subtitle || 'the context gap'}
            </p>
        </div>
      </div>
      
      {/* Interactive Magnetic Button */}
      <div 
         className="absolute bottom-10 group cursor-pointer transition-transform duration-300 hover:scale-110"
         onClick={handleButtonClick}
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-red-500/30 animate-ping group-hover:border-red-500/60"></div>
            <div className="absolute inset-0 rounded-full bg-transparent border border-neutral-700 group-hover:bg-[#DC2626] group-hover:border-[#DC2626] transition-colors duration-300"></div>
            <svg className="relative z-10 w-6 h-6 text-[#DC2626] group-hover:text-white transition-colors duration-300 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M7 13L12 18L17 13M7 6L12 11L17 6" />
            </svg>
        </div>
      </div>

    </section>
  );
};