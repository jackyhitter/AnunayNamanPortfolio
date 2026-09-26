import { useEffect } from 'react';
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

function App() {
  useEffect(() => {
    // Force dark mode
    document.documentElement.setAttribute('data-theme', 'dark');

    // Smooth scrolling
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

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="grid-overlay"></div>
      <Navigation />
      
      <main>
        {/* 01 — HERO: Interactive identity network + anime particle artwork */}
        <Hero />
        
        {/* 02 — QUICK FACTS */}
        <QuickFacts />
        
        {/* 03 — ABOUT / SYSTEM + EDUCATION + DATA SCIENCE */}
        <About />
        
        {/* 04 — CURRENTLY BUILDING: Live status board */}
        <CurrentlyBuilding />
        
        {/* 05 — EXPLORE WORLD: ITom-inspired spatial navigation */}
        <ExploreWorld />
        
        {/* 06 — SELECTED WORK: Compact project index */}
        <SelectedWork />
        
        {/* 07 — LAB: Rainbow Box + Scribble + Experiments */}
        <SideQuests />
        
        {/* 08 — ALGORITHMIC PRACTICE: Dynamic LeetCode + DSA Map */}
        <LeetCode />
        
        {/* 09 — LEARNING LOG: Striver, Love Babbar, Krish Naik, Hitesh */}
        <LearningLog />
        
        {/* 10 — SKILLS / SYSTEM MAP */}
        <SkillMap />
        
        {/* 11 — AFTER HOURS: Anime, Manga, Games, F1, Football, Art, Rabbit Holes */}
        <AfterHours />
        
        {/* 12 — CONTACT */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
