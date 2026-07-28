import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ListChecks, Gamepad2 } from 'lucide-react';
import { currentTopic } from '../data/topics';
import LearningCard from '../components/LearningCard';
import BigButton from '../components/BigButton';
import Mascot from '../components/Mascot';
import ParticleBackground from '../components/ParticleBackground';
import { useApp } from '../context/AppContext';

export default function Learning() {
  const { markVisited } = useApp();

  useEffect(() => {
    markVisited('learning');
  }, [markVisited]);

  return (
    <div className="relative px-4 pb-16 pt-10">
      <ParticleBackground count={12} className="opacity-40" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <Mascot size={110} />
          <span className="rounded-full bg-bubble-100 px-4 py-1 text-sm font-bold text-bubble-600 dark:bg-bubble-900 dark:text-bubble-200">
            📖 O'rganish bo'limi
          </span>
          <h1 className="text-3xl font-extrabold text-slate-700 dark:text-white md:text-4xl">
            {currentTopic.emoji} {currentTopic.title}
          </h1>
          <p className="max-w-xl text-lg font-medium text-slate-600 dark:text-slate-300">
            Har bir kartochkada mini-viktorina bor va ovozli o'qish tugmasini bosib, matnni tinglashing ham mumkin!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentTopic.learning.map((card, i) => (
            <LearningCard key={card.id} card={card} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-white/80 p-8 text-center shadow-chunky-sm dark:bg-slate-800/80"
        >
          <p className="text-xl font-extrabold text-slate-700 dark:text-white">
            Zo'r! Endi bilimingni tekshirib ko'ramizmi? 🎯
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BigButton to="/viktorina" icon={ListChecks} variant="secondary">
              Viktorinaga o'tish
            </BigButton>
            <BigButton to="/oyin" icon={Gamepad2} variant="success">
              O'yinni boshlash
            </BigButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
