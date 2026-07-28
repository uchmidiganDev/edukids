import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { currentTopic } from '../data/topics';
import { useGameEngine } from '../hooks/useGameEngine';
import { useSound } from '../hooks/useSound';
import GameHUD from '../components/GameHUD';
import GameIntroScreen from '../components/GameIntroScreen';
import GameResultScreen from '../components/GameResultScreen';
import type { GameDefinition } from '../types';

const PAIRS = [
  { id: 1, sign: '🛑', meaning: "To'xtash belgisi" },
  { id: 2, sign: '🚸', meaning: "Bolalar o'tish joyi" },
  { id: 3, sign: '🚴', meaning: 'Velosipedchilar yo\'li' },
  { id: 4, sign: '🚷', meaning: 'Piyodalarga taqiq' },
  { id: 5, sign: '⚠️', meaning: 'Xavf haqida ogohlantirish' },
  { id: 6, sign: '🅿️', meaning: "To'xtash joyi" },
];

interface CardT {
  key: string;
  pairId: number;
  display: string;
}

function buildDeck(): CardT[] {
  const cards: CardT[] = [];
  PAIRS.forEach((p) => {
    cards.push({ key: `sign-${p.id}`, pairId: p.id, display: p.sign });
    cards.push({ key: `meaning-${p.id}`, pairId: p.id, display: p.meaning });
  });
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export default function SignMatchGame({ config }: { config: GameDefinition }) {
  const engine = useGameEngine({ duration: 60 });
  const { playCorrect, playWrong } = useSound();
  const [deck, setDeck] = useState<CardT[]>(() => buildDeck());
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrongPair, setWrongPair] = useState<string[]>([]);

  useEffect(() => {
    if (engine.running) {
      setDeck(buildDeck());
      setFlipped([]);
      setMatched([]);
    }
  }, [engine.running]);

  useEffect(() => {
    if (matched.length === PAIRS.length && engine.running) {
      engine.addScore(20);
      engine.finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched]);

  function handleFlip(card: CardT) {
    if (!engine.running || flipped.length === 2 || flipped.includes(card.key) || matched.includes(card.pairId)) return;
    const next = [...flipped, card.key];
    setFlipped(next);
    if (next.length === 2) {
      const [firstKey, secondKey] = next;
      const first = deck.find((c) => c.key === firstKey)!;
      const second = deck.find((c) => c.key === secondKey)!;
      if (first.pairId === second.pairId) {
        engine.registerCorrect(10);
        playCorrect();
        setTimeout(() => {
          setMatched((m) => [...m, first.pairId]);
          setFlipped([]);
        }, 500);
      } else {
        engine.registerWrong(0);
        playWrong();
        setWrongPair(next);
        setTimeout(() => { setFlipped([]); setWrongPair([]); }, 700);
      }
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
      <GameHUD timeLeft={engine.timeLeft} score={engine.score} />
      <p className="mb-4 text-center font-bold text-slate-600 dark:text-slate-200">
        Belgi va uning ma'nosini juftlashtiring! ({matched.length}/{PAIRS.length})
      </p>
      <div className="grid grid-cols-3 gap-3 rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200 p-5 dark:from-slate-700 dark:to-slate-800 sm:grid-cols-4">
        {deck.map((card) => {
          const isFlipped = flipped.includes(card.key) || matched.includes(card.pairId);
          const isWrong = wrongPair.includes(card.key);
          return (
            <motion.button
              key={card.key}
              onClick={() => handleFlip(card)}
              whileHover={{ scale: isFlipped ? 1 : 1.05 }}
              className={`flex aspect-square items-center justify-center rounded-2xl p-2 text-center shadow-sm transition ${
                matched.includes(card.pairId) ? 'bg-leafy-200 dark:bg-leafy-800' : isWrong ? 'bg-candy-200 dark:bg-candy-800' : isFlipped ? 'bg-white dark:bg-slate-600' : 'bg-bubble-400 text-white'
              }`}
            >
              {isFlipped ? (
                <span className={card.display.length > 3 ? 'text-xs font-bold text-slate-700 dark:text-white' : 'text-3xl'}>
                  {card.display}
                </span>
              ) : (
                <span className="text-2xl">❓</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
