
import React, { useEffect, useRef } from 'react';

export const RuptureLine: React.FC = () => {
  const rupturePathRef = useRef<SVGPathElement>(null);
  const ruptureContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    // Create points for the line strip
    const points = Array.from({ length: 40 }, (_, i) => ({ x: 0, baseY: i * (1000 / 39) })); 
    
    // Check touch capability
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // Initialize "mouse" position.
    // On desktop: off-screen (-9999). 
    // On mobile: Center screen. This acts as a "phantom cursor" so when the user scrolls,
    // the line moves past this center point and reacts/distorts even without direct touch.
    const mouse = { 
        x: isTouch ? window.innerWidth / 2 : -9999, 
        y: isTouch ? window.innerHeight / 2 : -9999 
    };

    const ruptureRect = { top: 0, height: 0, width: 0, left: 0 };
    
    // STRICT ALIGNMENT: 80px width
    const SVG_WIDTH = 80; 
    const SVG_CENTER = SVG_WIDTH / 2;

    const updateRuptureRect = () => {
        if (ruptureContainerRef.current) {
            const r = ruptureContainerRef.current.getBoundingClientRect();
            ruptureRect.top = r.top;
            ruptureRect.height = r.height;
            ruptureRect.width = r.width;
            ruptureRect.left = r.left;
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    // Update coordinates on touch move
    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    };
    
    const animateRupture = () => {
        if (!rupturePathRef.current) return;

        updateRuptureRect(); 
        
        const pathData = points.map((p, i) => {
            // Map Point Y (0-1000) to Screen Y
            const pointScreenY = ruptureRect.top + (p.baseY / 1000) * ruptureRect.height;
            const distY = Math.abs(mouse.y - pointScreenY);
            
            let offsetX = 0;
            const interactionDist = 150; // Tighter interaction radius
            
            // Interaction Check:
            // 1. Point is within vertical distance of mouse/touch
            // 2. Mouse/Touch X is valid (>-100)
            if (distY < interactionDist && mouse.x > -100) {
                // Calculate intensity
                const intensity = Math.pow(1 - (distY / interactionDist), 2);
                
                const centerX = ruptureRect.left + (ruptureRect.width / 2);
                
                // Repel logic
                const dirX = mouse.x < centerX ? 1 : -1; 
                
                // Reduced noise
                const noise = (Math.random() - 0.5) * 1.5; 
                
                // Max distortion 15px
                offsetX = (dirX * intensity * 15) + noise; 
            } else {
                 // Minimal idle movement
                 const time = Date.now() * 0.001; 
                 const wave = Math.sin(i * 0.1 + time); 
                 offsetX = wave * 0.5; 
            }

            // Damping for stability
            p.x += (offsetX - p.x) * 0.1;

            return `${i === 0 ? 'M' : 'L'} ${SVG_CENTER + p.x} ${p.baseY}`; 
        }).join(' ');

        rupturePathRef.current.setAttribute('d', pathData);
        animationFrameId = requestAnimationFrame(animateRupture);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', updateRuptureRect);
    window.addEventListener('resize', updateRuptureRect);
    animationFrameId = requestAnimationFrame(animateRupture);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('scroll', updateRuptureRect);
        window.removeEventListener('resize', updateRuptureRect);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={ruptureContainerRef} className="absolute left-1/2 top-0 bottom-0 w-[80px] -translate-x-1/2 pointer-events-none h-full z-0">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 80 1000" preserveAspectRatio="none">
            <path 
            ref={rupturePathRef}
            d="" 
            fill="none" 
            stroke="#DC2626" 
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            filter="drop-shadow(0 0 5px #DC2626)"
            />
        </svg>
    </div>
  );
};
