import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ParallaxSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textFrontRef = useRef<HTMLDivElement>(null);
  const textBackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background moves slower than scroll (parallax)
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        yPercent: 30,
        ease: "none"
      });

      // Back text moves slightly faster
      gsap.to(textBackRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        },
        xPercent: 20,
        ease: "none"
      });

      // Front text moves fastest in opposite direction
      gsap.to(textFrontRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        xPercent: -30,
        ease: "none"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[120vh] overflow-hidden bg-neutral-950 flex items-center justify-center">
      
      {/* Abstract Shape Background */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-30 pointer-events-none"
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#333_0%,_transparent_70%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-neutral-700 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] border border-neutral-800 rounded-full"></div>
      </div>

      <div className="relative z-10 w-full px-4">
        {/* Back Layer Text */}
        <div ref={textBackRef} className="text-right opacity-30">
          <h2 
            className="text-[15vw] font-black text-transparent leading-none select-none"
            style={{ WebkitTextStroke: '2px #555' }}
          >
            DEPTH
          </h2>
        </div>

        {/* Front Layer Text */}
        <div ref={textFrontRef} className="text-left">
          <h2 className="text-[15vw] font-black text-white leading-none mix-blend-overlay select-none">
            CONTROL
          </h2>
        </div>
      </div>
    </section>
  );
};