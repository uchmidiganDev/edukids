import { Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Tungi rejimni yoqish/o'chirish tugmasi
export default function DarkModeToggle({ className = '' }: { className?: string }) {
  const { state, updateSettings } = useApp();
  const darkMode = state.settings.darkMode;
  return (
    <button
      onClick={() => updateSettings({ darkMode: !darkMode })}
      className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-chunky-sm transition hover:scale-110 active:scale-95 dark:bg-slate-700 dark:text-white ${className}`}
      aria-label={darkMode ? "Kunduzgi rejim" : "Tungi rejim"}
      title={darkMode ? "Kunduzgi rejim" : "Tungi rejim"}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
