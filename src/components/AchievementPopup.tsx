import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { badgeInfo } from '../utils/scoreUtils';
import { getAchievement } from '../data/achievements';
import { useSound } from '../hooks/useSound';
import Badge from './Badge';
import ConfettiEffect from './ConfettiEffect';
import type { BadgeTier } from '../types';

// Yangi nishon yoki yutuq qo'lga kiritilganda butun ekranga chiqadigan tabriknoma oynasi
export default function AchievementPopup() {
  const { pendingAchievement, clearPendingAchievement } = useApp();
  const { playVictory } = useSound();

  useEffect(() => {
    if (pendingAchievement) playVictory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingAchievement?.kind, pendingAchievement?.id]);

  const isBadge = pendingAchievement?.kind === 'badge';
  const achievement = pendingAchievement && !isBadge ? getAchievement(pendingAchievement.id) : undefined;
  const badgeType = pendingAchievement && isBadge ? (pendingAchievement.id as BadgeTier) : undefined;

  return (
    <AnimatePresence>
      {pendingAchievement && (isBadge ? badgeType : achievement) && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={clearPendingAchievement}
          role="dialog"
          aria-modal="true"
          aria-label="Yangi mukofot"
        >
          <ConfettiEffect active count={90} />
          <motion.div
            className="relative w-full max-w-sm rounded-[2.5rem] bg-white p-8 text-center shadow-2xl dark:bg-slate-800"
            initial={{ scale: 0.6, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.6, y: 40 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={clearPendingAchievement}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
              aria-label="Yopish"
            >
              <X size={22} />
            </button>
            <p className="mb-2 text-2xl font-extrabold text-candy-500">Tabriklaymiz! 🎉</p>
            {isBadge && badgeType ? (
              <>
                <div className="my-4 flex justify-center">
                  <Badge type={badgeType} size={110} />
                </div>
                <p className="font-semibold text-slate-600 dark:text-slate-200">
                  Siz "{badgeInfo[badgeType].label}" ni qo'lga kiritdingiz!
                </p>
              </>
            ) : achievement ? (
              <>
                <div className="my-4 flex justify-center text-6xl">{achievement.emoji}</div>
                <p className="font-extrabold text-slate-700 dark:text-white">{achievement.title}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{achievement.description}</p>
              </>
            ) : null}
            <button
              onClick={clearPendingAchievement}
              className="mt-6 w-full rounded-2xl bg-sunny-400 py-3 font-bold text-white shadow-chunky-sm transition hover:bg-sunny-500 active:translate-y-1 active:shadow-none"
            >
              Ajoyib!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
