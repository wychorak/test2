import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { GlassWater, Music, ChefHat, Sparkles } from 'lucide-react';

const attractions = [
  { icon: <ChefHat size={24} strokeWidth={1} />, title: 'Prywatny Pokaz', desc: 'Ekskluzywny pokaz umiejętności szefa kuchni tylko dla Twoich gości.' },
  { icon: <GlassWater size={24} strokeWidth={1} />, title: 'Degustacja Premium', desc: 'Rzadkie roczniki sake i japońskiej whisky dobierane przez sommeliera.' },
  { icon: <Music size={24} strokeWidth={1} />, title: 'Muzyka na Żywo', desc: 'Tradycyjna muzyka Koto lub nowoczesny, subtelny jazz w tle.' },
];

export function Events() {
  const setHoveringInteractive = useStore((state) => state.setHoveringInteractive);

  return (
    <section id="events" className="py-32 bg-yugen-charcoal relative overflow-hidden">
      {/* Happy Vibe Loop Animation */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden flex whitespace-nowrap opacity-5 pointer-events-none z-0">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex gap-8 text-6xl md:text-9xl font-serif text-yugen-gold"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-8 items-center">
              <span>RADOŚĆ</span><span className="text-4xl">✦</span>
              <span>CELEBRACJA</span><span className="text-4xl">✦</span>
              <span>OMOTENASHI</span><span className="text-4xl">✦</span>
              <span>WSPOMNIENIA</span><span className="text-4xl">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mt-12">
        <div className="text-center mb-24">
          <span className="font-jp text-yugen-gold text-2xl md:text-3xl mb-4 block opacity-80">
            宴会
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-yugen-washi">
            Wydarzenia Prywatne
          </h2>
          <div className="w-12 h-[1px] bg-yugen-gold mx-auto mt-8 opacity-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop" 
                alt="Private Event" 
                className="w-full h-[400px] md:h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-yugen-charcoal/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-serif text-3xl text-yugen-washi mb-6">Niezapomniane Chwile</h3>
            <p className="font-sans text-yugen-washi/70 text-sm leading-relaxed mb-8">
              Zorganizuj swoje najważniejsze wydarzenia w przestrzeni, która łączy japoński minimalizm z najwyższym poziomem luksusu. Idealne na kolacje biznesowe, rocznice i kameralne uroczystości.
            </p>
            
            <div className="space-y-6 mb-12">
              {attractions.map((attr, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="text-yugen-gold mt-1">{attr.icon}</div>
                  <div>
                    <h4 className="font-serif text-xl text-yugen-washi mb-1">{attr.title}</h4>
                    <p className="font-sans text-yugen-washi/50 text-xs leading-relaxed">{attr.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yugen-ink p-6 border border-yugen-gold/20 mb-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-yugen-gold/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="text-yugen-gold" size={20} strokeWidth={1} />
                  <span className="font-serif text-xl text-yugen-washi">Pakiety od 15 000 PLN</span>
                </div>
                <p className="font-sans text-yugen-washi/50 text-xs leading-relaxed">
                  Rezerwacja całej restauracji na wyłączność (do 12 osób). W cenie dedykowane menu degustacyjne, obsługa sommeliera oraz podstawowy pairing.
                </p>
              </div>
            </div>

            <a
              href="mailto:events@yugen.pl"
              className="inline-block px-8 py-4 bg-yugen-vermilion text-yugen-washi text-xs uppercase tracking-[0.2em] hover:bg-yugen-vermilion/90 transition-colors duration-300 w-full text-center md:w-auto"
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              Zapytaj o Termin
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
