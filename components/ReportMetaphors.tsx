import React from 'react';
import { motion } from 'framer-motion';
import type { StatItem } from '../types';

// Swiss red/white/black (aligned with `{rule} {presentations} Swiss Red-White Deck Style`)
const RED = '#DC2626';
const BLACK = '#171717';
const GRAY = '#D4D4D4';

type Props = {
  slideId: number;
  stats?: StatItem[];
};

const baseStroke = {
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
};

const StrokeBlack = { stroke: BLACK, strokeWidth: 6, ...baseStroke };
const StrokeRed = { stroke: RED, strokeWidth: 10, ...baseStroke };

const drawIn = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 1.1, ease: 'easeOut' as const },
};

const popIn = (delay = 0) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.6, delay, ease: 'backOut' as const },
});

const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg
    viewBox="0 0 1600 900"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const wrapLabel2 = (label: string): [string, string] => {
  const clean = label.replace(/\s+/g, ' ').trim();
  if (clean.length <= 18) return [clean, ''];
  const words = clean.split(' ');
  if (words.length <= 1) return [clean.slice(0, 18), clean.slice(18, 36)];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
};

const SplitGuide: React.FC = () => (
  <>
    <line x1="800" y1="140" x2="800" y2="760" stroke={GRAY} strokeWidth={2} vectorEffect="non-scaling-stroke" />
    <line x1="240" y1="450" x2="1360" y2="450" stroke={GRAY} strokeWidth={2} vectorEffect="non-scaling-stroke" />
  </>
);

const Node: React.FC<{ cx: number; cy: number; r?: number; fill?: string; stroke?: string; delay?: number }> = ({
  cx,
  cy,
  r = 16,
  fill = 'white',
  stroke = BLACK,
  delay = 0,
}) => (
  <motion.circle
    cx={cx}
    cy={cy}
    r={r}
    fill={fill}
    stroke={stroke}
    strokeWidth={6}
    {...baseStroke}
    {...popIn(delay)}
  />
);

const SectionPill: React.FC<{ label: string }> = ({ label }) => (
  <g>
    <rect x="620" y="390" width="360" height="120" rx="18" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} />
    <rect x="640" y="410" width="320" height="80" rx="14" fill={RED} opacity={0.12} />
    <text
      x="800"
      y="468"
      textAnchor="middle"
      fontFamily="IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
      fontSize="48"
      fill={BLACK}
      letterSpacing="8"
    >
      {label}
    </text>
  </g>
);

// ------------------------------------------------------------------
// Report metaphors (one unique per slideId 1..43)
// ------------------------------------------------------------------

export const ReportMetaphor: React.FC<Props> = ({ slideId, stats }) => {
  switch (slideId) {
    // 01 — Cover: diverging curves showing the Gap
    case 1:
      return (
        <Svg>
          {/* Starting point - shared origin */}
          <motion.circle cx="200" cy="450" r="12" fill={BLACK} {...popIn(0)} />

          {/* Machine curve - exponential acceleration (RED) */}
          <motion.path
            d="M200 450 C 400 450, 600 400, 800 300 C 1000 200, 1200 100, 1400 50"
            fill="none"
            stroke={RED}
            strokeWidth={8}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />

          {/* Human curve - slower adaptation (BLACK) */}
          <motion.path
            d="M200 450 C 400 450, 600 480, 800 520 C 1000 560, 1200 620, 1400 700"
            fill="none"
            stroke={BLACK}
            strokeWidth={8}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
          />

          {/* Gap indicator lines */}
          {[600, 800, 1000, 1200].map((x, i) => {
            const machineY = x === 600 ? 380 : x === 800 ? 300 : x === 1000 ? 200 : 100;
            const humanY = x === 600 ? 490 : x === 800 ? 520 : x === 1000 ? 560 : 620;
            return (
              <motion.line
                key={i}
                x1={x}
                y1={machineY}
                x2={x}
                y2={humanY}
                stroke={RED}
                strokeWidth={2}
                strokeDasharray="8 8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1.5 + i * 0.15 }}
              />
            );
          })}

          {/* GAP label box */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            <rect x="720" y="380" width="160" height="60" fill="white" stroke={RED} strokeWidth={3} />
            <text x="800" y="420" fontSize="28" fontFamily="monospace" fill={RED} textAnchor="middle" fontWeight="bold">
              GAP
            </text>
          </motion.g>

          {/* Labels */}
          <motion.text
            x="1420"
            y="60"
            fontSize="20"
            fontFamily="monospace"
            fill={RED}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            MACHINES
          </motion.text>
          <motion.text
            x="1420"
            y="710"
            fontSize="20"
            fontFamily="monospace"
            fill={BLACK}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 }}
          >
            HUMANS
          </motion.text>

          {/* Pulsing effect on gap */}
          <motion.circle
            cx="800"
            cy="410"
            r="60"
            fill="none"
            stroke={RED}
            strokeWidth={2}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 2.5 }}
          />
        </Svg>
      );

    // 02 — A note: compression blocks
    case 2:
      return (
        <Svg>
          <SplitGuide />
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.rect
              key={i}
              x={260 + i * 160}
              y={260 + (i % 2) * 80}
              width="120"
              height="220"
              fill="white"
              stroke={BLACK}
              strokeWidth={6}
              {...baseStroke}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
            />
          ))}
          <motion.rect
            x="720"
            y="560"
            width="160"
            height="80"
            fill={RED}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.55, ease: 'backOut' }}
          />
        </Svg>
      );

    // 03 — What this is: chaos → filter → clarity (funnel with random blinking blocks)
    case 3: {
      // Generate random blocks for chaos visualization
      const chaosBlocks = Array.from({ length: 48 }, (_, i) => ({
        x: 200 + (i % 12) * 100,
        y: 100 + Math.floor(i / 12) * 80,
        delay: Math.random() * 3,
        duration: 0.5 + Math.random() * 1.5,
      }));
      return (
        <Svg>
          {/* Chaos blocks - random blinking */}
          {chaosBlocks.map((block, i) => (
            <motion.rect
              key={i}
              x={block.x}
              y={block.y}
              width="60"
              height="50"
              fill={i % 7 === 0 ? RED : BLACK}
              stroke={BLACK}
              strokeWidth={2}
              initial={{ opacity: 0.1 }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: block.duration,
                repeat: Infinity,
                delay: block.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Funnel shape in center */}
          <motion.path
            d="M550 450 L650 450 L700 650 L600 650 Z M750 450 L850 450 L800 650 L700 650 Z M950 450 L1050 450 L1000 650 L900 650 Z"
            fill="none"
            stroke={RED}
            strokeWidth={4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          {/* Central funnel */}
          <motion.path
            d="M600 500 L1000 500 L850 750 L750 750 Z"
            fill="white"
            stroke={BLACK}
            strokeWidth={6}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          />

          {/* Output - filtered essence */}
          <motion.rect
            x="760"
            y="770"
            width="80"
            height="60"
            fill={RED}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, type: 'spring' }}
          />

          {/* Labels */}
          <motion.text
            x="800"
            y="850"
            fontSize="18"
            fontFamily="monospace"
            fill={RED}
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            CONTEXT
          </motion.text>
        </Svg>
      );
    }

    // 04 — Method: four streams → one
    case 4:
      return (
        <Svg>
          {[0, 1, 2, 3].map((i) => (
            <motion.path
              key={i}
              d={`M ${320 + i * 320} 200 C ${320 + i * 320} 420, 620 420, 800 620`}
              stroke={i === 0 ? RED : BLACK}
              strokeWidth={i === 0 ? 10 : 6}
              {...baseStroke}
              fill="none"
              {...drawIn}
              transition={{ ...drawIn.transition, delay: i * 0.08 }}
            />
          ))}
          <motion.circle cx="800" cy="650" r="70" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.25)} />
          <motion.circle cx="800" cy="650" r="28" fill={RED} {...popIn(0.35)} />
        </Svg>
      );

    // 05 — Reading map: checkpoints
    case 5:
      return (
        <Svg>
          <motion.path
            d="M260 640 C 480 360, 760 760, 980 420 C 1120 200, 1320 320, 1340 260"
            {...StrokeBlack}
            fill="none"
            strokeDasharray="14 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
          {[{ x: 260, y: 640 }, { x: 560, y: 420 }, { x: 980, y: 420 }, { x: 1340, y: 260 }].map((p, i) => (
            <Node key={i} cx={p.x} cy={p.y} fill={i === 0 ? RED : 'white'} stroke={BLACK} delay={0.15 + i * 0.08} />
          ))}
        </Svg>
      );

    // 06 — Numbers: stat tiles (unique grid)
    case 6:
      return (
        <Svg>
          {Array.from({ length: 6 }).map((_, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const x = 260 + col * 380;
            const y = 220 + row * 260;
            return (
              <g key={i}>
                <motion.rect
                  x={x}
                  y={y}
                  width="320"
                  height="200"
                  rx="18"
                  fill="white"
                  stroke={BLACK}
                  strokeWidth={6}
                  {...baseStroke}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                />
                {(() => {
                  const s = (stats ?? [])[i];
                  if (!s) return null;
                  const isRed = String(s.color).toLowerCase() === 'red';
                  const [l1, l2] = wrapLabel2(s.label);
                  return (
                    <>
                      <text
                        x={x + 24}
                        y={y + 74}
                        fontFamily="IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                        fontSize="44"
                        fontWeight="700"
                        fill={isRed ? RED : BLACK}
                      >
                        {String(s.value)}
                      </text>
                      <text
                        x={x + 24}
                        y={y + 122}
                        fontFamily="IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                        fontSize="18"
                        fill={BLACK}
                        opacity="0.7"
                      >
                        <tspan x={x + 24} dy="0">
                          {l1}
                        </tspan>
                        {l2 ? (
                          <tspan x={x + 24} dy="22">
                            {l2}
                          </tspan>
                        ) : null}
                      </text>
                      <line
                        x1={x + 24}
                        y1={y + 160}
                        x2={x + 296}
                        y2={y + 160}
                        stroke={BLACK}
                        strokeWidth={6}
                        {...baseStroke}
                        opacity={0.9}
                      />
                      {isRed ? <rect x={x} y={y} width="320" height="200" rx="18" fill={RED} opacity={0.06} /> : null}
                    </>
                  );
                })()}
              </g>
            );
          })}
        </Svg>
      );

    // 07 — Context gap quote: two blocks + gap
    case 7:
      return (
        <Svg>
          <motion.rect x="280" y="300" width="520" height="300" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0)} />
          <motion.rect x="800" y="300" width="520" height="300" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.08)} />
          <motion.rect x="760" y="300" width="80" height="300" fill={RED} opacity={0.12} initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ delay: 0.25 }} />
          <motion.line x1="800" y1="260" x2="800" y2="640" {...StrokeRed} initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }} style={{ transformOrigin: '800px 450px' }} />
        </Svg>
      );

    // 08 — Timeline divider
    case 8: {
      // Animated timeline with Q1-Q4 markers and flowing progress
      const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
      return (
        <Svg>
          {/* Main horizontal line with gradient effect */}
          <motion.line
            x1="200"
            y1="500"
            x2="1400"
            y2="500"
            stroke={GRAY}
            strokeWidth={3}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Progress fill - red portion showing current progress */}
          <motion.line
            x1="200"
            y1="500"
            x2="1400"
            y2="500"
            stroke={RED}
            strokeWidth={5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 0.75, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }}
          />

          {/* Quarter markers with labels */}
          {quarters.map((q, i) => {
            const x = 320 + i * 280;
            const isPast = i < 3;
            return (
              <g key={q}>
                {/* Vertical connector */}
                <motion.line
                  x1={x}
                  y1="500"
                  x2={x}
                  y2="420"
                  stroke={isPast ? RED : GRAY}
                  strokeWidth={2}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                  style={{ transformOrigin: `${x}px 460px` }}
                />

                {/* Node on line */}
                <motion.circle
                  cx={x}
                  cy={500}
                  r={isPast ? 14 : 10}
                  fill={isPast ? RED : 'white'}
                  stroke={isPast ? RED : BLACK}
                  strokeWidth={4}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 400 }}
                />

                {/* Quarter label */}
                <motion.text
                  x={x}
                  y={395}
                  textAnchor="middle"
                  fontFamily="IBM Plex Mono, ui-monospace, monospace"
                  fontSize={isPast ? 36 : 28}
                  fontWeight="700"
                  fill={isPast ? BLACK : GRAY}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                >
                  {q}
                </motion.text>

                {/* Pulse effect on current quarter */}
                {i === 2 && (
                  <motion.circle
                    cx={x}
                    cy={500}
                    r={14}
                    fill="none"
                    stroke={RED}
                    strokeWidth={2}
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </g>
            );
          })}

          {/* Year label - 2025 */}
          <motion.text
            x="800"
            y="620"
            textAnchor="middle"
            fontFamily="IBM Plex Mono, ui-monospace, monospace"
            fontSize={64}
            fontWeight="900"
            fill={BLACK}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            2025
          </motion.text>

          {/* Decorative arrows on ends */}
          <motion.polygon
            points="1400,500 1370,485 1370,515"
            fill={RED}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          />
        </Svg>
      );
    }

    // 09 — Q1: reasoning spiral - lightweight
    case 9:
      return (
        <Svg>
          {/* Simple spiral path */}
          <motion.path
            d="M800 450 Q 900 350 800 300 Q 650 350 700 450 Q 750 550 800 500"
            fill="none"
            stroke={RED}
            strokeWidth={4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          {/* Center dot */}
          <motion.circle
            cx="800"
            cy="450"
            r="8"
            fill={RED}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
          />
          {/* Quarter label */}
          <motion.text
            x="800"
            y="620"
            textAnchor="middle"
            fontFamily="IBM Plex Mono, monospace"
            fontSize={72}
            fontWeight="900"
            fill={GRAY}
            opacity={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
          >
            Q1
          </motion.text>
        </Svg>
      );

    // 10 — Q2: infra layers - lightweight
    case 10:
      return (
        <Svg>
          {/* Simple 3 horizontal bars */}
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={i}
              x="580"
              y={350 + i * 70}
              width="440"
              height="50"
              rx="4"
              fill={i === 1 ? RED : 'none'}
              stroke={i === 1 ? RED : GRAY}
              strokeWidth={2}
              opacity={i === 1 ? 0.2 : 0.5}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: i === 1 ? 0.2 : 0.5 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              style={{ transformOrigin: '800px center' }}
            />
          ))}
          {/* Quarter label */}
          <motion.text
            x="800"
            y="620"
            textAnchor="middle"
            fontFamily="IBM Plex Mono, monospace"
            fontSize={72}
            fontWeight="900"
            fill={GRAY}
            opacity={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
          >
            Q2
          </motion.text>
        </Svg>
      );

    // 11 — Q3: bottleneck - lightweight
    case 11:
      return (
        <Svg>
          {/* Simple hourglass/bottleneck shape */}
          <motion.path
            d="M650 350 L950 350 L850 450 L950 550 L650 550 L750 450 Z"
            fill="none"
            stroke={GRAY}
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2 }}
          />
          {/* Center squeeze point */}
          <motion.circle
            cx="800"
            cy="450"
            r="10"
            fill={RED}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
          />
          {/* Quarter label */}
          <motion.text
            x="800"
            y="620"
            textAnchor="middle"
            fontFamily="IBM Plex Mono, monospace"
            fontSize={72}
            fontWeight="900"
            fill={GRAY}
            opacity={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
          >
            Q3
          </motion.text>
        </Svg>
      );

    // 12 — Q4: packaging - lightweight
    case 12:
      return (
        <Svg>
          {/* Simple nested boxes */}
          <motion.rect
            x="680"
            y="350"
            width="240"
            height="200"
            rx="8"
            fill="none"
            stroke={GRAY}
            strokeWidth={2}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 0.5 }}
          />
          <motion.rect
            x="720"
            y="390"
            width="160"
            height="120"
            rx="4"
            fill={RED}
            opacity={0.15}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          {/* Quarter label */}
          <motion.text
            x="800"
            y="620"
            textAnchor="middle"
            fontFamily="IBM Plex Mono, monospace"
            fontSize={72}
            fontWeight="900"
            fill={GRAY}
            opacity={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
          >
            Q4
          </motion.text>
        </Svg>
      );

    // 13 — Loops divider
    case 13:
      return (
        <Svg>
          <SectionPill label="LOOPS" />
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={320 + i * 240}
              cy={660}
              r={52}
              fill="white"
              stroke={BLACK}
              strokeWidth={6}
              {...baseStroke}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.55, ease: 'backOut' }}
            />
          ))}
          <motion.circle cx="320" cy="660" r={16} fill={RED} {...popIn(0.18)} />
        </Svg>
      );

    // 14–34 — Loops (paired + move) — keep unique per slide
    case 14:
      return (
        <Svg>
          <SplitGuide />
          {/* reasoning graph */}
          <motion.path d="M260 560 C 360 420, 520 420, 620 340" {...StrokeBlack} fill="none" {...drawIn} />
          <Node cx={260} cy={560} fill={RED} delay={0.1} />
          <Node cx={420} cy={440} delay={0.16} />
          <Node cx={620} cy={340} delay={0.22} />
          {/* trust check */}
          <motion.path d="M980 520 L1080 620 L1320 380" {...StrokeRed} fill="none" {...drawIn} transition={{ ...drawIn.transition, delay: 0.15 }} />
          <motion.rect x="940" y="320" width="420" height="340" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} />
        </Svg>
      );

    case 15:
      return (
        <Svg>
          {/* Trust protocol: shield + compass */}
          <motion.path
            d="M800 220 C 980 260, 1120 300, 1120 460 C 1120 660, 960 740, 800 780 C 640 740, 480 660, 480 460 C 480 300, 620 260, 800 220 Z"
            {...StrokeBlack}
            fill="white"
            {...drawIn}
          />
          <motion.circle cx="800" cy="520" r="140" {...StrokeBlack} {...drawIn} transition={{ ...drawIn.transition, delay: 0.05 }} />
          <motion.polygon
            points="800,400 850,520 800,600 750,520"
            fill={RED}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.55, ease: 'backOut' }}
            style={{ transformOrigin: '800px 520px' }}
          />
        </Svg>
      );

    case 16:
      return (
        <Svg>
          <SplitGuide />
          {/* agent nodes */}
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i * 72 * Math.PI) / 180;
            const cx = 420 + Math.cos(a) * 180;
            const cy = 450 + Math.sin(a) * 180;
            return (
              <g key={i}>
                <motion.line x1="420" y1="450" x2={cx} y2={cy} {...StrokeBlack} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.06 + i * 0.05, duration: 0.6 }} />
                <Node cx={cx} cy={cy} r={18} delay={0.12 + i * 0.05} />
              </g>
            );
          })}
          <Node cx={420} cy={450} r={24} fill={RED} delay={0.1} />
          {/* overload stack */}
          {[0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x={980}
              y={300 + i * 120}
              width="360"
              height="90"
              fill={i === 3 ? RED : 'white'}
              opacity={i === 3 ? 0.18 : 1}
              stroke={BLACK}
              strokeWidth={6}
              {...baseStroke}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}
            />
          ))}
        </Svg>
      );

    case 17:
      return (
        <Svg>
          {/* Context architecture: SSOT tree */}
          <motion.rect x="360" y="260" width="880" height="420" rx="24" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0)} />
          <motion.line x1="520" y1="360" x2="520" y2="600" {...StrokeBlack} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.1 }} style={{ transformOrigin: '520px 360px' }} />
          <Node cx={520} cy={360} fill={RED} delay={0.15} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <motion.line x1="520" y1={460 + i * 90} x2="760" y2={460 + i * 90} {...StrokeBlack} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }} />
              <motion.rect x="780" y={430 + i * 90} width="360" height="60" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.22 + i * 0.06)} />
            </g>
          ))}
        </Svg>
      );

    case 18:
      return (
        <Svg>
          <SplitGuide />
          {/* sovereign fortress */}
          <motion.rect x="260" y="300" width="520" height="360" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0)} />
          <motion.rect x="320" y="360" width="120" height="120" fill={RED} opacity={0.12} />
          <motion.rect x="520" y="360" width="120" height="120" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.12)} />
          {/* personal bubble */}
          <motion.circle cx="1180" cy="450" r="200" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...drawIn} />
          <motion.circle cx="1180" cy="450" r="26" fill={RED} {...popIn(0.18)} />
        </Svg>
      );

    case 19:
      return (
        <Svg>
          {/* Personal sovereignty checklist */}
          <motion.rect x="420" y="240" width="760" height="520" rx="28" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0)} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <motion.rect x="480" y={320 + i * 90} width="52" height="52" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.08 + i * 0.04)} />
              <motion.path d={`M490 ${350 + i * 90} L505 ${365 + i * 90} L535 ${335 + i * 90}`} {...StrokeRed} fill="none" {...drawIn} transition={{ ...drawIn.transition, delay: 0.12 + i * 0.04 }} />
              <motion.line x1="560" y1={346 + i * 90} x2="1100" y2={346 + i * 90} {...StrokeBlack} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.14 + i * 0.04, duration: 0.35 }} style={{ transformOrigin: `560px ${346 + i * 90}px` }} />
            </g>
          ))}
        </Svg>
      );

    case 20:
      return (
        <Svg>
          <SplitGuide />
          {/* synthetic / distillation: echo lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.line
              key={i}
              x1={280}
              y1={300 + i * 90}
              x2={720}
              y2={300 + i * 90}
              stroke={i === 2 ? RED : BLACK}
              strokeWidth={i === 2 ? 10 : 6}
              {...baseStroke}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.05 + i * 0.05, duration: 0.55 }}
              style={{ transformOrigin: '280px 0px' }}
            />
          ))}
          {/* meaning inflation: expanding rings */}
          {[0, 1, 2].map((i) => (
            <motion.circle key={i} cx="1180" cy="450" r={80 + i * 80} fill="none" stroke={BLACK} strokeWidth={6} {...baseStroke} {...drawIn} transition={{ ...drawIn.transition, delay: 0.08 + i * 0.08 }} />
          ))}
          <motion.circle cx="1180" cy="450" r={18} fill={RED} {...popIn(0.25)} />
        </Svg>
      );

    case 21:
      return (
        <Svg>
          {/* Meaning anchor */}
          <motion.path
            d="M800 220 V560"
            {...StrokeBlack}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9 }}
          />
          <motion.circle cx="800" cy="600" r="160" fill="none" stroke={BLACK} strokeWidth={6} {...baseStroke} {...drawIn} />
          <motion.path d="M640 600 C 660 720, 940 720, 960 600" {...StrokeRed} fill="none" {...drawIn} transition={{ ...drawIn.transition, delay: 0.1 }} />
          <motion.rect x="772" y="280" width="56" height="56" fill={RED} {...popIn(0.15)} />
        </Svg>
      );

    case 22:
      return (
        <Svg>
          <SplitGuide />
          {/* efficient frontier */}
          <motion.path d="M300 640 C 460 520, 560 460, 700 420 C 860 380, 1040 360, 1300 320" {...StrokeBlack} fill="none" {...drawIn} />
          <motion.circle cx="1040" cy="360" r="18" fill={RED} {...popIn(0.18)} />
          {/* privacy lock */}
          <motion.rect x="1040" y="420" width="260" height="200" rx="24" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.05)} />
          <motion.path d="M1100 420 V380 C1100 330, 1240 330, 1240 380 V420" {...StrokeBlack} fill="none" {...drawIn} transition={{ ...drawIn.transition, delay: 0.12 }} />
          <motion.circle cx="1170" cy="520" r="22" fill={RED} {...popIn(0.22)} />
        </Svg>
      );

    case 23:
      return (
        <Svg>
          {/* Friction design: speed bumps */}
          <motion.line x1="260" y1="560" x2="1340" y2="560" {...StrokeBlack} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9 }} style={{ transformOrigin: '800px 560px' }} />
          {[0, 1, 2, 3].map((i) => (
            <motion.path
              key={i}
              d={`M ${420 + i * 220} 560 C ${460 + i * 220} 470, ${540 + i * 220} 470, ${580 + i * 220} 560`}
              stroke={i === 1 ? RED : BLACK}
              strokeWidth={i === 1 ? 10 : 6}
              {...baseStroke}
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.7 }}
            />
          ))}
        </Svg>
      );

    case 24:
      return (
        <Svg>
          <SplitGuide />
          {/* compute / energy bottleneck */}
          <motion.path d="M280 420 H720" {...StrokeBlack} fill="none" {...drawIn} />
          {[0, 1, 2].map((i) => (
            <motion.rect key={i} x={320 + i * 140} y="360" width="100" height="120" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.06 + i * 0.05)} />
          ))}
          <motion.rect x="460" y="520" width="240" height="60" fill={RED} opacity={0.12} initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ delay: 0.2 }} />
          {/* human battery */}
          <motion.rect x="980" y="360" width="360" height="200" rx="24" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.05)} />
          <motion.rect x="1320" y="420" width="40" height="80" fill={BLACK} />
          <motion.rect x="1000" y="380" width="200" height="160" fill={RED} opacity={0.15} initial={{ width: 0 }} animate={{ width: 200 }} transition={{ delay: 0.18, duration: 0.7, ease: 'easeOut' }} />
        </Svg>
      );

    case 25:
      return (
        <Svg>
          {/* Energy audit gauge */}
          <motion.circle cx="800" cy="520" r="240" fill="none" stroke={BLACK} strokeWidth={6} {...baseStroke} {...drawIn} />
          <motion.path
            d="M560 520 A240 240 0 0 1 1040 520"
            stroke={RED}
            strokeWidth={10}
            {...baseStroke}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.12, duration: 1.0 }}
          />
          <motion.line x1="800" y1="520" x2="980" y2="400" {...StrokeBlack} initial={{ rotate: -40, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} style={{ transformOrigin: '800px 520px' }} />
          <motion.circle cx="800" cy="520" r="18" fill={RED} {...popIn(0.25)} />
        </Svg>
      );

    case 26:
      return (
        <Svg>
          <SplitGuide />
          {/* code brackets */}
          <motion.path d="M360 260 L280 450 L360 640" {...StrokeBlack} fill="none" {...drawIn} />
          <motion.path d="M520 260 L600 450 L520 640" {...StrokeBlack} fill="none" {...drawIn} transition={{ ...drawIn.transition, delay: 0.06 }} />
          <motion.rect x="400" y="420" width="80" height="60" fill={RED} {...popIn(0.18)} />
          {/* authorship signature */}
          <motion.path
            d="M980 560 C 1040 500, 1120 620, 1180 560 C 1240 500, 1320 620, 1380 560"
            stroke={BLACK}
            strokeWidth={6}
            {...baseStroke}
            fill="none"
            {...drawIn}
          />
          <motion.line x1="980" y1="610" x2="1380" y2="610" {...StrokeRed} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.22, duration: 0.6 }} style={{ transformOrigin: '980px 610px' }} />
        </Svg>
      );

    case 27:
      return (
        <Svg>
          {/* Loop 07 paradox (numbers): productivity ↑ while quality/confidence ↓ */}
          <motion.line
            x1="260"
            y1="720"
            x2="1340"
            y2="720"
            {...StrokeBlack}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{ transformOrigin: '800px 720px' }}
          />

          {(() => {
            const parsed = (stats ?? []).slice(0, 6).map((s) => {
              const raw = typeof s.value === 'number' ? String(s.value) : String(s.value);
              const n = Number.parseFloat(raw.replace(/[^0-9.]/g, ''));
              return Number.isFinite(n) ? n : 0;
            });
            const max = Math.max(1, ...parsed);

            const barW = 140;
            const gap = 70;
            const totalW = 6 * barW + 5 * gap;
            const startX = 800 - totalW / 2;
            const baseY = 720;

            return (stats ?? []).slice(0, 6).map((s, i) => {
              const v = parsed[i] ?? 0;
              const h = 80 + (v / max) * 420;
              const x = startX + i * (barW + gap);
              const y = baseY - h;
              const isRed = String(s.color).toLowerCase() === 'red';

              return (
                <g key={i}>
                  <motion.rect
                    x={x}
                    y={y}
                    width={barW}
                    height={h}
                    fill="white"
                    stroke={BLACK}
                    strokeWidth={6}
                    {...baseStroke}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.45 }}
                  />
                  {isRed && <rect x={x} y={y} width={barW} height={h} fill={RED} opacity={0.09} />}
                  {i === 0 && <rect x={x} y={y} width={barW} height={Math.max(18, h * 0.22)} fill={RED} opacity={0.22} />}
                </g>
              );
            });
          })()}

          {/* arrows: up (left), down (right) */}
          <motion.path
            d="M300 260 L300 420 M260 300 L300 260 L340 300"
            {...StrokeRed}
            fill="none"
            {...drawIn}
            transition={{ ...drawIn.transition, delay: 0.18 }}
          />
          <motion.path
            d="M1300 640 L1300 480 M1260 600 L1300 640 L1340 600"
            {...StrokeRed}
            fill="none"
            {...drawIn}
            transition={{ ...drawIn.transition, delay: 0.22 }}
          />
        </Svg>
      );

    case 28:
      return (
        <Svg>
          {/* Centaur contract: handshake (gap → move) */}
          <motion.path d="M480 520 C 560 440, 680 440, 760 520" {...StrokeBlack} fill="none" {...drawIn} />
          <motion.path d="M1120 520 C 1040 440, 920 440, 840 520" {...StrokeBlack} fill="none" {...drawIn} transition={{ ...drawIn.transition, delay: 0.06 }} />
          <motion.rect x="740" y="500" width="120" height="80" fill={RED} opacity={0.12} initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ delay: 0.2 }} />
          <motion.circle cx="800" cy="540" r="28" fill={RED} {...popIn(0.22)} />
          <motion.line x1="520" y1="620" x2="1080" y2="620" {...StrokeBlack} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.12, duration: 0.7 }} style={{ transformOrigin: '800px 620px' }} />
        </Svg>
      );

    case 29:
      return (
        <Svg>
          <SplitGuide />
          {/* Loop 08 paired: parallel stack */}
          {[0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x="300"
              y={260 + i * 120}
              width="420"
              height="90"
              fill="white"
              stroke={BLACK}
              strokeWidth={6}
              {...baseStroke}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 + i * 0.05, duration: 0.45 }}
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x="880"
              y={260 + i * 120}
              width="420"
              height="90"
              fill={i === 1 ? RED : 'white'}
              opacity={i === 1 ? 0.12 : 1}
              stroke={BLACK}
              strokeWidth={6}
              {...baseStroke}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 + i * 0.05, duration: 0.45 }}
            />
          ))}
        </Svg>
      );

    case 30:
      return (
        <Svg>
          {/* Loop 08 move: frame switcher (3 frames) */}
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={i}
              x={320 + i * 420}
              y="300"
              width="360"
              height="300"
              rx="24"
              fill="white"
              stroke={BLACK}
              strokeWidth={6}
              {...baseStroke}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + i * 0.06, duration: 0.45 }}
            />
          ))}
          <motion.rect x="320" y="300" width="360" height="300" rx="24" fill={RED} opacity={0.08} initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ delay: 0.18 }} />
          <motion.path d="M320 660 H1280" {...StrokeBlack} fill="none" {...drawIn} />
        </Svg>
      );

    case 31:
      return (
        <Svg>
          <SplitGuide />
          {/* Loop 09 paired: alignment sliders + values fragmentation */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <motion.line x1="320" y1={320 + i * 160} x2="720" y2={320 + i * 160} {...StrokeBlack} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.6 }} style={{ transformOrigin: '320px 0px' }} />
              <motion.circle cx={480 + i * 90} cy={320 + i * 160} r="20" fill={RED} {...popIn(0.14 + i * 0.05)} />
            </g>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              cx={1040 + (i % 2) * 180}
              cy={360 + Math.floor(i / 2) * 200}
              r="70"
              fill="white"
              stroke={BLACK}
              strokeWidth={6}
              {...baseStroke}
              {...popIn(0.06 + i * 0.05)}
            />
          ))}
        </Svg>
      );

    case 32:
      return (
        <Svg>
          {/* Loop 09 move: model portfolio */}
          {[
            { x: 520, y: 260 },
            { x: 640, y: 320 },
            { x: 760, y: 380 },
          ].map((p, i) => (
            <motion.rect
              key={i}
              x={p.x}
              y={p.y}
              width="520"
              height="320"
              rx="28"
              fill="white"
              stroke={BLACK}
              strokeWidth={6}
              {...baseStroke}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            />
          ))}
          <motion.rect x="520" y="260" width="520" height="320" rx="28" fill={RED} opacity={0.07} initial={{ opacity: 0 }} animate={{ opacity: 0.07 }} transition={{ delay: 0.18 }} />
        </Svg>
      );

    case 33:
      return (
        <Svg>
          <SplitGuide />
          {/* Loop 10 paired: multimodal reality × epistemic stress */}
          <motion.circle cx="420" cy="450" r="220" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...drawIn} />
          <motion.circle cx="420" cy="450" r="120" fill="none" stroke={BLACK} strokeWidth={6} {...baseStroke} {...drawIn} transition={{ ...drawIn.transition, delay: 0.05 }} />
          <motion.circle cx="420" cy="450" r="24" fill={RED} {...popIn(0.18)} />

          <motion.path
            d="M980 450 C 1080 330, 1240 320, 1360 450 C 1240 580, 1080 570, 980 450 Z"
            {...StrokeBlack}
            fill="white"
            {...drawIn}
            transition={{ ...drawIn.transition, delay: 0.06 }}
          />
          <motion.circle cx="1180" cy="450" r="88" fill="none" stroke={BLACK} strokeWidth={6} {...baseStroke} {...drawIn} transition={{ ...drawIn.transition, delay: 0.12 }} />
          <motion.circle cx="1180" cy="450" r="26" fill={RED} {...popIn(0.22)} />
          <motion.path d="M940 720 C 1040 640, 1140 760, 1240 680 C 1340 600, 1420 720, 1500 640" {...StrokeRed} fill="none" {...drawIn} transition={{ ...drawIn.transition, delay: 0.14 }} />
        </Svg>
      );

    case 34:
      return (
        <Svg>
          {/* verification ritual: stamp + checks */}
          <motion.rect x="420" y="240" width="760" height="520" rx="28" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0)} />
          <motion.circle cx="1120" cy="320" r="90" fill="none" stroke={RED} strokeWidth={10} {...baseStroke} {...drawIn} />
          <motion.path d="M1060 320 L1100 360 L1180 280" {...StrokeRed} fill="none" {...drawIn} transition={{ ...drawIn.transition, delay: 0.1 }} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <motion.rect x="480" y={340 + i * 120} width="52" height="52" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.08 + i * 0.05)} />
              <motion.line x1="560" y1={366 + i * 120} x2="1040" y2={366 + i * 120} {...StrokeBlack} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.14 + i * 0.05, duration: 0.4 }} style={{ transformOrigin: `560px ${366 + i * 120}px` }} />
            </g>
          ))}
        </Svg>
      );

    // 35 — Builder OS divider
    case 35:
      return (
        <Svg>
          <SectionPill label="OS" />
          <motion.circle cx="800" cy="660" r="140" fill="none" stroke={BLACK} strokeWidth={6} {...baseStroke} {...drawIn} />
          <motion.rect x="760" y="620" width="80" height="80" fill={RED} {...popIn(0.16)} />
        </Svg>
      );

    // 36 — Builder OS components (5 modules)
    case 36:
      return (
        <Svg>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.rect
              key={i}
              x={320 + (i % 3) * 420}
              y={260 + Math.floor(i / 3) * 260}
              width="360"
              height="200"
              rx="24"
              fill="white"
              stroke={BLACK}
              strokeWidth={6}
              {...baseStroke}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.45 }}
            />
          ))}
          <motion.rect x="320" y="260" width="360" height="200" rx="24" fill={RED} opacity={0.08} initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ delay: 0.18 }} />
          <motion.rect x="740" y="520" width="360" height="200" rx="24" fill={RED} opacity={0.08} initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ delay: 0.22 }} />
        </Svg>
      );

    // 37 — 30-day reset plan (4 weeks)
    case 37:
      return (
        <Svg>
          <motion.line x1="320" y1="520" x2="1280" y2="520" {...StrokeBlack} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9 }} style={{ transformOrigin: '800px 520px' }} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <Node cx={380 + i * 300} cy={520} fill={i === 0 ? RED : 'white'} delay={0.1 + i * 0.06} />
              <motion.rect x={320 + i * 300} y="580" width="120" height="60" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.12 + i * 0.06)} />
            </g>
          ))}
        </Svg>
      );

    // 38 — Community voice divider
    case 38:
      return (
        <Svg>
          <SectionPill label="VOICE" />
          {Array.from({ length: 22 }).map((_, i) => (
            <motion.line
              key={i}
              x1={260 + i * 52}
              y1={660}
              x2={260 + i * 52}
              y2={660 - (i % 5) * 26 - 30}
              stroke={i % 7 === 0 ? RED : BLACK}
              strokeWidth={6}
              {...baseStroke}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.08 + i * 0.02, duration: 0.5 }}
              style={{ transformOrigin: `${260 + i * 52}px 660px` }}
            />
          ))}
        </Svg>
      );

    // 39 — Tool → participant
    case 39:
      return (
        <Svg>
          <SplitGuide />
          <motion.rect x="300" y="320" width="420" height="260" rx="28" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0)} />
          <motion.circle cx="510" cy="450" r="60" fill={RED} opacity={0.12} initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ delay: 0.18 }} />
          <motion.circle cx="1120" cy="420" r="90" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.05)} />
          <motion.rect x="1040" y="520" width="160" height="140" rx="28" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.1)} />
          <motion.path d="M720 520 C 820 460, 920 460, 980 520" {...StrokeRed} fill="none" {...drawIn} transition={{ ...drawIn.transition, delay: 0.12 }} />
        </Svg>
      );

    // 40 — Consumer → builder
    case 40:
      return (
        <Svg>
          <motion.rect x="320" y="260" width="960" height="420" rx="28" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0)} />
          {/* blueprint grid */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={i}
              x1={360 + i * 100}
              y1="300"
              x2={360 + i * 100}
              y2="640"
              stroke={GRAY}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={i}
              x1="360"
              y1={320 + i * 80}
              x2="1240"
              y2={320 + i * 80}
              stroke={GRAY}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <motion.rect x="420" y="360" width="320" height="220" fill={RED} opacity={0.08} initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ delay: 0.2 }} />
          <motion.path d="M820 580 L1000 360 L1180 580" {...StrokeBlack} fill="none" {...drawIn} transition={{ ...drawIn.transition, delay: 0.08 }} />
        </Svg>
      );

    // 41 — Sources divider
    case 41:
      return (
        <Svg>
          <SectionPill label="SOURCES" />
          <motion.rect x="520" y="620" width="560" height="180" rx="24" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0.12)} />
          <motion.line x1="560" y1="680" x2="1040" y2="680" {...StrokeBlack} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.18, duration: 0.5 }} style={{ transformOrigin: '560px 680px' }} />
          <motion.line x1="560" y1="740" x2="940" y2="740" {...StrokeBlack} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.22, duration: 0.5 }} style={{ transformOrigin: '560px 740px' }} />
        </Svg>
      );

    // 42 — Tier 1: bookshelf / canon
    case 42:
      return (
        <Svg>
          <motion.rect x="360" y="300" width="880" height="420" rx="28" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...popIn(0)} />
          <motion.line x1="360" y1="420" x2="1240" y2="420" {...StrokeBlack} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.12, duration: 0.6 }} style={{ transformOrigin: '800px 420px' }} />
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.rect
              key={i}
              x={420 + i * 90}
              y={460 - (i % 3) * 10}
              width="60"
              height={180 + (i % 4) * 12}
              fill={i === 0 || i === 5 ? RED : 'white'}
              opacity={i === 0 || i === 5 ? 0.12 : 1}
              stroke={BLACK}
              strokeWidth={6}
              {...baseStroke}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.04, duration: 0.45 }}
            />
          ))}
        </Svg>
      );

    // 43 — Credits: sparkle / close
    case 43:
      return (
        <Svg>
          <motion.circle cx="800" cy="450" r="260" fill="white" stroke={BLACK} strokeWidth={6} {...baseStroke} {...drawIn} />
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.line
              key={i}
              x1="800"
              y1="450"
              x2={800 + Math.cos((i * 22.5 * Math.PI) / 180) * 340}
              y2={450 + Math.sin((i * 22.5 * Math.PI) / 180) * 340}
              stroke={i % 4 === 0 ? RED : BLACK}
              strokeWidth={i % 4 === 0 ? 10 : 6}
              {...baseStroke}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.05 + i * 0.02, duration: 0.5 }}
              style={{ transformOrigin: '800px 450px' }}
            />
          ))}
          <motion.rect x="760" y="410" width="80" height="80" fill={RED} {...popIn(0.2)} />
        </Svg>
      );

    default:
      return (
        <Svg>
          <SplitGuide />
          <motion.circle cx="800" cy="450" r="220" fill="none" stroke={BLACK} strokeWidth={6} {...baseStroke} {...drawIn} />
          <motion.circle cx={800 + (slideId % 5) * 40 - 80} cy={450 - (slideId % 3) * 50} r="24" fill={RED} {...popIn(0.15)} />
        </Svg>
      );
  }
};


