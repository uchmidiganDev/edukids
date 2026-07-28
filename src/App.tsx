import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import AchievementPopup from './components/AchievementPopup';
import LoadingScreen from './components/LoadingScreen';
import ToastContainer from './components/ToastContainer';
import BackToTopFAB from './components/BackToTopFAB';
import Home from './pages/Home';
import Learning from './pages/Learning';
import Quiz from './pages/Quiz';
import Video from './pages/Video';
import { useApp } from './context/AppContext';

// Kod bo'linishi (code splitting) uchun og'irroq sahifalar "lazy" yuklanadi
const Game = lazy(() => import('./pages/Game'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const Statistics = lazy(() => import('./pages/Statistics'));
const Certificate = lazy(() => import('./pages/Certificate'));
const AskAI = lazy(() => import('./pages/AskAI'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-sunny-300 border-t-sunny-600" />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const { state } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', state.settings.darkMode);
    html.classList.toggle('high-contrast', state.settings.highContrast);
    html.classList.toggle('no-animations', !state.settings.animationsEnabled);
    html.classList.remove('font-sm', 'font-md', 'font-lg');
    html.classList.add(`font-${state.settings.fontSize}`);
  }, [state.settings]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-slate-50 text-slate-800 dark:from-slate-900 dark:to-slate-950 dark:text-slate-100">
      <AnimatePresence>{loading && <LoadingScreen key="loading" />}</AnimatePresence>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:shadow-lg"
      >
        Asosiy tarkibga o'tish
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/organish" element={<PageTransition><Learning /></PageTransition>} />
              <Route path="/viktorina" element={<PageTransition><Quiz /></PageTransition>} />
              <Route path="/oyin" element={<PageTransition><Game /></PageTransition>} />
              <Route path="/video" element={<PageTransition><Video /></PageTransition>} />
              <Route path="/profil" element={<PageTransition><Profile /></PageTransition>} />
              <Route path="/sozlamalar" element={<PageTransition><Settings /></PageTransition>} />
              <Route path="/statistika" element={<PageTransition><Statistics /></PageTransition>} />
              <Route path="/sertifikat" element={<PageTransition><Certificate /></PageTransition>} />
              <Route path="/ai-yordamchi" element={<PageTransition><AskAI /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
      <AchievementPopup />
      <ToastContainer />
      <BackToTopFAB />
    </div>
  );
}
