import type { BadgeTier, BadgeThresholds } from '../types';

// Viktorina foizi asosida yulduzlar sonini hisoblaydi
export function getStarsForPercent(percent: number): number {
  if (percent >= 90) return 5;
  if (percent >= 70) return 4;
  if (percent >= 50) return 3;
  return 2;
}

// Yulduzlarga mos rag'batlantiruvchi xabar
export function getStarMessage(stars: number): string {
  switch (stars) {
    case 5:
      return "Ajoyib! Sen haqiqiy chempionsan! 🏆";
    case 4:
      return "Zo'r natija! Davom et! 🌟";
    case 3:
      return "Yaxshi harakat! Yana mashq qil! 👍";
    default:
      return "Harakat qilganing uchun rahmat! Yana urinib ko'r! 💪";
  }
}

// O'yin/viktorina ballariga qarab nishon turini aniqlaydi (eng yuqoridan pastga tekshiradi)
export function getBadgeForScore(score: number, thresholds: BadgeThresholds): BadgeTier | null {
  if (score >= thresholds.master) return 'master';
  if (score >= thresholds.diamond) return 'diamond';
  if (score >= thresholds.gold) return 'gold';
  if (score >= thresholds.silver) return 'silver';
  if (score >= thresholds.bronze) return 'bronze';
  return null;
}

export const badgeInfo: Record<BadgeTier, { label: string; emoji: string; color: string }> = {
  bronze: { label: 'Bronza nishon', emoji: '🥉', color: 'from-orange-300 to-orange-500' },
  silver: { label: 'Kumush nishon', emoji: '🥈', color: 'from-slate-300 to-slate-400' },
  gold: { label: 'Oltin nishon', emoji: '🥇', color: 'from-yellow-300 to-yellow-500' },
  diamond: { label: 'Olmos nishon', emoji: '💎', color: 'from-sky-300 to-cyan-500' },
  master: { label: 'Usta nishon', emoji: '👑', color: 'from-fuchsia-400 via-purple-400 to-indigo-500' },
};

export const BADGE_ORDER: BadgeTier[] = ['bronze', 'silver', 'gold', 'diamond', 'master'];

// ------------------------------------------------------------
// Daraja (level) va XP tizimi
// ------------------------------------------------------------

const XP_PER_LEVEL = 100;

export function levelFromXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function xpIntoCurrentLevel(xp: number): number {
  return xp % XP_PER_LEVEL;
}

export function xpNeededForNextLevel(): number {
  return XP_PER_LEVEL;
}
