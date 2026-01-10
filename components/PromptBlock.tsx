import React, { useMemo, useState } from 'react';

type Props = {
  title?: string;
  text: string;
};

export const PromptBlock: React.FC<Props> = ({ title = 'Prompt', text }) => {
  const [copied, setCopied] = useState(false);
  const lines = useMemo(() => text.trim().split('\n'), [text]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op
    }
  };

  // Adjust text size based on prompt length for better fit
  const textSizeClass = useMemo(() => {
    if (lines.length > 35) return 'text-[8px] leading-tight';
    if (lines.length > 25) return 'text-[9px] leading-snug';
    if (lines.length > 15) return 'text-[10px] leading-relaxed';
    return 'text-[11px] leading-relaxed';
  }, [lines.length]);

  return (
    <div className="mt-4 w-full max-w-3xl">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 font-bold">{title}</span>
        <button
          className="no-print rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-mono text-neutral-600 hover:border-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-60 transition-colors"
          onClick={copy}
          disabled={copied}
          title="Copy prompt"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      {/* On-screen: scrollable with max-height. For print/PDF: show full content */}
      <div className="mt-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3 max-h-[45vh] overflow-y-auto print:max-h-none print:overflow-visible">
        <pre className={`whitespace-pre-wrap break-words font-mono text-neutral-800 ${textSizeClass}`}>
          {lines.join('\n')}
        </pre>
      </div>
    </div>
  );
};


