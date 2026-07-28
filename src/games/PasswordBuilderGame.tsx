import { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, RotateCcw } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { useGameEngine } from '../hooks/useGameEngine';
import { useSound } from '../hooks/useSound';
import GameHUD from '../components/GameHUD';
import GameIntroScreen from '../components/GameIntroScreen';
import GameResultScreen from '../components/GameResultScreen';
import ProgressBar from '../components/ProgressBar';
import type { GameDefinition } from '../types';

const LETTERS = 'AbCdEfGhIjKlMnOpQrStUvWxYz';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%*?&';
const MAX_LEN = 12;
const MIN_LEN = 4;

function randomChar(pool: string) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function computeStrength(pwd: string) {
  const hasLetter = /[a-zA-Z]/.test(pwd);
  const hasDigit = /[0-9]/.test(pwd);
  const hasSymbol = /[!@#$%*?&]/.test(pwd);
  const varietyCount = [hasLetter, hasDigit, hasSymbol].filter(Boolean).length;
  const percent = Math.min(100, (pwd.length / MAX_LEN) * 60 + varietyCount * 13.3);
  return { hasLetter, hasDigit, hasSymbol, varietyCount, percent };
}

export default function PasswordBuilderGame({ config }: { config: GameDefinition }) {
  const engine = useGameEngine({ duration: 45 });
  const { playCorrect, playClick } = useSound();
  const [password, setPassword] = useState('');

  const strength = computeStrength(password);
  const strengthColor = strength.percent >= 80 ? 'bg-leafy-500' : strength.percent >= 45 ? 'bg-sunny-500' : 'bg-candy-500';

  function addChar(pool: string) {
    if (!engine.running || password.length >= MAX_LEN) return;
    setPassword((p) => p + randomChar(pool));
    playClick();
  }

  function handleSubmit() {
    if (!engine.running || password.length < MIN_LEN) return;
    const s = computeStrength(password);
    const points = Math.round(s.percent / 2) + (s.varietyCount === 3 ? 15 : 0);
    engine.addScore(points);
    playCorrect();
    setPassword('');
  }

  if (!engine.running && !engine.finished) {
    return <GameIntroScreen title={config.title} description={config.description} instructions={config.instructions} onStart={() => { setPassword(''); engine.start(); }} gameId={config.id} />;
  }
  if (engine.finished) {
    return <GameResultScreen score={engine.score} thresholds={config.badgeThreshold} onRestart={() => { setPassword(''); engine.restart(); }} title={config.title} topic={currentTopic.key} gameId={config.id} />;
  }

  return (
    <div>
      <GameHUD timeLeft={engine.timeLeft} score={engine.score} />
      <div className="flex flex-col items-center gap-6 rounded-3xl bg-white/90 p-8 shadow-chunky-sm dark:bg-slate-800/90">
        <div className="flex min-h-[3.5rem] w-full max-w-md items-center justify-center gap-1 rounded-2xl bg-slate-900 px-4 font-mono text-2xl tracking-widest text-leafy-300">
          {password || <span className="text-slate-500">parolingizni yasang</span>}
        </div>

        <div className="w-full max-w-md">
          <ProgressBar percent={strength.percent} colorClass={strengthColor} label="Parol kuchi" />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => addChar(LETTERS)} className="rounded-2xl bg-bubble-500 px-5 py-3 font-bold text-white shadow-chunky-sm transition hover:bg-bubble-600 active:translate-y-1 active:shadow-none">
            🔤 Harf qo'sh
          </button>
          <button onClick={() => addChar(DIGITS)} className="rounded-2xl bg-sunny-500 px-5 py-3 font-bold text-white shadow-chunky-sm transition hover:bg-sunny-600 active:translate-y-1 active:shadow-none">
            🔢 Raqam qo'sh
          </button>
          <button onClick={() => addChar(SYMBOLS)} className="rounded-2xl bg-grape-500 px-5 py-3 font-bold text-white shadow-chunky-sm transition hover:bg-grape-600 active:translate-y-1 active:shadow-none">
            ✨ Belgi qo'sh
          </button>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={password.length < MIN_LEN}
            className="flex items-center gap-2 rounded-2xl bg-leafy-500 px-6 py-3 font-extrabold text-white shadow-chunky-sm transition hover:bg-leafy-600 active:translate-y-1 active:shadow-none disabled:opacity-40"
          >
            <KeyRound size={20} /> Parolni yakunlash
          </motion.button>
          <button onClick={() => setPassword('')} className="flex items-center gap-2 rounded-2xl bg-slate-200 px-4 py-3 font-bold text-slate-600 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-white">
            <RotateCcw size={18} />
          </button>
        </div>
        <p className="text-xs text-slate-400">Kamida {MIN_LEN} ta belgi kerak. Harf + raqam + belgi = eng yuqori ball!</p>
      </div>
    </div>
  );
}
