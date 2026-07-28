import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { useGameEngine } from '../hooks/useGameEngine';
import { useSound } from '../hooks/useSound';
import GameHUD from '../components/GameHUD';
import GameIntroScreen from '../components/GameIntroScreen';
import GameResultScreen from '../components/GameResultScreen';
import type { GameDefinition } from '../types';

const messages = [
  { id: 1, text: "Onam: Bugun kechqurun uyga vaqtida kel.", isFake: false },
  { id: 2, text: "Tabriklaymiz! Siz telefon yutib oldingiz! Ma'lumotlaringizni kiriting.", isFake: true },
  { id: 3, text: "Do'stim: Ertaga maktabda ko'rishamiz!", isFake: false },
  { id: 4, text: "Noma'lum raqam: Menga parolingni yubor, senga sovg'a beraman!", isFake: true },
  { id: 5, text: "Maktab: Ertangi dars soat 9:00 da boshlanadi.", isFake: false },
  { id: 6, text: "Link: bepul-sovga-yutish.com saytiga kirib, karta raqamingizni kiriting!", isFake: true },
  { id: 7, text: "Bobom: Seni sog'indim, tez orada kelamiz.", isFake: false },
  { id: 8, text: "Notanish odam: Uyingiz manzilini yozib yuboring, sizga sovg'a olib kelaman.", isFake: true },
  { id: 9, text: "O'qituvchi: Uy vazifasini bajarishni unutmang.", isFake: false },
  { id: 10, text: "SMS: Hisobingiz bloklandi! Darhol shu havolaga bosib, kodni kiriting: 1234", isFake: true },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ScamFinderGame({ config }: { config: GameDefinition }) {
  const engine = useGameEngine({ duration: 60 });
  const { playCorrect, playWrong } = useSound();
  const [queue, setQueue] = useState(() => shuffle(messages));
  const [cursor, setCursor] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [locked, setLocked] = useState(false);
  const safeRef = useRef<HTMLDivElement>(null);
  const fakeRef = useRef<HTMLDivElement>(null);

  const current = queue[cursor];

  function resetRound() {
    setQueue(shuffle(messages));
    setCursor(0);
    setFeedback(null);
    setLocked(false);
  }

  const resolveChoice = useCallback((chosenFake: boolean) => {
    if (!current || locked) return;
    setLocked(true);
    const correct = chosenFake === current.isFake;
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
    if (inZone(safeRef)) resolveChoice(false);
    else if (inZone(fakeRef)) resolveChoice(true);
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
        Xabarni sudrab yoki tugmani bosib kerakli qutiga joylashtir! ({Math.min(cursor + 1, queue.length)}/{queue.length})
      </p>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <div ref={safeRef} className="flex h-28 flex-col items-center justify-center gap-1 rounded-3xl border-4 border-dashed border-leafy-400 bg-leafy-50 font-extrabold text-leafy-600 dark:bg-slate-800 dark:text-leafy-300">
          <ShieldCheck size={28} aria-hidden="true" /> ✅ Xavfsiz
        </div>
        <div ref={fakeRef} className="flex h-28 flex-col items-center justify-center gap-1 rounded-3xl border-4 border-dashed border-candy-400 bg-candy-50 font-extrabold text-candy-600 dark:bg-slate-800 dark:text-candy-300">
          <ShieldAlert size={28} aria-hidden="true" /> 🚫 Firibgar
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
            aria-label={`Xabar: ${current.text}`}
          >
            💬 {current.text}
          </motion.div>
        )}

        <div className="flex gap-4">
          <button onClick={() => resolveChoice(false)} disabled={locked} className="rounded-2xl bg-leafy-500 px-5 py-3 font-bold text-white shadow-chunky-sm transition hover:bg-leafy-600 active:translate-y-1 active:shadow-none disabled:opacity-50">
            ✅ Xavfsiz
          </button>
          <button onClick={() => resolveChoice(true)} disabled={locked} className="rounded-2xl bg-candy-500 px-5 py-3 font-bold text-white shadow-chunky-sm transition hover:bg-candy-600 active:translate-y-1 active:shadow-none disabled:opacity-50">
            🚫 Firibgar
          </button>
        </div>
      </div>
    </div>
  );
}
