import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { currentTopic } from '../data/topics';
import { useGameEngine } from '../hooks/useGameEngine';
import { useSound } from '../hooks/useSound';
import GameHUD from '../components/GameHUD';
import GameIntroScreen from '../components/GameIntroScreen';
import GameResultScreen from '../components/GameResultScreen';
import type { GameDefinition } from '../types';

const pool = [
  { emoji: '🔥', label: 'Ochiq olov', dangerous: true },
  { emoji: '🕯️', label: 'Yonayotgan sham', dangerous: true },
  { emoji: '🧨', label: 'Petarda', dangerous: true },
  { emoji: '🍲', label: "Qaynayotgan qozon", dangerous: true },
  { emoji: '⚡', label: 'Uzilgan elektr simi', dangerous: true },
  { emoji: '🛢️', label: 'Yonuvchi suyuqlik', dangerous: true },
  { emoji: '🧸', label: 'Ayiqcha', dangerous: false },
  { emoji: '📚', label: 'Kitoblar', dangerous: false },
  { emoji: '⚽', label: "To'p", dangerous: false },
  { emoji: '🍎', label: 'Olma', dangerous: false },
  { emoji: '🧃', label: 'Sharbat', dangerous: false },
  { emoji: '🚗', label: "O'yinchoq mashina", dangerous: false },
  { emoji: '💧', label: 'Suv', dangerous: false },
  { emoji: '🎈', label: 'Shar', dangerous: false },
];

interface Item { emoji: string; label: string; dangerous: boolean; key: string; }

function randomItem(): Item {
  const base = pool[Math.floor(Math.random() * pool.length)];
  return { ...base, key: Math.random().toString(36).slice(2) };
}

function makeGrid(): Item[] {
  return Array.from({ length: 9 }, randomItem);
}

export default function FindDangerGame({ config }: { config: GameDefinition }) {
  const engine = useGameEngine({ duration: 40 });
  const { playCorrect, playWrong } = useSound();
  const [grid, setGrid] = useState<Item[]>(() => makeGrid());
  const [flash, setFlash] = useState<Record<string, 'good' | 'bad'>>({});

  useEffect(() => {
    if (engine.running) setGrid(makeGrid());
  }, [engine.running]);

  const handleClick = useCallback((slotIndex: number) => {
    if (!engine.running) return;
    const item = grid[slotIndex];
    const correct = item.dangerous;
    if (correct) { engine.registerCorrect(10); playCorrect(); } else { engine.registerWrong(5); playWrong(); }
    setFlash((f) => ({ ...f, [item.key]: correct ? 'good' : 'bad' }));
    setTimeout(() => {
      setGrid((g) => g.map((it, i) => (i === slotIndex ? randomItem() : it)));
    }, 200);
  }, [engine, grid, playCorrect, playWrong]);

  if (!engine.running && !engine.finished) {
    return <GameIntroScreen title={config.title} description={config.description} instructions={config.instructions} onStart={engine.start} gameId={config.id} />;
  }
  if (engine.finished) {
    return <GameResultScreen score={engine.score} thresholds={config.badgeThreshold} onRestart={engine.restart} title={config.title} topic={currentTopic.key} gameId={config.id} />;
  }

  return (
    <div>
      <GameHUD timeLeft={engine.timeLeft} score={engine.score} combo={engine.combo} />
      <p className="mb-4 text-center font-bold text-slate-600 dark:text-slate-200">🔥 Faqat XAVFLI buyumlarni bosing!</p>
      <div className="grid grid-cols-3 gap-3 rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200 p-5 shadow-chunky-sm dark:from-slate-700 dark:to-slate-800 sm:gap-4 sm:p-8">
        <AnimatePresence>
          {grid.map((item, i) => (
            <motion.button
              key={item.key}
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: flash[item.key] === 'good' ? 1.15 : flash[item.key] === 'bad' ? 0.85 : 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleClick(i)}
              className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl bg-white text-4xl shadow-sm transition-colors dark:bg-slate-600 sm:text-6xl ${
                flash[item.key] === 'good' ? 'ring-4 ring-leafy-400' : flash[item.key] === 'bad' ? 'ring-4 ring-candy-400' : ''
              }`}
              aria-label={item.label}
              title={item.label}
            >
              {item.emoji}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
