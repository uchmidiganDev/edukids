import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { currentTopic } from '../data/topics';
import { useGameEngine } from '../hooks/useGameEngine';
import { useSound } from '../hooks/useSound';
import GameHUD from '../components/GameHUD';
import GameIntroScreen from '../components/GameIntroScreen';
import GameResultScreen from '../components/GameResultScreen';
import type { GameDefinition } from '../types';

const items = [
  { id: 1, emoji: '📰', label: 'Gazeta', category: 'paper' },
  { id: 2, emoji: '📦', label: 'Karton quti', category: 'paper' },
  { id: 3, emoji: '🧻', label: "Qog'oz salfetka", category: 'paper' },
  { id: 4, emoji: '🥤', label: 'Plastik stakan', category: 'plastic' },
  { id: 5, emoji: '🧴', label: 'Plastik butilka', category: 'plastic' },
  { id: 6, emoji: '🛍️', label: 'Plastik paket', category: 'plastic' },
  { id: 7, emoji: '🍾', label: 'Shisha butilka', category: 'glass' },
  { id: 8, emoji: '🫙', label: 'Shisha idish', category: 'glass' },
  { id: 9, emoji: '🍌', label: "Banan po'stlog'i", category: 'organic' },
  { id: 10, emoji: '🍎', label: "Olma qoldig'i", category: 'organic' },
  { id: 11, emoji: '🥕', label: "Sabzi qoldig'i", category: 'organic' },
];

const bins = [
  { key: 'paper', label: "Qog'oz", emoji: '📄', classes: 'border-bubble-400 bg-bubble-50 text-bubble-600 dark:text-bubble-300' },
  { key: 'plastic', label: 'Plastik', emoji: '🥤', classes: 'border-sunny-400 bg-sunny-50 text-sunny-600 dark:text-sunny-300' },
  { key: 'glass', label: 'Shisha', emoji: '🍾', classes: 'border-leafy-400 bg-leafy-50 text-leafy-600 dark:text-leafy-300' },
  { key: 'organic', label: 'Organik', emoji: '🍂', classes: 'border-amber-800 bg-amber-50 text-amber-800 dark:text-amber-500' },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SortWasteGame({ config }: { config: GameDefinition }) {
  const engine = useGameEngine({ duration: 60 });
  const { playCorrect, playWrong } = useSound();
  const [queue, setQueue] = useState(() => shuffle(items));
  const [cursor, setCursor] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [locked, setLocked] = useState(false);
  const binRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const current = queue[cursor];

  function resetRound() {
    setQueue(shuffle(items));
    setCursor(0);
    setFeedback(null);
    setLocked(false);
  }

  const resolveChoice = useCallback((binKey: string) => {
    if (!current || locked) return;
    setLocked(true);
    const correct = binKey === current.category;
    if (correct) { engine.registerCorrect(10); playCorrect(); } else { engine.registerWrong(5); playWrong(); }
    setFeedback(correct ? 'correct' : 'wrong');

    setTimeout(() => {
      setFeedback(null);
      setLocked(false);
      if (cursor + 1 >= queue.length) engine.finish();
      else setCursor((c) => c + 1);
    }, 550);
  }, [current, locked, cursor, queue.length, engine, playCorrect, playWrong]);

  const handleDragEnd = useCallback((_event: unknown, info: { point: { x: number; y: number } }) => {
    const point = info.point;
    for (const bin of bins) {
      const el = binRefs.current[bin.key];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (point.x >= r.left && point.x <= r.right && point.y >= r.top && point.y <= r.bottom) {
        resolveChoice(bin.key);
        return;
      }
    }
  }, [resolveChoice]);

  if (!engine.running && !engine.finished) {
    return <GameIntroScreen title={config.title} description={config.description} instructions={config.instructions} onStart={() => { resetRound(); engine.start(); }} gameId={config.id} />;
  }
  if (engine.finished) {
    return <GameResultScreen score={engine.score} thresholds={config.badgeThreshold} onRestart={() => { resetRound(); engine.restart(); }} title={config.title} topic={currentTopic.key} gameId={config.id} />;
  }

  return (
    <div>
      <GameHUD timeLeft={engine.timeLeft} score={engine.score} />
      <p className="mb-4 text-center font-bold text-slate-600 dark:text-slate-200">
        Chiqindini sudrab yoki tugmani bosib to'g'ri qutiga joylashtir! ({Math.min(cursor + 1, queue.length)}/{queue.length})
      </p>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {bins.map((bin) => (
          <div key={bin.key} ref={(el) => { binRefs.current[bin.key] = el; }} className={`flex h-24 flex-col items-center justify-center gap-1 rounded-3xl border-4 border-dashed font-extrabold dark:bg-slate-800 ${bin.classes}`}>
            <span className="text-2xl" aria-hidden="true">{bin.emoji}</span>
            {bin.label}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-5">
        {current && (
          <motion.div
            key={current.id}
            drag
            dragSnapToOrigin
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.1, zIndex: 20 }}
            className={`flex flex-col items-center gap-1 rounded-3xl bg-white p-6 text-center font-semibold shadow-chunky-sm active:cursor-grabbing dark:bg-slate-700 dark:text-white cursor-grab select-none ${
              feedback === 'correct' ? 'ring-4 ring-leafy-400' : feedback === 'wrong' ? 'ring-4 ring-candy-400' : ''
            }`}
            role="group"
            aria-label={`Chiqindi: ${current.label}`}
          >
            <span className="text-5xl" aria-hidden="true">{current.emoji}</span>
            {current.label}
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {bins.map((bin) => (
            <button key={bin.key} onClick={() => resolveChoice(bin.key)} disabled={locked} className="rounded-2xl bg-slate-600 px-4 py-2 text-sm font-bold text-white shadow-chunky-sm transition hover:bg-slate-700 active:translate-y-1 active:shadow-none disabled:opacity-50">
              {bin.emoji} {bin.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
