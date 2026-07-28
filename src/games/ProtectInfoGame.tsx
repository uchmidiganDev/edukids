import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { useGameEngine } from '../hooks/useGameEngine';
import { useSound } from '../hooks/useSound';
import GameHUD from '../components/GameHUD';
import GameIntroScreen from '../components/GameIntroScreen';
import GameResultScreen from '../components/GameResultScreen';
import type { GameDefinition } from '../types';

const infos = [
  { id: 1, text: 'Uy manzilim', isPrivate: true },
  { id: 2, text: 'Sevimli rangim', isPrivate: false },
  { id: 3, text: 'Telefon raqamim', isPrivate: true },
  { id: 4, text: 'Sevimli multfilmim', isPrivate: false },
  { id: 5, text: 'Internet parolim', isPrivate: true },
  { id: 6, text: 'Sevimli sportim', isPrivate: false },
  { id: 7, text: "Maktabim nomi va manzili", isPrivate: true },
  { id: 8, text: 'Sevimli o\'yinchog\'im', isPrivate: false },
  { id: 9, text: "Ota-onamning bank karta raqami", isPrivate: true },
  { id: 10, text: 'Sevimli taomim', isPrivate: false },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ProtectInfoGame({ config }: { config: GameDefinition }) {
  const engine = useGameEngine({ duration: 50 });
  const { playCorrect, playWrong } = useSound();
  const [queue, setQueue] = useState(() => shuffle(infos));
  const [cursor, setCursor] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [locked, setLocked] = useState(false);
  const privateRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  const current = queue[cursor];

  function resetRound() {
    setQueue(shuffle(infos));
    setCursor(0);
    setFeedback(null);
    setLocked(false);
  }

  const resolveChoice = useCallback((chosenPrivate: boolean) => {
    if (!current || locked) return;
    setLocked(true);
    const correct = chosenPrivate === current.isPrivate;
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
    const inZone = (ref: React.RefObject<HTMLDivElement>) => {
      if (!ref.current) return false;
      const r = ref.current.getBoundingClientRect();
      return point.x >= r.left && point.x <= r.right && point.y >= r.top && point.y <= r.bottom;
    };
    if (inZone(privateRef)) resolveChoice(true);
    else if (inZone(shareRef)) resolveChoice(false);
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
        Ma'lumotni sudrab yoki tugmani bosib joylashtir! ({Math.min(cursor + 1, queue.length)}/{queue.length})
      </p>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <div ref={privateRef} className="flex h-28 flex-col items-center justify-center gap-1 rounded-3xl border-4 border-dashed border-candy-400 bg-candy-50 font-extrabold text-candy-600 dark:bg-slate-800 dark:text-candy-300">
          <Lock size={26} aria-hidden="true" /> 🔒 Maxfiy
        </div>
        <div ref={shareRef} className="flex h-28 flex-col items-center justify-center gap-1 rounded-3xl border-4 border-dashed border-leafy-400 bg-leafy-50 font-extrabold text-leafy-600 dark:bg-slate-800 dark:text-leafy-300">
          <Unlock size={26} aria-hidden="true" /> 🌍 Bo'lishish mumkin
        </div>
      </div>

      <div className="flex flex-col items-center gap-5">
        {current && (
          <motion.div
            key={current.id}
            drag
            dragSnapToOrigin
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.08, zIndex: 20 }}
            className={`max-w-sm cursor-grab select-none rounded-3xl bg-white p-6 text-center font-semibold shadow-chunky-sm active:cursor-grabbing dark:bg-slate-700 dark:text-white ${
              feedback === 'correct' ? 'ring-4 ring-leafy-400' : feedback === 'wrong' ? 'ring-4 ring-candy-400' : ''
            }`}
            role="group"
            aria-label={current.text}
          >
            🧾 {current.text}
          </motion.div>
        )}

        <div className="flex gap-4">
          <button onClick={() => resolveChoice(true)} disabled={locked} className="rounded-2xl bg-candy-500 px-5 py-3 font-bold text-white shadow-chunky-sm transition hover:bg-candy-600 active:translate-y-1 active:shadow-none disabled:opacity-50">
            🔒 Maxfiy
          </button>
          <button onClick={() => resolveChoice(false)} disabled={locked} className="rounded-2xl bg-leafy-500 px-5 py-3 font-bold text-white shadow-chunky-sm transition hover:bg-leafy-600 active:translate-y-1 active:shadow-none disabled:opacity-50">
            🌍 Bo'lishish mumkin
          </button>
        </div>
      </div>
    </div>
  );
}
