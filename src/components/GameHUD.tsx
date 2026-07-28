import { Timer, Star } from 'lucide-react';
import LivesDisplay from './LivesDisplay';
import ComboBadge from './ComboBadge';

interface GameHUDProps {
  timeLeft: number;
  score: number;
  lives?: number;
  totalLives?: number;
  combo?: number;
}

// O'yin davomida ko'rinadigan taymer, ball, jon va combo paneli
export default function GameHUD({ timeLeft, score, lives, totalLives = 3, combo = 0 }: GameHUDProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white/80 px-6 py-4 shadow-chunky-sm dark:bg-slate-800/80">
      <div className={`flex items-center gap-2 text-lg font-extrabold ${timeLeft <= 10 ? 'animate-wiggle text-candy-500' : 'text-bubble-500'}`}>
        <Timer aria-hidden="true" /> {timeLeft}s
      </div>
      {typeof lives === 'number' && <LivesDisplay lives={lives} total={totalLives} />}
      <ComboBadge combo={combo} />
      <div className="flex items-center gap-2 text-lg font-extrabold text-sunny-600">
        <Star className="fill-sunny-400 text-sunny-500" aria-hidden="true" /> {score} ball
      </div>
    </div>
  );
}
