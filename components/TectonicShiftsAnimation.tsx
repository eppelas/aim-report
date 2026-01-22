import React, { useLayoutEffect, useRef, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../hooks/useI18n';

gsap.registerPlugin(ScrollTrigger);

// --- 1. OPTIMIZED CORE GEOMETRY ---
const CoreGeometry = React.memo(({ color, shape }: { color: string, shape: 'square' | 'circle' }) => {
    const isSquare = shape === 'square';
    // Use the passed color (Red #DC2626) for strokes instead of white to restore the "Red Squares" look
    const strokeColor = isSquare ? color : "#fff"; 
    
    return (
      <g>
        {/* Base Glow */}
        {isSquare ? (
             <rect x="-180" y="-180" width="360" height="360" rx="20" fill="none" stroke={color === '#DC2626' ? 'url(#aiGradient)' : 'url(#scanGradient)'} strokeWidth="1" opacity="0.2" />
        ) : (
             <circle r="180" fill="none" stroke={color === '#DC2626' ? 'url(#aiGradient)' : 'url(#scanGradient)'} strokeWidth="1" opacity="0.1" />
        )}

        {/* Main Structural Ring/Box */}
        {isSquare ? (
            <rect className="core-ring" x="-100" y="-100" width="200" height="200" fill="none" stroke={color} strokeWidth="3" strokeDasharray="40 10" />
        ) : (
            <circle className="core-ring" r="100" fill="none" stroke={color} strokeWidth="2" strokeDasharray="40 10" />
        )}

        {/* Outer Detail Ring/Box - RESTORED RED STROKE FOR SQUARE */}
        {isSquare ? (
            <rect x="-140" y="-140" width="280" height="280" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
        ) : (
            <circle r="140" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.3" />
        )}

        {/* Axial Connectors */}
        <path d="M-160 0 L-120 0 M120 0 L160 0 M0 -160 L0 -120 M0 120 L0 160" stroke={color} strokeWidth="2" />

        {/* Inner Filled Core - RESTORED RED STROKE FOR SQUARE */}
        {isSquare ? (
            <rect x="-60" y="-60" width="120" height="120" fill="rgba(0,0,0,0.8)" stroke={color} strokeWidth="2" />
        ) : (
            <circle r="60" fill="rgba(0,0,0,0.5)" stroke="#fff" strokeWidth="1" />
        )}

        {/* Inner Detail Element */}
        {isSquare ? (
            <rect x="-40" y="-40" width="80" height="80" fill="none" stroke={color} strokeWidth="2" transform="rotate(45)" />
        ) : (
            <circle r="40" fill="none" stroke={color} strokeWidth="2" strokeDasharray="5 5" />
        )}
      </g>
    );
});

interface TectonicShiftsProps {
  onOpenReport?: () => void;
  lang?: 'en' | 'ru' | 'by' | 'ro';
}

export const TectonicShifts: React.FC<TectonicShiftsProps> = ({ onOpenReport, lang = 'en' }) => {
  const i18n = useI18n(lang);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const mouseGroupRef = useRef<SVGGElement>(null); 
  const gridGroupRef = useRef<SVGGElement>(null);
  
  // Core Refs
  const centerShapeRef = useRef<SVGGElement>(null);
  const coreLeftRef = useRef<SVGGElement>(null);
  const coreRightRef = useRef<SVGGElement>(null);
  
  // Parallax Refs
  const parallaxLeftRef = useRef<SVGGElement>(null);
  const parallaxRightRef = useRef<SVGGElement>(null);

  // Signal Refs
  const signalRedRef = useRef<SVGPathElement>(null);
  const signalWhiteRef = useRef<SVGPathElement>(null);
  
  // Visual Metaphor Refs
  const gapGraphRef = useRef<SVGGElement>(null);
  const machineChaosRef = useRef<HTMLDivElement>(null);
  const humanBreathRef = useRef<HTMLDivElement>(null);
  const signalBridgeRef = useRef<HTMLDivElement>(null);

  // Text Refs
  const textIntersectRef = useRef<HTMLDivElement>(null);
  const textMomentRef = useRef<HTMLDivElement>(null);
  const textDivergeRef = useRef<HTMLDivElement>(null);
  const textCreatingRef = useRef<HTMLDivElement>(null); 
  const textGapTitleRef = useRef<HTMLDivElement>(null);
  const textGapDescRef = useRef<HTMLDivElement>(null);
  const textBridgeRef = useRef<HTMLDivElement>(null);
  const textLayersRef = useRef<HTMLDivElement>(null);
  const textManifestoRef = useRef<HTMLDivElement>(null);
  const textShiftsRef = useRef<HTMLDivElement>(null);
  const textReportRef = useRef<HTMLDivElement>(null);
  
  // Report Elements
  const reportTitleRef = useRef<HTMLHeadingElement>(null);
  const subText1Ref = useRef<HTMLParagraphElement>(null);
  const subText2Ref = useRef<HTMLParagraphElement>(null);
  const btnReportRef = useRef<HTMLButtonElement>(null);
  const navInstructionsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  // --- HAPTIC UTILS ---
  const triggerHaptic = (style: 'light' | 'medium' | 'heavy' = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        switch(style) {
            case 'light': navigator.vibrate(10); break;
            case 'medium': navigator.vibrate(20); break;
            case 'heavy': navigator.vibrate(40); break;
        }
    }
  };

  // --- MOUSE INTERACTION ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!mouseGroupRef.current) return;
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;

        gsap.to(mouseGroupRef.current, {
            rotationY: x * 5,  
            rotationX: -y * 5, 
            duration: 1,
            ease: "power2.out"
        });

        if (parallaxLeftRef.current && parallaxRightRef.current) {
             gsap.to(parallaxLeftRef.current, { x: x * 8, y: y * 8, duration: 1, ease: "power2.out" });
             gsap.to(parallaxRightRef.current, { x: -x * 8, y: -y * 8, duration: 1, ease: "power2.out" });
        }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobileLayout(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (containerRef.current) {
        const start = containerRef.current.offsetTop;
        const distance = isMobileLayout ? 7000 : 10000;
        window.scrollTo({ top: start + (progress * distance), behavior: 'smooth' });
    }
  };

  const layersData = [
    { id: 1, title: "FOUNDATION", subtitle: "Energy & Infrastructure", shifts: "3 SHIFTS", desc: "Physics, economics, and power.", details: "Energy infrastructure, agentic labor, data sovereignty.", constraint: "Can we power it? Can we afford it? Who controls it?" },
    { id: 2, title: "COGNITION", subtitle: "Reasoning & Models", shifts: "3 SHIFTS", desc: "The architecture of meaning and reason.", details: "Reasoning models, knowledge systems, scientific discovery.", constraint: "Can we trust how it thinks? Can we verify its logic?" },
    { id: 3, title: "INTERFACE", subtitle: "Agents & Context", shifts: "3 SHIFTS", desc: "Craft, matter, and defense. How we build and protect.", details: "Coding tools, physical intelligence, security systems.", constraint: "Can we maintain what we build? Can we defend against what we create?" },
    { id: 4, title: "HUMANITY", subtitle: "Integration & Outcome", shifts: "2 SHIFTS", desc: "Narrative and intimacy. What keeps us human.", details: "Storytelling, relationships, meaning-making.", constraint: "Can we preserve agency? Can we stay connected?" }
  ];

  const getLayerData = (id: number | null) => layersData.find(l => l.id === id);
  const hoveredData = getLayerData(hoveredLayer);
  const selectedData = getLayerData(selectedLayer);

  const gridLines = useMemo(() => {
      const lines = [];
      const size = 1000;
      const step = 50;
      const center = size / 2;
      for (let x = 0; x <= size; x += step) lines.push(<path key={`v-${x}`} className="v-grid-line" d={`M ${x} 0 L ${x} ${size}`} fill="none" stroke={x === center ? "#DC2626" : "rgba(245, 245, 245, 0.2)"} strokeWidth={x === center ? 2 : 0.5} />);
      for (let y = 0; y <= size; y += step) lines.push(<path key={`h-${y}`} className="h-grid-line" d={`M 0 ${y} L ${size} ${y}`} fill="none" stroke={y === center ? "#DC2626" : "rgba(245, 245, 245, 0.2)"} strokeWidth={y === center ? 2 : 0.5} />);
      return lines;
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const t = {
        intersectIn: 0, 
        separateStart: isMobile ? 0.3 : 0.5, 
        separateDur: isMobile ? 0.8 : 1.5,
        momentIn: isMobile ? 0.6 : 1.0,      
        momentDur: isMobile ? 0.8 : 1.5,
        phase1Out: isMobile ? 1.5 : 2.5,     
        divergeStart: isMobile ? 1.6 : 2.8,  
        divergeDur: isMobile ? 0.8 : 1.5,
        gapAfterDiverge: isMobile ? 0.4 : 1.0,
    };

    const ctx = gsap.context(() => {
      gsap.set(container, { autoAlpha: 1 });

      const vPaths = gsap.utils.toArray<SVGPathElement>('.v-grid-line');
      const hPaths = gsap.utils.toArray<SVGPathElement>('.h-grid-line');
      const hudElements = gsap.utils.toArray<SVGElement>('.hud-element');
      
      gsap.set([...vPaths, ...hPaths], { strokeDasharray: 1500, strokeDashoffset: 1500, opacity: 0.6, strokeWidth: 0.5, stroke: "rgba(245, 245, 245, 0.5)" });
      gsap.set(svgContainerRef.current, { rotationX: 0, rotationZ: 0, scale: 0.8, y: 0 });
      gsap.set(centerShapeRef.current, { scale: 1, opacity: 1 }); 
      gsap.set([coreLeftRef.current, coreRightRef.current], { scale: 0, opacity: 0, x: 0, y: 0 });
      gsap.set(hudElements, { opacity: 0, scale: 0.5 });
      gsap.set(progressBarRef.current, { scaleX: 0 });

      const allTexts = [textIntersectRef.current, textMomentRef.current, textDivergeRef.current, textCreatingRef.current, textGapTitleRef.current, textGapDescRef.current, textBridgeRef.current, textLayersRef.current, textManifestoRef.current, textShiftsRef.current, textReportRef.current];
      gsap.set(allTexts, { autoAlpha: 0 });
      
      gsap.set(textMomentRef.current, { y: 100 });
      gsap.set(textLayersRef.current, { x: -50 }); 
      gsap.set(textBridgeRef.current, { y: -50 }); 
      gsap.set(textDivergeRef.current, { y: -120, scale: 0.8, opacity: 0 });
      gsap.set(textManifestoRef.current, { y: 20, opacity: 0 });
      gsap.set(btnReportRef.current, { autoAlpha: 0, y: 50 }); 
      gsap.set(navInstructionsRef.current, { autoAlpha: 0, y: 50 });
      gsap.set([subText1Ref.current, subText2Ref.current], { y: 20, opacity: 0 });
      gsap.set(reportTitleRef.current, { scale: 0.9, opacity: 0 });
      
      // Initialize Graph as Hidden using autoAlpha to fix visibility issue
      if (gapGraphRef.current) {
         gsap.set(gapGraphRef.current, { autoAlpha: 0, scale: 0.8 });
         const paths = gapGraphRef.current.querySelectorAll('path');
         const lines = gapGraphRef.current.querySelectorAll('line');
         if (paths.length > 0) gsap.set(paths, { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 });
         if (lines.length > 0) gsap.set(lines, { strokeDasharray: 50, strokeDashoffset: 50, opacity: 0 });
      }

      // Hide the extra signal lines completely
      gsap.set([signalRedRef.current, signalWhiteRef.current], { autoAlpha: 0 });

      if (signalBridgeRef.current) {
          const mainPath = signalBridgeRef.current.querySelector('.signal-path-main');
          const glowPath = signalBridgeRef.current.querySelector('.signal-path-glow');
          const particles = signalBridgeRef.current.querySelectorAll('.signal-particle');
          if (mainPath) gsap.set(mainPath, { strokeDasharray: 300, strokeDashoffset: 300, opacity: 0.3 });
          if (glowPath) gsap.set(glowPath, { strokeDasharray: 100, strokeDashoffset: 300, opacity: 0 });
          if (particles) gsap.set(particles, { opacity: 0, scale: 0 });
      }

      if (machineChaosRef.current) {
        const rings = machineChaosRef.current.querySelectorAll('.chaos-ring');
        if (rings.length > 0) gsap.to(rings, { rotation: 360, duration: 8, repeat: -1, ease: "linear", stagger: { amount: 2, from: "random" } });
      }
      if (humanBreathRef.current) {
         const circles = humanBreathRef.current.querySelectorAll('.breath-circle');
         if (circles.length > 0) gsap.to(circles, { scale: 1.4, opacity: 0.3, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5 });
      }

      // --- MAIN TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: isMobile ? '+=7000' : '+=10000', 
          pin: true,
          scrub: 2, 
          anticipatePin: 1,
          onUpdate: (self) => {
             if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${self.progress})`;
          }
        }
      });

      // PHASE 1: MOMENT
      tl.to([...vPaths, ...hPaths], { strokeDashoffset: 0, duration: 0.3, ease: "power1.out" }, 0);
      tl.to(textIntersectRef.current, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" }, 0);
      
      tl.to(textIntersectRef.current, { y: -220, opacity: 0.5, scale: 0.8, duration: t.separateDur, ease: "power2.inOut" }, t.separateStart);
      tl.to(textMomentRef.current, { autoAlpha: 1, scale: 1, y: 220, duration: t.momentDur, ease: "power2.out" }, t.momentIn);
      tl.to([coreLeftRef.current, coreRightRef.current], { scale: 0.8, opacity: 0.8, duration: t.momentDur, ease: "power2.out" }, t.momentIn + 0.5);
      tl.to([textIntersectRef.current, textMomentRef.current], { autoAlpha: 0, y: -150, filter: "blur(10px)", duration: 0.5 }, t.phase1Out);

      // PHASE 2: DIVERGE (FIXED)
      const divergeTime = t.divergeStart; 
      // Force autoAlpha to 1 to ensure visibility
      tl.to(textDivergeRef.current, { autoAlpha: 1, opacity: 0.5, scale: 0.8, y: -120, duration: t.divergeDur, ease: "power2.out" }, divergeTime);
      tl.to(coreLeftRef.current, { x: -20, scale: 1, opacity: 1, duration: t.divergeDur, ease: "power2.out" }, divergeTime);
      tl.to(coreRightRef.current, { x: 20, scale: 1, opacity: 1, duration: t.divergeDur, ease: "power2.out" }, divergeTime);
      tl.to(svgContainerRef.current, { scale: 0.9, duration: 2, ease: "sine.inOut" }, divergeTime);
      
      // Delayed Exit for Diverge - Extended duration to keep it visible
      tl.to(textDivergeRef.current, { autoAlpha: 0, filter: "blur(10px)", scale: 0.9, duration: 0.5 }, divergeTime + t.divergeDur + 2.0);

      // PHASE 2.5: CREATING
      const creatingTime = divergeTime + t.gapAfterDiverge + 1.5; 
      tl.to(textCreatingRef.current, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power2.out" }, creatingTime);
      tl.to(textCreatingRef.current, { autoAlpha: 0, y: -30, duration: 0.5 }, creatingTime + 1.2);

      // PHASE 3: CONTEXT GAP
      const gapTime = creatingTime + 1.2;
      tl.to(svgContainerRef.current, { rotationX: 60, y: 100, duration: 2, ease: "power2.inOut" }, gapTime);
      tl.to(coreLeftRef.current, { x: -250, duration: 2, ease: "power3.inOut" }, gapTime);
      tl.to(coreRightRef.current, { x: 250, duration: 2, ease: "power3.inOut" }, gapTime);
      tl.to(textGapTitleRef.current, { autoAlpha: 1, scale: 1, duration: 1.5, ease: "power2.out" }, gapTime + 0.2);
      
      if (gapGraphRef.current) {
         const paths = gapGraphRef.current.querySelectorAll('path');
         const lines = gapGraphRef.current.querySelectorAll('line');
         // Reveal graph with autoAlpha
         tl.to(gapGraphRef.current, { autoAlpha: 1, scale: 1, duration: 1 }, gapTime + 0.5);
         if (paths.length > 0) tl.to(paths, { strokeDashoffset: 0, opacity: 1, duration: 2, stagger: 0.3, ease: "power2.out" }, gapTime + 0.5);
         if (lines.length > 0) tl.to(lines, { opacity: 0.5, strokeDashoffset: 0, duration: 1.5, stagger: 0.1, ease: "power1.in" }, gapTime + 1.5);
      }
      const gapWord = textGapTitleRef.current?.querySelector('.word-gap');
      if (gapWord) tl.to(gapWord, { "--wdth": 151, duration: 2, ease: "power1.inOut" }, gapTime);

      tl.to(textGapDescRef.current, { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" }, gapTime + 1.8);
      tl.to([textGapTitleRef.current, textGapDescRef.current], { autoAlpha: 0, y: -30, duration: 0.5 }, gapTime + 4.0);
      tl.to(gapGraphRef.current, { opacity: 0, duration: 0.5 }, gapTime + 4.0);

      // PHASE 3.5: BRIDGE
      const bridgeTime = gapTime + 4.0;
      tl.to(svgContainerRef.current, { rotationZ: -10, scale: 0.85, duration: 2, ease: "power2.inOut" }, bridgeTime);
      tl.to(textBridgeRef.current, { autoAlpha: 1, scale: 1, y: -80, duration: 1, ease: "power2.out" }, bridgeTime);
      tl.to(textBridgeRef.current, { autoAlpha: 0, scale: 1.1, filter: "blur(5px)", duration: 0.8 }, bridgeTime + 2.0);

      // PHASE 3.6: LAYERS
      const layersTime = bridgeTime + 2.5;
      tl.to(svgContainerRef.current, { x: 180, scale: 0.8, rotationZ: 0, rotationY: -10, duration: 1.5, ease: "power2.inOut" }, layersTime);
      tl.to(textLayersRef.current, { autoAlpha: 1, x: 0, duration: 1, ease: "power2.out" }, layersTime);
      const layerRows = textLayersRef.current?.querySelectorAll('.layer-row');
      if (layerRows && layerRows.length > 0) {
          gsap.set(layerRows, { opacity: 0, x: -20 });
          tl.to(layerRows, { opacity: 1, x: 0, stagger: 0.15, duration: 0.6, ease: "back.out(1.2)" }, layersTime + 0.3);
      }
      tl.to(textLayersRef.current, { autoAlpha: 0, x: -50, filter: "blur(10px)", duration: 1 }, layersTime + 3.0); // Fast exit

      // PHASE 3.7: SIGNAL & MANIFESTO
      const manifestoTime = layersTime + 3.0; // Overlap start
      tl.to(svgContainerRef.current, { x: 0, rotationY: 0, duration: 1.5, ease: "power2.inOut" }, manifestoTime - 0.5);
      tl.to(coreLeftRef.current, { y: 0, x: -250, rotation: 90, scale: 1, duration: 1.5, ease: "power3.inOut" }, manifestoTime);
      tl.to(coreRightRef.current, { y: 0, x: -120, rotation: -90, scale: 1, duration: 1.5, ease: "power3.inOut" }, manifestoTime);
      tl.to(textManifestoRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, manifestoTime + 0.5);

      const machineGroup = textManifestoRef.current?.querySelector('.machine-group');
      const humanGroup = textManifestoRef.current?.querySelector('.human-group');
      const gapGroup = textManifestoRef.current?.querySelector('.gap-group');
      const quoteGroup = textManifestoRef.current?.querySelector('.quote-group');
      
      if (machineGroup && humanGroup && gapGroup && quoteGroup && signalBridgeRef.current) {
        tl.to(machineGroup, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, manifestoTime + 0.5);
        tl.to(humanGroup, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, manifestoTime + 0.5); 
        
        const mainPath = signalBridgeRef.current.querySelector('.signal-path-main');
        const glowPath = signalBridgeRef.current.querySelector('.signal-path-glow');
        const particles = signalBridgeRef.current.querySelectorAll('.signal-particle');

        if (mainPath) tl.to(mainPath, { opacity: 0.5, strokeDashoffset: 0, duration: 0.5 }, manifestoTime + 0.5);
        if (glowPath) tl.to(glowPath, { opacity: 1, strokeDashoffset: -300, duration: 1.5, ease: "power2.inOut" }, manifestoTime + 0.8);
        if (particles.length > 0) {
            tl.to(particles, { opacity: 1, scale: 1, x: 180, stagger: { amount: 0.5, from: "random" }, duration: 1.2, ease: "power1.out" }, manifestoTime + 0.8);
            tl.to(particles, { opacity: 0, duration: 0.2 }, manifestoTime + 1.8);
        }

        tl.to(gapGroup, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "expo.out" }, manifestoTime + 2.0); 
        tl.to(coreLeftRef.current, { x: -300, duration: 1.5, ease: "back.out(1.0)" }, manifestoTime + 2.0);
        tl.to(coreRightRef.current, { x: -60, duration: 1.5, ease: "back.out(1.0)" }, manifestoTime + 2.0);
        tl.to(quoteGroup, { opacity: 1, y: 0, duration: 0.8 }, manifestoTime + 2.5);
      }

      const manifestoDuration = 4.0; 
      tl.to(textManifestoRef.current, { autoAlpha: 0, filter: "blur(10px)", duration: 0.8 }, manifestoTime + manifestoDuration);
      tl.to([coreLeftRef.current, coreRightRef.current], { x: 0, y: 0, rotation: 0, scale: 1, duration: 1, ease: "power2.inOut" }, manifestoTime + manifestoDuration);

      // PHASE 4: SHIFTS - RESTORED RED GRID GLOW
      const shiftStartTime = manifestoTime + manifestoDuration + 1.0; 
      tl.to(svgContainerRef.current, { x: 0, y: 0, rotationY: 0, scale: 0.8, duration: 1.5, ease: "power2.inOut" }, shiftStartTime - 1.0);
      tl.to([coreLeftRef.current, coreRightRef.current], { x: 0, duration: 0.8, ease: "expo.in" }, shiftStartTime);
      tl.to(hudElements, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 }, shiftStartTime + 0.5);
      tl.to(textShiftsRef.current, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power4.out" }, shiftStartTime + 0.8);

      const mappingText = textShiftsRef.current?.querySelector('.mapping-text');
      const mappingLine = textShiftsRef.current?.querySelector('.mapping-line');
      if (mappingText && mappingLine) {
        tl.to(mappingLine, { scaleX: 1, opacity: 1, duration: 0.6, ease: "expo.out" }, shiftStartTime + 1.0);
        tl.to(mappingText, { autoAlpha: 1, y: 0, letterSpacing: '0.2em', duration: 0.8, ease: "power2.out" }, shiftStartTime + 1.2);
      }

      tl.to(coreLeftRef.current, { y: -80, duration: 2, ease: "power2.inOut" }, shiftStartTime + 1.2);
      tl.to(coreRightRef.current, { y: 80, duration: 2, ease: "power2.inOut" }, shiftStartTime + 1.2);
      tl.to([coreLeftRef.current, coreRightRef.current], { rotation: 10, duration: 2, ease: "power1.inOut"}, shiftStartTime + 1.2);
      tl.to(svgContainerRef.current, { rotationZ: 15, scale: 1.5, duration: 2, ease: "power2.inOut" }, shiftStartTime + 1.2);

      // RESTORE RED GLOWING GRID - Flash red grid lines
      tl.to([...vPaths, ...hPaths], {
          stroke: "#DC2626",
          strokeWidth: 2,
          opacity: 1,
          duration: 0.8,
          stagger: { amount: 1, from: "center" },
          ease: "power2.inOut"
      }, shiftStartTime + 1.2);

      tl.to(textShiftsRef.current, { autoAlpha: 0, scale: 2, opacity: 0, filter: "blur(10px)", duration: 0.5 }, shiftStartTime + 3.0); // Fast exit

      // PHASE 5: REPORT (Color Shift Back to Subtle)
      const reportTime = shiftStartTime + 3.2; 
      tl.to(svgContainerRef.current, { rotationX: 0, rotationZ: 0, scale: 1, y: 0, x: 0, opacity: 0.03, duration: 2, ease: "power3.inOut" }, reportTime);
      tl.to([coreLeftRef.current, coreRightRef.current], { y: 0, rotation: 0, duration: 2, ease: "power3.inOut" }, reportTime);
      
      // GRID CHANGE COLOR - Fade from red back to subtle white/gray
      tl.to([...vPaths, ...hPaths], { 
          opacity: 0.02, 
          stroke: "rgba(245,245,245,0.1)", 
          strokeWidth: 0.5, 
          duration: 1.5,
          ease: "power2.out"
      }, reportTime);

      tl.to(centerShapeRef.current, { opacity: 0.1, duration: 1 }, reportTime);

      tl.to(textReportRef.current, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" }, reportTime);
      // REVEAL CONTENT IMMEDIATELY
      tl.to([subText1Ref.current, subText2Ref.current], { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power3.out" }, reportTime);
      tl.to(btnReportRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" }, reportTime + 0.3);
      tl.to(navInstructionsRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, reportTime + 0.5);
      
      const mouseWheel = navInstructionsRef.current?.querySelector('.mouse-anim');
      if (mouseWheel) gsap.to(mouseWheel, { y: 4, duration: 0.6, repeat: -1, yoyo: true, ease: "power1.inOut" });
      const keyElements = navInstructionsRef.current?.querySelectorAll('.key-anim');
      if (keyElements && keyElements.length > 0) gsap.to(keyElements, { backgroundColor: "#ffffff", color: "#000000", duration: 0.2, stagger: 0.3, repeat: -1, repeatDelay: 2, yoyo: true });

    }, containerRef);
    
    setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    return () => ctx.revert();
  }, [gridLines]);

  return (
    <section 
      id="pinned-svg-section"
      ref={containerRef} 
      className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex items-center justify-center perspective-[1000px] opacity-0 invisible"
      style={{ perspective: '1000px' }} 
      onTouchStart={() => triggerHaptic('light')}
    >
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-10 md:left-10 w-40 h-4 md:h-2 bg-neutral-900/50 hover:bg-neutral-900 backdrop-blur-sm rounded-full overflow-hidden z-50 cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={handleProgressClick}
      >
        <div ref={progressBarRef} className="h-full bg-[#DC2626] w-full origin-left transform scale-x-0" />
      </div>

      <div 
        ref={svgContainerRef}
        className="w-[1000px] h-[1000px] absolute transform-style-3d will-change-transform origin-center z-0"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="transparent"/>
               <stop offset="50%" stopColor="#F5F5F5"/>
               <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="transparent"/>
               <stop offset="50%" stopColor="#DC2626"/>
               <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
          </defs>

          {/* Wrapper Group for Mouse Interactions */}
          <g ref={mouseGroupRef} style={{ transformStyle: 'preserve-3d' }}>
              <g ref={gridGroupRef}>{gridLines}</g>
              
              <g transform="translate(100, 100)" className="hud-element">
                 <path d="M0 0 L20 0 L20 50 L0 50 Z" fill="none" stroke="#737373" strokeWidth="1"/>
                 <text x="30" y="20" fill="#737373" fontSize="12" className="font-mono">GRID_LOCK</text>
              </g>
              <g transform="translate(900, 800)" className="hud-element">
                 <circle r="30" fill="none" stroke="#737373" strokeWidth="1" strokeDasharray="5 5"/>
                 <text x="-40" y="5" fill="#737373" fontSize="12" className="font-mono">SYNC</text>
              </g>
              <g transform="translate(100, 900)" className="hud-element">
                 <rect x="0" y="0" width="10" height="40" fill="#222" />
                 <rect x="15" y="10" width="10" height="30" fill="#333" />
                 <rect x="30" y="20" width="10" height="20" fill="#444" />
              </g>
              
              <g ref={centerShapeRef} transform="translate(500, 500)">
                 {/* Hidden Signals - Kept for reference but hidden via opacity=0 to fix artifacts */}
                 <path 
                    ref={signalRedRef}
                    d="M -90 0 L 90 0" 
                    fill="none" 
                    stroke="#DC2626" 
                    strokeWidth="4" 
                    strokeDasharray="20 200"
                    opacity="0"
                    style={{ filter: "drop-shadow(0 0 5px #DC2626)" }}
                 />
                 <path 
                    ref={signalWhiteRef}
                    d="M 90 20 L -90 20" 
                    fill="none" 
                    stroke="#F5F5F5" 
                    strokeWidth="4" 
                    strokeDasharray="20 200"
                    opacity="0"
                    style={{ filter: "drop-shadow(0 0 5px #FFFFFF)" }}
                 />

                 {/* GAP GRAPH: Initially hidden via opacity and visibility */}
                 <g 
                    ref={gapGraphRef} 
                    transform="translate(0, 50)" 
                    className="pointer-events-none" 
                    opacity="0" 
                    style={{ visibility: 'hidden' }}
                 >
                     <path d="M-300 100 C -200 100, -100 80, 0 0 C 100 -80, 200 -180, 300 -250" fill="none" stroke="#DC2626" strokeWidth="3" opacity="0" />
                     <path d="M-300 100 C -200 100, -100 90, 0 80 C 100 70, 200 40, 300 0" fill="none" stroke="#F5F5F5" strokeWidth="3" opacity="0" />
                     
                     <line x1="0" y1="0" x2="0" y2="80" stroke="#737373" strokeWidth="1" strokeDasharray="5 5" opacity="0" />
                     <line x1="150" y1="-120" x2="150" y2="50" stroke="#737373" strokeWidth="1" strokeDasharray="5 5" opacity="0" />
                     <line x1="300" y1="-250" x2="300" y2="0" stroke="#737373" strokeWidth="1" strokeDasharray="5 5" opacity="0" />
                 </g>

                 {/* LEFT CORE: Timeline -> Parallax */}
                 <g ref={coreLeftRef}>
                     <g ref={parallaxLeftRef}>
                        <CoreGeometry color="#DC2626" shape="square" />
                     </g>
                 </g>

                 {/* RIGHT CORE: Timeline -> Parallax */}
                 <g ref={coreRightRef}>
                     <g ref={parallaxRightRef}>
                        <CoreGeometry color="#F5F5F5" shape="circle" />
                     </g>
                 </g>
              </g>
          </g>
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        
        <div ref={textIntersectRef} className="absolute w-full text-center z-50 p-4 md:p-0 bg-black/40 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none rounded-xl will-change-transform">
          <h2 className="vf-anim text-[8vw] md:text-[5vw] leading-none text-white tracking-wide" style={{"--wght": 300} as React.CSSProperties}>They intersect.</h2>
        </div>
        <div ref={textMomentRef} className="absolute text-center z-50 will-change-transform">
          <p className="vf-anim text-[3vw] md:text-[2vw] text-neutral-400 font-normal tracking-[0.2em] uppercase font-mono" style={{ opacity: 0.8 }}>— for a moment —</p>
        </div>

        {/* UPDATED: DIVERGE is now white and matches intersect style */}
        <div ref={textDivergeRef} className="absolute w-full text-center z-50 p-4 md:p-0 bg-black/40 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none rounded-xl will-change-transform">
           <h2 className="vf-anim text-[8vw] md:text-[5vw] leading-none text-white tracking-wide" style={{"--wght": 300} as React.CSSProperties}>And diverge.</h2>
        </div>

        <div ref={textCreatingRef} className="absolute text-center z-50 will-change-transform">
           <p className="vf-anim text-[15vw] md:text-[3vw] text-[#DC2626] font-black tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,1)] bg-black/60 backdrop-blur-sm px-4 rounded" style={{"--wght": 900} as React.CSSProperties}>Creating...</p>
        </div>

        <div ref={textGapTitleRef} className="absolute text-center w-full px-4 top-[20%] md:top-[30%] z-50 flex flex-col items-center will-change-transform">
          <h2 className="vf-anim text-[10vw] md:text-[8vw] leading-none text-white tracking-tighter drop-shadow-2xl font-sans" style={{"--wght": 700} as React.CSSProperties}>
            THE CONTEXT <span className="word-gap inline-block vf-anim text-[#DC2626]" style={{"--wdth": 25} as React.CSSProperties}>GAP</span>
          </h2>
        </div>

        {/* UPDATED: TECHNICAL TERMINAL STYLE FOR DESCRIPTION - MOVED LOWER */}
        <div ref={textGapDescRef} className="absolute text-center w-full px-4 z-50 top-[60%] md:top-auto md:bottom-[10%] max-w-4xl will-change-transform">
           <div className="relative inline-block border border-white/10 bg-black/80 backdrop-blur-md rounded px-6 py-4">
             {/* Decorative Corners */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>
             
             <p className="font-mono text-xs md:text-sm text-[#DC2626] mb-2 uppercase tracking-widest text-left">{'>> System Definition:'}</p>
             <p className="font-mono text-sm md:text-xl text-neutral-300 tracking-wide leading-relaxed uppercase text-left">
               <span className="text-white">"The distance between</span> the volume of data a machine can generate and the amount of meaning a human can integrate."
               <span className="animate-pulse inline-block w-2 h-4 bg-[#DC2626] ml-2 align-middle"></span>
             </p>
           </div>
        </div>

        {/* UPDATED: HIGH IMPACT HIERARCHY FOR BRIDGE */}
        <div ref={textBridgeRef} className="absolute flex flex-col items-center justify-center w-full px-4 z-50 will-change-transform">
           <p className="font-mono text-xs md:text-sm text-[#DC2626] uppercase tracking-[0.3em] mb-4 bg-red-950/30 border border-red-900/50 px-4 py-1 rounded-full">
              Status Update: Critical
           </p>
           <h2 className="text-[5vw] md:text-[4vw] font-bold text-white leading-none tracking-tighter mb-2">
             THE GAP THAT WE SEE IN
           </h2>
           <h2 className="text-[8vw] md:text-[7vw] font-black text-transparent leading-[0.85] tracking-tighter uppercase font-sans" style={{ WebkitTextStroke: "1px white", "--wght": 900 } as React.CSSProperties}>
             {i18n?.tectonic.title.toUpperCase() || '11 TECTONIC SHIFTS'}
           </h2>
           <p className="font-mono text-sm text-neutral-500 mt-4 tracking-widest uppercase">
              of the AI World
           </p>
        </div>

        <div ref={textLayersRef} className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center pl-[5vw] pr-[5vw] md:pr-0">
            <div className="w-full max-w-7xl px-2 md:px-6 flex items-start gap-12 pointer-events-auto">
                
                <div className="flex flex-col gap-3 w-full max-w-full md:max-w-[450px]">
                   <h3 className="text-[8vw] font-bold text-white mb-8 leading-none tracking-tighter mix-blend-overlay font-sans">
                     In 4 Layers:
                   </h3>
                   {layersData.map((layer) => (
                      <div 
                         key={layer.id}
                         onClick={() => {
                            isMobileLayout && setSelectedLayer(layer.id);
                            triggerHaptic('light');
                         }}
                         onMouseEnter={() => !isMobileLayout && setHoveredLayer(layer.id)}
                         onMouseLeave={() => !isMobileLayout && setHoveredLayer(null)}
                         className={`layer-row group flex items-center gap-6 p-4 md:p-6 border transition-all duration-300 cursor-pointer rounded-r-xl
                            ${(hoveredLayer === layer.id || selectedLayer === layer.id) 
                              ? 'border-red-600/50 bg-red-950/80 md:bg-red-950/30' 
                              : 'border-white/10 bg-neutral-900 md:bg-black/20 hover:bg-white/5'} 
                         `}
                      >
                         <span className={`font-mono text-sm tracking-widest w-8 transition-colors ${(hoveredLayer === layer.id || selectedLayer === layer.id) ? 'text-[#DC2626]' : 'text-neutral-500'}`}>0{layer.id}</span>
                         <div className="flex flex-col gap-1">
                            <span className={`text-xl md:text-2xl font-bold tracking-wide transition-colors ${(hoveredLayer === layer.id || selectedLayer === layer.id) ? 'text-white' : 'text-neutral-300'}`}>
                                {layer.title}
                            </span>
                            <div className="flex justify-between items-center w-full pr-4">
                                <span className="text-neutral-500 text-xs uppercase tracking-widest group-hover:text-neutral-400 transition-colors font-mono">
                                    {layer.subtitle}
                                </span>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="hidden md:block relative flex-1 max-w-lg mt-24 flex flex-col gap-8">
                   <div className="h-[300px] relative">
                     {hoveredData && (
                          <div className="absolute top-0 left-0 w-full p-8 border border-white/20 bg-black/80 backdrop-blur-xl rounded-xl animate-fade-in-up transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                             <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
                                <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse"></div>
                                <span className="text-xs font-mono text-[#EF4444] uppercase tracking-widest">
                                   Layer 0{hoveredData.id}: Analysis
                                </span>
                             </div>
                             
                             <p className="text-lg text-white font-light leading-relaxed mb-6">
                               {hoveredData.desc} <span className="text-neutral-400">{hoveredData.details}</span>
                             </p>
                             
                             <div className="pt-4">
                                <span className="block text-xs font-mono text-[#DC2626] uppercase tracking-widest mb-2 flex items-center gap-2">
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm1 15h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                                  The Constraint
                                </span>
                                <p className="text-md font-bold text-white leading-tight tracking-wide border-l-2 border-[#DC2626] pl-4 py-1">
                                  {hoveredData.constraint}
                                </p>
                             </div>
                          </div>
                     )}
                   </div>
                </div>

            </div>
        </div>
        
        {isMobileLayout && selectedData && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 pointer-events-auto"
              onClick={() => setSelectedLayer(null)}
            >
                <div 
                  className="bg-[#0A0A0A] border border-[#DC2626] p-6 rounded-xl relative w-full max-w-sm shadow-[0_0_50px_rgba(220,38,38,0.3)]"
                  onClick={(e) => e.stopPropagation()} 
                >
                   <button 
                     onClick={() => setSelectedLayer(null)}
                     className="absolute top-4 right-4 text-neutral-500 hover:text-white p-2"
                   >
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                   </button>

                   <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4 pr-8">
                      <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-[#EF4444] uppercase tracking-widest">
                         Layer 0{selectedData.id}
                      </span>
                   </div>
                   
                   <h3 className="text-2xl font-bold text-white mb-4">{selectedData.title}</h3>

                   <p className="text-base text-white font-light leading-relaxed mb-6">
                     {selectedData.desc}
                   </p>
                   
                   <div className="pt-2">
                      <span className="block text-xs font-mono text-[#DC2626] uppercase tracking-widest mb-2">
                        The Constraint
                      </span>
                      <p className="text-sm font-bold text-white leading-tight border-l-2 border-[#DC2626] pl-4 py-1">
                        {selectedData.constraint}
                      </p>
                   </div>
                </div>
            </div>
        )}

        {/* --- MODIFIED MANIFESTO SECTION: RIGHT-ALIGNED LAYOUT --- */}
        <div ref={textManifestoRef} className="absolute inset-0 z-30 pointer-events-none flex items-center justify-end pr-[5vw] md:pr-10">
           
           <div className="relative flex flex-col gap-6 w-full max-w-2xl pointer-events-none z-10 items-end">
              
              {/* SIDE BY SIDE CONTAINER WITH CENTRAL SIGNAL */}
              <div className="flex flex-row w-full justify-center items-center">
                  
                  <div className="machine-group flex flex-col items-end z-10 w-5/12 opacity-0 transform translate-x-10">
                    <div className="w-full relative p-4 md:p-6 border border-red-500/30 bg-black/60 backdrop-blur-md rounded-lg shadow-[0_0_25px_rgba(239,68,68,0.2)] overflow-hidden">
                      <div ref={machineChaosRef} className="absolute inset-0 opacity-20 pointer-events-none">
                          <div className="chaos-ring absolute top-1/2 left-1/2 w-40 h-40 border border-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 border-dashed"></div>
                          <div className="chaos-ring absolute top-1/2 left-1/2 w-32 h-32 border border-red-400 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                      </div>
                      <span className="relative block text-[10px] md:text-[12px] font-mono text-red-400 mb-2 tracking-[0.2em] uppercase z-10 text-right">Input</span>
                      <span className="relative block font-bold text-white text-lg md:text-3xl leading-none z-10 text-right">MACHINE<br/>SIGNAL</span>
                    </div>
                  </div>

                  {/* SIGNAL BRIDGE ANIMATION */}
                  <div ref={signalBridgeRef} className="w-2/12 h-20 relative flex items-center justify-center px-2">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                         <defs>
                            <linearGradient id="signalGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="0">
                                <stop offset="0" stopColor="#DC2626" stopOpacity="0" />
                                <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="1" />
                                <stop offset="1" stopColor="#DC2626" stopOpacity="0" />
                            </linearGradient>
                         </defs>
                         
                         {/* Static Rail - Faint */}
                         <path 
                           className="signal-path-main" 
                           d="M0,30 L60,30 L80,15 L120,45 L140,30 L200,30" 
                           fill="none" 
                           stroke="#DC2626" 
                           strokeWidth="1" 
                           strokeDasharray="5 5" 
                           opacity="0.2" 
                         />
                         
                         {/* Active Pulse - Bright */}
                         <path 
                           className="signal-path-glow" 
                           d="M0,30 L60,30 L80,15 L120,45 L140,30 L200,30" 
                           fill="none" 
                           stroke="url(#signalGradient)" 
                           strokeWidth="3" 
                           strokeLinecap="round"
                           strokeDasharray="100 300" 
                           strokeDashoffset="300"
                           opacity="0"
                           filter="drop-shadow(0 0 5px white)"
                         />
                         
                         {/* Particles */}
                         <circle className="signal-particle" cx="10" cy="30" r="2" fill="#fff" opacity="0" />
                         <circle className="signal-particle" cx="10" cy="30" r="1.5" fill="#DC2626" opacity="0" />
                         <rect className="signal-particle" x="10" y="28" width="4" height="4" fill="#fff" opacity="0" />
                      </svg>
                  </div>

                  {/* HUMAN GROUP - LEFT ALIGNED TEXT */}
                  <div className="human-group flex flex-col items-start text-left z-10 w-5/12 opacity-0 transform translate-x-10">
                    <div className="w-full relative p-4 md:p-6 border border-neutral-500/30 bg-black/60 backdrop-blur-md rounded-lg shadow-[0_0_25px_rgba(255,255,255,0.1)] overflow-hidden">
                      <div ref={humanBreathRef} className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                           <div className="breath-circle absolute w-24 h-24 bg-neutral-200 rounded-full blur-xl"></div>
                           <div className="breath-circle absolute w-16 h-16 border border-neutral-400 rounded-full"></div>
                      </div>
                      <span className="relative block text-[10px] md:text-[12px] font-mono text-neutral-400 mb-2 tracking-[0.2em] uppercase z-10">Response</span>
                      <span className="relative block font-bold text-white text-lg md:text-3xl leading-none z-10">HUMAN<br/>SIGNAL</span>
                    </div>
                  </div>

              </div>

              {/* RIGHT ALIGNED GAP */}
              <div className="gap-group flex flex-col items-center w-full opacity-0 transform translate-y-10 mt-2">
                  <div className="p-4 px-8 border-2 border-[#DC2626] bg-red-950/80 backdrop-blur-md rounded-xl text-center w-full md:w-auto">
                    <span className="block font-black text-[#DC2626] text-2xl md:text-4xl tracking-tighter uppercase font-sans">CONTEXT GAP</span>
                    <span className="block text-xs font-mono text-red-300/80 mt-1 tracking-widest text-center">where coordination breaks</span>
                  </div>
               </div>

               {/* CENTERED QUOTE */}
               <div className="quote-group w-full text-center mt-4 opacity-0 transform translate-y-4">
                  <p className="font-mono text-xs text-neutral-400 leading-relaxed uppercase tracking-wide opacity-80">
                    this is a map of fractures in our reality
                  </p>
               </div>

           </div>

        </div>

        <div ref={textShiftsRef} className="absolute text-center flex flex-col items-center justify-between py-20 w-full h-full z-50 pointer-events-none will-change-transform">
          <div className="mt-[15vh] flex flex-col items-center">
            <h2 className="vf-anim text-[8vw] font-black text-transparent leading-[0.85] tracking-tighter uppercase font-sans mb-8 md:mb-0" style={{ WebkitTextStroke: "1px white", "--wght": 1000 } as React.CSSProperties}>{i18n?.tectonic.title.toUpperCase() || '11 TECTONIC SHIFTS'}</h2>
          </div>

          <div className="flex flex-col items-center mb-10 md:mb-12">
             <div className="mapping-line h-8 w-[1px] bg-white/50 origin-top mb-4 md:mb-4"></div>
             <div className="mapping-text border border-white/20 bg-black/50 px-4 py-1 backdrop-blur-sm">
                <p className="text-xs md:text-sm font-bold text-neutral-300 uppercase tracking-widest font-mono">[ System: Mapping The Fracture ]</p>
             </div>
          </div>
        </div>

        <div ref={textReportRef} className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-auto">
          
          <div className="flex flex-col items-center justify-center flex-1 pt-20 md:pt-0">
              {/* HIDDEN THE ISOLATED "THIS IS THE REPORT" LABEL */}
              <h2 ref={reportTitleRef} className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest mb-6 hidden md:none opacity-0">This is the report.</h2>
              
              <div className="mt-8 flex flex-col items-center gap-2 relative z-10 text-center">
                 {/* Updated typography here */}
                 <p ref={subText1Ref} className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                    machines ↔ humans <span className="text-[#DC2626]">2025</span>
                 </p>
                 <p ref={subText2Ref} className="font-mono text-lg md:text-xl text-neutral-400 tracking-[0.3em] uppercase mt-2">
                    across 4 layers
                 </p>
                 <div className="mt-8 flex items-center justify-center gap-4">
                     <div className="h-[1px] w-20 bg-neutral-500"></div>
                     <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">AI Mindset Annual Report 2025/26</p>
                     <div className="h-[1px] w-20 bg-neutral-500"></div>
                 </div>
              </div>
          </div>
          
          <div className="absolute bottom-12 flex flex-col items-center w-full relative z-10 pb-10">
            <button ref={btnReportRef} 
              className="group relative px-8 py-3 bg-transparent border border-white/30 hover:border-white transition-all duration-500 overflow-hidden cursor-pointer"
              onClick={() => {
                onOpenReport?.();
                triggerHaptic('medium');
              }}
            >
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
               <span className="relative font-mono text-sm tracking-[0.2em] text-white group-hover:text-black transition-colors duration-500 font-bold uppercase">{i18n?.tectonic.viewReport || 'Explore Report'}</span>
            </button>
            
            <div ref={navInstructionsRef} className="mt-6 flex items-center gap-12 text-neutral-500">
               {!isMobileLayout && (
                 <>
                   <div className="flex flex-col items-center gap-3 group cursor-help">
                     <div className="w-5 h-8 border border-neutral-600 rounded-full flex justify-center pt-1.5 transition-colors duration-300 group-hover:border-white group-hover:bg-white/10"><div className="mouse-anim w-1 h-2 bg-neutral-400 rounded-full group-hover:bg-white"></div></div>
                     <span className="text-[10px] uppercase tracking-widest font-mono transition-colors group-hover:text-white">Scroll</span>
                   </div>
                   <div className="h-8 w-[1px] bg-neutral-800"></div>
                   <div className="flex flex-col items-center gap-3">
                     <div className="flex gap-1.5">
                       <div className="key-anim w-12 h-6 border border-neutral-600 rounded flex items-center justify-center text-[9px] font-mono transition-colors duration-200 hover:bg-white hover:text-black cursor-pointer shadow-lg hover:shadow-white/20">SPACE</div>
                       <div className="key-anim w-8 h-6 border border-neutral-600 rounded flex items-center justify-center text-[9px] font-mono transition-colors duration-200 hover:bg-white hover:text-black cursor-pointer shadow-lg hover:shadow-white/20">
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                       </div>
                     </div>
                     <span className="text-[10px] uppercase tracking-widest font-mono">Navigate</span>
                   </div>
                 </>
               )}

               {isMobileLayout && (
                  <div className="flex flex-col items-center gap-3">
                     <div className="flex gap-4">
                        <svg className="w-6 h-6 animate-pulse text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                     </div>
                     <span className="text-[10px] uppercase tracking-widest font-mono text-white">Swipe / Touch</span>
                  </div>
               )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};