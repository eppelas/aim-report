
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface ShiftMetaphorProps {
  id: string;
  isDark: boolean;
  centered?: boolean;
}

// Shared Atmosphere Component defined outside to prevent re-creation
const Atmosphere = ({ colorPrimary, colorBase }: { colorPrimary: string, colorBase: string }) => (
    <>
        <defs>
            <filter id="glow-layer" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2" result="blur"></feGaussianBlur><feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite></filter>
            <filter id="blur-heavy" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"></feGaussianBlur></filter>
            <linearGradient id="grad-radar" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={colorPrimary} stopOpacity="0"></stop><stop offset="100%" stopColor={colorPrimary} stopOpacity="0.5"></stop></linearGradient>
            <radialGradient id="grad-glow-radial" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={colorPrimary} stopOpacity="0.2"></stop><stop offset="100%" stopColor="transparent" stopOpacity="0"></stop></radialGradient>
            <radialGradient id="grad-corner" cx="0%" cy="0%" r="90%"><stop offset="0%" stopColor={colorBase} stopOpacity="0.05"></stop><stop offset="100%" stopColor="transparent" stopOpacity="0"></stop></radialGradient>
            <pattern id="grid-pattern" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.5" fill={colorBase} opacity="0.1"></circle></pattern>
        </defs>
        <g className="atmosphere" pointerEvents="none">
            <circle cx="0" cy="0" r="100" fill="url(#grad-glow-radial)" opacity="0.4" className="atmosphere-pulse" style={{ transformOrigin: 'center' }}></circle>
            <rect x="-150" y="-150" width="300" height="300" fill="url(#grad-corner)" opacity="0.3"></rect>
        </g>
        <g className="particles" style={{ mixBlendMode: 'screen' }}>
            {Array.from({ length: 15 }).map((_, i) => (
                <circle 
                    key={i}
                    cx={(Math.random() - 0.5) * 200}
                    cy={(Math.random() - 0.5) * 200}
                    r={Math.random() * 1.5 + 0.5}
                    fill={i % 3 === 0 ? colorPrimary : colorBase}
                    opacity={Math.random() * 0.4}
                    className="particle-float"
                />
            ))}
        </g>
        <rect x="-150" y="-150" width="300" height="300" fill="url(#grid-pattern)" opacity="0.15" pointerEvents="none"></rect>
    </>
);

export const Visuals: React.FC<ShiftMetaphorProps> = ({ id, isDark, centered }) => {
  const containerRef = useRef<SVGGElement>(null);
  const colorPrimary = "#DC2626";
  const colorBase = isDark ? "#FFF" : "#000";
  const colorDim = isDark ? "#333" : "#999"; 

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Atmosphere Animation (Glow)
      gsap.to(".atmosphere-pulse", {
          scale: 1.1,
          opacity: 0.5,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
      });

      // 2. Particle Animation (Floating)
      gsap.to(".particle-float", {
          y: "random(-20, 20)",
          x: "random(-10, 10)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.1
      });

      // 3. Common Geometry Animations - SLOW & LIVELY
      gsap.to(".spin-slow", { rotation: 360, transformOrigin: "center", duration: 60, repeat: -1, ease: "linear" });
      gsap.to(".spin-fast", { rotation: -360, transformOrigin: "center", duration: 30, repeat: -1, ease: "linear" });
      gsap.to(".pulse", { scale: 1.1, opacity: 0.5, transformOrigin: "center", duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".float", { y: -10, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".scan-x", { x: 100, duration: 8, repeat: -1, ease: "linear", yoyo: true });
      gsap.fromTo(".dash-flow", { strokeDashoffset: 20 }, { strokeDashoffset: 0, duration: 4, repeat: -1, ease: "linear" });
      
      // 4. Specific Shift Animations
      if(id === "01") { // Energy
         gsap.to(".bar-pulse", { opacity: 0.6, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" });
         gsap.to(".energy-particle", { y: -5, opacity: 0.2, duration: 2, stagger: 0.5, repeat: -1, yoyo: true });
      }
      if (id === "06") { // Discovery / Molecule
         gsap.to(".atom-orbit", { rotation: 360, transformOrigin: "center", duration: 40, repeat: -1, ease: "linear", stagger: 2 });
      }
      if (id === "11") { // Intimacy
         gsap.to(".heart-beat", { scale: 1.2, duration: 2, yoyo: true, repeat: -1, ease: "back.out" });
      }

    }, containerRef);
    return () => ctx.revert();
  }, [id, isDark]);

  const renderContent = () => {
    switch (id) {
      case "01": // Energy Wall - Specific Geometry from Request
        return (
          <g>
            <Atmosphere colorPrimary={colorPrimary} colorBase={colorBase} />
            <g transform="scale(1.5)">
                <g filter="url(#blur-heavy)" opacity="0.4" style={{ mixBlendMode: 'screen' }}>
                    <rect x="-10" y="-30" width="20" height="60" fill={colorPrimary} opacity="0.2" className="bar-pulse"></rect>
                </g>
                <rect x="-30" y="-30" width="20" height="60" stroke={colorBase} strokeWidth="2" fill="none"></rect>
                <rect x="10" y="-30" width="20" height="60" stroke={colorBase} strokeWidth="2" fill="none"></rect>
                
                {/* Specific Dots from provided SVG */}
                <circle cx="-20" cy="0" r="5" fill={colorPrimary} className="energy-particle"></circle>
                <circle cx="20" cy="0" r="5" fill={colorPrimary} className="energy-particle" style={{ animationDelay: '1s' }}></circle>
                <circle cx="-35" cy="30" r="1.5" fill={colorBase} opacity="0.5" className="particle-float"></circle>
                <circle cx="15" cy="-40" r="1.5" fill={colorBase} opacity="0.5" className="particle-float"></circle>
            </g>
          </g>
        );
      case "02": // Displacement (Agents)
        return (
          <g>
            <Atmosphere colorPrimary={colorPrimary} colorBase={colorBase} />
            <g transform="scale(1.2)">
                <circle cx="-50" cy="0" r="40" fill="none" stroke={colorBase} strokeWidth="2" opacity="0.5" />
                <circle cx="50" cy="0" r="40" fill="none" stroke={colorPrimary} strokeWidth="2" className="pulse" />
                <path d="M-10 0 L10 0 M0 -10 L0 10" transform="translate(50, 0)" stroke={colorPrimary} strokeWidth="2" />
                <line x1="-50" y1="0" x2="50" y2="0" stroke={colorDim} strokeDasharray="4 4" className="dash-flow" />
            </g>
          </g>
        );
      case "03": // Sovereignty (Splinternet)
        return (
          <g>
             <Atmosphere colorPrimary={colorPrimary} colorBase={colorBase} />
             <g transform="scale(1.2)">
                <circle cx="0" cy="0" r="80" fill="none" stroke={colorDim} strokeWidth="1" strokeDasharray="10 5" />
                <path d="M0 -80 L0 80" stroke={colorPrimary} strokeWidth="2" />
                <path d="M-80 0 L80 0" stroke={colorBase} strokeWidth="1" opacity="0.5" />
                <rect x="-60" y="-60" width="40" height="40" fill="none" stroke={colorBase} strokeWidth="1" className="float" />
                <rect x="20" y="20" width="40" height="40" fill="none" stroke={colorPrimary} strokeWidth="1" className="float" style={{ animationDelay: '1s'}} />
             </g>
          </g>
        );
      case "04": // Reasoning (Tree)
        return (
          <g>
             <Atmosphere colorPrimary={colorPrimary} colorBase={colorBase} />
             <g transform="translate(0, -50) scale(1.2)">
                <circle cx="0" cy="0" r="10" fill={colorPrimary} />
                <path d="M0 10 L -40 60" stroke={colorBase} strokeWidth="1" />
                <path d="M0 10 L 40 60" stroke={colorBase} strokeWidth="1" />
                <path d="M-40 60 L -60 110" stroke={colorDim} strokeWidth="1" />
                <path d="M-40 60 L -20 110" stroke={colorDim} strokeWidth="1" />
                <circle cx="-40" cy="60" r="5" fill="none" stroke={colorBase} className="pulse" />
                <circle cx="40" cy="60" r="5" fill="none" stroke={colorBase} className="pulse" style={{ animationDelay: '0.5s'}} />
             </g>
          </g>
        );
      case "05": // Knowledge (Stack)
        return (
          <g>
             <Atmosphere colorPrimary={colorPrimary} colorBase={colorBase} />
             <g transform="scale(1.2)">
                <rect x="-40" y="-60" width="80" height="120" fill="none" stroke={colorDim} strokeWidth="1" />
                <line x1="-30" y1="-40" x2="30" y2="-40" stroke={colorBase} strokeWidth="2" />
                <line x1="-30" y1="-20" x2="10" y2="-20" stroke={colorBase} strokeWidth="2" />
                <line x1="-30" y1="0" x2="30" y2="0" stroke={colorBase} strokeWidth="2" />
                <rect x="-50" y="-10" width="100" height="20" fill={colorPrimary} opacity="0.2" className="scan-y" />
                <line x1="-60" y1="0" x2="60" y2="0" stroke={colorPrimary} strokeWidth="1" className="scan-x" />
             </g>
          </g>
        );
      case "06": // Discovery (Molecule)
        return (
          <g>
             <Atmosphere colorPrimary={colorPrimary} colorBase={colorBase} />
             <g transform="scale(1.2)">
                <circle cx="0" cy="0" r="15" fill={colorPrimary} opacity="0.8" />
                <g className="atom-orbit">
                    <circle cx="40" cy="0" r="5" fill={colorBase} />
                    <circle cx="-40" cy="0" r="5" fill={colorBase} />
                    <path d="M-40 0 A 40 40 0 0 1 40 0" fill="none" stroke={colorDim} strokeWidth="1" />
                    <path d="M-40 0 A 40 40 0 0 0 40 0" fill="none" stroke={colorDim} strokeWidth="1" />
                </g>
                <g className="atom-orbit" style={{ transform: "rotate(60deg)" }}>
                    <circle cx="40" cy="0" r="5" fill={colorBase} />
                    <path d="M-40 0 A 40 40 0 0 1 40 0" fill="none" stroke={colorDim} strokeWidth="1" />
                </g>
             </g>
          </g>
        );
      case "07": // Craft (Code)
        return (
          <g>
             <Atmosphere colorPrimary={colorPrimary} colorBase={colorBase} />
             <g transform="scale(1.2)">
                <text x="-50" y="10" fontSize="60" fill={colorDim} textAnchor="end" className="font-mono">&lt;</text>
                <text x="50" y="10" fontSize="60" fill={colorDim} textAnchor="start" className="font-mono">&gt;</text>
                <rect x="-10" y="-20" width="20" height="40" fill={colorPrimary} className="pulse" />
             </g>
          </g>
        );
      case "08": // Matter (Spatial)
        return (
          <g>
             <Atmosphere colorPrimary={colorPrimary} colorBase={colorBase} />
             <g transform="rotateX(60) scale(1.2)">
                <rect x="-40" y="-40" width="80" height="80" fill="none" stroke={colorBase} strokeWidth="2" className="spin-slow" />
                <rect x="-30" y="-30" width="60" height="60" fill="none" stroke={colorPrimary} strokeWidth="1" transform="rotate(45)" />
                <line x1="0" y1="-100" x2="0" y2="100" stroke={colorDim} strokeDasharray="5 5" />
                <line x1="-100" y1="0" x2="100" y2="0" stroke={colorDim} strokeDasharray="5 5" />
             </g>
          </g>
        );
      case "09": // Defense (Shield)
        return (
          <g>
             <Atmosphere colorPrimary={colorPrimary} colorBase={colorBase} />
             <g transform="scale(1.2)">
                <path d="M0 -60 L40 -40 V10 C40 40 0 60 0 60 C0 60 -40 40 -40 10 V-40 Z" fill="none" stroke={colorBase} strokeWidth="2" />
                <path d="M0 -50 L30 -35 V5 C30 30 0 50 0 50 C0 50 -30 30 -30 5 V-35 Z" fill="none" stroke={colorPrimary} strokeWidth="1" opacity="0.5" className="pulse" />
                <circle cx="0" cy="0" r="10" fill={colorBase} />
                <line x1="-60" y1="-60" x2="60" y2="60" stroke={colorDim} strokeWidth="1" />
                <line x1="60" y1="-60" x2="-60" y2="60" stroke={colorDim} strokeWidth="1" />
             </g>
          </g>
        );
      case "10": // Narrative (Lens)
        return (
          <g>
             <Atmosphere colorPrimary={colorPrimary} colorBase={colorBase} />
             <g transform="scale(1.2)">
                <circle cx="-30" cy="0" r="40" fill="none" stroke={colorBase} strokeWidth="1" />
                <circle cx="30" cy="0" r="40" fill="none" stroke={colorBase} strokeWidth="1" />
                <path d="M0 -25 Q 15 0 0 25 Q -15 0 0 -25" fill={colorPrimary} opacity="0.6" className="pulse" />
                <line x1="-80" y1="0" x2="80" y2="0" stroke={colorDim} strokeDasharray="2 2" />
             </g>
          </g>
        );
      case "11": // Intimacy (Heart)
        return (
          <g>
             <Atmosphere colorPrimary={colorPrimary} colorBase={colorBase} />
             <g transform="scale(1.2)">
                <path className="heart-beat" d="M0 10 C -20 -10 -40 -10 -40 10 C -40 30 -10 50 0 60 C 10 50 40 30 40 10 C 40 -10 20 -10 0 10" fill="none" stroke={colorPrimary} strokeWidth="2" transform="translate(0, -20)" />
                <circle cx="0" cy="0" r="60" fill="none" stroke={colorDim} strokeWidth="1" strokeDasharray="5 5" className="spin-slow" />
                <circle cx="0" cy="0" r="50" fill="none" stroke={colorDim} strokeWidth="0.5" />
             </g>
          </g>
        );
      default:
        return <circle cx="0" cy="0" r="50" fill="none" stroke={colorBase} />;
    }
  };

  return (
    <g ref={containerRef} transform={centered ? undefined : "translate(500, 700)"}>
       {renderContent()}
    </g>
  );
};
