import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface StarRatingProps {
  stars: number;
  total?: number;
  size?: number;
}

// 5 tagacha yulduzni to'ldirilgan/bo'sh holatda ko'rsatadi, ketma-ket "popIn" animatsiyasi bilan
export default function StarRating({ stars, total = 5, size = 36 }: StarRatingProps) {
  return (
    <div className="flex items-center justify-center gap-1" role="img" aria-label={`${stars} dan ${total} yulduz`}>
      {Array.from({ length: total }, (_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.15, type: 'spring', stiffness: 260, damping: 12 }}
        >
          <Star
            size={size}
            fill={i < stars ? '#fbbf24' : 'transparent'}
            color={i < stars ? '#f59e0b' : '#cbd5e1'}
            strokeWidth={2}
          />
        </motion.span>
      ))}
    </div>
  );
}
