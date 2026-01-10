import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { SlideData } from './types';
import { SLIDES, SECTIONS, assetUrl } from './reportDeck';
import { Slide } from './components/Slide';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight, FileDown, BookOpen } from 'lucide-react';
import { exportElementsToPdf } from './pdfExport';
import { LeadGateModal, type LeadInfo } from './components/LeadGateModal';
import { SourcesOverlay } from './components/SourcesOverlay';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';

type PrintMode = 'off' | 'deck' | 'slide';
type PdfMode = 'deck' | 'slide';

type LeadState = LeadInfo & { capturedAt: string };

const LEAD_STORAGE_KEY = 'aim_annual_report_2025_lead_v1';

const loadLead = (): LeadState | null => {
  try {
    const raw = localStorage.getItem(LEAD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LeadState;
    if (!parsed || (!parsed.email && !parsed.telegram)) return null;
    return parsed;
  } catch {
    return null;
  }
};

const saveLead = (lead: LeadState) => {
  try {
    localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(lead));
  } catch {
    // no-op
  }
};

const getExportPassword = (): string => {
  try {
    // Avoid needing a dedicated `vite-env.d.ts` file in this repo.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = (import.meta as any)?.env as Record<string, unknown> | undefined;
    const raw = typeof env?.VITE_PDF_PASSWORD === 'string' ? env.VITE_PDF_PASSWORD : '';
    return raw.trim();
  } catch {
    return '';
  }
};

const getInitialPrintState = (): { mode: PrintMode; slideIdx: number } => {
  if (typeof window === 'undefined') return { mode: 'off', slideIdx: 0 };

  const params = new URLSearchParams(window.location.search);
  const print = (params.get('print') || '').toLowerCase();

  if (print === 'deck') return { mode: 'deck', slideIdx: 0 };
  if (print === 'slide') {
    const raw = params.get('n') ?? params.get('slide') ?? '0';
    const n = Number.parseInt(raw, 10);
    const slideIdx = Number.isFinite(n) ? Math.max(0, Math.min(n, SLIDES.length - 1)) : 0;
    return { mode: 'slide', slideIdx };
  }

  return { mode: 'off', slideIdx: 0 };
};

const pad2 = (n: number): string => String(n).padStart(2, '0');

const exportStamp = (): string => {
  const d = new Date();
  // Local time (human-friendly)
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}_${pad2(d.getHours())}${pad2(d.getMinutes())}`;
};

const slugify = (input: string): string =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);

const buildExportTitle = (mode: PrintMode, slideIdx: number): string => {
  const base = 'AIM Annual Report 2025 — The Context Gap';
  const stamp = exportStamp();

  if (mode === 'deck') return `${base} — ${stamp} — deck`;
  if (mode === 'slide') {
    const slide = SLIDES[slideIdx];
    const safeTitle = slide?.title ? slugify(slide.title) : `slide-${slideIdx + 1}`;
    return `${base} — ${stamp} — s${slideIdx + 1}-${safeTitle}`;
  }

  return base;
};

const buildExportFilename = (mode: PdfMode, slideIdx: number): string => {
  const stamp = exportStamp();
  const base = 'aim-annual-report-2025';

  if (mode === 'deck') return `${base}_${stamp}_deck.pdf`;

  const slide = SLIDES[slideIdx];
  const safeTitle = slide?.title ? slugify(slide.title) : `slide-${slideIdx + 1}`;
  return `${base}_${stamp}_s${slideIdx + 1}_${safeTitle}.pdf`;
};

const PrintDeck: React.FC<{ slides: SlideData[] }> = ({ slides }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // "Smart print": auto-scale a slide down (slightly) if something overflows the fixed 16:9 page.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const raf = requestAnimationFrame(() => {
      const roots = Array.from(container.querySelectorAll<HTMLElement>('.print-scale-root'));

      roots.forEach((root) => {
        const page = root.closest<HTMLElement>('.print-page');
        if (!page) return;

        root.style.transform = '';
        root.style.transformOrigin = 'top left';

        const pageW = page.clientWidth;
        const pageH = page.clientHeight;
        const contentW = root.scrollWidth;
        const contentH = root.scrollHeight;

        const scale = Math.min(1, pageW / contentW, pageH / contentH);
        if (scale < 1) root.style.transform = `scale(${scale})`;
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [slides.length]);

  return (
    <MotionConfig reducedMotion="always">
      <div ref={containerRef} className="print-root">
        {slides.map((slide, idx) => (
          <div key={`${slide.id}-${idx}`} className="print-page">
            <div className="print-scale-root">
              <Slide data={slide} index={idx} />
            </div>
          </div>
        ))}
      </div>
    </MotionConfig>
  );
};

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [showTOC, setShowTOC] = useState(false);
  const initialPrint = useMemo(() => getInitialPrintState(), []);
  const [printMode, setPrintMode] = useState<PrintMode>(initialPrint.mode);
  const [printSlideIdx, setPrintSlideIdx] = useState<number>(initialPrint.slideIdx);
  const [pdfJob, setPdfJob] = useState<{ mode: PdfMode; slideIdx: number } | null>(null);
  const [pdfProgress, setPdfProgress] = useState<{ current: number; total: number } | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const pdfRootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageScaleRootRef = useRef<HTMLDivElement>(null);

  const [lead, setLead] = useState<LeadState | null>(() => (typeof window === 'undefined' ? null : loadLead()));
  const [leadGateOpen, setLeadGateOpen] = useState(false);
  const [pendingExport, setPendingExport] = useState<{ mode: PdfMode; slideIdx: number } | null>(null);
  const [showSources, setShowSources] = useState(false);

  const exportPassword = useMemo(() => getExportPassword(), []);

  // On-screen fit: ensure each slide fits within the viewport stage (no clipping)
  // by scaling down a tiny bit when content overflows.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const root = stageScaleRootRef.current;
    if (!stage || !root) return;

    const applyScale = () => {
      // Reset scale for accurate measurements
      root.style.transformOrigin = 'top left';
      root.style.transform = 'scale(1)';

      const stageW = stage.clientWidth;
      const stageH = stage.clientHeight;
      const contentW = root.scrollWidth;
      const contentH = root.scrollHeight;

      if (!stageW || !stageH || !contentW || !contentH) return;

      const pad = 8; // small safety padding
      const scale = Math.min(1, (stageW - pad) / contentW, (stageH - pad) / contentH);
      root.style.transform = scale < 1 ? `scale(${scale})` : 'scale(1)';
    };

    const raf = requestAnimationFrame(() => applyScale());
    window.addEventListener('resize', applyScale);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', applyScale);
    };
  }, [currentSlideIdx, showTOC, printMode]);

  const triggerPrint = useCallback((mode: PrintMode, slideIdx?: number) => {
    if (mode === 'slide' && typeof slideIdx === 'number') setPrintSlideIdx(slideIdx);
    setPrintMode(mode);

    const prevTitle = document.title;
    try {
      document.title = buildExportTitle(mode, typeof slideIdx === 'number' ? slideIdx : currentSlideIdx);
    } catch {
      // no-op
    }

    const shouldRevert = !new URLSearchParams(window.location.search).has('print');
    const onAfterPrint = () => {
      try {
        document.title = prevTitle;
      } catch {
        // no-op
      }
      if (!shouldRevert) return;
      setPrintMode('off');
    };
    window.addEventListener('afterprint', onAfterPrint, { once: true });

    // wait for React render + layout
    requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
  }, [currentSlideIdx]);

  const startPdfExport = useCallback((mode: PdfMode, slideIdx?: number) => {
    const idx = typeof slideIdx === 'number' ? slideIdx : currentSlideIdx;
    setPdfError(null);
    setPdfJob({ mode, slideIdx: idx });
  }, [currentSlideIdx]);

  const requestPdfExport = useCallback((mode: PdfMode, slideIdx?: number) => {
    const idx = typeof slideIdx === 'number' ? slideIdx : currentSlideIdx;
    // Show lead gate to capture email before export
    setPendingExport({ mode, slideIdx: idx });
    setLeadGateOpen(true);
  }, [currentSlideIdx]);

  const submitLead = useCallback(async (info: LeadInfo) => {
    const hasEmail = typeof info.email === 'string' && info.email.trim().length > 0;
    const hasTelegram = typeof info.telegram === 'string' && info.telegram.trim().length > 0;

    // Only persist lead if user actually provided contact info.
    // This avoids localStorage noise + 400 spam from the dev middleware when skipping.
    if (hasEmail || hasTelegram) {
      const payload: LeadState = {
        ...info,
        capturedAt: new Date().toISOString(),
      };

      setLead(payload);
      saveLead(payload);

      // Best effort: store to local “DB” via dev server middleware
      try {
        await fetch('./api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            source: 'aim-annual-report-2025-deck',
            slide: pendingExport?.slideIdx ?? currentSlideIdx,
            mode: pendingExport?.mode ?? 'deck',
          }),
        });
      } catch {
        // no-op (still allow download)
      }
    }

    setLeadGateOpen(false);
    if (pendingExport) startPdfExport(pendingExport.mode, pendingExport.slideIdx);
    setPendingExport(null);
  }, [currentSlideIdx, pendingExport, startPdfExport]);

  useEffect(() => {
    if (!pdfJob) return;

    let cancelled = false;
    const run = async () => {
      const slidesToExport = pdfJob.mode === 'deck' ? SLIDES : [SLIDES[pdfJob.slideIdx]];
      setPdfProgress({ current: 0, total: slidesToExport.length });

      try {
        // wait for React render + layout
        await new Promise<void>((r) => requestAnimationFrame(() => r()));
        await new Promise<void>((r) => requestAnimationFrame(() => r()));
        await new Promise((r) => setTimeout(r, 50));

        const root = pdfRootRef.current;
        if (!root) throw new Error('PDF export root not found');

        const pages = Array.from(root.querySelectorAll<HTMLElement>('.pdf-export-page'));

        // Auto-scale overflow content down to fit the fixed 16:9 export page.
        // This prevents cropped content when some layouts overshoot 1600×900.
        pages.forEach((page) => {
          const scaleRoot = page.querySelector<HTMLElement>('.pdf-scale-root');
          if (!scaleRoot) return;

          scaleRoot.style.transform = '';
          scaleRoot.style.transformOrigin = 'top left';

          const pageW = page.clientWidth;
          const pageH = page.clientHeight;
          const contentW = scaleRoot.scrollWidth;
          const contentH = scaleRoot.scrollHeight;

          const safePad = 8; // px of breathing room to avoid edge clipping
          const scale = Math.min(1, (pageW - safePad) / contentW, (pageH - safePad) / contentH);
          if (scale < 1) scaleRoot.style.transform = `scale(${scale})`;
        });

        // Let layout settle after scaling
        await new Promise<void>((r) => requestAnimationFrame(() => r()));

        const filename = buildExportFilename(pdfJob.mode, pdfJob.slideIdx);

        await exportElementsToPdf(pages, {
          filename,
          // Increase pixelRatio to avoid blurry raster text in PDF (esp. on early slides).
          // Deck: 1600×900 → 3200×1800 (≈240 DPI on 13.33in × 7.5in pages)
          // Slide: slightly higher for single exports.
          pixelRatio: pdfJob.mode === 'deck' ? 2 : 2.6,
          onProgress: (p) => {
            if (cancelled) return;
            setPdfProgress(p);
          },
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (!cancelled) setPdfError(message);

        // Fallback: open print dialog (still uses fixed 16:9 print layout)
        triggerPrint(pdfJob.mode === 'deck' ? 'deck' : 'slide', pdfJob.slideIdx);
      } finally {
        if (!cancelled) {
          setPdfJob(null);
          setPdfProgress(null);
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [pdfJob, triggerPrint]);

  const nextSlide = useCallback(() => {
    setCurrentSlideIdx((prev) => Math.min(prev + 1, SLIDES.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIdx((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Avoid stacking exports while one is running
      if (pdfJob) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        setShowTOC(false);
        setShowSources(false);
      } else if (e.key === 't' || e.key === 'T' || e.key === 'е' || e.key === 'Е') {
        // Support both English 't' and Russian 'е' (same key position)
        e.preventDefault();
        setShowTOC(prev => !prev);
      } else if (e.key === 's' || e.key === 'S' || e.key === 'ы' || e.key === 'Ы') {
        // Support both English 's' and Russian 'ы' (same key position)
        e.preventDefault();
        setShowSources(prev => !prev);
      } else if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        const key = e.key.toLowerCase();
        if (key === 'p' || key === 'з') {
          e.preventDefault();
          if (e.shiftKey) {
            requestPdfExport('slide', currentSlideIdx);
          } else {
            requestPdfExport('deck');
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, currentSlideIdx, requestPdfExport, pdfJob]);

  // Find current section
  const currentSection = SECTIONS.find((section, idx) => {
    const nextSection = SECTIONS[idx + 1];
    return currentSlideIdx >= section.startSlide &&
           (!nextSection || currentSlideIdx < nextSection.startSlide);
  });

  if (printMode !== 'off') {
    const slidesToPrint = printMode === 'deck' ? SLIDES : [SLIDES[printSlideIdx]];
    return <PrintDeck slides={slidesToPrint} />;
  }

  return (
    <div className="w-screen h-screen bg-[#FAFAFA] text-neutral-900 relative selection:bg-red-100">
      <LeadGateModal
        open={leadGateOpen}
        defaultEmail={lead?.email}
        defaultTelegram={lead?.telegram}
        passwordRequired={exportPassword.length > 0}
        expectedPassword={exportPassword}
        passwordHint={exportPassword.length > 0 ? 'Ask AIM for the download password.' : undefined}
        onCancel={() => {
          setLeadGateOpen(false);
          setPendingExport(null);
        }}
        onSubmit={submitLead}
      />
      <SourcesOverlay open={showSources} onClose={() => setShowSources(false)} />
      {/* Hidden PDF render root (for true “Download PDF”, no print dialog) */}
      {pdfJob && (
        <MotionConfig reducedMotion="always">
          <div className="pdf-export-root">
            <div ref={pdfRootRef}>
              {(pdfJob.mode === 'deck' ? SLIDES : [SLIDES[pdfJob.slideIdx]]).map((slide, idx) => (
                <div key={`${slide.id}-${idx}`} className="pdf-export-page">
                  <div className="pdf-scale-root">
                    <Slide data={slide} index={pdfJob.mode === 'deck' ? idx : pdfJob.slideIdx} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionConfig>
      )}

      {/* Export status */}
      {pdfProgress && (
        <div className="fixed top-16 right-4 z-[80] rounded-lg border border-neutral-200 bg-white/90 backdrop-blur px-3 py-2 text-xs font-mono text-neutral-700 shadow-sm no-print">
          {t.exportingPdf} {pdfProgress.current}/{pdfProgress.total}
        </div>
      )}
      {pdfError && (
        <div className="fixed top-16 left-4 z-[80] max-w-[420px] rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-mono text-red-700 shadow-sm no-print">
          {t.pdfExportFailed} {pdfError}
        </div>
      )}

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-100 z-50 no-print">
        <motion.div
          className="h-full bg-red-600"
          animate={{ width: `${((currentSlideIdx + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Logo with dark circle background - smaller to avoid overlap */}
      <div className="fixed top-3 left-3 z-[60] no-print">
        <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors overflow-hidden">
          <img
            src={assetUrl('/assets/logo_rb.png')}
            alt="AI Mindset"
            className="h-5 w-auto"
          />
        </div>
      </div>

      {/* Table of Contents Toggle */}
      <button
        onClick={() => setShowTOC(!showTOC)}
        className="fixed top-4 right-4 z-[60] p-2 bg-white/90 backdrop-blur border border-neutral-200 rounded-lg hover:bg-white hover:border-red-200 transition-all shadow-sm no-print"
        title="Press T to toggle table of contents"
      >
        {showTOC ? <X size={20} className="text-red-600" /> : <Menu size={20} />}
      </button>

      {/* Quick PDF export + Sources (no need to open TOC) */}
      <div className="fixed top-4 right-16 z-[60] flex items-center gap-2 no-print">
        {/* Language switcher temporarily disabled for v1 release */}
        <LanguageSwitcher />
        <button
          onClick={() => setShowSources(true)}
          className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white/90 backdrop-blur px-3 py-2 text-xs font-mono text-neutral-700 hover:border-red-200 hover:text-red-600 transition-colors shadow-sm"
          title="Sources & Credits (S)"
        >
          <BookOpen size={16} />
          <span className="hidden md:inline">{t.sources}</span>
        </button>
        <button
          onClick={() => requestPdfExport('deck')}
          disabled={!!pdfJob}
          className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white/90 backdrop-blur px-3 py-2 text-xs font-mono text-neutral-700 hover:border-red-200 hover:text-red-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          title="Download deck PDF (P)"
        >
          <FileDown size={16} />
          <span className="hidden md:inline">{t.deckPdf}</span>
        </button>
        <button
          onClick={() => requestPdfExport('slide', currentSlideIdx)}
          disabled={!!pdfJob}
          className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white/90 backdrop-blur px-3 py-2 text-xs font-mono text-neutral-700 hover:border-red-200 hover:text-red-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          title="Download current slide PDF (Shift+P)"
        >
          <FileDown size={16} />
          <span className="hidden md:inline">{t.slidePdf}</span>
        </button>
      </div>

      {/* Table of Contents Panel */}
      <AnimatePresence>
        {showTOC && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-[54]"
              onClick={() => setShowTOC(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 320 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 320 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-[55] shadow-2xl overflow-y-auto border-l border-neutral-200"
            >
              <div className="p-6 pt-16">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-lg font-bold uppercase tracking-wider">{t.contents}</h2>
                  <span className="text-xs font-mono text-neutral-400 bg-neutral-100 px-2 py-1 rounded">
                    {currentSlideIdx + 1}/{SLIDES.length}
                  </span>
                </div>
                {SECTIONS.map((section, sIdx) => {
                  const nextSectionStart = SECTIONS[sIdx + 1]?.startSlide ?? SLIDES.length;
                  const isCurrentSection = currentSlideIdx >= section.startSlide && currentSlideIdx < nextSectionStart;
                  const slidesInSection = SLIDES.slice(section.startSlide, nextSectionStart);

                  return (
                    <div key={sIdx} className="mb-5">
                      <button
                        onClick={() => {
                          setCurrentSlideIdx(section.startSlide);
                          setShowTOC(false);
                        }}
                        className={`text-xs font-mono uppercase tracking-widest mb-2 flex items-center gap-2 hover:text-red-600 transition-colors ${
                          isCurrentSection ? 'text-red-600 font-bold' : 'text-neutral-500'
                        }`}
                      >
                        <span className="w-5 h-5 rounded bg-neutral-100 flex items-center justify-center text-[10px]">
                          {slidesInSection.length}
                        </span>
                        {section.title}
                      </button>
                      <div className="space-y-0.5">
                        {slidesInSection.map((slide, idx) => {
                          const slideIdx = section.startSlide + idx;
                          const isActive = slideIdx === currentSlideIdx;
                          return (
                            <button
                              key={slideIdx}
                              onClick={() => {
                                setCurrentSlideIdx(slideIdx);
                                setShowTOC(false);
                              }}
                              className={`block w-full text-left py-1.5 px-3 text-sm rounded transition-all ${
                                isActive
                                  ? 'bg-red-50 text-red-600 border-l-2 border-red-600'
                                  : 'hover:bg-neutral-50 border-l-2 border-transparent'
                              }`}
                            >
                              <span className="text-neutral-400 font-mono text-xs mr-2">
                                {String(slideIdx + 1).padStart(2, '0')}
                              </span>
                              <span className={isActive ? 'font-medium' : ''}>
                                {slide.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Keyboard shortcuts hint */}
                <div className="mt-8 pt-4 border-t border-neutral-100">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setShowTOC(false);
                          requestPdfExport('deck');
                        }}
                        disabled={!!pdfJob}
                        className="flex-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-mono text-neutral-700 hover:border-red-200 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t.downloadDeckPdf}
                      </button>
                      <button
                        onClick={() => {
                          setShowTOC(false);
                          requestPdfExport('slide', currentSlideIdx);
                        }}
                        disabled={!!pdfJob}
                        className="flex-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-mono text-neutral-700 hover:border-red-200 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t.downloadSlidePdf}
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      {t.tip}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono">
                    {t.shortcuts}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Slide Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlideIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          ref={stageRef}
          className="w-full h-[calc(100vh-3.5rem)] min-h-[600px] overflow-hidden"
        >
          <div ref={stageScaleRootRef} className="w-full h-full">
            <Slide data={SLIDES[currentSlideIdx]} index={currentSlideIdx} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white via-white/98 to-transparent z-40 flex items-end pb-3 px-6 no-print">
        {/* Section indicator */}
        <div className="text-neutral-400 font-mono text-[10px] uppercase tracking-widest min-w-[100px]">
          {currentSection?.title || 'INTRO'}
        </div>

        {/* Slide dots - centered, grouped by section with hover tooltips */}
        <div className="flex-1 flex justify-center items-center gap-0.5">
          {SECTIONS.map((section, sIdx) => {
            const nextStart = SECTIONS[sIdx + 1]?.startSlide ?? SLIDES.length;
            const count = nextStart - section.startSlide;
            const isLoopsSection = section.title === '10 loops';

            return (
              <div key={sIdx} className="flex items-center group/section relative">
                {sIdx > 0 && <div className="w-3 h-px bg-neutral-300 mx-1.5" />}
                {/* Section label on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/section:opacity-100 transition-opacity pointer-events-none z-50">
                  <div className="bg-neutral-900 text-white text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap uppercase tracking-wider">
                    {section.title}
                  </div>
                </div>
                {Array.from({ length: count }).map((_, idx) => {
                  const slideIdx = section.startSlide + idx;
                  const slide = SLIDES[slideIdx];
                  // Extract loop number if present
                  const loopMatch = slide.title?.match(/LOOP\s*(\d+)/i);
                  const loopNum = loopMatch ? parseInt(loopMatch[1], 10) : null;
                  const isLoopIntro = slide.layout === 'loop-intro';
                  const isLoop = slide.layout === 'loop';
                  const isSectionDivider = slide.visual === 'SECTION_DIVIDER';

                  // Monochrome color for all loops (single red accent)
                  const loopColor = 'bg-red-600';

                  return (
                    <div key={slideIdx} className="relative group/dot flex items-center">
                      <button
                        onClick={() => setCurrentSlideIdx(slideIdx)}
                        className={`transition-all ${
                          isSectionDivider
                            ? `w-2 h-2 rounded-sm mx-0.5 ${
                                slideIdx === currentSlideIdx
                                  ? 'bg-neutral-800 scale-125'
                                  : 'bg-neutral-400 hover:bg-neutral-500'
                              }`
                            : isLoopIntro
                              ? `w-2 h-2 rounded-full mx-0.5 ${
                                  slideIdx === currentSlideIdx
                                    ? `${loopColor} scale-125 ring-2 ring-white shadow-md`
                                    : `${loopColor} opacity-40 hover:opacity-70`
                                }`
                              : isLoop
                                ? `w-2.5 h-2.5 rounded-full mx-0.5 ${
                                    slideIdx === currentSlideIdx
                                      ? `${loopColor} scale-125 ring-2 ring-white shadow-lg`
                                      : `${loopColor} hover:scale-110`
                                  }`
                                : `w-1.5 h-1.5 rounded-full mx-0.5 ${
                                    slideIdx === currentSlideIdx
                                      ? 'bg-red-600 scale-150'
                                      : 'bg-neutral-300 hover:bg-neutral-400'
                                  }`
                        }`}
                      />
                      {/* Individual slide tooltip */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none z-50">
                        <div className="bg-neutral-900 text-white text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap max-w-[200px] truncate">
                          <span className="text-red-400 mr-1">{String(slideIdx + 1).padStart(2, '0')}</span>
                          {loopNum && <span className="text-red-300 mr-1">[Loop {loopNum}{isLoopIntro ? ' intro' : ''}]</span>}
                          {slide.title.replace(/LOOP\s*\d+:?\s*/i, '')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Navigation controls */}
        <div className="flex items-center gap-2 min-w-[100px] justify-end">
          <button
            onClick={prevSlide}
            disabled={currentSlideIdx === 0}
            className="p-1.5 rounded hover:bg-neutral-100 transition-colors disabled:opacity-30"
          >
            <ChevronLeft size={18} className="text-neutral-600" />
          </button>
          <span className="text-red-600 font-mono text-sm min-w-[50px] text-center">
            {currentSlideIdx + 1}/{SLIDES.length}
          </span>
          <button
            onClick={nextSlide}
            disabled={currentSlideIdx === SLIDES.length - 1}
            className="p-1.5 rounded hover:bg-neutral-100 transition-colors disabled:opacity-30"
          >
            <ChevronRight size={18} className="text-neutral-600" />
          </button>
        </div>
      </div>

      {/* Click zones for navigation - SMALLER, only at edges */}
      <div
        className="fixed top-0 left-0 w-16 h-[calc(100%-3.5rem)] z-30 cursor-w-resize group no-print"
        onClick={prevSlide}
      >
        <div className="absolute inset-y-0 left-0 w-full flex items-center justify-start pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft size={24} className="text-neutral-300" />
        </div>
      </div>
      <div
        className="fixed top-0 right-0 w-16 h-[calc(100%-3.5rem)] z-30 cursor-e-resize group no-print"
        onClick={nextSlide}
      >
        <div className="absolute inset-y-0 right-0 w-full flex items-center justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight size={24} className="text-neutral-300" />
        </div>
      </div>

    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
