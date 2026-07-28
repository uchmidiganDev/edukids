import { useApp } from '../context/AppContext';
import { currentTopic } from '../data/topics';
import { formatUzbekShortDate } from '../utils/formatDate';

const MEDALS = ['🥇', '🥈', '🥉'];

function gameTitle(gameId: string): string {
  return currentTopic.games.find((g) => g.id === gameId)?.title ?? gameId;
}

// Mahalliy (shu qurilmadagi) eng yaxshi natijalar reytingi
export default function Leaderboard() {
  const { state } = useApp();

  const topQuiz = [...state.quizHistory]
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5);

  const topGames = [...state.gameHistory]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-3xl bg-white p-5 shadow-chunky-sm dark:bg-slate-800">
        <h3 className="mb-3 font-extrabold text-slate-700 dark:text-white">📝 Eng zo'r viktorinalar</h3>
        {topQuiz.length === 0 ? (
          <p className="text-sm text-slate-400">Hali viktorina natijalari yo'q.</p>
        ) : (
          <ol className="flex flex-col gap-2">
            {topQuiz.map((q, i) => (
              <li key={i} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                <span>{MEDALS[i] ?? `${i + 1}.`} {formatUzbekShortDate(new Date(q.date))}</span>
                <span className="font-extrabold text-candy-500">{q.percent}%</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="rounded-3xl bg-white p-5 shadow-chunky-sm dark:bg-slate-800">
        <h3 className="mb-3 font-extrabold text-slate-700 dark:text-white">🎮 Eng zo'r o'yinlar</h3>
        {topGames.length === 0 ? (
          <p className="text-sm text-slate-400">Hali o'yin natijalari yo'q.</p>
        ) : (
          <ol className="flex flex-col gap-2">
            {topGames.map((g, i) => (
              <li key={i} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                <span>{MEDALS[i] ?? `${i + 1}.`} {gameTitle(g.gameId)}</span>
                <span className="font-extrabold text-sunny-600">{g.score} ball</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <p className="col-span-full text-center text-xs text-slate-400">
        ℹ️ Bu reyting faqat shu qurilmadagi natijalarni ko'rsatadi (mahalliy reyting).
      </p>
    </div>
  );
}
