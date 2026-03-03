import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

const menuItems = [
  {
    id: 'sakizuke',
    title: 'Sakizuke',
    jp: '先付',
    description: 'Amuse-bouche. Jeżowiec z Hokkaido, panna cotta z białych szparagów, galaretka dashi, jadalne złoto.',
    pairing: 'Pairing: Iwa 5 Assemblage 3',
    price: '180 PLN',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'hassun',
    title: 'Hassun',
    jp: '八寸',
    description: 'Półmisek sezonowy. Wędzony polski węgorz, marynowane kwiaty wiśni, pochrzyn górski, żółtko peklowane w soi.',
    pairing: 'Pairing: Juyondai Honmaru',
    price: '250 PLN',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'mukozuke',
    title: 'Mukōzuke',
    jp: '向付',
    description: 'Sashimi. Tuńczyk błękitnopłetwy otoro dojrzewający 14 dni, dzika dorada, świeże wasabi z Shizuoki.',
    pairing: 'Pairing: Aramasa No.6 X-Type',
    price: '320 PLN',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'yakimono',
    title: 'Yakimono',
    jp: '焼物',
    description: 'Danie z grilla. Polędwica wołowa A5 Wagyu z grilla węglowego binchotan, purée z czarnego czosnku, pieprz sansho.',
    pairing: 'Pairing: Hibiki 21 Years Old',
    price: '450 PLN',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'shokuji',
    title: 'Shokuji',
    jp: '食事',
    description: 'Danie z ryżem. Ryż z naczynia donabe z krabem śnieżnym, truflami i mitsubą. Podawane z zupą z czerwonego miso.',
    pairing: 'Pairing: Kamoshibito Kuheiji',
    price: '280 PLN',
    image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'mizumono',
    title: 'Mizumono',
    jp: '水物',
    description: 'Deser. Fondant matcha, sorbet yuzu, pasta z fasoli adzuki, delikatne szkło cukrowe.',
    pairing: 'Pairing: Uji Gyokuro Green Tea',
    price: '120 PLN',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop',
  },
];

const specials = [
  {
    id: 'special1',
    title: 'Biała Trufla z Alby',
    jp: '白トリュフ',
    description: 'Świeżo ścierana biała trufla serwowana na domowym makaronie soba z sosem na bazie żółtka i dashi.',
    price: '350 PLN',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'special2',
    title: 'Kawior Beluga & Uni',
    jp: 'キャビア',
    description: 'Najwyższej klasy kawior Beluga podawany z jeżowcem Bafun Uni na chrupiącym ryżowym krakersie.',
    price: '480 PLN',
    image: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?q=80&w=1000&auto=format&fit=crop',
  },
];

import { StarBorder } from '../components/reactbits/StarBorder';

export function Menu() {
  const setHoveringInteractive = useStore((state) => state.setHoveringInteractive);
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedMenuItems = isExpanded ? menuItems : menuItems.slice(0, 3);

  return (
    <section id="menu" className="py-32 bg-yugen-ink relative overflow-hidden">
      {/* Subtle Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper.png")' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <span className="font-jp text-yugen-gold text-2xl md:text-3xl mb-4 block opacity-80">
            献立
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-yugen-washi">
            Menu Jesienne
          </h2>
          <p className="font-sans text-yugen-washi/50 text-sm uppercase tracking-widest mt-6">
            Pełne Omakase: 1600 PLN / Opcje A la Carte poniżej
          </p>
          <div className="w-12 h-[1px] bg-yugen-gold mx-auto mt-8 opacity-50" />
        </div>

        {/* Regular Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-32">
          {displayedMenuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedItem(item)}
              className={`relative group h-[420px] md:h-[450px] overflow-hidden cursor-pointer rounded-sm bg-yugen-charcoal/30 flex flex-col border border-yugen-washi/5 hover:border-yugen-gold/20 transition-colors duration-500 ${!isExpanded && index >= 3 ? 'md:flex hidden' : ''}`}
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              {/* Image Container */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-60 md:opacity-70 md:group-hover:opacity-20 transition-all duration-700 md:group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yugen-ink via-yugen-ink/60 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end md:justify-center md:items-center md:text-center transition-all duration-500">
                {/* Mobile/Default Info */}
                <div className="md:group-hover:opacity-0 transition-opacity duration-500 w-full">
                  <div className="flex items-baseline justify-between md:block mb-2">
                    <span className="font-jp text-yugen-gold text-lg md:text-xl md:mb-2 block">{item.jp}</span>
                    <span className="md:hidden font-sans text-yugen-washi text-sm font-light tracking-widest">{item.price}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-yugen-washi mb-3">{item.title}</h3>
                  <div className="md:hidden space-y-4">
                    <p className="font-sans text-yugen-washi/70 text-xs leading-relaxed line-clamp-2 italic">
                      {item.description}
                    </p>
                    <div className="pt-4 border-t border-yugen-washi/10 flex items-center justify-between">
                      <span className="font-sans text-yugen-gold text-[10px] uppercase tracking-[0.2em]">{item.pairing.split(':')[1]}</span>
                      <div className="w-2 h-2 rounded-full bg-yugen-gold/30 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Desktop Hover Info */}
                <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center bg-yugen-charcoal/90 backdrop-blur-sm border border-yugen-gold/20 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden md:flex">
                  <span className="font-jp text-yugen-gold text-2xl mb-4">{item.jp}</span>
                  <h3 className="font-serif text-3xl text-yugen-washi mb-6">{item.title}</h3>
                  <p className="font-sans text-yugen-washi/80 text-sm leading-relaxed mb-6 max-w-xs">
                    {item.description}
                  </p>
                  <p className="font-sans text-yugen-gold text-xs uppercase tracking-widest mb-4">
                    {item.pairing}
                  </p>
                  <div className="w-8 h-[1px] bg-yugen-washi/30 mb-4" />
                  <p className="font-sans text-yugen-washi/90 text-xs uppercase tracking-widest font-medium mb-6">
                    {item.price}
                  </p>
                  <div className="mt-auto">
                    <span className="font-sans text-yugen-gold/60 text-[10px] uppercase tracking-[0.3em] animate-pulse">
                      Kliknij, aby zobaczyć szczegóły
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Desktop items that are hidden on mobile when not expanded */}
          {!isExpanded && menuItems.slice(3).map((item, index) => (
            <motion.div
              key={`desktop-${item.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedItem(item)}
              className={`relative group h-[420px] md:h-[450px] overflow-hidden cursor-pointer rounded-sm bg-yugen-charcoal/30 flex-col border border-yugen-washi/5 hover:border-yugen-gold/20 transition-colors duration-500 hidden md:flex`}
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              {/* Image Container */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-60 md:opacity-70 md:group-hover:opacity-20 transition-all duration-700 md:group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yugen-ink via-yugen-ink/60 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end md:justify-center md:items-center md:text-center transition-all duration-500">
                {/* Mobile/Default Info */}
                <div className="md:group-hover:opacity-0 transition-opacity duration-500 w-full">
                  <div className="flex items-baseline justify-between md:block mb-2">
                    <span className="font-jp text-yugen-gold text-lg md:text-xl md:mb-2 block">{item.jp}</span>
                    <span className="md:hidden font-sans text-yugen-washi text-sm font-light tracking-widest">{item.price}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-yugen-washi mb-3">{item.title}</h3>
                  <div className="md:hidden space-y-4">
                    <p className="font-sans text-yugen-washi/70 text-xs leading-relaxed line-clamp-2 italic">
                      {item.description}
                    </p>
                    <div className="pt-4 border-t border-yugen-washi/10 flex items-center justify-between">
                      <span className="font-sans text-yugen-gold text-[10px] uppercase tracking-[0.2em]">{item.pairing.split(':')[1]}</span>
                      <div className="w-2 h-2 rounded-full bg-yugen-gold/30 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Desktop Hover Info */}
                <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center bg-yugen-charcoal/90 backdrop-blur-sm border border-yugen-gold/20 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden md:flex">
                  <span className="font-jp text-yugen-gold text-2xl mb-4">{item.jp}</span>
                  <h3 className="font-serif text-3xl text-yugen-washi mb-6">{item.title}</h3>
                  <p className="font-sans text-yugen-washi/80 text-sm leading-relaxed mb-6 max-w-xs">
                    {item.description}
                  </p>
                  <p className="font-sans text-yugen-gold text-xs uppercase tracking-widest mb-4">
                    {item.pairing}
                  </p>
                  <div className="w-8 h-[1px] bg-yugen-washi/30 mb-4" />
                  <p className="font-sans text-yugen-washi/90 text-xs uppercase tracking-widest font-medium mb-6">
                    {item.price}
                  </p>
                  <div className="mt-auto">
                    <span className="font-sans text-yugen-gold/60 text-[10px] uppercase tracking-[0.3em] animate-pulse">
                      Kliknij, aby zobaczyć szczegóły
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Expand Button */}
        {!isExpanded && (
          <div className="mb-24 flex justify-center md:hidden">
            <StarBorder
              as="button"
              onClick={() => setIsExpanded(true)}
              color="#D4AF37"
              speed="4s"
            >
              <span className="text-yugen-gold text-xs uppercase tracking-[0.2em]">Pokaż całe menu</span>
            </StarBorder>
          </div>
        )}

        {/* Specials Section */}
        <div className="text-center mb-16">
          <span className="font-jp text-yugen-gold text-2xl md:text-3xl mb-4 block opacity-80">
            新着
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-yugen-washi">
            Sezonowe Nowości
          </h2>
          <div className="w-8 h-[1px] bg-yugen-gold mx-auto mt-6 opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {specials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => setSelectedItem(item as any)}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col sm:flex-row bg-yugen-charcoal/50 border border-yugen-washi/5 hover:border-yugen-gold/30 transition-colors duration-500 group cursor-pointer relative"
            >
              <div className="w-full sm:w-2/5 h-[200px] sm:h-auto overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="w-full sm:w-3/5 p-6 flex flex-col justify-center relative">
                <span className="font-jp text-yugen-gold text-lg mb-1">{item.jp}</span>
                <h3 className="font-serif text-2xl text-yugen-washi mb-3">{item.title}</h3>
                <p className="font-sans text-yugen-washi/70 text-xs leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex justify-between items-end mt-auto">
                  <span className="font-sans text-yugen-gold text-sm font-medium">
                    {item.price}
                  </span>
                  <span className="font-sans text-yugen-gold/40 text-[9px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    Kliknij po szczegóły
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Full-screen Modal for Menu Items */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-yugen-ink/95 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-yugen-washi/50 hover:text-yugen-washi transition-colors z-50"
            >
              <X size={32} strokeWidth={1} />
            </button>
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-4xl bg-yugen-charcoal border border-yugen-washi/10 flex flex-col md:flex-row overflow-hidden max-h-[90vh] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yugen-charcoal to-transparent md:hidden" />
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                <span className="font-jp text-yugen-gold text-3xl md:text-4xl mb-2 block opacity-80">{selectedItem.jp}</span>
                <h3 className="font-serif text-3xl md:text-5xl text-yugen-washi mb-6">{selectedItem.title}</h3>
                <p className="font-sans text-yugen-washi/80 text-sm md:text-base leading-relaxed mb-8">
                  {selectedItem.description}
                </p>
                <div className="space-y-6 pt-8 border-t border-yugen-washi/10">
                  {selectedItem.pairing && (
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-yugen-washi/50 text-xs uppercase tracking-[0.2em]">Pairing</span>
                      <span className="font-sans text-yugen-gold text-xs uppercase tracking-widest">{selectedItem.pairing.replace('Pairing: ', '')}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-yugen-washi/50 text-xs uppercase tracking-[0.2em]">Cena</span>
                    <span className="font-sans text-yugen-washi text-sm font-medium tracking-widest">{selectedItem.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
