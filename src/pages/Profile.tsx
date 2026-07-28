import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ACHIEVEMENTS } from '../data/achievements';
import { getAvatarEmoji } from '../data/avatars';
import { BADGE_ORDER } from '../utils/scoreUtils';
import AvatarPicker from '../components/AvatarPicker';
import Badge from '../components/Badge';
import LevelDisplay from '../components/LevelDisplay';
import CoinDisplay from '../components/CoinDisplay';
import BigButton from '../components/BigButton';
import Leaderboard from '../components/Leaderboard';

export default function Profile() {
  const { state, setProfile, pushToast } = useApp();
  const [name, setName] = useState(state.profile.name);
  const [avatar, setAvatar] = useState(state.profile.avatar);

  function handleSave() {
    setProfile({ name: name.trim() || 'Do\'stim', avatar });
    pushToast('success', 'Profil saqlandi!', getAvatarEmoji(avatar));
  }

  const visibleAchievements = ACHIEVEMENTS.filter((a) => !a.hidden || state.unlockedAchievements.includes(a.id));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-extrabold text-slate-700 dark:text-white">👤 Mening profilim</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-6 text-center shadow-chunky-sm dark:bg-slate-800 lg:col-span-1">
          <div className="text-7xl">{getAvatarEmoji(avatar)}</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            placeholder="Ismingizni kiriting"
            className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-2 text-center text-lg font-bold text-slate-700 focus:border-sunny-400 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            aria-label="Ism"
          />
          <div className="flex gap-3">
            <CoinDisplay coins={state.coins} />
          </div>
          <div className="w-full">
            <LevelDisplay xp={state.xp} />
          </div>
          <BigButton onClick={handleSave} icon={Save} variant="primary" className="w-full justify-center">
            Saqlash
          </BigButton>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-3xl bg-white p-6 shadow-chunky-sm dark:bg-slate-800">
            <h2 className="mb-4 font-extrabold text-slate-700 dark:text-white">Avatar tanlash</h2>
            <AvatarPicker selected={avatar} onSelect={setAvatar} />
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-chunky-sm dark:bg-slate-800">
            <h2 className="mb-4 flex items-center gap-2 font-extrabold text-slate-700 dark:text-white">
              <Award size={20} /> Nishonlar
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {BADGE_ORDER.map((b) => (
                <Badge key={b} type={b} earned={state.badges.includes(b)} size={62} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-chunky-sm dark:bg-slate-800">
        <h2 className="mb-4 font-extrabold text-slate-700 dark:text-white">🏆 Yutuqlar</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {visibleAchievements.map((a, i) => {
            const unlocked = state.unlockedAchievements.includes(a.id);
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className={`flex flex-col items-center gap-1 rounded-2xl p-3 text-center ${unlocked ? 'bg-sunny-50 dark:bg-slate-700' : 'bg-slate-50 opacity-40 dark:bg-slate-700/50'}`}
              >
                <span className="text-3xl" aria-hidden="true">{a.emoji}</span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-200">{a.title}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <Leaderboard />
      </div>
    </div>
  );
}
