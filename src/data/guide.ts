// Video bo'limi uchun umumiy sayt qo'llanmasi (mavzudan qat'i nazar bir xil)

export interface GuideItem {
  id: number;
  emoji: string;
  title: string;
  text: string;
}

export const usageGuide: GuideItem[] = [
  {
    id: 1,
    emoji: '📖',
    title: "Saytdan qanday foydalanish kerak?",
    text: "Yuqoridagi menyudan istalgan bo'limni tanlang: O'rganish, Viktorina, O'yin yoki Video. Har bir bo'lim rang-barang va qiziqarli!",
  },
  {
    id: 2,
    emoji: '✅',
    title: "Viktorinani qanday yakunlash kerak?",
    text: "Har bir savolga 4 tadan javob variantidan bittasini tanlang. Sizda 3 ta jon (hayot) bor — ehtiyot bo'ling! Barcha savollarga javob bering va yakuniy natijangizni ko'ring.",
  },
  {
    id: 3,
    emoji: '🎮',
    title: "O'yinlarni qanday o'ynash kerak?",
    text: "Har bir mavzuda 3 tadan turli o'yin bor. O'yinni tanlang, ko'rsatmalarni o'qing va vaqt ichida topshiriqni bajaring. Tanga va XP to'playsiz!",
  },
  {
    id: 4,
    emoji: '🏆',
    title: "Mukofot va sertifikatlarni qanday olish kerak?",
    text: "Ball to'plab Bronza, Kumush, Oltin, Olmos va Usta nishonlarini yutib oling. Barcha bo'limlarni tugatsangiz, chiroyli sertifikat yaratib, uni yuklab olishingiz mumkin!",
  },
];
