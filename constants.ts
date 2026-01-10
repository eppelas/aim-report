import { SlideData } from './types';

// Section definitions for Table of Contents
// Order: INTRO → TODAY → TOOLS → COWORKING → LAB → SESSIONS → DAILY → VOICES → ALEX P → WHAT'S NEXT → FINALE → THANK YOU
// Added 6 visual finale slides before THANK YOU
export const SECTIONS = [
  { title: 'INTRO', startSlide: 0 },           // slides 0-2 (3)
  { title: "TODAY'S SOLSTICE", startSlide: 3 }, // slides 3-7 (5)
  { title: 'TOOLS & RESOURCES', startSlide: 8 }, // slides 8-13 (6)
  { title: 'COWORKING TASKS', startSlide: 14 }, // slides 14-19 (6)
  { title: 'CONTEXT LAB', startSlide: 20 },     // slides 20-23 (4)
  { title: 'SESSIONS', startSlide: 24 },        // slides 24-39 (16)
  { title: '#CONTEXTDAILY', startSlide: 40 },   // slides 40-46 (7)
  { title: 'VOICES', startSlide: 47 },          // slides 47-57 (11)
  { title: 'ALEX P CASE', startSlide: 58 },     // slides 58-64 (7)
  { title: 'WHAT\'S NEXT', startSlide: 65 },    // slides 65-69 (5)
  { title: 'VISUAL FINALE', startSlide: 70 },   // slides 70-75 (6) - new alchemy metaphors
  { title: 'THANK YOU', startSlide: 76 },       // slides 76-79 (4)
];

const RAW_SLIDES: SlideData[] = [
  // ═══════════════════════════════════════════════════════════════════
  // BLOCK 1: INTRO (slides 0-2)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 1,
    title: "CONTEXT LAB",
    subtitle: "Winter Solstice 2025",
    visual: 'SOLSTICE_SUN',
    caption: "Dec 21 — The longest night becomes the brightest insight",
    layout: 'center'
  },
  {
    id: 2,
    title: "THE PAIN",
    subtitle: "Context Decay",
    visual: 'CONTEXT_CHAOS',
    caption: "Year ends. Context scatters. Insights fade into noise.",
    layout: 'split',
    content: [
      "Calendars full of events with no memory of meaning",
      "Chat histories buried under 10,000+ messages",
      "Voice notes never transcribed, never processed",
      "Photos without stories, data without insights",
      "Another year ending in fog instead of clarity"
    ]
  },
  {
    id: 3,
    title: "THE PROMISE",
    subtitle: "From Fog to Clarity",
    visual: 'FOUR_STAGES',
    caption: "Container → Dataset → Framework → Artifact",
    layout: 'split',
    content: [
      "Week 1: Social Design — create safe space for reflection",
      "Week 2: Data Collection — calendars, chats, voice, photos",
      "Week 3: Analysis Frameworks — Dilts, metrics, patterns",
      "Week 4: Materialization — poster, letter, system prompt"
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // BLOCK 2: TODAY'S SOLSTICE SESSION (slides 3-7)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 4,
    title: "SOLSTICE",
    subtitle: "Today's Session",
    visual: 'SECTION_DIVIDER',
    sectionTitle: "TODAY",
    caption: "Dec 21, 2025 — 15:03 UTC — ~3 hours together",
    layout: 'center'
  },
  {
    id: 5,
    title: "BLOCK 01",
    subtitle: "Opening + Breathwork",
    visual: 'BREATH',
    caption: "15:03-15:38 UTC — Dasha Cheng @badbuddhas",
    layout: 'split',
    content: [
      "5 min — Welcome + tech check",
      "30 min — Breathwork practice",
      "Transition from 'doing' mode to 'seeing' mode",
      "Set intention for reflection and closure"
    ]
  },
  {
    id: 6,
    title: "BLOCK 02",
    subtitle: "Festival / Coworking",
    visual: 'FOUR_STAGES',
    caption: "15:38-17:03 UTC — Choose your track",
    layout: 'split',
    content: [
      "TRACK A — Support: Export, transcribe, first prompt",
      "TRACK B — Tech: Obsidian + Cursor, MCP, workflows",
      "TRACK C — Creative: Year map, visual artifacts (Anca)",
      "40 min → break → 40 min"
    ]
  },
  {
    id: 7,
    title: "BLOCK 03",
    subtitle: "DEMO",
    visual: 'SPARKS',
    caption: "17:03-17:18 UTC — 30 seconds each",
    layout: 'split',
    content: [
      "Collective podcast format",
      "What you made / What you learned",
      "Quick flashes, no long presentations",
      "~50 people × 30 sec"
    ]
  },
  {
    id: 8,
    title: "BLOCK 04",
    subtitle: "Closing Ritual",
    visual: 'BURNING',
    caption: "17:18-17:48 UTC — Led by Alexey Melnichek @kontaktkanal",
    layout: 'split',
    content: [
      "What am I TAKING to 2026?",
      "What am I RELEASING from 2025?",
      "Write on paper → burn or tear",
      "Gratitude circle → exit on peak"
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // BLOCK 3: TOOLS & RESOURCES (moved up before COWORKING)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 45,
    title: "TOOLS",
    subtitle: "What We Used",
    visual: 'SECTION_DIVIDER',
    sectionTitle: "TOOLS",
    caption: "Stack for context processing",
    layout: 'center'
  },
  {
    id: 46,
    title: "TOOLS",
    subtitle: "Voice & Transcription",
    visual: 'TECH_GRID',
    caption: "Recommended by participants",
    layout: 'split',
    content: [
      "WisprFlow — best out-of-box Mac experience",
      "SuperWhisper — local, customizable modes",
      "MacWhisper — one-time purchase",
      "@bykvitsa — Telegram bot transcription",
      "Deepgram — $200 free API credits",
      "AssemblyAI — $50 free credits"
    ]
  },
  {
    id: 47,
    title: "TOOLS",
    subtitle: "AI & PKM",
    visual: 'OBSIDIAN_TREE',
    caption: "The lab stack",
    layout: 'split',
    content: [
      "Obsidian — Personal Knowledge Management",
      "Cursor — AI-assisted code & writing",
      "Claude Code — terminal-based Claude",
      "LM Studio — local AI models",
      "Granola — AI meeting notes",
      "KRISP — transcription & noise removal"
    ]
  },
  {
    id: 48,
    title: "RESOURCES",
    subtitle: "Links from Chat",
    visual: 'GAME_LOOP',
    caption: "Community shared resources",
    layout: 'split',
    links: [
      { label: "AI Mindset Knowledge Base", url: "https://base.aimindset.org/" },
      { label: "YouTube Channel", url: "https://youtube.com/@A-I-Mindset" },
      { label: "Mike Yan's Intention OS", url: "https://intention.aimindset.org/" },
      { label: "Cursor Workshop", url: "https://cursor-workshop.netlify.app/" },
      { label: "Purpose App by Mark Manson", url: "https://purpose.app/" }
    ]
  },
  {
    id: 49,
    title: "WHAT WORKED",
    subtitle: "Lab Wins",
    visual: 'CONTAINER_CIRCLE',
    caption: "Successes to repeat",
    layout: 'split',
    content: [
      "Safe container (Melnichek social design)",
      "Buddy system accountability",
      "AI-native approach throughout",
      "Practical artifacts over pure theory",
      "Mix of frameworks + technical depth",
      "Daily practice (#ContextDaily)"
    ]
  },
  {
    id: 50,
    title: "CHALLENGES",
    subtitle: "Growth Areas",
    visual: 'CONTEXT_CHAOS',
    caption: "What to improve next time",
    layout: 'split',
    content: [
      "Information density (перегруз)",
      "Tech ceiling (API, MCP scared some)",
      "Time zone challenges (18:00 CET / 20:00 MSK)",
      "VPN/Claude access issues",
      "Balancing depth vs accessibility"
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // BLOCK 4: COWORKING TASKS — Практики от Анки
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 9,
    title: "COWORKING",
    subtitle: "Практики для работы",
    visual: 'SECTION_DIVIDER',
    sectionTitle: "TASKS",
    caption: "4 основные задачи + 1 творческая",
    layout: 'center'
  },
  {
    id: 10,
    title: "ЗАДАЧА 1",
    subtitle: "Настроить хранение + собрать сырьё",
    visual: 'OBSIDIAN_TREE',
    caption: "Структура контекста",
    layout: 'split',
    content: [
      "Создать папку 'Context Lab 2025' в Obsidian",
      "Подпапки: 01-Сырьё, 02-Анализ, 03-Артефакты, 04-Рефлексия",
      "Экспортировать календарь, чаты, голосовые, фото",
      "Теги: #календарь #чаты #заметки #фото #инсайт"
    ]
  },
  {
    id: 11,
    title: "ЗАДАЧА 2",
    subtitle: "Пирамида Дилтса + анализ в AI",
    visual: 'DILTS_PYRAMID',
    caption: "6 уровней осознания",
    layout: 'split',
    content: [
      "Окружение — Где? Когда? С кем?",
      "Поведение — Что я буду делать?",
      "Способности — Как я это сделаю?",
      "Ценности — Почему это важно?",
      "Идентичность — Кто я?",
      "Миссия — Ради чего всё это?"
    ]
  },
  {
    id: 12,
    title: "ЗАДАЧА 3",
    subtitle: "Таймлайн жизни",
    visual: 'GAME_LOOP',
    caption: "Визуальная карта года",
    layout: 'split',
    content: [
      "Инструменты: Miro, FigJam, Obsidian Canvas, бумага",
      "Отметить ключевые события года",
      "Найти поворотные моменты",
      "Провести связи между событиями",
      "Добавить эмоции и состояния"
    ]
  },
  {
    id: 13,
    title: "ЗАДАЧА 4",
    subtitle: "Плакат с образом 2026",
    visual: 'CREATIVE_POSTER',
    caption: "Визуальная манифестация",
    layout: 'split',
    content: [
      "5 сигналов: творчество, суперсила, связи, место, вклад",
      "Выбрать стиль: ZEN, ROTHKO, GEOMETRIC, ORGANIC, COSMIC, GHIBLI",
      "Сгенерировать в Gemini / Fusara / Krea / Seedream",
      "Добавить слово/состояние на 2026",
      "Сохранить как обои или напечатать"
    ]
  },
  {
    id: 14,
    title: "ЗАДАЧА 5",
    subtitle: "Песня года или Krea Realtime",
    visual: 'CONTEXT_ALCHEMY',
    caption: "Творческий эксперимент (опционально)",
    layout: 'split',
    content: [
      "Вариант A: Создать песню года в Suno / Udio",
      "Попросить AI сделать промпт для песни",
      "Вариант B: Визуализация в Krea Realtime",
      "Рисовать одновременно с генерацией",
      "Сотворчество: вы + AI"
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // BLOCK 4: CONTEXT LAB OVERVIEW (slides 14-17)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 15,
    title: "CONTEXT LAB",
    subtitle: "Winter 2025",
    visual: 'SECTION_DIVIDER',
    sectionTitle: "THE LAB",
    caption: "3 weeks • 5 sessions • 100 participants",
    layout: 'center'
  },
  {
    id: 10,
    title: "LAB NUMBERS",
    subtitle: "Quantified Context",
    visual: 'STATS_ANIMATED',
    layout: 'stats',
    stats: [
      { value: 100, label: "participants", suffix: "+" },
      { value: 417, label: "messages in chat" },
      { value: 5, label: "live sessions" },
      { value: 13, label: "#ContextDaily posts" },
      { value: 8, label: "presentations deployed" },
      { value: 7, label: "buddy pairs formed" }
    ]
  },
  {
    id: 11,
    title: "ALL PRESENTATIONS",
    subtitle: "Built During the Lab",
    visual: 'OBSIDIAN_TREE',
    layout: 'split',
    links: [
      { label: "Session 1: Melnichek — Social Design", url: "https://w26-session1-melnichek.netlify.app/" },
      { label: "Session 2: Context Alchemy Game", url: "https://context-alchemy-game.netlify.app/" },
      { label: "Session 3: Anna — Dilts Pyramid", url: "https://anna-lozitskaya-w26.netlify.app/" },
      { label: "Session 4: Anka — Creative Track", url: "https://anka-session4-w26.netlify.app/" },
      { label: "AI Context OS (Alex P)", url: "https://ai-context-os-presentation.netlify.app/" },
      { label: "Seva's Cursor Stack", url: "https://seva-cursor-stack-deck.netlify.app/" },
      { label: "Life Timeline Dashboard", url: "https://life-timeline-dashboard.netlify.app/" },
      { label: "Context Lab Landing", url: "https://context.aimindset.org/" }
    ]
  },
  {
    id: 12,
    title: "CORE LOOP",
    subtitle: "How We Process Context",
    visual: 'GAME_LOOP',
    caption: "Capture → Normalize → Link → Output",
    layout: 'split',
    content: [
      "CAPTURE: Export calendars, chats, voice, photos",
      "NORMALIZE: Transcribe, format, clean",
      "LINK: Find patterns, connect contexts",
      "OUTPUT: Create artifact — poster, letter, prompt"
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // BLOCK 4: SESSIONS DEEP DIVE (slides 12-21)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 13,
    title: "SESSIONS",
    subtitle: "5 Live Sessions",
    visual: 'SECTION_DIVIDER',
    sectionTitle: "SESSIONS",
    caption: "Dec 8 — Dec 21",
    layout: 'center'
  },

  // SESSION 01: Melnichek
  {
    id: 14,
    title: "SESSION 01",
    subtitle: "Alexey Melnichek — Social Design",
    visual: 'CONTAINER_CIRCLE',
    caption: "Dec 8, 2025",
    layout: 'split',
    sessionInfo: {
      number: 1,
      date: "Dec 8, 2025",
      speaker: "Alexey Melnichek",
      topic: "Social Design",
      presentationUrl: "https://w26-session1-melnichek.netlify.app/",
      keyPoints: ["Safe space creation", "Group dynamics", "Container before content"]
    },
    content: [
      "Why containers matter before content",
      "Social design principles for groups",
      "Psychological safety for reflection",
      "Buddy system introduction"
    ]
  },
  {
    id: 15,
    title: "SESSION 01",
    subtitle: "Key Insight",
    visual: 'QUOTE_BLOCK',
    layout: 'text',
    quote: {
      text: "Базовая структура нужна будет. Но её можно корректировать в процессе. Уроки лучше делать в конце — сначала работа, потом собираем и выходим на пике.",
      author: "Alexey Melnichek",
      date: "Dec 8"
    }
  },

  // SESSION 02: Context Alchemy
  {
    id: 16,
    title: "SESSION 02",
    subtitle: "Alex P + Sergei — Context Alchemy",
    visual: 'CONTEXT_ALCHEMY',
    caption: "Dec 11, 2025",
    layout: 'split',
    sessionInfo: {
      number: 2,
      date: "Dec 11, 2025",
      speaker: "Alex P, Sergei Khabarov",
      topic: "Context Alchemy",
      presentationUrl: "https://context-alchemy-game.netlify.app/",
      keyPoints: ["Data sources mapping", "Vibe coding", "Context blending"]
    },
    content: [
      "Mapping your data sources (calendars, chats, voice)",
      "Context Alchemy: mixing 2 sources → new meaning",
      "Vibe coding philosophy — fast prototyping",
      "From raw data to AI-ready context"
    ]
  },
  {
    id: 17,
    title: "SESSION 02",
    subtitle: "Alchemy Discovery",
    visual: 'CONTEXT_ALCHEMY',
    layout: 'text',
    quote: {
      text: "Внезапно в поисках визуального стиля переплавил контекст музыкальных вкусов (данные с last.fm since 2004) в описания визуала... случилась алхимия — перенос из одной модальности в другую.",
      author: "Sergei Khabarov",
      date: "Dec 13"
    }
  },

  // SESSION 03: Dilts
  {
    id: 18,
    title: "SESSION 03",
    subtitle: "Anna Lozitskaya — Dilts Pyramid",
    visual: 'DILTS_PYRAMID',
    caption: "Dec 15, 2025",
    layout: 'split',
    sessionInfo: {
      number: 3,
      date: "Dec 15, 2025",
      speaker: "Anna Lozitskaya",
      topic: "Pyramid of Dilts",
      presentationUrl: "https://anna-lozitskaya-w26.netlify.app/",
      keyPoints: ["6 levels of change", "Coaching questions", "Pair practice"]
    },
    content: [
      "Environment — Where? When? With whom?",
      "Behavior — What am I doing?",
      "Skills — How do I do it?",
      "Values — Why is this important?",
      "Identity — Who am I?",
      "Mission — For whom? For what?"
    ]
  },

  // SESSION 04: Anca
  {
    id: 19,
    title: "SESSION 04",
    subtitle: "Anca Stavenski — Packing the Backpack",
    visual: 'CREATIVE_POSTER',
    caption: "Dec 18, 2025",
    layout: 'split',
    sessionInfo: {
      number: 4,
      date: "Dec 18, 2025",
      speaker: "Anca Stavenski",
      topic: "Creative Practice",
      presentationUrl: "https://anka-session4-w26.netlify.app/",
      keyPoints: ["Year poster creation", "Letters to 2025/2026", "Visual metaphors"]
    },
    content: [
      "Letter to 2025: What are you grateful for?",
      "Letter to 2026: What do you wish for?",
      "Year Poster: Visual representation of themes",
      "If 2025 were a color / song / image?"
    ]
  },
  {
    id: 20,
    title: "SESSION 04",
    subtitle: "Creative Prompts",
    visual: 'CREATIVE_POSTER',
    layout: 'split',
    content: [
      "If 2025 were a color, what would it be?",
      "If 2025 were a song, which one?",
      "What image captures your year?",
      "What word for a 2026 sticker?",
      "What would you burn and release?",
      "What seeds are you planting?"
    ]
  },

  // POSTERS - Lab Results
  {
    id: 21,
    title: "СЛОВА-ЯКОРЯ 2026",
    subtitle: "Постеры участников",
    visual: 'IMAGE_FEATURE',
    caption: "Визуальные манифестации участников лабы",
    layout: 'gallery',
    images: [
      "/assets/posters/poster-ghibli.jpeg",
      "/assets/posters/poster-zen.jpeg",
      "/assets/posters/poster-cosmic.png",
      "/assets/posters/poster-mountains.png",
      "/assets/posters/poster-moment.png",
      "/assets/posters/poster-satisfaction.jpg"
    ]
  },
  {
    id: 22,
    title: "АРТЕФАКТЫ ЛАБЫ",
    subtitle: "Year Posters 2026",
    visual: 'IMAGE_FEATURE',
    caption: "Каждый плакат — уникальная история года",
    layout: 'gallery',
    images: [
      "/assets/posters/poster-chatgpt.png",
      "/assets/posters/poster-gemini.png",
      "/assets/posters/poster-plakat1.png",
      "/assets/posters/poster-year.png",
      "/assets/posters/poster-abstract.jpg",
      "/assets/posters/poster-tmp.png"
    ]
  },

  // SESSION 05 Preview
  {
    id: 23,
    title: "SESSION 05",
    subtitle: "Winter Solstice — Today",
    visual: 'SOLSTICE_SUN',
    caption: "Dec 21, 2025 — You are here",
    layout: 'center'
  },
  {
    id: 22,
    title: "BUDDY PAIRS",
    subtitle: "Peer Accountability",
    visual: 'BUDDY_GRAPH',
    caption: "Matched for practice",
    layout: 'split',
    content: [
      "Алина Щеблецова ↔ Вероника Долгих",
      "Kate Rodionova ↔ Dmitry Kompanets",
      "Veronika ↔ Алиса Предеина",
      "Олег ↔ Nikita",
      "Ольга Конарева ↔ Марат Лещинский",
      "Жанна ↔ Julia M",
      "Александр Медведев ↔ Анастасия ↔ Olya Eremina"
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // BLOCK 5: #CONTEXTDAILY (slides 22-28)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 23,
    title: "#CONTEXTDAILY",
    subtitle: "13 Days of Practice",
    visual: 'SECTION_DIVIDER',
    sectionTitle: "DAILY",
    caption: "One exercise per day",
    layout: 'center'
  },
  {
    id: 24,
    title: "#CONTEXTDAILY",
    subtitle: "Overview",
    visual: 'DAILY_GALLERY',
    caption: "From Year Wraps to Solstice",
    layout: 'split',
    content: [
      "Day 1-3: Year Wraps (Spotify, Strava, etc)",
      "Day 4-5: Voice & Transcription tools",
      "Day 6-7: Calendar & Chat exports",
      "Day 8-9: Photos & Life domains",
      "Day 10-11: Obsidian, Health data",
      "Day 12-13: Artifacts & System Prompts"
    ],
    images: [
      "/assets/context-daily/ContextDaily-1.png",
      "/assets/context-daily/ContextDaily-7.png",
      "/assets/context-daily/ContextDaily-13.png"
    ]
  },
  {
    id: 25,
    title: "DAY 01",
    subtitle: "Year in Review Wraps",
    visual: 'DATA_VOLUME',
    caption: "If they can collect {context} — we can too",
    layout: 'split',
    image: "/assets/context-daily/ContextDaily-1.png",
    content: [
      "Spotify Wrapped — your music year",
      "Strava Year in Sport — movement patterns",
      "YouTube Music Recap — listening habits",
      "Apple Music Replay — audio timeline",
      "Granola Crunched — meeting summaries"
    ]
  },
  {
    id: 26,
    title: "DAY 02-05",
    subtitle: "Voice & Chat",
    visual: 'TECH_GRID',
    caption: "150 words/min speaking vs 40 wpm typing",
    layout: 'split',
    content: [
      "Day 2: Voice tools (WisprFlow, SuperWhisper)",
      "Day 3: Calendar export (Google, Apple)",
      "Day 4: Chat history (Telegram Lite)",
      "Day 5: Deep chat analysis (themes, patterns)"
    ]
  },
  {
    id: 27,
    title: "DAY 06-09",
    subtitle: "Context Sources",
    visual: 'CONTEXT_ALCHEMY',
    caption: "Photos, domains, knowledge",
    layout: 'split',
    content: [
      "Day 6: Photos as context (visual timeline)",
      "Day 7: Life domains (art, body, tech, mind)",
      "Day 8: Obsidian PKM (15,000+ notes)",
      "Day 9: Health data (Apple, Oura, Whoop)"
    ]
  },
  {
    id: 28,
    title: "DAY 10-13",
    subtitle: "Artifacts",
    visual: 'CREATIVE_POSTER',
    caption: "From data to materialized outputs",
    layout: 'split',
    content: [
      "Day 10: Artifacts = Materialized Context",
      "Day 11: System Prompts (personal constitution)",
      "Day 12: Single Transferable Artifact",
      "Day 13: Solstice Gathering — bring it all together"
    ]
  },
  {
    id: 29,
    title: "#CONTEXTDAILY",
    subtitle: "Gallery",
    visual: 'IMAGE_FEATURE',
    layout: 'gallery',
    images: [
      "/assets/context-daily/ContextDaily-1.png",
      "/assets/context-daily/ContextDaily-2.png",
      "/assets/context-daily/ContextDaily-3.png",
      "/assets/context-daily/ContextDaily-4.png",
      "/assets/context-daily/ContextDaily-5.png",
      "/assets/context-daily/ContextDaily-6.png"
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // BLOCK 6: VOICES & QUOTES (slides 29-36)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 30,
    title: "VOICES",
    subtitle: "Lab Experience",
    visual: 'SECTION_DIVIDER',
    sectionTitle: "VOICES",
    caption: "What participants said",
    layout: 'center'
  },
  {
    id: 31,
    title: "VOICES",
    subtitle: "Lab Experience",
    visual: 'QUOTE_BLOCK',
    layout: 'text',
    quote: {
      text: "Ребята, пересматриваю эфиры. Вы та самая таблетка магния в конце года, которая показана всем. Спасибо за успокаивающий и вдохновляющий эффект!",
      author: "Алиса Предеина",
      date: "Dec 18"
    }
  },
  {
    id: 32,
    title: "VOICES",
    subtitle: "Deep Research Discovery",
    visual: 'QUOTE_BLOCK',
    layout: 'text',
    quote: {
      text: "Делюсь своим открытием — использовать Deep Research по моим данным, а не просто спрашивать у LLM. Самое ценное — это сами сессии с конспектами (или транскриптами + саммари).",
      author: "Dmitry Kompanets",
      date: "Dec 10"
    }
  },
  {
    id: 33,
    title: "VOICES",
    subtitle: "#intro",
    visual: 'QUOTE_BLOCK',
    layout: 'text',
    quote: {
      text: "мой 2025 в одном предложении: ai + adhd\nхочу от {context}: «о, а так можно было?»",
      author: "Сережа Рис",
      date: "Dec 8"
    }
  },
  {
    id: 34,
    title: "VOICES",
    subtitle: "#intro",
    visual: 'QUOTE_BLOCK',
    layout: 'text',
    quote: {
      text: "Хочу научиться оцифровывать свои отношения, ощущения, зоны и точки роста, путь видеть не в тумане, а ясно.",
      author: "Noor (Nurmagomedov)",
      date: "Dec 8"
    }
  },
  {
    id: 35,
    title: "VOICES",
    subtitle: "#intro",
    visual: 'QUOTE_BLOCK',
    layout: 'text',
    quote: {
      text: "Мой 2025: Петля замкнулась в поисках смыслов. От {context} хочу фреймворк/систему, которая поможет структурировать мои контексты.",
      author: "Kanstantsin Netyliou",
      date: "Dec 8"
    }
  },
  {
    id: 36,
    title: "VOICES",
    subtitle: "More Voices",
    visual: 'MULTI_QUOTES',
    layout: 'split',
    quotes: [
      { text: "Выползание из survival mode. Хочу завершить хаотичность режима.", author: "Lena Pishchuk", date: "Dec 8" },
      { text: "Неожиданно все стало очень хорошо и это до сих пор меня пугает :))", author: "Alena", date: "Dec 5" },
      { text: "Хочу достать из себя накопленное за год и сложить это в осознанную картинку.", author: "Masha", date: "Dec 8" }
    ]
  },
  {
    id: 37,
    title: "VOICES",
    subtitle: "Context Alchemy",
    visual: 'CONTEXT_ALCHEMY',
    layout: 'text',
    quote: {
      text: "Внезапно в поисках визуального стиля переплавил контекст музыкальных вкусов (данные с last.fm since 2004) в описания визуала... случилась алхимия — перенос из одной модальности в другую.",
      author: "Sergei Khabarov",
      date: "Dec 13"
    }
  },
  {
    id: 38,
    title: "VOICES",
    subtitle: "More from the Lab",
    visual: 'MULTI_QUOTES',
    layout: 'split',
    quotes: [
      { text: "Очень ценно, что есть такое место, где можно вместе думать про AI и контекст.", author: "Olga K", date: "Dec 15" },
      { text: "Формат с бадди — огонь. Ответственность перед другим человеком реально работает.", author: "Nikita", date: "Dec 12" },
      { text: "Наконец-то понял как использовать голосовые заметки. 3 года лежали мёртвым грузом.", author: "Marat", date: "Dec 11" }
    ]
  },
  {
    id: 39,
    title: "VOICES",
    subtitle: "Discoveries",
    visual: 'MULTI_QUOTES',
    layout: 'split',
    quotes: [
      { text: "Курсор + Claude Code = новый уровень продуктивности. За час сделал то, на что раньше уходил день.", author: "Alexander M", date: "Dec 14" },
      { text: "Пирамида Дилтса помогла структурировать то, что крутилось в голове год.", author: "Julia M", date: "Dec 16" },
      { text: "Постер года — теперь висит на стене. Каждый день напоминает о важном.", author: "Veronika D", date: "Dec 19" }
    ]
  },
  {
    id: 40,
    title: "VOICES",
    subtitle: "Community Power",
    visual: 'MULTI_QUOTES',
    layout: 'split',
    quotes: [
      { text: "Энергия группы невероятная. Одному бы точно забросил на 3й день.", author: "Kate R", date: "Dec 13" },
      { text: "Спасибо за structure и framework. Теперь есть план на январь.", author: "Dmitry K", date: "Dec 18" },
      { text: "Главное открытие: мой контекст — это не хаос, а сырьё для AI.", author: "Alina S", date: "Dec 17" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // BLOCK 7: ALEX P CASE STUDY
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 38,
    title: "ALEX P",
    subtitle: "Case Study",
    visual: 'SECTION_DIVIDER',
    sectionTitle: "DEMO",
    caption: "How I used context for year review",
    layout: 'center'
  },
  {
    id: 39,
    title: "ALEX P",
    subtitle: "My 2025 in Numbers",
    visual: 'ALEX_STATS',
    layout: 'stats',
    stats: [
      { value: "5,079", label: "markdown files", color: "red" },
      { value: "1,200+", label: "calls (Krisp)", color: "black" },
      { value: "99", label: "therapy sessions", color: "black" },
      { value: "15,000", label: "word analysis", color: "red" },
      { value: "236", label: "daily notes", color: "black" },
      { value: "418", label: "peak files/month", color: "black" }
    ]
  },
  {
    id: 40,
    title: "ALEX P",
    subtitle: "Files by Month 2025",
    visual: 'STATS_ANIMATED',
    caption: "September-November = scaling = chaos",
    layout: 'stats',
    stats: [
      { value: 139, label: "Jan" },
      { value: 195, label: "Feb" },
      { value: 164, label: "Mar" },
      { value: 247, label: "May", color: "red" },
      { value: 370, label: "Sep", color: "red" },
      { value: 418, label: "Nov", color: "red" }
    ]
  },
  {
    id: 41,
    title: "ALEX P",
    subtitle: "Patterns Discovered",
    visual: 'GAME_LOOP',
    caption: "What the data revealed",
    layout: 'split',
    content: [
      "Bounded vs Unbounded: cohorts with deadlines = success",
      "Scaling = chaos: Sep-Nov (+152% files) = max chaos",
      "Stability anchors: therapy, practice = non-work routines stabilize",
      "Teaching what I need to learn: Context Lab born from context obesity"
    ]
  },
  {
    id: 42,
    title: "ALEX P",
    subtitle: "System Prompt 2026",
    visual: 'TECH_GRID',
    caption: "Red lines and operating principles",
    layout: 'split',
    content: [
      "LOAD: Max 1 intensive program at a time",
      "LOAD: Max 3 active directions",
      "LOAD: >300 files/month = red flag",
      "SYSTEMS: 'One in, one out' rule",
      "SYSTEMS: Not used 3 months = delete",
      "RED LINE: <7h sleep 3 days = reduce load"
    ]
  },
  {
    id: 43,
    title: "ALEX P",
    subtitle: "What I'm Taking vs Leaving",
    visual: 'BURNING',
    layout: 'split',
    content: [
      "TAKING: Bounded formats (cohort + deadline)",
      "TAKING: AI as context analyst, not thinking replacement",
      "TAKING: Stabilizing routines outside work",
      "LEAVING: Parallel launch of 3+ programs",
      "LEAVING: 'Museum of systems' (new tool every 2-4 months)",
      "LEAVING: Context narcissism (impressive > real needs)"
    ]
  },
  {
    id: 44,
    title: "ALEX P",
    subtitle: "My Dilts Pyramid 2025",
    visual: 'DILTS_PYRAMID',
    caption: "Personal 6-level reflection",
    layout: 'split',
    content: [
      "ENVIRONMENT: Lisbon, remote, async teams",
      "BEHAVIOR: More writing, less meetings",
      "SKILLS: AI orchestration, context design",
      "VALUES: Clarity > activity, depth > breadth",
      "IDENTITY: Context architect, not just founder",
      "MISSION: Enable others to think with AI"
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // BLOCK 9: WHAT'S NEXT
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 51,
    title: "WHAT'S NEXT",
    subtitle: "2026 Programs",
    visual: 'SECTION_DIVIDER',
    sectionTitle: "NEXT",
    caption: "Continue the journey",
    layout: 'center'
  },
  {
    id: 52,
    title: "W26",
    subtitle: "AI Mindset Main Laboratory",
    visual: 'FOUR_STAGES',
    caption: "January 19 – February 16, 2026 — 4 weeks intensive",
    layout: 'split',
    content: [
      "4-week intensive program with 3 specialized tracks:",
      "🧠 AI COACHING — Anna Lozitskaya: AI as a thinking partner for coaches and consultants",
      "🎨 AI CREATIVE — Anna Stavenski: Creative workflows with AI for artists and designers",
      "💻 VIBE-CODING — Sergey Khabarov: Build real products with natural language coding",
      "Each track: 3 live sessions × 2 hours + practice between sessions",
      "Format: Group learning + personal context work + community support"
    ],
    links: [
      { label: "Register at aimindset.org", url: "https://aimindset.org/ai-mindset-w25" }
    ]
  },
  {
    id: 53,
    title: "CONTEXT JOURNEY",
    subtitle: "Fog → Clarity",
    visual: 'FOG_CLARITY',
    caption: "Developing the film of the year",
    layout: 'center'
  },
  {
    id: 54,
    title: "KEEP GOING",
    subtitle: "Resources",
    visual: 'LINKS_QR',
    caption: "Stay connected",
    layout: 'center',
    links: [
      { label: "Telegram Channel", url: "https://t.me/ai_mind_set" },
      { label: "YouTube", url: "https://youtube.com/@A-I-Mindset" },
      { label: "Knowledge Base", url: "https://base.aimindset.org/" },
      { label: "Context Lab", url: "https://context.aimindset.org/" }
    ]
  },
  {
    id: 55,
    title: "STAY CONNECTED",
    subtitle: "Channels & Links",
    visual: 'OBSIDIAN_TREE',
    layout: 'split',
    links: [
      { label: "Telegram: t.me/ai_mind_set", url: "https://t.me/ai_mind_set" },
      { label: "YouTube: @A-I-Mindset", url: "https://youtube.com/@A-I-Mindset" },
      { label: "Knowledge Base", url: "https://base.aimindset.org/" },
      { label: "Main Website", url: "https://aimindset.org/" },
      { label: "Context Lab Landing", url: "https://context.aimindset.org/" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // BLOCK 10: VISUAL FINALE — Beautiful metaphors with minimal text
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 60,
    title: "",
    subtitle: "Signal vs Noise",
    visual: 'ALCHEMY_FILTER',
    caption: "365 дней хаоса → моменты, которые имеют значение",
    layout: 'center'
  },
  {
    id: 61,
    title: "",
    subtitle: "Context Alchemy",
    visual: 'ALCHEMY_MIX',
    caption: "Календарь + Чаты + Голос = Новые инсайты",
    layout: 'center'
  },
  {
    id: 62,
    title: "",
    subtitle: "The Artifact",
    visual: 'COMPASS_ARTIFACT',
    caption: "Ты — результат. Твой контекст — твой компас.",
    layout: 'center'
  },
  {
    id: 63,
    title: "",
    subtitle: "Release & Renew",
    visual: 'FIRE_RITUAL',
    caption: "Что отпускаем — сгорает. Что берём — освещает путь.",
    layout: 'center'
  },
  {
    id: 64,
    title: "",
    subtitle: "Winter Solstice",
    visual: 'MOON_SOLSTICE',
    caption: "Самая длинная ночь становится самым ярким инсайтом",
    layout: 'center'
  },
  {
    id: 65,
    title: "",
    subtitle: "2025 → 2026",
    visual: 'ECLIPSE_TRANSITION',
    caption: "",
    layout: 'center'
  },

  // ═══════════════════════════════════════════════════════════════════
  // BLOCK 11: THANK YOU
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 56,
    title: "TEAM",
    subtitle: "Thank You",
    visual: 'SECTION_DIVIDER',
    sectionTitle: "TEAM",
    caption: "Made possible by",
    layout: 'center'
  },
  {
    id: 57,
    title: "SPEAKERS",
    subtitle: "Context Lab Winter 2025",
    visual: 'TEAM_GRID',
    layout: 'team',
    team: [
      { name: "Alexey Melnichek", role: "Social Design @kontaktkanal", avatar: "/assets/melnichek.jpg" },
      { name: "Anna Lozitskaya", role: "Dilts Pyramid", avatar: "/assets/lozitskaia.jpg" },
      { name: "Anca Stavenski", role: "Creative Track @stavenski", avatar: "/assets/anka.webp" },
      { name: "Dasha Cheng", role: "Breathwork @badbuddhas" }
    ]
  },
  {
    id: 58,
    title: "CORE TEAM",
    subtitle: "AI Mindset",
    visual: 'TEAM_GRID',
    layout: 'team',
    team: [
      { name: "Alexander Povaliaev", role: "Founder @alex_named", avatar: "/assets/povaliaev.png" },
      { name: "Sergey Khabarov", role: "Tech Lead @khabaroff" },
      { name: "Irina Nazarova", role: "Operations @Irhen_N" },
      { name: "Vlada Zorina", role: "Partnerships @solnesy" },
      { name: "Katya Levkovets", role: "Content @katutella" },
      { name: "Ray Svitla", role: "Growth & B2B @raysvitla" },
      { name: "Danik Vasiliev", role: "Tech Expert @dan_named" }
    ]
  },
  {
    id: 59,
    title: "THANK YOU",
    subtitle: "See you in 2026",
    visual: 'SPARKLE_FINALE',
    caption: "From fog to clarity. From chaos to context.",
    layout: 'center',
    links: [
      { label: "t.me/ai_mind_set", url: "https://t.me/ai_mind_set" }
    ]
  }
];

export const assetUrl = (url: string): string => {
  if (!url) return url;
  if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) return url;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  return `${normalizedBase}${url.replace(/^\//, '')}`;
};

const normalizeSlide = (slide: SlideData): SlideData => ({
  ...slide,
  image: slide.image ? assetUrl(slide.image) : undefined,
  images: slide.images ? slide.images.map(assetUrl) : undefined,
  team: slide.team
    ? slide.team.map((m) => ({
        ...m,
        avatar: m.avatar ? assetUrl(m.avatar) : undefined,
      }))
    : undefined,
});

export const SLIDES: SlideData[] = RAW_SLIDES.map(normalizeSlide);
