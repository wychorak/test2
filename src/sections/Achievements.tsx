import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

const achievements = [
  {
    id: 1,
    title: 'Gwiazdka Michelin',
    year: '2025 & 2026',
    description: 'Wyróżnienie za wyjątkową jakość składników i mistrzostwo w przygotowaniu dań.',
    icon: '★',
  },
  {
    id: 2,
    title: 'Gault & Millau',
    year: '4 Czapki',
    description: 'Najwyższe noty za kreatywność i szacunek do japońskiej tradycji kulinarnej.',
    icon: '♜',
  },
  {
    id: 3,
    title: 'Best Asian Restaurant',
    year: 'Warsaw Dining Awards',
    description: 'Tytuł najlepszej restauracji azjatyckiej w Polsce według krytyków kulinarnych.',
    icon: '🏆',
  },
];

export function Achievements() {
  const setHoveringInteractive = useStore((state) => state.setHoveringInteractive);

  return (
    <section className="py-32 bg-yugen-charcoal relative overflow-hidden border-y border-yugen-washi/5">
      {/* Subtle Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper.png")' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <span className="font-jp text-yugen-gold text-2xl md:text-3xl mb-4 block opacity-80">
            実績
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-yugen-washi">
            Osiągnięcia
          </h2>
          <div className="w-12 h-[1px] bg-yugen-gold mx-auto mt-8 opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group cursor-default"
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              <div className="w-20 h-20 rounded-full border border-yugen-gold/30 flex items-center justify-center mb-8 group-hover:border-yugen-gold transition-colors duration-500">
                <span className="text-3xl text-yugen-gold">{item.icon}</span>
              </div>
              <h3 className="font-serif text-2xl text-yugen-washi mb-2">{item.title}</h3>
              <span className="font-sans text-yugen-gold text-sm uppercase tracking-widest mb-6 block">
                {item.year}
              </span>
              <p className="font-sans text-yugen-washi/70 text-sm leading-relaxed max-w-xs">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
