import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useSound } from '../hooks/useSound';
import ConfettiEffect from './ConfettiEffect';
import BigButton from './BigButton';

// Kunlik mukofot sandig'i - har kuni bir marta ochish mumkin
export default function TreasureChest() {
  const { claimDailyReward, isDailyRewardAvailable } = useApp();
  const { playCoin } = useSound();
  const [reward, setReward] = useState<number | null>(null);
  const [opening, setOpening] = useState(false);
  const available = isDailyRewardAvailable();

  function handleOpen() {
    if (!available) return;
    setOpening(true);
    setTimeout(() => {
      const amount = claimDailyReward();
      setReward(amount);
      playCoin();
      setOpening(false);
    }, 700);
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-b from-sunny-100 to-sunny-200 p-8 text-center shadow-chunky-sm dark:from-slate-800 dark:to-slate-700">
      <ConfettiEffect active={reward !== null} count={60} />
      <motion.div
        animate={opening ? { rotate: [0, -8, 8, -8, 8, 0], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.6 }}
        className="text-7xl"
        aria-hidden="true"
      >
        {reward !== null ? '📦✨' : '🎁'}
      </motion.div>
      <h3 className="text-xl font-extrabold text-slate-700 dark:text-white">Kunlik mukofot sandig'i</h3>
      <AnimatePresence mode="wait">
        {reward !== null ? (
          <motion.p key="reward" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-lg font-bold text-sunny-600 dark:text-sunny-300">
            +{reward} tanga oldingiz! Ertaga yana qayting! 🎉
          </motion.p>
        ) : available ? (
          <BigButton key="open" onClick={handleOpen} icon={Gift} variant="primary" disabled={opening}>
            {opening ? 'Ochilmoqda...' : 'Sandiqni och!'}
          </BigButton>
        ) : (
          <p key="claimed" className="font-semibold text-slate-500 dark:text-slate-300">
            Bugungi mukofotni olib bo'lgansiz. Ertaga qaytib keling! 🌙
          </p>
        )}
      </AnimatePresence>
    </div>
  );
}
