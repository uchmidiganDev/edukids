import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { useApp } from '../context/AppContext';
import GameRouter from '../games/GameRouter';
import Mascot from '../components/Mascot';
import ParticleBackground from '../components/ParticleBackground';

export default function Game() {
  const { markVisited, state } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    markVisited('game');
  }, [markVisited]);

  const selectedGame = currentTopic.games.find((g) => g.id === selectedId);

  return (
    <div className="relative px-4 py-10">
      <ParticleBackground count={10} className="opacity-30" />
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Mascot size={90} />
          <span className="rounded-full bg-leafy-100 px-4 py-1 text-sm font-bold text-leafy-600 dark:bg-leafy-900 dark:text-leafy-200">
            🎮 O'yin bo'limi
          </span>
          <h1 className="text-3xl font-extrabold text-slate-700 dark:text-white">
            {currentTopic.emoji} {currentTopic.title}
          </h1>
        </div>

        {selectedGame ? (
          <div>
            <button
              onClick={() => setSelectedId(null)}
              className="mb-4 flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 dark:bg-slate-700 dark:text-white"
            >
              <ArrowLeft size={16} /> O'yinlar ro'yxatiga qaytish
            </button>
            <GameRouter config={selectedGame} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {currentTopic.games.map((g, i) => {
              const best = state.bestGameScores[g.id];
              return (
                <motion.button
                  key={g.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedId(g.id)}
                  className="flex flex-col items-center gap-3 rounded-3xl bg-white p-6 text-center shadow-chunky-sm dark:bg-slate-800"
                >
                  <span className="text-5xl" aria-hidden="true">{g.emoji}</span>
                  <h3 className="font-extrabold text-slate-700 dark:text-white">{g.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-300">{g.description}</p>
                  {typeof best === 'number' && (
                    <span className="rounded-full bg-sunny-100 px-3 py-1 text-xs font-bold text-sunny-700 dark:bg-sunny-900 dark:text-sunny-200">
                      🏆 Eng yaxshi: {best}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
