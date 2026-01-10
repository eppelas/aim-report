import React, { useState } from 'react';
import { SlideSource as SlideSourceType } from '../types';
import { ExternalLink, ChevronDown, ChevronUp, FileText, Globe, Newspaper, BookOpen } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

type SingleSourceProps = {
  source: SlideSourceType;
  dark?: boolean;
};

// Get favicon for a URL domain
const getFaviconUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return null;
  }
};

// Get source type icon based on URL
const getSourceIcon = (url?: string) => {
  if (!url) return FileText;
  const lower = url.toLowerCase();
  if (lower.includes('arxiv.org')) return BookOpen;
  if (lower.includes('github.com')) return FileText;
  if (lower.includes('substack.com') || lower.includes('hackernoon') || lower.includes('wired.com')) return Newspaper;
  return Globe;
};

// Single source component (original functionality)
export const SlideSource: React.FC<SingleSourceProps> = ({ source, dark }) => {
  const { t } = useLanguage();
  const textClass = dark ? 'text-neutral-500' : 'text-neutral-400';
  const hoverClass = dark ? 'hover:text-neutral-300' : 'hover:text-neutral-600';

  if (source.url) {
    return (
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-[10px] font-mono ${textClass} ${hoverClass} transition-colors`}
      >
        <span className="uppercase tracking-wider">evidence:</span>
        <span className="underline underline-offset-2">{source.label}</span>
        <ExternalLink size={10} />
      </a>
    );
  }

  return (
    <span className={`text-[10px] font-mono ${textClass}`}>
      <span className="uppercase tracking-wider">evidence:</span> {source.label}
    </span>
  );
};

type MultiSourcesProps = {
  sources: SlideSourceType[];
  dark?: boolean;
};

// Multi-source dropdown component with prominent button and favicons
export const SlideSources: React.FC<MultiSourcesProps> = ({ sources, dark }) => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const textClass = dark ? 'text-neutral-400' : 'text-neutral-500';
  const hoverClass = dark ? 'hover:text-white hover:bg-red-600' : 'hover:text-white hover:bg-red-600';
  const bgClass = dark ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200';
  const btnBg = dark ? 'bg-neutral-800 border-neutral-600' : 'bg-neutral-100 border-neutral-300';
  const itemHover = dark ? 'hover:bg-neutral-700' : 'hover:bg-neutral-50';

  // Use "Evidence" label
  const evidenceLabel = lang === 'ru' ? 'Доказательства' : lang === 'by' ? 'Доказы' : 'Evidence';

  if (sources.length === 0) return null;

  // If only one source, render simple version
  if (sources.length === 1) {
    return <SlideSource source={sources[0]} dark={dark} />;
  }

  return (
    <div className="relative">
      {/* Pulsing indicator when closed */}
      {!isOpen && (
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border rounded-md ${btnBg} ${textClass} ${hoverClass} transition-all duration-200`}
      >
        <span>{evidenceLabel}</span>
        <span className="px-1.5 py-0.5 bg-red-500 text-white rounded text-[10px] font-bold">{sources.length}</span>
        {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={`absolute bottom-full left-0 mb-2 p-3 rounded-lg border shadow-xl ${bgClass} min-w-[320px] max-w-[450px] z-50`}
          >
            <div className="space-y-1.5">
              {sources.map((source, i) => {
                const favicon = source.url ? getFaviconUrl(source.url) : null;
                const SourceIcon = getSourceIcon(source.url);

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-3 p-2 rounded-md ${itemHover} transition-colors`}
                  >
                    {/* Favicon or fallback icon */}
                    <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${dark ? 'bg-neutral-700' : 'bg-neutral-100'}`}>
                      {favicon ? (
                        <img
                          src={favicon}
                          alt=""
                          className="w-4 h-4"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <SourceIcon size={14} className={textClass} />
                      )}
                    </div>

                    {/* Source info */}
                    <div className="flex-1 min-w-0">
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block text-[11px] font-mono ${textClass} hover:text-red-500 transition-colors leading-tight truncate`}
                        >
                          {source.label}
                        </a>
                      ) : (
                        <span className={`block text-[11px] font-mono ${textClass} leading-tight truncate`}>
                          {source.label}
                        </span>
                      )}
                    </div>

                    {/* External link indicator */}
                    {source.url && (
                      <ExternalLink size={10} className={`${textClass} opacity-50 shrink-0`} />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
