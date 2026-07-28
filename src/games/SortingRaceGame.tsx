import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { currentTopic } from '../data/topics';
import { useGameEngine } from '../hooks/useGameEngine';
import { useSound } from '../hooks/useSound';
import GameHUD from '../components/GameHUD';
import GameIntroScreen from '../components/GameIntroScreen';
import GameResultScreen from '../components/GameResultScreen';
import type { GameDefinition } from '../types';

const pool = [
  { emoji: '📰', category: 'paper' },
  { emoji: '🥤', category: 'plastic' },
  { emoji: '🍾', category: 'glass' },
  { emoji: '🍌', category: 'organic' },
  { emoji: '📦', category: 'paper' },
  { emoji: '🧴', category: 'plastic' },
  { emoji: '🫙', category: 'glass' },
  { emoji: '🍎', category: 'organic' },
];

const bins = [
  { key: 'paper', label: "Qog'oz", emoji: '📄', color: 'bg-bubble-500 hover:bg-bubble-600' },
  { key: 'plastic', label: 'Plastik', emoji: '🥤', color: 'bg-sunny-500 hover:bg-sunny-600' },
  { key: 'glass', label: 'Shisha', emoji: '🍾', color: 'bg-leafy-500 hover:bg-leafy-600' },
  { key: 'organic', label: 'Organik', emoji: '🍂', color: 'bg-orange-700 hover:bg-orange-800' },
];

function randomItem() {
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function SortingRaceGame({ config }: { config: GameDefinition }) {
  const engine = useGameEngine({ duration: 45 });
  const { playCorrect, playWrong } = useSound();
  const [current, setCurrent] = useState(randomItem());
  const [itemIndex, setItemIndex] = useState(0);
  const [itemTime, setItemTime] = useState(4);
  const [maxItemTime, setMaxItemTime] = useState(4);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    if (engine.running) {
      setCurrent(randomItem());
      setItemIndex(0);
      setMaxItemTime(4);
      setItemTime(4);
    }
  }, [engine.running]);

  function nextItem() {
    setItemIndex((idx) => {
      const nextIdx = idx + 1;
      const nextMax = Math.max(1.5, 4 - nextIdx * 0.15);
      setMaxItemTime(nextMax);
      setItemTime(nextMax);
      return nextIdx;
    });
    setCurrent(randomItem());
  }

  useEffect(() => {
    if (!engine.running) return undefined;
    const tick = setInterval(() => {
      setItemTime((t) => {
        if (t <= 0.15) {
          engine.registerWrong(3);
          playWrong();
          nextItem();
          return maxItemTime;
        }
        return t - 0.15;
      });
    }, 150);
    return () => clearInterval(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine.running, maxItemTime]);

  function handleBin(binKey: string) {
    if (!engine.running) return;
    const correct = binKey === current.category;
    if (correct) { engine.registerCorrect(8); playCorrect(); setFeedback('correct'); }
    else { engine.registerWrong(3); playWrong(); setFeedback('wrong'); }
    setTimeout(() => setFeedback(null), 250);
    nextItem();
  }

  if (!engine.running && !engine.finished) {
    return <GameIntroScreen title={config.title} description={config.description} instructions={config.instructions} onStart={engine.start} gameId={config.id} />;
  }
  if (engine.finished) {
    return <GameResultScreen score={engine.score} thresholds={config.badgeThreshold} onRestart={engine.restart} title={config.title} topic={currentTopic.key} gameId={config.id} />;
  }

  return (
    <div>
      <GameHUD timeLeft={engine.timeLeft} score={engine.score} combo={engine.combo} />
      <div className={`flex flex-col items-center gap-5 rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200 p-6 shadow-chunky-sm dark:from-slate-700 dark:to-slate-800 ${feedback === 'correct' ? 'ring-4 ring-leafy-400' : feedback === 'wrong' ? 'ring-4 ring-candy-400' : ''}`}>
        <p className="font-bold text-slate-600 dark:text-slate-200">⚡ Tezroq saralang, tezlik oshib bormoqda!</p>
        <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-300 dark:bg-slate-600">
          <motion.div className="h-full bg-candy-500" animate={{ width: `${(itemTime / maxItemTime) * 100}%` }} transition={{ duration: 0.1, ease: 'linear' }} />
        </div>
        <motion.div key={itemIndex} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-7xl">
          {current.emoji}
        </motion.div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {bins.map((bin) => (
            <button key={bin.key} onClick={() => handleBin(bin.key)} className={`rounded-2xl px-4 py-3 text-sm font-extrabold text-white shadow-chunky-sm transition active:translate-y-1 active:shadow-none ${bin.color}`}>
              {bin.emoji} {bin.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
