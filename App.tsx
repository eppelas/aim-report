import React, { useLayoutEffect, useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { gsap, ScrollTrigger } from './lib/gsap-config';
import { Hero } from './components/Hero';
import { TectonicShifts } from './components/TectonicShiftsAnimation';
import { VariableTextSection } from './components/VariableTextSection';
import { TimelineNav, TimelineItem } from './components/TimelineNav'; 
import { IndexNavigation } from './components/NavigationPopUp/IndexNavigation';
import { ShiftData, LayerData } from './components/shiftsData';
import { AIMindsetLogo } from './components/AIMindsetLogo';
import { useShiftsData } from './hooks/useShiftsData';
import { updateMetaTags } from './lib/updateMetaTags';

// Lazy load heavy components
const ReportView = lazy(() => import('./components/ReportView').then(m => ({ default: m.ReportView })));
const LayerView = lazy(() => import('./components/LayerView').then(m => ({ default: m.LayerView })));
const SummaryView = lazy(() => import('./components/SummaryView').then(m => ({ default: m.SummaryView })));
const ThankYou = lazy(() => import('./components/ThankYou').then(m => ({ default: m.ThankYou })));
const ManifestoPage = lazy(() => import('./components/ManifestoPage/Index').then(m => ({ default: m.ManifestoPage })));

export default function App() {
  const [lang, setLang] = useState<'en' | 'ru' | 'by' | 'ro'>(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('aim-language');
        if (saved === 'en' || saved === 'ru' || saved === 'by' || saved === 'ro') return saved;
    }
    return 'en';
  });
  const { shifts, layers, loading } = useShiftsData(lang);

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
        title: lang === 'ru' ? "ИСПОЛНИТЕЛЬНОЕ РЕЗЮМЕ" : "EXECUTIVE SUMMARY",
        subtitle: lang === 'ru' ? "11 тектонических сдвигов" : "11 Tectonic Shifts",
        desc: lang === 'ru' ? "Консолидированный взгляд на расхождение между возможностями машин и адаптацией человека." : "A consolidated view of the divergence between machine capability and human adaptation.",
        constraint: lang === 'ru' ? "Контекстный разрыв" : "The Context Gap",
        metaphor: 'globe' 
    };

    items.push({ 
        type: 'summary', 
        data: { ...summaryLayer, shifts: sortedShifts } 
    });

    return items;
  }, [shifts, layers, lang]);

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

  useEffect(() => {
      localStorage.setItem('aim-language', lang);
  }, [lang]);

  // Update meta tags based on current view
  useEffect(() => {
    if (viewState.view === 'landing') {
      updateMetaTags({
        title: 'AIM Annual Report 2025',
        description: 'A comprehensive analysis of the divergence between machine capability and human adaptation across Foundation, Cognition, Interface, and Humanity layers.',
        url: 'https://eppelas.github.io/aim-report/'
      });
    } else if (viewState.view === 'report' && timeline[viewState.index]) {
      const currentItem = timeline[viewState.index];
      
      if (currentItem.type === 'layer') {
        const layer = currentItem.data as LayerData;
        updateMetaTags({
          title: `Layer ${layer.id}: ${layer.title} | AIM Report 2025`,
          description: `${layer.subtitle} ${layer.desc}`,
          url: `https://eppelas.github.io/aim-report/#layer-${layer.id}`
        });
      } else if (currentItem.type === 'shift') {
        const shift = currentItem.data as ShiftData;
        updateMetaTags({
          title: `Shift ${shift.id}: ${shift.subtitle || shift.title} | AIM Report 2025`,
          description: shift.context || shift.gap.desc.substring(0, 155),
          url: `https://eppelas.github.io/aim-report/#shift-${shift.id}`
        });
      } else if (currentItem.type === 'summary') {
        updateMetaTags({
          title: 'Executive Summary | AIM Report 2025',
          description: 'Key insights and conclusions from the 11 tectonic shifts analysis of AI and human adaptation.',
          url: 'https://eppelas.github.io/aim-report/#summary'
        });
      }
    } else if (viewState.view === 'conclusion') {
      updateMetaTags({
        title: 'The Manifesto | AIM Report 2025',
        description: 'Our vision for bridging the gap between machine capability and human adaptation.',
        url: 'https://eppelas.github.io/aim-report/#manifesto'
      });
    } else if (viewState.view === 'thankyou') {
      updateMetaTags({
        title: 'Thank You | AIM Report 2025',
        description: 'Created collaboratively with the AI Mindset Labs community.',
        url: 'https://eppelas.github.io/aim-report/#thankyou'
      });
    }
  }, [viewState, timeline]);

  const [isNavVisible, setIsNavVisible] = useState(false);

  // Update timeline index when language changes to keep user on same item
  useEffect(() => {
    if (viewState.view === 'report' && !loading) {
      const currentItem = timeline[viewState.index];
      if (!currentItem) {
        // If current index is invalid, reset to first shift
        setViewState({ view: 'report', index: 1 });
      }
    }
  }, [lang, loading, timeline, viewState.view, viewState.index]);

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

  // Swipe navigation for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      // Don't handle swipe on landing page
      if (viewState.view === 'landing') return;
      
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      const minSwipeDistance = 50;
      
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) handleNext();
        else handlePrev();
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleNext, handlePrev, viewState.view]);

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

  // Single keyboard handler for all navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isArrowForward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
      const isArrowBackward = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
      const isSpace = e.code === 'Space';
      
      // Arrows: next/prev page
      if (isArrowForward || isArrowBackward) {
        if (viewState.view !== 'landing') e.preventDefault();
        if (isArrowForward) {
          if (viewState.view === 'landing') openReport();
          else handleNext();
        } else if (isArrowBackward && viewState.view !== 'landing') {
          handlePrev();
        }
        return;
      }
      
      // Space: scroll down, at bottom go to next page
      if (isSpace) {
        e.preventDefault();
        
        // Landing page
        if (viewState.view === 'landing') {
          const pinnedSection = document.getElementById('pinned-svg-section');
          if (!pinnedSection) return;
          
          const rect = pinnedSection.getBoundingClientRect();
          
          // Before pinned section - scroll down to it
          if (rect.top > 10) {
            window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
            return;
          }
          
          // In pinned section - use snap points
          const triggers = ScrollTrigger.getAll();
          const st = triggers.find(t => t.vars.trigger === pinnedSection);
          if (!st) return;
          
          const currentProgress = st.progress;
          
          // Animation complete - go to report
          if (currentProgress >= 0.94) {
            openReport();
            return;
          }
          
          // Jump to next snap point - each is a clear, complete state
          // 1: "They intersect" clear
          // 2: "They intersect" + "For a moment" both visible  
          // 3: "And diverge" clear
          // 4: "Creating" clear
          // 5: "THE CONTEXT GAP" + definition visible
          // 6: "11 TECTONIC SHIFTS" clear
          // 7: "IN 4 LAYERS" all 4 rows visible (final state)
          // 8: "INPUT/RESPONSE" manifesto complete with THE GAP
          // 9: "11" red grid
          // 10: Final -> next page
          const snapPoints = [0.03, 0.08, 0.12, 0.28, 0.38, 0.48, 0.58, 0.72, 0.85, 0.97];
          const nextSnap = snapPoints.find(p => p > currentProgress + 0.01);
          if (nextSnap) {
            const targetScroll = st.start + nextSnap * (st.end - st.start);
            st.scroll(targetScroll);
          }
          return;
        }
        
        // Other pages: check if we CAN scroll, then scroll or go next
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const distanceToBottom = documentHeight - scrollTop - windowHeight;
        
        // If there's room to scroll (more than 100px), scroll down
        if (distanceToBottom > 100) {
          window.scrollBy({ top: windowHeight * 0.7, behavior: 'smooth' });
        } else {
          // At bottom - go to next page
          handleNext();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewState.view, handleNext, handlePrev, openReport]);

  useLayoutEffect(() => {
    if (viewState.view !== 'landing') {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
    }
  }, [viewState.view, viewState.index]);

  const LoadingSpinner = () => (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#F4F4F5]'}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC2626]"></div>
    </div>
  );

  const renderContent = () => {
    // Show loading while shifts data is loading
    if (loading && lang !== 'en') {
      return <LoadingSpinner />;
    }

    if (viewState.view === 'thankyou') {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <ThankYou theme={theme} onPrev={handlePrev} lang={lang} />
        </Suspense>
      );
    }
    
    if (viewState.view === 'conclusion') {
        const footerBg = theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#FAFAFA]';
        return (
            <Suspense fallback={<LoadingSpinner />}>
              <div className="w-full">
                  <ManifestoPage 
                      onRestart={closeReport} 
                      onNext={handleNext}
                      onPrev={handlePrev}
                      theme={theme} 
                      lang={lang}
                  />
                  <div className={`h-40 ${footerBg}`}></div> 
              </div>
            </Suspense>
        );
    }
    
    if (viewState.view === 'manifesto') {
        return (
            <Suspense fallback={<LoadingSpinner />}>
              <ManifestoPage 
                  onRestart={closeReport} 
                  onNext={handleNext}
                  onPrev={handlePrev}
                  theme={theme} 
                  lang={lang}
              />
            </Suspense>
        );
    }
    
    if (viewState.view === 'report') {
        const currentItem = timeline[viewState.index];
        if (!currentItem) return null;
        
        // Get prev/next slide titles
        const prevItem = viewState.index > 0 ? timeline[viewState.index - 1] : null;
        const nextItem = viewState.index < timeline.length - 1 ? timeline[viewState.index + 1] : null;
        
        const getPrevTitle = () => {
          if (!prevItem) return '';
          if (prevItem.type === 'layer') return (prevItem.data as LayerData).title;
          if (prevItem.type === 'shift') return (prevItem.data as ShiftData).title;
          if (prevItem.type === 'summary') return (prevItem.data as LayerData).title;
          return '';
        };
        
        const getNextTitle = () => {
          if (!nextItem) return '';
          if (nextItem.type === 'layer') return (nextItem.data as LayerData).title;
          if (nextItem.type === 'shift') return (nextItem.data as ShiftData).title;
          if (nextItem.type === 'summary') return (nextItem.data as LayerData).title;
          return '';
        };
        
        const prevLabel = getPrevTitle();
        const nextLabel = getNextTitle();
        
        return (
          <Suspense fallback={<LoadingSpinner />}>
            {currentItem.type === 'layer' && <LayerView data={currentItem.data as LayerData} onNext={handleNext} onPrev={handlePrev} onBack={closeReport} nextTitle={""} theme={theme} toggleTheme={toggleTheme} />}
            {currentItem.type === 'summary' && <SummaryView onNext={handleNext} onPrev={handlePrev} theme={theme} lang={lang} />}
            {currentItem.type === 'shift' && <ReportView onBack={closeReport} data={currentItem.data as ShiftData} onNext={handleNext} onPrev={handlePrev} isFirst={viewState.index === 0} isLast={viewState.index === timeline.length - 1} theme={theme} toggleTheme={toggleTheme} lang={lang} prevLabel={prevLabel} nextLabel={nextLabel} />}
          </Suspense>
        );
    }
    
    return (
        <main className="w-full overflow-x-hidden">
            <Hero lang={lang} />
            <VariableTextSection lang={lang} />
            <TectonicShifts onOpenReport={openReport} lang={lang} />
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
        <IndexNavigation onNavigate={handleIndexNavigate} theme={theme} toggleTheme={toggleTheme} lang={lang} setLang={setLang} showThemeToggle={viewState.view !== 'landing'} forceDarkTheme={viewState.view === 'landing'} />
        <TimelineNav timeline={timeline} currentIndex={viewState.view === 'report' ? viewState.index : 0} viewState={viewState.view} onNavigate={handleNavigate} onNavigateToConclusion={handleJumpToConclusion} onNavigateToLanding={closeReport} onNavigateToThankYou={handleJumpToThankYou} theme={theme} visible={isNavVisible} />
    </div>
  );
}