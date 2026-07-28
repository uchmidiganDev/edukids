// ============================================================
// EduKids - markaziy TypeScript tur (type) ta'riflari
// ============================================================

export type TopicKey =
  | 'yol-qoidalari'
  | 'yongin-xavfsizligi'
  | 'internet-xavfsizligi'
  | 'chiqindi-saralash';

export type CardType = 'lesson' | 'fact' | 'tip' | 'summary';

export interface MiniQuiz {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LearningCard {
  id: number;
  type: CardType;
  emoji: string;
  title: string;
  text: string;
  example: string;
  miniQuiz: MiniQuiz;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'diamond' | 'master';

export interface BadgeThresholds {
  bronze: number;
  silver: number;
  gold: number;
  diamond: number;
  master: number;
}

export interface GameDefinition {
  id: string;
  title: string;
  emoji: string;
  description: string;
  instructions: string[];
  badgeThreshold: BadgeThresholds;
}

export interface TopicTheme {
  primary: string;
  gradient: string;
  darkGradient: string;
}

export interface TopicVideo {
  title: string;
  blurb: string;
  videoId: string;
}

export type HeroIllustrationKey = 'road' | 'fire' | 'shield' | 'recycle';

export interface TopicData {
  key: TopicKey;
  title: string;
  subtitle: string;
  emoji: string;
  heroIllustration: HeroIllustrationKey;
  theme: TopicTheme;
  mascotMessage: string;
  learning: LearningCard[];
  quiz: QuizQuestion[];
  games: GameDefinition[];
  video: TopicVideo;
}

// ------------------------------------------------------------
// Profil, gamifikatsiya va progress
// ------------------------------------------------------------

export interface AvatarOption {
  id: string;
  emoji: string;
  label: string;
}

export interface Profile {
  name: string;
  avatar: string;
}

export interface QuizAttempt {
  date: string;
  topic: TopicKey;
  percent: number;
  stars: number;
  xpEarned: number;
}

export interface GameAttempt {
  date: string;
  topic: TopicKey;
  gameId: string;
  score: number;
}

export type MissionMetric =
  | 'quizPlayed'
  | 'gamesPlayed'
  | 'cardsRead'
  | 'perfectQuiz'
  | 'coinsEarned';

export interface MissionDefinition {
  id: string;
  title: string;
  emoji: string;
  type: 'daily' | 'weekly';
  target: number;
  metric: MissionMetric;
  rewardCoins: number;
  rewardXp: number;
}

export interface MissionState {
  id: string;
  progress: number;
  claimed: boolean;
  cycleKey: string;
}

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  emoji: string;
  hidden?: boolean;
}

export type FontSize = 'sm' | 'md' | 'lg';

export interface SettingsState {
  muted: boolean;
  darkMode: boolean;
  animationsEnabled: boolean;
  fontSize: FontSize;
  highContrast: boolean;
}

export type VisitedSections = {
  learning: boolean;
  quiz: boolean;
  game: boolean;
  video: boolean;
};

export interface AppState {
  profile: Profile;
  coins: number;
  xp: number;
  badges: BadgeTier[];
  unlockedAchievements: string[];
  visited: VisitedSections;
  cardsRead: number[];
  quizHistory: QuizAttempt[];
  gameHistory: GameAttempt[];
  bestGameScores: Record<string, number>;
  lastDailyRewardDate: string | null;
  lastVisitDate: string | null;
  dailyStreak: number;
  missions: MissionState[];
  settings: SettingsState;
  easterEggClicks: Record<string, number>;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'achievement';
  text: string;
  emoji?: string;
}
