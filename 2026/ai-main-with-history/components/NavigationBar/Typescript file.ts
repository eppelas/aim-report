
export interface NavItemData {
  id: string;
  title: string;
  [key: string]: any;
}

// Defines the visual types of nodes available in the navigation
export type NavItemType = 'intro' | 'manifesto' | 'layer' | 'shift' | 'summary' | 'thankyou';

export interface TimelineItem {
  type: 'layer' | 'shift' | 'summary';
  data: NavItemData;
}

export interface NavigationProps {
  timeline: TimelineItem[];
  currentIndex: number;
  viewState: 'landing' | 'report' | 'conclusion' | 'thankyou';
  onNavigate: (index: number) => void;
  onNavigateToConclusion: () => void;
  onNavigateToLanding: () => void;
  onNavigateToThankYou: () => void;
  theme: 'dark' | 'light';
  visible: boolean;
}
