import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { BlurText } from '../components/reactbits/BlurText';
import { SplitText } from '../components/reactbits/SplitText';
import { Magnet } from '../components/reactbits/Magnet';
import { StarBorder } from '../components/reactbits/StarBorder';

function Fireflies() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.02;
      ref.current.rotation.y -= delta * 0.03;
      
      // Gentle pulsing effect
      const material = ref.current.material as THREE.PointsMaterial;
      material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#D4AF37"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Lanterns() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.5, 0.5]}>
        <mesh position={[-3, 1, -5]}>
          <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
          <meshStandardMaterial color="#F8F5F0" emissive="#D4AF37" emissiveIntensity={0.5} transparent opacity={0.8} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2} floatingRange={[-0.8, 0.8]}>
        <mesh position={[4, 0, -8]}>
          <cylinderGeometry args={[0.6, 0.6, 1.8, 32]} />
          <meshStandardMaterial color="#F8F5F0" emissive="#D4AF37" emissiveIntensity={0.4} transparent opacity={0.7} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8} floatingRange={[-0.3, 0.3]}>
        <mesh position={[1, 2, -10]}>
          <cylinderGeometry args={[0.4, 0.4, 1.2, 32]} />
          <meshStandardMaterial color="#F8F5F0" emissive="#D4AF37" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
      </Float>
    </group>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const setHoveringInteractive = useStore((state) => state.setHoveringInteractive);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-yugen-charcoal flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-yugen-charcoal/40 via-yugen-charcoal/60 to-yugen-charcoal z-10" />
        <img 
          src="https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2500&auto=format&fit=crop" 
          alt="Yugen Interior" 
          className="w-full h-full object-cover opacity-60"
        />
      </motion.div>

      {/* 3D Lanterns & Fireflies */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#D4AF37" />
          <Lanterns />
          <Fireflies />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <span className="font-jp text-yugen-gold text-sm md:text-base tracking-[0.5em] uppercase mb-6 opacity-80">
            Warszawa, Polska
          </span>
          
          <SplitText 
            text="YŪGEN" 
            delay={0.5}
            className="font-serif text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] text-yugen-washi leading-none tracking-tighter mb-4 drop-shadow-2xl"
          />
          
          <BlurText 
            text="Subtelna gracja, której nie da się w pełni wyrazić słowami" 
            delay={1.5}
            className="font-sans text-yugen-washi/70 text-sm md:text-lg tracking-widest uppercase max-w-xl mx-auto mt-8 mb-12 leading-relaxed"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full sm:w-auto"
        >
          <Magnet padding={50}>
            <a
              href="#reservations"
              className="px-10 py-5 bg-yugen-vermilion text-yugen-washi text-xs uppercase tracking-[0.2em] hover:bg-yugen-vermilion/90 transition-colors duration-300 w-full sm:w-auto text-center block"
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              Rozpocznij Podróż
            </a>
          </Magnet>
          
          <Magnet padding={50}>
            <StarBorder 
              as="a" 
              href="#menu"
              color="#D4AF37"
              speed="4s"
              onMouseEnter={() => setHoveringInteractive(true)}
              onMouseLeave={() => setHoveringInteractive(false)}
            >
              <span className="text-yugen-washi text-xs uppercase tracking-[0.2em]">Zobacz Menu</span>
            </StarBorder>
          </Magnet>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-yugen-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
