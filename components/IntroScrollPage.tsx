import React, { useEffect, useRef, useState } from 'react';

interface Scene {
  id: number;
  text: string;
  subtext?: string;
}

const scenes: Scene[] = [
  {
    id: 1,
    text: 'AI is evolving.',
    subtext: 'Faster. Deeper. Smarter.'
  },
  {
    id: 2,
    text: 'Humans are reacting.',
    subtext: 'Slower. Overwhelmed. Adapting.'
  },
  {
    id: 3,
    text: 'They intersect.',
    subtext: 'And diverge.'
  },
  {
    id: 4,
    text: 'THE CONTEXT GAP',
    subtext: 'The space between capability and comprehension.'
  },
    {
    id: 5,
    text: '11 Tectonic Shifts',
    subtext: 'Mapping the fracture.'
  },
  {
    id: 6,
    text: '11 Tectonic Shifts',
    subtext: 'Mapping the fracture.'
  },
  {
    id: 7,
    text: 'This is the report.',
    subtext: 'Annual Report 2025/26 by AI Mindset'
  }
];

export const IntroScrollPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = containerRef.current.scrollHeight;
      
      const progress = Math.min(scrollTop / (fullHeight - windowHeight), 1);
      setScrollProgress(progress);
      
      const sceneIndex = Math.floor(progress * scenes.length);
      setCurrentScene(Math.min(sceneIndex, scenes.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHumanPosition = () => {
    if (currentScene === 0) return 'translate-x-[-100%]';
    if (currentScene === 1) return 'translate-x-[-20%]';
    if (currentScene === 2) return 'translate-x-[0%]';
    if (currentScene >= 3) return 'translate-x-[20%]';
    return 'translate-x-[-20%]';
  };

  const getAIPosition = () => {
    if (currentScene === 0) return 'translate-x-[100%]';
    if (currentScene === 1) return 'translate-x-[20%]';
    if (currentScene === 2) return 'translate-x-[0%]';
    if (currentScene >= 3) return 'translate-x-[-20%]';
    return 'translate-x-[20%]';
  };

  const showGap = currentScene >= 4;
  const showAvalanche = currentScene >= 5;

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-black text-white"
      style={{ height: `${scenes.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

        {/* Main Stage */}
        <div className="relative h-full w-full flex items-center justify-center">
          
          {/* Human Portrait */}
          <div 
            className={`absolute left-1/4 transition-all duration-1000 ease-out ${getHumanPosition()}`}
            style={{ transform: `translateX(${getHumanPosition()})` }}
          >
            <HumanPortrait opacity={currentScene >= 1 ? 1 : 0} />
          </div>

          {/* AI Entity */}
          <div 
            className={`absolute right-1/4 transition-all duration-1000 ease-out ${getAIPosition()}`}
            style={{ transform: `translateX(${getAIPosition()})` }}
          >
            <AIEntity opacity={currentScene >= 1 ? 1 : 0} pulse={currentScene === 0} />
          </div>

          {/* The Gap */}
          {showGap && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Gap intensity={scrollProgress} />
            </div>
          )}

          {/* Information Avalanche */}
          {showAvalanche && (
            <div className="absolute inset-0">
              <InformationAvalanche density={scrollProgress} />
            </div>
          )}

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            <div className="text-center px-8 transition-all duration-700">
              <h1 
                className="text-6xl md:text-8xl font-bold mb-6 transition-all duration-500"
                style={{ 
                  opacity: currentScene >= 0 ? 1 : 0,
                  transform: `translateY(${currentScene >= 0 ? 0 : 20}px)`
                }}
              >
                {scenes[currentScene]?.text}
              </h1>
              {scenes[currentScene]?.subtext && (
                <p 
                  className="text-xl md:text-2xl text-gray-400 transition-all duration-500 delay-200"
                  style={{ 
                    opacity: currentScene >= 0 ? 1 : 0,
                    transform: `translateY(${currentScene >= 0 ? 0 : 20}px)`
                  }}
                >
                  {scenes[currentScene].subtext}
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        {currentScene < scenes.length - 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="animate-bounce text-gray-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14m0 0l7-7m-7 7l-7-7" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const HumanPortrait: React.FC<{ opacity: number }> = ({ opacity }) => {
  return (
    <svg 
      width="300" 
      height="400" 
      viewBox="0 0 300 400"
      style={{ opacity, transition: 'opacity 1s' }}
    >
      {/* Simple human silhouette */}
      <g>
        {/* Head */}
        <circle cx="150" cy="80" r="50" fill="#E85D4D" opacity="0.9"/>
        {/* Body */}
        <path 
          d="M 150 130 L 150 280 M 150 160 L 100 220 M 150 160 L 200 220 M 150 280 L 110 380 M 150 280 L 190 380" 
          stroke="#E85D4D" 
          strokeWidth="20" 
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
      </g>
    </svg>
  );
};

const AIEntity: React.FC<{ opacity: number; pulse: boolean }> = ({ opacity, pulse }) => {
  return (
    <svg 
      width="300" 
      height="400" 
      viewBox="0 0 300 400"
      style={{ opacity, transition: 'opacity 1s' }}
      className={pulse ? 'animate-pulse' : ''}
    >
      {/* Geometric light entity */}
      <g>
        {/* Core sphere */}
        <circle cx="150" cy="200" r="60" fill="none" stroke="#4D9DE8" strokeWidth="2" opacity="0.6"/>
        <circle cx="150" cy="200" r="50" fill="none" stroke="#4D9DE8" strokeWidth="2" opacity="0.7"/>
        <circle cx="150" cy="200" r="40" fill="none" stroke="#4D9DE8" strokeWidth="2" opacity="0.8"/>
        
        {/* Inner glow */}
        <circle cx="150" cy="200" r="30" fill="#4D9DE8" opacity="0.3"/>
        
        {/* Orbital lines */}
        <ellipse cx="150" cy="200" rx="80" ry="40" fill="none" stroke="#4D9DE8" strokeWidth="1" opacity="0.5"/>
        <ellipse cx="150" cy="200" rx="40" ry="80" fill="none" stroke="#4D9DE8" strokeWidth="1" opacity="0.5"/>
        
        {/* Nodes */}
        <circle cx="150" cy="140" r="4" fill="#4D9DE8"/>
        <circle cx="150" cy="260" r="4" fill="#4D9DE8"/>
        <circle cx="210" cy="200" r="4" fill="#4D9DE8"/>
        <circle cx="90" cy="200" r="4" fill="#4D9DE8"/>
        
        {/* Energy flow lines */}
        <path d="M 150 140 L 150 100" stroke="#4D9DE8" strokeWidth="1" opacity="0.6" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite"/>
        </path>
        <path d="M 150 260 L 150 300" stroke="#4D9DE8" strokeWidth="1" opacity="0.6" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite"/>
        </path>
      </g>
    </svg>
  );
};

const Gap: React.FC<{ intensity: number }> = ({ intensity }) => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 1000 1000"
      className="absolute inset-0"
      style={{ opacity: intensity }}
    >
      {/* Vertical gap/fracture */}
      <g>
        <path 
          d="M 500 0 Q 480 250 500 500 Q 520 750 500 1000" 
          stroke="#E85D4D" 
          strokeWidth="3" 
          fill="none"
          opacity="0.8"
        />
        <path 
          d="M 495 0 Q 475 250 495 500 Q 515 750 495 1000" 
          stroke="#1a1a1a" 
          strokeWidth="10" 
          fill="none"
          opacity="0.9"
        />
        <path 
          d="M 505 0 Q 525 250 505 500 Q 485 750 505 1000" 
          stroke="#1a1a1a" 
          strokeWidth="10" 
          fill="none"
          opacity="0.9"
        />
        
        {/* Glitch effect */}
        <rect x="480" y="400" width="40" height="2" fill="#E85D4D" opacity="0.6">
          <animate attributeName="y" values="400;410;400" dur="0.3s" repeatCount="indefinite"/>
        </rect>
        <rect x="480" y="600" width="40" height="2" fill="#E85D4D" opacity="0.6">
          <animate attributeName="y" values="600;590;600" dur="0.4s" repeatCount="indefinite"/>
        </rect>
      </g>
    </svg>
  );
};

const InformationAvalanche: React.FC<{ density: number }> = ({ density }) => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 1000 1000"
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: density * 0.5 }}
    >
      {[...Array(30)].map((_, i) => {
        const x = Math.random() * 1000;
        const y = Math.random() * 1000;
        const delay = Math.random() * 2;
        const duration = 2 + Math.random() * 2;
        
        return (
          <g key={i}>
            <text 
              x={x} 
              y={y} 
              fill="#4D9DE8" 
              fontSize="12" 
              opacity="0.3"
            >
              {['01', '10', '11', 'AI', 'GPT', 'LLM', 'CODE'][i % 7]}
              <animateTransform
                attributeName="transform"
                type="translate"
                from={`0 ${-100}`}
                to={`0 ${1000}`}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.3;0"
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default IntroScrollPage;
