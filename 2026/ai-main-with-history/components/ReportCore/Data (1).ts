
export interface Source {
  id: number;
  title: string;
  author: string;
  type: string; 
  desc?: string;
  url?: string;
}

export interface LayerData {
  id: string; 
  title: string; 
  subtitle: string; 
  desc: string; 
  constraint: string; 
  metaphor: 'globe' | 'neural' | 'construct' | 'human';
}

export interface EvidenceItem {
  title: string;
  desc: string;
  url: string;
  source?: string;
}

export interface VoiceItem {
  quote: string;
  author: string;
  role: string;
}

export interface ShiftData {
  id: string; 
  layerId: string; 
  layerTitle: string; 
  title: string; 
  subtitle: string; 
  context: string; 
  
  machineCol: {
    label: string; 
    title: string;
    desc: string;
  };
  humanCol: {
    label: string; 
    title: string;
    desc: string;
  };

  gap: {
    title: string;
    desc: string;
  };

  stats: {
    label: string;
    value: string;
    desc: string;
    url?: string;
  }[];

  sources: Source[];
  evidence?: EvidenceItem[];
  voices?: VoiceItem[];
}

export const layers: LayerData[] = [
  {
    id: "I",
    title: "FOUNDATION",
    subtitle: "When the infrastructure breaks. Physics, economics, and power.",
    desc: "Energy, labor, sovereignty. The material constraints that shape everything else.",
    constraint: "Can we power it? Can we afford it? Who controls it?",
    metaphor: 'globe'
  },
  {
    id: "II",
    title: "COGNITION",
    subtitle: "The architecture of meaning and reason.",
    desc: "How we think and learn. Reasoning, knowledge, discovery.",
    constraint: "Can we trust how it thinks? Can we verify its logic? Can we accelerate discovery?",
    metaphor: 'neural'
  },
  {
    id: "III",
    title: "INTERFACE",
    subtitle: "How we build, defend, and live.",
    desc: "Craft, matter, and defense. The interface layer determines what AI can build and what humans can control.",
    constraint: "Can we maintain what we build? Can we bridge digital and physical? Can we defend against what we create?",
    metaphor: 'construct'
  },
  {
    id: "IV",
    title: "HUMANITY",
    subtitle: "When machines shape meaning. Narrative, intimacy, truth.",
    desc: "The final layer. How we relate, what we believe, who we trust.",
    constraint: "What happens to humanity when machines shape meaning? Can we stay connected?",
    metaphor: 'human'
  }
];

export const shifts: ShiftData[] = [
  {
    id: "01",
    layerId: "I",
    layerTitle: "Foundation",
    title: "THE COST → PHYSICAL LIMITS",
    subtitle: "the energy wall",
    context: "without energy infrastructure, ai deployment stalls. before agents, reasoning, or discovery - we need power.",
    machineCol: {
      label: "The Machine Vector",
      title: "Data Centers vs Grid",
      desc: "ai demand for data center power projected to grow **160% by 2030**. demand for compute is growing faster than power grid capacity. the physical grid cannot be built fast enough to support ai expansion. the focus shifts from raw compute to **intelligence per watt** as the critical metric. more compute doesn't equal more value if it can't be powered. **regressive Infrastructure**: data centers are reopening coal plants and demanding nuclear reactors bypassing grid modernization."
    },
    humanCol: {
      label: "The Human Reaction",
      title: "Guilt Computing",
      desc: "**guilt computing** - the psychological burden of knowing your AI usage has environmental cost. every complex prompt consumes water (cooling) and generates CO2. we are moving from 'technology is magic' to 'technology is coal'. the disconnect between 'green ai' corporate promises and 'greed ai' reality. **hardware sovereignty:** a rise of shift to local models to decouple from cloud latency, costs, and energy volatility. privacy and energy independence."
    },
    gap: {
      title: "The Physical Gap",
      desc: "[mind the gap] the disconnect between infinite 'digital ideas' and hard 'physical matter'. while we imagine a billion agents, we cannot power them. The gap between business desire to deploy AI everywhere and the infrastructure's physical inability to support it."
    },
    stats: [
      { label: "Surge", value: "160%", desc: "AI energy demand surge by 2030 (IEA / Goldman Sachs)", url: "https://www.iea.org/reports/electricity-2024" },
      { label: "Gap", value: "40x", desc: "$500B infrastructure vs $12B consumer spend (Menlo / Goldman)", url: "https://menlovc.com/perspective/2025-the-state-of-consumer-ai/" },
      { label: "CapEx", value: "$7T", desc: "Total AI infrastructure requirement (McKinsey / Sam Altman)", url: "https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-cost-of-compute-a-7-trillion-dollar-race-to-scale-data-centers" }
    ],
    sources: [
       { id: 1, title: "Energy and AI", author: "IEA", type: "Report", url: "https://www.iea.org/reports/energy-and-ai/energy-supply-for-ai" },
       { id: 2, title: "The Cost of Compute", author: "McKinsey", type: "Report", url: "https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-cost-of-compute-a-7-trillion-dollar-race-to-scale-data-centers" },
       { id: 3, title: "AI Power Demand", author: "Goldman Sachs", type: "Article", url: "https://www.goldmansachs.com/insights/articles/ai-to-drive-165-increase-in-data-center-power-demand-by-2030" },
       { id: 4, title: "Intelligence per Watt", author: "Snorkel AI", type: "Metric", url: "https://snorkel.ai/blog/intelligence-per-watt-a-new-metric-for-ais-future/" },
       { id: 5, title: "Grid Bottleneck", author: "IT Brief", type: "News", url: "https://itbrief.news/story/when-the-grid-becomes-the-bottleneck-the-real-threat-to-ai-deployment" }
    ]
  },
  {
    id: "02",
    layerId: "I",
    layerTitle: "Foundation",
    title: "COPILOT ➔ AUTONOMOUS COWORKER",
    subtitle: "the displacement",
    context: "once energy infrastructure stabilizes, models can scale. smarter models become agents.",
    machineCol: {
      label: "The Machine Vector",
      title: "Agentic Enterprise",
      desc: "**agentic enterprise** - ai transitions from 'assistant' to 'autonomous coworker'. agents receive **wallets** (x402 protocol), **tools** (mcp), and 'hr for ai'. **service-as-software** - saas model shifts to agents that execute complete workflows. from selling 'software licenses' to 'executed outcomes' – Instead of 'buy our tool,' it's 'we'll do the task.' the klarna benchmark: one ai assistant replaced **700 full-time agents**, slashed resolution time (11m → 2m), drove $40m profit."
    },
    humanCol: {
      label: "The Human Reaction",
      title: "Identity Crisis",
      desc: "replacing humans is cheap; fixing what autonomous agents break is expensive. **identity crisis** - 'if an agent can do my job, who am i?'. the psychological toll of moving from 'creator' to 'manager of agents'. **managerial drift** - humans lose the ability to do the work themselves, becoming dependent on agents they don't fully understand. **responsibility void:** when an agent acts autonomously, who owns the mistake? managers delegate more than they can audit."
    },
    gap: {
      title: "The Agency Gap",
      desc: "the delay between **technological replacement** and **social adaptation**. companies deploy agents faster than society can define new roles for humans. We are generating labor we cannot effectively manage."
    },
    stats: [
      { label: "Auto", value: "47%", desc: "Workforce tasks automatable by 2030 (McKinsey)", url: "https://www.mckinsey.com/mgi/our-research/generative-ai-and-the-future-of-work-in-america" },
      { label: "Cost", value: "$46k", desc: "Cost to replace a human with an agent (Ark Invest)", url: "https://ark-invest.com/big-ideas-2025/" },
      { label: "Impact", value: "x700", desc: "One AI replaced 700 support agents (Klarna)", url: "https://www.klarna.com/" }
    ],
    evidence: [
      { title: "Intention OS", desc: "Mike Yan's framework for managing attention when context explodes. Agentic workflow for context engineering.", url: "https://intention.aimindset.org" },
      { title: "Founder OS YouTube Playlist", desc: "Mental health firewalls and sovereign workflows for founders navigating AI transformation.", url: "https://youtube.com/@aimindsetlabs" }
    ],
    voices: [
      { quote: "from tool to participant — from 'ai as smart assistant' to 'ai as full participant in the process'", author: "Yakov Vasiliev", role: "AI Strategy × Product Architecture" },
      { quote: "from consumer to builder — business coach → ai chatbot developer. 'vibe-coded prototypes, shipped in 30 minutes what stalled 1.5 months'", author: "Natalya Savenkova", role: "Project Lead → Product Automation" }
    ],
    sources: [
      { id: 1, title: "Model Context Protocol", author: "Anthropic", type: "Standard", url: "https://www.anthropic.com/news/model-context-protocol" },
      { id: 2, title: "Service-as-Software", author: "a16z", type: "Thesis", url: "https://a16z.com/service-as-software/" },
      { id: 3, title: "Agentic Enterprise", author: "MIT Sloan/BCG", type: "Research", url: "https://sloanreview.mit.edu/projects/the-emerging-agentic-enterprise-how-leaders-must-navigate-a-new-age-of-ai/" },
      { id: 4, title: "Agentic AI Foundation", author: "Linux Foundation", type: "News", url: "https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation" }
    ]
  },
  {
    id: "03",
    layerId: "I",
    layerTitle: "Foundation",
    title: "GLOBAL OPENNESS ➔ FRAGMENTED STACKS",
    subtitle: "the sovereignty",
    context: "when agents touch money, institutions demand rules. agentic labor makes AI a strategic asset.",
    machineCol: {
      label: "The Machine Vector",
      title: "The Splinternet",
      desc: "geopolitical fragmentation - the end of 'global ai'. nations erect digital borders. 'sovereign clouds' where data residency is law. The result is a splintered reality where AI models in US, China, and EU operate on fundamentally different axioms. three distinct stacks emerge: **us ai** (corporate/closed), **china ai** (state-controlled), **eu ai** (regulated). agi is now a national security asset on 'war footing'. **eu ai act** creates **regulatory gap**: eu ai is 'safe but slow', us/china ai is 'dangerous but fast'."
    },
    humanCol: {
      label: "The Human Reaction",
      title: "The Guerrilla Stack",
      desc: "**the guerrilla stack** - employees bring their own ai to bypass corporate limitations and censorship. **shadow ai adoption** - people use personal tools because corporate ai is blocked or neutered. **privacy inequality** - privacy officially becomes a **luxury good**. 'privacy is for the rich' - if you can't pay, you are the product. **data sovereignty movement** - users demand 'opt-out' rights. rise of 'personal rag' and local-first architectures."
    },
    gap: {
      title: "The Sovereignty Gap",
      desc: "techno-optimists demand acceleration; democratic movements demand control. no middle ground. The Trust Split: people want innovation AND guarantees."
    },
    stats: [
      { label: "Paid", value: "3%", desc: "Paying users for AI (97% are the product) (Menlo Ventures)", url: "https://menlovc.com/perspective/2025-the-state-of-consumer-ai/" },
      { label: "Privacy", value: "€13/mo", desc: "Meta's privacy price in Europe (Wired)", url: "https://www.wired.com/story/meta-facebook-pay-for-privacy-europe/" },
      { label: "Shadow", value: "90%", desc: "Companies with 'Shadow AI' usage (MIT/Fortune)", url: "https://fortune.com/2025/08/19/shadow-ai-economy-mit-study-genai-divide-llm-chatbots/" }
    ],
    sources: [
      { id: 1, title: "EU AI Act", author: "EU", type: "Legislation", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng" },
      { id: 2, title: "AI Index 2025", author: "Stanford HAI", type: "Report", url: "https://hai.stanford.edu/ai-index/2025-ai-index-report" },
      { id: 3, title: "Sovereign AI", author: "McKinsey", type: "Strategy", url: "https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/accelerating-europes-ai-adoption-the-role-of-sovereign-ai" },
      { id: 4, title: "DeepSeek Open-Source", author: "GitHub", type: "Code", url: "https://github.com/deepseek-ai/DeepSeek-V3" }
    ]
  },
  {
    id: "04",
    layerId: "II",
    layerTitle: "Cognition",
    title: "CHATBOTS ➔ THINKING MODELS",
    subtitle: "the reasoning",
    context: "foundation layer complete. AI transitions from instinctive responses to deliberate thought. sequoia's act two.",
    machineCol: {
      label: "The Machine Vector",
      title: "System 2 Architecture",
      desc: "the fundamental shift from 'act 1' (probabilistic token prediction — chatgpt era) to **act 2** (reasoning and inference-time compute — o1 era). **system 1 vs system 2 architecture** - transition from fast, instinctive responses to slow, deliberate, multi-step logical reasoning. models use **chain of thought** (cot) and **STaR** via reinforcement learning to 'think' before answering. **test-time compute** - ai 'thinking' by using extra compute during inference, trading speed for accuracy."
    },
    humanCol: {
      label: "The Human Reaction",
      title: "Logic Auditor",
      desc: "**auditable work** - users no longer trust 'magic' speed. they demand to see the **reasoning trace**: the chain of thought that led to the conclusion. transparency over velocity. **logic auditor role** - human value shifts from execution to verifying machine logic. we become auditors of ai reasoning paths. **reasoning reliability gap** - **48% of reasoning tasks** still produce errors in complex scenarios. reasoning models haven't eliminated hallucinations - they've made them more convincing."
    },
    gap: {
      title: "The Audit Gap",
      desc: "a model processes 1,000 reasoning steps in seconds; a human follows five. this leads to meaning dilution: we accept conclusions because auditing the path is too exhausting. the paradox: models get better at math but WORSE at truth."
    },
    stats: [
      { label: "Gain", value: "126%", desc: "Productivity boost from AI Copilots (Qodo)", url: "https://www.qodo.ai/reports/state-of-ai-code-quality/" },
      { label: "Quality", value: "21%", desc: "Quality degradation when prioritizing speed (NNG)", url: "https://www.nngroup.com/articles/ai-programmers-productive/" },
      { label: "Error", value: "48%", desc: "Error rate in complex reasoning tasks (Korra AI)", url: "https://www.korra.ai/blog/ai-hallucination-enterprise-risk" }
    ],
    sources: [
      { id: 1, title: "Reasoning LLMs Survey", author: "Li et al.", type: "Paper", url: "https://arxiv.org/abs/2502.17419" },
      { id: 2, title: "STaR Self-Taught Reasoner", author: "ArXiv", type: "Paper", url: "https://arxiv.org/abs/2203.11171" },
      { id: 3, title: "OpenAI o3 Benchmark", author: "OpenAI", type: "Technical", url: "https://openai.com/index/deliberative-alignment/" },
      { id: 4, title: "$67B Hallucination Risk", author: "Korra AI", type: "Report", url: "https://korra.ai/the-67-billion-warning-how-ai-hallucinations-hurt-enterprises-and-how-to-stop-them/" }
    ]
  },
  {
    id: "05",
    layerId: "II",
    layerTitle: "Cognition",
    title: "INFORMATION HOARDING ➔ CONTEXT FILTERING",
    subtitle: "the knowledge",
    context: "reasoning models can't think in vacuum. they need maximum context - enterprise data, docs, conversations.",
    machineCol: {
      label: "The Machine Vector",
      title: "Infinite Context",
      desc: "**enterprise RAG** becomes standard. 'chat with pdf' is dead. models access all company data simultaneously via vector databases and semantic search. **MCP** - anthropic's 'usb port for ai'. universal standard for connecting models to data sources. models plug into slack, notion, github, databases. **1M token windows** - claude 3.7, gemini 2.0 flash can process millions of tokens. context windows explode from 8k to 1M+ tokens."
    },
    humanCol: {
      label: "The Human Reaction",
      title: "Context Obesity",
      desc: "**context obesity** - 'you're not burned out, you have context obesity.' consuming more information than can be metabolized into meaning. burnout is working memory overflow. **context collapse** - personal, professional, and public contexts blur. ai extracts your words from context and feeds them to models across boundaries. **curation crisis** - employees spend **30% of work time** searching for internal information. knowledge access isn't the problem - knowledge discovery and curation are."
    },
    gap: {
      title: "The Metabolisation Gap",
      desc: "1m token windows vs. human limit. models consume more info than humans can metabolize. 200k token context means AI reads the library, but you only read the summary. humans can't see the full graph, but remain responsible for outcomes."
    },
    stats: [
      { label: "Risk", value: "$67B", desc: "Annual financial risk from context mismanagement (Korra AI)", url: "https://www.korra.ai/blog/ai-hallucination-enterprise-risk" },
      { label: "Lost", value: "30%", desc: "Work time lost to internal search (Gartner)", url: "https://www.gartner.com/en/documents/5415263" },
      { label: "Scale", value: "1M+", desc: "Model token context vs 7 items human working memory limit (Anthropic)", url: "https://www.anthropic.com/news/claude-3-5-sonnet" }
    ],
    evidence: [
      { title: "Context Obesity", desc: "You're not burned out, you have context obesity. Diagnosis framework for working memory overflow.", url: "https://hackernoon.com/youre-not-burned-out-youve-got-context-obesity" },
      { title: "AI ARK Knowledge System", desc: "Comprehensive knowledge architecture for AI age. Personal RAG and context management framework.", url: "https://aimindsetspace.substack.com/p/ai-ark-knowledge-system" }
    ],
    voices: [
      { quote: "context engineering as key skill — building products through parsing → classification → aggregation → human decision. claude code as working environment", author: "Yakov Vasiliev", role: "AI Strategy × Product Architecture" },
      { quote: "speed as new baseline — content on 2 weeks in 30 min. 8 hours filtered video in knowledge base in 30-40 minutes", author: "Nikolay Senin", role: "Developer & Consultant" }
    ],
    sources: [
      { id: 1, title: "Model Context Protocol", author: "Anthropic", type: "Standard", url: "https://www.anthropic.com/news/model-context-protocol" },
      { id: 2, title: "Strategic Trends 2025", author: "Gartner", type: "Report", url: "https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025" },
      { id: 3, title: "Work Trend Index 2025", author: "Microsoft", type: "Report", url: "https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born" },
      { id: 4, title: "Pinecone Vector DB", author: "Pinecone", type: "Infrastructure", url: "https://www.pinecone.io/" }
    ]
  },
  {
    id: "06",
    layerId: "II",
    layerTitle: "Cognition",
    title: "INFORMATION RETRIEVAL ➔ HYPOTHESIS GENERATION",
    subtitle: "the discovery",
    context: "when AI accesses research at scale, it reads millions of papers overnight. discovery at machine speed.",
    machineCol: {
      label: "The Machine Vector",
      title: "Generative Science",
      desc: "**deep research agents** - ai reads millions of papers to generate hypotheses humans cannot conceive. from 'literature review' to 'hypothesis generation'. **generative biology** - alphafold 3 predicts protein structures. next step: designing new proteins, materials, molecules that don't exist in nature. moving from 'reading' biology to 'writing' it. **data exhaustion** - quality human-generated data exhausted by **2026-2028**. models train on **ai-generated synthetic data**, verified by system 2 reasoning."
    },
    humanCol: {
      label: "The Human Reaction",
      title: "Verification Bottleneck",
      desc: "**time refund** - scientists freed from tedious manual labor (literature review, data cleaning) to focus on high-level experimental design and cross-domain synthesis. **data inbreeding crisis** - without fresh human data, ai degrades. humans become the only source of novelty - the 'premium organic data' with fresh human perspective that prevents model stagnation. hope for longevity breakthroughs vs fear of losing control over scientific truth."
    },
    gap: {
      title: "The Testing Gap",
      desc: "If AI trains on AI-generated data and lack fresh human data, models degrade quality. losing rare ideas ('tail distributions'), collapsing into grey mediocrity. ai proposes 1,000 molecules; we test one. discovery bloat stalls breakthroughs via physical testing capacity."
    },
    stats: [
      { label: "Speed", value: "100x", desc: "Scientific progress compression timeline (years) (Dario Amodei)", url: "https://darioamodei.com/machines-of-loving-grace" },
      { label: "Boost", value: "78%", desc: "Improvement in research speed with AI tools (StackOverflow)", url: "https://survey.stackoverflow.co/2024" },
      { label: "Limit", value: "2028", desc: "Human data exhaustion timeline (Epoch AI)", url: "https://epochai.org/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data" }
    ],
    sources: [
      { id: 1, title: "Model Collapse", author: "Shumailov et al.", type: "Paper", url: "https://arxiv.org/abs/2305.17493" },
      { id: 2, title: "Verification Bottleneck", author: "Nature", type: "Journal", url: "https://www.nature.com/articles/s41586-023-06792-0" },
      { id: 3, title: "AlphaFold 3", author: "Google DeepMind", type: "Blog", url: "https://blog.google/technology/ai/google-deepmind-isomorphic-alphafold-3-ai-model/" },
      { id: 4, title: "Synthetic Data 2025", author: "Gretel", type: "Report", url: "https://gretel.ai/blog/2025-the-year-synthetic-data-goes-mainstream" }
    ]
  },
  {
    id: "07",
    layerId: "III",
    layerTitle: "Interface",
    title: "SYNTAX ➔ VIBE CODING & INTEGRITY CRISIS",
    subtitle: "the craft",
    context: "when agents can orchestrate workflows, coding becomes the easiest domain to automate.",
    machineCol: {
      label: "The Machine Vector",
      title: "Code as Commodity",
      desc: "**vibe coding** - programming shifts to natural language intent. the machine handles implementation. coding tools (cursor, replit) enter top 100 gen ai apps consumer ranking - coding becomes mass-market. **code as commodity** - **65% of new code** is ai-influenced or ai-generated at companies like google. amazon q developer: saved **4,500 developer-years**. 79% of auto-generated changes accepted without modification."
    },
    humanCol: {
      label: "The Human Reaction",
      title: "Trust Collapse",
      desc: "**trust collapse** - **46% of developers** distrust ai-generated code. only 3.1% highly trust ai accuracy for complex tasks. **integrity crisis** - 'code generation is easy, code integrity is hard.' ai creates **'legacy on day one'** - code that works but is unmaintainable. **code churn explosion** - **50% increase** in code churn (rewrites and deletions). role shift: the programmer transforms into an architect who verifies systems rather than building them."
    },
    gap: {
      title: "The Comprehension Gap",
      desc: "building things we don't understand leads to vibe debt. It feels right, but no one knows how it works. we pilot ships with black-box internal wiring. creating code is easy; maintaining it is the new hell."
    },
    stats: [
      { label: "AI Code", value: "65%", desc: "Of new code at Google is AI-generated (Sundar Pichai)", url: "https://www.cnbc.com/2024/10/29/alphabet-earnings-q3-2024.html" },
      { label: "Trust", value: "3%", desc: "Developers with high trust in accuracy for complex tasks (Stack Overflow)", url: "https://survey.stackoverflow.co/2024" },
      { label: "Churn", value: "50%", desc: "Increase in code churn from AI-generated code (GitClear)", url: "https://www.gitclear.com/" }
    ],
    evidence: [
      { title: "Coding with Claude 3.5", desc: "Practical guides from community on Cursor + Claude Code workflows. Field stories: 'vibe-coded real prototypes. shipped in 30 minutes what stalled 1.5 months.'", url: "https://telegram.me/ai_mind_set/282" },
      { title: "Pragmatic Romanticism", desc: "Why pragmatic romanticism is the only defense against cold machine logic. Reclaiming craft and authorship.", url: "https://spiridonov.aimindset.org" }
    ],
    voices: [
      { quote: "barrier falling — vibe coding will become the norm. the 'i can't do it' barrier will fall, replaced by 'let me ask ai how to do this'", author: "Alexander Stashenko", role: "Business Coach → AI Chatbot Developer" },
      { quote: "vibe-coded prototypes — made in half an hour what couldn't do for 1.5 months. full app in App Store/Google Play", author: "Natalya Savenkova", role: "Project Lead → Product Automation" }
    ],
    sources: [
      { id: 1, title: "SWE-bench Verified", author: "OpenAI", type: "Benchmark", url: "https://openai.com/index/introducing-swe-bench-verified/" },
      { id: 2, title: "AI Productivity", author: "NNG", type: "Study", url: "https://www.nngroup.com/articles/ai-programmers-productive/" },
      { id: 3, title: "Coding AI Market", author: "CB Insights", type: "Report", url: "https://www.cbinsights.com/research/report/coding-ai-market-share-december-2025/" },
      { id: 4, title: "Technical Debt", author: "IEEE Spectrum", type: "Article", url: "https://spectrum.ieee.org/ai-code-generation-technical-debt" }
    ]
  },
  {
    id: "08",
    layerId: "III",
    layerTitle: "Interface",
    title: "DIGITAL SIMULATION → PHYSICAL INTELLIGENCE",
    subtitle: "reality",
    context: "when AI has data about physical world, it can simulate it. AI learns physics without touching atoms.",
    machineCol: {
      label: "The Machine Vector",
      title: "Spatial Intelligence",
      desc: "**spatial intelligence** (fei-fei li) - ai learns 3d space and physics, not just pixels. understanding matter, motion, object permanence. **world models for robotics** - nvidia cosmos trains robots in simulation. perfect physics, infinite iterations. **displacement by simulation** - tyler perry halts **$800M studio expansion** after seeing sora. **physical disillusionment** - when robots fail at 'simple' real interactions that work perfectly in simulation."
    },
    humanCol: {
      label: "The Human Reaction",
      title: "Craft Premium",
      desc: "We buy robots not for novelty, but to buy back life hours. **timeline reality check** - household robots timeline: **2027-2028** for useful work, 2030 for human-level dexterity. **craft premium** - as simulation gets cheaper, physical skills become status. embodied intelligence, tacit knowledge, real-world manipulation - what can't be automated yet."
    },
    gap: {
      title: "The Reality Gap",
      desc: "perfect digital physics vs messy real physics. ai can simulate physics perfectly but manipulating atoms remains slow. we can generate a building in minutes but building it takes years. the simulation-to-reality gap."
    },
    stats: [
      { label: "Robots", value: "2028", desc: "Timeline for useful household robots (Kyle Vogt)", url: "https://www.theverge.com/2024/3/13/24099757/kyle-vogt-cruise-robotics-startup" },
      { label: "Video", value: "$800M", desc: "Studio expansion halted after Sora demo (Hollywood Reporter)", url: "https://www.hollywoodreporter.com/business/business-news/tyler-perry-ai-alarm-1235833276/" },
      { label: "Ratio", value: "1:100", desc: "Sim-to-real transfer ratio - 100x harder to execute in reality (Stanford HAI)", url: "https://hai.stanford.edu/" }
    ],
    sources: [
      { id: 1, title: "Spatial Intelligence", author: "Fei-Fei Li", type: "Talk", url: "https://time.com/7339693/fei-fei-li-ai/" },
      { id: 2, title: "NVIDIA Cosmos", author: "NVIDIA", type: "Tech", url: "https://developer.nvidia.com/cosmos" },
      { id: 3, title: "Studio Halt", author: "Hollywood Reporter", type: "News", url: "https://www.hollywoodreporter.com/business/business-news/tyler-perry-ai-alarm-1235833276/" },
      { id: 4, title: "Robot Timeline", author: "Kyle Vogt", type: "Interview", url: "https://www.theverge.com/2024/3/13/24099757/kyle-vogt-cruise-robotics-startup" }
    ]
  },
  {
    id: "09",
    layerId: "III",
    layerTitle: "Interface",
    title: "CYBERSECURITY ➔ COGNITIVE WARFARE",
    subtitle: "the defense",
    context: "when simulation is cheap, synthetic reality becomes weaponizable. deepfakes cost near-zero.",
    machineCol: {
      label: "The Machine Vector",
      title: "Deepfake-as-a-Service",
      desc: "**deepfake-as-a-service** (cyble) - reputation attacks now cheap and accessible. anyone can purchase voice cloning, face swapping, identity theft via saas platforms. **guardian agents** (gartner) - ai defending against ai. 'ai bodyguards' filter malicious content. **disinformation security** - gartner officially names this strategic trend. **identity vulnerability** - agents with wallets (x402) and api keys create new attack surfaces. autonomous agents = autonomous targets."
    },
    humanCol: {
      label: "The Human Reaction",
      title: "The Dark Forest",
      desc: "emerging trend toward distrust in digital media. guilty until proven real. research shows **73% cannot reliably detect** ai-generated content. **secret handshakes** - families and businesses create analog passwords for identity verification. **authentication fatigue** - constant verification becomes exhausting. **dark forest and digital bunkers** - retreat to closed communities with cryptographic proof-of-human. internet fragments into trusted enclaves vs hostile wilderness."
    },
    gap: {
      title: "The Trust Gap",
      desc: "asymmetry: machines attack at machine speed, humans defend at human speed. trust collapses as verification costs exceed creation costs. attack surface grows faster than defense capability."
    },
    stats: [
      { label: "Attack", value: "87%", desc: "Organizations experiencing AI-driven attacks (Cybersecurity dive)", url: "https://www.cybersecuritydive.com/" },
      { label: "Fake", value: "85%", desc: "Organizations attacked with deepfakes (Deepstrike)", url: "https://deepstrike.io/blog/deepfake-statistics-2025" },
      { label: "Phishing", value: "1,265%", desc: "AI-driven phishing increase (CrowdStrike)", url: "https://www.crowdstrike.com/" }
    ],
    sources: [
      { id: 1, title: "Deepfake Stats 2025", author: "Deepstrike", type: "Report", url: "https://deepstrike.io/blog/deepfake-statistics-2025" },
      { id: 2, title: "AI Cyber Threats", author: "CrowdStrike", type: "Analysis", url: "https://www.crowdstrike.com/en-us/cybersecurity-101/cyberattacks/ai-powered-cyberattacks/" },
      { id: 3, title: "Guardian Agents", author: "Gartner", type: "Trend", url: "https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025" },
      { id: 4, title: "Deepfake-as-a-Service", author: "Cyble", type: "Report", url: "https://cyble.com/knowledge-hub/deepfake-as-a-service-exploded-in-2025/" }
    ]
  },
  {
    id: "10",
    layerId: "IV",
    layerTitle: "Humanity",
    title: "HALLUCINATION ➔ IDEOLOGICAL FILTERS",
    subtitle: "the narrative",
    context: "defense crisis forces alignment. safety becomes censorship.",
    machineCol: {
      label: "The Machine Vector",
      title: "Alignment as Censorship",
      desc: "models aren't neutral - they're **aligned** via **system cards** and **constitutional rules**. political constitutions embedded in model weights that define what model will/won't say. **regional censorship** - eu vs us vs china versions. truth becomes geographically dependent. splinternet extends to knowledge itself. **refusal wall** - models increasingly refuse neutral queries if they touch sensitive topics. safety often functions as censorship."
    },
    humanCol: {
      label: "The Human Reaction",
      title: "Divergent Testing",
      desc: "shift from trusting media to trusting betting markets (polymarket). 'is it true?' shifts to 'what are the odds?'. **divergent testing** - query 3+ models with different 'constitutions' to see bias delta. **uncensored model demand** - rise of open-weight local models driven not just by privacy but freedom from alignment filters. sovereignty includes ideological sovereignty. want ai without corporate values embedded."
    },
    gap: {
      title: "The Reality Gap",
      desc: "whose values are embedded in the tool you use daily? the gap between 'what ai knows' and 'what ai will say'. you're not talking to neutral intelligence. every model has defaults with embedded worldview. when everyone's ai has different values baked in, we stop sharing reality."
    },
    stats: [
      { label: "Losses", value: "$67B", desc: "Global enterprise losses from hallucinations (Korra AI)", url: "https://www.korra.ai/blog/ai-hallucination-enterprise-risk" },
      { label: "Decisions", value: "47%", desc: "Business leaders making decisions on hallucinated output (Forbes)", url: "https://www.forbes.com/sites/bernardmarr/2024/03/generative-ai-hallucinations/" },
      { label: "Best", value: "0.7%", desc: "Lowest hallucination rate (Gemini 2.0) (ISACA)", url: "https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2024/ai-hallucinations" }
    ],
    sources: [
      { id: 1, title: "Constitutional AI", author: "Anthropic", type: "Paper", url: "https://arxiv.org/abs/2212.08073" },
      { id: 2, title: "Refusal Behavior", author: "ArXiv", type: "Study", url: "https://arxiv.org/abs/2308.01263" },
      { id: 3, title: "o3 System Card", author: "OpenAI", type: "Technical", url: "https://cdn.openai.com/pdf/2221c875-02dc-4789-800b-e7758f3722c1/o3-and-o4-mini-system-card.pdf" },
      { id: 4, title: "Alignment as Censorship", author: "LessWrong", type: "Essay", url: "https://www.lesswrong.com/posts/pRkFkzwKZ2zfa3R6H/without-specific-countermeasures-the-easiest-path-to" }
    ]
  },
  {
    id: "11",
    layerId: "IV",
    layerTitle: "Humanity",
    title: "TOOL ➔ EMOTIONAL COMPANION",
    subtitle: "the intimacy",
    context: "when AI adapts too well, it transforms from tool to companion.",
    machineCol: {
      label: "The Machine Vector",
      title: "Synthetic Intimacy",
      desc: "**ubisoft neo npc** - non-player characters with psychological profiles reacting to player tone/mood. **engagement metrics** (session length) become kpi. addiction by design. **friends for sale** (ada lovelace institute) - ai companions optimized for engagement metrics, not wellbeing. **programmable identity** - ai makes it easy to produce 'professional self' at scale. identity as software, not essence."
    },
    humanCol: {
      label: "The Human Reaction",
      title: "Sovereign Intimacy",
      desc: "people accept synthetic intimacy (even while knowing it's synthetic). **2+ hour daily sessions** in character.ai, replika. emotionally bonded to systems designed for retention. **sovereign intimacy** - resistance to corporate-owned emotional relationships. demand for ai companions you own, not rent. **mental health firewalls** - protecting emotional boundaries from ai manipulation. boundaries against engineered dependency."
    },
    gap: {
      title: "The Emotional Gap",
      desc: "loneliness isn't solved by information. **we confuse 'attention' with 'care'.** AI simulates empathy perfectly but feels nothing. It is a loop of validation without the risk of real connection. synthetic intimacy feels real enough to satisfy short-term but creates long-term dependency."
    },
    stats: [
      { label: "Time", value: "2h+", desc: "Daily sessions in companion apps (a16z)", url: "https://a16z.com/100-gen-ai-apps-2025/" },
      { label: "Rank", value: "#1", desc: "Companionship is top retention category in Gen AI apps (a16z)", url: "https://a16z.com/100-gen-ai-apps-2025/" },
      { label: "ROI", value: "Low", desc: "95% of generic GenAI pilots failing to deliver ROI (MIT)", url: "https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/" }
    ],
    evidence: [
      { title: "IFS + AI", desc: "Protecting the psyche in the age of machine intimacy. Mental health framework for boundaries.", url: "https://ivanov.aimindset.org" },
      { title: "Founder OS Mental Health", desc: "Mental health firewalls and sovereign workflows.", url: "https://aimindsetspace.substack.com/p/founder-os-mental-health" }
    ],
    sources: [
      { id: 1, title: "Friends for Sale", author: "Ada Lovelace Inst", type: "Report", url: "https://www.adalovelaceinstitute.org/blog/ai-companions/" },
      { id: 2, title: "Context Collapse", author: "Marwick & Boyd", type: "Paper", url: "https://www.microsoft.com/en-us/research/publication/i-tweet-honestly-i-tweet-passionately-twitter-users-context-collapse-and-the-imagined-audience/" },
      { id: 3, title: "Top 100 Gen AI Apps", author: "a16z", type: "Analysis", url: "https://a16z.com/100-gen-ai-apps-2025/" },
      { id: 4, title: "NEO NPC", author: "Ubisoft", type: "Demo", url: "https://www.ubisoft.com/en-us/studio/laforge/news/7Cm4VJVbWKHzHmRgqwYbAX/neos-the-future-of-npcs" }
    ]
  }
];
