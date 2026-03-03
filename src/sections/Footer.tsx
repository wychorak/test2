import { motion } from 'framer-motion';
import { Instagram, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Footer() {
  const setHoveringInteractive = useStore((state) => state.setHoveringInteractive);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-yugen-ink py-24 relative border-t border-yugen-washi/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          
          {/* Brand */}
          <div className="md:col-span-1 flex flex-col items-start">
            <span className="font-jp text-3xl font-light tracking-widest text-yugen-washi mb-2">
              幽玄
            </span>
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-yugen-washi/70 mb-8">
              Yūgen
            </span>
            <p className="font-sans text-yugen-washi/50 text-xs leading-relaxed max-w-xs">
              Subtelna gracja, której nie da się w pełni wyrazić słowami. Sanktuarium japońskiej sztuki kulinarnej w Warszawie.
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-1 flex flex-col space-y-6">
            <h4 className="font-serif text-yugen-gold text-lg mb-2">Kontakt</h4>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-start gap-4 text-yugen-washi/70 hover:text-yugen-washi transition-colors group"
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              <MapPin size={16} className="mt-1 text-yugen-gold/50 group-hover:text-yugen-gold transition-colors" />
              <span className="font-sans text-sm leading-relaxed">
                ul. Mokotowska 67<br />
                00-543 Warszawa<br />
                Polska
              </span>
            </a>
            <a 
              href="tel:+48123456789" 
              className="flex items-center gap-4 text-yugen-washi/70 hover:text-yugen-washi transition-colors group"
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              <Phone size={16} className="text-yugen-gold/50 group-hover:text-yugen-gold transition-colors" />
              <span className="font-sans text-sm">+48 123 456 789</span>
            </a>
            <a 
              href="mailto:reservations@yugen.pl" 
              className="flex items-center gap-4 text-yugen-washi/70 hover:text-yugen-washi transition-colors group"
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              <Mail size={16} className="text-yugen-gold/50 group-hover:text-yugen-gold transition-colors" />
              <span className="font-sans text-sm">reservations@yugen.pl</span>
            </a>
          </div>

          {/* Hours */}
          <div className="md:col-span-1 flex flex-col space-y-6">
            <h4 className="font-serif text-yugen-gold text-lg mb-2">Godziny</h4>
            <div className="font-sans text-yugen-washi/70 text-sm leading-relaxed space-y-2">
              <p className="flex justify-between">
                <span>Czwartek - Niedziela</span>
                <span>18:00 - 23:00</span>
              </p>
              <p className="flex justify-between text-yugen-washi/40">
                <span>Poniedziałek - Środa</span>
                <span>Zamknięte</span>
              </p>
            </div>
            <p className="font-sans text-yugen-washi/50 text-xs italic mt-4">
              Wymagana wcześniejsza rezerwacja.
            </p>
          </div>

          {/* Social */}
          <div className="md:col-span-1 flex flex-col space-y-6">
            <h4 className="font-serif text-yugen-gold text-lg mb-2">Obserwuj</h4>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-4 text-yugen-washi/70 hover:text-yugen-washi transition-colors group"
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              <Instagram size={16} className="text-yugen-gold/50 group-hover:text-yugen-gold transition-colors" />
              <span className="font-sans text-sm">@yugen.warsaw</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-yugen-washi/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-sans text-yugen-washi/40 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Yūgen Warsaw. Wszelkie prawa zastrzeżone.
          </p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-yugen-washi/50 hover:text-yugen-gold transition-colors group"
            onMouseEnter={() => setHoveringInteractive(true)}
            onMouseLeave={() => setHoveringInteractive(false)}
          >
            <span className="font-sans text-xs tracking-widest uppercase">Do góry</span>
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
