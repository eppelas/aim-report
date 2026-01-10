import React from 'react';
import { motion } from 'framer-motion';
import type { VisualType } from '../types';

export type VisualProps = {
  className?: string;
};

// CONFIG (aligned with Swiss red/white/black used across this deck)
const TRANSITION = { duration: 2, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' as const };
const LOOP = { duration: 3, repeat: Infinity, ease: 'linear' as const };
const RED = '#DC2626';
// BLACK constant removed - using currentColor for dark elements

// --- ORIGINALS ---

export const GapVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full max-h-[50vh]">
    <line x1="10" y1="80" x2="60" y2="80" stroke="currentColor" strokeWidth="2" />
    <motion.circle cx="75" cy="80" r="5" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray="20 10" animate={{ rotate: 360 }} transition={LOOP} />
    <motion.path d="M10 80 Q 50 80 90 10" fill="transparent" stroke={RED} strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} />
  </svg>
);

export const FilterVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full max-h-[50vh]">
    <g fill="currentColor" opacity="0.2">
      {Array.from({ length: 64 }).map((_, i) => (
        <rect key={i} x={10 + (i % 8) * 8} y={5 + Math.floor(i / 8) * 8} width="4" height="4" />
      ))}
    </g>
    <path d="M10 75 L45 85 L45 95 L55 95 L55 85 L90 75" fill="none" stroke="currentColor" strokeWidth="1" />
    <motion.rect x="46" y="86" width="8" height="8" fill={RED} animate={{ opacity: [0.5, 1, 0.5] }} transition={TRANSITION} />
  </svg>
);

export const TrustVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full max-h-[50vh]">
    <motion.circle cx="50" cy="50" r="10" fill="currentColor" />
    <motion.circle cx="50" cy="50" r="20" stroke={RED} strokeWidth="2" fill="none" strokeDasharray="10 5" animate={{ rotate: -360 }} transition={{ ...LOOP, duration: 10 }} />
    <motion.path d="M50 10 L80 30 V60 L50 90 L20 60 V30 Z" fill="none" stroke={RED} strokeWidth="3" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} />
  </svg>
);

export const ContextVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full max-h-[50vh]">
    <g stroke="currentColor" strokeWidth="1" opacity="0.3">
      {Array.from({ length: 15 }).map((_, i) => (
        <line key={i} x1={Math.random() * 100} y1={Math.random() * 100} x2={Math.random() * 100} y2={Math.random() * 100} />
      ))}
    </g>
    <motion.rect x="30" y="30" width="40" height="40" stroke={RED} strokeWidth="3" fill="none" animate={{ scale: [1, 1.05, 1] }} transition={TRANSITION} />
    <rect x="45" y="45" width="10" height="10" fill={RED} />
  </svg>
);

export const CentaurVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full max-h-[50vh]">
    <defs>
      <pattern id="gac_grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect x="10" y="10" width="40" height="80" fill="url(#gac_grid)" stroke="currentColor" strokeWidth="2" />
    <motion.path
      d="M50 10 C 80 10, 80 50, 60 50 C 40 50, 80 90, 50 90"
      fill="none"
      stroke={RED}
      strokeWidth="4"
      strokeLinecap="round"
      animate={{
        d: [
          'M50 10 C 80 10, 80 50, 60 50 C 40 50, 80 90, 50 90',
          'M50 10 C 70 20, 90 40, 60 50 C 30 60, 70 80, 50 90',
          'M50 10 C 80 10, 80 50, 60 50 C 40 50, 80 90, 50 90',
        ],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  </svg>
);

export const MeaningVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full max-h-[50vh]">
    <motion.circle cx="30" cy="30" r="5" stroke="currentColor" fill="none" animate={{ y: -10 }} transition={TRANSITION} />
    <motion.circle cx="70" cy="20" r="8" stroke="currentColor" fill="none" animate={{ y: -15 }} transition={{ ...TRANSITION, delay: 0.5 }} />
    <path d="M50 40 L50 80" stroke={RED} strokeWidth="2" />
    <motion.rect x="40" y="80" width="20" height="15" fill={RED} initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, type: 'spring' }} />
  </svg>
);

// --- DYNAMICS ---

export const VelocityVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {[0, 20, 40].map((y, i) => (
      <motion.line
        key={i}
        x1="-20"
        y1={30 + y}
        x2="40"
        y2={30 + y}
        stroke={RED}
        strokeWidth="4"
        strokeLinecap="round"
        animate={{ x: [0, 150] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
      />
    ))}
  </svg>
);

export const StagnationVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none" />
    <motion.rect x="40" y="40" width="20" height="20" fill={RED} animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
  </svg>
);

export const OrbitVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="15" fill="currentColor" />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
    <motion.circle
      cx="50"
      cy="15"
      r="5"
      fill={RED}
      animate={{ rotate: 360 }}
      style={{ originX: '50px', originY: '50px' }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />
  </svg>
);

export const CollisionVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.circle cx="20" cy="50" r="10" fill="currentColor" animate={{ x: [0, 25, 0] }} transition={TRANSITION} />
    <motion.circle cx="80" cy="50" r="10" fill={RED} animate={{ x: [0, -25, 0] }} transition={TRANSITION} />
    <motion.path d="M45 40 L55 60 M55 40 L45 60" stroke={RED} strokeWidth="2" opacity="0" animate={{ opacity: [0, 1, 0] }} transition={TRANSITION} />
  </svg>
);

export const DivergenceVisual = () => (
  <svg viewBox="0 0 200 120" className="w-full h-full max-w-xl">
    {/* Background grid */}
    <defs>
      <pattern id="divGrid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      </pattern>
    </defs>
    <rect width="200" height="120" fill="url(#divGrid)" />

    {/* Origin point */}
    <circle cx="20" cy="60" r="4" fill="currentColor" />

    {/* Shared start line */}
    <line x1="20" y1="60" x2="50" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.5" />

    {/* Machine curve - exponential rise (RED) */}
    <motion.path
      d="M50 60 C 80 60, 100 50, 130 30 C 150 18, 170 10, 190 5"
      fill="none"
      stroke={RED}
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    />

    {/* Human curve - slower adaptation (dark) */}
    <motion.path
      d="M50 60 C 80 60, 100 70, 130 85 C 150 95, 170 105, 190 110"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
    />

    {/* Gap visualization - vertical dashed lines */}
    {[90, 130, 160].map((x, i) => {
      const machineY = x === 90 ? 50 : x === 130 ? 30 : 12;
      const humanY = x === 90 ? 70 : x === 130 ? 85 : 102;
      return (
        <motion.line
          key={i}
          x1={x}
          y1={machineY}
          x2={x}
          y2={humanY}
          stroke={RED}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.8 + i * 0.2 }}
        />
      );
    })}

    {/* GAP label with pulse */}
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.2, duration: 0.4 }}
    >
      <rect x="125" y="50" width="40" height="20" fill="white" stroke={RED} strokeWidth="1.5" rx="2" />
      <text x="145" y="64" fontSize="10" fontFamily="monospace" fill={RED} textAnchor="middle" fontWeight="bold">
        GAP
      </text>
    </motion.g>

    {/* Pulsing ring around GAP */}
    <motion.circle
      cx="145"
      cy="60"
      r="25"
      fill="none"
      stroke={RED}
      strokeWidth="1"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
      transition={{ duration: 2.5, repeat: Infinity, delay: 2.5 }}
    />

    {/* Labels */}
    <motion.text
      x="185"
      y="8"
      fontSize="8"
      fontFamily="monospace"
      fill={RED}
      fontWeight="bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      AI
    </motion.text>
    <motion.text
      x="178"
      y="115"
      fontSize="8"
      fontFamily="monospace"
      fill="currentColor"
      fontWeight="bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
    >
      HUMAN
    </motion.text>
  </svg>
);

export const ConvergenceVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M10 20 Q 30 50 60 50" fill="none" stroke="currentColor" strokeWidth="3" />
    <path d="M10 80 Q 30 50 60 50" fill="none" stroke={RED} strokeWidth="3" />
    <motion.line x1="60" y1="50" x2="90" y2="50" stroke={RED} strokeWidth="3" strokeDasharray="5 2" animate={{ strokeDashoffset: -20 }} transition={LOOP} />
  </svg>
);

export const LoopVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.path d="M30 50 C 30 30, 70 30, 70 50 C 70 70, 30 70, 30 50 Z" stroke={RED} strokeWidth="3" fill="none" strokeDasharray="10 10" animate={{ strokeDashoffset: 100 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
  </svg>
);

export const CycleVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <g transform="translate(50,50)">
      {[0, 90, 180, 270].map((_, i) => (
        <motion.rect key={i} x="-5" y="-35" width="10" height="10" fill={i === 0 ? RED : 'currentColor'} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' as const }} />
      ))}
    </g>
  </svg>
);

export const LinearVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <line x1="10" y1="80" x2="90" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
    <motion.circle cx="10" cy="80" r="6" fill={RED} animate={{ cx: 90, cy: 20 }} transition={TRANSITION} />
  </svg>
);

export const ExponentialVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M10 90 Q 50 90 90 10" stroke="currentColor" strokeWidth="1" fill="none" />
    <motion.circle r="6" fill={RED} animate={{ cx: [10, 50, 90], cy: [90, 85, 10] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeIn' }} />
  </svg>
);

// --- STRUCTURE ---

export const NetworkVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="1" />
    <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="1" />
    <motion.circle cx="50" cy="50" r="8" fill={RED} animate={{ scale: [1, 1.2, 1] }} transition={TRANSITION} />
    <circle cx="20" cy="20" r="5" fill="currentColor" />
    <circle cx="80" cy="80" r="5" fill="currentColor" />
    <circle cx="80" cy="20" r="5" fill="currentColor" />
    <circle cx="20" cy="80" r="5" fill="currentColor" />
  </svg>
);

export const SiloVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="20" width="20" height="60" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="60" y="20" width="20" height="60" stroke="currentColor" strokeWidth="2" fill="none" />
    <motion.circle cx="30" cy="50" r="5" fill={RED} animate={{ y: [0, 20, 0] }} transition={TRANSITION} />
    <motion.circle cx="70" cy="50" r="5" fill={RED} animate={{ y: [0, -20, 0] }} transition={{ ...TRANSITION, delay: 0.5 }} />
  </svg>
);

export const HierarchyVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="45" y="10" width="10" height="10" fill={RED} />
    <g fill="currentColor">
      <rect x="35" y="30" width="10" height="10" />
      <rect x="55" y="30" width="10" height="10" />
      <rect x="25" y="50" width="10" height="10" />
      <rect x="45" y="50" width="10" height="10" />
      <rect x="65" y="50" width="10" height="10" />
    </g>
    <motion.path d="M50 20 L50 30 M40 40 L30 50" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={TRANSITION} />
  </svg>
);

export const FlatVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.line x1="10" y1="50" x2="90" y2="50" stroke={RED} strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={TRANSITION} />
    <circle cx="20" cy="50" r="5" fill="currentColor" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
    <circle cx="80" cy="50" r="5" fill="currentColor" />
  </svg>
);

export const GridVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <g fill="currentColor" opacity="0.3">
      {Array.from({ length: 16 }).map((_, i) => (
        <circle key={i} cx={20 + (i % 4) * 20} cy={20 + Math.floor(i / 4) * 20} r="2" />
      ))}
    </g>
    <motion.rect x="15" y="15" width="30" height="30" stroke={RED} strokeWidth="2" fill="none" animate={{ x: [0, 40, 0], y: [0, 40, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
  </svg>
);

export const StackVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {[0, 10, 20].map((y, i) => (
      <motion.rect key={i} x="30" y={60 - y} width="40" height="8" fill={i === 2 ? RED : 'currentColor'} animate={{ y: [60 - y, 50 - y, 60 - y] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }} />
    ))}
  </svg>
);

export const QueueVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" />
    {[0, 20, 40, 60].map((x, i) => (
      <motion.circle key={i} cx={20 + x} cy="50" r="5" fill={i === 0 ? RED : 'currentColor'} animate={{ cx: [20 + x, 40 + x] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
    ))}
  </svg>
);

export const BridgeVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="10" y="40" width="20" height="40" fill="currentColor" />
    <rect x="70" y="40" width="20" height="40" fill="currentColor" />
    <motion.line x1="30" y1="45" x2="70" y2="45" stroke={RED} strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={TRANSITION} />
  </svg>
);

export const BarrierVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="4" />
    <motion.circle cx="30" cy="50" r="8" fill={RED} animate={{ cx: [20, 40, 20] }} transition={{ duration: 0.5, repeat: Infinity }} />
  </svg>
);

export const PortalVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
    <motion.circle cx="50" cy="50" r="0" fill={RED} opacity="0.5"
      animate={{ r: [0, 30] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }} />
  </svg>
);

// --- INTERACTION ---

export const SyncVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.circle cx="30" cy="50" r="10" fill="currentColor" animate={{ scale: [1, 1.2, 1] }} transition={TRANSITION} />
    <motion.circle cx="70" cy="50" r="10" fill={RED} animate={{ scale: [1, 1.2, 1] }} transition={TRANSITION} />
    <line x1="40" y1="50" x2="60" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

export const AsyncVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.rect x="25" y="45" width="10" height="10" fill="currentColor" animate={{ y: [0, -20, 0] }} transition={TRANSITION} />
    <motion.rect x="65" y="45" width="10" height="10" fill={RED} animate={{ y: [0, 20, 0] }} transition={TRANSITION} />
  </svg>
);

export const BalanceVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M45 80 L55 80 L50 70 Z" fill="currentColor" />
    <motion.line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="2" animate={{ rotate: [-10, 10, -10] }} transition={TRANSITION} />
    <motion.circle cx="20" cy="60" r="8" fill={RED} animate={{ y: [-15, 5, -15] }} transition={TRANSITION} />
    <motion.rect x="75" y="52" width="10" height="10" fill="currentColor" animate={{ y: [5, -15, 5] }} transition={TRANSITION} />
  </svg>
);

export const FrictionVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <g transform="translate(45, 20)">
      <motion.rect width="10" height="60" fill="currentColor" />
    </g>
    <g transform="translate(55, 20)">
      <motion.rect width="10" height="60" fill={RED} animate={{ y: [0, 10, -5, 5, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
    </g>
    <path d="M50 30 L60 40 M50 50 L60 60" stroke="white" strokeWidth="2" />
  </svg>
);

export const EchoVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="5" fill={RED} />
    {[1, 2, 3].map(i => (
      <motion.circle key={i} cx="50" cy="50" r={5 + i * 10} stroke="currentColor" strokeWidth="1" fill="none"
        animate={{ opacity: [1, 0] }} transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }} />
    ))}
  </svg>
);

export const MirrorVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
    <motion.rect x="20" y="40" width="20" height="20" fill="currentColor" animate={{ x: [0, 5, 0] }} transition={TRANSITION} />
    <motion.rect x="60" y="40" width="20" height="20" stroke={RED} strokeWidth="2" fill="none" animate={{ x: [0, -5, 0] }} transition={TRANSITION} />
  </svg>
);

export const ShadowVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="40" cy="40" r="12" fill={RED} />
    <motion.circle cx="60" cy="60" r="12" fill="currentColor" opacity="0.25" animate={{ x: [0, -4, 0], y: [0, -4, 0] }} transition={TRANSITION} />
  </svg>
);

export const SourceVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="5" fill="currentColor" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((r, i) => (
      <motion.line key={i} x1="50" y1="50" x2="50" y2="20" stroke={RED} strokeWidth="2" transform={`rotate(${r} 50 50)`}
        strokeDasharray="30" animate={{ strokeDashoffset: [30, 0] }} transition={{ duration: 1, repeat: Infinity }} />
    ))}
  </svg>
);

export const TargetVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} />
    <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" />
    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" />
    <motion.circle cx="50" cy="50" r="5" fill={RED} animate={{ scale: [1, 1.5, 1] }} transition={TRANSITION} />
  </svg>
);

export const ExchangeVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.path d="M20 40 H80" stroke={RED} strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={TRANSITION} />
    <motion.path d="M80 60 H20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ ...TRANSITION, delay: 0.4 }} />
    <polygon points="80,40 72,36 72,44" fill={RED} />
    <polygon points="20,60 28,56 28,64" fill="currentColor" />
  </svg>
);

// --- STATE ---

export const ClarityVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.circle cx="50" cy="50" r="20" fill={RED} animate={{ filter: ['blur(10px)', 'blur(0px)', 'blur(10px)'] }} transition={TRANSITION} />
  </svg>
);

export const BlurVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.circle cx="50" cy="50" r="20" fill={RED} animate={{ opacity: [0.2, 0.5, 0.2] }} transition={TRANSITION} />
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
  </svg>
);

export const NoiseVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.circle
        key={i}
        cx={10 + Math.random() * 80}
        cy={10 + Math.random() * 80}
        r={Math.random() * 2 + 1}
        fill={i % 4 === 0 ? RED : 'currentColor'}
        animate={{ opacity: [0.1, 0.6, 0.1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() }}
      />
    ))}
  </svg>
);

export const SignalVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.path d="M10 70 L30 50 L50 55 L70 30 L90 20" stroke={RED} strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={TRANSITION} />
  </svg>
);

export const OverloadVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="30" y="20" width="40" height="60" stroke="currentColor" strokeWidth="2" fill="none" />
    <motion.rect x="30" y="80" width="40" height="0" fill={RED} animate={{ height: [0, 60], y: [80, 20] }} transition={{ duration: 2, repeat: Infinity }} />
  </svg>
);

export const EmptyVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
    <motion.line x1="20" y1="80" x2="80" y2="80" stroke={RED} strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={TRANSITION} />
  </svg>
);

export const LockedVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="30" y="45" width="40" height="35" stroke="currentColor" strokeWidth="2" fill="none" />
    <motion.path d="M40 45 V35 C40 25 60 25 60 35 V45" stroke={RED} strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={TRANSITION} />
  </svg>
);

export const UnlockedVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="30" y="45" width="40" height="35" stroke="currentColor" strokeWidth="2" fill="none" />
    <motion.path d="M40 45 V35 C40 25 60 25 60 35" stroke={RED} strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={TRANSITION} />
  </svg>
);

export const FocusVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.path d="M30 30 L40 30 M30 30 L30 40" stroke={RED} strokeWidth="2" animate={{ x: [0, 10, 0], y: [0, 10, 0] }} transition={TRANSITION} />
    <motion.path d="M70 30 L60 30 M70 30 L70 40" stroke={RED} strokeWidth="2" animate={{ x: [0, -10, 0], y: [0, 10, 0] }} transition={TRANSITION} />
    <motion.path d="M30 70 L40 70 M30 70 L30 60" stroke={RED} strokeWidth="2" animate={{ x: [0, 10, 0], y: [0, -10, 0] }} transition={TRANSITION} />
    <motion.path d="M70 70 L60 70 M70 70 L70 60" stroke={RED} strokeWidth="2" animate={{ x: [0, -10, 0], y: [0, -10, 0] }} transition={TRANSITION} />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
  </svg>
);

export const SearchVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="45" cy="45" r="15" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="55" y1="55" x2="70" y2="70" stroke="currentColor" strokeWidth="2" />
    <motion.line x1="35" y1="35" x2="55" y2="55" stroke={RED} strokeWidth="2" animate={{ rotate: [0, 90, 0] }} style={{ originX: '45px', originY: '45px' }} transition={TRANSITION} />
  </svg>
);

// --- HUMAN / ORGANIC ---

export const PulseVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.circle cx="50" cy="50" r="20" fill={RED} animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.4, 0.8] }} transition={{ duration: 1, repeat: Infinity }} />
  </svg>
);

export const GrowthVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {[0, 1, 2, 3].map((i) => (
      <motion.rect key={i} x={20 + i * 15} y={70 - i * 12} width="10" height={10 + i * 12} fill={i === 3 ? RED : 'currentColor'} opacity={i === 3 ? 1 : 0.25} animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }} />
    ))}
  </svg>
);

export const DecayVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {[0, 1, 2, 3].map((i) => (
      <motion.rect key={i} x={20 + i * 15} y={30 + i * 12} width="10" height={40 - i * 10} fill={i === 0 ? RED : 'currentColor'} opacity={i === 0 ? 1 : 0.25} animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }} />
    ))}
  </svg>
);

export const SparkVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.rect x="45" y="45" width="10" height="10" fill={RED} animate={{ rotate: [0, 45, 0], scale: [1, 1.2, 1] }} style={{ originX: '50px', originY: '50px' }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
    {[0, 60, 120, 180, 240, 300].map((r, i) => (
      <motion.line
        key={i}
        x1="50"
        y1="50"
        x2="50"
        y2="20"
        stroke={RED}
        strokeWidth="2"
        transform={`rotate(${r} 50 50)`}
        animate={{ strokeDasharray: ['0 30', '30 0', '0 30'] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: Math.random() * 0.2 }}
      />
    ))}
  </svg>
);

export const BreathVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.path
      d="M30 50 Q 50 30 70 50 Q 50 70 30 50"
      fill={RED}
      opacity="0.2"
      animate={{
        d: [
          'M30 50 Q 50 30 70 50 Q 50 70 30 50',
          'M20 50 Q 50 10 80 50 Q 50 90 20 50',
          'M30 50 Q 50 30 70 50 Q 50 70 30 50',
        ],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
  </svg>
);

// --- LOOP-SPECIFIC METAPHORS (from gac-c) ---

// LOOP 1: Audit / Steps / Verification - System-2 Reasoning
export const AuditVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Background grid pattern */}
    <defs>
      <pattern id="auditGrid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#auditGrid)" />

    {/* Flowing data stream */}
    <motion.path
      d="M0 50 H100"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="8 4"
      opacity="0.4"
      animate={{ strokeDashoffset: [-50, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />

    {/* The magnifying glass / audit window with glow */}
    <motion.g animate={{ x: [0, 45, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
      {/* Glow effect */}
      <motion.rect
        x="22" y="32" width="36" height="36" rx="6"
        fill={RED} opacity="0.1"
        animate={{ opacity: [0.05, 0.2, 0.05], scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <rect x="25" y="35" width="30" height="30" rx="4" stroke={RED} strokeWidth="2.5" fill="none" />

      {/* Scanning line */}
      <motion.line
        x1="28" y1="40" x2="52" y2="40"
        stroke={RED} strokeWidth="1" opacity="0.6"
        animate={{ y1: [40, 60, 40], y2: [40, 60, 40] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Checkmark animation */}
      <motion.path
        d="M32 50 L38 56 L48 44"
        stroke={RED}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
      />
    </motion.g>

    {/* Data points with pulse */}
    {[15, 35, 55, 75, 90].map((x, i) => (
      <motion.g key={i}>
        <motion.circle
          cx={x} cy="50" r="4"
          fill="currentColor"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
        <circle cx={x} cy="50" r="2" fill="currentColor" />
      </motion.g>
    ))}
  </svg>
);

// LOOP 2: Tangle / Orchestration / Overload
export const TangleVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Multiple chaotic connection lines */}
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <motion.path
        key={i}
        d={`M${10 + i * 12} 15 Q ${50 + (i % 2 ? 25 : -25)} ${30 + i * 5} ${10 + i * 12} 85`}
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        animate={{
          d: [
            `M${10 + i * 12} 15 Q ${50 + (i % 2 ? 25 : -25)} ${30 + i * 5} ${10 + i * 12} 85`,
            `M${10 + i * 12} 15 Q ${50 - (i % 2 ? 25 : -25)} ${50 + i * 3} ${10 + i * 12} 85`,
            `M${10 + i * 12} 15 Q ${50 + (i % 2 ? 25 : -25)} ${30 + i * 5} ${10 + i * 12} 85`
          ]
        }}
        transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}

    {/* Horizontal chaos lines */}
    {[1, 2, 3].map((i) => (
      <motion.path
        key={`h${i}`}
        d={`M10 ${25 + i * 20} Q 50 ${35 + i * 15} 90 ${25 + i * 20}`}
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.25"
        animate={{
          d: [
            `M10 ${25 + i * 20} Q 50 ${35 + i * 15} 90 ${25 + i * 20}`,
            `M10 ${25 + i * 20} Q 50 ${15 + i * 15} 90 ${25 + i * 20}`
          ]
        }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror", delay: i * 0.3 }}
      />
    ))}

    {/* The Red Knot - pulsing center */}
    <motion.circle
      cx="50" cy="50" r="20"
      fill={RED} opacity="0.1"
      animate={{ r: [18, 25, 18], opacity: [0.05, 0.15, 0.05] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.circle
      cx="50" cy="50" r="15"
      stroke={RED}
      strokeWidth="2.5"
      fill="none"
      animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Animated X inside */}
    <motion.path
      d="M40 40 L60 60"
      stroke={RED}
      strokeWidth="3"
      strokeLinecap="round"
      animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
    />
    <motion.path
      d="M60 40 L40 60"
      stroke={RED}
      strokeWidth="3"
      strokeLinecap="round"
      animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, delay: 0.3 }}
    />

    {/* Warning pulse rings */}
    {[0, 1, 2].map((i) => (
      <motion.circle
        key={`ring${i}`}
        cx="50" cy="50" r="15"
        stroke={RED}
        strokeWidth="1"
        fill="none"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
      />
    ))}
  </svg>
);

// LOOP 3: Shield / Sovereignty
export const ShieldVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Outer chaos - attacks being deflected */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <motion.line
        key={i}
        x1={50 + Math.cos((angle * Math.PI) / 180) * 48}
        y1={50 + Math.sin((angle * Math.PI) / 180) * 48}
        x2={50 + Math.cos((angle * Math.PI) / 180) * 38}
        y2={50 + Math.sin((angle * Math.PI) / 180) * 38}
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
        animate={{
          x1: [50 + Math.cos((angle * Math.PI) / 180) * 55, 50 + Math.cos((angle * Math.PI) / 180) * 38],
          y1: [50 + Math.sin((angle * Math.PI) / 180) * 55, 50 + Math.sin((angle * Math.PI) / 180) * 38],
          opacity: [0.6, 0]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}

    {/* Shield glow */}
    <motion.circle
      cx="50" cy="50" r="30"
      fill={RED}
      opacity="0.05"
      animate={{ r: [28, 32, 28], opacity: [0.03, 0.1, 0.03] }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* The Shield - rotating protection ring */}
    <motion.circle
      cx="50" cy="50" r="30"
      stroke={RED}
      strokeWidth="3"
      fill="none"
      strokeDasharray="15 8"
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />

    {/* Inner shield layer */}
    <motion.circle
      cx="50" cy="50" r="22"
      stroke={RED}
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="8 4"
      opacity="0.6"
      animate={{ rotate: -360 }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    />

    {/* The Core - protected data */}
    <motion.circle
      cx="50" cy="50" r="10"
      fill="currentColor"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* Core highlight */}
    <circle cx="47" cy="47" r="3" fill="currentColor" opacity="0.3" />

    {/* Pulse effect when deflecting */}
    <motion.circle
      cx="50" cy="50" r="30"
      stroke={RED}
      strokeWidth="2"
      fill="none"
      initial={{ opacity: 0.5, scale: 1 }}
      animate={{ opacity: [0.5, 0], scale: [1, 1.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

// LOOP 4: Factory / Synthetic Data
export const FactoryVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Background machinery */}
    <rect x="5" y="15" width="90" height="55" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" rx="2" />

    {/* Gears */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
      <circle cx="20" cy="30" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <rect key={i} x="17" y="20" width="6" height="4" fill="currentColor" opacity="0.4" transform={`rotate(${angle} 20 30)`} />
      ))}
    </motion.g>

    <motion.g animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
      <circle cx="35" cy="25" r="5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
    </motion.g>

    {/* Production conveyor belt */}
    <rect x="5" y="72" width="90" height="8" fill="currentColor" opacity="0.15" />
    <motion.g animate={{ x: [-20, 0] }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}>
      {[0, 20, 40, 60, 80, 100].map((x, i) => (
        <line key={i} x1={x} y1="72" x2={x} y2="80" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      ))}
    </motion.g>

    {/* Data items being produced */}
    {[0, 1, 2, 3].map((i) => (
      <motion.g key={i}>
        <motion.rect
          x="5"
          y="55"
          width="12"
          height="12"
          stroke={RED}
          strokeWidth="2"
          fill="none"
          rx="1"
          animate={{ x: [0, 25, 50, 75], y: [55, 55, 55, 55], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: "linear" }}
        />
        {/* Data pattern inside */}
        <motion.g animate={{ x: [0, 25, 50, 75], opacity: [0, 1, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: "linear" }}>
          <line x1="8" y1="58" x2="14" y2="58" stroke={RED} strokeWidth="1" opacity="0.5" />
          <line x1="8" y1="61" x2="12" y2="61" stroke={RED} strokeWidth="1" opacity="0.5" />
          <line x1="8" y1="64" x2="14" y2="64" stroke={RED} strokeWidth="1" opacity="0.5" />
        </motion.g>
      </motion.g>
    ))}

    {/* The Stamp / Press with impact effect */}
    <motion.g>
      <motion.rect
        x="42" y="15" width="16" height="35"
        fill="currentColor"
        animate={{ y: [15, 32, 15] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Stamp face */}
      <motion.rect
        x="44" y="48" width="12" height="4"
        fill={RED}
        animate={{ y: [48, 65, 48], opacity: [1, 0.5, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.g>

    {/* Spark effect on stamp */}
    <motion.g animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity }}>
      <line x1="38" y1="65" x2="32" y2="60" stroke={RED} strokeWidth="1.5" />
      <line x1="62" y1="65" x2="68" y2="60" stroke={RED} strokeWidth="1.5" />
    </motion.g>

    {/* Output indicator */}
    <motion.text
      x="85" y="65"
      fontSize="8"
      fontFamily="monospace"
      fill={RED}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      ✓
    </motion.text>
  </svg>
);

// LOOP 5: Whisper / Privacy / Hidden
export const WhisperVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Public Layer - visible but faded outer world */}
    <g opacity="0.15">
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
      {/* Grid of "visible" data */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={i} x1={10 + (i % 5) * 20} y1={Math.floor(i / 5) * 25 + 15} x2={10 + (i % 5) * 20 + 12} y2={Math.floor(i / 5) * 25 + 15} stroke="currentColor" strokeWidth="1" />
      ))}
    </g>

    {/* Encryption particles floating around */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <motion.text
        key={i}
        x={20 + i * 12}
        y={20 + (i % 3) * 25}
        fontSize="6"
        fontFamily="monospace"
        fill="currentColor"
        opacity="0.2"
        animate={{ y: [20 + (i % 3) * 25, 25 + (i % 3) * 25, 20 + (i % 3) * 25], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
      >
        {['*', '#', '&', '%', '@', '!'][i]}
      </motion.text>
    ))}

    {/* Private vault glow */}
    <motion.rect
      x="30" y="30" width="40" height="40" rx="4"
      fill={RED}
      opacity="0.05"
      animate={{ opacity: [0.03, 0.1, 0.03], scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* Private Layer - the protected zone */}
    <rect x="32" y="32" width="36" height="36" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />

    {/* Inner secure data */}
    <motion.rect
      x="38" y="42" width="24" height="18"
      fill={RED}
      opacity="0.15"
      animate={{ opacity: [0.1, 0.25, 0.1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* Data lines inside vault */}
    {[0, 1, 2].map((i) => (
      <motion.line
        key={i}
        x1="42" y1={47 + i * 5}
        x2="58" y2={47 + i * 5}
        stroke={RED}
        strokeWidth="1.5"
        animate={{ opacity: [0.3, 0.8, 0.3], x1: [42, 44, 42], x2: [58, 56, 58] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}

    {/* Lock icon - animated */}
    <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
      {/* Lock body */}
      <rect x="44" y="30" width="12" height="10" rx="1" fill="currentColor" />
      {/* Lock shackle */}
      <motion.path
        d="M46 30 V26 A 4 4 0 0 1 54 26 V30"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Keyhole */}
      <circle cx="50" cy="35" r="2" fill={RED} />
    </motion.g>

    {/* Secure indicator pulse */}
    <motion.circle
      cx="50" cy="35"
      r="8"
      stroke={RED}
      strokeWidth="1"
      fill="none"
      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

// LOOP 6: Battery / Energy / Heat
export const BatteryVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Background heat waves */}
    {[0, 1, 2].map((i) => (
      <motion.path
        key={i}
        d={`M${15 + i * 5} 90 Q ${25 + i * 5} 70 ${15 + i * 5} 50 Q ${5 + i * 5} 30 ${15 + i * 5} 10`}
        stroke={RED}
        strokeWidth="1"
        fill="none"
        opacity="0.15"
        animate={{
          d: [
            `M${15 + i * 5} 90 Q ${25 + i * 5} 70 ${15 + i * 5} 50 Q ${5 + i * 5} 30 ${15 + i * 5} 10`,
            `M${15 + i * 5} 90 Q ${5 + i * 5} 70 ${15 + i * 5} 50 Q ${25 + i * 5} 30 ${15 + i * 5} 10`
          ],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
      />
    ))}

    {/* Battery Body with gradient effect */}
    <rect x="30" y="18" width="40" height="65" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />

    {/* Cap / Terminal */}
    <rect x="40" y="8" width="20" height="10" rx="2" fill="currentColor" />
    <rect x="45" y="5" width="10" height="5" rx="1" fill="currentColor" opacity="0.6" />

    {/* Charge Level with bubbling effect */}
    <motion.rect
      x="34" y="78" width="32" height="0"
      fill={RED}
      opacity="0.8"
      animate={{ height: [0, 55], y: [78, 23] }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    />

    {/* Bubbles inside when charging */}
    {[0, 1, 2, 3].map((i) => (
      <motion.circle
        key={i}
        cx={40 + i * 8}
        cy="70"
        r="2"
        fill="white"
        opacity="0.4"
        animate={{ cy: [70, 30], opacity: [0.4, 0], r: [2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
      />
    ))}

    {/* Energy level markers */}
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1="72" y1={25 + i * 15} x2="75" y2={25 + i * 15} stroke="currentColor" strokeWidth="1" opacity="0.3" />
    ))}

    {/* Heat radiation lines */}
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.line
        key={i}
        x1="75" y1={20 + i * 15}
        x2="85" y2={15 + i * 15}
        stroke={RED}
        strokeWidth="2"
        strokeLinecap="round"
        animate={{ x2: [85, 92, 85], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}

    {/* Heat glow effect */}
    <motion.rect
      x="28" y="16" width="44" height="69" rx="6"
      stroke={RED}
      strokeWidth="2"
      fill="none"
      animate={{ opacity: [0, 0.4, 0], scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* Warning indicator */}
    <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>
      <circle cx="50" cy="50" r="8" fill={RED} opacity="0.2" />
      <text x="50" y="54" fontSize="10" fontFamily="sans-serif" fill={RED} textAnchor="middle" fontWeight="bold">!</text>
    </motion.g>
  </svg>
);

// LOOP 7: Pen / Authorship / Identity
export const PenVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* The Document Page with shadow */}
    <rect x="28" y="13" width="50" height="80" fill="currentColor" opacity="0.1" rx="2" />
    <rect x="25" y="10" width="50" height="80" stroke="currentColor" strokeWidth="1.5" fill="none" rx="2" />

    {/* Page header line */}
    <line x1="32" y1="20" x2="68" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Human-written lines (stable) */}
    {[0, 1, 2].map((i) => (
      <g key={i} opacity="0.4">
        <line x1="32" y1={28 + i * 8} x2={55 + (i % 2) * 10} y2={28 + i * 8} stroke="currentColor" strokeWidth="1.5" />
      </g>
    ))}

    {/* AI generating area - with typing animation */}
    <motion.rect
      x="32" y="52" width="36" height="30" rx="2"
      fill={RED}
      opacity="0.08"
      animate={{ opacity: [0.05, 0.15, 0.05] }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* AI-generated lines appearing */}
    {[0, 1, 2, 3].map((i) => (
      <motion.line
        key={i}
        x1="35"
        y1={57 + i * 6}
        x2="35"
        y2={57 + i * 6}
        stroke={RED}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ x2: 35 }}
        animate={{ x2: [35, 50 + (i % 2) * 12, 50 + (i % 2) * 12] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, repeatDelay: 2 }}
      />
    ))}

    {/* Blinking cursor */}
    <motion.line
      x1="35" y1="55"
      x2="35" y2="78"
      stroke={RED}
      strokeWidth="2"
      strokeLinecap="round"
      animate={{ opacity: [1, 0, 1], x1: [35, 62, 35], x2: [35, 62, 35] }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* Pen icon in corner */}
    <motion.g animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }} style={{ originX: '82px', originY: '18px' }}>
      <path d="M78 22 L85 15 L88 18 L81 25 Z" fill={RED} />
      <path d="M77 23 L78 27 L81 25" fill={RED} opacity="0.7" />
    </motion.g>

    {/* Authorship indicator */}
    <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
      <circle cx="72" cy="85" r="5" stroke={RED} strokeWidth="1.5" fill="none" />
      <text x="72" y="88" fontSize="6" fontFamily="monospace" fill={RED} textAnchor="middle">AI</text>
    </motion.g>

    {/* Question mark floating - who wrote this? */}
    <motion.text
      x="15"
      y="50"
      fontSize="14"
      fontFamily="serif"
      fill="currentColor"
      opacity="0.3"
      animate={{ y: [50, 45, 50], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      ?
    </motion.text>
  </svg>
);

// LOOP 8: Globe / Divergence - Regional Frames
export const GlobeVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Background star field */}
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.circle
        key={i}
        cx={10 + Math.random() * 80}
        cy={10 + Math.random() * 80}
        r="0.5"
        fill="currentColor"
        opacity="0.2"
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
      />
    ))}

    {/* Globe outer glow */}
    <motion.circle
      cx="50" cy="50" r="35"
      fill={RED}
      opacity="0.05"
      animate={{ r: [33, 37, 33], opacity: [0.03, 0.08, 0.03] }}
      transition={{ duration: 3, repeat: Infinity }}
    />

    {/* Globe main circle */}
    <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2.5" fill="none" />

    {/* Latitude lines */}
    <ellipse cx="50" cy="50" rx="32" ry="10" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
    <ellipse cx="50" cy="50" rx="32" ry="22" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />

    {/* Meridian (vertical) */}
    <ellipse cx="50" cy="50" rx="10" ry="32" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />

    {/* Rotating globe effect */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
      <ellipse cx="50" cy="50" rx="20" ry="32" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
    </motion.g>

    {/* Regional divergence - three segments */}
    {/* Region A (US) - Blue-ish represented by dark */}
    <motion.path
      d="M50 18 A 32 32 0 0 1 82 50"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      opacity="0.6"
      animate={{ strokeWidth: [4, 5, 4] }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* Region B (EU) - highlighted red */}
    <motion.path
      d="M50 82 A 32 32 0 0 1 18 50"
      stroke={RED}
      strokeWidth="4"
      fill="none"
      animate={{ strokeWidth: [4, 6, 4], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />

    {/* Region C (Asia) */}
    <motion.path
      d="M18 50 A 32 32 0 0 1 50 18"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      opacity="0.4"
      animate={{ strokeWidth: [4, 5, 4] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
    />

    {/* Divergence arrows pointing outward */}
    {[45, 165, 285].map((angle, i) => (
      <motion.g key={i}>
        <motion.line
          x1={50 + Math.cos((angle * Math.PI) / 180) * 35}
          y1={50 + Math.sin((angle * Math.PI) / 180) * 35}
          x2={50 + Math.cos((angle * Math.PI) / 180) * 45}
          y2={50 + Math.sin((angle * Math.PI) / 180) * 45}
          stroke={i === 1 ? RED : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            x2: [50 + Math.cos((angle * Math.PI) / 180) * 40, 50 + Math.cos((angle * Math.PI) / 180) * 48],
            y2: [50 + Math.sin((angle * Math.PI) / 180) * 40, 50 + Math.sin((angle * Math.PI) / 180) * 48],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
        />
      </motion.g>
    ))}

    {/* Central conflict indicator */}
    <motion.circle
      cx="50" cy="50" r="5"
      fill={RED}
      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />

    {/* Region labels */}
    <text x="75" y="35" fontSize="6" fontFamily="monospace" fill="currentColor" opacity="0.5">US</text>
    <text x="20" y="70" fontSize="6" fontFamily="monospace" fill={RED} opacity="0.7">EU</text>
    <text x="25" y="35" fontSize="6" fontFamily="monospace" fill="currentColor" opacity="0.5">CN</text>
  </svg>
);

// LOOP 9: Scale / Values - Post-Training
export const ScaleVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Background gradient effect */}
    <defs>
      <linearGradient id="scaleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
        <stop offset="50%" stopColor={RED} stopOpacity="0.05" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <rect x="5" y="30" width="90" height="50" fill="url(#scaleGradient)" rx="4" />

    {/* Fulcrum base */}
    <path d="M50 75 L38 92 L62 92 Z" fill="currentColor" />
    <rect x="45" y="68" width="10" height="10" fill="currentColor" />

    {/* Central pivot glow */}
    <motion.circle
      cx="50" cy="55"
      r="6"
      fill={RED}
      opacity="0.2"
      animate={{ r: [5, 8, 5], opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <circle cx="50" cy="55" r="4" fill="currentColor" />

    {/* Balance beam */}
    <motion.g
      animate={{ rotate: [-12, 12, -12] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: '50px', originY: '55px' }}
    >
      <rect x="15" y="52" width="70" height="6" rx="3" fill="currentColor" />

      {/* Left pan - Human Values */}
      <motion.g>
        <line x1="20" y1="58" x2="20" y2="75" stroke="currentColor" strokeWidth="2" />
        {/* Pan chains */}
        <line x1="10" y1="58" x2="10" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="30" y1="58" x2="30" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        {/* Pan */}
        <path d="M5 70 Q 20 78 35 70" stroke="currentColor" strokeWidth="2" fill="none" />
        <ellipse cx="20" cy="72" rx="15" ry="4" fill="currentColor" opacity="0.3" />

        {/* Human values icon - heart */}
        <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <path d="M15 65 C 15 62 20 62 20 65 C 20 62 25 62 25 65 C 25 70 20 74 20 74 C 20 74 15 70 15 65"
            fill={RED} opacity="0.8" />
        </motion.g>
      </motion.g>

      {/* Right pan - AI Output */}
      <motion.g>
        <line x1="80" y1="58" x2="80" y2="75" stroke="currentColor" strokeWidth="2" />
        {/* Pan chains */}
        <line x1="70" y1="58" x2="70" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="90" y1="58" x2="90" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        {/* Pan */}
        <path d="M65 70 Q 80 78 95 70" stroke="currentColor" strokeWidth="2" fill="none" />
        <ellipse cx="80" cy="72" rx="15" ry="4" fill="currentColor" opacity="0.3" />

        {/* AI blocks stacking */}
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={72 + i * 3}
            y={60 - i * 5}
            width="8"
            height="8"
            fill={RED}
            opacity={0.4 + i * 0.2}
            animate={{ y: [60 - i * 5, 58 - i * 5, 60 - i * 5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.g>
    </motion.g>

    {/* Labels */}
    <text x="20" y="25" fontSize="7" fontFamily="monospace" fill="currentColor" textAnchor="middle" opacity="0.6">VALUES</text>
    <text x="80" y="25" fontSize="7" fontFamily="monospace" fill={RED} textAnchor="middle" opacity="0.8">OUTPUT</text>

    {/* Balance indicator */}
    <motion.g animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
      <line x1="50" y1="15" x2="50" y2="35" stroke={RED} strokeWidth="1" strokeDasharray="2 2" />
      <polygon points="50,35 47,30 53,30" fill={RED} />
    </motion.g>
  </svg>
);

// LOOP 10: Mask / Intimacy - Machine Intimacy
export const MaskVisual: React.FC<VisualProps> = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Background soft glow */}
    <motion.ellipse
      cx="50" cy="50" rx="40" ry="45"
      fill={RED}
      opacity="0.03"
      animate={{ rx: [38, 42, 38], ry: [43, 47, 43], opacity: [0.02, 0.06, 0.02] }}
      transition={{ duration: 3, repeat: Infinity }}
    />

    {/* Human face silhouette behind */}
    <g opacity="0.2">
      <ellipse cx="50" cy="48" rx="22" ry="28" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* Hair suggestion */}
      <path d="M28 35 Q 35 15 50 12 Q 65 15 72 35" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* Neck */}
      <path d="M40 75 Q 50 82 60 75" stroke="currentColor" strokeWidth="1" fill="none" />
    </g>

    {/* The Digital Mask - floating */}
    <motion.g
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Mask glow */}
      <motion.path
        d="M32 32 Q 50 5 68 32 Q 70 58 50 68 Q 30 58 32 32"
        fill={RED}
        opacity="0.1"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Mask outline */}
      <motion.path
        d="M34 34 Q 50 8 66 34 Q 68 58 50 66 Q 32 58 34 34"
        fill="none"
        stroke={RED}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Mask surface details */}
      <path d="M40 40 Q 50 35 60 40" stroke={RED} strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M38 55 Q 50 60 62 55" stroke={RED} strokeWidth="1" fill="none" opacity="0.4" />

      {/* Eyes - with blinking animation */}
      <motion.g>
        {/* Left eye */}
        <motion.ellipse
          cx="42" cy="38" rx="5" ry="6"
          stroke={RED} strokeWidth="1.5" fill="none"
          animate={{ ry: [6, 1, 6] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.15] }}
        />
        <motion.circle
          cx="42" cy="38" r="2"
          fill={RED}
          animate={{ r: [2, 2.5, 2], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Right eye */}
        <motion.ellipse
          cx="58" cy="38" rx="5" ry="6"
          stroke={RED} strokeWidth="1.5" fill="none"
          animate={{ ry: [6, 1, 6] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.15] }}
        />
        <motion.circle
          cx="58" cy="38" r="2"
          fill={RED}
          animate={{ r: [2, 2.5, 2], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.g>

      {/* Subtle smile */}
      <motion.path
        d="M44 52 Q 50 56 56 52"
        stroke={RED}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        animate={{ d: ["M44 52 Q 50 56 56 52", "M44 52 Q 50 58 56 52", "M44 52 Q 50 56 56 52"] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.g>

    {/* Connection lines - digital tendrils */}
    {[0, 1, 2].map((i) => (
      <motion.path
        key={i}
        d={`M${35 + i * 15} 75 Q ${40 + i * 10} 85 ${35 + i * 15} 95`}
        stroke={RED}
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        animate={{
          d: [
            `M${35 + i * 15} 75 Q ${40 + i * 10} 85 ${35 + i * 15} 95`,
            `M${35 + i * 15} 75 Q ${30 + i * 10} 85 ${35 + i * 15} 95`
          ],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
      />
    ))}

    {/* Intimacy indicator - heart pulse */}
    <motion.g animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
      <path
        d="M47 82 C 47 80 50 80 50 82 C 50 80 53 80 53 82 C 53 85 50 88 50 88 C 50 88 47 85 47 82"
        fill={RED}
      />
    </motion.g>

    {/* Warning: AI label */}
    <motion.text
      x="85" y="25"
      fontSize="6"
      fontFamily="monospace"
      fill={RED}
      opacity="0.6"
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      AI
    </motion.text>
  </svg>
);

// --- HERO COVER (New impressive cover visual) ---

export const HeroCoverVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <svg viewBox="0 0 400 300" className="w-full h-full max-w-4xl" preserveAspectRatio="xMidYMid meet">
      {/* Background - subtle grid */}
      <defs>
        <pattern id="heroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        </pattern>
        <linearGradient id="gapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.8" />
          <stop offset="50%" stopColor={RED} stopOpacity="1" />
          <stop offset="100%" stopColor={RED} stopOpacity="0.8" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="400" height="300" fill="url(#heroGrid)" />

      {/* Large dramatic G A P letters with vertical gap lines */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* G */}
        <motion.text
          x="80"
          y="185"
          fontSize="120"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fill="currentColor"
          opacity="0.08"
          initial={{ y: 250 }}
          animate={{ y: 185 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          G
        </motion.text>
        {/* A */}
        <motion.text
          x="170"
          y="185"
          fontSize="120"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fill="currentColor"
          opacity="0.08"
          initial={{ y: 250 }}
          animate={{ y: 185 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          A
        </motion.text>
        {/* P */}
        <motion.text
          x="260"
          y="185"
          fontSize="120"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fill="currentColor"
          opacity="0.08"
          initial={{ y: 250 }}
          animate={{ y: 185 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          P
        </motion.text>
      </motion.g>

      {/* The dramatic divergence in center */}
      {/* Origin point - single shared moment */}
      <motion.circle
        cx="50" cy="150" r="8"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />

      {/* Machine curve - exponential rise (RED) - dramatic */}
      <motion.path
        d="M58 150 C 100 150, 150 130, 200 80 C 250 30, 300 10, 380 5"
        fill="none"
        stroke={RED}
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.8 }}
      />

      {/* Human curve - slower descent (dark) */}
      <motion.path
        d="M58 150 C 100 150, 150 170, 200 210 C 250 250, 300 275, 380 285"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 1.1 }}
      />

      {/* Multiple gap lines showing growing distance */}
      {[120, 180, 240, 300, 350].map((x, i) => {
        const machineY = x === 120 ? 130 : x === 180 ? 95 : x === 240 ? 55 : x === 300 ? 25 : 10;
        const humanY = x === 120 ? 165 : x === 180 ? 200 : x === 240 ? 238 : x === 300 ? 268 : 282;
        return (
          <motion.g key={i}>
            <motion.line
              x1={x}
              y1={machineY}
              x2={x}
              y2={humanY}
              stroke={RED}
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity="0.5"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 0.5, scaleY: 1 }}
              transition={{ delay: 2.5 + i * 0.15, duration: 0.4 }}
            />
            {/* Small circles at endpoints */}
            <motion.circle
              cx={x} cy={machineY} r="3"
              fill={RED}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.7 + i * 0.15 }}
            />
            <motion.circle
              cx={x} cy={humanY} r="3"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.7 + i * 0.15 }}
            />
          </motion.g>
        );
      })}

      {/* Central GAP label - prominent */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.2, duration: 0.6, type: "spring" }}
      >
        <rect x="175" y="135" width="70" height="35" fill="white" stroke={RED} strokeWidth="3" rx="4" />
        <text x="210" y="159" fontSize="18" fontFamily="monospace" fill={RED} textAnchor="middle" fontWeight="bold">
          GAP
        </text>
      </motion.g>

      {/* Pulsing glow ring around GAP */}
      <motion.circle
        cx="210"
        cy="152"
        r="50"
        fill="none"
        stroke={RED}
        strokeWidth="2"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: 3.5 }}
      />

      {/* Labels with better visibility */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        {/* Machine label */}
        <rect x="340" y="2" width="55" height="20" fill={RED} rx="2" />
        <text x="367" y="16" fontSize="10" fontFamily="monospace" fill="white" textAnchor="middle" fontWeight="bold">
          AI
        </text>

        {/* Human label */}
        <rect x="340" y="275" width="55" height="20" fill="currentColor" rx="2" />
        <text x="367" y="289" fontSize="10" fontFamily="monospace" fill="white" textAnchor="middle" fontWeight="bold">
          HUMAN
        </text>
      </motion.g>

      {/* Accelerating particles along machine curve */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={`particle-${i}`}
          r="4"
          fill={RED}
          initial={{ cx: 58, cy: 150, opacity: 0 }}
          animate={{
            cx: [58, 200, 380],
            cy: [150, 80, 5],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Slower particles along human curve */}
      {[0, 1].map((i) => (
        <motion.circle
          key={`human-particle-${i}`}
          r="4"
          fill="currentColor"
          initial={{ cx: 58, cy: 150, opacity: 0 }}
          animate={{
            cx: [58, 200, 380],
            cy: [150, 210, 285],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 2.5,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  </div>
);

// --- EXPORT MAP ---

export const GAC_VISUAL_MAP: Partial<Record<VisualType, React.FC<VisualProps>>> = {
  // Cover visual
  hero_cover: HeroCoverVisual,
  // Loop-specific metaphors
  audit: AuditVisual,
  tangle: TangleVisual,
  shield: ShieldVisual,
  factory: FactoryVisual,
  whisper: WhisperVisual,
  battery: BatteryVisual,
  pen: PenVisual,
  globe: GlobeVisual,
  scale: ScaleVisual,
  mask: MaskVisual,
  // Originals
  gap: GapVisual,
  filter: FilterVisual,
  trust: TrustVisual,
  context: ContextVisual,
  centaur: CentaurVisual,
  meaning: MeaningVisual,
  // Dynamics
  velocity: VelocityVisual,
  stagnation: StagnationVisual,
  orbit: OrbitVisual,
  collision: CollisionVisual,
  divergence: DivergenceVisual,
  convergence: ConvergenceVisual,
  loop: LoopVisual,
  cycle: CycleVisual,
  linear: LinearVisual,
  exponential: ExponentialVisual,
  // Structure
  network: NetworkVisual,
  silo: SiloVisual,
  hierarchy: HierarchyVisual,
  flat: FlatVisual,
  grid: GridVisual,
  stack: StackVisual,
  queue: QueueVisual,
  bridge: BridgeVisual,
  barrier: BarrierVisual,
  portal: PortalVisual,
  // Interaction
  sync: SyncVisual,
  async: AsyncVisual,
  balance: BalanceVisual,
  friction: FrictionVisual,
  echo: EchoVisual,
  mirror: MirrorVisual,
  shadow: ShadowVisual,
  source: SourceVisual,
  target: TargetVisual,
  exchange: ExchangeVisual,
  // State
  clarity: ClarityVisual,
  blur: BlurVisual,
  noise: NoiseVisual,
  signal: SignalVisual,
  overload: OverloadVisual,
  empty: EmptyVisual,
  locked: LockedVisual,
  unlocked: UnlockedVisual,
  focus: FocusVisual,
  search: SearchVisual,
  // Human
  pulse: PulseVisual,
  growth: GrowthVisual,
  decay: DecayVisual,
  spark: SparkVisual,
  breath: BreathVisual,
  // Fallback
  none: () => null,
};


