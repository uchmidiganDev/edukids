// Kunlik mativatsion iqtiboslar, maslahatlar va "Bilag'on AI" javoblari uchun matnlar

export const motivationalQuotes: string[] = [
  "Bilim — bu eng kuchli qurol! 💪",
  "Har kuni ozgina o'rgan, katta bo'lib buyuk bo'l! 🌟",
  "Xato qilishdan qo'rqma — xatolardan o'rganamiz! 🚀",
  "Sen buni uddalaysan, ishonch bilan davom et! ⭐",
  "Bilim olish — eng qiziqarli sayohat! 📚",
  "Har bir savol — yangi kashfiyot eshigi! 🔑",
  "Kichik qadamlar katta g'alabalarga olib boradi! 👣",
  "O'rganish — bu o'yin, zavqlanib o'rgan! 🎉",
  "Sen bugun kimningdir hayotini xavfsiz qilishing mumkin! 🛡️",
  "Bilimli bola — baxtli bola! 😊",
  "Har kuni bir yangi narsa — bir yil ichida 365 ta kashfiyot! 🎯",
  "Sen o'zing o'ylaganingdan ham aqllisan! 🧠",
];

export const dailyTips: string[] = [
  "Har kuni kamida bitta yangi narsa o'rganishga harakat qil!",
  "Xavfsizlik qoidalarini har doim yodda tut!",
  "Do'stlaringga ham o'rgangan narsalaringni o'rgat!",
  "Kattalardan savol berishdan tortinma!",
  "Har bir yutuq uchun o'zingni maqta!",
  "Bugun sinab ko'rmagan o'yinni sinab ko'r!",
  "Kunlik mukofotingni olishni unutma!",
];

export const aiEncouragements: string[] = [
  "Ajoyib harakat! Davom et! 🌟",
  "Sen haqiqiy chempionsan! 🏆",
  "Zo'r! Bilag'on sendan faxrlanadi! 🦉",
  "Yana bir qadam — sen buni uddalaysan! 💪",
  "Miyang bugun juda yaxshi ishladi! 🧠✨",
];

export const aiWrongAnswerIntros: string[] = [
  "Hech qisi yo'q! Bilag'on AI senga tushuntirib beradi:",
  "Xato qilish — o'rganishning bir qismi! Mana sabab:",
  "Kichik xato, katta bilim! Keling, ko'ramiz:",
  "Bilag'on aytadi: bu yerda muhim narsa bor —",
];

export function getRandomFrom(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

export function getRandomQuote(): string {
  return getRandomFrom(motivationalQuotes);
}

export function getDailyTip(): string {
  const dayIndex = new Date().getDate() % dailyTips.length;
  return dailyTips[dayIndex];
}

export function getRandomEncouragement(): string {
  return getRandomFrom(aiEncouragements);
}

export function getRandomWrongIntro(): string {
  return getRandomFrom(aiWrongAnswerIntros);
}
