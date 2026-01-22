import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { AnimatedComponentProps } from '../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const SmoothScroll: React.FC<AnimatedComponentProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // 2. Connect to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Sync GSAP Ticker
    // Ensure GSAP runs exactly in sync with Lenis for smooth pinned animations
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // 4. Force refresh ensures ScrollTrigger knows about the scroll container setup
    // Small timeout allows DOM to settle
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="smooth-scroll-content w-full">
      {children}
    </div>
  );
};