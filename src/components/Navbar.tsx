import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, BookOpen, ListChecks, Gamepad2, Video, Menu, X,
  User, Settings, BarChart3, Award, Sparkles, ChevronDown,
} from 'lucide-react';
import { currentTopic } from '../data/topics';
import { useApp } from '../context/AppContext';
import { getAvatarEmoji } from '../data/avatars';
import SoundToggle from './SoundToggle';
import DarkModeToggle from './DarkModeToggle';
import CoinDisplay from './CoinDisplay';

const links = [
  { to: '/', label: 'Bosh sahifa', icon: Home, end: true },
  { to: '/organish', label: "O'rganish", icon: BookOpen },
  { to: '/viktorina', label: 'Viktorina', icon: ListChecks },
  { to: '/oyin', label: "O'yin", icon: Gamepad2 },
  { to: '/video', label: 'Video', icon: Video },
];

const moreLinks = [
  { to: '/profil', label: 'Profil', icon: User },
  { to: '/statistika', label: 'Statistika', icon: BarChart3 },
  { to: '/sertifikat', label: 'Sertifikat', icon: Award },
  { to: '/ai-yordamchi', label: 'AI Yordamchi', icon: Sparkles },
  { to: '/sozlamalar', label: 'Sozlamalar', icon: Settings },
];

function NavItem({ to, label, icon: Icon, end, onClick }: { to: string; label: string; icon: typeof Home; end?: boolean; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition-colors md:text-base ${
          isActive
            ? 'bg-sunny-400 text-white shadow-chunky-sm'
            : 'text-slate-600 hover:bg-white/70 dark:text-slate-200 dark:hover:bg-slate-700'
        }`
      }
    >
      <Icon size={20} aria-hidden="true" />
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { state, bumpEasterEgg, unlockAchievement, pushToast } = useApp();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleLogoClick() {
    const count = bumpEasterEgg('logo-click');
    if (count === 7) {
      unlockAchievement('logo-secret');
      pushToast('achievement', 'Maxfiy yutuq ochildi! Logotipni 7 marta bosding!', '✨');
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md shadow-sm dark:bg-slate-900/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3" aria-label="Asosiy navigatsiya">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-700 dark:text-white" end onClick={handleLogoClick}>
          <span className="text-2xl" aria-hidden="true">🦉</span>
          <span className="hidden sm:inline">EduKids</span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => <NavItem key={l.to} {...l} />)}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full bg-grape-100 px-3 py-1 text-xs font-bold text-grape-600 dark:bg-grape-900 dark:text-grape-200 md:inline">
            {currentTopic.emoji} {currentTopic.title}
          </span>
          <div className="hidden sm:block">
            <CoinDisplay coins={state.coins} size="sm" />
          </div>
          <SoundToggle />
          <DarkModeToggle />

          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className="flex h-11 items-center gap-1 rounded-full bg-white/80 px-2 text-slate-600 shadow-chunky-sm dark:bg-slate-700 dark:text-white"
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              aria-label="Profil menyusi"
            >
              <span className="text-xl" aria-hidden="true">{getAvatarEmoji(state.profile.avatar)}</span>
              <ChevronDown size={16} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl dark:bg-slate-800"
                  role="menu"
                >
                  {moreLinks.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      onClick={() => setMoreOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition ${isActive ? 'bg-sunny-100 text-sunny-700 dark:bg-sunny-900 dark:text-sunny-200' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700'}`
                      }
                      role="menuitem"
                    >
                      <l.icon size={18} />
                      {l.label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-chunky-sm dark:bg-slate-700 dark:text-white lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-4">
              {[...links, ...moreLinks].map((l) => (
                <NavItem key={l.to} {...l} onClick={() => setOpen(false)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
