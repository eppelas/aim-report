import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './components/Hero';
import { PinnedSVGSection } from './components/PinnedSVGSection';
import { VariableTextSection } from './components/VariableTextSection';

// Register globally
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  
  useLayoutEffect(() => {
    // Force a refresh once on mount to ensure all start/end positions are calculated correctly
    ScrollTrigger.refresh();
  }, []);

  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <VariableTextSection />
      <PinnedSVGSection />
    </main>
  );
}