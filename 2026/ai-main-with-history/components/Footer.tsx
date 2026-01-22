import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] py-20 px-10 text-center border-t border-neutral-800">
      <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider font-sans">AIM Annual Report 2025</h3>
      <p className="text-neutral-500 mb-8 max-w-md mx-auto font-mono text-sm">
        Recreating complex scroll interactions to push the boundaries of web experiences.
      </p>
      <div className="flex justify-center gap-6 text-sm font-mono text-[#DC2626]">
        <span>GSAP</span>
        <span>REACT</span>
        <span>VARIABLE FONTS</span>
        <span>TAILWIND</span>
      </div>
      <p className="mt-20 text-xs text-neutral-700 font-mono">
        &copy; 2026 Proto Inc. All rights reserved.
      </p>
    </footer>
  );
};