import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

const experiences = [
  {
    id: 'omakase',
    title: 'Omakase',
    jp: 'お任せ',
    description: '14-daniowa podróż prowadzona w całości przez szefa kuchni, prezentująca najlepsze połowy dnia i sezonowe przysmaki.',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'kaiseki',
    title: 'Kaiseki',
    jp: '懐石',
    description: 'Tradycyjna wielodaniowa kolacja balansująca smak, teksturę, wygląd i kolory składników.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'counter',
    title: 'Przy Blacie Szefa',
    jp: 'カウンター',
    description: 'Kameralne doświadczenie dla 6 osób, gdzie na własne oczy zobaczysz mistrzostwo i precyzję naszego zespołu.',
    image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'private',
    title: 'Prywatne Tatami',
    jp: '個室',
    description: 'Ekskluzywne sale jadalne z tradycyjnymi matami tatami i ekranami shoji dla absolutnej prywatności.',
    image: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?q=80&w=1000&auto=format&fit=crop',
  },
];

export function Experience() {
  const setHoveringInteractive = useStore((state) => state.setHoveringInteractive);

  return (
    <section id="experience" className="py-32 bg-yugen-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <span className="font-jp text-yugen-gold text-2xl md:text-3xl mb-4 block opacity-80">
            体験
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-yugen-washi">
            Doświadczenie
          </h2>
          <div className="w-12 h-[1px] bg-yugen-gold mx-auto mt-8 opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative overflow-hidden h-auto md:h-[500px] cursor-pointer flex flex-col md:block"
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              {/* Image Background */}
              <div className="relative md:absolute inset-0 z-0 h-[250px] md:h-full w-full overflow-hidden">
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="w-full h-full object-cover opacity-90 md:opacity-60 md:group-hover:opacity-40 transition-all duration-1000 md:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yugen-charcoal via-yugen-charcoal/40 to-transparent hidden md:block" />
              </div>

              {/* Content */}
              <div className="relative md:absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end bg-yugen-charcoal/50 md:bg-transparent">
                <div className="transform md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="font-jp text-yugen-gold text-xl mb-2 block opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {exp.jp}
                  </span>
                  <h3 className="font-serif text-3xl text-yugen-washi mb-4">
                    {exp.title}
                  </h3>
                  <p className="font-sans text-yugen-washi/70 text-sm leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-200 max-w-md">
                    {exp.description}
                  </p>
                  
                  {/* Origami Fold Effect Line */}
                  <div className="w-12 md:w-0 h-[1px] bg-yugen-gold mt-6 md:group-hover:w-full transition-all duration-700 ease-in-out origin-left" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
