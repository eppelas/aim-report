import React from 'react';

interface IndexTriggerProps {
    onOpen: () => void;
}

export const IndexTrigger: React.FC<IndexTriggerProps> = ({ onOpen }) => {
    return (
        <div className="fixed top-6 right-6 z-[95] mix-blend-difference text-white">
            <button 
                onClick={onOpen}
                className="group flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all backdrop-blur-md shadow-lg"
            >
                <span className="font-mono text-xs font-bold uppercase tracking-widest hidden md:block">Index</span>
                <div className="flex flex-col gap-[3px] w-4">
                    <span className="w-full h-px bg-current group-hover:w-3 transition-all ml-auto"></span>
                    <span className="w-full h-px bg-current"></span>
                    <span className="w-full h-px bg-current group-hover:w-2 transition-all ml-auto"></span>
                </div>
            </button>
        </div>
    );
};