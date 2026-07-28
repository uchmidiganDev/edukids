import { useMemo } from 'react';
import { Rocket, BookOpen, ListChecks, Gamepad2, Video, Sparkles, Flame } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { getRandomQuote, getDailyTip } from '../data/quotes';
import { getAchievement } from '../data/achievements';
import { illustrationMap } from '../components/Illustrations';
import Mascot from '../components/Mascot';
import FloatingClouds from '../components/FloatingClouds';
import ParticleBackground from '../components/ParticleBackground';
import BigButton from '../components/BigButton';
import NavCard from '../components/NavCard';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import LevelDisplay from '../components/LevelDisplay';
import TreasureChest from '../components/TreasureChest';
import { useApp } from '../context/AppContext';
import { BADGE_ORDER } from '../utils/scoreUtils';

const sectionCards = [
  { to: '/organish', icon: BookOpen, title: "O'rganish", description: 'Qiziqarli darslar va faktlar', gradient: 'from-bubble-400 to-bubble-600' },
  { to: '/viktorina', icon: ListChecks, title: 'Viktorina', description: "15 ta savol bilan bilimingni sina", gradient: 'from-candy-400 to-candy-600' },
  { to: '/oyin', icon: Gamepad2, title: "O'yin", description: "3 xil o'yin bilan o'ynab-o'rgan!", gradient: 'from-leafy-400 to-leafy-600' },
  { to: '/video', icon: Video, title: 'Video', description: "Video orqali qo'llanma", gradient: 'from-grape-400 to-grape-600' },
];

export default function Home() {
  const { state } = useApp();
  const HeroIllustration = illustrationMap[currentTopic.heroIllustration];
  const quote = useMemo(() => getRandomQuote(), []);
  const tip = useMemo(() => getDailyTip(), []);

  const completedCount = Object.values(state.visited).filter(Boolean).length;
  const latestAchievementId = state.unlockedAchievements[state.unlockedAchievements.length - 1];
  const latestAchievement = latestAchievementId ? getAchievement(latestAchievementId) : undefined;

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className={`relative overflow-hidden bg-gradient-to-br ${currentTopic.theme.gradient} ${currentTopic.theme.darkGradient} px-4 pb-16 pt-10`}>
        <FloatingClouds />
        <ParticleBackground count={18} />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <span className="inline-block rounded-full bg-white/70 px-4 py-1 text-sm font-bold text-slate-600 shadow dark:bg-slate-800/70 dark:text-slate-200">
              {currentTopic.emoji} {currentTopic.title} bo'yicha ta'lim dasturi
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-700 drop-shadow-sm dark:text-white md:text-5xl">
              EduKids'ga xush kelibsiz! 🎉
            </h1>
            <p className="mx-auto mt-4 max-w-md text-lg font-medium text-slate-600 dark:text-slate-200 md:mx-0">
              {currentTopic.subtitle} Keling, <strong>{currentTopic.title}</strong> mavzusini birga,
              qiziqarli o'yinlar va viktorinalar orqali o'rganamiz!
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <BigButton to="/organish" icon={Rocket} variant="primary" className="animate-pulseGlow">
                BOSHLASH!
              </BigButton>
            </div>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="animate-float">
              <HeroIllustration size={200} />
            </div>
            <Mascot size={130} message={currentTopic.mascotMessage} />
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4">
        <section className="grid grid-cols-1 gap-6 rounded-3xl bg-white/80 p-6 shadow-chunky-sm dark:bg-slate-800/80 lg:grid-cols-3" aria-label="Progress kuzatuvchisi">
          <div className="lg:col-span-2">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-extrabold text-slate-700 dark:text-white">
              <Sparkles className="text-sunny-500" /> Sening yutuqlaring
            </h2>
            <ProgressBar percent={(completedCount / 4) * 100} label={`${completedCount} / 4 bo'lim tugallandi`} colorClass="bg-gradient-to-r from-bubble-400 to-leafy-400" />
            <div className="mt-4">
              <LevelDisplay xp={state.xp} />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-orange-500">
              <Flame size={18} /> {state.dailyStreak} kunlik streak!
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 border-t pt-4 dark:border-slate-700 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            {latestAchievement ? (
              <>
                <p className="text-xs font-bold uppercase text-slate-400">So'nggi yutuq</p>
                <div className="text-4xl" aria-hidden="true">{latestAchievement.emoji}</div>
                <p className="text-center text-sm font-extrabold text-slate-700 dark:text-white">{latestAchievement.title}</p>
              </>
            ) : (
              <p className="text-center text-sm text-slate-400">Hali yutuq yo'q — o'rganishni boshla!</p>
            )}
          </div>
        </section>

        <section className="flex justify-center gap-4">
          {BADGE_ORDER.map((b) => (
            <Badge key={b} type={b} earned={state.badges.includes(b)} size={64} />
          ))}
        </section>

        <section aria-label="Bo'limlar">
          <h2 className="mb-6 text-center text-2xl font-extrabold text-slate-700 dark:text-white">
            Qayerdan boshlaymiz? 👇
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectionCards.map((card, i) => (
              <NavCard
                key={card.to}
                {...card}
                index={i}
                done={state.visited[card.to === '/organish' ? 'learning' : card.to === '/viktorina' ? 'quiz' : card.to === '/oyin' ? 'game' : 'video']}
              />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TreasureChest />
          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-3xl bg-bubble-50 p-6 shadow-chunky-sm dark:bg-slate-800">
              <p className="mb-1 text-sm font-bold uppercase tracking-wide text-bubble-500">💡 Kunlik maslahat</p>
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">{tip}</p>
            </div>
            <div className="rounded-3xl bg-candy-50 p-6 shadow-chunky-sm dark:bg-slate-800">
              <p className="mb-1 text-sm font-bold uppercase tracking-wide text-candy-500">✨ Kun iqtibosi</p>
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">{quote}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
