import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop', alt: 'Interior Details', span: 'md:col-span-2 md:row-span-2' },
  { id: 2, src: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop', alt: 'Plating', span: 'md:col-span-1 md:row-span-1' },
  { id: 3, src: 'https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?q=80&w=1000&auto=format&fit=crop', alt: 'Sake Pour', span: 'md:col-span-1 md:row-span-2' },
  { id: 4, src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop', alt: 'Chef at Work', span: 'md:col-span-1 md:row-span-1' },
  { id: 5, src: 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?q=80&w=1000&auto=format&fit=crop', alt: 'Tatami Room', span: 'md:col-span-2 md:row-span-1' },
  { id: 6, src: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=1000&auto=format&fit=crop', alt: 'Ingredients', span: 'md:col-span-2 md:row-span-1' },
];

export function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const setHoveringInteractive = useStore((state) => state.setHoveringInteractive);

  const selectedImage = images.find(img => img.id === selectedId);
  const displayedImages = isExpanded ? images : images.slice(0, 3);

  return (
    <section id="gallery" className="py-32 bg-yugen-ink relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <span className="font-jp text-yugen-gold text-2xl md:text-3xl mb-4 block opacity-80">
            写真
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-yugen-washi">
            Galeria
          </h2>
          <div className="w-12 h-[1px] bg-yugen-gold mx-auto mt-8 opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-[200px]">
          {displayedImages.map((img, index) => (
            <motion.div
              key={img.id}
              layoutId={`gallery-image-${img.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden cursor-pointer group rounded-sm border border-yugen-washi/5 hover:border-yugen-gold/20 transition-colors duration-500 ${img.span} ${!isExpanded && index >= 3 ? 'md:block hidden' : ''}`}
              onClick={() => setSelectedId(img.id)}
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 opacity-80 md:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yugen-ink via-yugen-ink/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-0 transition-opacity duration-500" />
              
              {/* Mobile Card Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end md:hidden pointer-events-none">
                <span className="font-sans text-yugen-gold text-[10px] uppercase tracking-[0.2em] mb-2">Galeria</span>
                <h3 className="font-serif text-xl text-yugen-washi">{img.alt}</h3>
              </div>
            </motion.div>
          ))}
          
          {/* Desktop images that are hidden on mobile when not expanded */}
          {!isExpanded && images.slice(3).map((img, index) => (
            <motion.div
              key={`desktop-${img.id}`}
              layoutId={`gallery-image-${img.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden cursor-pointer group rounded-sm border border-yugen-washi/5 hover:border-yugen-gold/20 transition-colors duration-500 ${img.span} hidden md:block`}
              onClick={() => setSelectedId(img.id)}
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 opacity-80 md:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yugen-ink via-yugen-ink/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-0 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Mobile Expand Button */}
        {!isExpanded && (
          <div className="mt-12 flex justify-center md:hidden">
            <button
              onClick={() => setIsExpanded(true)}
              className="px-8 py-4 border border-yugen-gold/30 text-yugen-gold text-xs uppercase tracking-[0.2em] hover:bg-yugen-gold/10 transition-colors duration-300"
            >
              Pokaż więcej
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedId && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-yugen-ink/95 backdrop-blur-md cursor-zoom-out"
            onClick={() => setSelectedId(null)}
          >
            <button
              className="absolute top-6 right-6 text-yugen-washi/50 hover:text-yugen-washi transition-colors z-50"
              onClick={() => setSelectedId(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>
            
            <motion.div
              layoutId={`gallery-image-${selectedImage.id}`}
              className="relative w-full max-w-5xl max-h-[85vh] flex flex-col bg-yugen-charcoal border border-yugen-washi/10 shadow-2xl overflow-hidden cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 overflow-hidden bg-black/50">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8 bg-yugen-charcoal flex justify-between items-center border-t border-yugen-washi/5">
                <div>
                  <span className="font-sans text-yugen-gold text-[10px] uppercase tracking-[0.2em] mb-1 block">Galeria</span>
                  <h3 className="font-serif text-2xl text-yugen-washi">{selectedImage.alt}</h3>
                </div>
                <span className="font-jp text-yugen-washi/20 text-4xl hidden md:block">写真</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
