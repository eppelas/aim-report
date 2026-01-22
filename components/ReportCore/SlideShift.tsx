
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ShiftData } from './data';
import { Visuals } from './Visuals';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface SlideShiftProps {
  data: ShiftData;
  onNext: () => void;
  onPrev: () => void;
  nextLabel?: string;
  prevLabel?: string;
  isDark: boolean;
}

export const SlideShift: React.FC<SlideShiftProps> = ({ data, onNext, onPrev, nextLabel, prevLabel, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSource, setSelectedSource] = useState<any | null>(null);

  // Refs for logic
  const tectonicBgRef = useRef<SVGSVGElement>(null);
  const plate1Ref = useRef<SVGRectElement>(null);
  const plate2Ref = useRef<SVGRectElement>(null);
  const tectonicSvgRef = useRef<SVGSVGElement>(null);
  
  // Physics State
  const mousePos = useRef({ x: 0, y: 0 }); 
  const plate1Pos = useRef({ x: 0, y: 0 });
  const plate2Pos = useRef({ x: 0, y: 0 });

  // Columns positions for physics
  const machinePosRef = useRef({ x: 250, y: 150 }); 
  const humanPosRef = useRef({ x: 750, y: 350 });
  const gapPosRef = useRef({ x: 500, y: 1100 });

  // --- PHYSICS BASED ANIMATION ---
  useEffect(() => {
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
        mousePos.current = {
            x: (e.clientX / window.innerWidth) * 2 - 1,
            y: (e.clientY / window.innerHeight) * 2 - 1
        };
    };

    const animateScene = () => {
        if (plate1Ref.current && plate2Ref.current) {
            const targetP1X = mousePos.current.x * -40; 
            const targetP1Y = mousePos.current.y * -20;
            const targetP2X = mousePos.current.x * 40;  
            const targetP2Y = mousePos.current.y * 20;

            plate1Pos.current.x += (targetP1X - plate1Pos.current.x) * 0.05;
            plate1Pos.current.y += (targetP1Y - plate1Pos.current.y) * 0.05;
            
            plate2Pos.current.x += (targetP2X - plate2Pos.current.x) * 0.05;
            plate2Pos.current.y += (targetP2Y - plate2Pos.current.y) * 0.05;

            plate1Ref.current.setAttribute('transform', `translate(${plate1Pos.current.x}, ${plate1Pos.current.y}) rotate(15)`);
            plate2Ref.current.setAttribute('transform', `translate(${plate2Pos.current.x}, ${plate2Pos.current.y}) rotate(-5)`);
        }

        if (tectonicSvgRef.current) {
            const targetMachineX = 250 + (mousePos.current.x * -120);
            const targetMachineY = 150 + (mousePos.current.y * -80);
            const targetHumanX = 750 + (mousePos.current.x * -100);
            const targetHumanY = 350 + (mousePos.current.y * -100);
            const targetGapX = 500 + (mousePos.current.x * 30);
            
            const damp = 0.04; 
            machinePosRef.current.x += (targetMachineX - machinePosRef.current.x) * damp;
            machinePosRef.current.y += (targetMachineY - machinePosRef.current.y) * damp;
            
            humanPosRef.current.x += (targetHumanX - humanPosRef.current.x) * damp;
            humanPosRef.current.y += (targetHumanY - humanPosRef.current.y) * damp;
            
            gapPosRef.current.x += (targetGapX - gapPosRef.current.x) * damp;

            const machineGroup = tectonicSvgRef.current.querySelector('.tectonic-machine');
            const humanGroup = tectonicSvgRef.current.querySelector('.tectonic-human');
            const gapGroup = tectonicSvgRef.current.querySelector('.tectonic-gap');

            if (machineGroup) machineGroup.setAttribute('transform', `translate(${machinePosRef.current.x}, ${machinePosRef.current.y})`);
            if (humanGroup) humanGroup.setAttribute('transform', `translate(${humanPosRef.current.x}, ${humanPosRef.current.y})`);
            if (gapGroup) gapGroup.setAttribute('transform', `translate(${gapPosRef.current.x}, ${gapPosRef.current.y})`);
            
            const signalPath = tectonicSvgRef.current.querySelector('.signal-path');
            if (signalPath) {
                const d = `M ${machinePosRef.current.x} ${machinePosRef.current.y} Q ${500 + (mousePos.current.x * 50)} ${250 + (mousePos.current.y * 50)} ${humanPosRef.current.x} ${humanPosRef.current.y}`;
                signalPath.setAttribute('d', d);
            }
            
            const cp1x = (machinePosRef.current.x + gapPosRef.current.x) / 2 + (mousePos.current.x * 50);
            const cp1y = (machinePosRef.current.y + gapPosRef.current.y) / 2;
            const d1 = `M ${machinePosRef.current.x} ${machinePosRef.current.y} Q ${cp1x} ${cp1y} ${gapPosRef.current.x} ${gapPosRef.current.y - 300}`;

            const cp2x = (humanPosRef.current.x + gapPosRef.current.x) / 2 + (mousePos.current.x * 50);
            const cp2y = (humanPosRef.current.y + gapPosRef.current.y) / 2;
            const d2 = `M ${humanPosRef.current.x} ${humanPosRef.current.y} Q ${cp2x} ${cp2y} ${gapPosRef.current.x} ${gapPosRef.current.y - 300}`;

            const cable1 = tectonicSvgRef.current.querySelector('.tectonic-cable-1');
            const cable2 = tectonicSvgRef.current.querySelector('.tectonic-cable-2');

            if (cable1) cable1.setAttribute('d', d1);
            if (cable2) cable2.setAttribute('d', d2);
        }

        animationFrameId = requestAnimationFrame(animateScene);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animateScene);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
     const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === 'ArrowRight') onNext();
         if (e.key === 'ArrowLeft') onPrev();
     };
     window.addEventListener('keydown', handleKeyDown);
     return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev]);

  // Scroll to top on data change
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [data]); 

  // --- STYLES ---
  const bgMain = isDark ? 'bg-[#0A0A0A]' : 'bg-[#F4F4F5]';
  const textMain = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const borderMain = isDark ? 'border-neutral-800' : 'border-neutral-300';
  
  // Semi-transparent but grayish (neutral-900/80)
  const bgCard = isDark ? 'bg-[#111]' : 'bg-white';
  const bgBlock = isDark ? 'bg-neutral-900/80' : 'bg-white/80'; 
  
  const bgSectionAlt = isDark ? 'bg-black/40' : 'bg-white/40';
  const bgSectionDarker = isDark ? 'bg-black/60' : 'bg-white/60';
  const bgBlendMode = isDark ? 'mix-blend-screen opacity-40' : 'mix-blend-multiply opacity-20';
  const gridColor = isDark ? "#333" : "#000"; 

  const getGridClass = (type: string) => {
     const t = type.toLowerCase();
     if (t.includes('video') || t.includes('keynote') || t.includes('talk')) return 'md:col-span-2 md:row-span-2 min-h-[300px]';
     if (t.includes('report') || t.includes('case study')) return 'md:col-span-2';
     return 'col-span-1';
  };

  const handleOpenSource = (item: any) => {
      setSelectedSource(item);
  };

  // --- HELPER FOR TITLE SIZING ---
  const getTitleClass = (text: string) => {
      const length = text.length;
      if (length > 35) return "text-[5vw] md:text-5xl leading-tight";
      if (length > 25) return "text-[7vw] md:text-7xl leading-[0.9]";
      return "text-[9vw] md:text-8xl leading-[0.85]";
  };

  // --- PARSE GAP DATA ---
  const parseGapData = (title: string, desc: string) => {
      const match = desc.match(/^\[(.*?)\]\s*(.*)/);
      if (match) {
          return { displayTitle: match[1], displayDesc: match[2] };
      }
      return { displayTitle: title, displayDesc: desc };
  };

  // --- RENDER BOLD TEXT ---
  const renderBold = (text: string) => {
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>{part.slice(2, -2)}</strong>;
          }
          return part;
      });
  };

  const { displayTitle: gapTitle, displayDesc: gapDesc } = parseGapData(data.gap.title, data.gap.desc);

  return (
    <div key={data.id} ref={containerRef} className={`relative w-full ${bgMain} ${textMain} font-sans overflow-x-hidden transition-colors duration-500`}>
      
      {/* --- GLOBAL TECTONIC BACKGROUND (Subtle Grid) --- */}
      <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${bgBlendMode}`}>
        <svg ref={tectonicBgRef} className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
                <pattern id="global-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="1" strokeOpacity="0.8" />
                </pattern>
                <linearGradient id="fade-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="50%" stopColor="white" stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <mask id="fade-mask"><rect x="0" y="0" width="1000" height="1000" fill="url(#fade-gradient)" /></mask>
            </defs>
            <rect ref={plate1Ref} className="global-plate-1" x="-500" y="-500" width="2000" height="2000" fill="url(#global-grid)" transform="rotate(15)" mask="url(#fade-mask)" />
            <rect ref={plate2Ref} className="global-plate-2" x="-500" y="-500" width="2000" height="2000" fill="url(#global-grid)" transform="rotate(-5)" mask="url(#fade-mask)" />
        </svg>
      </div>

      {/* --- SECTION 1: INTRO (Metaphor as Icon) --- */}
      <section className="relative min-h-[65vh] md:min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 md:pt-10 md:pb-32 px-4 overflow-hidden">
         
         <div className="relative z-10 text-center max-w-5xl flex flex-col items-center w-full">
            
            <div className="mb-6 relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center opacity-90">
                 <svg viewBox="-100 -100 200 200" className="w-full h-full overflow-visible">
                     <Visuals id={data.id} isDark={isDark} centered={true} />
                 </svg>
            </div>

            <span className="font-mono text-[#DC2626] text-xs tracking-[0.3em] uppercase mb-4 block">Shift {data.id}</span>
            
            <h1 className={`${getTitleClass(data.title)} font-black uppercase tracking-tighter mb-4 max-w-4xl mx-auto break-words`}>
               {data.title}
            </h1>

            <div className="flex flex-col items-center gap-2">
                <h2 className={`text-4xl md:text-7xl font-black uppercase tracking-tight font-sans text-transparent select-none`} 
                    style={{ WebkitTextStroke: `1px ${isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'}` }}>
                    {data.subtitle}
                </h2>
                <p className={`font-mono ${textSecondary} text-sm md:text-lg tracking-wide max-w-2xl mx-auto mt-4`}>
                   {data.context}
                </p>
            </div>
         </div>
      </section>

      {/* --- SECTION 2: THE DIVIDE & TECTONIC SHIFT --- */}
      <section className={`relative w-full py-24 ${bgSectionAlt} backdrop-blur-sm`}>
         <div className="relative max-w-7xl mx-auto px-4 md:px-10 z-10">
            <div className="text-center mb-16">
                 <h2 className={`text-5xl md:text-7xl font-black ${textMain} uppercase tracking-tighter leading-none mb-4`}>The Divide</h2>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center justify-items-center mb-16">
                <div className="absolute top-0 left-0 w-full h-[140%] z-0 pointer-events-none overflow-visible">
                    <svg ref={tectonicSvgRef} className="w-full h-full opacity-60 overflow-visible" viewBox="0 0 1000 1200" preserveAspectRatio="none">
                        <path className="signal-path" d="M 250 150 Q 500 250 750 350" fill="none" stroke={isDark ? "#DC2626" : "#000"} strokeWidth="1" strokeDasharray="5 5" opacity="0.4" />
                        
                        <path className="tectonic-cable-1" d="M 250 150 L 500 800" fill="none" stroke="#DC2626" strokeWidth="1" strokeDasharray="5 5" opacity="0.8" />
                        <path className="tectonic-cable-2" d="M 750 350 L 500 800" fill="none" stroke={isDark ? "#FFF" : "#000"} strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
                        
                        <g className="tectonic-machine" transform="translate(250, 150)">
                             <g className="machine-inner">
                                <rect className="machine-orbit" x="-90" y="-90" width="180" height="180" fill="none" stroke={isDark ? "#555" : "#AAA"} strokeWidth="1" opacity="0.7" strokeDasharray="20 10" />
                                <rect x="-60" y="-60" width="120" height="120" fill={isDark ? "rgba(255,0,0,0.05)" : "rgba(0,0,0,0.05)"} stroke="#DC2626" strokeWidth="2" />
                                <text x="-50" y="-70" className="font-mono text-[10px] fill-[#DC2626] opacity-80">MACHINE SIGNAL</text>
                             </g>
                        </g>
                        <g className="tectonic-human" transform="translate(750, 350)">
                             <g className="human-inner">
                                <circle className="human-pulse" r="100" fill="none" stroke={isDark ? "#FFF" : "#000"} strokeWidth="1" opacity="0.2" />
                                <circle r="60" fill={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} stroke={isDark ? "#FFF" : "#000"} strokeWidth="2" />
                                <text x="30" y="80" className="font-mono text-[10px] fill-current opacity-60">HUMAN REACTION</text>
                             </g>
                        </g>
                        <g className="tectonic-gap" transform="translate(500, 1100)">
                             <line className="gap-glitch" x1="-80" y1="-20" x2="80" y2="-20" stroke="#DC2626" strokeWidth="2" strokeDasharray="10 20" />
                             <text x="-30" y="50" className="font-mono text-[10px] fill-[#DC2626] opacity-80">GAP</text>
                        </g>
                    </svg>
                </div>
                
                {/* MACHINE COLUMN */}
                <div className="machine-col relative z-10 w-full">
                    <div className={`${bgBlock} backdrop-blur-md border ${borderMain} p-8 rounded-xl relative hover:border-red-900/50 transition-colors shadow-2xl h-full`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 bg-[#DC2626] animate-pulse"></div>
                            <span className="font-mono text-xs text-[#DC2626] font-bold uppercase tracking-widest">{data.machineCol.label}</span>
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-bold ${textMain} mb-6 uppercase leading-tight`}>{data.machineCol.title}</h3>
                        <p className={`font-light text-base md:text-lg leading-relaxed ${textSecondary} mb-6 whitespace-pre-wrap`}>
                            {data.machineCol.desc.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-[#DC2626]">{part}</strong> : part)}
                        </p>
                    </div>
                </div>

                {/* HUMAN COLUMN */}
                <div className="human-col relative z-10 w-full">
                    <div className={`${bgBlock} backdrop-blur-md border ${borderMain} p-8 rounded-xl relative hover:border-white/30 transition-colors shadow-2xl h-full`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-white' : 'bg-black'}`}></div>
                            <span className={`font-mono text-xs ${textMain} font-bold uppercase tracking-widest`}>{data.humanCol.label}</span>
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-bold ${textMain} mb-6 uppercase leading-tight`}>{data.humanCol.title}</h3>
                        <p className={`font-light text-base md:text-lg leading-relaxed ${textSecondary} mb-6 whitespace-pre-wrap`}>
                            {data.humanCol.desc.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>{part}</strong> : part)}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* GAP CONTAINER */}
            <div className="relative z-20 w-full">
                <div className="relative w-full bg-[#DC2626] rounded-[2.5rem] overflow-hidden shadow-2xl group transition-transform duration-700 hover:scale-[1.01]">
                    <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 4px, #000 4px, #000 5px)` }}></div>
                    <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                        <div className="flex flex-row md:flex-col items-center md:items-start gap-5 shrink-0">
                             <div className="relative group/frame px-4 py-2">
                                <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50"></span>
                                <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50"></span>
                                <span className="relative font-mono text-white text-xs font-bold uppercase tracking-[0.2em] z-10">{gapTitle}</span>
                             </div>
                        </div>
                        <div className="flex-1"><p className="font-mono text-white text-xl md:text-3xl font-medium leading-relaxed tracking-tight">{renderBold(gapDesc)}</p></div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* --- SECTION 3: THE REALITY CHECK (Stats) --- */}
      <section className={`relative py-24 px-4 md:px-10 ${bgSectionDarker} border-t ${borderMain} backdrop-blur-sm`}>
         <div className="max-w-7xl mx-auto">
            <div className={`mb-16 border-b ${borderMain} pb-6`}>
                <h2 className={`text-5xl md:text-7xl font-black ${textMain} uppercase tracking-tighter leading-none`}>The Reality Check</h2>
                <div className="flex justify-between items-end mt-4"><span className={`font-mono ${textSecondary} text-xs uppercase tracking-widest`}>Supporting Evidence</span></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
               {data.stats.map((stat, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => stat.url && handleOpenSource({ title: stat.label + " Stat", desc: stat.desc, url: stat.url, type: "Statistic", author: "Source" })}
                    className={`block group text-left w-full ${isDark ? 'bg-neutral-900/30' : 'bg-white/50'} border ${isDark ? 'border-white/5' : 'border-black/5'} p-6 rounded-xl h-[160px] md:h-[300px] flex flex-col justify-between hover:bg-opacity-80 transition-colors ${stat.url ? 'cursor-pointer hover:border-[#DC2626]' : ''}`}
                  >
                      <span className={`font-mono text-[10px] md:text-xs ${textSecondary} uppercase group-hover:text-[#DC2626] transition-colors`}>{stat.label}</span>
                      <div className="flex items-center justify-center h-full"><span className={`text-4xl md:text-7xl font-black ${textMain} group-hover:scale-110 transition-transform`}>{stat.value}</span></div>
                      <p className={`text-xs md:text-sm font-mono ${textSecondary}`}>{stat.desc}</p>
                  </button>
               ))}
            </div>
         </div>
      </section>

      {/* --- SECTION 5: DATA SOURCES (Combined with Evidence) --- */}
      <section className={`relative py-24 px-4 md:px-10 ${bgSectionAlt} border-t ${borderMain} backdrop-blur-sm`}>
         <div className="max-w-7xl mx-auto">
             <div className="mb-16"><h2 className={`text-5xl md:text-7xl font-black ${textMain} uppercase tracking-tighter leading-none mb-6`}>Data Sources</h2></div>
             
             {/* AIM EVIDENCE SUBSECTION */}
             {data.evidence && data.evidence.length > 0 && (
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <svg className="w-5 h-5 text-[#DC2626]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.5L18.5 19H5.5L12 5.5z"/></svg>
                        <h3 className="font-mono text-[#DC2626] text-xs uppercase tracking-widest font-bold">Research & Evidence</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.evidence.map((item, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => handleOpenSource({ ...item, type: "AIM Evidence", author: "AI Mindset Lab" })}
                                className={`evidence-card group block w-full text-left p-8 rounded-lg border ${borderMain} ${bgCard} hover:border-[#DC2626] transition-all`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-8 h-8 bg-black border border-white/20 flex items-center justify-center rounded">
                                        <span className="text-white font-serif italic text-xs">aim</span>
                                    </div>
                                    <span className={`font-mono text-[10px] ${textSecondary} uppercase tracking-widest`}>[evidence]</span>
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-[#DC2626] underline decoration-1 underline-offset-4 decoration-[#DC2626]/30 group-hover:decoration-[#DC2626] mb-3 transition-all">{item.title}</h4>
                                <p className={`font-mono text-sm leading-relaxed ${textSecondary}`}>{item.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
             )}

             {/* EXTERNAL SOURCES SUBSECTION */}
             <div>
                 <div className="flex items-center gap-3 mb-6">
                    <div className={`w-1.5 h-1.5 ${isDark ? 'bg-neutral-500' : 'bg-neutral-400'} rounded-full`}></div>
                    <h3 className={`font-mono ${textSecondary} text-xs uppercase tracking-widest font-bold`}>External Data</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(150px,auto)]">
                     {data.sources.map((source, i) => (
                         <div key={source.id} onClick={() => handleOpenSource(source)} className={`source-card-anim group flex flex-col justify-between p-5 ${bgCard} border ${borderMain} hover:border-[#DC2626] transition-colors rounded cursor-pointer ${getGridClass(source.type)}`}>
                             <div className="mb-4">
                                 <div className={`font-mono text-[9px] ${textSecondary} uppercase tracking-widest mb-2`}>{source.type}</div>
                                 <span className={`text-sm md:text-lg font-bold leading-tight block ${isDark ? 'text-neutral-200' : 'text-neutral-800'} group-hover:${textMain} transition-colors`}>{source.title}</span>
                             </div>
                             <div className="flex justify-between items-end border-t border-white/10 pt-3 mt-auto">
                                <span className="text-[10px] text-neutral-500 font-mono truncate max-w-[80%]">{source.author}</span>
                                <svg className={`w-3 h-3 ${textSecondary} group-hover:text-[#DC2626] transition-colors`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         </div>
      </section>

      {/* --- SECTION 6: COMMUNITY VOICES --- */}
      {data.voices && data.voices.length > 0 && (
        <section className={`relative py-12 px-4 md:px-10 ${bgMain} border-t ${borderMain}`}>
            <div className="max-w-7xl mx-auto">
                <div className={`p-8 md:p-12 rounded-xl border ${borderMain} ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-100'}`}>
                    <div className="flex items-center gap-4 mb-8">
                        <svg className={`w-6 h-6 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                        <span className={`font-mono text-xs font-bold uppercase tracking-widest ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>AI Mindset. Community Voices</span>
                    </div>
                    <div className="space-y-12">
                        {data.voices.map((voice, idx) => (
                            <div key={idx} className="relative pl-6 md:pl-0">
                                <p className={`font-serif italic text-lg md:text-2xl leading-relaxed mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>"{voice.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-px bg-[#DC2626]"></span>
                                    <p className={`font-mono text-xs ${textSecondary} uppercase tracking-wide`}>
                                        <span className={textMain}>{voice.author}</span>, {voice.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
      )}

      {/* --- BOTTOM NAVIGATION --- */}
      <section className={`relative py-24 px-4 flex justify-center ${bgMain} border-t ${borderMain}`}>
          <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
              <div className="flex justify-between w-full">
                  <button onClick={onPrev} className="group flex items-center gap-4 text-left hover:opacity-80 transition-opacity">
                      <div className={`w-12 h-12 rounded-full border ${isDark ? 'border-neutral-700' : 'border-neutral-300'} flex items-center justify-center ${isDark ? 'group-hover:bg-neutral-800' : 'group-hover:bg-neutral-200'} transition-colors`}>
                          <svg className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7"/></svg>
                      </div>
                      <div className="hidden md:block">
                          <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest">Previous</span>
                          <span className={`block text-base font-bold ${isDark ? 'text-white' : 'text-black'} max-w-[150px] truncate`}>{prevLabel || "Back"}</span>
                      </div>
                  </button>

                  <button onClick={onNext} className="group flex items-center gap-4 text-right hover:opacity-80 transition-opacity">
                      <div className="hidden md:block">
                          <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest">Next</span>
                          <span className={`block text-base font-bold ${isDark ? 'text-white' : 'text-black'} max-w-[200px] truncate`}>{nextLabel || "Next Step"}</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-[#DC2626] flex items-center justify-center bg-[#DC2626] group-hover:bg-red-700 transition-colors">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
                      </div>
                  </button>
              </div>
          </div>
      </section>

      {/* --- IFRAME MODAL --- */}
      {selectedSource && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/95 backdrop-blur-md animate-fade-in" onClick={() => setSelectedSource(null)}></div>
             
             <div className="relative w-full max-w-6xl h-[90vh] bg-[#0A0A0A] border border-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-2xl z-10">
                 <div className="flex justify-between items-center p-4 border-b border-white/10 bg-neutral-900">
                    <div className="flex gap-4 items-center overflow-hidden">
                        <div className="w-8 h-8 flex-shrink-0 bg-[#DC2626] flex items-center justify-center rounded text-white font-bold">
                            {selectedSource.type ? selectedSource.type[0] : 'S'}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-white font-bold truncate">{selectedSource.title}</span>
                            <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest truncate">{selectedSource.author}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedSource(null)} className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                 </div>

                 <div className="flex-1 bg-white relative">
                     {selectedSource.url ? (
                         <iframe 
                            src={selectedSource.url} 
                            className="w-full h-full border-0"
                            title={selectedSource.title}
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                         />
                     ) : (
                         <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 text-neutral-900 p-10 text-center">
                             <h2 className="text-3xl font-bold mb-4">{selectedSource.title}</h2>
                             <p className="max-w-md text-neutral-600 mb-8">{selectedSource.desc}</p>
                             <p className="text-sm font-mono text-neutral-400">No preview URL available.</p>
                         </div>
                     )}
                 </div>
             </div>
         </div>
      )}

    </div>
  );
};
