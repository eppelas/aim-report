import React, { useLayoutEffect, useState, useEffect, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './components/Hero';
import { TectonicShifts } from './components/TectonicShiftsAnimation';
import { VariableTextSection } from './components/VariableTextSection';
import { ReportView } from './components/ReportView';
import { LayerView } from './components/LayerView';
import { SummaryView } from './components/SummaryView';
import { TimelineNav, TimelineItem } from './components/TimelineNav'; 
import { IndexNavigation } from './components/NavigationPopUp/IndexNavigation';
import { shifts, layers, ShiftData, LayerData } from './components/shiftsData';
import { ThankYou } from './components/ThankYou';
import { ManifestoPage } from './components/ManifestoPage/Index';
import { AIMindsetLogo } from './components/AIMindsetLogo';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const timeline = useMemo<TimelineItem[]>(() => {
    const items: TimelineItem[] = [];
    const sortedShifts = [...shifts].sort((a, b) => parseInt(a.id) - parseInt(b.id));

    layers.forEach(layer => {
        items.push({ type: 'layer', data: layer });
        const layerShifts = sortedShifts.filter(s => s.layerId === layer.id);
        layerShifts.forEach(shift => {
            items.push({ type: 'shift', data: shift });
        });
    });

    const summaryLayer: LayerData = {
        id: "SUM",
        title: "EXECUTIVE SUMMARY",
        subtitle: "11 Tectonic Shifts",
        desc: "A consolidated view of the divergence between machine capability and human adaptation.",
        constraint: "The Context Gap",
        metaphor: 'globe' 
    };

    items.push({ 
        type: 'summary', 
        data: { ...summaryLayer, shifts: sortedShifts } 
    });

    return items;
  }, []);

  const getHashFromIndex = (idx: number) => {
      const item = timeline[idx];
      if (!item) return 'main'; 
      if (item.type === 'layer') return `layer-${item.data.id}`;
      if (item.type === 'summary') return `summary`;
      return `shift-${item.data.id}`;
  };

  const getIndexFromHash = (hash: string) => {
      const cleanHash = hash.replace('#', '');
      if (!cleanHash || cleanHash === 'main') return -1; 
      if (cleanHash === 'conclusion') return -2; 
      if (cleanHash === 'thankyou') return -3; 
      
      const foundIndex = timeline.findIndex(item => {
          if (item.type === 'layer') return `layer-${item.data.id}` === cleanHash;
          if (item.type === 'summary') return `summary` === cleanHash;
          return `shift-${item.data.id}` === cleanHash;
      });

      return foundIndex === -1 ? -1 : foundIndex;
  };

  const [viewState, setViewState] = useState<{ view: 'landing' | 'report' | 'conclusion' | 'thankyou', index: number }>(() => {
      if (typeof window !== 'undefined') {
          if ('scrollRestoration' in window.history) {
              window.history.scrollRestoration = 'manual';
          }
          const idx = getIndexFromHash(window.location.hash);
          if (idx === -3) return { view: 'thankyou', index: 0 };
          if (idx === -2) return { view: 'conclusion', index: 0 };
          if (idx !== -1) return { view: 'report', index: idx };
      }
      return { view: 'landing', index: 0 };
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('aim-theme');
        if (saved === 'light' || saved === 'dark') return saved;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
    }
    return 'dark';
  });

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
      localStorage.setItem('aim-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      // Ensure body background matches theme to prevent black flickering during navigation
      document.body.style.backgroundColor = theme === 'dark' ? '#0A0A0A' : '#F4F4F5';
  }, [theme]);

  const [lang, setLang] = useState<'en' | 'ru' | 'by' | 'ro'>('en');
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
      let targetHash = 'main';
      if (viewState.view === 'report') targetHash = getHashFromIndex(viewState.index);
      if (viewState.view === 'conclusion') targetHash = 'conclusion';
      if (viewState.view === 'thankyou') targetHash = 'thankyou';

      const currentHash = window.location.hash.replace('#', '');
      if (currentHash !== targetHash) {
          try {
              window.history.pushState(null, '', `#${targetHash}`);
          } catch (e) {
              window.location.hash = targetHash;
          }
      }
      setIsNavVisible(viewState.view !== 'landing');
  }, [viewState, timeline]);

  useEffect(() => {
      const handlePopState = () => {
          const idx = getIndexFromHash(window.location.hash);
          if (idx === -3) setViewState({ view: 'thankyou', index: 0 });
          else if (idx === -2) setViewState({ view: 'conclusion', index: 0 });
          else if (idx !== -1) setViewState({ view: 'report', index: idx });
          else setViewState({ view: 'landing', index: 0 });
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
  }, [timeline]);

  const openReport = useCallback(() => setViewState({ view: 'report', index: 0 }), []);
  const closeReport = useCallback(() => setViewState({ view: 'landing', index: 0 }), []);
  const handleNavigate = useCallback((index: number) => setViewState({ view: 'report', index }), []);

  const handleNext = useCallback(() => {
      setViewState(prev => {
          if (prev.view === 'landing') return { view: 'report', index: 0 };
          if (prev.view === 'report') {
              if (prev.index >= timeline.length - 1) return { view: 'conclusion', index: 0 };
              return { ...prev, index: prev.index + 1 };
          }
          if (prev.view === 'conclusion') return { view: 'thankyou', index: 0 };
          return prev;
      });
  }, [timeline.length]);

  const handlePrev = useCallback(() => {
      setViewState(prev => {
          if (prev.view === 'report') {
              if (prev.index > 0) return { ...prev, index: prev.index - 1 };
              return { view: 'landing', index: 0 };
          }
          if (prev.view === 'conclusion') return { view: 'report', index: timeline.length - 1 };
          if (prev.view === 'thankyou') return { view: 'conclusion', index: 0 };
          return prev;
      });
  }, [timeline.length]);

  const handleJumpToConclusion = useCallback(() => setViewState({ view: 'conclusion', index: 0 }), []);
  const handleJumpToThankYou = useCallback(() => setViewState({ view: 'thankyou', index: 0 }), []);
  
  const handleIndexNavigate = useCallback((type: string, id?: string) => {
      if (type === 'landing') closeReport();
      else if (type === 'manifesto') handleJumpToConclusion();
      else if (type === 'thankyou') handleJumpToThankYou();
      else if (type === 'summary') {
          const idx = timeline.findIndex(t => t.type === 'summary');
          if (idx !== -1) setViewState({ view: 'report', index: idx });
      } else if (type === 'layer') {
          const idx = timeline.findIndex(t => t.type === 'layer' && t.data.id === id);
          if (idx !== -1) setViewState({ view: 'report', index: idx });
      } else if (type === 'shift') {
          const idx = timeline.findIndex(t => t.type === 'shift' && t.data.id === id);
          if (idx !== -1) setViewState({ view: 'report', index: idx });
      }
  }, [timeline, closeReport, handleJumpToConclusion, handleJumpToThankYou]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isForward = e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.code === 'Space';
      const isBackward = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
      if ((isForward || isBackward) && viewState.view !== 'landing') e.preventDefault();
      if (isForward) {
          if (viewState.view === 'landing') {
              if (e.key === 'ArrowRight' || e.key === 'Enter') openReport();
          } else handleNext();
      } else if (isBackward && viewState.view !== 'landing') handlePrev();
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [viewState.view, handleNext, handlePrev, openReport]);

  useLayoutEffect(() => {
    if (viewState.view !== 'landing') {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
    }
  }, [viewState.view, viewState.index]);

  const renderContent = () => {
    if (viewState.view === 'thankyou') return <ThankYou theme={theme} onPrev={handlePrev} />;
    if (viewState.view === 'conclusion') {
        const footerBg = theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#FAFAFA]';
        return (
            <div className="w-full">
                <ManifestoPage 
                    onRestart={closeReport} 
                    onNext={handleNext}
                    onPrev={handlePrev}
                    theme={theme} 
                />
                <div className={`h-40 ${footerBg}`}></div> 
            </div>
        );
    }
    if (viewState.view === 'report') {
        const currentItem = timeline[viewState.index];
        if (!currentItem) return null;
        if (currentItem.type === 'layer') return <LayerView data={currentItem.data as LayerData} onNext={handleNext} onPrev={handlePrev} onBack={closeReport} nextTitle={""} theme={theme} toggleTheme={toggleTheme} />;
        if (currentItem.type === 'summary') return <SummaryView onNext={handleNext} onPrev={handlePrev} theme={theme} />;
        return <ReportView onBack={closeReport} data={currentItem.data as ShiftData} onNext={handleNext} onPrev={handlePrev} isFirst={viewState.index === 0} isLast={viewState.index === timeline.length - 1} theme={theme} toggleTheme={toggleTheme} lang={lang} />;
    }
    return (
        <main className="w-full overflow-x-hidden">
            <Hero />
            <VariableTextSection />
            <TectonicShifts onOpenReport={openReport} />
            <div className={`h-10 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#FAFAFA]'}`}></div>
        </main>
    );
  };

  const globalBg = theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#F4F4F5]';

  return (
    <div className={`${globalBg} min-h-screen transition-colors duration-500`}>
        {/* Fixed Logo Header */}
        <div className="fixed top-0 left-0 z-[200] p-4 md:p-6">
            <a 
                href="https://aimindset.org" 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-white/5 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
                <AIMindsetLogo className="w-8 h-8" color={theme === 'dark' ? 'white' : 'black'} />
                <span className="font-mono text-sm font-bold tracking-wide hidden md:inline">MINDSET</span>
            </a>
        </div>
        
        {renderContent()}
        <IndexNavigation onNavigate={handleIndexNavigate} theme={theme} toggleTheme={toggleTheme} lang={lang} setLang={setLang} showThemeToggle={viewState.view !== 'landing'} />
        <TimelineNav timeline={timeline} currentIndex={viewState.view === 'report' ? viewState.index : 0} viewState={viewState.view} onNavigate={handleNavigate} onNavigateToConclusion={handleJumpToConclusion} onNavigateToLanding={closeReport} onNavigateToThankYou={handleJumpToThankYou} theme={theme} visible={isNavVisible} />
    </div>
  );
}