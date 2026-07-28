import { useEffect, useRef, useState } from 'react';
import { currentTopic } from '../data/topics';
import { useGameEngine } from '../hooks/useGameEngine';
import { useSound } from '../hooks/useSound';
import GameHUD from '../components/GameHUD';
import GameIntroScreen from '../components/GameIntroScreen';
import GameResultScreen from '../components/GameResultScreen';
import type { GameDefinition } from '../types';

const CYCLE_MS = 2600;
const DANGER_START = 900;
const DANGER_END = 1900;

export default function CrossRoadGame({ config }: { config: GameDefinition }) {
  const engine = useGameEngine({ duration: 40 });
  const { playCorrect, playWrong } = useSound();
  const [cyclePos, setCyclePos] = useState(0);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!engine.running) return undefined;
    let raf: number;
    function tick(now: number) {
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) % CYCLE_MS;
      setCyclePos(elapsed);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [engine.running]);

  const dangerNow = cyclePos >= DANGER_START && cyclePos <= DANGER_END;
  const carLeftPercent = (cyclePos / CYCLE_MS) * 130 - 15;

  function handleCross() {
    if (!engine.running || locked) return;
    setLocked(true);
    if (!dangerNow) { engine.registerCorrect(10); playCorrect(); setFeedback('correct'); }
    else { engine.registerWrong(5); playWrong(); setFeedback('wrong'); }
    setTimeout(() => { setLocked(false); setFeedback(null); }, 500);
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
      <div className={`flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-b from-slate-200 to-slate-300 p-8 shadow-chunky-sm dark:from-slate-700 dark:to-slate-800 ${feedback === 'correct' ? 'ring-4 ring-leafy-400' : feedback === 'wrong' ? 'ring-4 ring-candy-400' : ''}`}>
        <p className="font-bold text-slate-600 dark:text-slate-200">
          {dangerNow ? '🚗 Mashina yaqin — KUT!' : "✅ Yo'l bo'sh — hozir O'TISH mumkin!"}
        </p>
        <div className="relative h-24 w-full max-w-lg overflow-hidden rounded-2xl bg-slate-600">
          <div className="absolute inset-y-0 left-0 flex w-full items-center justify-around opacity-40" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => <span key={i} className="h-2 w-10 bg-white" />)}
          </div>
          <div
            className="absolute top-1/2 -translate-y-1/2 text-5xl transition-none"
            style={{ left: `${carLeftPercent}%` }}
            aria-hidden="true"
          >
            🚗
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-4xl" aria-hidden="true">🏁</div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-4xl" aria-hidden="true">🧍</div>
        </div>
        <button
          onClick={handleCross}
          disabled={locked}
          className="rounded-3xl bg-leafy-500 px-10 py-5 text-2xl font-extrabold text-white shadow-chunky transition hover:bg-leafy-600 active:translate-y-1 active:shadow-none disabled:opacity-50"
        >
          O'T!
        </button>
      </div>
    </div>
  );
}
