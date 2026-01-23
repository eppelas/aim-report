import React from 'react';

interface AIMindsetLogoProps {
  className?: string;
  color?: 'white' | 'black';
}

export const AIMindsetLogo: React.FC<AIMindsetLogoProps> = ({ className = "w-8 h-8", color = 'white' }) => {
  const base = import.meta.env.BASE_URL || '/';
  const logoSrc = color === 'white' ? `${base}logo_rb.png` : `${base}logo.png`;
  
  return (
    <img src={logoSrc} alt="AI Mindset" className={className} />
  );
};
