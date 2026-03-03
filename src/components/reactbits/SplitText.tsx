import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SplitTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export const SplitText = ({ text, delay = 0, className = '' }: SplitTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const letters = text.split('');

  return (
    <h1 ref={ref} className={`flex justify-center flex-wrap ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 1,
            delay: delay + i * 0.05,
            ease: [0.2, 0.0, 0.0, 1.0],
          }}
          style={{ transformOrigin: '50% 50% -50px' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </h1>
  );
};
