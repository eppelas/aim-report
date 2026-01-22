import React from 'react';

export interface AnimatedComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps {
  title?: string;
  subtitle?: string;
  index?: string;
}

// Ensure GSAP plugins are recognized if using advanced features
// Typically not needed for basic usage but good for stricter environments
export type ScrollTriggerConfig = {
  trigger: Element | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
};