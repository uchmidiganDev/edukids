import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, Trophy, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ToastMessage } from '../types';

const iconMap: Record<ToastMessage['type'], typeof CheckCircle2> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  achievement: Trophy,
};

const colorMap: Record<ToastMessage['type'], string> = {
  success: 'bg-leafy-500',
  error: 'bg-candy-500',
  info: 'bg-bubble-500',
  achievement: 'bg-sunny-500',
};

// Ekranning yuqori o'ng burchagida chiqadigan qisqa xabarnomalar (toast)
export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[70] flex w-full max-w-xs flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = iconMap[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              className={`pointer-events-auto flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-chunky-sm ${colorMap[t.type]}`}
              role="status"
            >
              {t.emoji ? <span className="text-lg" aria-hidden="true">{t.emoji}</span> : <Icon size={20} aria-hidden="true" />}
              <span className="flex-1">{t.text}</span>
              <button onClick={() => dismissToast(t.id)} aria-label="Yopish" className="opacity-80 hover:opacity-100">
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
