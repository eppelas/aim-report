import React from 'react';
import logoWhite from '../assets/logo.png';
import logoBlack from '../assets/logo_rb.png';

interface AIMindsetLogoProps {
  className?: string;
  color?: 'white' | 'black';
}

export const AIMindsetLogo: React.FC<AIMindsetLogoProps> = ({ className = "w-8 h-8", color = 'white' }) => {
  const logoSrc = color === 'white' ? logoWhite : logoBlack;
  
  return (
    <img src={logoSrc} alt="AI Mindset" className={className} />
  );
};
