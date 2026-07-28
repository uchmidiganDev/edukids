import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { currentTopic } from '../data/topics';
import { useGameEngine } from '../hooks/useGameEngine';
import { useSound } from '../hooks/useSound';
import GameHUD from '../components/GameHUD';
import GameIntroScreen from '../components/GameIntroScreen';
import GameResultScreen from '../components/GameResultScreen';
import type { GameDefinition } from '../types';

const LITTER_EMOJIS = ['🍬', '🧃', '🥤', '📄', '🥫', '🍌', '🧻', '🍟'];
const LITTER_COUNT = 7;

interface Litter { key: string; emoji: string; top: number; left: number; }

function randomLitter(): Litter {
  return {
    key: Math.random().toString(36).slice(2),
    emoji: LITTER_EMOJIS[Math.floor(Math.random() * LITTER_EMOJIS.length)],
    top: 10 + Math.random() * 75,
    left: 5 + Math.random() * 85,
  };
}

export default function CleanParkGame({ config }: { config: GameDefinition }) {
  const engine = useGameEngine({ duration: 40 });
  const { playCorrect } = useSound();
  const [litter, setLitter] = useState<Litter[]>(() => Array.from({ length: LITTER_COUNT }, randomLitter));
  const [collected, setCollected] = useState(0);

  useEffect(() => {
    if (engine.running) {
      setLitter(Array.from({ length: LITTER_COUNT }, randomLitter));
      setCollected(0);
    }
  }, [engine.running]);

  function handleCollect(key: string) {
    if (!engine.running) return;
    engine.registerCorrect(10);
    playCorrect();
    setCollected((c) => c + 1);
    setLitter((prev) => prev.map((l) => (l.key === key ? randomLitter() : l)));
  }

  if (!engine.running && !engine.finished) {
    return <GameIntroScreen title={config.title} description={config.description} instructions={config.instructions} onStart={engine.start} gameId={config.id} />;
  }
  if (engine.finished) {
    return <GameResultScreen score={engine.score} thresholds={config.badgeThreshold} onRestart={engine.restart} title={config.title} topic={currentTopic.key} gameId={config.id} />;
  }

  return (
    <div>
      <GameHUD timeLeft={engine.timeLeft} score={engine.score} />
      <p className="mb-3 text-center font-bold text-slate-600 dark:text-slate-200">
        🌳 Bog'dagi chiqindilarni bosib yig'ing! ({collected} ta yig'ildi)
      </p>
      <div className="relative h-80 w-full overflow-hidden rounded-3xl bg-gradient-to-b from-sky-200 to-leafy-300 shadow-chunky-sm dark:from-slate-800 dark:to-leafy-900">
        <div className="absolute left-4 top-4 text-4xl" aria-hidden="true">☀️</div>
        <div className="absolute bottom-2 left-6 text-5xl" aria-hidden="true">🌳</div>
        <div className="absolute bottom-2 right-8 text-5xl" aria-hidden="true">🌳</div>
        <div className="absolute bottom-4 right-1/3 text-4xl" aria-hidden="true">🌸</div>
        <AnimatePresence>
          {litter.map((l) => (
            <motion.button
              key={l.key}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handleCollect(l.key)}
              style={{ position: 'absolute', top: `${l.top}%`, left: `${l.left}%` }}
              className="text-3xl drop-shadow"
              aria-label="Chiqindini yig'ish"
            >
              {l.emoji}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
