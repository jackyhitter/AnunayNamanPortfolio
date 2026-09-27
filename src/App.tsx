import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import Hero from './components/Hero/Hero';
import QuickFacts from './components/QuickFacts';
import About from './components/About/About';
import CurrentlyBuilding from './components/CurrentlyBuilding/CurrentlyBuilding';
import ExploreWorld from './components/Explore/Explore';
import SelectedWork from './components/Work/SelectedWork';
import SideQuests from './components/SideQuests';
import LeetCode from './components/Algorithms/LeetCode';
import LearningLog from './components/Learning/LearningLog';
import SkillMap from './components/Skills/SkillMap';
import AfterHours from './components/AfterHours/AfterHours';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionProgress from './components/SectionProgress';
import { Preloader } from './components/Preloader';
import { EasterEggGuide } from './components/EasterEggGuide';

import { SortingHat } from './components/SortingHat';

// Sections that slide on top of the one before them
const SLIDE_BG = '#0b0b0b';
const SLIDE_STYLE: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
  background: SLIDE_BG,
  boxShadow: '0 -24px 60px rgba(0,0,0,0.7)',
  borderRadius: '0 0 0 0',
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Easter Egg: The Matrix
    console.log("%cWake up, Neo...\n%cThe Matrix has you.\n\n%cLooking for easter eggs? You found the first one.", 
      "color: #10b981; font-size: 16px; font-weight: bold;", 
      "color: #10b981; font-size: 14px;", 
      "color: #52525b; font-size: 10px;"
    );

    return () => { 
      lenis.destroy(); 
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <EasterEggGuide />
      
      {/* Global Ambient Cursor Glow - Warm Flashlight effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(255, 210, 150, 0.12), transparent 80%)'
        }}
      />
      <div className="grid-overlay"></div>
      <Navigation />
      <SectionProgress />

      <main>
        {/* 01 — HERO: base layer */}
        <Hero />

        {/* 02 — QUICK FACTS: slides on top of hero */}
        <div style={{ ...SLIDE_STYLE, zIndex: 3 }}>
          <QuickFacts />
        </div>

        {/* 03 — ABOUT */}
        <div style={{ ...SLIDE_STYLE, zIndex: 4 }}>
          <About />
        </div>

        {/* 04 — CURRENTLY BUILDING: horizontal scroll, no top shadow to avoid clipping */}
        <div style={{ position: 'relative', zIndex: 5, background: '#0b0b0b' }}>
          <CurrentlyBuilding />
        </div>

        {/* 05 — EXPLORE WORLD: slides on top, high z-index to pop over next section */}
        <div style={{ ...SLIDE_STYLE, zIndex: 20 }}>
          <ExploreWorld />
        </div>

        {/* 06 — SELECTED WORK */}
        <div style={{ ...SLIDE_STYLE, zIndex: 7 }}>
          <SelectedWork />
        </div>

        {/* 07 — SIDE QUESTS */}
        <div style={{ ...SLIDE_STYLE, zIndex: 8 }}>
          <SideQuests />
        </div>

        {/* 08 — ALGORITHMIC PRACTICE */}
        <div style={{ ...SLIDE_STYLE, zIndex: 9 }}>
          <LeetCode />
        </div>

        {/* 09 — LEARNING LOG */}
        <div style={{ ...SLIDE_STYLE, zIndex: 10 }}>
          <LearningLog />
        </div>

        {/* 10 — SKILLS */}
        <div style={{ ...SLIDE_STYLE, zIndex: 11 }}>
          <SkillMap />
        </div>

        {/* 11 — AFTER HOURS */}
        <div style={{ ...SLIDE_STYLE, zIndex: 12 }}>
          <AfterHours />
        </div>

        {/* 12 — CONTACT */}
        <div style={{ ...SLIDE_STYLE, zIndex: 13 }}>
          <Contact />
        </div>

        {/* 13 — SORTING HAT */}
        <div style={{ ...SLIDE_STYLE, zIndex: 14 }}>
          <SortingHat />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
