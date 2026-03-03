import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

const articles = [
  {
    id: 1,
    title: 'Esencja Dashi',
    jp: '出汁',
    date: '12 Października 2026',
    excerpt: 'Odkrywamy duszę japońskiej kuchni poprzez naszą autorską mieszankę kombu z Rishiri i starzonego katsuobushi.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Sake: Zimowy Napar',
    jp: '日本酒',
    date: '28 Września 2026',
    excerpt: 'Podróż do prefektury Niigata w celu wybrania idealnego Junmai Daiginjo do naszego nadchodzącego zimowego menu.',
    image: 'https://images.unsplash.com/photo-1559564484-e48b3e040ff4?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Polskie Terroir, Japońska Technika',
    jp: '風土',
    date: '15 Września 2026',
    excerpt: 'Jak zbieramy lokalne składniki znad Bałtyku i stosujemy tradycyjne metody konserwacji Edomae.',
    image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=1000&auto=format&fit=crop',
  },
];

export function Journal() {
  const setHoveringInteractive = useStore((state) => state.setHoveringInteractive);

  return (
    <section id="journal" className="py-32 bg-yugen-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <span className="font-jp text-yugen-gold text-2xl md:text-3xl mb-4 block opacity-80">
            日誌
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-yugen-washi">
            Dziennik
          </h2>
          <div className="w-12 h-[1px] bg-yugen-gold mx-auto mt-8 opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              <div className="relative h-64 overflow-hidden mb-8">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-yugen-charcoal/40 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-yugen-washi/50 text-xs uppercase tracking-widest">
                  {article.date}
                </span>
                <span className="font-jp text-yugen-gold text-lg opacity-80">
                  {article.jp}
                </span>
              </div>
              
              <h3 className="font-serif text-2xl text-yugen-washi mb-4 group-hover:text-yugen-gold transition-colors duration-300">
                {article.title}
              </h3>
              
              <p className="font-sans text-yugen-washi/70 text-sm leading-relaxed mb-6">
                {article.excerpt}
              </p>
              
              <span className="font-sans text-yugen-gold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                Czytaj Artykuł <span className="w-4 h-[1px] bg-yugen-gold block" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
