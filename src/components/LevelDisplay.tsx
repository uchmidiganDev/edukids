import ProgressBar from './ProgressBar';
import { levelFromXp, xpIntoCurrentLevel, xpNeededForNextLevel } from '../utils/scoreUtils';

// Foydalanuvchining darajasi (level) va XP progress-barini ko'rsatadi
export default function LevelDisplay({ xp }: { xp: number }) {
  const level = levelFromXp(xp);
  const into = xpIntoCurrentLevel(xp);
  const needed = xpNeededForNextLevel();

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-grape-400 to-bubble-500 font-extrabold text-white shadow-chunky-sm">
        {level}
      </div>
      <div className="min-w-[120px] flex-1">
        <div className="mb-0.5 flex justify-between text-xs font-bold text-slate-500 dark:text-slate-300">
          <span>{level}-daraja</span>
          <span>{into}/{needed} XP</span>
        </div>
        <ProgressBar percent={(into / needed) * 100} colorClass="bg-gradient-to-r from-grape-400 to-bubble-400" height="h-2.5" />
      </div>
    </div>
  );
}
