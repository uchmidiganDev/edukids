import { Play, Trophy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BigButton from './BigButton';
import Mascot from './Mascot';

interface GameIntroScreenProps {
  title: string;
  description: string;
  instructions: string[];
  onStart: () => void;
  gameId: string;
}

// O'yin boshlanishidan oldingi ko'rsatma va "Boshlash" ekrani (barcha o'yinlar uchun umumiy)
export default function GameIntroScreen({ title, description, instructions, onStart, gameId }: GameIntroScreenProps) {
  const { state } = useApp();
  const best = state.bestGameScores[gameId] ?? 0;

  return (
    <div className="flex flex-col items-center gap-5 rounded-3xl bg-white/90 p-8 text-center shadow-chunky-sm dark:bg-slate-800/90">
      <Mascot size={110} talkOnClick={false} />
      <h2 className="text-2xl font-extrabold text-slate-700 dark:text-white">{title}</h2>
      <p className="max-w-md text-slate-600 dark:text-slate-300">{description}</p>
      <ul className="mx-auto max-w-md list-inside list-disc space-y-1 text-left text-sm text-slate-500 dark:text-slate-300">
        {instructions.map((line, i) => <li key={i}>{line}</li>)}
      </ul>
      {best > 0 && (
        <p className="flex items-center gap-2 font-bold text-sunny-600 dark:text-sunny-300">
          <Trophy size={18} /> Eng yaxshi natijang: {best} ball
        </p>
      )}
      <BigButton onClick={onStart} icon={Play} variant="success">
        O'yinni boshlash
      </BigButton>
    </div>
  );
}
