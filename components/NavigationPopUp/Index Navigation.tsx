import React, { useState } from 'react';
import { IndexTrigger } from './IndexTrigger';
import { IndexOverlay } from './IndexOverlay';

interface IndexNavigationProps {
    onNavigate: (type: 'landing' | 'layer' | 'shift' | 'summary' | 'manifesto' | 'thankyou', id?: string) => void;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    lang: 'en' | 'ru' | 'by' | 'ro';
    setLang: (lang: 'en' | 'ru' | 'by' | 'ro') => void;
}

export const IndexNavigation: React.FC<IndexNavigationProps> = ({ onNavigate, theme, toggleTheme, lang, setLang }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <IndexTrigger 
                onOpen={() => setIsOpen(true)} 
                theme={theme} 
                toggleTheme={toggleTheme}
                lang={lang}
                setLang={setLang}
            />
            <IndexOverlay 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)} 
                onNavigate={onNavigate} 
                theme={theme} 
            />
        </>
    );
};