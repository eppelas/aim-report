export interface ManifestoPageProps {
  onRestart?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
}

export interface ProtocolCardProps {
  level: string;
  title: string;
  subtitle: string;
  items: string[];
  color?: string;
  theme: 'dark' | 'light';
}

export interface EcoVisualProps {
  type: string;
  theme: 'dark' | 'light';
}