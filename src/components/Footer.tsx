import { Heart } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { useApp } from '../context/AppContext';
import ConfettiEffect from './ConfettiEffect';
import { useState } from 'react';

export default function Footer() {
  const { bumpEasterEgg, unlockAchievement, pushToast } = useApp();
  const [celebrate, setCelebrate] = useState(false);

  function handleHeartClick() {
    const count = bumpEasterEgg('heart-click');
    if (count === 5) {
      unlockAchievement('heart-clicker');
      pushToast('achievement', 'Yashirin yutuq: Yurak kashfiyotchisi!', '💗');
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 2500);
    }
  }

  return (
    <footer className="mt-auto bg-white/70 py-8 text-center dark:bg-slate-900/80">
      <ConfettiEffect active={celebrate} count={50} />
      <div className="mx-auto max-w-3xl px-4">
        <p className="mb-2 text-lg font-extrabold text-slate-700 dark:text-white">
          🦉 EduKids
        </p>
        <p className="mx-auto mb-3 max-w-xl text-sm text-slate-500 dark:text-slate-300">
          Bu platforma bolalarga <strong>{currentTopic.title}</strong> mavzusini o'rganish, viktorina va o'yin
          orqali qiziqarli va xavfsiz tarzda o'zlashtirishga yordam beradi.
        </p>
        <button
          onClick={handleHeartClick}
          className="mx-auto flex items-center justify-center gap-1 text-sm font-semibold text-slate-500 dark:text-slate-300"
          aria-label="Yurakni bosing"
        >
          Made with <Heart size={16} className="fill-candy-500 text-candy-500" /> for bolajonlar
        </button>
        <p className="mt-1 text-xs font-bold uppercase tracking-wide text-sunny-600 dark:text-sunny-300">
          AI Asoslari Yakuniy Imtihon
        </p>
      </div>
    </footer>
  );
}
