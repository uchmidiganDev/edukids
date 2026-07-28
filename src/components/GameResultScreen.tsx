import { useEffect, useRef } from 'react';
import { Trophy, RotateCcw, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useSound } from '../hooks/useSound';
import { getBadgeForScore } from '../utils/scoreUtils';
import ConfettiEffect from './ConfettiEffect';
import Badge from './Badge';
import BigButton from './BigButton';
import type { BadgeThresholds, TopicKey } from '../types';

interface GameResultScreenProps {
  score: number;
  thresholds: BadgeThresholds;
  onRestart: () => void;
  title: string;
  topic: TopicKey;
  gameId: string;
}

// O'yin tugagandan so'ng ko'rinadigan natija ekrani (barcha o'yinlar uchun umumiy)
export default function GameResultScreen({ score, thresholds, onRestart, title, topic, gameId }: GameResultScreenProps) {
  const { state, submitGameResult, pushToast } = useApp();
  const { playVictory } = useSound();
  const badge = getBadgeForScore(score, thresholds);
  const bestBefore = state.bestGameScores[gameId] ?? 0;
  const bestDisplay = Math.max(bestBefore, score);
  const coinsEarned = Math.round(score / 2);
  const xpEarned = Math.round(score / 3);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    submitGameResult(topic, gameId, score, badge);
    playVictory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleShare() {
    const text = `EduKids'da "${title}" o'yinida ${score} ball to'pladim! 🎮🏆`;
    if (navigator.share) {
      try {
        await navigator.share({ text, title: 'EduKids' });
      } catch {
        // foydalanuvchi bekor qildi - hech narsa qilmaymiz
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        pushToast('info', 'Natija matn ko\'rinishida nusxalandi!', '📋');
      } catch {
        pushToast('error', "Ulashib bo'lmadi, birodar!");
      }
    }
  }

  return (
    <div className="relative flex flex-col items-center gap-4 rounded-3xl bg-white/90 p-8 text-center shadow-chunky-sm dark:bg-slate-800/90">
      <ConfettiEffect active={Boolean(badge)} />
      <Trophy size={56} className="text-sunny-500" />
      <h2 className="text-2xl font-extrabold text-slate-700 dark:text-white">{title} — Yakunlandi!</h2>
      <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">
        Sening balling: <span className="text-candy-500">{score}</span>
      </p>
      <div className="flex gap-4 text-sm font-bold text-slate-500 dark:text-slate-300">
        <span>🪙 +{coinsEarned} tanga</span>
        <span>✨ +{xpEarned} XP</span>
      </div>
      <p className="text-sm font-bold text-slate-400 dark:text-slate-400">
        Eng yaxshi natija: {bestDisplay} ball
      </p>
      {badge ? (
        <Badge type={badge} size={90} />
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-300">Ko'proq mashq qil, nishon yutib ol! 💪</p>
      )}
      <div className="flex flex-wrap justify-center gap-3">
        <BigButton onClick={onRestart} icon={RotateCcw} variant="secondary">
          Qayta o'ynash
        </BigButton>
        <BigButton onClick={handleShare} icon={Share2} variant="white">
          Ulashish
        </BigButton>
      </div>
    </div>
  );
}
