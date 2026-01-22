import React, { useState, useRef, useEffect, useMemo } from 'react';
import { NavigationProps } from './types';

export const TimelineNav: React.FC<NavigationProps> = ({ 
  timeline, 
  currentIndex, 
  viewState, 
  onNavigate, 
  onNavigateToConclusion, 
  onNavigateToLanding,
  onNavigateToThankYou,
  theme,
  visible 
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Container & Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const pathBaseRef = useRef<SVGPathElement>(null);
  const pathProgressRef = useRef<SVGPathElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);
  
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Physics State (Spring System for the line bounce)
  const physics = useRef({ 
      y: 0,           // Current displacement height
      targetY: 0,     // Target displacement
      waveX: 0,       // Current X position of the wave peak
      targetWaveX: 0, // Target X position (mouse X)
      velocity: 0,    // Vertical velocity
      tension: 0.1,   // Higher = snappier bounce
      friction: 0.82  // Lower = more oscillation
  });
  
  const requestRef = useRef<number | null>(null);
  const isDark = theme === 'dark';
  
  // --- NORMALIZE INDICES ---
  // Structure: [0:Intro] ... [1..N: Timeline(Shifts+Summary)] ... [N+1: Manifesto] ... [N+2: ThankYou]
  const totalNodes = timeline.length + 3; 
  
  let activeNodeIndex = 0;
  if (viewState === 'landing') activeNodeIndex = 0;
  else if (viewState === 'report') activeNodeIndex = currentIndex + 1;
  else if (viewState === 'conclusion') activeNodeIndex = totalNodes - 2; // Manifesto
  else if (viewState === 'thankyou') activeNodeIndex = totalNodes - 1;   // Thank You

  // --- GROUPING LOGIC ---
  // Groups nodes visually so "Sections" (Layers) and their children (Shifts) are closer together
  const groupedNodes = useMemo(() => {
      const groups: { nodes: { index: number, type: string, data?: any }[] }[] = [];
      
      // 1. Intro Group
      groups.push({ nodes: [{ index: 0, type: 'intro' }] });

      // 2. Timeline Groups (Layers, Shifts, Summary)
      let currentGroup: { nodes: any[] } | null = null;
      
      timeline.forEach((item, idx) => {
          const globalIndex = idx + 1;
          
          if (item.type === 'layer') {
              if (currentGroup) groups.push(currentGroup);
              currentGroup = { nodes: [] };
              currentGroup.nodes.push({ index: globalIndex, type: 'layer', data: item.data });
          } else if (item.type === 'summary') {
              if (currentGroup) groups.push(currentGroup);
              currentGroup = { nodes: [] };
              currentGroup.nodes.push({ index: globalIndex, type: 'summary', data: item.data });
          } else {
              if (!currentGroup) currentGroup = { nodes: [] };
              currentGroup.nodes.push({ index: globalIndex, type: 'shift', data: item.data });
          }
      });
      if (currentGroup) groups.push(currentGroup);

      // 3. Manifesto Group
      groups.push({ nodes: [{ index: totalNodes - 2, type: 'manifesto' }] });

      // 4. Thank You Group
      groups.push({ nodes: [{ index: totalNodes - 1, type: 'thankyou' }] });

      return groups;
  }, [timeline, totalNodes]);

  // --- MOUSE HANDLERS (Physics Interactions) ---
  const handleMouseMove = (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const centerY = rect.height / 2;
      const relY = e.clientY - rect.top;
      const distY = relY - centerY;
      
      physics.current.targetWaveX = mouseX;
      // Clamp the pull distance (The "Amplitude" of the wave)
      const maxPull = 90; 
      physics.current.targetY = Math.max(-maxPull, Math.min(maxPull, distY));
  };

  const handleMouseLeave = () => {
      setHoveredIndex(null);
      physics.current.targetY = 0; // Snap back to flat
  };

  // --- ANIMATION LOOP ---
  const updatePhysics = () => {
      if (!containerRef.current || !pathBaseRef.current || !pathProgressRef.current) return;
      const p = physics.current;

      // 1. Spring Physics calculation
      const displacement = p.targetY - p.y;
      p.velocity += displacement * p.tension;
      p.velocity *= p.friction;
      p.y += p.velocity;
      
      // 2. Linear Interpolation for X (Slide along the line)
      p.waveX += (p.targetWaveX - p.waveX) * 0.15;

      // 3. Construct the Wave Path (SVG)
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      const centerY = height / 2;
      
      const waveWidth = 120; 
      const currentPeakY = centerY + p.y;
      const peakX = p.waveX;
      const baseLift = p.y * 0.15; 
      const startY = centerY + baseLift;
      const endY = centerY + baseLift;

      const startBumpX = Math.max(0, peakX - waveWidth/2);
      const endBumpX = Math.min(width, peakX + waveWidth/2);
      
      const d = `M 0,${startY} L ${startBumpX},${startY} Q ${peakX},${currentPeakY} ${endBumpX},${endY} L ${width},${endY}`;
      
      pathBaseRef.current.setAttribute('d', d);
      pathProgressRef.current.setAttribute('d', d);
      
      const baseStroke = isDark ? 1.5 : 0.5;
      pathBaseRef.current.setAttribute('stroke-width', baseStroke.toString());
      pathProgressRef.current.setAttribute('stroke-width', "3");

      // 4. Update Progress Stroke & Gradient
      try {
          const totalLength = pathProgressRef.current.getTotalLength();
          if (totalLength > 0) {
              let targetX = 0;
              const activeNodeEl = nodeRefs.current[activeNodeIndex];
              if (activeNodeEl) {
                  const nodeRect = activeNodeEl.getBoundingClientRect();
                  const containerRect = containerRef.current.getBoundingClientRect();
                  targetX = (nodeRect.left - containerRect.left) + (nodeRect.width / 2);
              } else {
                  const progressPercent = activeNodeIndex / (totalNodes - 1);
                  targetX = totalLength * progressPercent;
              }

              pathProgressRef.current.style.strokeDasharray = `${targetX} ${totalLength}`;
              pathProgressRef.current.style.strokeDashoffset = "0";

              if (gradientRef.current) {
                  gradientRef.current.setAttribute('x2', `${targetX}`);
                  gradientRef.current.setAttribute('y1', `${centerY}`);
                  gradientRef.current.setAttribute('y2', `${centerY}`);
              }
          }
      } catch (e) { }

      requestRef.current = requestAnimationFrame(updatePhysics);
  };

  useEffect(() => {
      requestRef.current = requestAnimationFrame(updatePhysics);
      return () => {
          if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
      };
  }, [activeNodeIndex, totalNodes, visible, isDark, groupedNodes]);


  // --- CONTENT HELPERS ---
  const getTooltipText = (nodeIndex: number) => {
      if (nodeIndex === 0) return "LANDING";
      if (nodeIndex === totalNodes - 1) return "THANK YOU";
      if (nodeIndex === totalNodes - 2) return "MANIFESTO";
      
      const item = timeline[nodeIndex - 1];
      if (!item) return "";
      
      if (item.type === 'layer') return `LAYER ${item.data.id}: ${item.data.title}`;
      if (item.type === 'summary') return "SUMMARY";
      return `${item.data.id}. ${item.data.title}`;
  };

  const handleNodeClick = (nodeIndex: number) => {
      if (nodeIndex === 0) onNavigateToLanding();
      else if (nodeIndex === totalNodes - 1) onNavigateToThankYou();
      else if (nodeIndex === totalNodes - 2) onNavigateToConclusion();
      else onNavigate(nodeIndex - 1);
  };

  // --- THEME COLORS ---
  const colors = {
      futureBg: isDark ? 'rgba(64,64,64,0.5)' : '#E5E5E5',
      futureBorder: isDark ? 'rgba(163,163,163,0.3)' : '#9CA3AF',
      pastBg: isDark ? 'rgba(255,255,255,0.4)' : '#262626', 
      pastBorder: isDark ? 'rgba(255,255,255,0.4)' : '#262626',
      lineBase: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)",
      tooltipBg: isDark ? 'bg-black/90 border-neutral-800 text-white' : 'bg-white/95 border-neutral-300 text-black',
      tooltipText: isDark ? 'text-neutral-500' : 'text-neutral-500',
      activeMain: '#DC2626', // The primary red color
  };

  return (
    <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
            fixed bottom-0 left-1/2 -translate-x-1/2 
            w-[90vw] md:w-[65vw] h-40 
            flex items-center justify-center 
            z-[90] 
            transition-all duration-1000 ease-in-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}
        `}
        style={{ cursor: 'auto' }}
    >
      {/* --- BACKGROUND SVG (The Line) --- */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          <defs>
             {/* Extended filter region to avoid clipping on flat lines */}
             <filter id="glow-progress" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
             </filter>
             <linearGradient id="line-grad" ref={gradientRef} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="0">
                <stop offset="0%" stopColor={colors.activeMain} stopOpacity="0.3" />
                <stop offset="30%" stopColor={colors.activeMain} stopOpacity="0.8" />
                <stop offset="100%" stopColor={colors.activeMain} stopOpacity="1" />
             </linearGradient>
          </defs>
          <path ref={pathBaseRef} fill="none" stroke={colors.lineBase} />
          <path ref={pathProgressRef} fill="none" stroke="url(#line-grad)" strokeLinecap="round" filter="url(#glow-progress)" style={{ willChange: 'stroke-dasharray, d' }} />
      </svg>

      {/* --- NODES CONTAINER (Using flex gap for closer grouping) --- */}
      <div className="relative w-full h-full flex items-center justify-between z-10 px-0 pointer-events-none">
         {groupedNodes.map((group, groupIndex) => (
             <div key={groupIndex} className="flex items-center gap-1 md:gap-2 pointer-events-auto">
                 {group.nodes.map((node) => {
                     const i = node.index;
                     const type = node.type;
                     const isActive = i === activeNodeIndex;
                     const isPast = i < activeNodeIndex;
                     const isHovered = hoveredIndex === i;

                     let widthClass = "w-6";
                     if (type === 'layer') widthClass = "w-10";
                     if (type === 'manifesto') widthClass = "w-12";
                     if (type === 'summary') widthClass = "w-8";
                     if (type === 'thankyou') widthClass = "w-8";

                     let scaleClass = isActive ? 'scale-125' : 'scale-100';
                     if (isHovered) scaleClass = 'scale-150';

                     // Styling logic
                     let nodeBg = colors.futureBg;
                     let nodeBorder = colors.futureBorder;
                     
                     if (isActive) {
                         nodeBg = colors.activeMain;
                         nodeBorder = colors.activeMain;
                     } else if (isPast) {
                         nodeBg = colors.pastBg;
                         nodeBorder = colors.pastBorder;
                     }

                     let borderWidth = isDark ? 1.5 : 1;
                     if (isActive) borderWidth = 2;
                     if (isHovered) borderWidth = 0; // Remove border on hover for cleaner look

                     return (
                         <button
                            key={i}
                            ref={el => { nodeRefs.current[i] = el; }}
                            onClick={() => handleNodeClick(i)}
                            onMouseEnter={() => setHoveredIndex(i)}
                            className={`group relative flex items-center justify-center h-24 ${widthClass} focus:outline-none cursor-pointer`}
                         >  
                            {/* TOOLTIP */}
                            <div className={`
                                absolute -top-16 left-1/2 -translate-x-1/2 
                                ${colors.tooltipBg} border 
                                px-4 py-2 rounded-lg shadow-xl backdrop-blur-md
                                whitespace-nowrap transition-all duration-300 pointer-events-none z-50
                                flex flex-col items-center gap-1
                                ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}
                            `}>
                                <span className={`font-mono text-[9px] uppercase tracking-widest leading-none ${colors.tooltipText}`}>
                                    {type === 'layer' ? 'SECTION' : type === 'shift' ? 'SHIFT' : type.toUpperCase()}
                                </span>
                                <span className={`text-xs font-bold tracking-wide uppercase text-[${colors.activeMain}]`}>
                                     {getTooltipText(i)}
                                </span>
                                <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-neutral-300'} border-r border-b rotate-45`}></div>
                            </div>

                            {/* THE VISUAL NODE */}
                            <div className={`relative transition-transform duration-500 ease-out flex items-center justify-center ${scaleClass}`}>
                                
                                {/* 1. Intro */}
                                {type === 'intro' && (
                                    <div className="relative flex items-center justify-center">
                                        <div className={`absolute rounded-full transition-all duration-500 ${isActive ? 'w-8 h-8 opacity-100' : 'w-0 h-0 opacity-0'} ${isDark ? 'bg-white/10' : 'bg-black/5'}`}></div>
                                        <div className={`rounded-full transition-all duration-300 relative z-10 ${isActive ? 'w-4 h-4 shadow-[0_0_20px_white]' : 'w-3 h-3'}`} style={{ backgroundColor: nodeBg }}></div>
                                    </div>
                                )}

                                {/* 2. Layer (Orbit) */}
                                {type === 'layer' && (
                                    <div className={`relative flex items-center justify-center rounded-full border transition-all duration-500 ${isActive ? `w-8 h-8 shadow-[0_0_20px_rgba(220,38,38,0.5)]` : 'w-4 h-4'}`} style={{ backgroundColor: nodeBg, borderColor: nodeBorder, borderWidth: borderWidth }}>
                                        <div className={`rounded-full transition-all duration-300 ${isActive ? 'w-3 h-3 animate-pulse bg-white' : 'w-0 h-0'} ${isPast && !isActive ? 'w-0 h-0' : ''}`}></div>
                                    </div>
                                )}

                                {/* 3. Shift (Diamond) */}
                                {type === 'shift' && (
                                    <div className={`rotate-45 transition-all duration-300 border ${isActive ? `w-4 h-4 shadow-[0_0_15px_rgba(220,38,38,0.5)] z-20` : 'w-3 h-3'} ${isHovered ? `!w-4 !h-4 !bg-[${colors.activeMain}] !rotate-90` : ''}`} style={{ backgroundColor: isActive ? colors.activeMain : nodeBg, borderColor: nodeBorder, borderWidth: borderWidth }}></div>
                                )}

                                {/* 4. Summary (Square) */}
                                {type === 'summary' && (
                                    <div className={`relative flex items-center justify-center transition-all duration-300 border ${isActive ? `w-6 h-6 shadow-[0_0_20px_rgba(220,38,38,0.5)]` : 'w-4 h-4'}`} style={{ backgroundColor: nodeBg, borderColor: nodeBorder, borderWidth: borderWidth }}>
                                        <div className={`w-1 h-1 bg-white transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                                    </div>
                                )}

                                {/* 5. Manifesto (Burst) */}
                                {type === 'manifesto' && (
                                    <div className="relative flex items-center justify-center">
                                        <div className={`absolute w-full h-full bg-[${colors.activeMain}] blur-md transition-all duration-500 ${isActive ? 'opacity-50 scale-150' : 'opacity-0'}`}></div>
                                        <svg className={`transition-all duration-500 ${isActive ? 'w-8 h-8 rotate-180' : 'w-5 h-5 rotate-0'}`} style={{ color: isActive ? '#FFFFFF' : nodeBorder }} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" />
                                        </svg>
                                    </div>
                                )}

                                {/* 6. Thank You (Star/Dot) */}
                                {type === 'thankyou' && (
                                    <div className="relative flex items-center justify-center">
                                         <div className={`absolute w-full h-full bg-[${colors.activeMain}] blur-xl transition-all duration-500 ${isActive ? 'opacity-40 scale-150' : 'opacity-0'}`}></div>
                                         <div className={`transition-all duration-500 rounded-full border flex items-center justify-center ${isActive ? 'w-6 h-6 bg-white border-white' : 'w-4 h-4 border-neutral-500'}`} style={{ borderColor: isActive ? '#FFF' : nodeBorder, backgroundColor: isActive ? '#FFF' : 'transparent' }}>
                                             {isActive && <div className={`w-2 h-2 bg-[${colors.activeMain}] rounded-full`}></div>}
                                         </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Hover Glow */}
                            {isHovered && <div className={`absolute inset-0 ${isDark ? 'bg-white/10' : 'bg-black/5'} blur-xl rounded-full scale-150 pointer-events-none transition-all duration-300`}></div>}
                         </button>
                     );
                 })}
             </div>
         ))}
      </div>

    </div>
  );
};