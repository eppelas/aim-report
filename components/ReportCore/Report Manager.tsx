
import React, { useState, useMemo, useEffect } from 'react';
import { layers, shifts } from './data';
import { SlideLayer } from './SlideLayer';
import { SlideShift } from './SlideShift';
import { SlideSummary } from './SlideSummary';

type TimelineItem = 
  | { type: 'layer'; data: any }
  | { type: 'shift'; data: any }
  | { type: 'summary' };

interface ReportManagerProps {
    onComplete?: () => void;
    onExit?: () => void;
    initialIndex?: number;
    theme?: 'dark' | 'light';
}

export const ReportManager: React.FC<ReportManagerProps> = ({ 
    onComplete, 
    onExit,
    initialIndex = 0,
    theme = 'dark' 
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const isDark = theme === 'dark';

    // Construct Timeline
    const timeline = useMemo<TimelineItem[]>(() => {
        const items: TimelineItem[] = [];
        const sortedShifts = [...shifts].sort((a, b) => parseInt(a.id) - parseInt(b.id));

        layers.forEach(layer => {
            items.push({ type: 'layer', data: layer });
            const layerShifts = sortedShifts.filter(s => s.layerId === layer.id);
            layerShifts.forEach(shift => {
                items.push({ type: 'shift', data: shift });
            });
        });
        
        items.push({ type: 'summary' });
        return items;
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < timeline.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else if (onComplete) {
            onComplete();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else if (onExit) {
            onExit();
        }
    };

    const currentItem = timeline[currentIndex];

    // Helper for labels
    const getNextLabel = () => {
        if (currentIndex >= timeline.length - 1) return "Finish";
        const nextItem = timeline[currentIndex + 1];
        if (nextItem.type === 'layer') return `Layer ${nextItem.data.id}: ${nextItem.data.title}`;
        if (nextItem.type === 'shift') return `Shift ${nextItem.data.id}: ${nextItem.data.title}`;
        if (nextItem.type === 'summary') return "Summary & Gap";
        return "";
    };

    const getPrevLabel = () => {
        if (currentIndex <= 0) return "Start";
        const prevItem = timeline[currentIndex - 1];
        if (prevItem.type === 'layer') return `Layer ${prevItem.data.id} Intro`;
        if (prevItem.type === 'shift') return `Shift ${prevItem.data.id}`;
        if (prevItem.type === 'summary') return "Summary";
        return "";
    };

    if (!currentItem) return <div>Loading...</div>;

    if (currentItem.type === 'layer') {
        return (
            <SlideLayer 
                data={currentItem.data}
                onNext={handleNext}
                onPrev={handlePrev}
                nextTitle={getNextLabel()}
                isDark={isDark}
            />
        );
    } 
    
    if (currentItem.type === 'summary') {
        return (
            <SlideSummary 
                onNext={handleNext}
                onPrev={handlePrev}
                isDark={isDark}
            />
        );
    }

    return (
        <SlideShift 
            data={currentItem.data}
            onNext={handleNext}
            onPrev={handlePrev}
            nextLabel={getNextLabel()}
            prevLabel={getPrevLabel()}
            isDark={isDark}
        />
    );
};
