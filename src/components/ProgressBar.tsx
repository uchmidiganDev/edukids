import { motion } from 'framer-motion';

interface ProgressBarProps {
  percent: number;
  label?: string;
  colorClass?: string;
  height?: string;
}

// Umumiy maqsadli progress-bar: foizni chiroyli animatsiya bilan ko'rsatadi
export default function ProgressBar({ percent, label, colorClass = 'bg-leafy-500', height = 'h-4' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 flex items-center justify-between text-sm font-bold text-slate-600 dark:text-slate-200">
          <span>{label}</span>
          <span>{Math.round(clamped)}%</span>
        </div>
      )}
      <div
        className={`w-full ${height} overflow-hidden rounded-full bg-white/60 shadow-inner dark:bg-slate-700/60`}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
