import { useCallback, useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { useGameEngine } from '../hooks/useGameEngine';
import { useSound } from '../hooks/useSound';
import GameHUD from '../components/GameHUD';
import GameIntroScreen from '../components/GameIntroScreen';
import GameResultScreen from '../components/GameResultScreen';
import type { GameDefinition } from '../types';

const GRID: string[][] = [
  ['S', '.', '.', 'F', '.'],
  ['.', 'F', '.', '.', '.'],
  ['.', 'F', '.', 'F', '.'],
  ['.', '.', '.', 'F', '.'],
  ['F', '.', '.', '.', 'E'],
];

const START = { row: 0, col: 0 };

export default function EscapeMazeGame({ config }: { config: GameDefinition }) {
  const engine = useGameEngine({ duration: 45 });
  const { playCorrect, playWrong } = useSound();
  const [pos, setPos] = useState(START);
  const [bump, setBump] = useState<string | null>(null);

  useEffect(() => {
    if (engine.running) setPos(START);
  }, [engine.running]);

  const move = useCallback((dr: number, dc: number) => {
    if (!engine.running) return;
    const nextRow = pos.row + dr;
    const nextCol = pos.col + dc;
    if (nextRow < 0 || nextRow >= GRID.length || nextCol < 0 || nextCol >= GRID[0].length) return;
    const cell = GRID[nextRow][nextCol];
    if (cell === 'F') {
      engine.registerWrong(5);
      playWrong();
      setBump('bad');
      setTimeout(() => setBump(null), 300);
      return;
    }
    setPos({ row: nextRow, col: nextCol });
    if (cell === 'E') {
      engine.addScore(50);
      playCorrect();
      engine.finish();
    } else {
      engine.registerCorrect(5);
    }
  }, [engine, pos, playCorrect, playWrong]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowUp') move(-1, 0);
      else if (e.key === 'ArrowDown') move(1, 0);
      else if (e.key === 'ArrowLeft') move(0, -1);
      else if (e.key === 'ArrowRight') move(0, 1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move]);

  if (!engine.running && !engine.finished) {
    return <GameIntroScreen title={config.title} description={config.description} instructions={config.instructions} onStart={engine.start} gameId={config.id} />;
  }
  if (engine.finished) {
    return <GameResultScreen score={engine.score} thresholds={config.badgeThreshold} onRestart={engine.restart} title={config.title} topic={currentTopic.key} gameId={config.id} />;
  }

  return (
    <div>
      <GameHUD timeLeft={engine.timeLeft} score={engine.score} />
      <p className="mb-4 text-center font-bold text-slate-600 dark:text-slate-200">
        🧯 O'q tugmalar (yoki klaviaturadagi o'qlar) bilan olovdan qochib, 🚪 chiqishga yet!
      </p>
      <div className={`mx-auto grid w-fit grid-cols-5 gap-1 rounded-3xl bg-slate-700 p-3 transition ${bump === 'bad' ? 'ring-4 ring-candy-400' : ''}`}>
        {GRID.map((row, r) => row.map((cell, c) => {
          const isPlayer = pos.row === r && pos.col === c;
          return (
            <div
              key={`${r}-${c}`}
              className={`flex h-12 w-12 items-center justify-center rounded-lg text-2xl sm:h-14 sm:w-14 ${
                cell === 'F' ? 'bg-orange-500/80' : cell === 'E' ? 'bg-leafy-400' : 'bg-slate-500'
              }`}
            >
              {isPlayer ? '🧑' : cell === 'F' ? '🔥' : cell === 'E' ? '🚪' : ''}
            </div>
          );
        }))}
      </div>

      <div className="mx-auto mt-6 grid w-40 grid-cols-3 gap-2">
        <div />
        <button onClick={() => move(-1, 0)} className="flex items-center justify-center rounded-xl bg-bubble-400 p-3 text-white shadow-chunky-sm" aria-label="Yuqoriga"><ArrowUp /></button>
        <div />
        <button onClick={() => move(0, -1)} className="flex items-center justify-center rounded-xl bg-bubble-400 p-3 text-white shadow-chunky-sm" aria-label="Chapga"><ArrowLeft /></button>
        <button onClick={() => move(1, 0)} className="flex items-center justify-center rounded-xl bg-bubble-400 p-3 text-white shadow-chunky-sm" aria-label="Pastga"><ArrowDown /></button>
        <button onClick={() => move(0, 1)} className="flex items-center justify-center rounded-xl bg-bubble-400 p-3 text-white shadow-chunky-sm" aria-label="O'ngga"><ArrowRight /></button>
      </div>
    </div>
  );
}
