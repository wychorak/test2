import { motion } from 'framer-motion';

const team = [
  {
    name: 'Hiroshi Tanaka',
    role: 'Szef Kuchni',
    jp: '料理長',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop',
    bio: 'Z 20-letnim doświadczeniem w najlepszych ryotei w Kioto, Szef Tanaka wnosi bezkompromisowe oddanie sezonowym składnikom i tradycyjnym technikom.',
  },
  {
    name: 'Aiko Sato',
    role: 'Główny Sommelier',
    jp: 'ソムリエ',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?q=80&w=1000&auto=format&fit=crop',
    bio: 'Kuratorując ekskluzywną kolekcję rzadkich sake i szlachetnych win, Aiko tworzy połączenia, które podkreślają każdy niuans menu degustacyjnego.',
  },
  {
    name: 'Kenji Nakamura',
    role: 'Maitre D\'',
    jp: '支配人',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    bio: 'Uosabiając ducha Omotenashi, Kenji dba o to, by każdy gość doświadczył bezbłędnej, intuicyjnej gościnności od momentu przybycia.',
  },
];

export function Team() {
  return (
    <section className="py-32 bg-yugen-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <span className="font-jp text-yugen-gold text-2xl md:text-3xl mb-4 block opacity-80">
            職人
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-yugen-washi">
            Rzemieślnicy
          </h2>
          <div className="w-12 h-[1px] bg-yugen-gold mx-auto mt-8 opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-48 h-64 md:w-64 md:h-80 mb-8 overflow-hidden">
                <div className="absolute inset-0 border border-yugen-gold/20 z-10 scale-95 group-hover:scale-100 transition-transform duration-700 ease-out" />
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <span className="font-jp text-yugen-gold text-xl mb-2">{member.jp}</span>
              <h3 className="font-serif text-2xl text-yugen-washi mb-2">{member.name}</h3>
              <p className="font-sans text-yugen-washi/50 text-xs uppercase tracking-widest mb-6">
                {member.role}
              </p>
              <p className="font-sans text-yugen-washi/70 text-sm leading-relaxed max-w-xs">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
