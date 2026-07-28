import { motion } from 'framer-motion';

// Tanga sonini ko'rsatadigan kichik indikator (navbar/HUD uchun)
export default function CoinDisplay({ coins, size = 'md' }: { coins: number; size?: 'sm' | 'md' }) {
  const isSmall = size === 'sm';
  return (
    <div className={`flex items-center gap-1 rounded-full bg-sunny-100 font-extrabold text-sunny-700 dark:bg-sunny-900 dark:text-sunny-200 ${isSmall ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'}`}>
      <motion.span
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        🪙
      </motion.span>
      {coins}
    </div>
  );
}
