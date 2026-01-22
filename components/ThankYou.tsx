import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useI18n } from '../hooks/useI18n';

interface ThankYouProps {
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
  onPrev?: () => void;
  lang?: 'en' | 'ru' | 'by' | 'ro';
}

export const ThankYou: React.FC<ThankYouProps> = ({ theme = 'dark', onPrev, lang = 'en' }) => {
  const isDark = theme === 'dark';
  const i18n = useI18n(lang);
  const containerRef = useRef<HTMLDivElement>(null);

  const bgMain = isDark ? 'bg-[#050505]' : 'bg-[#F4F4F5]';
  const textMain = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-600' : 'text-neutral-500';
  const textLinkDesc = isDark ? 'text-neutral-500' : 'text-neutral-600';
  const borderCol = isDark ? 'border-white/10' : 'border-black/10';
  const hoverBg = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5';
  const hoverBorder = isDark ? 'hover:border-white/10' : 'hover:border-black/10';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation for the content
      gsap.from(".thank-content", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`relative w-full min-h-screen ${bgMain} ${textMain} flex flex-col items-center justify-center py-20 px-6 font-sans transition-colors duration-500 overflow-y-auto`}>
        
        {/* MIDDLE: CONTENT */}
        <div ref={containerRef} className="w-full max-w-4xl z-10 flex flex-col items-center justify-center flex-1">
             
            {/* 1. TITLE GROUP */}
            <div className="thank-content text-center mb-16 md:mb-24">
                <h1 className={`text-[15vw] md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase mb-6 select-none ${textMain}`}>
                    {i18n?.thankYou.title || 'Thank You'}
                </h1>
                <p className={`font-mono ${textSecondary} text-xs md:text-sm uppercase tracking-[0.2em]`}>
                    {i18n?.thankYou.subtitle || 'for reading'}
                </p>
            </div>
             
            {/* 2. CREDITS (Horizontal Grid) */}
            <div className={`thank-content w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center border-b ${borderCol} pb-12 mb-12`}>
                 <div>
                     <h4 className="text-[#DC2626] font-bold text-xl md:text-2xl mb-1 tracking-tight">anca stavenski</h4>
                     <p className={`font-mono text-[10px] ${textLinkDesc} uppercase tracking-widest leading-relaxed`}>design & logic</p>
                 </div>
                 <div>
                     <h4 className="text-[#DC2626] font-bold text-xl md:text-2xl mb-1 tracking-tight">alex p</h4>
                     <p className={`font-mono text-[10px] ${textLinkDesc} uppercase tracking-widest leading-relaxed`}>ideation</p>
                 </div>
                 <div>
                     <h4 className="text-[#DC2626] font-bold text-xl md:text-2xl mb-1 tracking-tight">ray svitla</h4>
                     <p className={`font-mono text-[10px] ${textLinkDesc} uppercase tracking-widest leading-relaxed`}>research</p>
                 </div>
            </div>

            {/* 3. LINKS */}
            <div className="thank-content flex flex-col gap-2 w-full max-w-2xl mb-16">
                 {/* Substack */}
                 <a href="https://aimindsetspace.substack.com" target="_blank" rel="noreferrer" className={`group flex flex-col md:flex-row items-center md:items-baseline justify-between gap-2 md:gap-4 w-full p-4 border border-transparent ${hoverBorder} ${hoverBg} rounded-lg transition-all`}>
                     <span className={`${textMain} font-black text-xl md:text-2xl tracking-tighter uppercase group-hover:text-[#DC2626] transition-colors`}>
                        subscribe on substack
                     </span>
                     <div className={`hidden md:block h-px ${isDark ? 'bg-white/10' : 'bg-black/10'} flex-1 mx-4`}></div>
                     <span className={`font-mono ${textLinkDesc} text-[10px] uppercase tracking-widest group-hover:${textMain}`}>
                        get next resets & signals
                     </span>
                 </a>

                 {/* Ecosystem */}
                 <a href="https://aimindset.org" target="_blank" rel="noreferrer" className={`group flex flex-col md:flex-row items-center md:items-baseline justify-between gap-2 md:gap-4 w-full p-4 border border-transparent ${hoverBorder} ${hoverBg} rounded-lg transition-all`}>
                     <span className={`${textMain} font-black text-xl md:text-2xl tracking-tighter uppercase group-hover:text-[#DC2626] transition-colors`}>
                        explore the ecosystem
                     </span>
                     <div className={`hidden md:block h-px ${isDark ? 'bg-white/10' : 'bg-black/10'} flex-1 mx-4`}></div>
                     <span className={`font-mono ${textLinkDesc} text-[10px] uppercase tracking-widest group-hover:${textMain}`}>
                        labs, tools, community
                     </span>
                 </a>

                 {/* Contact */}
                 <a href="mailto:info@aimindset.org" className={`group flex flex-col md:flex-row items-center md:items-baseline justify-between gap-2 md:gap-4 w-full p-4 border border-transparent ${hoverBorder} ${hoverBg} rounded-lg transition-all`}>
                     <span className={`${textMain} font-black text-xl md:text-2xl tracking-tighter uppercase group-hover:text-[#DC2626] transition-colors`}>
                        talk to us
                     </span>
                     <div className={`hidden md:block h-px ${isDark ? 'bg-white/10' : 'bg-black/10'} flex-1 mx-4`}></div>
                     <span className={`font-mono ${textLinkDesc} text-[10px] uppercase tracking-widest group-hover:${textMain}`}>
                        partnerships / speaking
                     </span>
                 </a>
            </div>
        </div>
        
        {/* BOTTOM: FOOTER */}
        <div className="flex flex-col items-center gap-6 z-10 pb-8">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse"></div>
                <p className="font-mono text-[#DC2626] text-xs uppercase tracking-[0.3em]">
                    End of Transmission
                </p>
                <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse"></div>
             </div>
        </div>
    </section>
  );
};