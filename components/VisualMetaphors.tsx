import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VisualType, StatItem, TeamMember } from '../types';
import { ReportMetaphor } from './ReportMetaphors';
import { GAC_VISUAL_MAP } from './GacVisuals';

interface Props {
  type: VisualType;
  slideId?: number;
  stats?: StatItem[];
  team?: TeamMember[];
  images?: string[];
  quotes?: { text: string; author: string; date?: string }[];
  sectionTitle?: string;
}

// Red-White Swiss Style: Flat, No Shadows, Bold
const RED = "#DC2626";
const BLACK = "#333333"; // Updated from #171717 for better readability

export const VisualMetaphor: React.FC<Props> = ({ type, slideId, stats, team, images, quotes, sectionTitle }) => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  // GAC-C / Context Gap reference visuals (generic icon library)
  // If a slide explicitly requests one of these types, render it regardless of slideId.
  const GacVisual = GAC_VISUAL_MAP[type];
  if (GacVisual) return <GacVisual />;

  // Annual Report: unique metaphor per slide (see `ReportMetaphors.tsx`)
  // This intentionally overrides the older shared metaphors catalog when slideId is provided.
  // We still keep the older cases as a fallback for other decks/components.
  if (typeof slideId === 'number') {
    return <ReportMetaphor slideId={slideId} stats={stats} />;
  }

  switch (type) {
    case 'CONTEXT_GAP_COVER':
      // Main cover visual: two diverging curves representing the Context Gap
      // Machine capability accelerating vs Human adaptation lagging
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-2xl" preserveAspectRatio="xMidYMid meet">
            {/* Background grid (subtle) */}
            <defs>
              <pattern id="coverGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="400" height="200" fill="url(#coverGrid)" />

            {/* Starting point - shared origin */}
            <circle cx="40" cy="120" r="6" fill={BLACK} />

            {/* Machine curve - exponential rise (red) */}
            <motion.path
              d="M40 120 C 80 120, 120 115, 160 100 C 200 85, 260 50, 360 15"
              fill="none"
              stroke={RED}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            />

            {/* Human curve - slower adaptation (black/gray) */}
            <motion.path
              d="M40 120 C 80 120, 120 125, 160 135 C 200 145, 260 160, 360 180"
              fill="none"
              stroke={BLACK}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
            />

            {/* Gap visualization - vertical dashed lines showing distance */}
            {[160, 220, 280, 340].map((x, i) => {
              const machineY = x === 160 ? 100 : x === 220 ? 70 : x === 280 ? 40 : 20;
              const humanY = x === 160 ? 135 : x === 220 ? 150 : x === 280 ? 165 : 178;
              return (
                <motion.line
                  key={i}
                  x1={x}
                  y1={machineY}
                  x2={x}
                  y2={humanY}
                  stroke={RED}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 2 + i * 0.2 }}
                />
              );
            })}

            {/* Labels */}
            <motion.text
              x="365"
              y="20"
              fontSize="10"
              fontFamily="monospace"
              fill={RED}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              MACHINES
            </motion.text>
            <motion.text
              x="365"
              y="185"
              fontSize="10"
              fontFamily="monospace"
              fill={BLACK}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
            >
              HUMANS
            </motion.text>

            {/* GAP label in the middle */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3, duration: 0.5 }}
            >
              <rect x="245" y="85" width="50" height="24" fill="white" stroke={RED} strokeWidth="1" />
              <text x="270" y="101" fontSize="10" fontFamily="monospace" fill={RED} textAnchor="middle" fontWeight="bold">
                GAP
              </text>
            </motion.g>

            {/* Animated pulse on the gap */}
            <motion.circle
              cx="270"
              cy="97"
              r="30"
              fill="none"
              stroke={RED}
              strokeWidth="1"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 3.5 }}
            />
          </svg>
        </div>
      );

    case 'SOLSTICE_SUN':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="w-full h-[2px] bg-black absolute"
          />
          <motion.div
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="w-48 h-48 rounded-full bg-red-600 z-10 mix-blend-multiply"
            style={{ marginBottom: '-2px' }}
          />
        </div>
      );

    case 'SECTION_DIVIDER':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-32 h-1 bg-red-600" />
            {sectionTitle && (
              <span className="text-6xl md:text-8xl font-black text-red-600 tracking-tighter">
                {sectionTitle}
              </span>
            )}
            <div className="w-32 h-1 bg-red-600" />
          </motion.div>
        </div>
      );

    case 'CONTEXT_CHAOS':
      // Enhanced chaos visual - larger, more particles, better contrast
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Outer ring of chaos */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute ${i % 3 === 0 ? 'w-6 h-6 bg-red-200' : 'w-4 h-4 bg-neutral-300'}`}
              initial={{ x: 0, y: 0, opacity: 0.3, rotate: 0 }}
              animate={{
                x: Math.cos(i * 22.5 * (Math.PI / 180)) * (80 + (i % 4) * 20),
                y: Math.sin(i * 22.5 * (Math.PI / 180)) * (80 + (i % 4) * 20),
                opacity: [0.3, 0.9, 0.3],
                rotate: i * 20
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeInOut"
              }}
            />
          ))}
          {/* Inner chaos ring */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`inner-${i}`}
              className="absolute w-5 h-5 border-2 border-red-400"
              animate={{
                x: Math.cos((i * 45 + 22.5) * (Math.PI / 180)) * 40,
                y: Math.sin((i * 45 + 22.5) * (Math.PI / 180)) * 40,
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
          {/* Center focal point */}
          <motion.div
            className="w-10 h-10 bg-red-600 z-10"
            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          {/* Pulsing ring */}
          <motion.div
            className="absolute w-20 h-20 border-2 border-red-600 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      );

    case 'FOUR_STAGES':
      return (
        <div className="flex gap-2 items-end justify-center h-full pb-12">
          {[
            { label: "Container", height: 60 },
            { label: "Dataset", height: 90 },
            { label: "Framework", height: 120 },
            { label: "Artifact", height: 160, active: true }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: item.height }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "circOut" }}
              className={`w-16 border-2 border-black ${item.active ? 'bg-red-600 border-none' : 'bg-transparent'}`}
            />
          ))}
        </div>
      );

    case 'CONTAINER_CIRCLE':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-black"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 - i * 0.3 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              style={{ width: 120 + i * 60, height: 120 + i * 60 }}
            />
          ))}
          <motion.div
            className="w-8 h-8 bg-red-600 rounded-full z-10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      );

    case 'CONTEXT_ALCHEMY':
      return (
        <div className="flex items-center justify-center h-full gap-8">
          <motion.div
            className="w-20 h-20 border-2 border-dashed border-black rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            className="text-4xl text-black font-light"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            +
          </motion.div>
          <motion.div className="w-20 h-20 border-2 border-black flex items-center justify-center">
            <div className="w-10 h-10 bg-red-600" />
          </motion.div>
          <motion.div
            className="text-4xl text-black font-light"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            =
          </motion.div>
          <motion.div
            className="w-20 h-20 bg-red-600 rounded-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      );

    case 'DILTS_PYRAMID':
      return (
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 300 250" className="w-full h-full max-w-xs">
            {[
              { y: 200, width: 260, label: "Environment", delay: 0 },
              { y: 165, width: 220, label: "Behavior", delay: 0.1 },
              { y: 130, width: 180, label: "Skills", delay: 0.2 },
              { y: 95, width: 140, label: "Values", delay: 0.3 },
              { y: 60, width: 100, label: "Identity", delay: 0.4 },
              { y: 25, width: 60, label: "Mission", delay: 0.5, active: true }
            ].map((level, i) => (
              <motion.g key={i}>
                <motion.rect
                  x={(300 - level.width) / 2}
                  y={level.y}
                  width={level.width}
                  height={30}
                  fill={level.active ? RED : "transparent"}
                  stroke={BLACK}
                  strokeWidth="2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: level.delay, duration: 0.5 }}
                />
                <motion.text
                  x="150"
                  y={level.y + 20}
                  textAnchor="middle"
                  fill={level.active ? "white" : BLACK}
                  fontSize="10"
                  fontFamily="monospace"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: level.delay + 0.3 }}
                >
                  {level.label}
                </motion.text>
              </motion.g>
            ))}
          </svg>
        </div>
      );

    case 'CREATIVE_POSTER':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="w-48 h-64 border-2 border-black bg-white relative overflow-hidden"
          >
            <motion.div
              className="absolute top-6 left-6 w-16 h-2 bg-black"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 }}
            />
            <motion.div
              className="absolute top-12 left-6 w-24 h-2 bg-neutral-200"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1/3 bg-red-600"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <motion.div
              className="absolute top-1/2 right-4 w-12 h-12 rounded-full border-2 border-black"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
            />
          </motion.div>
        </div>
      );

    case 'GAME_LOOP':
      return (
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs">
            <motion.circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={BLACK}
              strokeWidth="2"
              strokeDasharray="10 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            {[
              { angle: -90, label: "CAPTURE" },
              { angle: 0, label: "NORMALIZE" },
              { angle: 90, label: "LINK" },
              { angle: 180, label: "OUTPUT" }
            ].map((item, i) => {
              const radian = item.angle * (Math.PI / 180);
              const x = 100 + Math.cos(radian) * 80;
              const y = 100 + Math.sin(radian) * 80;
              return (
                <motion.g key={i}>
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill={i === 0 ? RED : "white"}
                    stroke={BLACK}
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                  />
                  <motion.text
                    x={x}
                    y={y + (item.angle === -90 ? -15 : item.angle === 90 ? 20 : 0)}
                    textAnchor="middle"
                    fill={BLACK}
                    fontSize="8"
                    fontFamily="monospace"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.2 + 0.3 }}
                  >
                    {item.label}
                  </motion.text>
                </motion.g>
              );
            })}
            <motion.path
              d="M100 20 L115 35 L85 35 Z"
              fill={RED}
              animate={{ rotate: 360 }}
              style={{ transformOrigin: "100px 100px" }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
      );

    case 'DATA_VOLUME':
      return (
        <div className="flex items-end justify-center gap-4 h-full pb-12 px-8">
          {[
            { value: 100, label: "participants" },
            { value: 417, label: "messages" },
            { value: 5, label: "sessions" },
            { value: 13, label: "daily posts" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <motion.div
                className="w-12 bg-black"
                initial={{ height: 0 }}
                animate={{ height: Math.min(item.value, 150) }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: "circOut" }}
                style={{ backgroundColor: i === 0 ? RED : BLACK }}
              />
              <span className="text-[10px] font-mono text-neutral-500 text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      );

    case 'STATS_ANIMATED':
    case 'ALEX_STATS':
      if (!stats) return null;
      return (
        <div className="w-full h-full flex items-center justify-center px-4">
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-4xl">
            {stats.map((stat, i) => {
              const isRed = stat.color === 'red';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className={`relative flex items-center gap-4 px-6 py-4 cursor-default overflow-hidden ${
                    isRed
                      ? 'bg-red-600 text-white'
                      : 'bg-neutral-900 text-white'
                  }`}
                  style={{ minWidth: '160px' }}
                >
                  {/* Subtle diagonal stripe pattern */}
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, white 8px, white 9px)'
                    }}
                  />

                  {/* Number with animated underline */}
                  <div className="relative z-10">
                    <motion.span
                      className="text-4xl md:text-5xl font-black font-mono tracking-tight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.08 + 0.2 }}
                    >
                      {stat.value}{stat.suffix || ''}
                    </motion.span>
                    <motion.div
                      className={`h-1 ${isRed ? 'bg-white/40' : 'bg-red-500'} mt-1`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: i * 0.08 + 0.3, duration: 0.3 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>

                  {/* Label */}
                  <motion.span
                    className={`text-sm md:text-base font-mono uppercase tracking-wider ${
                      isRed ? 'text-white/80' : 'text-neutral-400'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.08 + 0.25 }}
                  >
                    {stat.label}
                  </motion.span>
                </motion.div>
              );
            })}
          </div>
        </div>
      );

    case 'TEAM_GRID':
      if (!team) return null;
      return (
        <div className="w-full h-full flex items-center justify-center px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-neutral-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-neutral-400">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-black text-center">{member.name}</span>
                <span className="text-xs text-neutral-500">{member.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'IMAGE_FEATURE':
      if (!images || images.length === 0) return null;
      return (
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
            {images.slice(0, 6).map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-lg border border-neutral-200"
              >
                <img
                  src={src}
                  alt={`Context Daily ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'MULTI_QUOTES':
      if (!quotes) return null;
      return (
        <div className="w-full h-full flex items-center justify-center px-8">
          <div className="flex flex-col gap-4 max-w-lg">
            {quotes.map((quote, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.02, x: 8 }}
                className="border-l-2 border-red-600 pl-4 py-2 cursor-pointer group hover:bg-red-50/50 rounded-r-lg transition-colors"
              >
                <p className="text-sm italic text-neutral-700 group-hover:text-neutral-900 transition-colors line-clamp-2 group-hover:line-clamp-none">
                  "{quote.text}"
                </p>
                <p className="text-xs text-neutral-500 mt-1 group-hover:text-red-600 transition-colors">
                  — {quote.author}{quote.date && ` • ${quote.date}`}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'BUDDY_GRAPH':
      return (
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs">
            {[0, 1, 2, 3, 4].map((i) => {
              const angle1 = (i * 72) * (Math.PI / 180);
              const angle2 = ((i * 72) + 144) * (Math.PI / 180);
              const x1 = 100 + Math.cos(angle1) * 70;
              const y1 = 100 + Math.sin(angle1) * 70;
              const x2 = 100 + Math.cos(angle2) * 70;
              const y2 = 100 + Math.sin(angle2) * 70;
              return (
                <motion.g key={i}>
                  <motion.line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={BLACK}
                    strokeWidth="1"
                    strokeDasharray="4 2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  />
                  <motion.circle
                    cx={x1} cy={y1} r="12"
                    fill="white"
                    stroke={BLACK}
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  />
                  <motion.circle
                    cx={x2} cy={y2} r="12"
                    fill={RED}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  />
                </motion.g>
              );
            })}
          </svg>
        </div>
      );

    case 'OBSIDIAN_TREE':
      return (
        <div className="font-mono text-sm space-y-2 w-full px-4">
          {[
            { depth: 0, icon: "📁", name: "context-lab/", active: false },
            { depth: 1, icon: "📄", name: "session-1-melnichek.md", active: false },
            { depth: 1, icon: "📄", name: "session-2-alchemy.md", active: true },
            { depth: 1, icon: "📄", name: "session-3-dilts.md", active: false },
            { depth: 1, icon: "📄", name: "session-4-anka.md", active: false },
            { depth: 1, icon: "📁", name: "daily-posts/", active: false },
            { depth: 2, icon: "📄", name: "#ContextDaily 01-13", active: false },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-2 ${item.active ? 'text-red-600' : 'text-neutral-600'}`}
              style={{ paddingLeft: item.depth * 16 }}
            >
              <span>{item.icon}</span>
              <span className={item.active ? 'font-bold' : ''}>{item.name}</span>
            </motion.div>
          ))}
        </div>
      );

    case 'QUOTE_BLOCK':
      return (
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            className="w-24 h-24 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <span className="text-8xl text-red-600 font-serif">"</span>
          </motion.div>
        </div>
      );

    case 'DAILY_GALLERY':
      return (
        <div className="grid grid-cols-4 gap-2 p-4">
          {Array.from({ length: 13 }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-12 h-12 border-2 flex items-center justify-center font-mono text-xs ${
                i < 7 ? 'border-red-600 text-red-600' : 'border-black'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              {String(i + 1).padStart(2, '0')}
            </motion.div>
          ))}
        </div>
      );

    case 'FOG_CLARITY':
      // Enhanced fog-to-clarity transition - larger, more impactful
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Background fog particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-24 h-24 rounded-full bg-neutral-200"
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${15 + Math.floor(i / 4) * 30}%`,
              }}
              initial={{ opacity: 0.6, filter: "blur(20px)", scale: 1.2 }}
              animate={{ opacity: 0, filter: "blur(40px)", scale: 0.5 }}
              transition={{ duration: 3, delay: i * 0.15 }}
            />
          ))}
          {/* Main clarity text */}
          <motion.div
            initial={{ opacity: 0.1, filter: "blur(12px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="text-7xl md:text-8xl font-sans font-black text-black tracking-tighter uppercase z-10"
          >
            CLARITY
          </motion.div>
          {/* Red accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="absolute bottom-1/3 w-48 h-3 bg-red-600"
          />
          {/* Subtle pulsing ring */}
          <motion.div
            className="absolute w-80 h-80 border border-red-300 rounded-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: [0, 0.5, 0] }}
            transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
          />
        </div>
      );

    case 'TECH_GRID':
      // Enhanced tech grid - larger, more dynamic, with pulse effect
      return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <div className="relative">
            <div className="grid grid-cols-6 gap-1 p-4">
              {Array.from({ length: 36 }).map((_, i) => {
                const isCenter = i === 14 || i === 15 || i === 20 || i === 21;
                const isHighlight = [7, 8, 13, 22, 27, 28].includes(i);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      backgroundColor: isCenter ? RED : isHighlight ? '#FEE2E2' : 'transparent'
                    }}
                    transition={{ delay: i * 0.02, duration: 0.3 }}
                    className={`w-12 h-12 md:w-14 md:h-14 border border-black/30 ${
                      isCenter ? 'border-2 border-red-600' : ''
                    }`}
                  />
                );
              })}
            </div>
            {/* Pulsing overlay on center */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-28 h-28 md:w-32 md:h-32 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ border: `2px solid ${RED}`, borderRadius: '4px' }}
            />
          </div>
        </div>
      );

    case 'SPARKS':
      return (
        <div className="w-full h-full relative flex items-center justify-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-600"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.cos(i * 45 * (Math.PI / 180)) * 80,
                y: Math.sin(i * 45 * (Math.PI / 180)) * 80,
                opacity: 0,
                scale: 0.5
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.1
              }}
            />
          ))}
          <div className="w-2 h-2 bg-black rounded-full z-10" />
        </div>
      );

    case 'BREATH':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-48 h-48 rounded-full border-2 border-neutral-200"
          />
          <motion.div
            animate={{ scale: [1, 0.6, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 h-48 rounded-full bg-red-600 mix-blend-multiply opacity-80"
          />
        </div>
      );

    case 'BURNING':
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <motion.div className="w-32 h-48 border-2 border-black bg-white relative overflow-hidden">
            <div className="absolute top-4 left-4 w-20 h-2 bg-neutral-200" />
            <div className="absolute top-10 left-4 w-14 h-2 bg-neutral-200" />
            <motion.div
              animate={{ height: ["0%", "100%"] }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
              className="absolute bottom-0 left-0 w-full bg-red-600"
            />
          </motion.div>
        </div>
      );

    case 'LINKS_QR':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <motion.div
            className="w-32 h-32 bg-white p-2 rounded-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Ft.me%2Fai_mind_set"
              alt="QR Code"
              className="w-full h-full"
            />
          </motion.div>
          <motion.div
            className="text-sm font-mono text-neutral-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            t.me/ai_mind_set
          </motion.div>
        </div>
      );

    case 'SESSION_CARD':
      return (
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            className="w-48 h-32 border-2 border-black bg-white p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="w-8 h-8 bg-red-600 rounded-full mb-4" />
            <div className="w-full h-2 bg-neutral-200 mb-2" />
            <div className="w-3/4 h-2 bg-neutral-200" />
          </motion.div>
        </div>
      );

    // ═══════════════════════════════════════════════════════════════════
    // NEW METAPHORS FROM ALCHEMY PROJECT - Red/White Swiss Style
    // ═══════════════════════════════════════════════════════════════════

    case 'ALCHEMY_FILTER':
      // Просеивание - фильтрация хаоса в ценность
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-64 h-64">
            {/* Воронка */}
            <motion.path
              d="M40,40 L160,40 L110,120 L110,180 L90,180 L90,120 Z"
              stroke={RED} strokeWidth="3" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            {/* Падающие частицы */}
            {[0, 1, 2, 3, 4].map(i => (
              <motion.circle
                key={i}
                cx={70 + i * 15} cy="30" r="4"
                fill={i % 2 === 0 ? RED : BLACK}
                animate={{ cy: [30, 180], opacity: [1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
            {/* Одна ценная капля выходит */}
            <motion.circle
              cx="100" cy="185" r="6"
              fill={RED}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            />
          </svg>
        </div>
      );

    case 'ALCHEMY_MIX':
      // Алхимия - смешивание контекстов
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-64 h-64">
            {/* Два круга-контекста */}
            <motion.circle
              cx="70" cy="100" r="40"
              stroke={RED} strokeWidth="3" fill="none"
              animate={{ x: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="130" cy="100" r="40"
              stroke={BLACK} strokeWidth="3" fill="none"
              animate={{ x: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Зона пересечения - алхимия */}
            <motion.ellipse
              cx="100" cy="100" rx="15" ry="35"
              fill={RED}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Плюс в центре */}
            <motion.path
              d="M100,85 L100,115 M85,100 L115,100"
              stroke="white" strokeWidth="3"
              animate={{ rotate: [0, 180] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: '100px 100px' }}
            />
          </svg>
        </div>
      );

    case 'COMPASS_ARTIFACT':
      // Компас - артефакт года
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-72 h-72">
            {/* Внешний круг */}
            <motion.circle
              cx="100" cy="100" r="80"
              stroke={BLACK} strokeWidth="2" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            {/* Деления */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <motion.line
                key={i}
                x1={100 + 70 * Math.cos(deg * Math.PI / 180)}
                y1={100 + 70 * Math.sin(deg * Math.PI / 180)}
                x2={100 + 80 * Math.cos(deg * Math.PI / 180)}
                y2={100 + 80 * Math.sin(deg * Math.PI / 180)}
                stroke={BLACK} strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
            {/* Стрелка компаса */}
            <motion.polygon
              points="100,30 110,100 100,120 90,100"
              fill={RED}
              animate={{ rotate: [0, 30, -20, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: '100px 100px' }}
            />
            {/* Центр */}
            <circle cx="100" cy="100" r="8" fill={BLACK} />
          </svg>
        </div>
      );

    case 'FIRE_RITUAL':
      // Огонь - ритуал отпускания
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-64 h-64">
            {/* Языки пламени */}
            {[0, 1, 2, 3, 4].map(i => (
              <motion.path
                key={i}
                d={`M${80 + i * 10},170 Q${75 + i * 10},${130 - i * 5} ${100},${60 + Math.abs(2 - i) * 15} Q${125 - i * 10},${130 - i * 5} ${120 - i * 10},170`}
                fill={i % 2 === 0 ? RED : "#FF6B6B"}
                animate={{
                  d: [
                    `M${80 + i * 10},170 Q${75 + i * 10},${130 - i * 5} ${100},${60 + Math.abs(2 - i) * 15} Q${125 - i * 10},${130 - i * 5} ${120 - i * 10},170`,
                    `M${80 + i * 10},170 Q${70 + i * 10},${120 - i * 5} ${100},${50 + Math.abs(2 - i) * 15} Q${130 - i * 10},${120 - i * 5} ${120 - i * 10},170`,
                    `M${80 + i * 10},170 Q${75 + i * 10},${130 - i * 5} ${100},${60 + Math.abs(2 - i) * 15} Q${125 - i * 10},${130 - i * 5} ${120 - i * 10},170`
                  ],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
              />
            ))}
            {/* Искры */}
            {[0, 1, 2].map(i => (
              <motion.circle
                key={`spark-${i}`}
                cx={90 + i * 10} cy="80" r="2"
                fill={RED}
                animate={{ cy: [80, 30], opacity: [1, 0], x: [(i - 1) * 5, (i - 1) * 15] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
          </svg>
        </div>
      );

    case 'MOON_SOLSTICE':
      // Луна - солнцестояние
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-neutral-900 rounded-3xl overflow-hidden">
          {/* Звёзды */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
          {/* Луна с красным свечением */}
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-300 shadow-2xl" />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: `0 0 60px 20px ${RED}` }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      );

    case 'ECLIPSE_TRANSITION':
      // Затмение - переход 2025 → 2026
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-72 h-72">
            {/* Солнце 2025 */}
            <circle cx="100" cy="100" r="60" fill={RED} />
            {/* Луна 2026 проходит */}
            <motion.circle
              cx="100" cy="100" r="58"
              fill={BLACK}
              initial={{ x: -80 }}
              animate={{ x: [80, -80] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Корона */}
            <motion.circle
              cx="100" cy="100" r="70"
              stroke={RED} strokeWidth="1" fill="none"
              style={{ strokeDasharray: "5 5" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </svg>
          {/* Годы */}
          <motion.span
            className="absolute left-8 text-6xl font-black text-neutral-300"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            2025
          </motion.span>
          <motion.span
            className="absolute right-8 text-6xl font-black text-red-600"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            2026
          </motion.span>
        </div>
      );

    case 'BACKPACK_JOURNEY':
      // Рюкзак - что берём с собой
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-64 h-64">
            {/* Рюкзак */}
            <motion.path
              d="M60,50 C60,30 140,30 140,50 L145,170 C145,180 55,180 55,170 Z"
              stroke={RED} strokeWidth="3" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            {/* Карман */}
            <rect x="75" y="100" width="50" height="40" stroke={RED} strokeWidth="2" fill="none" rx="5" />
            {/* Лямки */}
            <path d="M70,50 L50,130" stroke={BLACK} strokeWidth="3" fill="none" />
            <path d="M130,50 L150,130" stroke={BLACK} strokeWidth="3" fill="none" />
            {/* Вещи вылетают */}
            {['⭐', '💡', '🎯'].map((emoji, i) => (
              <motion.text
                key={i}
                x={100} y={60}
                fontSize="20"
                textAnchor="middle"
                animate={{
                  y: [60, 20, 60],
                  x: [100, 100 + (i - 1) * 30, 100],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
              >
                {emoji}
              </motion.text>
            ))}
          </svg>
        </div>
      );

    case 'SPARKLE_FINALE':
      // Финальные искры
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Центральная звезда */}
          <motion.svg viewBox="0 0 200 200" className="w-64 h-64">
            <motion.path
              d="M100,20 L115,80 L180,100 L115,120 L100,180 L85,120 L20,100 L85,80 Z"
              fill={RED}
              animate={{
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 15, -15, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: '100px 100px' }}
            />
          </motion.svg>
          {/* Мелкие искры вокруг */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-red-600 rounded-full"
                style={{
                  left: '50%',
                  top: '50%'
                }}
                animate={{
                  x: [0, Math.cos(angle) * 150],
                  y: [0, Math.sin(angle) * 150],
                  opacity: [1, 0],
                  scale: [1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: "easeOut" }}
              />
            );
          })}
        </div>
      );

    default:
      return null;
  }
};
