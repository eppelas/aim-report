import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  // Magnetic Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Function to smooth scroll to the next section
  const scrollToNextSection = () => {
    // Scroll to exactly 1 viewport height down
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
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

    // --- AUTO-NAVIGATION HANDLERS ---
    const handleWheel = (e: WheelEvent) => {
      // Only hijack scroll if we are at the very top of the page
      if (window.scrollY < 50 && e.deltaY > 0) {
        e.preventDefault(); // Stop the slow default scroll
        scrollToNextSection();
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      // Only hijack if at top
      if (window.scrollY < 50) {
        if (e.code === 'Space' || e.code === 'ArrowDown' || e.code === 'PageDown') {
          e.preventDefault(); // Stop jumpy scroll
          scrollToNextSection();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKey);

    return () => {
      ctx.revert();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);
  
  // Apply Tilt with GSAP for smoothness
  useEffect(() => {
     if (titleRef.current) {
         gsap.to(titleRef.current, {
             rotationY: tilt.x * 20, // Tilt Intensity X
             rotationX: -tilt.y * 20, // Tilt Intensity Y
             duration: 0.5,
             ease: "power2.out"
         });
     }
  }, [tilt]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] perspective-[1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Grid - Red/Gray mix */}
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
        <h1 ref={titleRef} className="text-[9vw] leading-[0.9] font-black tracking-tighter text-[#F5F5F5] uppercase mix-blend-normal will-change-transform drop-shadow-2xl">
          AI Mindset<br />2026 report
        </h1>
        <div ref={subtitleRef} className="mt-8 flex flex-col items-center transform translate-z-10">
            <span className="inline-block w-12 h-[2px] bg-[#DC2626] mb-4"></span>
            <p className="text-xl md:text-2xl font-mono font-medium tracking-widest text-[#737373] uppercase">
            the context gap
            </p>
        </div>
      </div>
      
      {/* Interactive Magnetic Button/Indicator */}
      <div 
         className="absolute bottom-10 group cursor-pointer transition-transform duration-300 hover:scale-110"
         onClick={scrollToNextSection}
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Pulse Ring */}
            <div className="absolute inset-0 rounded-full border border-red-500/30 animate-ping group-hover:border-red-500/60"></div>
            {/* Magnetic Circle */}
            <div className="absolute inset-0 rounded-full bg-transparent border border-neutral-700 group-hover:bg-[#DC2626] group-hover:border-[#DC2626] transition-colors duration-300"></div>
            {/* Arrow */}
            <svg className="relative z-10 w-6 h-6 text-[#DC2626] group-hover:text-white transition-colors duration-300 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M7 13L12 18L17 13M7 6L12 11L17 6" />
            </svg>
        </div>
      </div>

    </section>
  );
};