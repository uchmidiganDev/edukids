import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressBar from './ProgressBar';

// Kunlik va haftalik vazifalar ro'yxati, progress va mukofot olish tugmasi bilan
export default function MissionList() {
  const { activeMissions, claimMission } = useApp();

  const daily = activeMissions.filter((m) => m.def.type === 'daily');
  const weekly = activeMissions.filter((m) => m.def.type === 'weekly');

  function renderGroup(title: string, items: typeof activeMissions) {
    return (
      <div>
        <h3 className="mb-3 text-lg font-extrabold text-slate-700 dark:text-white">{title}</h3>
        <div className="flex flex-col gap-3">
          {items.map(({ def, state }) => {
            const done = state.progress >= def.target;
            return (
              <div key={def.id} className="rounded-2xl bg-white p-4 shadow-chunky-sm dark:bg-slate-800">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-bold text-slate-700 dark:text-white">
                    <span aria-hidden="true">{def.emoji}</span> {def.title}
                  </span>
                  {state.claimed ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-leafy-600">
                      <CheckCircle2 size={16} /> Olindi
                    </span>
                  ) : done ? (
                    <button
                      onClick={() => claimMission(def.id)}
                      className="rounded-xl bg-leafy-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-leafy-600"
                    >
                      Mukofotni olish 🎁
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">
                      +{def.rewardCoins} 🪙 · +{def.rewardXp} XP
                    </span>
                  )}
                </div>
                <ProgressBar
                  percent={(state.progress / def.target) * 100}
                  colorClass={done ? 'bg-leafy-500' : 'bg-bubble-400'}
                  height="h-2.5"
                />
                <p className="mt-1 text-right text-xs font-semibold text-slate-400">{state.progress}/{def.target}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {renderGroup('📅 Kunlik vazifalar', daily)}
      {renderGroup('🗓️ Haftalik vazifalar', weekly)}
    </div>
  );
}
