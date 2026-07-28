import { motion } from 'framer-motion';
import { badgeInfo } from '../utils/scoreUtils';
import type { BadgeTier } from '../types';

interface BadgeProps {
  type: BadgeTier;
  earned?: boolean;
  size?: number;
}

// Bitta mukofot nishonini (bronza/kumush/oltin/olmos/usta) doiraviy chiroyli badge ko'rinishida chizadi
export default function Badge({ type, earned = true, size = 84 }: BadgeProps) {
  const info = badgeInfo[type];
  if (!info) return null;

  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 14 }}
    >
      <div
        className={`flex items-center justify-center rounded-full bg-gradient-to-br ${info.color} shadow-chunky ${earned ? '' : 'grayscale opacity-40'}`}
        style={{ width: size, height: size, fontSize: size * 0.5 }}
      >
        {info.emoji}
      </div>
      <span className="text-xs font-bold text-slate-600 dark:text-slate-200">{info.label}</span>
    </motion.div>
  );
}
