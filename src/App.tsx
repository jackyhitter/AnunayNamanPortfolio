import { useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import QuickFacts from './components/QuickFacts';
import About from './components/About';
import Projects from './components/Projects';
import SideQuests from './components/SideQuests';
import CurrentlyBuilding from './components/CurrentlyBuilding';
import Skills from './components/Skills';
import LeetCode from './components/LeetCode';
import GitHub from './components/GitHub';
import Books from './components/Books';
import Cinema from './components/Cinema';
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
        <Hero />
        <QuickFacts />
        <About />
        <CurrentlyBuilding />
        <Projects />
        <SideQuests />
        <LeetCode />
        <GitHub />
        <Skills />
        <Books />
        <Cinema />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
