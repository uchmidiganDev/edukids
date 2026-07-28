import type { AchievementDefinition } from '../types';

// Oddiy yutuqlar (profilda ko'rinadi) va yashirin yutuqlar (easter egg orqali ochiladi)
export const ACHIEVEMENTS: AchievementDefinition[] = [
  { id: 'first-steps', title: 'Birinchi qadam', description: "O'rganish bo'limini birinchi marta ochding", emoji: '🚶' },
  { id: 'quiz-master', title: 'Viktorina ustasi', description: 'Birinchi viktorinani yakunlading', emoji: '🎯' },
  { id: 'gamer', title: "O'yinchi", description: "Birinchi o'yinni tugatding", emoji: '🎮' },
  { id: 'video-watcher', title: 'Tomoshabin', description: "Video bo'limini ko'rding", emoji: '🎥' },
  { id: 'perfect-score', title: 'Mukammal natija', description: "Viktorinada 100% ball to'plading", emoji: '💯' },
  { id: 'coin-collector', title: "Tanga yig'uvchi", description: "100 ta tanga to'plading", emoji: '🪙' },
  { id: 'level-5', title: '5-daraja ustasi', description: "5-darajaga yetding", emoji: '⭐' },
  { id: 'all-badges', title: 'Nishonlar ustasi', description: "Barcha 5 xil nishon turini qo'lga kiriting", emoji: '🏅' },
  { id: 'streak-3', title: 'Barqaror o\'quvchi', description: '3 kun ketma-ket saytga tashrif buyurding', emoji: '🔥' },
  { id: 'mascot-lover', title: "Bilag'onning sirdoshi", description: "Bilag'onni 10 marta silading (yashirin yutuq!)", emoji: '🦉', hidden: true },
  { id: 'night-owl', title: 'Tungi bilimdon', description: "Tungi rejimni yoqding (yashirin yutuq!)", emoji: '🌙', hidden: true },
  { id: 'logo-secret', title: 'Maxfiy kashfiyotchi', description: "Logotipni 7 marta bosib, sirni topding!", emoji: '✨', hidden: true },
  { id: 'heart-clicker', title: 'Yurak kashfiyotchisi', description: "Footerdagi yurakni 5 marta bosding!", emoji: '💗', hidden: true },
];

export function getAchievement(id: string): AchievementDefinition | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
