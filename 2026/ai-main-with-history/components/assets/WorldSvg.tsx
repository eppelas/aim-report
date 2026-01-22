import React from 'react';

export const WorldSvg: React.FC = () => {
  return (
    <svg viewBox="0 0 1920 1080" className="w-full h-full" style={{ background: '#000814' }}>
      <defs>
        {/* 1. The Sky Gradient (Deep Royal Blue to Black) */}
        <radialGradient id="skyVignette" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#0a2a66" />
          <stop offset="60%" stopColor="#001133" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>

        {/* 2. Fine Grain Texture (The "Spray Paint" look) 
            Instead of turbulence which looks like fur, we use high frequency noise
            blended softly to look like film grain or stippling.
        */}
        <filter id="filmGrain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="bwNoise" />
          <feComponentTransfer in="bwNoise" result="subtleNoise">
             <feFuncA type="linear" slope="0.15" /> 
          </feComponentTransfer>
          <feBlend mode="overlay" in="subtleNoise" in2="SourceGraphic" />
        </filter>

        {/* 3. Platform Gradients */}
        <linearGradient id="platformTop" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#e0e0e0" />
          <stop offset="100%" stopColor="#808080" />
        </linearGradient>
        
        <linearGradient id="platformSide" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#333" />
          <stop offset="100%" stopColor="#111" />
        </linearGradient>
      </defs>

      {/* BACKGROUND LAYER */}
      <rect width="100%" height="100%" fill="url(#skyVignette)" />
      
      {/* Texture Overlay (Global Grain) */}
      <rect width="100%" height="100%" fill="transparent" filter="url(#filmGrain)" style={{ mixBlendMode: 'overlay' }} />

      {/* THE GEOMETRY (The Ledge) 
          Sharp, angular shapes mimicking the reference perspective.
      */}
      <g transform="translate(960, 800) scale(1.5)">
        {/* Left 'Wing' of the platform (The lit path) */}
        <path 
          d="M -1000 200 L -300 -100 L 0 -80 L 1000 200 Z" 
          fill="url(#platformTop)" 
        />
        
        {/* The Sharp Box/Corner the figure stands on */}
        <path 
          d="M -250 -100 L 250 -100 L 350 200 L -350 200 Z" 
          fill="#1a1a1a"
        />
        
        {/* The Top Surface of the Box (Brightest part) */}
        <path 
          d="M -250 -100 L 250 -100 L 180 -130 L -180 -130 Z" 
          fill="#fff"
          opacity="0.9"
        />
        
        {/* Shadow Drop (The dark side of the cliff) */}
        <path 
          d="M -1000 200 L 1000 200 L 1000 500 L -1000 500 Z" 
          fill="#000"
        />
      </g>
    </svg>
  );
};