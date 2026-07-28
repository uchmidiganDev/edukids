import type { MissionDefinition } from '../types';

export const DAILY_MISSIONS: MissionDefinition[] = [
  { id: 'daily-quiz', title: 'Bugun 1 marta viktorina yeching', emoji: '📝', type: 'daily', target: 1, metric: 'quizPlayed', rewardCoins: 10, rewardXp: 15 },
  { id: 'daily-game', title: "Bugun 1 marta o'yin o'ynang", emoji: '🎮', type: 'daily', target: 1, metric: 'gamesPlayed', rewardCoins: 10, rewardXp: 15 },
  { id: 'daily-cards', title: "3 ta dars kartochkasini o'qing", emoji: '📚', type: 'daily', target: 3, metric: 'cardsRead', rewardCoins: 15, rewardXp: 10 },
];

export const WEEKLY_MISSIONS: MissionDefinition[] = [
  { id: 'weekly-perfect', title: "Haftada 1 marta 100% ball oling", emoji: '💯', type: 'weekly', target: 1, metric: 'perfectQuiz', rewardCoins: 50, rewardXp: 60 },
  { id: 'weekly-coins', title: "Haftada 100 tanga to'plang", emoji: '🪙', type: 'weekly', target: 100, metric: 'coinsEarned', rewardCoins: 30, rewardXp: 40 },
];

export const ALL_MISSIONS: MissionDefinition[] = [...DAILY_MISSIONS, ...WEEKLY_MISSIONS];

export function getMissionDef(id: string): MissionDefinition | undefined {
  return ALL_MISSIONS.find((m) => m.id === id);
}

// Kunlik va haftalik "cycle" kalitlarini hisoblaydi (kun/hafta almashganda vazifalar yangilanadi)
export function getDailyCycleKey(date = new Date()): string {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function getWeeklyCycleKey(date = new Date()): string {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDays = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  const week = Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
  return `${date.getFullYear()}-W${week}`;
}
