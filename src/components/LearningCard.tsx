import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useSound } from '../hooks/useSound';
import type { LearningCard as LearningCardType } from '../types';

const typeStyles = {
  lesson: { bg: 'bg-white dark:bg-slate-800', ring: 'ring-bubble-200 dark:ring-bubble-700', label: 'Dars', labelBg: 'bg-bubble-400' },
  fact: { bg: 'bg-grape-50 dark:bg-slate-800', ring: 'ring-grape-200 dark:ring-grape-700', label: "Bilasizmi?", labelBg: 'bg-grape-500' },
  tip: { bg: 'bg-leafy-50 dark:bg-slate-800', ring: 'ring-leafy-200 dark:ring-leafy-700', label: 'Xavfsizlik maslahati', labelBg: 'bg-leafy-500' },
  summary: { bg: 'bg-sunny-50 dark:bg-slate-800', ring: 'ring-sunny-300 dark:ring-sunny-700', label: 'Qisqacha xulosa (Esda tut!)', labelBg: 'bg-sunny-500' },
} as const;

interface LearningCardProps {
  card: LearningCardType;
  index?: number;
}

// Bitta o'quv kartochkasi: emoji, sarlavha, matn, misol, mini-viktorina va ovozli o'qish
export default function LearningCard({ card, index = 0 }: LearningCardProps) {
  const style = typeStyles[card.type] || typeStyles.lesson;
  const { recordCardRead } = useApp();
  const { speak, speaking, supported } = useSpeechSynthesis();
  const { playCorrect, playWrong } = useSound();
  const [selected, setSelected] = useState<number | null>(null);

  function handleNarrate() {
    speak(`${card.title}. ${card.text}`);
  }

  function handleMiniQuiz(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    recordCardRead(card.id);
    if (optionIndex === card.miniQuiz.correctIndex) playCorrect();
    else playWrong();
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6 }}
      className={`relative flex flex-col gap-3 rounded-3xl p-6 shadow-chunky-sm ring-2 ${style.bg} ${style.ring}`}
    >
      <span className={`absolute -top-3 left-5 rounded-full px-3 py-1 text-xs font-bold text-white shadow ${style.labelBg}`}>
        {style.label}
      </span>
      <div className="mt-3 flex items-start justify-between">
        <div className="text-5xl" aria-hidden="true">{card.emoji}</div>
        {supported && (
          <button
            onClick={handleNarrate}
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-bubble-100 text-bubble-600 transition hover:bg-bubble-200 dark:bg-slate-700 dark:text-bubble-300 ${speaking ? 'animate-pulse' : ''}`}
            aria-label="Ovozli o'qish"
            title="Ovozli o'qish"
          >
            <Volume2 size={18} />
          </button>
        )}
      </div>
      <h3 className="text-xl font-extrabold text-slate-700 dark:text-white">{card.title}</h3>
      <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">{card.text}</p>

      <div className="flex items-start gap-2 rounded-2xl bg-black/5 p-3 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
        <Quote size={16} className="mt-0.5 shrink-0 text-slate-400" />
        <span className="italic">{card.example}</span>
      </div>

      <div className="mt-1 rounded-2xl border-2 border-dashed border-slate-200 p-3 dark:border-slate-600">
        <p className="mb-2 text-sm font-bold text-slate-500 dark:text-slate-300">🧩 Mini-viktorina: {card.miniQuiz.question}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {card.miniQuiz.options.map((opt, i) => {
            const isCorrect = i === card.miniQuiz.correctIndex;
            let cls = 'bg-white hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600';
            if (selected !== null && isCorrect) cls = 'bg-leafy-100 ring-2 ring-leafy-500 dark:bg-leafy-900';
            else if (selected === i && !isCorrect) cls = 'bg-candy-100 ring-2 ring-candy-500 dark:bg-candy-900';
            return (
              <button
                key={i}
                onClick={() => handleMiniQuiz(i)}
                disabled={selected !== null}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-700 shadow-sm transition disabled:cursor-default dark:text-white ${cls}`}
              >
                {opt}
                {selected !== null && isCorrect && <CheckCircle2 size={16} className="text-leafy-600" />}
                {selected === i && !isCorrect && <XCircle size={16} className="text-candy-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
