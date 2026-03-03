import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 bg-yugen-charcoal overflow-hidden flex items-center justify-center">
      {/* Ink Wash Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1528696892704-5e1122852276?q=80&w=2500&auto=format&fit=crop" 
          alt="Ink Wash" 
          className="w-full h-full object-cover mix-blend-overlay grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-yugen-charcoal via-transparent to-yugen-charcoal" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <span className="font-jp text-yugen-gold text-4xl md:text-6xl mb-8 block opacity-80">
          おもてなし
        </span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-yugen-washi leading-tight mb-12">
          Sztuka Omotenashi
        </h2>
        <div className="space-y-8 font-sans text-yugen-washi/70 text-sm md:text-base leading-relaxed tracking-wide max-w-2xl mx-auto">
          <p>
            W Yūgen wierzymy, że prawdziwy luksus tkwi w tym, co niewidoczne. To subtelna gracja idealnie zsynchronizowanego nalewania sake, cicha harmonia sezonowych składników i głębia prostoty.
          </p>
          <p>
            Nasze 12-osobowe sanktuarium w sercu Warszawy to pomost między polskim terroir a japońską tradycją. Tutaj każde danie jest wierszem, a każdy gest aktem uważności.
          </p>
          <p className="text-yugen-gold italic font-serif text-xl mt-12">
            "Dostrzec wszechświat w pojedynczym ziarenku ryżu."
          </p>
        </div>
      </motion.div>
    </section>
  );
}
