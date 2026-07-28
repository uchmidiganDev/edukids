import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Gamepad2, Timer as TimerIcon, Share2 } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { getStarsForPercent, getStarMessage } from '../utils/scoreUtils';
import { getRandomWrongIntro, getRandomEncouragement } from '../data/quotes';
import { useApp } from '../context/AppContext';
import { useSound } from '../hooks/useSound';
import BigButton from '../components/BigButton';
import ProgressBar from '../components/ProgressBar';
import StarRating from '../components/StarRating';
import ConfettiEffect from '../components/ConfettiEffect';
import Mascot from '../components/Mascot';
import LivesDisplay from '../components/LivesDisplay';
import ComboBadge from '../components/ComboBadge';

const QUESTION_TIME = 20;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz() {
  const { markVisited, submitQuizResult, pushToast } = useApp();
  const { playCorrect, playWrong, playVictory } = useSound();

  const [order, setOrder] = useState(() => shuffle(currentTopic.quiz));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [finished, setFinished] = useState(false);
  const [aiText, setAiText] = useState('');
  const submittedRef = useRef(false);

  useEffect(() => {
    markVisited('quiz');
  }, [markVisited]);

  const question = order[index];
  const isLastQuestion = index === order.length - 1;
  const outOfLives = lives <= 0;
  const percent = useMemo(() => Math.round((correctCount / order.length) * 100), [correctCount, order.length]);
  const stars = getStarsForPercent(percent);
  const xpEarned = Math.round(score / 2);
  const coinsEarned = Math.round(score / 3);

  useEffect(() => {
    if (finished || answered) return undefined;
    if (timeLeft <= 0) {
      handleTimeout();
      return undefined;
    }
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, answered, finished]);

  useEffect(() => {
    if (!finished || submittedRef.current) return;
    submittedRef.current = true;
    submitQuizResult(currentTopic.key, percent, stars, xpEarned, coinsEarned);
    playVictory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function handleTimeout() {
    setAnswered(true);
    setSelected(null);
    setCombo(0);
    setLives((l) => Math.max(0, l - 1));
    setAiText(`${getRandomWrongIntro()} ${question.explanation}`);
    playWrong();
  }

  function handleSelect(optionIndex: number) {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === question.correctIndex) {
      setCorrectCount((c) => c + 1);
      setCombo((c) => {
        const next = c + 1;
        const bonus = next >= 3 ? 5 : 0;
        setScore((s) => s + 10 + bonus);
        return next;
      });
      setAiText(getRandomEncouragement());
      playCorrect();
    } else {
      setCombo(0);
      setLives((l) => Math.max(0, l - 1));
      setAiText(`${getRandomWrongIntro()} ${question.explanation}`);
      playWrong();
    }
  }

  function handleNext() {
    if (isLastQuestion || outOfLives) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
    setTimeLeft(QUESTION_TIME);
  }

  function handleReplay() {
    setOrder(shuffle(currentTopic.quiz));
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setCombo(0);
    setLives(3);
    setTimeLeft(QUESTION_TIME);
    setFinished(false);
    submittedRef.current = false;
  }

  async function handleShare() {
    const text = `EduKids'da "${currentTopic.title}" viktorinasida ${percent}% (${stars}⭐) natija oldim!`;
    if (navigator.share) {
      try { await navigator.share({ text, title: 'EduKids' }); } catch { /* bekor qilindi */ }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        pushToast('info', "Natija nusxalandi!", '📋');
      } catch {
        pushToast('error', "Ulashib bo'lmadi.");
      }
    }
  }

  if (finished) {
    return (
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
        <ConfettiEffect active={stars >= 4} />
        <Trophy size={64} className="mb-2 text-sunny-500" />
        <h1 className="text-3xl font-extrabold text-slate-700 dark:text-white">Viktorina yakunlandi!</h1>
        <p className="mt-2 text-lg font-semibold text-slate-500 dark:text-slate-300">
          {order.length} tadan {correctCount} ta savolga to'g'ri javob berdingiz ({percent}%)
        </p>
        <div className="my-4 flex gap-4 text-sm font-bold text-slate-500 dark:text-slate-300">
          <span>🎯 {score} ball</span>
          <span>🪙 +{coinsEarned}</span>
          <span>✨ +{xpEarned} XP</span>
        </div>
        <div className="my-2">
          <StarRating stars={stars} size={48} />
        </div>
        <p className="mb-8 text-xl font-bold text-candy-500">{getStarMessage(stars)}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <BigButton onClick={handleReplay} icon={RotateCcw} variant="secondary">
            Qayta urinish
          </BigButton>
          <BigButton onClick={handleShare} icon={Share2} variant="white">
            Ulashish
          </BigButton>
          <BigButton to="/oyin" icon={Gamepad2} variant="success">
            O'yinga o'tish
          </BigButton>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-candy-100 px-4 py-1 text-sm font-bold text-candy-600 dark:bg-candy-900 dark:text-candy-200">
          ✅ Viktorina
        </span>
        <LivesDisplay lives={lives} />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-300">
          Savol {index + 1} / {order.length}
        </span>
      </div>

      <ProgressBar percent={(index / order.length) * 100} colorClass="bg-candy-500" />

      <div className="mt-6 flex items-center justify-between">
        <Mascot size={72} floating={!answered} talkOnClick={false} />
        <div className={`flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-extrabold shadow-sm dark:bg-slate-700 ${timeLeft <= 5 ? 'animate-wiggle text-candy-500' : 'text-bubble-500'}`}>
          <TimerIcon size={18} /> {timeLeft}s
        </div>
        <ComboBadge combo={combo} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="mt-4 rounded-3xl bg-white p-6 shadow-chunky-sm dark:bg-slate-800"
        >
          <h2 className="mb-6 text-center text-xl font-extrabold text-slate-700 dark:text-white">
            {question.question}
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {question.options.map((option, i) => {
              const isCorrect = i === question.correctIndex;
              const isSelected = i === selected;
              let stateClass = 'bg-slate-50 hover:bg-bubble-50 dark:bg-slate-700 dark:hover:bg-slate-600';
              if (answered && isCorrect) stateClass = 'bg-leafy-100 ring-2 ring-leafy-500 dark:bg-leafy-900';
              else if (answered && isSelected && !isCorrect) stateClass = 'bg-candy-100 ring-2 ring-candy-500 dark:bg-candy-900';

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={answered}
                  className={`flex items-center justify-between gap-2 rounded-2xl p-4 text-left font-semibold text-slate-700 shadow-sm transition disabled:cursor-default dark:text-white ${stateClass}`}
                  aria-pressed={isSelected}
                >
                  <span>{option}</span>
                  {answered && isCorrect && <CheckCircle2 className="shrink-0 text-leafy-600" />}
                  {answered && isSelected && !isCorrect && <XCircle className="shrink-0 text-candy-600" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-5 overflow-hidden rounded-2xl bg-sunny-50 p-4 text-sm font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-200"
              >
                <p className="mb-1 font-bold text-sunny-600 dark:text-sunny-300">
                  {selected === question.correctIndex ? "✅ To'g'ri!" : selected === null ? "⏰ Vaqt tugadi!" : "❌ Noto'g'ri!"}
                </p>
                <p>🦉 <strong>Bilag'on AI:</strong> {aiText}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {answered && (
            <div className="mt-6 flex justify-end">
              <BigButton onClick={handleNext} icon={ArrowRight} variant="primary">
                {isLastQuestion || outOfLives ? 'Yakunlash' : 'Keyingisi'}
              </BigButton>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
