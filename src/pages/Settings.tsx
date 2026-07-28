import { useState } from 'react';
import { Moon, Sun, Volume2, VolumeX, Sparkles, Type, Contrast, Trash2, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BigButton from '../components/BigButton';
import type { FontSize } from '../types';

function SettingRow({ icon, title, description, control }: { icon: React.ReactNode; title: string; description: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-chunky-sm dark:bg-slate-800">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bubble-100 text-bubble-600 dark:bg-bubble-900 dark:text-bubble-200">
          {icon}
        </div>
        <div>
          <p className="font-bold text-slate-700 dark:text-white">{title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
      {control}
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${checked ? 'bg-leafy-500' : 'bg-slate-300 dark:bg-slate-600'}`}
    >
      <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-7' : 'translate-x-1'}`} />
    </button>
  );
}

const FONT_SIZES: { id: FontSize; label: string }[] = [
  { id: 'sm', label: 'Kichik' },
  { id: 'md', label: "O'rta" },
  { id: 'lg', label: 'Katta' },
];

export default function Settings() {
  const { state, updateSettings, resetProgress, pushToast } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);
  const s = state.settings;

  function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    resetProgress();
    setConfirmReset(false);
    pushToast('info', 'Barcha progress tozalandi.', '🧹');
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-extrabold text-slate-700 dark:text-white">⚙️ Sozlamalar</h1>

      <div className="flex flex-col gap-3">
        <SettingRow
          icon={s.darkMode ? <Moon size={20} /> : <Sun size={20} />}
          title="Tungi / Kunduzgi rejim"
          description="Ko'zga yoqimli qorong'i yoki yorug' mavzu"
          control={<Toggle checked={s.darkMode} onChange={() => updateSettings({ darkMode: !s.darkMode })} label="Tungi rejim" />}
        />
        <SettingRow
          icon={s.muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          title="Ovoz effektlari"
          description="Tugma bosish, to'g'ri/xato va g'alaba ovozlari"
          control={<Toggle checked={!s.muted} onChange={() => updateSettings({ muted: !s.muted })} label="Ovoz" />}
        />
        <SettingRow
          icon={<Sparkles size={20} />}
          title="Animatsiyalar"
          description="Suzuvchi bulut, konfetti va boshqa harakatlar"
          control={<Toggle checked={s.animationsEnabled} onChange={() => updateSettings({ animationsEnabled: !s.animationsEnabled })} label="Animatsiyalar" />}
        />
        <SettingRow
          icon={<Contrast size={20} />}
          title="Yuqori kontrast"
          description="Matnni yanada aniqroq ko'rish uchun"
          control={<Toggle checked={s.highContrast} onChange={() => updateSettings({ highContrast: !s.highContrast })} label="Yuqori kontrast" />}
        />
        <SettingRow
          icon={<Type size={20} />}
          title="Shrift o'lchami"
          description="Matn kattaligini tanlang"
          control={
            <div className="flex gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-700">
              {FONT_SIZES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => updateSettings({ fontSize: f.id })}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${s.fontSize === f.id ? 'bg-sunny-400 text-white' : 'text-slate-500 dark:text-slate-300'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          }
        />
        <SettingRow
          icon={<Globe size={20} />}
          title="Til"
          description="Hozircha faqat o'zbek tili qo'llab-quvvatlanadi"
          control={<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-300">O'zbekcha</span>}
        />
      </div>

      <div className="mt-8 rounded-3xl border-2 border-dashed border-candy-300 p-5 text-center dark:border-candy-700">
        <p className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
          Diqqat! Bu tugma barcha ball, tanga, nishon va yutuqlaringizni butunlay o'chirib tashlaydi.
        </p>
        <BigButton onClick={handleReset} icon={Trash2} variant="danger">
          {confirmReset ? 'Ha, rostdan ham tozalash!' : 'Progressni tozalash'}
        </BigButton>
        {confirmReset && (
          <button onClick={() => setConfirmReset(false)} className="mt-3 block w-full text-sm font-semibold text-slate-400 underline">
            Bekor qilish
          </button>
        )}
      </div>
    </div>
  );
}
