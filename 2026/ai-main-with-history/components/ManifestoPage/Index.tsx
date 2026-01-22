import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ManifestoPageProps } from './types';
import { ProtocolCard } from './ProtocolCard';
import { EcoVisual } from './EcoVisuals';
import { useI18n } from '../../hooks/useI18n';

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
  'ivanov.aimindset.org'
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

export const ManifestoPage: React.FC<ManifestoPageProps> = ({ onRestart, onNext, onPrev, theme = 'dark', lang = 'en' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const protocolsRef = useRef<HTMLDivElement>(null);
  const ecoGridRef = useRef<HTMLDivElement>(null);
  const [iframeError, setIframeError] = useState(false);
  const [ogData, setOgData] = useState<any>(null);
  const [ogLoading, setOgLoading] = useState(false);
  const ogCache = useRef<Record<string, any>>({});
  const i18n = useI18n(lang);
  
  const isDark = theme === 'dark';

  // --- THEME CONFIGURATION ---
  const styles = {
      bg: isDark ? 'bg-[#0A0A0A]' : 'bg-[#FAFAFA]',
      textMain: isDark ? 'text-white' : 'text-neutral-900',
      textSec: isDark ? 'text-neutral-300' : 'text-neutral-700',
      textDim: isDark ? 'text-neutral-500' : 'text-neutral-500',
      border: isDark ? 'border-white/10' : 'border-black/10',
      borderDashed: isDark ? 'border-white/10' : 'border-black/10',
      cardBg: isDark ? 'bg-[#111]' : 'bg-white',
      cardBorder: isDark ? 'border-white/10' : 'border-black/5',
      statGroup: isDark ? 'group-hover:text-white' : 'group-hover:text-black',
      footerBg: isDark ? 'bg-[#121212]' : 'bg-neutral-50',
      selection: 'selection:bg-[#DC2626] selection:text-white',
  };

  // Hero Parallax State
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });

  // Micro-Browser State
  const [browserUrl, setBrowserUrl] = useState<string | null>(null);
  const [browserTitle, setBrowserTitle] = useState<string | null>(null);

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
            publisher: data.data.publisher
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

    const shouldShowOg = browserUrl && (iframeError || isUrlBlocked(browserUrl));
    if (shouldShowOg) {
      loadOgData(browserUrl);
    } else {
      setOgData(null);
      setOgLoading(false);
    }
  }, [iframeError, browserUrl]);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height } = currentTarget.getBoundingClientRect();
      setHeroMouse({
          x: (clientX / width) - 0.5,
          y: (clientY / height) - 0.5
      });
  };

  const openBrowser = (url: string, title: string) => {
      setBrowserUrl(url);
      setBrowserTitle(title);
  };

  useLayoutEffect(() => {
      window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);

      // 1. HERO REVEAL
      const tlHero = gsap.timeline();
      
      tlHero.from(q('.hero-sub-text'), { opacity: 0, duration: 0.3, ease: "none" }, 0)
            .from(q('.hero-line'), { scaleX: 0, duration: 0.8, ease: "expo.out" }, 0.2)
            .from(q('.hero-title span'), { y: 15, opacity: 0, filter: 'blur(12px)', stagger: 0.06, duration: 1.4, ease: "power2.out" }, 0.4);

      // 2. STATS COUNTER
      gsap.from(q('.stat-item'), {
          scrollTrigger: { trigger: ".stats-row", start: "top 95%" },
          opacity: 0, duration: 0.4, stagger: 0.05, ease: "power1.out"
      });

      // 3. "THE VOID"
      gsap.from(q('.void-text'), {
          scrollTrigger: { trigger: ".void-section", start: "top 90%", end: "bottom 60%", scrub: 0.5 },
          opacity: 0.4, stagger: 0.02
      });

      gsap.to(q('.void-glow'), {
          boxShadow: "0 0 30px rgba(220, 38, 38, 0.4), inset 0 0 15px rgba(220, 38, 38, 0.2)",
          duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut"
      });

      // 4. PROTOCOLS ANIMATION
      const protocolCards = q('.protocol-card-wrapper');
      if (protocolCards.length > 0) {
          gsap.from(protocolCards, {
              scrollTrigger: { trigger: protocolsRef.current, start: "top 85%" },
              opacity: 0, stagger: 0.05, duration: 0.5, ease: "power2.out"
          });
      }

      // 6. FOOTER LINKS
      gsap.from(q('.footer-link'), {
          scrollTrigger: { trigger: ".footer-section", start: "top 98%" },
          opacity: 0, stagger: 0.04, duration: 0.3
      });

    }, containerRef);

    return () => ctx.revert();
  }, [theme]);

  const ecosystemItems = [
    { id: 'ivanov', type: 'psych', title: 'Ivanov Psych', desc: 'IFS + AI: Protecting the psyche.', url: 'https://ivanov.aimindset.org', span: 'col-span-1' },
    { id: 'attention', type: 'attention', title: 'Intention OS', desc: 'Managing attention when context explodes.', url: 'https://intention.aimindset.org', span: 'col-span-1' },
    { id: 'spiridonov', type: 'philo', title: 'Pragmatic Romanticism', desc: 'Defense against cold logic.', url: 'https://spiridonov.aimindset.org', span: 'col-span-1' },
    { id: 'founder', type: 'media', title: 'Founder OS', desc: 'Mental health firewalls on YouTube.', url: 'https://youtube.com/@aimindsetlabs', span: 'col-span-1' },
    { id: 'ark', type: 'ark', title: 'AI ARK Knowledge System', desc: 'Comprehensive knowledge architecture for the AI age.', url: 'https://aimindsetspace.substack.com/p/ai-ark-knowledge-system', span: 'md:col-span-2' },
    { id: 'gemini', type: 'code', title: 'Gemini 3.0 Guide', desc: 'Practical guides from community.', url: 'https://telegram.me/ai_mind_set/282', span: 'col-span-1' },
    { id: 'telegram', type: 'community', title: '@ai_mind_set', desc: 'Daily signals & field notes.', url: 'https://t.me/ai_mind_set', span: 'md:col-span-1 lg:col-span-1' },
  ];

  return (
    <section ref={containerRef} className={`relative w-full ${styles.bg} ${styles.textMain} overflow-hidden ${styles.selection} transition-colors duration-500`}>
        
        {/* --- MICRO BROWSER MODAL --- */}
        {browserUrl && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" onClick={() => setBrowserUrl(null)}></div>
                <div className={`relative w-full h-full max-w-7xl ${isDark ? 'bg-[#111] border-neutral-800' : 'bg-white border-neutral-300'} border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300`}>
                    <div className={`h-14 ${isDark ? 'bg-[#111] border-neutral-800' : 'bg-[#F0F0F0] border-neutral-300'} border-b flex items-center px-4 gap-4 shrink-0`}>
                        <div className="flex gap-2">
                            <button onClick={() => setBrowserUrl(null)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors group flex items-center justify-center"><span className="opacity-0 group-hover:opacity-100 text-[8px] text-black font-bold">x</span></button>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className={`flex-1 ${isDark ? 'bg-[#000] border-neutral-800 text-neutral-500' : 'bg-white border-neutral-300 text-neutral-600'} border h-9 rounded-md flex items-center px-3 gap-2 font-mono text-xs overflow-hidden`}>
                            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z"/></svg>
                            <span className="truncate">{browserUrl}</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <a href={browserUrl} target="_blank" rel="noreferrer" className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'}`}>
                                <span>{i18n?.manifesto.openInNewTab || 'Open in New Tab'}</span>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 0 0-2-2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                             </a>
                             <button onClick={() => setBrowserUrl(null)} className={`p-2 ${isDark ? 'hover:bg-neutral-800 text-neutral-400 hover:text-white' : 'hover:bg-neutral-200 text-neutral-500 hover:text-black'} rounded transition-colors`}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                             </button>
                        </div>
                    </div>
                    <div className="flex-1 bg-white relative">
                        {iframeError || isUrlBlocked(browserUrl) ? (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-50 p-10 overflow-y-auto">
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
                                            onClick={() => window.open(browserUrl, '_blank')} 
                                            className="px-6 py-3 bg-[#DC2626] text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                                        >
                                            Open Full Article
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-neutral-600 mb-6">Could not load preview</p>
                                        <button 
                                            onClick={() => window.open(browserUrl, '_blank')} 
                                            className="px-6 py-3 bg-[#DC2626] text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                                        >
                                            Open Link
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <iframe 
                                src={browserUrl} 
                                className="w-full h-full border-0" 
                                title={browserTitle || "Browser"} 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                                onError={() => setIframeError(true)}
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>
        )}

        <div ref={heroRef} onMouseMove={handleHeroMouseMove} className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-20">
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#DC2626] opacity-[0.04] blur-[120px] pointer-events-none rounded-full transition-transform duration-200 ease-out will-change-transform" style={{ transform: `translate(${heroMouse.x * -50}px, ${heroMouse.y * -50}px)` }}></div>
            <div className="max-w-7xl mx-auto w-full z-10 relative">
                <p className="hero-sub-text font-mono text-[#DC2626] text-sm md:text-base tracking-[0.2em] uppercase mb-6">{i18n?.manifesto.soWhatsNext || "So... what's next?"}</p>
                <h1 className={`hero-title text-[12vw] leading-[0.85] font-black uppercase tracking-tighter mb-12 ${isDark ? 'mix-blend-lighten' : 'mix-blend-darken'} perspective-[1000px]`}>
                    {i18n?.manifesto.title1 && <span className={`block ${styles.textMain}`} style={{ transform: `translateX(${heroMouse.x * 20}px)` }}>{i18n.manifesto.title1}</span>}
                    <span className={`block ${styles.textMain}`} style={{ transform: `translateX(${heroMouse.x * -20}px)` }}>{i18n?.manifesto.title2 || 'Sovereignty'}</span>
                    {i18n?.manifesto.title3 && <span className="block text-[#DC2626]" style={{ transform: `translateX(${heroMouse.x * 40}px)` }}>{i18n.manifesto.title3}</span>}
                </h1>
                <div className={`hero-line w-full h-[1px] ${isDark ? 'bg-white/20' : 'bg-black/10'} mb-12 origin-left`}></div>
                <div className="hero-sub-text grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
                    <p className={`text-xl md:text-2xl font-light leading-relaxed ${styles.textSec}`}>
                        {i18n?.manifesto.intro || 'This report is done by the'} <a href="https://aimindset.org" target="_blank" rel="noreferrer" className={`font-bold ${styles.textMain} border-b-2 border-[#DC2626] hover:bg-[#DC2626] hover:text-white transition-all px-1`}>{i18n?.manifesto.aiMindsetTeam || 'AI Mindset'}</a> {i18n?.manifesto.notInstitute || "team. We're not a research institute. We're a"} <span className={`${styles.textMain} font-bold`}>{i18n?.manifesto.lab || 'lab'}</span> {i18n?.manifesto.practice || '— a place where people practice AI.'}
                    </p>
                </div>
            </div>
        </div>

        <div className={`stats-row border-y ${styles.border} ${isDark ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-sm`}>
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div className="stat-item group cursor-default"><span className={`block text-5xl md:text-6xl font-black ${styles.textMain} mb-2 group-hover:text-[#DC2626] transition-colors`}>1,500+</span><span className={`font-mono text-xs uppercase tracking-widest text-[#DC2626] ${styles.statGroup} transition-colors`}>Participants</span></div>
                <div className="stat-item group cursor-default"><span className={`block text-5xl md:text-6xl font-black ${styles.textMain} mb-2 group-hover:text-[#DC2626] transition-colors`}>30+</span><span className={`font-mono text-xs uppercase tracking-widest text-[#DC2626] ${styles.statGroup} transition-colors`}>Countries</span></div>
                <div className="stat-item group cursor-default"><span className={`block text-5xl md:text-6xl font-black ${styles.textMain} mb-2 group-hover:text-[#DC2626] transition-colors`}>3 Years</span><span className={`font-mono text-xs uppercase tracking-widest text-[#DC2626] ${styles.statGroup} transition-colors`}>Field Work</span></div>
            </div>
        </div>

        <div className="void-section relative py-32 px-6">
            <div className="max-w-4xl mx-auto">
                <p className={`void-text font-mono text-sm ${styles.textDim} mb-8 uppercase tracking-widest`}>[ The Context ]</p>
                <h2 className={`void-text text-3xl md:text-5xl font-bold leading-tight mb-12 ${styles.textMain}`}>This report isn't desk research. It's hardened by <span className="text-[#DC2626]">field notes</span> from labs, artifacts from community, and real shifts people are living through.</h2>
                <div className="void-text grid grid-cols-1 md:grid-cols-2 gap-12 border-l-2 border-[#DC2626] pl-8">
                    <div>
                        <h3 className={`font-mono ${styles.textMain} font-bold uppercase mb-4`}>The Discourse</h3>
                        <ul className={`space-y-4 ${styles.textDim}`}><li><strong className={styles.textMain}>Utopian Hype:</strong> Consultancies sell transformation.</li><li><strong className={styles.textMain}>Existential Panic:</strong> Media sells fear.</li><li><strong className={styles.textMain}>Optimization:</strong> Leaders measure gigawatts.</li></ul>
                    </div>
                    <div>
                        <h3 className={`font-mono ${styles.textMain} font-bold uppercase mb-4`}>The Reality</h3>
                        <p className={`${styles.textDim} leading-relaxed mb-6`}>Technologists like Amodei and Andreessen view the world from the top down.</p>
                        <div className="void-glow group cursor-pointer inline-block px-6 py-4 border border-[#DC2626] rounded bg-[#DC2626]/10 backdrop-blur-sm relative overflow-hidden"><div className="absolute inset-0 bg-[#DC2626]/20 animate-pulse group-hover:bg-[#DC2626] transition-colors duration-500"></div><p className={`text-2xl ${isDark ? 'text-white' : 'text-black'} font-black uppercase relative z-10 tracking-wider flex items-center gap-4 group-hover:text-white transition-colors`}><span>We fill the void.</span><svg className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></p></div>
                    </div>
                </div>
            </div>
        </div>

        <div className={`relative py-20 md:py-40 px-6 ${isDark ? 'bg-black' : 'bg-white'} flex flex-col items-center justify-center text-center`}>
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at center, ${isDark ? '#222' : '#ddd'} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
            <div className="max-w-6xl mx-auto relative z-10"><span className={`block text-[6rem] md:text-[10rem] leading-none font-serif ${isDark ? 'text-[#222]' : 'text-neutral-200'} opacity-50 select-none mb-[-4rem] md:mb-[-6rem]`}>“</span><h2 className={`text-3xl md:text-5xl font-black ${styles.textMain} leading-[1.2] tracking-tight`}>We take <span className="text-[#DC2626] border-b-4 border-[#DC2626]">human adaptation constraints</span> as seriously as technological acceleration. While AI compresses 100 years of science into a decade, we provide the <span className={`${styles.textMain} border-b-2 ${isDark ? 'border-white/30' : 'border-black/10'}`}>manual for the human being</span> to not burn out in the process.</h2><span className={`block text-[6rem] md:text-[10rem] leading-none font-serif ${isDark ? 'text-[#222]' : 'text-neutral-200'} opacity-50 select-none mt-[-2rem] md:mt-[-4rem] text-right`}>”</span></div>
        </div>

        <div ref={protocolsRef} className={`relative py-20 md:py-32 px-6 ${styles.bg} border-t ${styles.border}`}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-20 text-center md:text-left"><h2 className={`text-4xl md:text-8xl font-black uppercase mb-6 ${styles.textMain} tracking-tighter`}>Protocols</h2><p className={`font-mono ${styles.textDim} max-w-2xl text-lg mb-6`}>Our life runs on configuration. What you say yes to. What interrupts you. Let's move from "I'll try" to "I have defaults".</p><div className={`${styles.cardBg} p-6 rounded-xl border ${styles.border} inline-block text-left max-w-3xl relative z-10`}><p className={`${styles.textSec} text-lg font-light leading-relaxed mb-4`}>We are exploring on how to stay mindful with the changes around and in our life, and invite you to join us. At any comfortable level.</p><p className="font-mono text-[#DC2626] uppercase text-xs font-bold tracking-widest">some practices we're testing in the labs:</p></div></div>
                <div className="relative flex flex-col gap-8 mt-16">
                    <div className="protocol-card-wrapper"><ProtocolCard theme={theme} level="Level 01" title="Simple" subtitle="Start Here" items={["Notice when you accept AI output without thinking.", "Save one idea offline. Write it by hand.", "Turn off one notification. Reclaim 10 minutes.", "Clarify your thinking <strong>before</strong> you ask AI.", "Pause before trusting output."]} /></div>
                    <div className="protocol-card-wrapper"><ProtocolCard theme={theme} level="Level 02" title="Moderate" subtitle="Build Habits" items={["Create a personal knowledge base for one domain.", "Test 3 models on the same question to see bias.", "Implement one context filter.", "Warn the older generation about synthesized information.", "Practice analog: phone calls, handwriting."]} /></div>
                    <div className="protocol-card-wrapper"><ProtocolCard theme={theme} level="Level 03" title="Advanced" subtitle="Build Systems" color="red" items={["Deploy guardian agents.", "Establish family \"secret handshakes\".", "Build local-first workflows.", "Audit reasoning traces.", "Opt out of training data."]} /></div>
                    <div className="protocol-card-wrapper"><ProtocolCard theme={theme} level="Level 04" title="Deep" subtitle="Structural" items={["Shift from Creator to Consigliere.", "Value tacit knowledge.", "Practice divergent testing."]} /></div>
                </div>
                <div className={`mt-16 p-8 text-center border border-dashed ${styles.borderDashed} rounded-xl`}><p className={`font-mono ${styles.textDim} text-sm`}>We can't close all the gaps, though we at least can be aware of them and act accordingly.</p></div>
            </div>
        </div>

        <div className={`relative py-20 md:py-32 px-6 ${styles.bg}`}><div className="max-w-7xl mx-auto"><h2 className={`text-4xl font-black uppercase mb-12 text-center md:text-left ${styles.textMain}`}>Our Ecosystem</h2><div ref={ecoGridRef} className="eco-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">{ecosystemItems.map((item) => (<div key={item.id} onClick={() => openBrowser(item.url, item.title)} className={`eco-card group relative ${styles.cardBg} border ${styles.cardBorder} rounded-xl overflow-hidden hover:border-[#DC2626] ${isDark ? 'hover:bg-[#161616]' : 'hover:bg-neutral-50'} transition-all duration-300 flex flex-col cursor-pointer ${item.span} min-h-[250px] shadow-sm`}><div className="absolute top-0 right-0 w-full h-full opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none"><EcoVisual type={item.type} theme={theme} /></div><div className="p-6 flex flex-col justify-end h-full relative z-10"><span className="font-mono text-[10px] text-[#DC2626] uppercase tracking-widest mb-3 block">{item.type}</span><h3 className={`text-2xl font-bold ${styles.textMain} leading-tight mb-3 group-hover:text-[#DC2626] transition-colors`}>{item.title}</h3><p className={`text-sm ${styles.textDim} line-clamp-3 leading-relaxed`}>{item.desc}</p></div></div>))}</div></div></div>

        <div className={`footer-section relative pt-32 pb-12 px-6 ${styles.footerBg} ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            <div className="max-w-4xl mx-auto text-center mb-24">
                <p className={`font-mono text-sm uppercase tracking-widest mb-8 ${styles.textDim}`}>Stay Connected</p>
                <h2 className="text-4xl md:text-7xl font-black uppercase mb-8 leading-none tracking-tighter">Don't lose<br/>the thread.</h2>
                <p className={`text-lg md:text-xl ${styles.textDim} mb-12 max-w-2xl mx-auto`}>If this artifact helped you name the friction, join us for the next resets, field notes, and lab openings.</p>
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <a href="https://aimindsetspace.substack.com" target="_blank" rel="noreferrer" className={`px-10 py-5 bg-[#DC2626] text-white font-bold uppercase tracking-widest ${isDark ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'} transition-colors text-sm`}>Subscribe on Substack</a>
                    <a href="#" className={`px-10 py-5 border ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'} font-bold uppercase tracking-widest transition-colors text-sm`}>Enroll in Labs</a>
                </div>
                <p className={`mt-8 font-mono text-xs ${styles.textDim} uppercase`}>Signals only. No spam. Unsubscribe anytime.</p>
            </div>
            
            <div className={`max-w-6xl mx-auto pt-24 border-t ${styles.border}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
                    <a href="https://t.me/ai_mind_set" target="_blank" rel="noreferrer" className="footer-link group"><div className={`font-mono text-xs uppercase tracking-widest ${styles.textDim} mb-2`}>Telegram</div><div className={`text-2xl font-bold ${styles.textMain} group-hover:text-[#DC2626] transition-colors`}>Subscribe</div></a>
                    <a href="https://aimindset.org" target="_blank" rel="noreferrer" className="footer-link group"><div className={`font-mono text-xs uppercase tracking-widest ${styles.textDim} mb-2`}>Website</div><div className={`text-2xl font-bold ${styles.textMain} group-hover:text-[#DC2626] transition-colors`}>aimindset.org</div></a>
                    <a href="mailto:info@aimindset.org" className="footer-link group"><div className={`font-mono text-xs uppercase tracking-widest ${styles.textDim} mb-2`}>Email</div><div className={`text-2xl font-bold ${styles.textMain} group-hover:text-[#DC2626] transition-colors`}>info@aimindset.org</div></a>
                    <a href="https://www.youtube.com/@A-I-Mindset/videos" target="_blank" rel="noreferrer" className="footer-link group"><div className={`font-mono text-xs uppercase tracking-widest ${styles.textDim} mb-2`}>YouTube</div><div className={`text-2xl font-bold ${styles.textMain} group-hover:text-[#DC2626] transition-colors`}>@A-I-Mindset</div></a>
                </div>

                {/* --- NAVIGATION BUTTONS (Relocated to the very bottom) --- */}
                <div className="flex flex-col md:flex-row justify-center mt-20 mb-12 gap-6 md:gap-8 w-full">
                    <button 
                        onClick={onPrev} 
                        className={`px-8 py-4 border ${isDark ? 'border-neutral-800 text-neutral-500' : 'border-neutral-300 text-neutral-600'} font-mono text-[10px] uppercase tracking-[0.2em] hover:text-[#DC2626] hover:border-[#DC2626] transition-all flex items-center justify-center gap-3`}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Review Summary
                    </button>
                    <button 
                        onClick={onNext} 
                        className={`${isDark ? 'bg-white text-black' : 'bg-black text-white'} px-10 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#DC2626] hover:text-white transition-all shadow-xl flex items-center justify-center gap-3`}
                    >
                        Finish Transmission
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>

                <div className={`mt-12 pt-8 border-t ${styles.border} flex flex-col md:flex-row justify-between items-center text-sm font-mono ${styles.textDim}`}>
                    <p>&copy; 2026 AI Mindset Lab.</p>
                </div>
            </div>
        </div>

    </section>
  );
};