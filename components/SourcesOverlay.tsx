import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, BookOpen, Users, FileText, Sparkles } from 'lucide-react';

type SourceLink = {
  label: string;
  url: string;
  category?: string;
};

// LOOP 1: System-2 Reasoning
const LOOP1_SOURCES: SourceLink[] = [
  { label: 'Li et al. — Reasoning LLMs Survey', url: 'https://arxiv.org/abs/2502.17419', category: 'Loop 1' },
  { label: 'OpenAI — SWE-Bench Verified', url: 'https://openai.com/index/introducing-swe-bench-verified/', category: 'Loop 1' },
  { label: 'x402 — Internet-native payments for AI agents', url: 'https://www.x402.org/', category: 'Loop 1' },
];

// LOOP 2: Orchestration Layers
const LOOP2_SOURCES: SourceLink[] = [
  { label: 'Anthropic — Model Context Protocol (MCP)', url: 'https://www.anthropic.com/news/model-context-protocol', category: 'Loop 2' },
  { label: 'Gartner — Top 10 Strategic Technology Trends 2025', url: 'https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025', category: 'Loop 2' },
  { label: 'AI Mindset — Context Obesity', url: 'https://hackernoon.com/youre-not-burned-out-youve-got-context-obesity', category: 'Loop 2' },
];

// LOOP 3: Sovereign AI
const LOOP3_SOURCES: SourceLink[] = [
  { label: 'EUR-Lex — AI Act (EU 2024/1689)', url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng', category: 'Loop 3' },
  { label: 'McKinsey — Sovereign AI in Europe', url: 'https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/accelerating-europes-ai-adoption-the-role-of-sovereign-ai', category: 'Loop 3' },
];

// LOOP 4: Data Wall
const LOOP4_SOURCES: SourceLink[] = [
  { label: 'Epoch AI — Limits of LLM Scaling', url: 'https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data', category: 'Loop 4' },
  { label: 'Shumailov et al. — Model Collapse', url: 'https://arxiv.org/abs/2305.17493', category: 'Loop 4' },
  { label: 'AI Mindset — Team Knowledge System', url: 'https://aimindsetspace.substack.com/p/ai-ark-knowledge-system', category: 'Loop 4' },
];

// LOOP 5: On-Device Models ↔ Privacy as Status
const LOOP5_SOURCES: SourceLink[] = [
  { label: 'Android — Gemini Nano on-device APIs', url: 'https://android-developers.googleblog.com/2025/08/the-latest-gemini-nano-with-on-device-ml-kit-genai-apis.html', category: 'Loop 5' },
  { label: 'Wired — Meta Pay for Privacy', url: 'https://www.wired.com/story/meta-facebook-pay-for-privacy-europe/', category: 'Loop 5' },
  { label: 'ICO — Data Lives Year 2 Report', url: 'https://ico.org.uk/media2/m2maphry/ico-data-lives-year-2-report.pdf', category: 'Loop 5' },
];

// LOOP 6: Compute & Energy ↔ Return of Physics
const LOOP6_SOURCES: SourceLink[] = [
  { label: 'IEA — Energy Supply for AI', url: 'https://www.iea.org/reports/energy-and-ai/energy-supply-for-ai', category: 'Loop 6' },
  { label: 'Reuters — AI Data Centers and Peaker Plants', url: 'https://www.reuters.com/business/energy/ai-data-centers-are-forcing-obsolete-peaker-power-plants-back-into-service-2025-12-23/', category: 'Loop 6' },
];

// LOOP 7: Coding Agents ↔ Authorship Anxiety
const LOOP7_SOURCES: SourceLink[] = [
  { label: 'OpenAI — SWE-Bench Verified', url: 'https://openai.com/index/introducing-swe-bench-verified/', category: 'Loop 7' },
  { label: 'Anthropic — SWE-Bench Sonnet', url: 'https://www.anthropic.com/research/swe-bench-sonnet', category: 'Loop 7' },
  { label: 'AI Mindset — Coding with Claude 3.5', url: 'https://t.me/ai_mind_set/282', category: 'Loop 7' },
];

// LOOP 8: Regional Frames
const LOOP8_SOURCES: SourceLink[] = [
  { label: 'Pew Research — Trust in EU, US, China AI Regulation', url: 'https://www.pewresearch.org/2025/10/15/trust-in-the-eu-u-s-and-china-to-regulate-use-of-ai/', category: 'Loop 8' },
  { label: 'Stanford HAI — AI Index 2025: Public Opinion', url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report/public-opinion', category: 'Loop 8' },
  { label: 'European Commission — AI Research Publications', url: 'https://op.europa.eu/en/publication-detail/-/publication/4ee8799e-142c-11f0-b1a3-01aa75ed71a1/language-en', category: 'Loop 8' },
  { label: 'Plurality Project (GitHub)', url: 'https://github.com/pluralitybook/plurality', category: 'Loop 8' },
];

// LOOP 9: Post-Training Default Values
const LOOP9_SOURCES: SourceLink[] = [
  { label: 'Ouyang et al. — InstructGPT', url: 'https://arxiv.org/abs/2203.02155', category: 'Loop 9' },
  { label: 'Bai et al. — Constitutional AI', url: 'https://arxiv.org/abs/2212.08073', category: 'Loop 9' },
  { label: 'Investigating Local Censorship (arXiv 2025)', url: 'https://arxiv.org/pdf/2505.12625', category: 'Loop 9' },
];

// LOOP 10: Machine Intimacy + Programmable Identity
const LOOP10_SOURCES: SourceLink[] = [
  { label: 'AI Mindset — Mental Health Boundaries (Founder OS)', url: 'https://aimindsetspace.substack.com/p/founder-os-mental-health', category: 'Loop 10' },
  { label: 'Ada Lovelace Institute — AI Companions', url: 'https://www.adalovelaceinstitute.org/blog/ai-companions/', category: 'Loop 10' },
  { label: 'Marwick & Boyd — Context Collapse', url: 'https://www.microsoft.com/en-us/research/publication/i-tweet-honestly-i-tweet-passionately-twitter-users-context-collapse-and-the-imagined-audience/', category: 'Loop 10' },
];

// Tier 1: Core frameworks
const TIER1_SOURCES: SourceLink[] = [
  { label: 'McKinsey — The State of AI 2024', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai', category: 'Adoption + ROI' },
  { label: 'Stanford HAI — AI Index Report 2024', url: 'https://hai.stanford.edu/ai-index/2024-ai-index-report', category: 'Macro index' },
  { label: 'GitHub — Octoverse 2024', url: 'https://octoverse.github.com/', category: 'Developer adoption' },
  { label: 'StackOverflow — Developer Survey 2024', url: 'https://survey.stackoverflow.co/2024/ai', category: 'Trust + quality' },
  { label: 'EU AI Act — Official Text', url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj', category: 'Regulation' },
];

// Tier 2: Deep research
const TIER2_SOURCES: SourceLink[] = [
  { label: 'IEA — Electricity 2024', url: 'https://www.iea.org/reports/electricity-2024', category: 'Energy' },
  { label: 'Villalobos et al. — Will We Run Out of Data?', url: 'https://arxiv.org/abs/2211.04325', category: 'Data' },
  { label: 'Strubell et al. — Energy and Policy for NLP', url: 'https://arxiv.org/abs/1906.02243', category: 'Sustainability' },
  { label: 'Li et al. — Reasoning LLMs Survey', url: 'https://arxiv.org/abs/2502.17419', category: 'Research' },
];

// Loop metadata for better display
const LOOP_SECTIONS = [
  { id: 1, title: 'System-2 Reasoning', subtitle: 'Chat → Delegation', sources: LOOP1_SOURCES },
  { id: 2, title: 'Orchestration Layers', subtitle: 'Agentic Workflows', sources: LOOP2_SOURCES },
  { id: 3, title: 'Sovereign AI', subtitle: 'Regulation & Neo-Sovereignty', sources: LOOP3_SOURCES },
  { id: 4, title: 'Data Wall', subtitle: 'Provenance & Trust', sources: LOOP4_SOURCES },
  { id: 5, title: 'On-Device Models', subtitle: 'Privacy as Status', sources: LOOP5_SOURCES },
  { id: 6, title: 'Compute & Energy', subtitle: 'Return of Physics', sources: LOOP6_SOURCES },
  { id: 7, title: 'Coding Agents', subtitle: 'Authorship Anxiety', sources: LOOP7_SOURCES },
  { id: 8, title: 'Regional Frames', subtitle: 'Pluralism Required', sources: LOOP8_SOURCES },
  { id: 9, title: 'Post-Training', subtitle: 'Default Values', sources: LOOP9_SOURCES },
  { id: 10, title: 'Machine Intimacy', subtitle: 'Programmable Identity', sources: LOOP10_SOURCES },
];

// All loop sources combined (legacy)
const ALL_LOOP_SOURCES: SourceLink[] = [
  ...LOOP1_SOURCES,
  ...LOOP2_SOURCES,
  ...LOOP3_SOURCES,
  ...LOOP4_SOURCES,
  ...LOOP5_SOURCES,
  ...LOOP6_SOURCES,
  ...LOOP7_SOURCES,
  ...LOOP8_SOURCES,
  ...LOOP9_SOURCES,
  ...LOOP10_SOURCES,
];

const AIM_EVIDENCE: SourceLink[] = [
  { label: 'AI Mindset Labs — 21 Participant Transformations', url: '#labs', category: 'Community research' },
  { label: 'Space Community — Open Call Responses', url: '#space', category: 'Community voice' },
  { label: 'GAC Reference Visuals (GitHub)', url: 'https://github.com/aPoWall/gac-c', category: 'Design system' },
];

const CREDITS = [
  { name: 'Alex P', role: 'Structure + Content', avatar: '/assets/povaliaev.png' },
  { name: 'Ray Svitla', role: 'Paired Loops Concept', avatar: '/assets/ray.png' },
  { name: 'Anca', role: 'Design Review', avatar: '/assets/anka.webp' },
  { name: 'AI Mindset Team', role: 'Community & Labs', avatar: null, isTeam: true },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SourcesOverlay: React.FC<Props> = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-neutral-900/95 backdrop-blur-sm overflow-auto no-print"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 z-[110] p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Content */}
          <div className="min-h-screen px-6 py-16 md:px-12 lg:px-24">
            {/* Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <div className="text-xs font-mono uppercase tracking-widest text-red-500 mb-2">
                AI Mindset Annual Report 2025
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                Sources & Credits
              </h1>
              <p className="text-neutral-400 mt-4 max-w-2xl text-lg">
                Research, data, and community voices that shaped this report.
              </p>
            </motion.div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* 10 Loops Sources - Full Width - Now Grouped by Loop */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="lg:col-span-2 bg-gradient-to-br from-red-600/10 to-transparent rounded-xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-red-600/20 rounded-lg">
                    <Sparkles size={20} className="text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                      10 Loops — Evidence Base
                    </h2>
                    <p className="text-xs font-mono text-neutral-500">Research sources organized by paired loop</p>
                  </div>
                  <span className="ml-auto px-3 py-1 bg-red-600/20 text-red-400 text-xs font-mono rounded-full">
                    {ALL_LOOP_SOURCES.length} sources
                  </span>
                </div>

                {/* Grid of loop cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                  {LOOP_SECTIONS.map((loop, loopIdx) => (
                    <motion.div
                      key={loop.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + loopIdx * 0.05 }}
                      className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors group"
                    >
                      {/* Loop header */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded">
                          {loop.id}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-bold truncate">{loop.title}</div>
                          <div className="text-neutral-500 text-[10px] font-mono truncate">{loop.subtitle}</div>
                        </div>
                      </div>

                      {/* Sources list */}
                      <div className="space-y-1.5">
                        {loop.sources.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-1.5 text-[10px] text-neutral-400 hover:text-red-400 transition-colors leading-tight"
                          >
                            <span className="text-red-600 mt-0.5">→</span>
                            <span className="truncate">{source.label.split(' — ')[0]}</span>
                          </a>
                        ))}
                      </div>

                      {/* Source count badge */}
                      <div className="mt-3 pt-2 border-t border-white/5 flex justify-between items-center">
                        <span className="text-[9px] font-mono text-neutral-600">{loop.sources.length} sources</span>
                        <ExternalLink size={10} className="text-neutral-600 group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tier 1 Sources */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 rounded-xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-600/20 rounded-lg">
                    <BookOpen size={20} className="text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                      Tier 1 — Must Read
                    </h2>
                    <p className="text-xs font-mono text-neutral-500">The minimal canon</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {TIER1_SOURCES.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <ExternalLink size={16} className="text-neutral-500 group-hover:text-red-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate group-hover:text-red-400 transition-colors">
                          {source.label}
                        </div>
                        <div className="text-xs font-mono text-neutral-500 mt-0.5">
                          {source.category}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Tier 2 Sources */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 rounded-xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-neutral-600/20 rounded-lg">
                    <FileText size={20} className="text-neutral-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                      Tier 2 — Deep Dives
                    </h2>
                    <p className="text-xs font-mono text-neutral-500">Extended research</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {TIER2_SOURCES.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <ExternalLink size={16} className="text-neutral-500 group-hover:text-neutral-300 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate group-hover:text-neutral-200 transition-colors">
                          {source.label}
                        </div>
                        <div className="text-xs font-mono text-neutral-500 mt-0.5">
                          {source.category}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* AIM Evidence subsection */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-red-500" />
                    <span className="text-sm font-mono text-neutral-400 uppercase tracking-wider">
                      AIM Evidence
                    </span>
                  </div>
                  <div className="space-y-2">
                    {AIM_EVIDENCE.map((source, idx) => (
                      <a
                        key={idx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-neutral-400 hover:text-red-400 transition-colors"
                      >
                        <span className="w-1 h-1 bg-red-600 rounded-full" />
                        {source.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Credits */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 bg-gradient-to-r from-red-600/10 to-transparent rounded-xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-600/20 rounded-lg">
                    <Users size={20} className="text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                      Credits
                    </h2>
                    <p className="text-xs font-mono text-neutral-500">The humans behind the report</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {CREDITS.map((credit, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-colors">
                      <div className={`w-14 h-14 mx-auto mb-3 rounded-full overflow-hidden flex items-center justify-center ring-2 ${credit.isTeam ? 'bg-gradient-to-br from-red-500 to-orange-600 ring-orange-500/30' : 'bg-gradient-to-br from-red-600 to-red-800 ring-red-500/30'}`}>
                        {credit.avatar ? (
                          <img
                            src={credit.avatar}
                            alt={credit.name}
                            className="w-full h-full object-cover"
                          />
                        ) : credit.isTeam ? (
                          <Users size={24} className="text-white" />
                        ) : (
                          <span className="text-white font-bold text-xl">
                            {credit.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="text-white font-medium text-sm">{credit.name}</div>
                      <div className="text-xs font-mono text-neutral-500 mt-1">{credit.role}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-8 border-t border-white/10 text-center"
            >
              <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                AI Mindset · Annual Report 2025 · The Context Gap
              </p>
              <p className="text-xs text-neutral-600 mt-2">
                Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-neutral-400">ESC</kbd> or click × to close
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SourcesOverlay;
