import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Clock, Footprints } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { useGameEngine } from '../hooks/useGameEngine';
import { useSound } from '../hooks/useSound';
import GameHUD from '../components/GameHUD';
import GameIntroScreen from '../components/GameIntroScreen';
import GameResultScreen from '../components/GameResultScreen';
import type { GameDefinition } from '../types';

type Light = 'red' | 'yellow' | 'green';
type Action = 'STOP' | 'WAIT' | 'GO';

interface Round {
  id: string;
  light: Light;
  carNear: boolean;
  correctAction: Action;
}

const lightMeta: Record<Light, { emoji: string; label: string }> = {
  red: { emoji: '🔴', label: 'Qizil chiroq' },
  yellow: { emoji: '🟡', label: 'Sariq chiroq' },
  green: { emoji: '🟢', label: 'Yashil chiroq' },
};

function randomRound(): Round {
  const light: Light = (['red', 'yellow', 'green'] as Light[])[Math.floor(Math.random() * 3)];
  const carNear = light === 'green' ? Math.random() < 0.5 : Math.random() < 0.3;
  let correctAction: Action = 'WAIT';
  if (light === 'red') correctAction = 'STOP';
  else if (light === 'yellow') correctAction = 'WAIT';
  else if (light === 'green') correctAction = carNear ? 'WAIT' : 'GO';
  return { id: Math.random().toString(36).slice(2), light, carNear, correctAction };
}

const actions: { key: Action; label: string; icon: typeof Hand; color: string }[] = [
  { key: 'STOP', label: "TO'XTA", icon: Hand, color: 'bg-candy-500 hover:bg-candy-600' },
  { key: 'WAIT', label: 'KUT', icon: Clock, color: 'bg-sunny-500 hover:bg-sunny-600' },
  { key: 'GO', label: 'YUR', icon: Footprints, color: 'bg-leafy-500 hover:bg-leafy-600' },
];

export default function TrafficLightGame({ config }: { config: GameDefinition }) {
  const engine = useGameEngine({ duration: 40 });
  const { playCorrect, playWrong } = useSound();
  const [round, setRound] = useState<Round>(randomRound());
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    if (engine.running) setRound(randomRound());
  }, [engine.running]);

  const handleAction = useCallback((key: Action) => {
    if (!engine.running) return;
    const correct = key === round.correctAction;
    if (correct) { engine.registerCorrect(10); playCorrect(); setFeedback('correct'); }
    else { engine.registerWrong(5); playWrong(); setFeedback('wrong'); }
    setTimeout(() => setFeedback(null), 350);
    setRound(randomRound());
  }, [engine, round, playCorrect, playWrong]);

  if (!engine.running && !engine.finished) {
    return <GameIntroScreen title={config.title} description={config.description} instructions={config.instructions} onStart={engine.start} gameId={config.id} />;
  }
  if (engine.finished) {
    return <GameResultScreen score={engine.score} thresholds={config.badgeThreshold} onRestart={engine.restart} title={config.title} topic={currentTopic.key} gameId={config.id} />;
  }

  return (
    <div>
      <GameHUD timeLeft={engine.timeLeft} score={engine.score} combo={engine.combo} />
      <div className={`flex flex-col items-center gap-8 rounded-3xl bg-gradient-to-b from-slate-200 to-slate-300 p-8 shadow-chunky-sm transition dark:from-slate-700 dark:to-slate-800 ${feedback === 'correct' ? 'ring-4 ring-leafy-400' : feedback === 'wrong' ? 'ring-4 ring-candy-400' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div key={round.id} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} className="flex flex-col items-center gap-3">
            <div className="rounded-3xl bg-slate-900 px-8 py-6 text-6xl shadow-inner" aria-label={lightMeta[round.light].label}>
              {lightMeta[round.light].emoji}
            </div>
            <div className="text-5xl" aria-hidden="true">{round.carNear ? '🚗💨' : '🛣️'}</div>
            <p className="font-bold text-slate-600 dark:text-slate-200">{round.carNear ? "Mashina yaqinlashmoqda!" : "Yo'l bo'sh ko'rinmoqda"}</p>
          </motion.div>
        </AnimatePresence>
        <div className="grid w-full max-w-md grid-cols-3 gap-3">
          {actions.map((a) => (
            <button key={a.key} onClick={() => handleAction(a.key)} className={`flex flex-col items-center gap-2 rounded-2xl py-5 font-extrabold text-white shadow-chunky-sm transition active:translate-y-1 active:shadow-none ${a.color}`}>
              <a.icon size={26} />
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
