import type { SlideData } from './types';

// ============================================================
// AIM Annual Report 2025 — "THE CONTEXT GAP" v4
// RESTRUCTURED: Loops → Waves (with logical causation chain)
// Updated: 2026-01-08
// ============================================================
// NEW ORDER:
// CORE CHAIN (Waves 1-6): Strong causation
//   1. System-2 Reasoning
//   2. Orchestration Layers
//   3. Coding Agents (was 7)
//   4. Sovereign AI (was 3)
//   5. Regional Frames (was 8)
//   6. Post-Training Values (was 9)
// ADOPTION WAVES (7-8): Parallel adoption track
//   7. On-Device/Privacy (was 5)
//   8. Machine Intimacy (was 10)
// CONSTRAINT TRACKS (9-10): Background constraints
//   9. Data Wall (was 4)
//   10. Compute & Energy (was 6)
// ============================================================

type Section = { title: string; startSlide: number };

const RAW_SLIDES: SlideData[] = [
  // ═══════════════════════════════════════════════════════════════════
  // INTRO (Slides 0-5)
  // ═══════════════════════════════════════════════════════════════════

  // Slide 0 — Cover
  {
    id: 1,
    title: 'the context gap',
    subtitle: 'ai is accelerating. humans are buffering.',
    visual: 'hero_cover',
    caption: 'a yearly reset artifact by ai mindset + community.\na sovereignty reset for people running their own life.',
    layout: 'center',
  },

  // Slide 1 — A note from the team
  {
    id: 2,
    title: 'a note from the team',
    subtitle: "we made this because 2025 didn't feel like a year.",
    visual: 'breath',
    layout: 'split',
    content: [
      "it felt like the year **context became expensive**.",
      "machines got faster at producing outputs.",
      "humans got slower at holding meaning, attention, and coherent direction.",
      "this isn't a \"trends\" deck.",
      "it's closer to a navigation tool.",
      "we're not trying to predict the future with confidence theater.",
      "we're trying to show **what changed**, **why it matters**, and **what the human layer can do** — so you can make better calls in 2026.",
    ],
    caption: "— ai mindset (research + labs team)",
    source: { label: 'AI Mindset + Community', url: 'https://aimindset.org' },
  },

  // Slide 2 — What this is (and isn't)
  {
    id: 3,
    title: "what this is (and isn't)",
    subtitle: 'this is: a paired map.',
    visual: 'network',
    layout: 'paired',
    leftTitle: "you'll go through 10 waves",
    leftContent: [
      '**machine signal** (capability / deployment / economics)',
      '**human signal** (cognition / identity / culture)',
      '**the context gap** (where coordination breaks)',
    ],
    rightTitle: "this isn't",
    rightContent: [
      'a hype deck',
      'a moral panic',
      'a consulting pdf that says nothing new',
    ],
  },

  // Slide 3 — What we mean by "context gap"
  {
    id: 4,
    title: 'what we mean by "context gap"',
    subtitle: 'the distance between:',
    visual: 'gap',
    layout: 'split',
    content: [
      '1. the context a system needs to act well',
      'and',
      '2. the context a human can actually hold without degrading decisions.',
      '',
      'and the real losses:',
      '**time** (the non-renewable one)',
      '**money** (busy ≠ effective)',
      '**reputation** (sloppy decisions, missed nuance)',
    ],
  },

  // Slide 4 — The thinkers & research lines behind the frame
  {
    id: 5,
    title: 'the thinkers & research lines behind the frame',
    subtitle: 'the backbone behind the 150+ papers, benchmarks, policy docs, and infra reports we reviewed.',
    visual: 'hierarchy',
    layout: 'split',
    content: [
      '**attention & scarcity** (herbert simon): attention becomes the bottleneck.',
      '**cognition under load** (cognitive load / hci; kahneman as a metaphor): more inputs → worse judgment; "fast guess" vs "slow verify."',
      '**acceleration & identity** (toffler → rosa): speed reshapes norms and self.',
      '**tools as minds** (clark & chalmers): tools extend cognition; partnership beats replacement.',
      '**sovereignty as cultural tech** (hirschman; balaji): "exit" becomes everyday language for autonomy.',
    ],
  },

  // Slide 5 — Our signal base (AI Mindset)
  {
    id: 6,
    title: 'our signal base (ai mindset)',
    subtitle: 'we trust signals — especially signals with a feedback loop.',
    visual: 'STATS_ANIMATED',
    layout: 'stats',
    stats: [
      { value: '6', label: 'labs', color: 'red' },
      { value: '200+', label: 'graduates', color: 'black' },
      { value: '23+', label: 'countries', color: 'black' },
      { value: '100+', label: 'live hours', color: 'red' },
      { value: '67%', label: 'completion', color: 'black' },
    ],
    content: [
      'we built this report as the yearly reset artifact for the ai mindset + community ecosystem — and then pressure-tested the ideas in practice.',
      'thanks: alex p, ray svitla, sergei khabarov, and anca for finishing this over the christmas holidays.',
    ],
    source: { label: 'AI Mindset Labs', url: 'https://aimindset.org/ai-mindset-w25' },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 10 WAVES — RESTRUCTURED
  // ═══════════════════════════════════════════════════════════════════

  // Section divider
  {
    id: 7,
    title: '10 waves',
    subtitle: 'machines ↔ humans',
    visual: 'SECTION_DIVIDER',
    sectionTitle: 'waves',
    dark: true,
    caption: 'each wave builds on the previous — creating the context gap.',
    layout: 'center',
  },

  // ═══════════════════════════════════════════════════════════════════
  // CORE CHAIN (Waves 1-6) — Strong causation
  // ═══════════════════════════════════════════════════════════════════

  // WAVE 1: System-2 Reasoning — INTRO
  {
    id: 8,
    title: 'wave 1: system-2 reasoning',
    subtitle: '"chat" is turning into delegation.',
    visual: 'trust',
    layout: 'loop-intro',
  },
  // WAVE 1: System-2 Reasoning — FULL
  {
    id: 9,
    title: 'wave 1: system-2 reasoning',
    subtitle: '"chat" is turning into delegation.',
    visual: 'trust',
    layout: 'loop',
    loopData: {
      machine: 'agents don\'t just answer — they do (plan, act, call tools, ship).\n"slow thinking" moves from research concept to product feature: fewer obvious failures, more consistent multi-step output.',
      human: 'people don\'t trust "magic." they trust **auditable work**.\nthe moment an agent touches money, customers, or reputation, humans demand: _show me your steps_.',
      gap: 'agents operate at machine speed, but accountability remains human speed.\nverification becomes ethics — "can you just approve this?" becomes the most expensive sentence in a company.',
    },
    sources: [
      { label: 'Li et al. — Reasoning LLMs Survey', url: 'https://arxiv.org/abs/2502.17419' },
      { label: 'OpenAI — SWE-Bench Verified', url: 'https://openai.com/index/introducing-swe-bench-verified/' },
      { label: 'x402 — Internet-native payments for AI agents', url: 'https://www.x402.org/' },
    ],
  },
  // WAVE 1: System-2 Reasoning — EVIDENCE
  {
    id: 100,
    title: 'reasoning: the evidence',
    visual: 'trust',
    layout: 'loop-evidence',
    loopNumber: 1,
    evidenceData: {
      keyStats: [
        { value: '71.7%', label: 'OpenAI o3 on SWE-bench Verified', source: 'OpenAI 2025' },
        { value: '96.7%', label: 'o3 on AIME math benchmark', source: 'OpenAI 2025' },
        { value: '90-95%', label: 'DeepSeek R1 cheaper than o1', source: 'DeepSeek 2025' },
      ],
      researchHighlights: [
        '**o3** achieves 2727 Codeforces rating vs R1 (2029) and o1 (1891)',
        'Claude 3.7 solves **21/28** puzzles vs DeepSeek R1 (18/28) – actual reasoning, not memorization',
        '"Slow thinking" moves from research concept to **product feature**',
      ],
      industryData: ['OpenAI o3', 'DeepSeek R1', 'Claude 3.7 Sonnet', 'Gemini 2.0'],
    },
    sources: [
      { label: 'Li et al. — Reasoning LLMs Survey', url: 'https://arxiv.org/abs/2502.17419' },
      { label: 'OpenAI — SWE-Bench Verified', url: 'https://openai.com/index/introducing-swe-bench-verified/' },
      { label: 'Vellum — Claude 3.7 vs o1 vs DeepSeek R1', url: 'https://www.vellum.ai/blog/claude-3-7-sonnet-vs-openai-o1-vs-deepseek-r1' },
      { label: 'PromptLayer — o3 vs DeepSeek R1 Analysis', url: 'https://blog.promptlayer.com/openai-o3-vs-deepseek-r1-an-analysis-of-reasoning-models/' },
    ],
  },

  // TRANSITION 1→2
  {
    id: 'trans-1-2',
    title: 'how this enables the next shift',
    subtitle: 'when agents can think, they can be connected.',
    visual: 'transition',
    layout: 'center',
    dark: true,
    content: [
      'system-2 reasoning (planning, tool use, multi-step execution) makes it possible to **chain agents into workflows**.',
      '',
      'a single thinking agent is useful.',
      'orchestrated agents become **infrastructure**.',
    ],
  },

  // WAVE 2: Orchestration Layers — INTRO
  {
    id: 10,
    title: 'wave 2: orchestration layers',
    subtitle: 'the center of gravity moves from chat to agentic workflows.',
    visual: 'overload',
    layout: 'loop-intro',
  },
  // WAVE 2: Orchestration Layers — FULL
  {
    id: 11,
    title: 'wave 2: orchestration layers',
    subtitle: 'the center of gravity moves from chat to agentic workflows.',
    visual: 'overload',
    layout: 'loop',
    loopData: {
      machine: 'systems that call tools, execute steps across software, and coordinate across services.\nthe center of gravity moves from chat to **agentic workflows**.',
      human: 'overload becomes baseline: too many threads, tools, notifications, pseudo-tasks.\nevery new layer adds fear: "who owns the workflow?" "where does my data go?" "can i exit? ◡̈"',
      gap: 'when systems connect, context leaks across apps — humans can\'t see the full graph, but remain responsible for outcomes.\nthe question becomes: **who is the author of outcomes?**',
    },
    sources: [
      { label: 'Anthropic — Model Context Protocol (MCP)', url: 'https://www.anthropic.com/news/model-context-protocol' },
      { label: 'Gartner — Top 10 Strategic Technology Trends 2025', url: 'https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025' },
      { label: 'AI Mindset — Context Obesity', url: 'https://hackernoon.com/youre-not-burned-out-youve-got-context-obesity' },
    ],
  },
  // WAVE 2: Orchestration Layers — EVIDENCE
  {
    id: 101,
    title: 'orchestration: the evidence',
    visual: 'overload',
    layout: 'loop-evidence',
    loopNumber: 2,
    evidenceData: {
      keyStats: [
        { value: '97M+', label: 'MCP SDK monthly downloads (Python + TypeScript)', source: 'Linux Foundation' },
        { value: '75+', label: 'Claude MCP connectors available', source: 'Anthropic 2025' },
        { value: '33%', label: 'enterprise software with agentic AI by 2028', source: 'Gartner 2025' },
      ],
      researchHighlights: [
        'MCP donated to **Linux Foundation** (Dec 2025) – becoming industry standard',
        'Platinum members: Amazon, Anthropic, Google, Microsoft, OpenAI',
        'Agents now use **hundreds to thousands** of tools per deployment',
      ],
      industryData: ['MCP Protocol', 'OpenAI Agents SDK', 'LangChain', 'n8n', 'Zapier'],
    },
    sources: [
      { label: 'Anthropic — Model Context Protocol', url: 'https://www.anthropic.com/news/model-context-protocol' },
      { label: 'Linux Foundation — AAIF Announcement', url: 'https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation' },
      { label: 'Gartner — Top 10 Tech Trends 2025', url: 'https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025' },
      { label: 'AI Mindset — Context Obesity', url: 'https://hackernoon.com/youre-not-burned-out-youve-got-context-obesity' },
    ],
  },

  // TRANSITION 2→3
  {
    id: 'trans-2-3',
    title: 'how this enables the next shift',
    subtitle: 'connected workflows prove themselves first in code.',
    visual: 'transition',
    layout: 'center',
    dark: true,
    content: [
      'when systems can orchestrate (call tools, coordinate services, verify outputs), **coding becomes the first domain** where agents ship production-ready work.',
      '',
      'code is measurable, testable, and valuable.',
      'the perfect **testing ground**.',
    ],
  },

  // WAVE 3: Coding Agents (was Wave 7) — INTRO
  {
    id: 20,
    title: 'wave 3: coding agents ↔ authorship anxiety',
    subtitle: 'coding becomes the first broadly proven agent category.',
    visual: 'centaur',
    layout: 'loop-intro',
  },
  // WAVE 3: Coding Agents — FULL
  {
    id: 21,
    title: 'wave 3: coding agents ↔ authorship anxiety',
    subtitle: 'coding becomes the first broadly proven agent category.',
    visual: 'centaur',
    layout: 'loop',
    loopData: {
      machine: 'systems write, refactor, test, ship.\nthe value is measurable; adoption is fast.\ncoding becomes the first broadly proven agent category.',
      human: 'authorship anxiety rises: "what\'s mine if the machine did it?"\nfear of skill atrophy, status loss, erosion of craft.',
      gap: 'when labor gets cheaper, identity gets more expensive.\nin a world where output is abundant, authorship becomes less about typing and more about **owning decisions**.',
    },
    sources: [
      { label: 'OpenAI — SWE-Bench Verified', url: 'https://openai.com/index/introducing-swe-bench-verified/' },
      { label: 'Anthropic — SWE-Bench Sonnet', url: 'https://www.anthropic.com/research/swe-bench-sonnet' },
      { label: 'AI Mindset — Coding with Claude 3.5', url: 'https://t.me/ai_mind_set/282' },
    ],
  },
  // WAVE 3: Coding Agents — EVIDENCE
  {
    id: 106,
    title: 'coding: the evidence',
    visual: 'centaur',
    layout: 'loop-evidence',
    loopNumber: 3,
    evidenceData: {
      keyStats: [
        { value: '42%', label: 'GitHub Copilot market share (paid tools)', source: 'CB Insights' },
        { value: '82%', label: 'Developers using AI assistants weekly', source: 'Stack Overflow 2025' },
        { value: '41%', label: 'AI-generated code globally', source: 'GitHub 2025' },
      ],
      researchHighlights: [
        '**Vibe Coding** named Word of the Year by Collins Dictionary',
        'METR Study paradox: experienced devs **19% slower** with AI, believe **20% faster**',
        'Cursor ARR: **$500M+**, Fortune 500 usage: **50%**',
      ],
      industryData: ['GitHub Copilot', 'Cursor', 'Claude Code', 'Windsurf', 'Replit'],
    },
    sources: [
      { label: 'CB Insights — Coding AI Market Share', url: 'https://www.cbinsights.com/research/report/coding-ai-market-share-december-2025/' },
      { label: 'Stack Overflow — Developer Survey 2025', url: 'https://survey.stackoverflow.co/2025/' },
      { label: 'Anthropic — SWE-Bench Sonnet', url: 'https://www.anthropic.com/research/swe-bench-sonnet' },
      { label: 'Karpathy — Vibe Coding Tweet', url: 'https://x.com/karpathy/status/1886192184808149383' },
    ],
  },

  // TRANSITION 3→4
  {
    id: 'trans-3-4',
    title: 'how this enables the next shift',
    subtitle: 'when agents touch money, institutions demand rules.',
    visual: 'transition',
    layout: 'center',
    dark: true,
    content: [
      'as coding agents move from experiments to production (41% of global code is AI-generated), organizations face **real risk**:',
      '',
      'liability, security, compliance.',
      '',
      'regulation stops being theoretical and becomes **urgent**.',
    ],
  },

  // WAVE 4: Sovereign AI (was Wave 3) — INTRO
  {
    id: 12,
    title: 'wave 4: sovereign ai',
    subtitle: 'regulation matures. institutions define "unacceptable risk."',
    visual: 'locked',
    layout: 'loop-intro',
  },
  // WAVE 4: Sovereign AI — FULL
  {
    id: 13,
    title: 'wave 4: sovereign ai',
    subtitle: 'regulation matures. institutions define "unacceptable risk."',
    visual: 'locked',
    layout: 'loop',
    loopData: {
      machine: 'sovereign ai becomes strategy: data residency, regulated stacks, local inference, compliant clouds.\n"where data lives" becomes as important as "what the model can do."',
      human: 'a personal version emerges: **neo-sovereignty**.\npeople build their own spaces (private notes, smaller circles, local tools) because public feeds feel noisy, extractive, increasingly synthetic.',
      gap: 'trust splits: people want innovation and guarantees.\nfor orgs it\'s compliance and risk; for individuals it\'s privacy, boundaries, and control over the context that shapes thinking.',
    },
    sources: [
      { label: 'EUR-Lex — AI Act (EU 2024/1689)', url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng' },
      { label: 'McKinsey — Sovereign AI in Europe', url: 'https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/accelerating-europes-ai-adoption-the-role-of-sovereign-ai' },
    ],
  },
  // WAVE 4: Sovereign AI — EVIDENCE
  {
    id: 102,
    title: 'sovereignty: the evidence',
    visual: 'locked',
    layout: 'loop-evidence',
    loopNumber: 4,
    evidenceData: {
      keyStats: [
        { value: 'Aug 2024', label: 'EU AI Act entered into force', source: 'EUR-Lex' },
        { value: 'Aug 2026', label: 'Full AI Act applicability', source: 'EUR-Lex' },
        { value: '30%', label: 'GenAI projects abandoned after PoC (by end 2025)', source: 'Gartner' },
      ],
      researchHighlights: [
        '**GPAI Code of Practice** published July 2025 – voluntary compliance tool',
        'US Executive Order (Dec 2025): centralizes AI policy, federal preemption',
        'California: AI safety laws, whistleblower protections, watermarking',
      ],
      industryData: ['EU AI Act', 'US Executive Orders', 'California RAISE Act', 'GDPR'],
    },
    sources: [
      { label: 'EUR-Lex — AI Act (EU 2024/1689)', url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng' },
      { label: 'National Law Review — 2026 AI Outlook', url: 'https://natlawreview.com/article/2026-outlook-artificial-intelligence' },
      { label: 'McKinsey — Sovereign AI in Europe', url: 'https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/accelerating-europes-ai-adoption-the-role-of-sovereign-ai' },
    ],
  },

  // TRANSITION 4→5
  {
    id: 'trans-4-5',
    title: 'how this enables the next shift',
    subtitle: 'one technology, many governance realities.',
    visual: 'transition',
    layout: 'center',
    dark: true,
    content: [
      'as regulation matures, it doesn\'t unify — it **fragments**.',
      '',
      'US prioritizes frontier innovation.',
      'EU enforces rights-first compliance.',
      'China builds state-aligned utility.',
      '',
      'the same capability reads differently **depending on where you are**.',
    ],
  },

  // WAVE 5: Regional Frames (was Wave 8) — INTRO
  {
    id: 22,
    title: 'wave 5: regional frames',
    subtitle: 'ai progress is global, but governance differs by region.',
    visual: 'mirror',
    layout: 'loop-intro',
  },
  // WAVE 5: Regional Frames — FULL
  {
    id: 23,
    title: 'wave 5: regional frames',
    subtitle: 'ai progress is global, but governance differs by region.',
    visual: 'mirror',
    layout: 'loop',
    loopData: {
      machine: 'policy, procurement, infrastructure, and institutional trust vary.\nai progress is global, but governance and deployment realities differ by region.',
      human: 'moral frames diverge:\nus: frontier / market\neu: rights / compliance\nothers: utility / stability / state capacity (varies)',
      gap: 'a global story can\'t be one voice. the same capability reads as liberation, risk, or stability tool depending on the frame.\n**pluralism is not optional** — if you ignore frames, you misunderstand people (or get misunderstood).',
    },
    sources: [
      { label: 'Pew Research — Trust in EU, US, China AI Regulation', url: 'https://www.pewresearch.org/2025/10/15/trust-in-the-eu-u-s-and-china-to-regulate-use-of-ai/' },
      { label: 'Stanford HAI — AI Index 2025: Public Opinion', url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report/public-opinion' },
      { label: 'European Commission — AI Research Publications', url: 'https://op.europa.eu/en/publication-detail/-/publication/4ee8799e-142c-11f0-b1a3-01aa75ed71a1/language-en' },
      { label: 'Plurality Project (GitHub)', url: 'https://github.com/pluralitybook/plurality' },
    ],
  },
  // WAVE 5: Regional Frames — EVIDENCE
  {
    id: 107,
    title: 'regional frames: the evidence',
    visual: 'mirror',
    layout: 'loop-evidence',
    loopNumber: 5,
    evidenceData: {
      keyStats: [
        { value: '78%', label: 'Organizations using AI (up from 55% in 2023)', source: 'McKinsey 2025' },
        { value: '71%', label: 'Using GenAI in business functions', source: 'McKinsey 2025' },
        { value: '24x', label: 'Hang Seng Tech P/E vs 31x Nasdaq', source: 'UBS 2025' },
      ],
      researchHighlights: [
        'US: **frontier / market** frame – innovation first',
        'EU: **rights / compliance** frame – regulation first',
        'China: **utility / state capacity** – local AI champions emerging',
      ],
      industryData: ['EU AI Act', 'US Executive Orders', 'DeepSeek', 'Plurality'],
    },
    sources: [
      { label: 'Pew Research — Trust in AI Regulation', url: 'https://www.pewresearch.org/2025/10/15/trust-in-the-eu-u-s-and-china-to-regulate-use-of-ai/' },
      { label: 'Stanford HAI — AI Index 2025', url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report/public-opinion' },
      { label: 'McKinsey — State of AI 2025', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai' },
    ],
  },

  // TRANSITION 5→6
  {
    id: 'trans-5-6',
    title: 'how this enables the next shift',
    subtitle: 'governance becomes code.',
    visual: 'transition',
    layout: 'center',
    dark: true,
    content: [
      'regional values don\'t stay abstract — they get **embedded into models** through post-training.',
      '',
      'refusal patterns, safety postures, and default behaviors reflect the institutional frames that regulate them.',
      '',
      'the model you use **carries a worldview**.',
    ],
  },

  // WAVE 6: Post-Training Default Values (was Wave 9) — INTRO
  {
    id: 24,
    title: 'wave 6: post-training default values',
    subtitle: 'post-training defines behavior: refusals, style, safety posture.',
    visual: 'filter',
    layout: 'loop-intro',
  },
  // WAVE 6: Post-Training Default Values — FULL
  {
    id: 25,
    title: 'wave 6: post-training default values',
    subtitle: 'post-training defines behavior: refusals, style, safety posture.',
    visual: 'filter',
    layout: 'loop',
    loopData: {
      machine: 'defaults become the product.\nwhat a model tends to amplify.\npost-training defines behavior: refusals, style, safety posture.',
      human: 'values fragment.\npeople cluster into micro-realities and micro-truths.\nthe cost of disagreement rises; the temptation to outsource judgment rises too.',
      gap: 'every model has defaults. every default embeds a worldview.\n**the human question becomes:** whose values are embedded in the tool you use daily — and what do they quietly optimize for?',
    },
    sources: [
      { label: 'Ouyang et al. — InstructGPT', url: 'https://arxiv.org/abs/2203.02155' },
      { label: 'Bai et al. — Constitutional AI', url: 'https://arxiv.org/abs/2212.08073' },
      { label: 'Investigating Local Censorship (arXiv 2025)', url: 'https://arxiv.org/pdf/2505.12625' },
    ],
  },
  // WAVE 6: Post-Training — EVIDENCE
  {
    id: 108,
    title: 'defaults: the evidence',
    visual: 'filter',
    layout: 'loop-evidence',
    loopNumber: 6,
    evidenceData: {
      keyStats: [
        { value: '233', label: 'AI incidents tracked (+56% YoY)', source: 'AI Incident Database' },
        { value: '39%', label: 'AI customer service bots pulled/reworked', source: 'Industry surveys' },
        { value: '76%', label: 'Enterprises with human-in-the-loop', source: 'Industry surveys' },
      ],
      researchHighlights: [
        '**InstructGPT/RLHF** set the template for post-training alignment',
        '**Constitutional AI** (Anthropic) – values as code',
        'Regional censorship patterns diverge across models',
      ],
      industryData: ['RLHF', 'Constitutional AI', 'DPO', 'Safety tuning'],
    },
    sources: [
      { label: 'Ouyang et al. — InstructGPT', url: 'https://arxiv.org/abs/2203.02155' },
      { label: 'Bai et al. — Constitutional AI', url: 'https://arxiv.org/abs/2212.08073' },
      { label: 'AI Incident Database', url: 'https://incidentdatabase.ai/' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ADOPTION WAVES (7-8) — Parallel adoption track
  // ═══════════════════════════════════════════════════════════════════

  // Section marker — Adoption Waves
  {
    id: 'adoption-marker',
    title: 'adoption waves',
    subtitle: 'how humans respond to the core shifts',
    visual: 'SECTION_DIVIDER',
    sectionTitle: 'adoption',
    dark: true,
    caption: 'parallel patterns of human adaptation and adoption.',
    layout: 'center',
  },

  // WAVE 7: On-Device Models ↔ Privacy as Status (was Wave 5) — INTRO
  {
    id: 16,
    title: 'wave 7: on-device models ↔ privacy as status',
    subtitle: 'smaller models get good enough and spread everywhere.',
    visual: 'unlocked',
    layout: 'loop-intro',
  },
  // WAVE 7: On-Device Models — FULL
  {
    id: 17,
    title: 'wave 7: on-device models ↔ privacy as status',
    subtitle: 'smaller models get good enough and spread everywhere.',
    visual: 'unlocked',
    layout: 'loop',
    loopData: {
      machine: 'ai becomes ambient — less a destination, more a layer.\non devices, at the edge, inside apps. smaller models get good enough.',
      human: 'privacy becomes status. not secrecy — **control**.\nmore private drafting, smaller circles, local storage, intentional friction against performative posting.',
      gap: 'when ai is everywhere, boundaries become the differentiator.\n**if everything can be processed, the premium shifts to what you keep.**',
    },
    sources: [
      { label: 'Android — Gemini Nano on-device APIs', url: 'https://android-developers.googleblog.com/2025/08/the-latest-gemini-nano-with-on-device-ml-kit-genai-apis.html' },
      { label: 'Wired — Meta Pay for Privacy', url: 'https://www.wired.com/story/meta-facebook-pay-for-privacy-europe/' },
      { label: 'ICO — Data Lives Year 2 Report', url: 'https://ico.org.uk/media2/m2maphry/ico-data-lives-year-2-report.pdf' },
    ],
  },
  // WAVE 7: Privacy — EVIDENCE
  {
    id: 104,
    title: 'privacy: the evidence',
    visual: 'unlocked',
    layout: 'loop-evidence',
    loopNumber: 7,
    evidenceData: {
      keyStats: [
        { value: '30%', label: 'Chinese open-source LLM global share (from 1.2%)', source: 'ChinaTalk 2025' },
        { value: '90-95%', label: 'DeepSeek cost reduction vs OpenAI o1', source: 'DeepSeek 2025' },
        { value: '10M+', label: 'Qwen app downloads in one week', source: 'Alibaba 2025' },
      ],
      researchHighlights: [
        '**Gemini Nano** on-device: AI becomes ambient, not destination',
        'Meta "pay for privacy" model in Europe – **control as premium**',
        'Local-first: private drafting, smaller circles, intentional friction',
      ],
      industryData: ['Gemini Nano', 'Apple Intelligence', 'DeepSeek R1', 'Local LLMs'],
    },
    sources: [
      { label: 'Android — Gemini Nano on-device APIs', url: 'https://android-developers.googleblog.com/2025/08/the-latest-gemini-nano-with-on-device-ml-kit-genai-apis.html' },
      { label: 'Wired — Meta Pay for Privacy', url: 'https://www.wired.com/story/meta-facebook-pay-for-privacy-europe/' },
      { label: 'ChinaTalk — Chinese AI 2025', url: 'https://www.chinatalk.media/p/china-ai-in-2025-wrapped' },
    ],
  },

  // TRANSITION 7→8
  {
    id: 'trans-7-8',
    title: 'how this enables the next shift',
    subtitle: 'when AI is everywhere, relationships become possible.',
    visual: 'transition',
    layout: 'center',
    dark: true,
    content: [
      'as models move on-device (ambient, always available, private), the relationship changes from **tool to companion**.',
      '',
      'constant access + privacy + personalization = conditions for **emotional adoption**.',
      '',
      'not just "useful," but "trusted."',
    ],
  },

  // WAVE 8: Machine Intimacy + Programmable Identity (was Wave 10) — INTRO
  {
    id: 26,
    title: 'wave 8: machine intimacy + programmable identity',
    subtitle: 'ai moves from tool to relationship surface.',
    visual: 'echo',
    layout: 'loop-intro',
  },
  // WAVE 8: Machine Intimacy — FULL
  {
    id: 27,
    title: 'wave 8: machine intimacy + programmable identity',
    subtitle: 'ai moves from tool to relationship surface.',
    visual: 'echo',
    layout: 'loop',
    loopData: {
      machine: 'companions, therapists, griefbots, parasocial loops.\nin parallel, ai makes it easy to produce a "professional self" at scale — identity becomes programmable.',
      human: 'loneliness isn\'t solved by information.\npeople accept synthetic intimacy (even while knowing it\'s synthetic).\nmeanwhile, people tire of performing the self; they retreat to private spaces and smaller audiences.',
      gap: 'humans outsource emotional regulation to systems optimized for engagement.\n**we confuse "attention" with "care."**',
    },
    sources: [
      { label: 'AI Mindset — Mental Health Boundaries (Founder OS)', url: 'https://aimindsetspace.substack.com/p/founder-os-mental-health' },
      { label: 'Ada Lovelace Institute — AI Companions', url: 'https://www.adalovelaceinstitute.org/blog/ai-companions/' },
      { label: 'Marwick & Boyd — Context Collapse', url: 'https://www.microsoft.com/en-us/research/publication/i-tweet-honestly-i-tweet-passionately-twitter-users-context-collapse-and-the-imagined-audience/' },
    ],
  },
  // WAVE 8: Machine Intimacy — EVIDENCE
  {
    id: 109,
    title: 'intimacy: the evidence',
    visual: 'echo',
    layout: 'loop-evidence',
    loopNumber: 8,
    evidenceData: {
      keyStats: [
        { value: '87%', label: 'Organizations attacked with AI-assisted threats', source: 'Cybersecurity surveys' },
        { value: '$12.5B', label: 'US financial fraud losses (2025)', source: 'FTC 2025' },
        { value: '95%', label: 'GenAI pilots failing to deliver ROI (MIT)', source: 'MIT 2025' },
      ],
      researchHighlights: [
        '**Parasocial AI**: companions, therapists, griefbots normalized',
        '"Context collapse" – same identity, different audiences',
        'People accept synthetic intimacy **while knowing it is synthetic**',
      ],
      industryData: ['AI companions', 'Replika', 'Character.AI', 'Deepfakes'],
    },
    sources: [
      { label: 'Ada Lovelace Institute — AI Companions', url: 'https://www.adalovelaceinstitute.org/blog/ai-companions/' },
      { label: 'AI Mindset — Mental Health Boundaries', url: 'https://aimindsetspace.substack.com/p/founder-os-mental-health' },
      { label: 'Marwick & Boyd — Context Collapse', url: 'https://www.microsoft.com/en-us/research/publication/i-tweet-honestly-i-tweet-passionately-twitter-users-context-collapse-and-the-imagined-audience/' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // CONSTRAINT TRACKS (9-10) — Background constraints
  // ═══════════════════════════════════════════════════════════════════

  // Section marker — Constraints
  {
    id: 'constraint-marker',
    title: 'constraint tracks',
    subtitle: 'the limits that govern all waves',
    visual: 'SECTION_DIVIDER',
    sectionTitle: 'constraints',
    dark: true,
    caption: 'these don\'t follow from the chain — they constrain everything.',
    layout: 'center',
  },

  // WAVE 9: Data Wall (was Wave 4) — INTRO
  {
    id: 14,
    title: 'wave 9: data wall',
    subtitle: 'high-quality human data is finite; marginal gains get expensive.',
    visual: 'barrier',
    layout: 'loop-intro',
  },
  // WAVE 9: Data Wall — FULL
  {
    id: 15,
    title: 'wave 9: data wall',
    subtitle: 'high-quality human data is finite; marginal gains get expensive.',
    visual: 'barrier',
    layout: 'loop',
    loopData: {
      machine: 'training leans harder on synthetic data and distillation.\nas synthetic output floods the environment, "evidence" becomes a formatting problem: it can look right before it is right.',
      human: 'trust becomes scarce.\npeople shift from "is it true?" to "is it traceable?"\nthe new literacy is **provenance**.',
      gap: 'machines can manufacture infinite text and images.\nhumans can\'t manufacture infinite meaning.\n**the ratio collapses.**',
    },
    sources: [
      { label: 'Epoch AI — Limits of LLM Scaling', url: 'https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data' },
      { label: 'Shumailov et al. — Model Collapse', url: 'https://arxiv.org/abs/2305.17493' },
      { label: 'AI Mindset — Team Knowledge System', url: 'https://aimindsetspace.substack.com/p/ai-ark-knowledge-system' },
    ],
  },
  // WAVE 9: Data Wall — EVIDENCE
  {
    id: 103,
    title: 'data wall: the evidence',
    visual: 'barrier',
    layout: 'loop-evidence',
    loopNumber: 9,
    evidenceData: {
      keyStats: [
        { value: '$67.4B', label: 'Global enterprise losses from AI hallucinations', source: 'Korra 2025' },
        { value: '47%', label: 'Business leaders making decisions on hallucinated output', source: 'Industry surveys' },
        { value: '0.7%', label: 'Best hallucination rate (Gemini 2.0 Flash)', source: 'ISACA 2025' },
      ],
      researchHighlights: [
        '**Model Collapse**: training on synthetic data degrades quality over generations',
        'Four models now achieve **sub-1% hallucination rates**',
        '"Is it true?" shifting to "**is it traceable?**" – provenance as new literacy',
      ],
      industryData: ['Synthetic data', 'Model collapse', 'RAG systems', 'Data provenance'],
    },
    sources: [
      { label: 'Epoch AI — Limits of LLM Scaling', url: 'https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data' },
      { label: 'Shumailov et al. — Model Collapse', url: 'https://arxiv.org/abs/2305.17493' },
      { label: 'Korra — $67B AI Hallucination Warning', url: 'https://korra.ai/the-67-billion-warning-how-ai-hallucinations-hurt-enterprises-and-how-to-stop-them/' },
      { label: 'ISACA — AI Pitfalls 2025', url: 'https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2025/avoiding-ai-pitfalls-in-2026-lessons-learned-from-top-2025-incidents' },
    ],
  },

  // WAVE 10: Compute & Energy ↔ Return of Physics (was Wave 6) — INTRO
  {
    id: 18,
    title: 'wave 10: compute & energy ↔ return of physics',
    subtitle: "ai isn't just software. it's infrastructure.",
    visual: 'pulse',
    layout: 'loop-intro',
    dark: true,
  },
  // WAVE 10: Compute & Energy — FULL
  {
    id: 19,
    title: 'wave 10: compute & energy ↔ return of physics',
    subtitle: "ai isn't just software. it's infrastructure.",
    visual: 'pulse',
    layout: 'loop',
    dark: true,
    loopData: {
      machine: 'chips, energy, cooling, geopolitics.\neven digital gods need electricity.\nenergy and compute become the regulator of progress.',
      human: 'energy economics turns personal: burnout realism, fatigue, "time hangover," sharper awareness of biological limits.\npeople begin optimizing for sustainability, not maximum output.',
      gap: 'data centres become local political issues; your "cloud" starts to feel like a land dispute.\nphilosophical note: thermodynamics returns as a hidden governor — you can\'t out-optimize scarcity forever.',
    },
    sources: [
      { label: 'IEA — Energy Supply for AI', url: 'https://www.iea.org/reports/energy-and-ai/energy-supply-for-ai' },
      { label: 'Reuters — AI Data Centers and Peaker Plants', url: 'https://www.reuters.com/business/energy/ai-data-centers-are-forcing-obsolete-peaker-power-plants-back-into-service-2025-12-23/' },
    ],
  },
  // WAVE 10: Compute & Energy — EVIDENCE
  {
    id: 105,
    title: 'compute: the evidence',
    visual: 'pulse',
    layout: 'loop-evidence',
    loopNumber: 10,
    dark: true,
    evidenceData: {
      keyStats: [
        { value: '$315-371B', label: 'Hyperscaler CapEx 2025 (+40-44% YoY)', source: 'Goldman Sachs' },
        { value: '536 TWh', label: 'Data center electricity consumption 2025', source: 'IEA' },
        { value: '$7.9T', label: 'Estimated AI infrastructure CapEx to 2030', source: 'McKinsey' },
      ],
      researchHighlights: [
        '**7-year wait** for some power grid connection requests',
        'Stargate project: **$500B** investment over 4 years',
        'Data centres become local political issues; "cloud" feels like land dispute',
      ],
      industryData: ['Stargate', 'NVIDIA', 'AMD', 'Power grid', 'Nuclear'],
    },
    sources: [
      { label: 'Goldman Sachs — AI Power Demand', url: 'https://www.goldmansachs.com/insights/articles/ai-to-drive-165-increase-in-data-center-power-demand-by-2030' },
      { label: 'McKinsey — Cost of Compute', url: 'https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-cost-of-compute-a-7-trillion-dollar-race-to-scale-data-centers' },
      { label: 'IEA — Energy Supply for AI', url: 'https://www.iea.org/reports/energy-and-ai/energy-supply-for-ai' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SUMMARY SLIDES
  // ═══════════════════════════════════════════════════════════════════

  // Slide — Machines Summarized
  {
    id: 28,
    title: 'machines, summarized (2025 → 2026)',
    subtitle: 'what changed in machines:',
    visual: 'velocity',
    layout: 'split',
    content: [
      'from chat to **delegation** (agents + orchestration)',
      'from "more scale" to **better reasoning** (system-2 behavior)',
      'from capability focus to **constraints** (trust, governance, energy)',
      'from one platform to **protocol layers** (connective tissue)',
      'from cloud-only to **ambient ai** (on-device + edge)',
    ],
  },

  // Slide — Humans Summarized
  {
    id: 29,
    title: 'humans, summarized (2025 → 2026)',
    subtitle: 'what changed in humans:',
    visual: 'balance',
    layout: 'split',
    content: [
      'from consumption to **curation** (feeds → gardens)',
      'from optimism to **trust management** (provenance, receipts, auditability)',
      'from public posting to **private coherence** (smaller circles, intentional friction)',
      'from "more tools" to **more fatigue** (capacity gap)',
      'from "identity as output" to **identity as constraint**',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // CALL TO ACTION
  // ═══════════════════════════════════════════════════════════════════

  // Slide — Call to Agency
  {
    id: 30,
    title: 'call to agency',
    subtitle: 'the wrong question is: "what is this doing to us?"',
    visual: 'spark',
    layout: 'center',
    dark: true,
    content: [
      'the better question is:',
      '',
      '**"what are we letting it do to us?"**',
      '',
      'this is not a technological coup.',
      "it's a voluntary abdication — a surrender of the burden of choice.",
      '',
      'it can be reclaimed.',
      'but it must be reclaimed.',
    ],
    source: { label: 'TU Wien — Perspectives on Digital Humanism', url: 'https://dighum.ec.tuwien.ac.at/perspectives-on-digital-humanism/introduction/' },
  },

  // Slide — Survival Kit
  {
    id: 31,
    title: 'survival kit',
    subtitle: "in 2026, most people won't lose to ai. they'll lose to their own defaults.",
    visual: 'grid',
    layout: 'split',
    content: [
      'your life already runs on configuration:',
      '',
      'what you say yes to without thinking',
      'what interrupts you without permission',
      'what you outsource because you\'re tired',
      'what you believe because it was repeated',
      '',
      '**constitution-as-code** = moving from "i\'ll try" → "i have defaults."',
      'a config file for your life.',
    ],
    sources: [
      { label: 'Clark & Chalmers — The Extended Mind', url: 'https://consc.net/papers/extended.html' },
      { label: 'TU Wien — Attention Economy and AI', url: 'https://dighum.ec.tuwien.ac.at/perspectives-on-digital-humanism/the-attention-economy-and-the-impact-of-ai/' },
      { label: 'AI Mindset — Team Knowledge System', url: 'https://aimindsetspace.substack.com/p/ai-ark-knowledge-system' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // COMMUNITY SIGNALS
  // ═══════════════════════════════════════════════════════════════════

  // Section divider
  {
    id: 32,
    title: 'community signals',
    subtitle: 'field signals: real workflow shifts from ai mindset space',
    visual: 'SECTION_DIVIDER',
    sectionTitle: 'community',
    caption: 'that ground our 10 waves in lived experience.',
    layout: 'center',
  },

  // Slide — Field Signals
  {
    id: 33,
    title: 'field signals',
    subtitle: 'real workflow shifts from the community',
    visual: 'MULTI_QUOTES',
    layout: 'quotes',
    quotes: [
      { text: "i became a builder: i shipped in 30 minutes what stalled for 1.5 months.", author: "alexander stashenko" },
      { text: "two weeks of content in 30 minutes; transcripts in zero; apps deploy on prompts.", author: "nikolay senin" },
      { text: "ai moved from smart tool to full participant; i design pipelines, humans decide now.", author: "yakov vasiliev" },
      { text: "cursor and claude code turned me into a product automator; i vibe-coded real prototypes.", author: "natalya savenkova" },
      { text: "after sessions, output is a product: two voice commands plus mcp ship artifacts fast.", author: "dmitry kompanets" },
    ],
    source: { label: 'AI Mindset Space Community', url: 'https://aimindset.org/ai-mindset-community' },
  },

  // Slide — More Field Signals
  {
    id: 34,
    title: 'more field signals',
    subtitle: 'continued reflections from the community',
    visual: 'MULTI_QUOTES',
    layout: 'quotes',
    quotes: [
      { text: "i manage virtual developers: codex generates, claude verifies; legacy rewrites take days, not weeks.", author: "andrei muntanion" },
      { text: "llm roleplay is my reality simulator; i learn by 'coffee chats' with experts daily.", author: "artem tereshin" },
      { text: "i document corporate context end-to-end; llms use it to improve processes and strategy continually.", author: "r_om" },
      { text: "the product shift: hold the user's hand, solve their task — don't sell a universal tool.", author: "evgeniy" },
      { text: "it reads like a chatgpt monolith: lots of 'we,' little risk, little responsibility, little concrete.", author: "andrei shakhov" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // STAY CONNECTED + SOURCES
  // ═══════════════════════════════════════════════════════════════════

  // Slide — Stay in the Loop
  {
    id: 35,
    title: 'stay in the loop',
    subtitle: "if this artifact helped you name the friction — don't lose the thread.",
    visual: 'LINKS_QR',
    layout: 'split',
    content: [
      'stay connected with ai mindset:',
      '',
      '**subscribe on substack** → get next resets, field notes, templates, and lab openings',
      '**explore the ecosystem** → labs, tools, community, artifacts',
      '**talk to us** → partnerships / speaking / labs for teams',
      '',
      '_signals only. no spam. unsubscribe anytime._',
    ],
    links: [
      { label: 'Subscribe on Substack', url: 'https://aimindsetspace.substack.com/' },
      { label: 'Explore the Ecosystem', url: 'https://aim-ecosystem-map.netlify.app/#' },
      { label: 'Talk to us', url: 'http://t.me/alex_named' },
    ],
  },

  // Section divider — Sources
  {
    id: 36,
    title: 'source shelf (curated)',
    subtitle: 'the full reading list behind this report',
    visual: 'SECTION_DIVIDER',
    sectionTitle: 'sources',
    layout: 'center',
  },

  // Slide — AI: Capability, Infra, Adoption
  {
    id: 37,
    title: 'ai: capability, infra, adoption',
    subtitle: 'core references',
    visual: 'source',
    layout: 'sources',
    sources: [
      { label: 'Stanford HAI — AI Index 2025 (PDF)', url: 'https://hai-production.s3.amazonaws.com/files/hai_ai_index_report_2025.pdf' },
      { label: 'Gartner — Top 10 Strategic Technology Trends for 2025', url: 'https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025' },
      { label: 'Anthropic — Model Context Protocol (MCP)', url: 'https://www.anthropic.com/news/model-context-protocol' },
      { label: 'MCP Spec Hub', url: 'https://modelcontextprotocol.io/' },
      { label: 'SWE-bench Ecosystem', url: 'https://www.swebench.com/' },
      { label: 'OpenAI — Introducing SWE-bench Verified', url: 'https://openai.com/index/introducing-swe-bench-verified/' },
      { label: 'X402 — Internet-native payments for AI agents', url: 'https://www.x402.org/' },
    ],
  },

  // Slide — Data: Limits + Synthetic Loops
  {
    id: 38,
    title: 'data: limits + synthetic loops',
    subtitle: 'on the data wall',
    visual: 'signal',
    layout: 'sources',
    sources: [
      { label: 'Epoch AI — Limits of LLM Scaling (Human Data Constraints)', url: 'https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data' },
      { label: 'Shumailov et al. — The Curse of Recursion / Model Collapse', url: 'https://arxiv.org/abs/2305.17493' },
    ],
  },

  // Slide — Humans: Overload, Trust, Culture
  {
    id: 39,
    title: 'humans: overload, trust, culture',
    subtitle: 'the human layer',
    visual: 'noise',
    layout: 'sources',
    sources: [
      { label: 'Microsoft — Work Trend Index 2024', url: 'https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part' },
      { label: 'Microsoft — Work Trend Index 2025', url: 'https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born' },
      { label: 'Edelman — 2025 Trust Barometer (Global Report, PDF)', url: 'https://www.edelman.com/sites/g/files/aatuss191/files/2025-01/2025%20Edelman%20Trust%20Barometer_Final.pdf' },
      { label: 'Marwick & Boyd — Context Collapse / Imagined Audience', url: 'https://www.microsoft.com/en-us/research/publication/i-tweet-honestly-i-tweet-passionately-twitter-users-context-collapse-and-the-imagined-audience/' },
      { label: 'Wired — Meta is asking people in Europe to pay for privacy', url: 'https://www.wired.com/story/meta-facebook-pay-for-privacy-europe/' },
      { label: 'ICO — Data Lives: Year 2 Report (PDF)', url: 'https://ico.org.uk/media2/m2maphry/ico-data-lives-year-2-report.pdf' },
    ],
  },

  // Slide — Governance / Philosophy
  {
    id: 40,
    title: 'governance / philosophy',
    subtitle: 'policy and thought',
    visual: 'search',
    layout: 'sources',
    sources: [
      { label: 'EUR-Lex — AI Act (Regulation (EU) 2024/1689)', url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng' },
      { label: 'European Commission — AI Research Publications in Science', url: 'https://op.europa.eu/en/publication-detail/-/publication/4ee8799e-142c-11f0-b1a3-01aa75ed71a1/language-en' },
      { label: 'TU Wien — Perspectives on Digital Humanism', url: 'https://dighum.ec.tuwien.ac.at/perspectives-on-digital-humanism/' },
      { label: 'Pew Research — Trust in the EU, U.S. and China to Regulate AI (2025)', url: 'https://www.pewresearch.org/2025/10/15/trust-in-the-eu-u-s-and-china-to-regulate-use-of-ai/' },
      { label: 'Ouyang et al. — InstructGPT (2022)', url: 'https://arxiv.org/abs/2203.02155' },
      { label: 'Bai et al. — Constitutional AI (2022)', url: 'https://arxiv.org/abs/2212.08073' },
      { label: 'Investigating Local Censorship (ArXiv, 2025)', url: 'https://arxiv.org/pdf/2505.12625' },
      { label: 'Digital Plurality Project', url: 'https://github.com/pluralitybook/plurality' },
    ],
  },

  // Slide — Frame: Attention, Cognition, Acceleration, Sovereignty
  {
    id: 41,
    title: 'frame: attention, cognition, acceleration, sovereignty',
    subtitle: 'foundational thinkers',
    visual: 'growth',
    layout: 'sources',
    sources: [
      { label: 'Simon — Designing Organizations for an Information-Rich World (1971, PDF)', url: 'https://www.nmh-p.de/wp-content/uploads/Simon-H.A._Designing-organizations-for-an-information-rich-world.pdf' },
      { label: 'Wu — The Attention Merchants', url: 'https://www.penguinrandomhouse.com/books/234876/the-attention-merchants-by-tim-wu/' },
      { label: 'Sweller — Cognitive Load During Problem Solving (1988)', url: 'https://www.sciencedirect.com/science/article/pii/0364021388900237' },
      { label: 'Mark et al. — Focused, Aroused, But So Distractible', url: 'https://www.microsoft.com/en-us/research/wp-content/uploads/2016/10/p903-mark.pdf' },
      { label: 'Kahneman — Thinking, Fast and Slow', url: 'https://us.macmillan.com/books/9780374533557/thinkingfastandslow/' },
      { label: 'Toffler — Future Shock', url: 'https://search.library.wisc.edu/catalog/999466643102121/cite' },
      { label: 'Rosa — Social Acceleration', url: 'https://cup.columbia.edu/book/social-acceleration/9780231148344/' },
      { label: 'Clark & Chalmers — The Extended Mind', url: 'https://consc.net/papers/extended.html' },
      { label: 'Shneiderman — Human-Centered AI', url: 'https://global.oup.com/academic/product/human-centered-ai-9780192845290' },
      { label: 'Hirschman — Exit, Voice, and Loyalty', url: 'https://www.hup.harvard.edu/books/9780674276604' },
      { label: 'Davidson & Rees-Mogg — The Sovereign Individual', url: 'https://www.simonandschuster.com/books/The-Sovereign-Individual/James-Dale-Davidson/9781797103389' },
      { label: 'Srinivasan — The Network State', url: 'https://thenetworkstate.com/' },
    ],
  },

  // Slide — Machine Intimacy
  {
    id: 42,
    title: 'machine intimacy',
    subtitle: 'on ai companions',
    visual: 'echo',
    layout: 'sources',
    sources: [
      { label: 'Ada Lovelace Institute — Friends for Sale: The Rise and Risks of AI Companions (2025)', url: 'https://www.adalovelaceinstitute.org/blog/ai-companions/' },
    ],
  },

  // Slide — AI Mindset Field Notes
  {
    id: 43,
    title: 'ai mindset field notes',
    subtitle: 'our own publications referenced in this deck',
    visual: 'spark',
    layout: 'sources',
    sources: [
      { label: "You're not burned out, you've got context obesity", url: 'https://hackernoon.com/youre-not-burned-out-youve-got-context-obesity' },
      { label: 'Team Knowledge System (AI Ark)', url: 'https://aimindsetspace.substack.com/p/ai-ark-knowledge-system' },
      { label: 'Coding with Claude 3.5', url: 'https://t.me/ai_mind_set/282' },
      { label: 'AI + Mental Health Boundaries (Founder OS)', url: 'https://aimindsetspace.substack.com/p/founder-os-mental-health' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // thank you
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 44,
    title: 'thank you',
    subtitle: 'the context gap · annual report 2025',
    visual: 'SPARKLE_FINALE',
    layout: 'center',
    dark: true,
    content: [
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      "this is not about keeping up with machines.",
      "it's about building operating systems for humans.",
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      'created with the ai mindset labs community',
      '',
      'alex p · ray svitla · sergei khabarov · anca',
    ],
    links: [
      { label: 'Subscribe', url: 'https://aimindsetspace.substack.com/' },
      { label: 'Connect', url: 'https://t.me/ai_mind_set' },
      { label: 'Website', url: 'https://aimindset.org' },
    ],
  },
];

// ============================================================
// Build SLIDES array with proper IDs and SECTIONS
// ============================================================
export const SLIDES: SlideData[] = RAW_SLIDES.map((slide, index) => ({
  ...slide,
  id: index + 1,
}));

export const SECTIONS: Section[] = [
  { title: 'intro', startSlide: 0 },
  { title: '10 waves', startSlide: 6 },
  { title: 'adoption', startSlide: 42 },  // after core chain
  { title: 'constraints', startSlide: 50 },  // after adoption
  { title: 'summary', startSlide: 58 },
  { title: 'action', startSlide: 60 },
  { title: 'community', startSlide: 62 },
  { title: 'sources', startSlide: 66 },
];

// Helper to get base asset path for deployment
export const assetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
};
