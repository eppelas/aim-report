import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap, ScrollTrigger, MotionPathPlugin } from '../lib/gsap-config';
import { ShiftData } from './shiftsData';
import { ShiftMetaphor } from './ShiftMetaphor';
import { AIMindsetLogo } from './AIMindsetLogo';
import { OpenGraphPreview } from './OpenGraphPreview';
import { useI18n } from '../hooks/useI18n';

const BLOCKED_DOMAINS = [
  'youtube.com',
  'youtu.be',
  't.me',
  'telegram.me',
  'intention.aimindset.org',
  'nature.com',
  'spiridonov.aimindset.org',
  'science.org',
  'technologyreview.com',
  'theverge.com',
  'techcrunch.com',
  'iea.org',
  'mckinsey.com',
  'substack.com',
  'ivanov.aimindset.org',
  'twitter.com', 
  'x.com', 
  'linkedin.com', 
  'facebook.com', 
  'instagram.com', 
  'reddit.com', 
  'tiktok.com',
  'ark-invest.com', 
  'menlovc.com', 
  'wired.com',
  'fortune.com', 
  'qodo.ai', 
  'nngroup.com', 
  'korra.ai',
  'gartner.com', 
  'anthropic.com', 
  'darioamodei.com', 
  'stackoverflow.co',
  'epochai.org', 
  'cnbc.com', 
  'gitclear.com', 
  'hollywoodreporter.com', 
  'cybersecuritydive.com', 
  'deepstrike.io',
  'crowdstrike.com', 
  'allaboutai.com', 
  'forbes.com', 
  'isaca.org',
  'a16z.com'
];

const isUrlBlocked = (url: string): boolean => {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return BLOCKED_DOMAINS.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
};

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
  lang?: 'en' | 'ru' | 'by' | 'ro';
}

export const ReportView: React.FC<ReportViewProps> = ({ onBack, data, onNext, onPrev, isFirst, isLast, theme, toggleTheme, nextLabel, prevLabel, lang = 'en' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSource, setSelectedSource] = useState<any | null>(null);
  const [selectedStat, setSelectedStat] = useState<any | null>(null);
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(false);
  const iframeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showOgPreview, setShowOgPreview] = useState<string | null>(null);
  const [ogData, setOgData] = useState<any>(null);
  const [ogLoading, setOgLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ogCache = useRef<Record<string, any>>({});
  const i18n = useI18n(lang);
  const isDark = theme === 'dark';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const plate1Ref = useRef<SVGRectElement>(null);
  const plate2Ref = useRef<SVGRectElement>(null);
  const tectonicSvgRef = useRef<SVGSVGElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 }); 
  const plate1Pos = useRef({ x: 0, y: 0 });
  const plate2Pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const loadOgData = async (url: string) => {
      if (ogCache.current[url]) {
        setOgData(ogCache.current[url]);
        setOgLoading(false);
        return;
      }

      setOgLoading(true);
      setOgData(null);
      try {
        const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        if (data.status === 'success') {
          const ogResult = {
            title: data.data.title,
            description: data.data.description,
            image: data.data.image?.url || data.data.logo?.url,
            url: data.data.url,
            author: data.data.author,
            date: data.data.date,
            publisher: data.data.publisher,
            logo: data.data.logo?.url
          };
          ogCache.current[url] = ogResult;
          setOgData(ogResult);
        }
      } catch (error) {
        console.error('Failed to fetch OG data:', error);
      } finally {
        setOgLoading(false);
      }
    };

    const currentUrl = selectedSource?.url || selectedStat?.url;
    const shouldShowOg = currentUrl && (isMobile || iframeError || isUrlBlocked(currentUrl));

    if (shouldShowOg) {
      loadOgData(currentUrl);
    } else {
      setOgData(null);
      setOgLoading(false);
    }
  }, [iframeError, selectedSource, selectedStat, isMobile]);

  useEffect(() => {
    if (!selectedSource && !selectedStat) {
      setOgData(null);
      setOgLoading(false);
      setIframeLoading(false);
      if (iframeTimeoutRef.current) {
        clearTimeout(iframeTimeoutRef.current);
        iframeTimeoutRef.current = null;
      }
      return;
    }

    const currentUrl = selectedSource?.url || selectedStat?.url;
    if (currentUrl) {
      setIframeLoading(true);
      iframeTimeoutRef.current = setTimeout(() => {
        setIframeLoading(false);
      }, 5000);
    }
  }, [selectedSource, selectedStat]);

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
  const bgBlock = isDark ? 'bg-neutral-900/80 md:bg-neutral-900/90' : 'bg-white/80 md:bg-white'; 
  const bgSectionAlt = isDark ? 'bg-black/40' : 'bg-white/40';
  const bgSectionDarker = isDark ? 'bg-black/60' : 'bg-white/60';
  const bgBlendMode = isDark ? 'mix-blend-screen opacity-60' : 'mix-blend-multiply opacity-30';
  const gridColor = isDark ? "#333" : "#000"; 

  const prefetchOgData = async (url: string) => {
    if (!url || ogCache.current[url] || !isUrlBlocked(url)) return;
    
    try {
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (data.status === 'success') {
        const ogResult = {
          title: data.data.title,
          description: data.data.description,
          image: data.data.image?.url || data.data.logo?.url,
          url: data.data.url,
          author: data.data.author,
          date: data.data.date,
          publisher: data.data.publisher
        };
        ogCache.current[url] = ogResult;
      }
    } catch (error) {
      // Silent fail for prefetch
    }
  };

  const handleOpenSource = (source: any) => {
     setSelectedSource(source);
     setIframeError(false);
  };

  const getTitleClass = (text: string) => {
      const length = text.length;
      if (length > 50) return "text-3xl md:text-5xl leading-tight";
      if (length > 35) return "text-4xl md:text-6xl leading-tight";
      return "text-4xl md:text-7xl leading-tight";
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
      <section className={`relative min-h-screen flex flex-col items-center justify-center pt-6 md:pt-0 pb-32`} style={{ minHeight: '100vh' }}>
         <div className="relative z-10 text-center max-w-5xl flex flex-col items-center w-full px-4">
            <div className="mb-6 relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center opacity-90">
                <svg viewBox="-100 -100 200 200" className="w-full h-full overflow-visible">
                    <ShiftMetaphor id={data.id} isDark={isDark} centered={true} />
                </svg>
            </div>
            <span className="font-mono text-[#DC2626] text-xs tracking-[0.3em] uppercase mb-4 block">Shift {data.id}</span>
            <h1 className={`${getTitleClass(data.title)} font-black uppercase tracking-tighter mb-4 max-w-4xl mx-auto break-words`}>{data.title}</h1>
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-sans text-transparent" style={{ WebkitTextStroke: `1px ${isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'}` }}>{data.subtitle.replace(/\s*\([^)]*\)/g, '')}</h2>
                <p className={`font-mono ${textSecondary} text-sm md:text-lg tracking-wide max-w-2xl mx-auto mt-4`}>{data.context}</p>
            </div>
         </div>
         
         {/* Scroll down indicator */}
         <div className="absolute bottom-32 left-0 right-0 z-20 flex justify-center pointer-events-none">
            <button 
               onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
               className="flex flex-col items-center gap-2 opacity-60 animate-bounce cursor-pointer hover:opacity-100 transition-opacity p-6 pointer-events-auto"
            >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={isDark ? 'text-white' : 'text-black'}>
                  <path d="M12 5L12 19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </button>
         </div>
      </section>

      {/* THE DIVIDE SECTION */}
      <section className={`relative w-full py-24 ${bgSectionAlt} backdrop-blur-sm`}>
          <div className="relative max-w-7xl mx-auto px-4 md:px-10 z-10">
              <div className="text-center mb-8 md:mb-16 mt-0 md:mt-0"><h2 className={`text-5xl md:text-7xl font-black ${textMain} uppercase tracking-tighter leading-none mb-4`}>{i18n?.shift?.divideTitle || 'The Divide'}</h2></div>
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center justify-items-center mb-16">
                  <div className="absolute top-0 left-0 w-full h-[140%] z-0 pointer-events-none overflow-visible hidden md:block">
                      <svg ref={tectonicSvgRef} className="w-full h-full overflow-visible" viewBox="0 0 1000 1200" preserveAspectRatio="none">
                          <defs>
                              <filter id="glow">
                                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                  <feMerge>
                                      <feMergeNode in="coloredBlur"/>
                                      <feMergeNode in="SourceGraphic"/>
                                  </feMerge>
                              </filter>
                          </defs>
                          {/* Сигнальные линии с анимацией */}
                          <path className="signal-path" d="M 250 350 Q 500 450 750 350" fill="none" stroke={isDark ? "#DC2626" : "#000"} strokeWidth="2" strokeDasharray="10 5" opacity="0.2">
                              <animate attributeName="stroke-dashoffset" from="0" to="15" dur="2s" repeatCount="indefinite"/>
                          </path>
                          <path className="signal-path" d="M 250 350 L 500 850" fill="none" stroke={isDark ? "#DC2626" : "#000"} strokeWidth="1.5" strokeDasharray="8 4" opacity="0.15">
                              <animate attributeName="stroke-dashoffset" from="0" to="12" dur="3s" repeatCount="indefinite"/>
                          </path>
                          <path className="signal-path" d="M 750 350 L 500 850" fill="none" stroke={isDark ? "#DC2626" : "#000"} strokeWidth="1.5" strokeDasharray="8 4" opacity="0.15">
                              <animate attributeName="stroke-dashoffset" from="0" to="12" dur="3.5s" repeatCount="indefinite"/>
                          </path>
                          
                          {/* Machine Icon - CoreGeometry square */}
                          <g className="tectonic-machine" transform="translate(250, 350) scale(0.8)" filter="url(#glow)" opacity="0.5">
                              <rect x="-100" y="-100" width="200" height="200" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="40 10" />
                              <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="#DC2626" strokeWidth="1" strokeOpacity="0.5" />
                              <path d="M-160 0 L-120 0 M120 0 L160 0 M0 -160 L0 -120 M0 120 L0 160" stroke="#DC2626" strokeWidth="2" />
                              <rect x="-60" y="-60" width="120" height="120" fill="rgba(0,0,0,0.8)" stroke="#DC2626" strokeWidth="2" />
                              <rect x="-40" y="-40" width="80" height="80" fill="none" stroke="#DC2626" strokeWidth="2" transform="rotate(45)" />
                          </g>
                          
                          {/* Human Icon - CoreGeometry circle */}
                          <g className="tectonic-human" transform="translate(750, 350) scale(0.8)" filter="url(#glow)" opacity="0.5">
                              <circle r="100" fill="none" stroke={isDark ? "#FFF" : "#000"} strokeWidth="2" strokeDasharray="40 10" />
                              <circle r="140" fill="none" stroke={isDark ? "#FFF" : "#000"} strokeWidth="1" strokeOpacity="0.3" />
                              <path d="M-160 0 L-120 0 M120 0 L160 0 M0 -160 L0 -120 M0 120 L0 160" stroke={isDark ? "#FFF" : "#000"} strokeWidth="2" />
                              <circle r="60" fill="rgba(0,0,0,0.5)" stroke={isDark ? "#FFF" : "#000"} strokeWidth="1" />
                              <circle r="40" fill="none" stroke={isDark ? "#FFF" : "#000"} strokeWidth="2" strokeDasharray="5 5" />
                          </g>
                      </svg>
                  </div>
                  <div className="machine-col relative z-10 w-full">
                      <div className={`group ${bgBlock} backdrop-blur-md md:backdrop-blur-lg border ${borderMain} p-8 rounded-xl h-full shadow-xl transition-all hover:border-[#DC2626] hover:shadow-2xl hover:shadow-[#DC2626]/20`}>
                          <div className="flex items-center gap-3 mb-6">
                              <svg width="16" height="16" viewBox="0 0 24 24" className="flex-shrink-0 group-hover:animate-pulse" fill="none" stroke="#DC2626" strokeWidth="1.5">
                                  <rect x="4" y="4" width="16" height="16" rx="1" />
                                  <circle cx="8" cy="8" r="1.5" fill="#DC2626" />
                                  <circle cx="16" cy="8" r="1.5" fill="#DC2626" />
                                  <circle cx="8" cy="16" r="1.5" fill="#DC2626" />
                                  <circle cx="16" cy="16" r="1.5" fill="#DC2626" />
                                  <line x1="8" y1="8" x2="16" y2="8" />
                                  <line x1="8" y1="16" x2="16" y2="16" />
                                  <line x1="8" y1="8" x2="8" y2="16" />
                                  <line x1="16" y1="8" x2="16" y2="16" />
                                  <line x1="12" y1="8" x2="12" y2="16" />
                                  <line x1="8" y1="12" x2="16" y2="12" />
                              </svg>
                              <span className="font-mono text-xs text-[#DC2626] font-bold uppercase tracking-widest">{data.machineCol.label}</span>
                          </div>
                          <p className={`font-light text-base md:text-lg leading-relaxed ${textSecondary} mb-4`}>
                              {data.machineCol.desc.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-[#DC2626]">{part}</strong> : part)}
                          </p>
                          {data.machineCol.title && data.machineCol.title !== "What's being built" && (
                            <p className="text-sm md:text-base font-medium text-[#DC2626] mt-4 leading-snug">
                              → {data.machineCol.title}
                            </p>
                          )}
                      </div>
                  </div>
                  <div className="human-col relative z-10 w-full">
                      <div className={`group ${bgBlock} backdrop-blur-md md:backdrop-blur-lg border ${borderMain} p-8 rounded-xl h-full shadow-xl transition-all hover:border-${isDark ? 'white' : 'black'} hover:shadow-2xl`}>
                          <div className="flex items-center gap-3 mb-6">
                              <svg width="16" height="16" viewBox="0 0 24 24" className="flex-shrink-0 group-hover:animate-pulse" stroke={isDark ? 'white' : 'black'} fill="none" strokeWidth="2" strokeLinecap="round">
                                  <circle cx="12" cy="6" r="3" />
                                  <line x1="12" y1="9" x2="12" y2="15" />
                                  <line x1="12" y1="11" x2="8" y2="13" />
                                  <line x1="12" y1="11" x2="16" y2="13" />
                                  <line x1="12" y1="15" x2="9" y2="21" />
                                  <line x1="12" y1="15" x2="15" y2="21" />
                              </svg>
                              <span className={`font-mono text-xs ${textMain} font-bold uppercase tracking-widest`}>{data.humanCol.label}</span>
                          </div>
                          <p className={`font-light text-base md:text-lg leading-relaxed ${textSecondary} mb-4`}>
                              {data.humanCol.desc.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>{part}</strong> : part)}
                          </p>
                          {data.humanCol.title && data.humanCol.title !== "How humans adapt" && (
                            <p className={`text-sm md:text-base font-medium ${textMain} mt-4 leading-snug`}>
                              → {data.humanCol.title}
                            </p>
                          )}
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
                  <h2 className={`text-5xl md:text-7xl font-black ${textMain} uppercase tracking-tighter leading-none`}>{i18n?.ui.keyStats || 'Key Stats'}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.stats.map((stat, idx) => (
                      <div 
                          key={idx} 
                          onClick={() => { if (stat.url) { setIframeError(false); setSelectedStat(stat); } }}
                          onMouseEnter={() => stat.url && prefetchOgData(stat.url)}
                          onTouchStart={() => stat.url && prefetchOgData(stat.url)}
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
              <h2 className={`text-5xl md:text-7xl font-black ${textMain} uppercase tracking-tighter leading-none mb-12`}>{i18n?.ui.realityCheck || 'Reality Check'}</h2>
              
              {/* COMMUNITY VOICES - First */}
              {data.voices && data.voices.length > 0 && (
                  <div className="mb-12">
                      <div className={`p-8 md:p-12 rounded-xl border ${borderMain} ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-100'}`}>
                          <div className="flex items-center gap-4 mb-8">
                              <span className={`font-mono text-xs font-bold uppercase tracking-widest ${textSecondary}`}>{i18n?.ui.voices || 'Community Voices'}</span>
                          </div>
                          <div className="space-y-8">
                              {data.voices.map((voice, idx) => (
                                  <div key={idx} className="relative pl-12">
                                      {/* Opening quote */}
                                      <div className="absolute left-0 top-0 text-5xl text-[#DC2626] opacity-40 font-serif leading-none">"</div>
                                      <p className={`text-lg md:text-xl leading-relaxed mb-3 ${textMain}`}>
                                          {voice.tag} — {voice.text}
                                      </p>
                                      <div className="flex items-center gap-3">
                                          <span className="w-8 h-px bg-[#DC2626]"></span>
                                          <p className={`font-mono text-sm ${textSecondary}`}>{voice.author}</p>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              )}

              {/* AI MINDSET EVIDENCE - Second */}
              {data.aimEvidence && data.aimEvidence.length > 0 && (
                  <div className="mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {data.aimEvidence.map((item, idx) => (
                              <button 
                                  key={idx} 
                                  onClick={() => handleOpenSource({ title: item.title, url: item.url, type: "AI Mindset", author: "AI Mindset" })} 
                                  onMouseEnter={() => item.url && prefetchOgData(item.url)}
                                  onTouchStart={() => item.url && prefetchOgData(item.url)}
                                  className={`group block w-full text-left p-8 rounded-lg border ${borderMain} ${bgCard} hover:border-[#DC2626] transition-all shadow-md`}>
                                  <div className="flex items-center gap-3 mb-4">
                                      <AIMindsetLogo className="w-8 h-8 flex-shrink-0" color={isDark ? 'white' : 'black'} />
                                      <span className="font-mono text-xs text-neutral-500 tracking-wide">[ai mindset]</span>
                                  </div>
                                  <h4 className="text-xl md:text-2xl font-bold text-[#DC2626] mb-3">{item.title}</h4>
                                  <p className={`font-mono text-sm leading-relaxed ${textSecondary}`}>{item.description}</p>
                              </button>
                          ))}
                      </div>
                  </div>
              )}

              {/* TOP RESEARCH - Second, no header, no red border */}
              {data.researchTop && data.researchTop.length > 0 && (
                  <div className="mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {data.researchTop.map((item, idx) => (
                              <button
                                  key={idx}
                                  onClick={() => handleOpenSource({ title: item.title, url: item.url, type: "Research", author: "Research" })}
                                  onMouseEnter={() => item.url && prefetchOgData(item.url)}
                                  onTouchStart={() => item.url && prefetchOgData(item.url)}
                                  className={`group block w-full text-left p-6 rounded-lg border ${borderMain} ${bgCard} hover:border-[#DC2626] transition-all`}>
                                  <h4 className={`text-lg font-bold ${textMain} mb-2 group-hover:text-[#DC2626] transition-colors`}>{item.title}</h4>
                                  <p className={`text-sm leading-relaxed ${textSecondary}`}>{item.description}</p>
                              </button>
                          ))}
                      </div>
                  </div>
              )}

              {/* REGULAR RESEARCH - Third, no header */}
              {data.research && data.research.length > 0 && (
                  <div className="mb-12">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {data.research.map((item, idx) => (
                              <button 
                                  key={idx} 
                                  onClick={() => handleOpenSource({ title: item.title, url: item.url, type: "Research", author: "Research" })} 
                                  onMouseEnter={() => item.url && prefetchOgData(item.url)}
                                  onTouchStart={() => item.url && prefetchOgData(item.url)}
                                  className={`group block w-full text-left p-4 rounded-lg border ${borderMain} ${bgCard} hover:border-[#DC2626] transition-all`}>
                                  <h4 className="text-sm font-bold ${textMain} mb-1 group-hover:text-[#DC2626] transition-colors">{item.title}</h4>
                                  <p className={`text-xs leading-relaxed ${textSecondary}`}>{item.description}</p>
                              </button>
                          ))}
                      </div>
                  </div>
              )}
          </div>
      </section>


      {/* NAVIGATION SECTION */}
      <section className={`relative py-16 md:py-32 px-4 md:px-10 border-t ${borderMain} ${bgMain}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-8">
              {/* PREVIOUS BUTTON */}
              {!isFirst && prevLabel && (
                <button 
                  onClick={onPrev} 
                  className={`group flex items-center gap-4 hover:opacity-70 transition-opacity`}
                >
                  <div className={`w-12 h-12 rounded-full border ${borderMain} flex items-center justify-center flex-shrink-0`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M15 19l-7-7 7-7"/>
                    </svg>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className={`font-mono text-[10px] tracking-widest ${textSecondary} mb-1 lowercase`}>
                      {i18n?.ui.prev || "previous"}
                    </span>
                    <span className={`font-sans text-[11px] md:text-base font-semibold ${textMain} max-w-[120px] md:max-w-[300px] line-clamp-2 lowercase leading-tight`}>
                      {prevLabel}
                    </span>
                  </div>
                </button>
              )}
              
              {isFirst && <div></div>}
              
              {/* NEXT BUTTON */}
              {!isLast && nextLabel && (
                <button 
                  onClick={onNext} 
                  className="group flex items-center gap-4 hover:opacity-70 transition-opacity ml-auto"
                >
                  <div className="flex flex-col items-end">
                    <span className={`font-mono text-[10px] tracking-widest ${textSecondary} mb-1 lowercase`}>
                      {i18n?.ui.next || "next"}
                    </span>
                    <span className={`font-sans text-[11px] md:text-base font-semibold ${textMain} max-w-[120px] md:max-w-[300px] line-clamp-2 lowercase leading-tight text-right`}>
                      {nextLabel}
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-[#DC2626] flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </button>
              )}
          </div>
      </section>

      {/* SOURCE MODAL */}
      {selectedSource && (
         <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedSource(null)}></div>
             <div className="relative w-full max-w-6xl h-[90vh] bg-[#0A0A0A] border border-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-2xl z-10">
                 <div className="flex justify-between items-center p-4 border-b border-white/10 bg-neutral-900 shrink-0">
                    <div className="flex gap-4 items-center overflow-hidden"><div className="w-8 h-8 flex-shrink-0 bg-[#DC2626] flex items-center justify-center rounded text-white font-bold">{selectedSource.type ? selectedSource.type[0] : 'S'}</div><div className="flex flex-col overflow-hidden"><span className="text-white font-bold truncate">{selectedSource.title}</span><span className="text-neutral-500 text-xs font-mono uppercase tracking-widest truncate">{selectedSource.author}</span></div></div>
                    <div className="flex items-center gap-1">
                        {selectedSource.url && (
                            <a href={selectedSource.url} target="_blank" rel="noreferrer" className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Open in new tab">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                        )}
                        <button onClick={() => setSelectedSource(null)} className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Close">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                 </div>
                 <div className="flex-1 bg-white relative overflow-hidden">
                    {!selectedSource.url || iframeError || isUrlBlocked(selectedSource.url) || isMobile ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-50 p-10">
                            {ogLoading ? (
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC2626]"></div>
                            ) : ogData ? (
                                <div className="max-w-2xl w-full">
                                    {ogData.image && (
                                        <div className="mb-6 rounded-lg overflow-hidden">
                                            <img src={ogData.image} alt={ogData.title} className="w-full h-64 object-cover" />
                                        </div>
                                    )}
                                    <h2 className="text-2xl font-bold mb-3 text-black">{ogData.title || 'Untitled'}</h2>
                                    {(ogData.author || ogData.publisher || ogData.date) && (
                                        <div className="flex flex-wrap gap-2 mb-4 text-sm text-neutral-500">
                                            {ogData.author && <span>{ogData.author}</span>}
                                            {ogData.publisher && <span>• {ogData.publisher}</span>}
                                            {ogData.date && <span>• {new Date(ogData.date).toLocaleDateString()}</span>}
                                        </div>
                                    )}
                                    <p className="text-base mb-6 text-neutral-600 leading-relaxed">{ogData.description || 'No description available'}</p>
                                    <button 
                                        onClick={() => window.open(selectedSource.url, '_blank')} 
                                        className="px-6 py-3 bg-[#DC2626] text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                                    >
                                        {i18n?.ui.openFullArticle || 'Open Full Article'}
                                    </button>
                                </div>
                            ) : (
                                <div className="max-w-2xl w-full text-center">
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neutral-200 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold mb-2 text-black">{selectedSource.title || 'External Link'}</h2>
                                    {selectedSource.author && <p className="text-sm text-neutral-500 mb-4">{selectedSource.author}</p>}
                                    <p className="text-neutral-600 mb-6 text-sm">{i18n?.ui.previewNotAvailable || 'Preview not available for this link'}</p>
                                    <button 
                                        onClick={() => window.open(selectedSource.url, '_blank')} 
                                        className="px-6 py-3 bg-[#DC2626] text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                                    >
                                        {i18n?.ui.openFullArticle || 'Open Full Article'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <iframe 
                                src={selectedSource.url} 
                                className="w-full h-full border-0" 
                                title={selectedSource.title} 
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                onLoad={() => {
                                    setIframeLoading(false);
                                    if (iframeTimeoutRef.current) {
                                        clearTimeout(iframeTimeoutRef.current);
                                        iframeTimeoutRef.current = null;
                                    }
                                }}
                                onError={() => setIframeError(true)}
                            />
                            {iframeLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/90 pointer-events-none">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC2626] mx-auto mb-4"></div>
                                        <p className="text-neutral-600 text-sm">Loading...</p>
                                    </div>
                                </div>
                            )}
                        </>
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
                    <div className="flex items-center gap-1">
                        {selectedStat.url && (
                            <a href={selectedStat.url} target="_blank" rel="noreferrer" className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Open in new tab">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                        )}
                        <button onClick={() => setSelectedStat(null)} className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Close">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                 </div>
                 <div className="flex-1 bg-white relative overflow-hidden">
                    {!selectedStat.url || iframeError || isUrlBlocked(selectedStat.url) || isMobile ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-50 p-10">
                            {ogLoading ? (
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC2626]"></div>
                            ) : ogData ? (
                                <div className="max-w-2xl w-full">
                                    {ogData.image && (
                                        <div className="mb-6 rounded-lg overflow-hidden">
                                            <img src={ogData.image} alt={ogData.title} className="w-full h-64 object-cover" />
                                        </div>
                                    )}
                                    <h2 className="text-2xl font-bold mb-3 text-black">{ogData.title || 'Untitled'}</h2>
                                    {(ogData.author || ogData.publisher || ogData.date) && (
                                        <div className="flex flex-wrap gap-2 mb-4 text-sm text-neutral-500">
                                            {ogData.author && <span>{ogData.author}</span>}
                                            {ogData.publisher && <span>• {ogData.publisher}</span>}
                                            {ogData.date && <span>• {new Date(ogData.date).toLocaleDateString()}</span>}
                                        </div>
                                    )}
                                    <p className="text-base mb-6 text-neutral-600 leading-relaxed">{ogData.description || 'No description available'}</p>
                                    <button 
                                        onClick={() => window.open(selectedStat.url, '_blank')} 
                                        className="px-6 py-3 bg-[#DC2626] text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                                    >
                                        {i18n?.ui.openFullArticle || 'Open Full Article'}
                                    </button>
                                </div>
                            ) : (
                                <div className="max-w-2xl w-full text-center">
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neutral-200 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold mb-2 text-black">{selectedStat.value} - {selectedStat.label}</h2>
                                    <p className="text-sm text-neutral-500 mb-4">{selectedStat.desc}</p>
                                    <p className="text-neutral-600 mb-6 text-sm">{i18n?.ui.previewNotAvailable || 'Preview not available for this link'}</p>
                                    <button 
                                        onClick={() => window.open(selectedStat.url, '_blank')} 
                                        className="px-6 py-3 bg-[#DC2626] text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                                    >
                                        {i18n?.ui.openFullArticle || 'Open Full Article'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <iframe 
                                src={selectedStat.url} 
                                className="w-full h-full border-0" 
                                title={selectedStat.desc} 
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                onLoad={() => {
                                    setIframeLoading(false);
                                    if (iframeTimeoutRef.current) {
                                        clearTimeout(iframeTimeoutRef.current);
                                        iframeTimeoutRef.current = null;
                                    }
                                }}
                                onError={() => setIframeError(true)}
                            />
                            {iframeLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/90 pointer-events-none">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC2626] mx-auto mb-4"></div>
                                        <p className="text-neutral-600 text-sm">Loading...</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                 </div>
             </div>
         </div>
      )}

      {showOgPreview && (
         <OpenGraphPreview url={showOgPreview} onClose={() => setShowOgPreview(null)} theme={theme} />
      )}
    </div>
  );
};