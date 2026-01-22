import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AboutSectionProps {
  onRestart?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onRestart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const practicesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use scoped selector for safety
      const q = gsap.utils.selector(containerRef);
      
      // 1. MANIFESTO REVEAL
      const words = q('.manifesto-word');
      if (words && words.length > 0) {
        gsap.fromTo(words, 
          { y: 100, opacity: 0, rotationX: 45 },
          {
            scrollTrigger: {
              trigger: ".manifesto-container",
              start: "top 70%",
              end: "bottom 70%",
              scrub: 1
            },
            y: 0,
            opacity: 1,
            rotationX: 0,
            stagger: 0.1,
            ease: "power3.out"
          }
        );
      }

      // 2. THE CRISIS CARDS
      const cards = q('.crisis-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
            scrollTrigger: {
                trigger: ".crisis-grid",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        });
      }

      // 3. DEFENSE PROTOCOLS (PRACTICES)
      const practiceLevels = q('.practice-level');
      practiceLevels.forEach((level, i) => {
          gsap.from(level, {
              scrollTrigger: {
                  trigger: level,
                  start: "top 85%",
                  end: "top 40%",
                  scrub: 1
              },
              opacity: 0.2,
              scale: 0.95,
              filter: "blur(5px)",
              ease: "power2.out"
          });
          
          // Animate the line connecting them
          const line = level.querySelector('.connect-line');
          if (line) {
             gsap.from(line, {
                 scrollTrigger: {
                     trigger: level,
                     start: "top 60%",
                 },
                 height: 0,
                 duration: 1,
                 ease: "power2.inOut"
             });
          }
      });


      // 4. HORIZONTAL SCROLL (THE RESET)
      const sections = q('.reset-step');
      
      if (horizontalRef.current && sections.length > 0) {
        const snapValue = sections.length > 1 ? 1 / (sections.length - 1) : 0;

        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1,
            snap: {
                snapTo: snapValue,
                duration: { min: 0.2, max: 0.5 },
                delay: 0.1
            },
            end: () => "+=" + (horizontalRef.current?.offsetWidth || 0)
          }
        });

        gsap.to(".reset-progress-bar", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: horizontalRef.current,
                start: "top top",
                end: () => "+=" + (horizontalRef.current?.offsetWidth || 0),
                scrub: 0
            }
        });
      }

      // 5. ECOSYSTEM LINKS
      const ecoLinks = q('.eco-link');
      if (ecoLinks && ecoLinks.length > 0) {
        gsap.from(ecoLinks, {
            scrollTrigger: {
            trigger: ".eco-grid",
            start: "top 85%" 
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.5)"
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const resetSteps = [
    {
        id: "01",
        title: "Build Sovereign Stack",
        desc: "Own your memory. Deploy on-device AI for privacy. Implement aggressive context dieting.",
        action: "OWNERSHIP",
        icon: (
            <svg className="w-12 h-12 mb-6 text-[#DC2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        )
    },
    {
        id: "02",
        title: "Audit, Don't Generate",
        desc: "Shift from creator to consigliere. Orchestrate AI, don't execute manually. Demand reasoning traces.",
        action: "VERIFICATION",
        icon: (
            <svg className="w-12 h-12 mb-6 text-[#DC2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        )
    },
    {
        id: "03",
        title: "Deploy Guardian Agents",
        desc: "Protect attention from context obesity. Filters for your mind. Zero trust default for digital media.",
        action: "PROTECTION",
        icon: (
            <svg className="w-12 h-12 mb-6 text-[#DC2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        )
    },
    {
        id: "04",
        title: "Value The Tacit",
        desc: "Invest in skills models can't simulate. Craft, sports, embodied intelligence. Your novelty prevents model collapse.",
        action: "HUMANITY",
        icon: (
            <svg className="w-12 h-12 mb-6 text-[#DC2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
        )
    },
    {
        id: "05",
        title: "Test Divergently",
        desc: "Query 3+ models with different constitutions. Trust skin in the game (prediction markets) over polls.",
        action: "DIVERSITY",
        icon: (
            <svg className="w-12 h-12 mb-6 text-[#DC2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>
        )
    }
  ];

  const practices = [
      {
          level: "LEVEL 1",
          name: "SIMPLE",
          tagline: "Awareness & Pause",
          items: ["Ask 'Why' before you ask AI.", "Save one idea offline (handwritten).", "Turn off one major notification.", "Pause before trusting output."],
          color: "border-neutral-700"
      },
      {
          level: "LEVEL 2",
          name: "MODERATE",
          tagline: "Habits & Boundaries",
          items: ["Treat agents as coworkers (HR for AI).", "Create a personal local knowledge base.", "Audit service access monthly.", "Test 3 models for bias on key questions."],
          color: "border-neutral-500"
      },
      {
          level: "LEVEL 3",
          name: "ADVANCED",
          tagline: "Systems & Architecture",
          items: ["Weekly device disconnect.", "Deploy guardian agents (filters).", "Family 'Secret Handshakes' for verification.", "Local-first workflows (No cloud cameras)."],
          color: "border-red-900"
      },
      {
          level: "LEVEL 4",
          name: "DEEP",
          tagline: "Structural Sovereignty",
          items: ["Shift from Creator to Consigliere.", "Invest in Tacit Knowledge (Craft/Sports).", "Join proof-of-human communities.", "Opt-out of training data."],
          color: "border-[#DC2626]"
      }
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-[#0A0A0A] text-white overflow-hidden">
        
        {/* Navigation Header */}
        {onRestart && (
            <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-widest text-[#DC2626]">AIM 2026 / CONCLUSION</span>
                <button 
                  onClick={onRestart}
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-[#DC2626] transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 12l6-6M3 12l6 6"/></svg>
                    Back to Home
                </button>
            </div>
        )}

        {/* --- 1. MANIFESTO --- */}
        <div className="manifesto-container relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
             <div className="max-w-6xl mx-auto text-center z-10">
                 <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-12">
                     {"We're not a research institute.".split(" ").map((word, i) => (
                         <span key={i} className="manifesto-word inline-block text-3xl md:text-5xl font-mono text-neutral-500">{word}</span>
                     ))}
                 </div>
                 <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                     {"WE ARE A LAB.".split(" ").map((word, i) => (
                         <span key={i} className="manifesto-word inline-block text-6xl md:text-9xl font-black text-white tracking-tighter uppercase">{word}</span>
                     ))}
                 </div>
                 
                 <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                     <div className="manifesto-word">
                         <span className="block text-5xl md:text-7xl font-bold text-[#DC2626] mb-2">1,500+</span>
                         <span className="font-mono text-sm tracking-widest uppercase text-neutral-400">Participants</span>
                     </div>
                     <div className="manifesto-word">
                         <span className="block text-5xl md:text-7xl font-bold text-white mb-2">10+</span>
                         <span className="font-mono text-sm tracking-widest uppercase text-neutral-400">Countries</span>
                     </div>
                     <div className="manifesto-word">
                         <span className="block text-5xl md:text-7xl font-bold text-white mb-2">3 Years</span>
                         <span className="font-mono text-sm tracking-widest uppercase text-neutral-400">Field Work</span>
                     </div>
                 </div>
             </div>
             
             {/* Background decoration */}
             <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                 <svg className="w-full h-full">
                     <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                         <circle cx="1" cy="1" r="1" fill="#333" />
                     </pattern>
                     <rect width="100%" height="100%" fill="url(#dot-grid)" />
                 </svg>
             </div>
        </div>

        {/* --- 2. THE CRISIS --- */}
        <div className="relative py-24 px-6 border-t border-neutral-900 bg-neutral-950/50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <span className="font-mono text-[#DC2626] text-xs uppercase tracking-[0.3em] mb-4 block">Why This Matters</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase">The Crisis</h2>
                </div>
                
                <div className="crisis-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="crisis-card p-8 border border-neutral-800 bg-[#0A0A0A] rounded-xl hover:border-[#DC2626] transition-colors group">
                        <div className="w-12 h-12 border border-neutral-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#DC2626] group-hover:border-[#DC2626] group-hover:text-black transition-all">
                           <span className="font-mono font-bold">01</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Loss of Agency</h3>
                        <p className="text-neutral-400 leading-relaxed font-mono text-sm">You outsource decisions faster than you gain capability. Every "AI will handle it" compounds dependency.</p>
                    </div>
                    <div className="crisis-card p-8 border border-neutral-800 bg-[#0A0A0A] rounded-xl hover:border-[#DC2626] transition-colors group">
                        <div className="w-12 h-12 border border-neutral-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#DC2626] group-hover:border-[#DC2626] group-hover:text-black transition-all">
                           <span className="font-mono font-bold">02</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Reliability Tax</h3>
                        <p className="text-neutral-400 leading-relaxed font-mono text-sm">You spend more time verifying AI output than doing it yourself. Efficiency becomes a trap of auditing.</p>
                    </div>
                    <div className="crisis-card p-8 border border-neutral-800 bg-[#0A0A0A] rounded-xl hover:border-[#DC2626] transition-colors group">
                        <div className="w-12 h-12 border border-neutral-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#DC2626] group-hover:border-[#DC2626] group-hover:text-black transition-all">
                           <span className="font-mono font-bold">03</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Responsibility Void</h3>
                        <p className="text-neutral-400 leading-relaxed font-mono text-sm">When AI makes the call, who takes the blame? Humans abdicate judgment. Machines have no skin in the game.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- 3. DEFENSE PROTOCOLS (PRACTICES) --- */}
        <div ref={practicesRef} className="relative py-32 px-6 bg-black border-t border-neutral-900">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-24">
                     <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Defense Protocols</h2>
                     <p className="font-mono text-neutral-500">From "I'll try" to "I have defaults".</p>
                </div>

                <div className="relative border-l border-neutral-800 ml-4 md:ml-0 pl-8 md:pl-0">
                    {practices.map((practice, index) => (
                        <div key={index} className="practice-level relative md:grid md:grid-cols-[200px_1fr] gap-12 mb-20 last:mb-0">
                             {/* Connector Line Logic */}
                             <div className="hidden md:block absolute left-[200px] top-0 bottom-0 w-px bg-neutral-800 -ml-px">
                                 <div className="connect-line w-full bg-[#DC2626] opacity-50 absolute top-0 left-0 w-px"></div>
                             </div>

                             <div className="text-left md:text-right mb-4 md:mb-0">
                                 <span className={`inline-block px-3 py-1 border ${practice.color} rounded text-[10px] font-mono tracking-widest uppercase mb-2`}>
                                     {practice.level}
                                 </span>
                                 <h3 className="text-2xl font-bold text-white">{practice.name}</h3>
                                 <p className="text-neutral-500 text-xs uppercase tracking-wider mt-1">{practice.tagline}</p>
                             </div>

                             <div className={`relative p-8 border-l-2 ${practice.color} bg-white/5 rounded-r-xl backdrop-blur-sm`}>
                                 <ul className="space-y-4">
                                     {practice.items.map((item, idx) => (
                                         <li key={idx} className="flex items-start gap-3 text-neutral-300 font-light">
                                             <span className="text-[#DC2626] mt-1.5 text-xs">■</span>
                                             <span>{item}</span>
                                         </li>
                                     ))}
                                 </ul>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- 4. THE RESET (HORIZONTAL) --- */}
        <div ref={horizontalRef} className="relative h-screen w-full flex items-center overflow-hidden border-t border-neutral-800 bg-[#0A0A0A]">
            <div className="absolute top-0 left-0 w-full h-1 bg-neutral-900 z-50">
                <div className="reset-progress-bar h-full bg-[#DC2626] w-full origin-left transform scale-x-0"></div>
            </div>
            
            <div className="absolute top-10 left-10 z-20">
                <h2 className="text-xl md:text-3xl font-black uppercase text-white tracking-tight">The Sovereignty Reset</h2>
                <p className="font-mono text-xs text-[#DC2626] tracking-widest mt-2">5 STEPS TO DEFAULTS</p>
            </div>

            <div className="flex h-full pl-[5vw]">
                
                {/* Intro Card */}
                <div className="reset-step flex-shrink-0 w-[80vw] md:w-[30vw] h-full flex flex-col justify-center p-8 md:p-16 border-r border-neutral-900">
                    <p className="text-2xl md:text-4xl font-bold leading-tight mb-8">
                        Machines are accelerating. Humans are buffering.
                    </p>
                    <p className="font-mono text-neutral-500 leading-relaxed">
                        In 2026, most people won't lose to AI. They'll lose to their own defaults. We are moving from "I'll try" to "I have systems".
                    </p>
                    <div className="mt-12 flex items-center gap-4">
                        <span className="text-xs font-mono uppercase tracking-widest">Scroll to Initialize</span>
                        <div className="w-12 h-[1px] bg-[#DC2626]"></div>
                    </div>
                </div>

                {/* Step Cards */}
                {resetSteps.map((step, i) => (
                    <div key={i} className="reset-step flex-shrink-0 w-[80vw] md:w-[40vw] h-full flex flex-col justify-center p-8 md:p-16 border-r border-neutral-900 relative group hover:bg-neutral-900/20 transition-colors">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#DC2626]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        
                        <div className="relative z-10">
                            {step.icon}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-[#DC2626] font-mono font-bold text-sm">STEP {step.id}</span>
                                <div className="h-[1px] flex-1 bg-neutral-800"></div>
                                <span className="text-neutral-500 font-mono text-xs tracking-widest">{step.action}</span>
                            </div>
                            
                            <h3 className="text-3xl md:text-5xl font-black uppercase mb-6 leading-none">{step.title}</h3>
                            <p className="text-lg text-neutral-400 leading-relaxed font-light">{step.desc}</p>
                        </div>
                    </div>
                ))}
                
                {/* Spacer */}
                <div className="reset-step w-[20vw] h-full"></div>
            </div>
        </div>

        {/* --- 5. ECOSYSTEM --- */}
        <div className="relative py-32 px-6 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Our Ecosystem</h2>
                    <p className="font-mono text-neutral-500">Field-tested frameworks, tools, and community.</p>
                </div>

                <div className="eco-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
                    {[
                        { title: "Ivanov.AI", desc: "IFS + AI: Protecting the psyche", url: "#" },
                        { title: "Intention OS", desc: "Managing attention in context explosion", url: "#" },
                        { title: "Pragmatic Romanticism", desc: "Defense against machine logic", url: "#" },
                        { title: "AI ARK", desc: "Knowledge System Architecture", url: "#" },
                        { title: "Founder OS", desc: "Mental health firewalls", url: "#" },
                        { title: "Coding with Claude", desc: "Practical community guides", url: "#" }
                    ].map((item, i) => (
                        <a key={i} href={item.url} className="eco-link group relative block p-8 bg-[#0A0A0A] hover:bg-neutral-900 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <span className="font-mono text-xs text-neutral-500 group-hover:text-[#DC2626] transition-colors">0{i+1}</span>
                                <svg className="w-4 h-4 text-neutral-700 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-neutral-400 font-mono">{item.desc}</p>
                        </a>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <a href="https://aimindsetspace.substack.com" className="inline-flex items-center gap-3 px-8 py-4 bg-[#DC2626] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                        <span>Subscribe for Signals</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </a>
                    <p className="mt-4 font-mono text-xs text-neutral-600 uppercase">No spam. Unsubscribe anytime.</p>
                </div>
            </div>
        </div>

    </section>
  );
};