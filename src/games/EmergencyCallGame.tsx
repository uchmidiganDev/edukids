import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { useGameEngine } from '../hooks/useGameEngine';
import { useSound } from '../hooks/useSound';
import GameHUD from '../components/GameHUD';
import GameIntroScreen from '../components/GameIntroScreen';
import GameResultScreen from '../components/GameResultScreen';
import type { GameDefinition } from '../types';

const TARGET = '101';
const SCENARIOS = [
  "Oshxonada tutun ko'rindi! Qaysi raqamga qo'ng'iroq qilasan?",
  "Qo'shni uyda olov chiqdi! Qaysi raqamni terasan?",
  "Kimdir gugurtni yoqib, pardaga yaqinlashtirdi! Qaysi raqam kerak?",
];

export default function EmergencyCallGame({ config }: { config: GameDefinition }) {
  const engine = useGameEngine({ duration: 40 });
  const { playCorrect, playWrong, playVictory } = useSound();
  const [dialed, setDialed] = useState('');
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [success, setSuccess] = useState(false);

  function nextScenario() {
    setScenario(SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]);
  }

  function handleDigit(d: string) {
    if (!engine.running) return;
    const attempt = dialed + d;
    if (TARGET.startsWith(attempt)) {
      setDialed(attempt);
      if (attempt === TARGET) {
        engine.registerCorrect(15);
        playVictory();
        setSuccess(true);
        setTimeout(() => { setDialed(''); setSuccess(false); nextScenario(); }, 900);
      } else {
        playCorrect();
      }
    } else {
      engine.registerWrong(5);
      playWrong();
      setDialed('');
    }
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
      <div className="flex flex-col items-center gap-5 rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200 p-6 shadow-chunky-sm dark:from-slate-700 dark:to-slate-800">
        <p className="max-w-sm text-center font-bold text-slate-600 dark:text-slate-200">📢 {scenario}</p>
        <motion.div
          animate={success ? { scale: [1, 1.2, 1] } : {}}
          className="flex h-16 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 text-3xl font-extrabold tracking-[0.3em] text-leafy-400"
        >
          <PhoneCall size={26} className="text-leafy-400" />
          {dialed.padEnd(3, '_')}
        </motion.div>
        <div className="grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', ''].map((d, i) => (
            d ? (
              <button
                key={i}
                onClick={() => handleDigit(d)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-extrabold text-slate-700 shadow-chunky-sm transition hover:bg-slate-50 active:translate-y-1 active:shadow-none dark:bg-slate-600 dark:text-white"
              >
                {d}
              </button>
            ) : <div key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
