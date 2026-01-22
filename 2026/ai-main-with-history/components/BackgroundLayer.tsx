import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShiftMetaphor } from './ShiftMetaphor';

interface BackgroundLayerProps {
    isDark: boolean;
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ isDark }) => {
    const bgSvgRef = useRef<SVGSVGElement>(null);
    
    // Metaphors for background ambiance
    const bgMetaphors = [
        { id: '01', x: 150, y: 150, scale: 1.5, opacity: 0.1 }, // Energy
        { id: '03', x: 850, y: 200, scale: 1.2, opacity: 0.1 }, // Sovereignty
        { id: '07', x: 200, y: 800, scale: 1.8, opacity: 0.08 }, // Craft
        { id: '11', x: 800, y: 700, scale: 1.4, opacity: 0.1 }, // Intimacy
    ];

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!bgSvgRef.current) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            
            gsap.to(bgSvgRef.current.querySelectorAll('.bg-metaphor'), {
                x: (i) => x * (i % 2 === 0 ? 1 : -1), // Opposite directions
                y: (i) => y * (i % 2 === 0 ? 1 : -1),
                duration: 2,
                ease: "power2.out"
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Dynamic gradient colors based on theme to match SummaryView
    const gradientColor = isDark ? '#0A0A0A' : '#F4F4F5';

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <svg ref={bgSvgRef} viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-30">
                {bgMetaphors.map((m, i) => (
                    <g key={i} className="bg-metaphor" transform={`translate(${m.x}, ${m.y}) scale(${m.scale})`} style={{ opacity: m.opacity }}>
                        <ShiftMetaphor id={m.id} isDark={isDark} />
                    </g>
                ))}
            </svg>
            <div 
                className="absolute inset-0 opacity-90" 
                style={{ background: `linear-gradient(to bottom, ${gradientColor}, transparent 50%, ${gradientColor})` }}
            ></div>
        </div>
    );
};