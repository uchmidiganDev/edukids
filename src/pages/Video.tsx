import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Captions, RotateCcw, CheckCircle2 } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { usageGuide } from '../data/guide';
import { useApp } from '../context/AppContext';
import Mascot from '../components/Mascot';
import BigButton from '../components/BigButton';

export default function Video() {
  const { markVisited, state, unlockAchievement, pushToast } = useApp();
  const [replayKey, setReplayKey] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    markVisited('video');
  }, [markVisited]);

  function handleReplay() {
    setReplayKey((k) => k + 1);
    setCompleted(false);
  }

  function handleMarkCompleted() {
    setCompleted(true);
    if (!state.unlockedAchievements.includes('video-watcher')) {
      unlockAchievement('video-watcher');
    }
    pushToast('success', 'Video tugallandi deb belgilandi!', '🎬');
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Mascot size={100} floating />
        <span className="rounded-full bg-grape-100 px-4 py-1 text-sm font-bold text-grape-600 dark:bg-grape-900 dark:text-grape-200">
          🎥 Video qo'llanma
        </span>
        <h1 className="text-3xl font-extrabold text-slate-700 dark:text-white">
          {currentTopic.video.title}
        </h1>
        <p className="max-w-xl text-lg font-medium text-slate-600 dark:text-slate-300">
          {currentTopic.video.blurb}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-3xl shadow-chunky-sm"
      >
        <div className="relative aspect-video w-full bg-slate-900">
          <iframe
            key={replayKey}
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${currentTopic.video.videoId}?cc_load_policy=1&rel=0`}
            title={currentTopic.video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-300">
          <Captions size={18} /> Video ostidagi "CC" tugmasi orqali subtitr (izoh)larni yoqishingiz mumkin.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleReplay}
            className="flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 dark:bg-slate-700 dark:text-white"
          >
            <RotateCcw size={16} /> Qayta ko'rish
          </button>
          {completed ? (
            <span className="flex items-center gap-1 rounded-xl bg-leafy-100 px-3 py-2 text-sm font-bold text-leafy-700 dark:bg-leafy-900 dark:text-leafy-200">
              <CheckCircle2 size={16} /> Tugallandi
            </span>
          ) : (
            <button
              onClick={handleMarkCompleted}
              className="flex items-center gap-1 rounded-xl bg-leafy-500 px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-leafy-600"
            >
              <CheckCircle2 size={16} /> Tugatdim deb belgilash
            </button>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-center text-2xl font-extrabold text-slate-700 dark:text-white">
          Saytdan qanday foydalanish kerak? 🧭
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {usageGuide.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-4 rounded-3xl bg-white p-5 shadow-chunky-sm dark:bg-slate-800"
            >
              <div className="text-4xl" aria-hidden="true">{item.emoji}</div>
              <div>
                <h3 className="font-extrabold text-slate-700 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
