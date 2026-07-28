import { Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Ovozni yoqish/o'chirish tugmasi
export default function SoundToggle({ className = '' }: { className?: string }) {
  const { state, updateSettings } = useApp();
  const muted = state.settings.muted;
  return (
    <button
      onClick={() => updateSettings({ muted: !muted })}
      className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-chunky-sm transition hover:scale-110 active:scale-95 dark:bg-slate-700 dark:text-white ${className}`}
      aria-label={muted ? "Ovozni yoqish" : "Ovozni o'chirish"}
      title={muted ? "Ovozni yoqish" : "Ovozni o'chirish"}
    >
      {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
}
