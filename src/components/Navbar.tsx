import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';

const navLinks = [
  { name: 'Doświadczenie', href: '#experience' },
  { name: 'Menu', href: '#menu' },
  { name: 'Wydarzenia', href: '#events' },
  { name: 'Osiągnięcia', href: '#achievements' },
  { name: 'Galeria', href: '#gallery' },
  { name: 'Dziennik', href: '#journal' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  
  const setHoveringInteractive = useStore((state) => state.setHoveringInteractive);
  const triggerSakuraStorm = useStore((state) => state.triggerSakuraStorm);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all sections that have an ID matching our nav links
    navLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    if (newClicks === 7) {
      triggerSakuraStorm();
      setLogoClicks(0);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'bg-yugen-charcoal/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div 
            className="flex flex-col items-center cursor-pointer group"
            onClick={handleLogoClick}
            onMouseEnter={() => setHoveringInteractive(true)}
            onMouseLeave={() => setHoveringInteractive(false)}
          >
            <span className="font-jp text-2xl md:text-3xl font-light tracking-widest text-yugen-washi group-hover:text-yugen-gold transition-colors duration-500">
              幽玄
            </span>
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase mt-1 text-yugen-washi/70">
              Yūgen
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-[0.15em] transition-colors duration-300 relative group ${
                  activeSection === link.href ? 'text-yugen-gold' : 'text-yugen-washi/70 hover:text-yugen-washi'
                }`}
                onMouseEnter={() => setHoveringInteractive(true)}
                onMouseLeave={() => setHoveringInteractive(false)}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-1/2 h-[1px] bg-yugen-gold transition-all duration-300 ${
                  activeSection === link.href ? 'w-full left-0' : 'w-0 group-hover:w-full group-hover:left-0'
                }`} />
              </a>
            ))}
            <a
              href="#reservations"
              className="px-6 py-3 border border-yugen-vermilion text-yugen-vermilion text-xs uppercase tracking-[0.15em] hover:bg-yugen-vermilion hover:text-yugen-washi transition-all duration-500"
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              Zarezerwuj Stolik
            </a>
          </div>

          <button
            className="md:hidden text-yugen-washi"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-yugen-charcoal flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-8 right-8 text-yugen-washi/50 hover:text-yugen-washi transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} strokeWidth={1} />
            </button>
            
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                  className={`font-serif text-3xl transition-colors ${
                    activeSection === link.href ? 'text-yugen-gold' : 'text-yugen-washi hover:text-yugen-gold'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#reservations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2, duration: 0.5 }}
                className="mt-8 px-8 py-4 bg-yugen-vermilion text-yugen-washi text-sm uppercase tracking-widest"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Zarezerwuj Stolik
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
