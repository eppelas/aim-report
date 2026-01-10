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

  // Slide 1 — Prologue
  {
    id: 2,
    title: '00 / prologue',
    subtitle: "2025 wasn't just a year in the ai calendar.",
    visual: 'breath',
    layout: 'split',
    content: [
      "it was the moment **context became the most expensive resource on earth**.",
      "we called this report the context gap because it identifies the primary fracture in modern civilization: the distance between the volume of data a machine can generate and the amount of meaning a human can integrate without losing their agency, their sanity, or their will.",
      "**machines have conquered the complexity barrier.**",
      "**humans have hit the context wall.**",
      "ai is accelerating. humans are buffering.",
    ],
    source: { label: 'AI Mindset + Community', url: 'https://aimindset.org' },
  },

  // Slide 2 — The Battle for Agency
  {
    id: 3,
    title: '01 / the battle for agency',
    subtitle: 'why are we doing this?',
    visual: 'network',
    layout: 'split',
    content: [
      "we are solving a fundamental crisis: **the loss of agency**.",
      "in a world where generating content, code, and ideas is effectively free, the act of verifying them has become a luxury. we are currently paying a **reliability tax** with our time and attention.",
      "if you cannot audit what the algorithm proposes, you are no longer a leader—you are a passenger.",
      "",
      "this report is your perimeter defense against:",
      "**context obesity:** cognitive paralysis where you are stuffed with low-value data but starved for meaning. burnout is working memory overflow.",
      "**the reliability tax:** $67 billion in annual losses. creating is free; verifying is expensive.",
      "**the responsibility void:** decisions being made by agents for whose mistakes no human is held accountable.",
      "**data inbreeding:** if ai trains on ai-generated data recursively, models degrade. humans become the only source of clean signal.",
    ],
  },

  // Slide 3 — For the Sovereign Individual (HIDDEN - temporarily commented out)
  /*
  {
    id: 4,
    title: '02 / for the sovereign individual',
    subtitle: 'who is this for?',
    visual: 'gap',
    layout: 'split',
    content: [
      "this is not an \"ai adoption\" deck for corporate checklists. it is a **sovereignty reset** for those who take responsibility for their own intelligence and their own business.",
      "",
      "**for the architects of intent:** those tired of being \"prompt engineers\" and ready to lead the machine's logic.",
      "**for leaders:** who realize that 45% of middle management layers will dissolve under the weight of agentic coordination.",
      "**for the builders:** who want to own their \"weights\" and their local data, rather than renting their brain from a cloud giant.",
      "",
      "we have synthesized **72+ primary sources**—from arxiv research papers to 8-hour deep dives with silicon valley architects, from mckinsey enterprise reports to gartner strategic forecasts—to give you a navigation tool for sovereignty, not just \"trends.\"",
    ],
  },
  */

  // Slide 4 — The 11 Shifts Architecture
  {
    id: 5,
    title: '02 / the 11 shifts architecture',
    subtitle: 'a paired map in 4 layers.',
    visual: 'hierarchy',
    layout: 'split',
    content: [
      '**🧱 foundation layer (3):** energy, work, sovereignty — the physical and economic base',
      '**🧠 cognition layer (3):** reasoning, knowledge, discovery — how we think and learn',
      '**🛡️ interface layer (3):** coding, matter, defense — how we build and protect',
      '**❤️ humanity layer (2):** narrative, intimacy — what keeps us human',
      '',
      'this is: **machine signal** (capability / deployment / economics) ↔ **human signal** (cognition / identity / culture) ↔ **the context gap** (where coordination breaks)',
      "this isn't: a hype deck, a moral panic, or a consulting pdf that says nothing new.",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 11 TECTONIC SHIFTS — 4 LAYERS
  // ═══════════════════════════════════════════════════════════════════

  // Section divider
  {
    id: 7,
    title: '11 tectonic shifts',
    subtitle: 'machines ↔ humans across 4 layers',
    visual: 'SECTION_DIVIDER',
    dark: true,
    caption: 'foundation → cognition → interface → humanity\neach shift creates fractures in our reality.',
    layout: 'center',
  },

  // ═══════════════════════════════════════════════════════════════════
  // 🧱 FOUNDATION LAYER — Energy, Work, Sovereignty
  // ═══════════════════════════════════════════════════════════════════

  // SHIFT 11: The Cost (Energy) — INTRO
  {
    id: 8,
    title: 'shift 11: the cost → physical limits',
    subtitle: 'from digital abundance to energy scarcity',
    visual: 'locked',
    layout: 'loop-intro',
  },
  // SHIFT 11: The Cost (Energy) — FULL
  {
    id: 9,
    title: 'shift 11: the cost → physical limits',
    subtitle: 'physics takes revenge. the constraint for 2026 isn\'t chips; it\'s "intelligence per watt."',
    visual: 'locked',
    layout: 'loop',
    loopData: {
      machine: '**the energy wall:** ai demand for data center power projected to grow **160% by 2030**. the physical grid cannot be built fast enough to support ai expansion.\n\n**intelligence/watt:** the focus shifts from raw compute to "inference efficiency" as the critical metric. more compute doesn\'t equal more value if it can\'t be powered.\n\n**$7 trillion** event: big tech capex for 2025 alone is **$200b+**. the **40x investment-value gap**: $600b needed in annual revenue to justify infrastructure spend, but consumer spend is only $12b.',
      human: '**guilt computing:** users face the reality that complex reasoning has a physical toll — every ai query consumes water and generates co2. the disconnect between "green ai" corporate promises and "greed ai" reality.\n\n**hardware sovereignty:** shift to on-device ai to decouple from cloud latency, costs, and energy volatility. privacy becomes a side benefit; energy independence is the driver.',
      gap: 'the disconnect between infinite "digital ideas" and hard "physical matter." while we imagine a billion agents, we cannot power them. this is the bottleneck of "the dream."',
    },
    sources: [
      { label: 'IEA — AI Energy Demand Projections', url: 'https://www.iea.org/' },
      { label: 'Goldman Sachs — Gen AI: Too Much Spend', url: 'https://www.goldmansachs.com/intelligence/pages/gen-ai-too-much-spend-too-little-benefit.html' },
      { label: 'McKinsey — $7 Trillion Infrastructure', url: 'https://www.mckinsey.com/' },
      { label: 'No Priors Ep 144 — Elad Gil on Intelligence/Watt', url: 'https://www.no-priors.com/' },
    ],
  },
  // SHIFT 11: Energy — EVIDENCE
  {
    id: 100,
    title: 'the cost: the evidence',
    visual: 'locked',
    layout: 'loop-evidence',
    loopNumber: 11,
    evidenceData: {
      keyStats: [
        { value: '160%', label: 'AI energy demand surge by 2030', source: 'IEA / Goldman Sachs' },
        { value: '40x', label: 'Gap: $500B infrastructure vs $12B consumer spend', source: 'Harvard / Goldman' },
        { value: '$7T', label: 'Total AI infrastructure requirement', source: 'McKinsey / Sam Altman' },
      ],
      researchHighlights: [
        'The physical grid **cannot be built fast enough** to support AI expansion',
        'Focus shifts from raw compute (FLOPs) to **"Intelligence per Watt"** as critical metric',
        'Tech giants reviving **decommissioned nuclear reactors** (Three Mile Island for Microsoft) and obsolete fossil fuel plants',
      ],
      industryData: ['Microsoft + Three Mile Island', 'Google Data Centers', 'AWS Infrastructure', 'Meta CapEx'],
    },
    sources: [
      { label: 'IEA — AI Energy Projections', url: 'https://www.iea.org/' },
      { label: 'Goldman Sachs — Investment Gap', url: 'https://www.goldmansachs.com/intelligence/pages/gen-ai-too-much-spend-too-little-benefit.html' },
      { label: 'McKinsey — Infrastructure Requirements', url: 'https://www.mckinsey.com/' },
      { label: 'Reuters — Nuclear Revival', url: 'https://www.reuters.com/' },
    ],
  },

  // TRANSITION Energy → Work
  {
    id: 200,
    title: 'how this enables the next shift',
    subtitle: 'when infrastructure exists, labor displacement accelerates.',
    visual: 'bridge',
    layout: 'center',
    dark: true,
    content: [
      'with energy infrastructure in place, ai moves from research labs to **production deployment**.',
      '',
      'the constraint was power. now the constraint is **human acceptance**.',
      'agentic labor becomes real.',
    ],
  },

  // SHIFT 04: The Displacement (Agentic Labor) — INTRO
  {
    id: 10,
    title: 'shift 04: the displacement (agentic labor)',
    subtitle: 'from copilot → autonomous coworker',
    visual: 'overload',
    layout: 'loop-intro',
  },
  // SHIFT 04: The Displacement (Agentic Labor) — FULL
  {
    id: 11,
    title: 'shift 04: the displacement (agentic labor)',
    subtitle: 'the death of middle management.',
    visual: 'overload',
    layout: 'loop',
    loopData: {
      machine: '**the klarna benchmark:** one ai assistant replaced **700 full-time agents**, slashed resolution time (11m → 2m), drove **$40m profit**, and achieved **25% fewer repeat inquiries** than humans.\n\n**the agentic enterprise:** transition from "assistant" to "autonomous coworker." **76% of executives** view ai as a "coworker" rather than a tool. agents receive wallets (x402 protocol), tools (mcp), and "hr for ai."\n\n**service-as-software:** saas model shifts to agents that execute complete workflows. from selling "software licenses" to selling "executed outcomes."',
      human: '**the reliability tax:** **$67 billion** in losses from ai hallucinations and errors. companies shift budgets from "paying for labor" to "paying for audit." creating is free; verifying is expensive.\n\n**managerial collapse:** predicted **45% reduction in middle management layers** as ai handles coordination. the tension between "retrofit" vs "reengineer."\n\n**role shift:** humans move from "doers" to "consiglieres" and auditors. **23.2 million** u.s. jobs directly exposed to ai displacement.',
      gap: 'when an agent acts, who owns the mistake? managers delegate more than they can audit, creating hidden "technical debt" and "strategic blindness."',
    },
    sources: [
      { label: 'Klarna — AI Assistant Case Study', url: 'https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/' },
      { label: 'MIT Sloan/BCG — The Emerging Agentic Enterprise', url: 'https://sloanreview.mit.edu/projects/the-emerging-agentic-enterprise-how-leaders-must-navigate-a-new-age-of-ai/' },
      { label: 'SHRM — 23.2M Jobs Exposed', url: 'https://www.shrm.org/' },
      { label: 'x402 — Agent Payments Protocol', url: 'https://www.x402.org/' },
    ],
  },
  // SHIFT 04: Displacement — EVIDENCE
  {
    id: 101,
    title: 'the displacement: the evidence',
    visual: 'overload',
    layout: 'loop-evidence',
    loopNumber: 4,
    evidenceData: {
      keyStats: [
        { value: '88% vs 6%', label: 'Adoption rate vs transformation rate - execution gap', source: 'McKinsey' },
        { value: '23.2M', label: 'U.S. jobs highly exposed to displacement', source: 'SHRM' },
        { value: '$40M', label: 'Annual profit from single agentic deployment (Klarna)', source: 'Klarna' },
      ],
      researchHighlights: [
        '**$67 billion** annual losses from hallucinations and errors (Reliability Tax)',
        '**76%** of executives viewing AI as "Coworker" not tool',
        '**45%** predicted reduction in middle management layers',
        '**32%** of IT jobs have >50% automatable tasks - tech workers most vulnerable',
      ],
      industryData: ['Klarna AI Assistant', 'x402 Protocol', 'Service-as-Software', 'Agentic Enterprise'],
    },
    sources: [
      { label: 'Klarna — AI Assistant Case Study', url: 'https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/' },
      { label: 'MIT Sloan/BCG — Agentic Enterprise', url: 'https://sloanreview.mit.edu/projects/the-emerging-agentic-enterprise-how-leaders-must-navigate-a-new-age-of-ai/' },
      { label: 'SHRM — Job Displacement Data', url: 'https://www.shrm.org/' },
      { label: 'McKinsey — State of AI', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai' },
    ],
  },

  // TRANSITION Work → Sovereignty
  {
    id: 201,
    title: 'how this enables the next shift',
    subtitle: 'when agents touch money, institutions demand rules.',
    visual: 'bridge',
    layout: 'center',
    dark: true,
    content: [
      'when agentic labor becomes real and **impacts revenue**, nations and corporations rush to control the infrastructure.',
      '',
      'the question shifts from "can ai work?" to **"whose switch is it?"**',
      'sovereignty becomes the battleground.',
    ],
  },

  // SHIFT 09: The Sovereignty (The Splinternet) — INTRO
  {
    id: 20,
    title: 'shift 09: the sovereignty (the splinternet)',
    subtitle: 'from global openness → fragmented stacks',
    visual: 'locked',
    layout: 'loop-intro',
  },
  // SHIFT 09: The Sovereignty (Splinternet) — FULL
  {
    id: 21,
    title: 'shift 09: the sovereignty (the splinternet)',
    subtitle: 'whose switch is it?',
    visual: 'locked',
    layout: 'loop',
    loopData: {
      machine: '**geopolitical fragmentation - the splinternet:** the end of "global ai." three distinct stacks emerge: **us ai** (corporate/closed - openai, anthropic), **china ai** (state-controlled - deepseek bypassing us norms), **eu ai** (regulated - ai act compliance). agi is now a national security asset on "war footing."\n\n**the copyright war - nyt vs. openai:** battle for "sovereignty of culture." nyt lawsuit alleges models **memorize and regurgitate** copyrighted content verbatim. the case determines if human culture belongs to creators or model weights.\n\n**eu ai act:** first comprehensive ai regulation. creates **regulatory gap** - eu ai is "safe but slow," us/china ai is "dangerous but fast."',
      human: '**the guerrilla stack (byoai):** employees bring their own ai to bypass corporate limitations and censorship. "shadow ai" adoption - people use personal tools because corporate ai is blocked or neutered.\n\n**privacy inequality:** privacy officially becomes a **luxury good**. meta\'s "pay or consent" model in eu: pay €13/month or surrender to tracking. "privacy is for the rich" - if you can\'t pay, you are the product.\n\n**data sovereignty movement:** users demand "opt-out" rights - ability to prohibit training on their data. rise of "personal rag" and local-first architectures.',
      gap: 'as ai becomes "aligned" to corporate/national values, you are talking to a constitutional filter. you lose objective context for a "safe narrative."',
    },
    sources: [
      { label: 'Leopold Aschenbrenner — Situational Awareness', url: 'https://situational-awareness.ai/' },
      { label: 'NYT vs OpenAI Lawsuit', url: 'https://www.nytimes.com/2023/12/27/business/media/new-york-times-open-ai-microsoft-lawsuit.html' },
      { label: 'Wired — Meta Pay for Privacy', url: 'https://www.wired.com/story/meta-facebook-pay-for-privacy-europe/' },
      { label: 'Balaji Srinivasan — Network State', url: 'https://thenetworkstate.com/' },
    ],
  },
  // SHIFT 09: Sovereignty — EVIDENCE
  {
    id: 106,
    title: 'the sovereignty: the evidence',
    visual: 'locked',
    layout: 'loop-evidence',
    loopNumber: 9,
    evidenceData: {
      keyStats: [
        { value: '3%', label: 'Paying users for AI (97% are the product)', source: 'Goldman Sachs' },
        { value: '€13/mo', label: 'Meta\'s privacy price in Europe', source: 'Wired' },
        { value: '3 Stacks', label: 'US (closed), China (state), EU (regulated) - global AI fragmentation', source: 'Multiple' },
      ],
      researchHighlights: [
        '**$200B+** Big Tech CapEx for 2025 alone',
        '**$2.1B** Reddit\'s data licensing deal with Google',
        'EU AI Act creates first comprehensive regulation - **Regulatory Gap** between "safe but slow" vs "dangerous but fast"',
        'NYT lawsuit alleges models **memorize and regurgitate** copyrighted content verbatim',
      ],
      industryData: ['US AI Stack', 'China AI Stack', 'EU AI Act', 'Network State', 'Shadow AI'],
    },
    sources: [
      { label: 'Leopold Aschenbrenner — Situational Awareness', url: 'https://situational-awareness.ai/' },
      { label: 'Marc Andreessen — Techno-Optimist Manifesto', url: 'https://a16z.com/the-techno-optimist-manifesto/' },
      { label: 'Balaji Srinivasan — Network State', url: 'https://thenetworkstate.com/' },
      { label: 'Wired — Privacy Inequality', url: 'https://www.wired.com/story/meta-facebook-pay-for-privacy-europe/' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 🧠 COGNITION LAYER — Reasoning, Knowledge, Discovery
  // ═══════════════════════════════════════════════════════════════════

  // TRANSITION Foundation → Cognition
  {
    id: 202,
    title: 'layer transition: foundation → cognition',
    subtitle: 'when infrastructure exists, intelligence accelerates.',
    visual: 'bridge',
    layout: 'center',
    dark: true,
    content: [
      'with **energy infrastructure**, **agentic labor**, and **geopolitical stacks** in place, ai moves from raw compute to **reasoning capability**.',
      '',
      'the question shifts from "can we power it?" to **"can we trust how it thinks?"**',
      'cognition becomes the new frontier.',
    ],
  },

  // SHIFT 01: The Reasoning (The Brain) — INTRO
  {
    id: 12,
    title: 'shift 01: the reasoning (the brain)',
    subtitle: 'from chatbots to thinking models',
    visual: 'trust',
    layout: 'loop-intro',
  },
  // SHIFT 01: The Reasoning (The Brain) — FULL
  {
    id: 13,
    title: 'shift 01: the reasoning (the brain)',
    subtitle: 'from probabilistic prediction → inference-time logic (system 2 thinking)',
    visual: 'trust',
    layout: 'loop',
    loopData: {
      machine: '**sequoia\'s act two:** the fundamental shift from "act 1" (probabilistic token prediction - chatgpt era) to **"act 2"** (reasoning and inference-time compute - o1 era). "act 1 was about prompts. act 2 is about reasoning."\n\n**system 1 vs system 2 architecture:** transition from fast, instinctive responses (system 1) to slow, deliberate, multi-step logical reasoning (system 2). models use **chain of thought (cot)** and **star** via reinforcement learning to "think" before answering.\n\n**scientific compression:** condensing **100 years of scientific progress into 10 years**. prediction: models will exceed nobel-level intelligence in specialized domains (biology, math, physics) by 2026.',
      human: '**auditable work:** users no longer trust "magic" speed. they demand to see the **reasoning trace** - the chain of thought that led to the conclusion. transparency over velocity.\n\n**logic auditor role:** human value shifts from execution to **verifying machine logic**. we become auditors of ai reasoning paths.\n\n**the reasoning reliability gap:** **48% of reasoning tasks** still produce errors in complex scenarios. reasoning models haven\'t eliminated hallucinations - they\'ve made them more convincing.',
      gap: 'a model processes 1,000 reasoning steps in seconds; a human follows five. this leads to meaning dilution: we accept conclusions because auditing the path is too exhausting.',
    },
    sources: [
      { label: 'Sequoia Capital — Generative AI Act Two', url: 'https://www.sequoiacap.com/article/generative-ai-act-two/' },
      { label: 'Li et al. — Reasoning LLMs Survey', url: 'https://arxiv.org/abs/2502.17419' },
      { label: 'Dario Amodei — Machines of Loving Grace', url: 'https://darioamodei.com/machines-of-loving-grace' },
      { label: 'Korra AI — Reasoning Reliability Gap', url: 'https://korra.ai/' },
    ],
  },
  // SHIFT 01: Reasoning — EVIDENCE
  {
    id: 102,
    title: 'the reasoning: the evidence',
    visual: 'trust',
    layout: 'loop-evidence',
    loopNumber: 1,
    evidenceData: {
      keyStats: [
        { value: '126%', label: 'Productivity boost from AI Copilots', source: 'Qodo' },
        { value: '21%', label: 'Quality degradation when prioritizing speed', source: 'Nielsen Norman Group' },
        { value: '48%', label: 'Error rate in complex reasoning tasks', source: 'Korra AI' },
      ],
      researchHighlights: [
        '**2026-2028:** Human data exhaustion timeline (Epoch AI)',
        '**100 → 10 years:** Scientific compression timeline (Amodei)',
        'Models use **Chain of Thought (CoT)** and **STaR** via reinforcement learning',
        '**o3** achieves 71.7% on SWE-bench Verified, 96.7% on AIME math benchmark',
      ],
      industryData: ['OpenAI o3', 'DeepSeek R1', 'Claude 3.7 Sonnet', 'Gemini 2.0'],
    },
    sources: [
      { label: 'Sequoia Capital — Generative AI Act Two', url: 'https://www.sequoiacap.com/article/generative-ai-act-two/' },
      { label: 'Li et al. — Reasoning LLMs Survey', url: 'https://arxiv.org/abs/2502.17419' },
      { label: 'Epoch AI — Data Limits', url: 'https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data' },
      { label: 'Qodo — Productivity vs Quality', url: 'https://www.qodo.ai/' },
    ],
  },

  // TRANSITION Reasoning → Knowledge
  {
    id: 203,
    title: 'how this enables the next shift',
    subtitle: 'when ai can think, it needs context.',
    visual: 'bridge',
    layout: 'center',
    dark: true,
    content: [
      'reasoning without context is blind logic.',
      '',
      'system 2 thinking creates demand for **massive context windows** and **enterprise knowledge integration**.',
      'the question shifts from "can it reason?" to **"can it access the right information?"**',
    ],
  },

  // SHIFT 02: The Knowledge (The Memory) — INTRO
  {
    id: 22,
    title: 'shift 02: the knowledge (the memory)',
    subtitle: 'from information hoarding to context filtering',
    visual: 'overload',
    layout: 'loop-intro',
  },
  // SHIFT 02: The Knowledge (The Memory) — FULL
  {
    id: 23,
    title: 'shift 02: the knowledge (the memory)',
    subtitle: 'from information access → context architecture',
    visual: 'overload',
    layout: 'loop',
    loopData: {
      machine: '**model context protocol (mcp):** anthropic\'s "usb port for ai" - universal standard for connecting ai to data ecosystems (google drive, slack, git) without custom integrations. this is the infrastructure answer to data silos.\n\n**the hallucination tax:** **$67 billion** in enterprise losses from context mismanagement and ai errors. the shift from "paying for ai" to "paying to fix ai mistakes."\n\n**1m token windows:** models can now hold massive context, but retrieval quality degrades beyond human working memory limits (7 items).',
      human: '**context obesity (the diagnosis):** "you\'re not burned out, you have context obesity." a cognitive state caused by overconsumption of low-value data. burnout is **working memory overflow** - consuming more information than can be metabolized into meaning.\n\n**context collapse (marwick & boyd):** the academic term for when personal, professional, and public contexts blur into one. ai radicalizes this - agents extract your words from context and feed them to models.\n\n**search waste:** employees spend **30% of work time** searching for internal information. knowledge access isn\'t the problem - knowledge **discovery** and **curation** are.',
      gap: '1m token windows vs. human limit (7 items). we have tmi (too much information) but zero insight. context collapse blurs professional and private life.',
    },
    sources: [
      { label: 'Anthropic — Model Context Protocol', url: 'https://www.anthropic.com/news/model-context-protocol' },
      { label: 'Korra AI — $67B Hallucination Tax', url: 'https://korra.ai/the-67-billion-warning-how-ai-hallucinations-hurt-enterprises-and-how-to-stop-them/' },
      { label: 'AI Mindset/Hackernoon — Context Obesity', url: 'https://hackernoon.com/youre-not-burned-out-youve-got-context-obesity' },
      { label: 'Gartner — Knowledge Management', url: 'https://www.gartner.com/' },
    ],
  },
  // SHIFT 02: The Knowledge (The Memory) — EVIDENCE
  {
    id: 107,
    title: 'the knowledge: the evidence',
    visual: 'overload',
    layout: 'loop-evidence',
    loopNumber: 2,
    evidenceData: {
      keyStats: [
        { value: '$67B', label: 'Annual financial risk from unmanaged context/hallucinations', source: 'Korra AI' },
        { value: '30%', label: 'Work time lost to internal search', source: 'Gartner' },
        { value: '1M tokens', label: 'Model context window vs 7 items human working memory limit', source: 'Anthropic' },
      ],
      researchHighlights: [
        'MCP Protocol becoming industry standard - donated to **Linux Foundation**',
        '**59%** of developers use 3+ AI tools regularly',
        '**51%** daily AI usage rate among developers',
        'Context Collapse blurs personal, professional, and public contexts',
      ],
      industryData: ['MCP Protocol', 'Enterprise RAG', 'Intention OS', 'Context Dieting'],
    },
    sources: [
      { label: 'Anthropic — Model Context Protocol', url: 'https://www.anthropic.com/news/model-context-protocol' },
      { label: 'Korra AI — $67B Hallucination Tax', url: 'https://korra.ai/the-67-billion-warning-how-ai-hallucinations-hurt-enterprises-and-how-to-stop-them/' },
      { label: 'Gartner — Knowledge Management', url: 'https://www.gartner.com/' },
      { label: 'StackOverflow — Developer Survey', url: 'https://survey.stackoverflow.co/2025/ai' },
    ],
  },

  // TRANSITION Knowledge → Discovery
  {
    id: 204,
    title: 'how this enables the next shift',
    subtitle: 'when ai has context, it can generate knowledge.',
    visual: 'bridge',
    layout: 'center',
    dark: true,
    content: [
      'with reasoning capability and massive context integration, ai moves from **reading science to generating science**.',
      '',
      'the bottleneck shifts from computation to **verification**.',
      'discovery bloat: ai proposes 1,000 molecules; we test one.',
    ],
  },

  // SHIFT 06: The Discovery (The Frontier) — INTRO
  {
    id: 24,
    title: 'shift 06: the discovery (the frontier)',
    subtitle: 'from reading science → generating science',
    visual: 'trust',
    layout: 'loop-intro',
  },
  // SHIFT 06: The Discovery (The Frontier) — FULL
  {
    id: 25,
    title: 'shift 06: the discovery (the frontier)',
    subtitle: 'from literature review to generative discovery',
    visual: 'trust',
    layout: 'loop',
    loopData: {
      machine: '**deep research agents:** ai reads millions of papers to generate hypotheses humans cannot conceive. from "literature review" to "hypothesis generation."\n\n**generative biology:** moving from "reading" biology to "writing" it. alphafold 3 predicts protein structures; next step is **designing** new proteins, materials, and molecules that don\'t exist in nature.\n\n**data limits - the exhaustion:** quality human-generated data **exhausted by 2026-2028**. models now train on **ai-generated synthetic data**, verified by system 2 reasoning.',
      human: '**the time refund:** scientists freed from tedious manual labor (literature review, data cleaning) to focus on high-level experimental design and cross-domain synthesis.\n\n**data inbreeding crisis:** without fresh human data, ai degrades. **humans become the only source of novelty** - the "organic data" that prevents model collapse. human creativity is now a strategic resource.\n\n**the hope/fear axis:** hope for longevity breakthroughs and disease cures vs fear of losing control over scientific truth and safety protocols.',
      gap: 'ai proposes 1,000 molecules; we test one. discovery bloat stalls breakthroughs via physical testing capacity. the bottleneck of "generated future."',
    },
    sources: [
      { label: 'Dario Amodei — Machines of Loving Grace', url: 'https://darioamodei.com/machines-of-loving-grace' },
      { label: 'Epoch AI — Data Exhaustion Timeline', url: 'https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data' },
      { label: 'Gretel — Synthetic Data Goes Mainstream', url: 'https://gretel.ai/blog/2025-the-year-synthetic-data-goes-mainstream' },
      { label: 'Shumailov et al. — Model Collapse', url: 'https://arxiv.org/abs/2305.17493' },
    ],
  },
  // SHIFT 06: Discovery — EVIDENCE
  {
    id: 108,
    title: 'the discovery: the evidence',
    visual: 'trust',
    layout: 'loop-evidence',
    loopNumber: 6,
    evidenceData: {
      keyStats: [
        { value: '100 → 10', label: 'Scientific progress compression timeline (years)', source: 'Dario Amodei' },
        { value: '78%', label: 'Improvement in research speed with AI tools', source: 'StackOverflow' },
        { value: '2026-2028', label: 'Human data exhaustion timeline', source: 'Epoch AI' },
      ],
      researchHighlights: [
        'AlphaFold 3 predicts protein structures - next step is **designing** new proteins that don\'t exist in nature',
        'Models now train on **AI-generated synthetic data**, verified by System 2 reasoning',
        '**Model Collapse** (Shumailov et al.): if AI trains on AI-generated data recursively, models degrade - humans become only source of "clean signal"',
        '1,000:1 ratio: AI proposes 1,000 molecules; humans test one - the verification bottleneck',
      ],
      industryData: ['DeepMind AlphaFold', 'Deep Research Agents', 'Synthetic Data', 'World Labs'],
    },
    sources: [
      { label: 'Dario Amodei — Machines of Loving Grace', url: 'https://darioamodei.com/machines-of-loving-grace' },
      { label: 'Epoch AI — Data Limits', url: 'https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data' },
      { label: 'Gretel — Synthetic Data', url: 'https://gretel.ai/blog/2025-the-year-synthetic-data-goes-mainstream' },
      { label: 'Shumailov et al. — Model Collapse', url: 'https://arxiv.org/abs/2305.17493' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 🛡️ INTERFACE LAYER — Coding, Matter, Defense
  // ═══════════════════════════════════════════════════════════════════

  // TRANSITION Cognition → Interface
  {
    id: 206,
    title: 'layer transition: cognition → interface',
    subtitle: 'when ai can think and discover, it starts to build.',
    visual: 'bridge',
    layout: 'center',
    dark: true,
    content: [
      'with reasoning, knowledge access, and discovery capabilities, ai moves from **abstract intelligence to practical execution**.',
      '',
      'the question shifts from "can it think?" to **"can it ship?"**',
      'interface becomes the battleground.',
    ],
  },

  // SHIFT 07: The Craft (The End of Syntax) — INTRO
  {
    id: 16,
    title: 'shift 07: the craft (the end of syntax)',
    subtitle: 'from writing code to architecting intent',
    visual: 'centaur',
    layout: 'loop-intro',
  },
  // SHIFT 07: The Craft (The End of Syntax) — FULL
  {
    id: 17,
    title: 'shift 07: the craft (the end of syntax)',
    subtitle: 'from syntax mastery → vibe coding (and the integrity crisis)',
    visual: 'centaur',
    layout: 'loop',
    loopData: {
      machine: '**code as commodity:** **65% of new code** is ai-influenced or ai-generated at companies like google. **73% of developers** use ai coding tools regularly.\n\n**amazon q developer:** saved **4,500 developer-years** on java application upgrades. **$260m** in infrastructure savings from optimized code. **79% of auto-generated changes** accepted without modification.\n\n**vibe coding:** programming shifts to natural language intent. the machine handles implementation. coding tools (cursor, replit) enter **top 100 gen ai apps** consumer ranking - coding becomes mass-market.',
      human: '**the trust collapse:** **46% of developers** distrust ai-generated code. only **3.1% highly trust** ai accuracy for complex tasks. the **trust inversion**: 84% use the tools, but trust is plummeting.\n\n**the integrity crisis:** **65% report ai misses context** in code generation. "code generation is easy, code integrity is hard." ai creates "legacy on day one" - code that works but is unmaintainable.\n\n**code churn explosion:** **50% increase** in code churn (rewrites and deletions). ai produces code fast, but developers spend saved time on reviews and fixes.',
      gap: 'building things we don\'t understand leads to vibe debt. we pilot ships with black-box internal wiring. creating code is easy; maintaining it is the new hell.',
    },
    sources: [
      { label: 'Amazon — Amazon Q Developer', url: 'https://aws.amazon.com/q/developer/' },
      { label: 'StackOverflow — 2025 Developer Survey', url: 'https://survey.stackoverflow.co/2025/ai' },
      { label: 'Qodo — Code Integrity Report', url: 'https://www.qodo.ai/' },
      { label: 'GitClear — Code Churn Analysis', url: 'https://www.gitclear.com/coding_on_copilot_data_2024_report' },
    ],
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
    id: 205,
    title: 'how this enables the next shift',
    subtitle: 'when AI is everywhere, relationships become possible.',
    visual: 'bridge',
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
    id: 207,
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

  // Lab Evidence & Credibility (moved to end)
  {
    id: 43,
    title: '11 / lab evidence & credibility',
    subtitle: 'hardened by the field notes of 1,500+ lab participants.',
    visual: 'STATS_ANIMATED',
    layout: 'stats',
    stats: [
      { value: '1,500+', label: 'lab participants', color: 'red' },
      { value: '72+', label: 'primary sources', color: 'black' },
      { value: '8', label: 'deep interviews', color: 'black' },
      { value: '12', label: 'academic papers', color: 'red' },
      { value: '25+', label: 'industry reports', color: 'black' },
    ],
    content: [
      'this report is hardened by the field notes and artifacts of our research:',
      '**ivanov.aimindset.org** — protecting the psyche in the age of machine intimacy.',
      '**intention.aimindset.org** — managing attention when context explodes.',
      '**spiridonov.aimindset.org** — why pragmatic romanticism is the only defense against cold machine logic.',
    ],
    source: { label: 'AI Mindset Labs', url: 'https://aimindset.org/ai-mindset-w25' },
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
];

// Helper to get base asset path for deployment
export const assetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
};
