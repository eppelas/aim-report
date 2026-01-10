import React from 'react';
import { motion } from 'framer-motion';

const RED = "#DC2626";
const BLACK = "#171717";

interface LoopTransitionProps {
  loopNumber?: number;
  variant?: 'default' | 'spiral' | 'infinity' | 'orbit' | 'wave';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Animated loop transition visual for section breaks.
 * Represents the idea of "navoarachivanie novogo kruga" -
 * each iteration builds on the previous one.
 */
export const LoopTransition: React.FC<LoopTransitionProps> = ({
  loopNumber = 1,
  variant = 'default',
  size = 'md'
}) => {
  const sizeMap = { sm: 120, md: 200, lg: 280 };
  const svgSize = sizeMap[size];

  // Spiral Loop - continuous growth outward
  if (variant === 'spiral') {
    return (
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 200 200" width={svgSize} height={svgSize}>
          {/* Spiral path growing outward */}
          <motion.path
            d="M100,100
               C100,90 110,85 115,90
               C125,100 130,85 125,75
               C115,60 140,55 150,70
               C165,90 175,60 160,45
               C140,25 175,15 185,40
               C200,70 210,20 180,5"
            fill="none"
            stroke={RED}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          />
          {/* Inner circles representing loop iterations */}
          {Array.from({ length: loopNumber }).map((_, i) => (
            <motion.circle
              key={i}
              cx="100"
              cy="100"
              r={15 + i * 18}
              fill="none"
              stroke={i === loopNumber - 1 ? RED : BLACK}
              strokeWidth={i === loopNumber - 1 ? 3 : 1}
              strokeDasharray={i === loopNumber - 1 ? "0" : "4 4"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: i === loopNumber - 1 ? 1 : 0.3 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
            />
          ))}
          {/* Moving point on the spiral */}
          <motion.circle
            r="6"
            fill={RED}
            animate={{
              cx: [100, 115, 125, 150, 160, 185],
              cy: [100, 90, 75, 70, 45, 40],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    );
  }

  // Infinity Loop - enhanced with 10 colored orbiting dots
  if (variant === 'infinity') {
    // Color spectrum for 10 loops (same as navigation)
    const loopColors = [
      '#F43F5E', // rose-500
      '#F97316', // orange-500
      '#F59E0B', // amber-500
      '#EAB308', // yellow-500
      '#84CC16', // lime-500
      '#10B981', // emerald-500
      '#06B6D4', // cyan-500
      '#3B82F6', // blue-500
      '#8B5CF6', // violet-500
      '#D946EF', // fuchsia-500
    ];

    return (
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 300 150" width={svgSize * 1.5} height={svgSize * 0.75}>
          {/* Infinity path background */}
          <path
            d="M75,75 C75,35 112,35 150,75 C188,115 225,115 225,75 C225,35 188,35 150,75 C112,115 75,115 75,75"
            fill="none"
            stroke={BLACK}
            strokeWidth="1"
            strokeDasharray="6 4"
            opacity="0.2"
          />

          {/* Animated infinity path */}
          <motion.path
            d="M75,75 C75,35 112,35 150,75 C188,115 225,115 225,75 C225,35 188,35 150,75 C112,115 75,115 75,75"
            fill="none"
            stroke={RED}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* 10 colored orbiting dots */}
          {loopColors.map((color, i) => (
            <motion.circle
              key={i}
              r={6 - i * 0.3}
              fill={color}
              animate={{
                offsetDistance: ["0%", "100%"],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.6,
              }}
              style={{
                offsetPath: "path('M75,75 C75,35 112,35 150,75 C188,115 225,115 225,75 C225,35 188,35 150,75 C112,115 75,115 75,75')",
                filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.3))',
              }}
            />
          ))}

          {/* Center crossing point with glow */}
          <motion.circle
            cx="150"
            cy="75"
            r="8"
            fill={BLACK}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="150" cy="75" r="3" fill="white" />

          {/* "10" label below */}
          <text
            x="150"
            y="140"
            textAnchor="middle"
            fill={BLACK}
            fontSize="16"
            fontFamily="monospace"
            fontWeight="bold"
            opacity="0.4"
          >
            ×10
          </text>
        </svg>
      </div>
    );
  }

  // Orbit Loop - planets in motion
  if (variant === 'orbit') {
    return (
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 200 200" width={svgSize} height={svgSize}>
          {/* Central core */}
          <circle cx="100" cy="100" r="12" fill={BLACK} />

          {/* Orbital paths */}
          {[35, 55, 75].map((r, i) => (
            <motion.circle
              key={i}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke={BLACK}
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: i * 0.3 }}
            />
          ))}

          {/* Orbiting elements */}
          {Array.from({ length: Math.min(loopNumber, 5) }).map((_, i) => (
            <motion.g key={i}>
              <motion.circle
                r={8 - i}
                fill={i === 0 ? RED : i === 1 ? "#FF6B6B" : BLACK}
                animate={{
                  cx: [
                    100 + (35 + i * 20) * Math.cos(0),
                    100 + (35 + i * 20) * Math.cos(Math.PI / 2),
                    100 + (35 + i * 20) * Math.cos(Math.PI),
                    100 + (35 + i * 20) * Math.cos(3 * Math.PI / 2),
                    100 + (35 + i * 20) * Math.cos(2 * Math.PI),
                  ],
                  cy: [
                    100 + (35 + i * 20) * Math.sin(0),
                    100 + (35 + i * 20) * Math.sin(Math.PI / 2),
                    100 + (35 + i * 20) * Math.sin(Math.PI),
                    100 + (35 + i * 20) * Math.sin(3 * Math.PI / 2),
                    100 + (35 + i * 20) * Math.sin(2 * Math.PI),
                  ],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              />
            </motion.g>
          ))}
        </svg>
      </div>
    );
  }

  // Wave Loop - sinusoidal progression
  if (variant === 'wave') {
    return (
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 240 100" width={svgSize * 1.2} height={svgSize * 0.5}>
          {/* Base wave */}
          <motion.path
            d="M0,50 Q30,20 60,50 T120,50 T180,50 T240,50"
            fill="none"
            stroke={BLACK}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.3"
          />

          {/* Animated wave */}
          <motion.path
            d="M0,50 Q30,20 60,50 T120,50 T180,50 T240,50"
            fill="none"
            stroke={RED}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, x: -60 }}
            animate={{ pathLength: 1, x: 0 }}
            transition={{
              pathLength: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />

          {/* Moving peaks */}
          {[0, 60, 120, 180].map((x, i) => (
            <motion.circle
              key={i}
              cx={x + 60}
              cy="50"
              r="5"
              fill={i === loopNumber - 1 ? RED : BLACK}
              opacity={i === loopNumber - 1 ? 1 : 0.3}
              animate={{
                y: [-15, 15, -15],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>
    );
  }

  // Default: Concentric circles with growing animation
  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 200 200" width={svgSize} height={svgSize}>
        {/* Background guide circles */}
        {[20, 40, 60, 80].map((r, i) => (
          <circle
            key={`guide-${i}`}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={BLACK}
            strokeWidth="0.5"
            opacity="0.1"
          />
        ))}

        {/* Animated spiral drawing */}
        <motion.path
          d={`
            M100,100
            ${Array.from({ length: loopNumber * 4 }).map((_, i) => {
              const angle = (i * Math.PI) / 2;
              const radius = 15 + i * 8;
              const x = 100 + radius * Math.cos(angle);
              const y = 100 + radius * Math.sin(angle);
              return `${i === 0 ? 'L' : ''} ${x},${y}`;
            }).join(' ')}
          `}
          fill="none"
          stroke={RED}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* Loop number indicators */}
        {Array.from({ length: loopNumber }).map((_, i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="100"
            r={20 + i * 18}
            fill="none"
            stroke={i === loopNumber - 1 ? RED : BLACK}
            strokeWidth={i === loopNumber - 1 ? 2 : 1}
            strokeDasharray={i === loopNumber - 1 ? "0" : "6 4"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: i === loopNumber - 1 ? 0.8 : 0.2 }}
            transition={{ delay: i * 0.3, duration: 0.6 }}
          />
        ))}

        {/* Active loop indicator */}
        <motion.circle
          cx="100"
          cy={100 - 20 - (loopNumber - 1) * 18}
          r="8"
          fill={RED}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Center dot */}
        <circle cx="100" cy="100" r="4" fill={BLACK} />

        {/* Loop number text */}
        <text
          x="100"
          y="104"
          textAnchor="middle"
          fill="white"
          fontSize="6"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {loopNumber}
        </text>
      </svg>
    </div>
  );
};

/**
 * Section divider with loop animation - used between major sections.
 */
export const LoopSectionDivider: React.FC<{
  loopNumber: number;
  title?: string;
  subtitle?: string;
}> = ({ loopNumber, title, subtitle }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <LoopTransition loopNumber={loopNumber} variant="spiral" size="lg" />

      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 mb-2">
            Loop {String(loopNumber).padStart(2, '0')}
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-neutral-600 mt-3 max-w-md mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* Decorative line */}
      <motion.div
        className="w-24 h-1 bg-red-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
    </div>
  );
};

export default LoopTransition;
