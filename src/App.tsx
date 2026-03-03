import { useEffect } from 'react';
import Lenis from 'lenis';
import { Toaster } from 'sonner';
import { SakuraParticles } from './components/SakuraParticles';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Philosophy } from './sections/Philosophy';
import { Experience } from './sections/Experience';
import { Menu } from './sections/Menu';
import { Achievements } from './sections/Achievements';
import { Reservations } from './sections/Reservations';
import { Team } from './sections/Team';
import { Gallery } from './sections/Gallery';
import { Journal } from './sections/Journal';
import { Footer } from './sections/Footer';

export default function App() {
  useEffect(() => {
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
    <div className="relative min-h-screen bg-yugen-charcoal selection:bg-yugen-vermilion selection:text-yugen-washi">
      <SakuraParticles />
      <Toaster position="bottom-right" toastOptions={{ className: 'font-sans' }} />
      
      <Navbar />
      
      <main>
        <Hero />
        <Philosophy />
        <Experience />
        <Menu />
        <Achievements />
        <Reservations />
        <Team />
        <Gallery />
        <Journal />
      </main>
      
      <Footer />
    </div>
  );
}
