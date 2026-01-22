import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register all GSAP plugins once globally
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export { gsap, ScrollTrigger, MotionPathPlugin };
