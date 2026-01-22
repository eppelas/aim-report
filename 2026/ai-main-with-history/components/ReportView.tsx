import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ShiftData } from './shiftsData';
import { ShiftMetaphor } from './ShiftMetaphor';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface ReportViewProps {
  onBack: () => void;
  data: ShiftData;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  nextLabel?: string;
  prevLabel?: string;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ onBack, data, onNext, onPrev, isFirst, isLast, theme, toggleTheme, nextLabel, prevLabel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSource, setSelectedSource] = useState<any | null>(null);
  const [selectedStat, setSelectedStat] = useState<any | null>(null);
  const [iframeError, setIframeError] = useState<boolean>(false);
  const isDark = theme === 'dark';

  const plate1Ref = useRef<SVGRectElement>(null);
  const plate2Ref = useRef<SVGRectElement>(null);
  const tectonicSvgRef = useRef<SVGSVGElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 }); 
  const plate1Pos = useRef({ x: 0, y: 0 });
  const plate2Pos = useRef({ x: 0, y: 0 });

  const machinePosRef = useRef({ x: 250, y: 150 }); 
  const humanPosRef = useRef({ x: 750, y: 350 });

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
            const damp = 0.04; 
            machinePosRef.current.x += (targetMachineX - machinePosRef.current.x) * damp;
            machinePosRef.current.y += (targetMachineY - machinePosRef.current.y) * damp;
            humanPosRef.current.x += (targetHumanX - humanPosRef.current.x) * damp;
            humanPosRef.current.y += (targetHumanY - humanPosRef.current.y) * damp;
            const machineGroup = tectonicSvgRef.current.querySelector('.tectonic-machine');
            const humanGroup = tectonicSvgRef.current.querySelector('.tectonic-human');
            if (machineGroup) machineGroup.setAttribute('transform', `translate(${machinePosRef.current.x}, ${machinePosRef.current.y})`);
            if (humanGroup) humanGroup.setAttribute('transform', `translate(${humanPosRef.current.x}, ${humanPosRef.current.y})`);
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

  useLayoutEffect(() => { window.scrollTo(0, 0); }, [data]); 

  // Dynamic Theme Styles
  const bgMain = isDark ? 'bg-[#0A0A0A]' : 'bg-[#F4F4F5]';
  const textMain = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const borderMain = isDark ? 'border-neutral-800' : 'border-neutral-300';
  const bgCard = isDark ? 'bg-[#111]' : 'bg-white';
  const bgBlock = isDark ? 'bg-neutral-900/40' : 'bg-white/40'; 
  const bgSectionAlt = isDark ? 'bg-black/40' : 'bg-white/40';
  const bgSectionDarker = isDark ? 'bg-black/60' : 'bg-white/60';
  const bgBlendMode = isDark ? 'mix-blend-screen opacity-40' : 'mix-blend-multiply opacity-20';
  const gridColor = isDark ? "#333" : "#000"; 

  const handleOpenSource = (item: any) => setSelectedSource(item);

  const getTitleClass = (text: string) => {
      const length = text.length;
      if (length > 35) return "text-[5vw] md:text-5xl leading-tight";
      if (length > 25) return "text-[7vw] md:text-7xl leading-[0.9]";
      return "text-[9vw] md:text-8xl leading-[0.85]";
  };

  const parseGapData = (title: string, desc: string) => {
      const match = desc.match(/^\[(.*?)\]\s*(.*)/);
      if (match) return { displayTitle: match[1], displayDesc: match[2] };
      return { displayTitle: title, displayDesc: desc };
  };

  const { displayTitle: gapTitle, displayDesc: gapDesc } = parseGapData(data.gap.title, data.gap.desc);

  const getGridClass = (type: string) => {
     const t = type.toLowerCase();
     if (t.includes('video') || t.includes('keynote') || t.includes('talk')) return 'md:col-span-2 md:row-span-2 min-h-[300px]';
     if (t.includes('report') || t.includes('case study')) return 'md:col-span-2';
     return 'col-span-1';
  };

  return (
    <div ref={containerRef} className={`relative w-full ${bgMain} ${textMain} font-sans overflow-x-hidden transition-colors duration-500`}>
      <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${bgBlendMode}`}>
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
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

      {/* HEADER SECTION */}
      <section className="relative min-h-[65vh] md:min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 md:pt-10 md:pb-32 px-4 overflow-hidden">
         <div className="relative z-10 text-center max-w-5xl flex flex-col items-center w-full">
            <div className="mb-6 relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center opacity-90">
                <svg viewBox="-100 -100 200 200" className="w-full h-full overflow-visible">
                    <ShiftMetaphor id={data.id} isDark={isDark} centered={true} />
                </svg>
            </div>
            <span className="font-mono text-[#DC2626] text-xs tracking-[0.3em] uppercase mb-4 block">Shift {data.id}</span>
            <h1 className={`${getTitleClass(data.title)} font-black uppercase tracking-tighter mb-4 max-w-4xl mx-auto break-words`}>{data.title}</h1>
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight font-sans text-transparent select-none" style={{ WebkitTextStroke: `1px ${isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'}` }}>{data.subtitle}</h2>
                <p className={`font-mono ${textSecondary} text-sm md:text-lg tracking-wide max-w-2xl mx-auto mt-4`}>{data.context}</p>
            </div>
         </div>
      </section>

      {/* THE DIVIDE SECTION */}
      <section className={`relative w-full py-24 ${bgSectionAlt} backdrop-blur-sm`}>
          <div className="relative max-w-7xl mx-auto px-4 md:px-10 z-10">
              <div className="text-center mb-16"><h2 className={`text-5xl md:text-7xl font-black ${textMain} uppercase tracking-tighter leading-none mb-4`}>The Divide</h2></div>
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center justify-items-center mb-16">
                  <div className="absolute top-0 left-0 w-full h-[140%] z-0 pointer-events-none overflow-visible">
                      <svg ref={tectonicSvgRef} className="w-full h-full opacity-60 overflow-visible" viewBox="0 0 1000 1200" preserveAspectRatio="none">
                          <path className="signal-path" d="M 250 150 Q 500 250 750 350" fill="none" stroke={isDark ? "#DC2626" : "#000"} strokeWidth="1" strokeDasharray="5 5" opacity="0.4" />
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
                      </svg>
                  </div>
                  <div className="machine-col relative z-10 w-full">
                      <div className={`${bgBlock} backdrop-blur-md border ${borderMain} p-8 rounded-xl h-full shadow-xl`}>
                          <div className="flex items-center gap-3 mb-6"><div className="w-2 h-2 bg-[#DC2626] animate-pulse"></div><span className="font-mono text-xs text-[#DC2626] font-bold uppercase tracking-widest">{data.machineCol.label}</span></div>
                          <h3 className={`text-2xl md:text-3xl font-bold ${textMain} mb-6 uppercase leading-tight`}>{data.machineCol.title}</h3>
                          <p className={`font-light text-base md:text-lg leading-relaxed ${textSecondary}`}>
                              {data.machineCol.desc.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-[#DC2626]">{part}</strong> : part)}
                          </p>
                      </div>
                  </div>
                  <div className="human-col relative z-10 w-full">
                      <div className={`${bgBlock} backdrop-blur-md border ${borderMain} p-8 rounded-xl h-full shadow-xl`}>
                          <div className="flex items-center gap-3 mb-6"><div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-white' : 'bg-black'}`}></div><span className={`font-mono text-xs ${textMain} font-bold uppercase tracking-widest`}>{data.humanCol.label}</span></div>
                          <h3 className={`text-2xl md:text-3xl font-bold ${textMain} mb-6 uppercase leading-tight`}>{data.humanCol.title}</h3>
                          <p className={`font-light text-base md:text-lg leading-relaxed ${textSecondary}`}>
                              {data.humanCol.desc.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>{part}</strong> : part)}
                          </p>
                      </div>
                  </div>
              </div>
              <div className="relative z-20 w-full">
                  <div className="relative w-full bg-[#DC2626] rounded-[2.5rem] p-6 md:pl-8 md:py-16 shadow-2xl overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 4px, #000 4px, #000 5px)` }}></div>
                      <div className="relative z-10 flex flex-col md:flex-row gap-3 md:gap-5 items-start">
                          <div className="relative p-2 shrink-0 flex items-center justify-center max-w-[120px] md:max-w-[140px]">
                              {/* REFINED SMALLER DECORATIVE BRACKETS FRAME */}
                              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/60"></span>
                              <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/60"></span>
                              <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/60"></span>
                              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/60"></span>
                              <span className="font-mono text-white text-[9px] md:text-[11px] font-normal lowercase tracking-widest leading-tight text-center px-2">
                                  {gapTitle}
                              </span>
                          </div>
                          <p className="font-mono text-white text-xl md:text-3xl font-medium leading-relaxed flex-1">
                              {gapDesc.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part)}
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* STATS SECTION */}
      <section className={`relative py-24 px-4 md:px-10 ${bgSectionDarker} border-t ${borderMain} backdrop-blur-sm`}>
          <div className="max-w-7xl mx-auto">
              <div className={`mb-16 border-b ${borderMain} pb-6`}>
                  <h2 className={`text-5xl md:text-7xl font-black ${textMain} uppercase tracking-tighter leading-none`}>The Reality Check</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.stats.map((stat, idx) => (
                      <div 
                          key={idx} 
                          onClick={() => { if (stat.url) { setIframeError(false); setSelectedStat(stat); } }}
                          className={`group text-left w-full ${isDark ? 'bg-neutral-900/30' : 'bg-white/50'} border ${isDark ? 'border-white/5 hover:border-[#DC2626]/50' : 'border-black/5 hover:border-[#DC2626]/50'} p-6 rounded-xl h-[160px] md:h-[300px] flex flex-col justify-between transition-all shadow-lg ${stat.url ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
                      >
                          <span className={`font-mono text-[10px] md:text-xs ${textSecondary} uppercase group-hover:text-[#DC2626] transition-colors`}>{stat.label}</span>
                          <div className="flex items-center justify-center h-full"><span className={`text-4xl md:text-7xl font-black ${textMain}`}>{stat.value}</span></div>
                          <p className={`text-xs md:text-sm font-mono ${textSecondary}`}>{stat.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* EVIDENCE & SOURCES SECTION */}
      <section className={`relative py-24 px-4 md:px-10 ${bgSectionAlt} border-t ${borderMain} backdrop-blur-sm`}>
          <div className="max-w-7xl mx-auto">
              <h2 className={`text-5xl md:text-7xl font-black ${textMain} uppercase tracking-tighter leading-none mb-12`}>Data Sources</h2>
              
              {data.evidence && data.evidence.length > 0 && (
                  <div className="mb-16">
                      <h3 className="font-mono text-[#DC2626] text-xs uppercase tracking-widest font-bold mb-8">Research & Evidence</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {data.evidence.map((item, idx) => (
                              <button key={idx} onClick={() => handleOpenSource({ ...item, type: "Evidence", author: "AIM Lab" })} className={`evidence-card group block w-full text-left p-8 rounded-lg border ${borderMain} ${bgCard} hover:border-[#DC2626] transition-all shadow-md`}>
                                  <h4 className="text-xl md:text-2xl font-bold text-[#DC2626] mb-3">{item.title}</h4>
                                  <p className={`font-mono text-sm leading-relaxed ${textSecondary}`}>{item.desc}</p>
                              </button>
                          ))}
                      </div>
                  </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {data.sources.map((source) => (
                      <div key={source.id} onClick={() => handleOpenSource(source)} className={`group flex flex-col justify-between p-5 ${bgCard} border ${borderMain} hover:border-[#DC2626] transition-colors rounded cursor-pointer ${getGridClass(source.type)}`}>
                          <div className="mb-4">
                              <div className={`font-mono text-[9px] ${textSecondary} uppercase tracking-widest mb-2`}>{source.type}</div>
                              <span className={`text-sm md:text-lg font-bold leading-tight block ${textMain}`}>{source.title}</span>
                          </div>
                          <div className="flex justify-between items-end border-t border-white/10 pt-3 mt-auto">
                              <span className="text-[10px] text-neutral-500 font-mono truncate">{source.author}</span>
                              <svg className={`w-3 h-3 ${textSecondary} group-hover:text-[#DC2626]`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* VOICES SECTION */}
      {data.voices && data.voices.length > 0 && (
          <section className={`relative py-24 px-4 md:px-10 ${bgMain} border-t ${borderMain}`}>
              <div className="max-w-7xl mx-auto">
                  <div className={`p-8 md:p-12 rounded-xl border ${borderMain} ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-100'}`}>
                      <div className="flex items-center gap-4 mb-12">
                          <span className={`font-mono text-xs font-bold uppercase tracking-widest ${textSecondary}`}>Community Voices</span>
                      </div>
                      <div className="space-y-12">
                          {data.voices.map((voice, idx) => (
                              <div key={idx} className="relative">
                                  <p className={`font-serif italic text-lg md:text-2xl leading-relaxed mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>"{voice.quote}"</p>
                                  <div className="flex items-center gap-3">
                                      <span className="w-8 h-px bg-[#DC2626]"></span>
                                      <p className={`font-mono text-xs ${textSecondary} uppercase`}><span className={textMain}>{voice.author}</span>, {voice.role}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </section>
      )}

      {/* NAVIGATION SECTION */}
      <section className={`relative py-24 px-4 border-t ${borderMain} ${bgMain}`}>
          <div className="max-w-4xl mx-auto flex justify-between">
              <button onClick={onPrev} className={`group flex items-center gap-4 px-6 py-4 border ${borderMain} hover:border-[#DC2626] transition-all`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7"/></svg>
                  <span className="font-mono text-xs uppercase tracking-widest">{prevLabel || "Back"}</span>
              </button>
              <button onClick={onNext} className="group flex items-center gap-4 px-10 py-4 bg-[#DC2626] text-white hover:bg-red-700 transition-all shadow-xl">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest">{nextLabel || "Next"}</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
              </button>
          </div>
      </section>

      {/* SOURCE MODAL */}
      {selectedSource && (
         <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedSource(null)}></div>
             <div className="relative w-full max-w-6xl h-[90vh] bg-[#0A0A0A] border border-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-2xl z-10">
                 <div className="flex justify-between items-center p-4 border-b border-white/10 bg-neutral-900 shrink-0">
                    <div className="flex gap-4 items-center overflow-hidden"><div className="w-8 h-8 flex-shrink-0 bg-[#DC2626] flex items-center justify-center rounded text-white font-bold">{selectedSource.type ? selectedSource.type[0] : 'S'}</div><div className="flex flex-col overflow-hidden"><span className="text-white font-bold truncate">{selectedSource.title}</span><span className="text-neutral-500 text-xs font-mono uppercase tracking-widest truncate">{selectedSource.author}</span></div></div>
                    <div className="flex items-center gap-4">
                        {selectedSource.url && <a href={selectedSource.url} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white text-black rounded-md text-[10px] font-bold uppercase hover:bg-neutral-200 transition-colors">Open Full</a>}
                        <button onClick={() => setSelectedSource(null)} className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                    </div>
                 </div>
                 <div className="flex-1 bg-white relative">
                    {iframeError || !selectedSource.url ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 p-10 text-center gap-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-2 text-black">Cannot Display Content</h2>
                                <p className="max-w-md text-neutral-600 mb-4">This website doesn't allow embedding. Click below to open in a new tab.</p>
                            </div>
                            {selectedSource.url && (
                                <a href={selectedSource.url} target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#DC2626] text-white rounded-lg font-bold hover:bg-red-700 transition-colors">
                                    Open in New Tab
                                </a>
                            )}
                        </div>
                    ) : (
                        <iframe 
                            src={selectedSource.url} 
                            className="w-full h-full border-0" 
                            title={selectedSource.title} 
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                            onError={() => setIframeError(true)}
                        />
                    )}
                 </div>
             </div>
         </div>
      )}

      {/* STAT MODAL */}
      {selectedStat && (
         <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedStat(null)}></div>
             <div className="relative w-full max-w-6xl h-[90vh] bg-[#0A0A0A] border border-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-2xl z-10">
                 <div className="flex justify-between items-center p-4 border-b border-white/10 bg-neutral-900 shrink-0">
                    <div className="flex gap-4 items-center overflow-hidden">
                        <div className="w-8 h-8 flex-shrink-0 bg-[#DC2626] flex items-center justify-center rounded text-white font-bold text-xs">{selectedStat.label}</div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-white font-bold truncate">{selectedStat.value} - {selectedStat.label}</span>
                            <span className="text-neutral-500 text-xs font-mono truncate">{selectedStat.desc}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {selectedStat.url && <a href={selectedStat.url} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white text-black rounded-md text-[10px] font-bold uppercase hover:bg-neutral-200 transition-colors">Open Full</a>}
                        <button onClick={() => setSelectedStat(null)} className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                 </div>
                 <div className="flex-1 bg-white relative">
                    {iframeError || !selectedStat.url ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 p-10 text-center gap-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-2 text-black">Cannot Display Content</h2>
                                <p className="max-w-md text-neutral-600 mb-4">This website doesn't allow embedding. Click below to open in a new tab.</p>
                            </div>
                            {selectedStat.url && (
                                <a href={selectedStat.url} target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#DC2626] text-white rounded-lg font-bold hover:bg-red-700 transition-colors">
                                    Open in New Tab
                                </a>
                            )}
                        </div>
                    ) : (
                        <iframe 
                            src={selectedStat.url} 
                            className="w-full h-full border-0" 
                            title={selectedStat.desc} 
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                            onError={() => setIframeError(true)}
                        />
                    )}
                 </div>
             </div>
         </div>
      )}
    </div>
  );
};