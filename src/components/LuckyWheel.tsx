import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useSound } from '../hooks/useSound';
import ConfettiEffect from './ConfettiEffect';
import BigButton from './BigButton';

const SEGMENTS = [10, 20, 5, 50, 15, 30, 5, 100];
const SEGMENT_ANGLE = 360 / SEGMENTS.length;
const SPIN_COST = 15;
const COLORS = ['#f59e0b', '#0ea5e9', '#f0429c', '#22c55e', '#8b5cf6', '#facc15', '#fb923c', '#38bdf8'];

function buildConicGradient() {
  const stops = SEGMENTS.map((_, i) => {
    const from = i * SEGMENT_ANGLE;
    const to = from + SEGMENT_ANGLE;
    return `${COLORS[i % COLORS.length]} ${from}deg ${to}deg`;
  });
  return `conic-gradient(${stops.join(', ')})`;
}

// Omadli g'ildirak - tangalarni sarflab, ko'proq tanga yutish imkoniyati
export default function LuckyWheel() {
  const { state, addCoins, pushToast } = useApp();
  const { playCoin, playWhoosh } = useSound();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const canSpin = state.coins >= SPIN_COST && !spinning;

  function handleSpin() {
    if (!canSpin) return;
    setResult(null);
    setSpinning(true);
    playWhoosh();
    addCoins(-SPIN_COST);

    const targetIndex = Math.floor(Math.random() * SEGMENTS.length);
    const targetAngle = 360 - (targetIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2);
    const fullSpins = 5 * 360;
    const finalRotation = rotation + fullSpins + targetAngle - (rotation % 360);

    setRotation(finalRotation);
    setTimeout(() => {
      const won = SEGMENTS[targetIndex];
      addCoins(won);
      playCoin();
      setResult(won);
      setSpinning(false);
      pushToast('success', `G'ildirak senga ${won} tanga berdi!`, '🎡');
    }, 3200);
  }

  return (
    <div className="flex flex-col items-center gap-5 rounded-3xl bg-white/90 p-8 text-center shadow-chunky-sm dark:bg-slate-800/90">
      <ConfettiEffect active={result !== null && result >= 50} count={80} />
      <h3 className="text-xl font-extrabold text-slate-700 dark:text-white">🎡 Omadli g'ildirak</h3>
      <p className="text-sm text-slate-500 dark:text-slate-300">Aylantirish narxi: {SPIN_COST} 🪙</p>

      <div className="relative h-56 w-56">
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1">
          <div className="h-0 w-0 border-x-8 border-t-[16px] border-x-transparent border-t-slate-700 dark:border-t-white" />
        </div>
        <motion.div
          className="h-full w-full rounded-full border-4 border-white shadow-chunky dark:border-slate-600"
          style={{ background: buildConicGradient() }}
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: [0.15, 0.85, 0.25, 1] }}
        >
          {SEGMENTS.map((val, i) => {
            const angle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
            return (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 origin-top text-sm font-extrabold text-white"
                style={{ transform: `rotate(${angle}deg) translateY(-78px) translateX(-50%)` }}
              >
                {val}
              </span>
            );
          })}
        </motion.div>
        <div className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow dark:bg-slate-700">
          🪙
        </div>
      </div>

      <BigButton onClick={handleSpin} disabled={!canSpin} variant="purple">
        {spinning ? 'Aylanmoqda...' : "Aylantirish"}
      </BigButton>
      {!canSpin && !spinning && (
        <p className="text-xs text-slate-400">Aylantirish uchun kamida {SPIN_COST} tanga kerak.</p>
      )}
    </div>
  );
}
