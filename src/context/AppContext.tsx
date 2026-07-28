import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ALL_MISSIONS, getDailyCycleKey, getMissionDef, getWeeklyCycleKey } from '../data/missions';
import { getAchievement } from '../data/achievements';
import type {
  AppState,
  BadgeTier,
  GameAttempt,
  MissionMetric,
  MissionState,
  Profile,
  QuizAttempt,
  SettingsState,
  ToastMessage,
  TopicKey,
  VisitedSections,
} from '../types';

const defaultState: AppState = {
  profile: { name: '', avatar: 'owl' },
  coins: 0,
  xp: 0,
  badges: [],
  unlockedAchievements: [],
  visited: { learning: false, quiz: false, game: false, video: false },
  cardsRead: [],
  quizHistory: [],
  gameHistory: [],
  bestGameScores: {},
  lastDailyRewardDate: null,
  lastVisitDate: null,
  dailyStreak: 0,
  missions: [],
  settings: { muted: false, darkMode: false, animationsEnabled: true, fontSize: 'md', highContrast: false },
  easterEggClicks: {},
};

interface PendingAchievement {
  kind: 'badge' | 'achievement';
  id: string;
}

interface AppContextValue {
  state: AppState;
  toasts: ToastMessage[];
  pushToast: (type: ToastMessage['type'], text: string, emoji?: string) => void;
  dismissToast: (id: string) => void;
  pendingAchievement: PendingAchievement | null;
  clearPendingAchievement: () => void;
  setProfile: (profile: Profile) => void;
  markVisited: (section: keyof VisitedSections) => void;
  addCoins: (amount: number) => void;
  addXp: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  recordCardRead: (cardId: number) => void;
  submitQuizResult: (topic: TopicKey, percent: number, stars: number, xpEarned: number, coinsEarned: number) => void;
  submitGameResult: (topic: TopicKey, gameId: string, score: number, badge: BadgeTier | null) => void;
  claimDailyReward: () => number;
  isDailyRewardAvailable: () => boolean;
  activeMissions: Array<{ def: NonNullable<ReturnType<typeof getMissionDef>>; state: MissionState }>;
  claimMission: (missionId: string) => void;
  updateSettings: (partial: Partial<SettingsState>) => void;
  resetProgress: () => void;
  bumpEasterEgg: (key: string) => number;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<AppState>('edukids-state', defaultState);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [achievementQueue, setAchievementQueue] = useState<PendingAchievement[]>([]);
  const streakCheckedRef = useRef(false);

  const pushToast = useCallback((type: ToastMessage['type'], text: string, emoji?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, type, text, emoji }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const queueAchievement = useCallback((item: PendingAchievement) => {
    setAchievementQueue((q) => [...q, item]);
  }, []);

  const clearPendingAchievement = useCallback(() => {
    setAchievementQueue((q) => q.slice(1));
  }, []);

  // Kunlik streak (ketma-ket kirish) tekshiruvi - faqat mount bo'lganda bir marta ishlaydi
  useEffect(() => {
    if (streakCheckedRef.current) return;
    streakCheckedRef.current = true;
    const todayKey = getDailyCycleKey();
    setState((prev) => {
      const lastVisit = prev.lastVisitDate;
      if (lastVisit === todayKey) return prev;
      const yesterday = getDailyCycleKey(new Date(Date.now() - 86400000));
      const nextStreak = lastVisit === yesterday ? prev.dailyStreak + 1 : 1;
      return { ...prev, dailyStreak: nextStreak, lastVisitDate: todayKey };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.dailyStreak >= 3 && !state.unlockedAchievements.includes('streak-3')) {
      unlockAchievementInternal('streak-3');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.dailyStreak]);

  function unlockAchievementInternal(id: string) {
    setState((prev) => {
      if (prev.unlockedAchievements.includes(id)) return prev;
      return { ...prev, unlockedAchievements: [...prev.unlockedAchievements, id] };
    });
    queueAchievement({ kind: 'achievement', id });
  }

  const unlockAchievement = useCallback((id: string) => {
    setState((prev) => {
      if (prev.unlockedAchievements.includes(id)) return prev;
      queueAchievement({ kind: 'achievement', id });
      return { ...prev, unlockedAchievements: [...prev.unlockedAchievements, id] };
    });
  }, [setState, queueAchievement]);

  const setProfile = useCallback((profile: Profile) => {
    setState((prev) => ({ ...prev, profile }));
  }, [setState]);

  const markVisited = useCallback((section: keyof VisitedSections) => {
    setState((prev) => {
      if (prev.visited[section]) return prev;
      const nextVisited = { ...prev.visited, [section]: true };
      if (section === 'learning' && !prev.unlockedAchievements.includes('first-steps')) {
        queueAchievement({ kind: 'achievement', id: 'first-steps' });
        return { ...prev, visited: nextVisited, unlockedAchievements: [...prev.unlockedAchievements, 'first-steps'] };
      }
      if (section === 'video' && !prev.unlockedAchievements.includes('video-watcher')) {
        queueAchievement({ kind: 'achievement', id: 'video-watcher' });
        return { ...prev, visited: nextVisited, unlockedAchievements: [...prev.unlockedAchievements, 'video-watcher'] };
      }
      return { ...prev, visited: nextVisited };
    });
  }, [setState, queueAchievement]);

  const incrementMissionProgress = useCallback((metric: MissionMetric, amount: number) => {
    setState((prev) => {
      const dailyCycle = getDailyCycleKey();
      const weeklyCycle = getWeeklyCycleKey();
      const relevant = ALL_MISSIONS.filter((m) => m.metric === metric);
      if (relevant.length === 0) return prev;
      let missions = [...prev.missions];
      relevant.forEach((def) => {
        const cycleKey = def.type === 'daily' ? dailyCycle : weeklyCycle;
        const idx = missions.findIndex((m) => m.id === def.id && m.cycleKey === cycleKey);
        if (idx === -1) {
          missions.push({ id: def.id, progress: Math.min(amount, def.target), claimed: false, cycleKey });
        } else if (!missions[idx].claimed) {
          missions[idx] = { ...missions[idx], progress: Math.min(missions[idx].progress + amount, def.target) };
        }
      });
      return { ...prev, missions };
    });
  }, [setState]);

  const addCoins = useCallback((amount: number) => {
    setState((prev) => {
      const nextCoins = Math.max(0, prev.coins + amount);
      const updates: Partial<AppState> = { coins: nextCoins };
      if (nextCoins >= 100 && !prev.unlockedAchievements.includes('coin-collector')) {
        queueAchievement({ kind: 'achievement', id: 'coin-collector' });
        updates.unlockedAchievements = [...prev.unlockedAchievements, 'coin-collector'];
      }
      return { ...prev, ...updates };
    });
    if (amount > 0) incrementMissionProgress('coinsEarned', amount);
  }, [setState, queueAchievement, incrementMissionProgress]);

  const addXp = useCallback((amount: number) => {
    setState((prev) => {
      const nextXp = Math.max(0, prev.xp + amount);
      const updates: Partial<AppState> = { xp: nextXp };
      const prevLevel = Math.floor(prev.xp / 100) + 1;
      const nextLevel = Math.floor(nextXp / 100) + 1;
      if (nextLevel >= 5 && prevLevel < 5 && !prev.unlockedAchievements.includes('level-5')) {
        queueAchievement({ kind: 'achievement', id: 'level-5' });
        updates.unlockedAchievements = [...prev.unlockedAchievements, 'level-5'];
      }
      return { ...prev, ...updates };
    });
  }, [setState, queueAchievement]);

  const recordCardRead = useCallback((cardId: number) => {
    setState((prev) => {
      if (prev.cardsRead.includes(cardId)) return prev;
      return { ...prev, cardsRead: [...prev.cardsRead, cardId] };
    });
    incrementMissionProgress('cardsRead', 1);
  }, [setState, incrementMissionProgress]);

  const submitQuizResult = useCallback((topic: TopicKey, percent: number, stars: number, xpEarned: number, coinsEarned: number) => {
    const attempt: QuizAttempt = { date: new Date().toISOString(), topic, percent, stars, xpEarned };
    setState((prev) => {
      const updates: Partial<AppState> = {
        visited: { ...prev.visited, quiz: true },
        quizHistory: [...prev.quizHistory, attempt].slice(-30),
      };
      if (!prev.unlockedAchievements.includes('quiz-master')) {
        queueAchievement({ kind: 'achievement', id: 'quiz-master' });
        updates.unlockedAchievements = [...(updates.unlockedAchievements ?? prev.unlockedAchievements), 'quiz-master'];
      }
      if (percent >= 100 && !(updates.unlockedAchievements ?? prev.unlockedAchievements).includes('perfect-score')) {
        queueAchievement({ kind: 'achievement', id: 'perfect-score' });
        updates.unlockedAchievements = [...(updates.unlockedAchievements ?? prev.unlockedAchievements), 'perfect-score'];
      }
      return { ...prev, ...updates };
    });
    addXp(xpEarned);
    addCoins(coinsEarned);
    incrementMissionProgress('quizPlayed', 1);
    if (percent >= 100) incrementMissionProgress('perfectQuiz', 1);
  }, [setState, queueAchievement, addXp, addCoins, incrementMissionProgress]);

  const submitGameResult = useCallback((topic: TopicKey, gameId: string, score: number, badge: BadgeTier | null) => {
    const attempt: GameAttempt = { date: new Date().toISOString(), topic, gameId, score };
    setState((prev) => {
      const prevBest = prev.bestGameScores[gameId] ?? 0;
      const updates: Partial<AppState> = {
        visited: { ...prev.visited, game: true },
        gameHistory: [...prev.gameHistory, attempt].slice(-30),
        bestGameScores: { ...prev.bestGameScores, [gameId]: Math.max(prevBest, score) },
      };
      if (!prev.unlockedAchievements.includes('gamer')) {
        queueAchievement({ kind: 'achievement', id: 'gamer' });
        updates.unlockedAchievements = [...(updates.unlockedAchievements ?? prev.unlockedAchievements), 'gamer'];
      }
      let nextBadges = prev.badges;
      if (badge && !prev.badges.includes(badge)) {
        nextBadges = [...prev.badges, badge];
        queueAchievement({ kind: 'badge', id: badge });
      }
      updates.badges = nextBadges;
      if (nextBadges.length >= 5 && !(updates.unlockedAchievements ?? prev.unlockedAchievements).includes('all-badges')) {
        queueAchievement({ kind: 'achievement', id: 'all-badges' });
        updates.unlockedAchievements = [...(updates.unlockedAchievements ?? prev.unlockedAchievements), 'all-badges'];
      }
      return { ...prev, ...updates };
    });
    addCoins(Math.round(score / 2));
    addXp(Math.round(score / 3));
    incrementMissionProgress('gamesPlayed', 1);
  }, [setState, queueAchievement, addCoins, addXp, incrementMissionProgress]);

  const isDailyRewardAvailable = useCallback(() => {
    return state.lastDailyRewardDate !== getDailyCycleKey();
  }, [state.lastDailyRewardDate]);

  const claimDailyReward = useCallback((): number => {
    if (!isDailyRewardAvailable()) return 0;
    const reward = 20 + Math.floor(Math.random() * 30);
    setState((prev) => ({ ...prev, lastDailyRewardDate: getDailyCycleKey() }));
    addCoins(reward);
    addXp(10);
    return reward;
  }, [isDailyRewardAvailable, setState, addCoins, addXp]);

  const activeMissions = useMemo(() => {
    const dailyCycle = getDailyCycleKey();
    const weeklyCycle = getWeeklyCycleKey();
    return ALL_MISSIONS.map((def) => {
      const cycleKey = def.type === 'daily' ? dailyCycle : weeklyCycle;
      const found = state.missions.find((m) => m.id === def.id && m.cycleKey === cycleKey);
      const missionState: MissionState = found ?? { id: def.id, progress: 0, claimed: false, cycleKey };
      return { def, state: missionState };
    });
  }, [state.missions]);

  const claimMission = useCallback((missionId: string) => {
    const entry = activeMissions.find((m) => m.def.id === missionId);
    if (!entry || entry.state.claimed || entry.state.progress < entry.def.target) return;
    setState((prev) => {
      const idx = prev.missions.findIndex((m) => m.id === entry.state.id && m.cycleKey === entry.state.cycleKey);
      const missions = [...prev.missions];
      if (idx === -1) {
        missions.push({ ...entry.state, claimed: true });
      } else {
        missions[idx] = { ...missions[idx], claimed: true };
      }
      return { ...prev, missions };
    });
    addCoins(entry.def.rewardCoins);
    addXp(entry.def.rewardXp);
    pushToast('success', `"${entry.def.title}" vazifasi uchun mukofot olindi!`, entry.def.emoji);
  }, [activeMissions, setState, addCoins, addXp, pushToast]);

  const updateSettings = useCallback((partial: Partial<SettingsState>) => {
    setState((prev) => {
      const nextSettings = { ...prev.settings, ...partial };
      const updates: Partial<AppState> = { settings: nextSettings };
      if (partial.darkMode && !prev.unlockedAchievements.includes('night-owl')) {
        queueAchievement({ kind: 'achievement', id: 'night-owl' });
        updates.unlockedAchievements = [...prev.unlockedAchievements, 'night-owl'];
      }
      return { ...prev, ...updates };
    });
  }, [setState, queueAchievement]);

  const resetProgress = useCallback(() => {
    setState(defaultState);
  }, [setState]);

  const bumpEasterEgg = useCallback((key: string): number => {
    let result = 0;
    setState((prev) => {
      const next = (prev.easterEggClicks[key] ?? 0) + 1;
      result = next;
      return { ...prev, easterEggClicks: { ...prev.easterEggClicks, [key]: next } };
    });
    return result;
  }, [setState]);

  const pendingAchievement = achievementQueue[0] ?? null;

  const value: AppContextValue = {
    state,
    toasts,
    pushToast,
    dismissToast,
    pendingAchievement,
    clearPendingAchievement,
    setProfile,
    markVisited,
    addCoins,
    addXp,
    unlockAchievement,
    recordCardRead,
    submitQuizResult,
    submitGameResult,
    claimDailyReward,
    isDailyRewardAvailable,
    activeMissions,
    claimMission,
    updateSettings,
    resetProgress,
    bumpEasterEgg,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp AppProvider ichida ishlatilishi kerak');
  return ctx;
}

export { getAchievement };
