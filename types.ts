export type VisualType =
  | 'hero_cover'
  | 'CONTEXT_GAP_COVER'
  | 'SOLSTICE_SUN'
  | 'CONTEXT_CHAOS'
  | 'FOUR_STAGES'
  | 'CONTAINER_CIRCLE'
  | 'CONTEXT_ALCHEMY'
  | 'DILTS_PYRAMID'
  | 'CREATIVE_POSTER'
  | 'GAME_LOOP'
  | 'DATA_VOLUME'
  | 'BUDDY_GRAPH'
  | 'OBSIDIAN_TREE'
  | 'QUOTE_BLOCK'
  | 'SESSION_CARD'
  | 'DAILY_GALLERY'
  | 'LINKS_QR'
  | 'SPARKS'
  | 'FOG_CLARITY'
  | 'TECH_GRID'
  | 'BREATH'
  | 'BURNING'
  | 'TEAM_GRID'
  | 'STATS_ANIMATED'
  | 'ALEX_STATS'
  | 'SECTION_DIVIDER'
  | 'IMAGE_FEATURE'
  | 'MULTI_QUOTES'
  // New Alchemy metaphors
  | 'ALCHEMY_FILTER'
  | 'ALCHEMY_MIX'
  | 'COMPASS_ARTIFACT'
  | 'FIRE_RITUAL'
  | 'MOON_SOLSTICE'
  | 'ECLIPSE_TRANSITION'
  | 'BACKPACK_JOURNEY'
  | 'SPARKLE_FINALE'
  // Loop-specific metaphors (from gac-c)
  | 'audit'
  | 'tangle'
  | 'shield'
  | 'factory'
  | 'whisper'
  | 'battery'
  | 'pen'
  | 'globe'
  | 'scale'
  | 'mask'
  // GAC-C reference visuals (lowercase keys)
  | 'gap'
  | 'filter'
  | 'trust'
  | 'context'
  | 'centaur'
  | 'meaning'
  | 'velocity'
  | 'stagnation'
  | 'orbit'
  | 'collision'
  | 'divergence'
  | 'convergence'
  | 'loop'
  | 'cycle'
  | 'linear'
  | 'exponential'
  | 'network'
  | 'silo'
  | 'hierarchy'
  | 'flat'
  | 'grid'
  | 'stack'
  | 'queue'
  | 'bridge'
  | 'barrier'
  | 'portal'
  | 'sync'
  | 'async'
  | 'balance'
  | 'friction'
  | 'echo'
  | 'mirror'
  | 'shadow'
  | 'source'
  | 'target'
  | 'exchange'
  | 'clarity'
  | 'blur'
  | 'noise'
  | 'signal'
  | 'overload'
  | 'empty'
  | 'locked'
  | 'unlocked'
  | 'focus'
  | 'search'
  | 'pulse'
  | 'growth'
  | 'decay'
  | 'spark'
  | 'breath'
  | 'timeline'
  | 'build'
  | 'none';

export interface CardItem {
  title: string;
  subtitle: string;
  body: string;
  highlight?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

export interface LoopData {
  machine: string;
  human: string;
  gap: string;
  move?: string; // Optional - removed from UI per Ray's feedback
  lab?: { name: string; url: string }; // Optional - link to relevant AIM lab
}

export interface ProductData {
  name: string;
  type: 'seasonal' | 'sprint' | 'premium' | 'community';
  description: string;
  price?: string;
  duration?: string;
  url?: string;
}

export interface SlideSource {
  label: string;
  url?: string;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  visual: VisualType;
  caption?: string;
  layout?: 'center' | 'split' | 'bottom' | 'text' | 'gallery' | 'stats' | 'team' | 'paired' | 'cards' | 'loop' | 'loop-intro' | 'loop-evidence' | 'manifesto' | 'timeline' | 'text-heavy' | 'metaphor' | 'product' | 'quotes' | 'sources';
  leftTitle?: string;
  leftContent?: string[];
  rightTitle?: string;
  rightContent?: string[];
  quote?: { text: string; author: string; date?: string; avatar?: string };
  quotes?: { text: string; author: string; date?: string }[];
  content?: string[];
  prompt?: { title?: string; text: string };
  sessionInfo?: SessionInfo;
  images?: string[];
  image?: string;
  links?: { label: string; url: string }[];
  stats?: StatItem[];
  team?: TeamMember[];
  sectionTitle?: string;
  // New fields for enhanced layouts
  cards?: CardItem[];
  timeline?: TimelineEvent[];
  loopData?: LoopData;
  productData?: ProductData[];
  dark?: boolean;
  heroStats?: { value: string; label: string }[];
  // Data source attribution - single source or multiple sources
  source?: SlideSource;
  sources?: SlideSource[];
  // Evidence data for loop-evidence slides
  evidenceData?: {
    keyStats?: { value: string; label: string; source?: string }[];
    researchHighlights?: string[];
    industryData?: string[];
  };
  // Loop number for evidence slides
  loopNumber?: number;
}

export interface SessionInfo {
  number: number;
  date: string;
  speaker: string;
  topic: string;
  presentationUrl?: string;
  keyPoints: string[];
}

export interface StatItem {
  value: number | string;
  label: string;
  suffix?: string;
  color?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

export interface SlideProps {
  data: SlideData;
}
