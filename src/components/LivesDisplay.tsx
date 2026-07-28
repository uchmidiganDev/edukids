import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// Viktorina/o'yinda qolgan "jonlar"ni (hayotlarni) yurak ikonkalari bilan ko'rsatadi
export default function LivesDisplay({ lives, total = 3 }: { lives: number; total?: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${lives} dan ${total} jon qoldi`}>
      {Array.from({ length: total }, (_, i) => (
        <motion.span
          key={i}
          animate={i < lives ? {} : { scale: [1, 1.3, 0.9] }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            size={22}
            fill={i < lives ? '#f0429c' : 'transparent'}
            color={i < lives ? '#f0429c' : '#cbd5e1'}
          />
        </motion.span>
      ))}
    </div>
  );
}
