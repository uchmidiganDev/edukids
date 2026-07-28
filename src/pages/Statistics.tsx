import { currentTopic } from '../data/topics';
import { useApp } from '../context/AppContext';
import { formatUzbekShortDate } from '../utils/formatDate';
import { BarChart, StatRing } from '../components/StatChart';
import MissionList from '../components/MissionList';
import LuckyWheel from '../components/LuckyWheel';

const TOPIC_COLORS = ['#0ea5e9', '#f59e0b', '#f0429c', '#22c55e'];

export default function Statistics() {
  const { state } = useApp();

  const learningPercent = (state.cardsRead.length / currentTopic.learning.length) * 100;
  const quizAvg = state.quizHistory.length
    ? state.quizHistory.reduce((sum, q) => sum + q.percent, 0) / state.quizHistory.length
    : 0;
  const overallPercent = (Object.values(state.visited).filter(Boolean).length / 4) * 100;

  const gamesData = currentTopic.games.map((g, i) => ({
    label: g.title.length > 16 ? `${g.title.slice(0, 16)}…` : g.title,
    value: state.gameHistory.filter((h) => h.gameId === g.id).length,
    color: TOPIC_COLORS[i % TOPIC_COLORS.length],
    emoji: g.emoji,
  }));

  const quizData = state.quizHistory.slice(-8).map((q, i) => ({
    label: formatUzbekShortDate(new Date(q.date)),
    value: q.percent,
    color: TOPIC_COLORS[i % TOPIC_COLORS.length],
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-extrabold text-slate-700 dark:text-white">📊 Statistika</h1>

      <div className="mb-8 flex flex-wrap justify-center gap-8 rounded-3xl bg-white p-6 shadow-chunky-sm dark:bg-slate-800">
        <StatRing percent={learningPercent} color="#0ea5e9" label="O'rganish" />
        <StatRing percent={quizAvg} color="#f0429c" label="Viktorina o'rtachasi" />
        <StatRing percent={overallPercent} color="#22c55e" label="Umumiy progress" />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-chunky-sm dark:bg-slate-800">
          <h2 className="mb-4 font-extrabold text-slate-700 dark:text-white">🎮 O'ynalgan o'yinlar</h2>
          {gamesData.every((d) => d.value === 0) ? (
            <p className="text-sm text-slate-400">Hali hech qanday o'yin o'ynalmagan.</p>
          ) : (
            <BarChart data={gamesData} unit=" marta" />
          )}
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-chunky-sm dark:bg-slate-800">
          <h2 className="mb-4 font-extrabold text-slate-700 dark:text-white">📝 Viktorina tarixi</h2>
          {quizData.length === 0 ? (
            <p className="text-sm text-slate-400">Hali viktorina yechilmagan.</p>
          ) : (
            <BarChart data={quizData} unit="%" />
          )}
        </div>
      </div>

      <div className="mb-8">
        <MissionList />
      </div>

      <LuckyWheel />
    </div>
  );
}
