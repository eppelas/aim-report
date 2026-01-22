import React from 'react';

export const HumanSvg: React.FC = () => {
  return (
    <svg viewBox="0 0 400 800" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMax meet">
      <defs>
        <filter id="humanGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="suitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000" />
          <stop offset="50%" stopColor="#111" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>

      <g transform="translate(200, 400)">
        
        {/* --- BASE SILHOUETTE (The 'Black' Body) --- 
            Detailed anatomy: Head, Neck, Shoulders, Arms at sides, Legs slightly apart
        */}
        <path 
          d="
            M 0 -340 
            C 25 -340 40 -325 40 -300 
            L 40 -280
            L 80 -270 
            C 110 -265 130 -240 130 -200 
            L 125 -50 
            L 135 100
            L 120 120
            L 120 400
            L 40 400
            L 35 150
            L 0 160
            L -35 150
            L -40 400
            L -120 400
            L -120 120
            L -135 100
            L -125 -50
            C -130 -240 -110 -265 -80 -270
            L -40 -280
            L -40 -300
            C -40 -325 -25 -340 0 -340
            Z
          "
          fill="url(#suitGradient)"
        />

        {/* --- HIGHLIGHT DETAILS (The 'Light' hitting the suit) --- */}
        
        {/* Helmet Reflection - Red */}
        <path d="M -20 -330 Q 0 -335 20 -330" fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.8" filter="url(#humanGlow)"/>
        
        {/* Shoulder Pads (Rim Light) */}
        <path d="M 80 -270 C 110 -265 125 -245 128 -210" fill="none" stroke="white" strokeWidth="3" opacity="0.9" filter="url(#humanGlow)"/>
        <path d="M -80 -270 C -110 -265 -125 -245 -128 -210" fill="none" stroke="white" strokeWidth="3" opacity="0.9" filter="url(#humanGlow)"/>

        {/* Torso/Chest Plate */}
        <path d="M -40 -200 L 40 -200 L 30 -120 L -30 -120 Z" fill="none" stroke="#333" strokeWidth="1" />
        <circle cx="0" cy="-160" r="5" fill="#DC2626" filter="url(#humanGlow)" opacity="0.8"/>

        {/* Arm Highlights (Cyber Muscles) - Red */}
        <path d="M 125 -50 L 128 50" fill="none" stroke="#DC2626" strokeWidth="1" opacity="0.5"/>
        <path d="M -125 -50 L -128 50" fill="none" stroke="#DC2626" strokeWidth="1" opacity="0.5"/>

        {/* Leg Greaves (Shin guards) */}
        <path d="M 50 200 L 110 200 L 105 380 L 55 380 Z" fill="none" stroke="#222" strokeWidth="2"/>
        <path d="M -50 200 L -110 200 L -105 380 L -55 380 Z" fill="none" stroke="#222" strokeWidth="2"/>
        <path d="M 110 200 L 105 380" fill="none" stroke="white" strokeWidth="2" opacity="0.6" filter="url(#humanGlow)"/>
        <path d="M -110 200 L -105 380" fill="none" stroke="white" strokeWidth="2" opacity="0.6" filter="url(#humanGlow)"/>

        {/* --- BACK GLOW (The aura) --- */}
        <ellipse cx="0" cy="-300" rx="30" ry="30" fill="#DC2626" filter="url(#humanGlow)" opacity="0.2" style={{ mixBlendMode: 'screen' }}/>

      </g>
    </svg>
  );
};