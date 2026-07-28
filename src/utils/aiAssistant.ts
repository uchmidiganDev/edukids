import { currentTopic } from '../data/topics';
import { getRandomEncouragement } from '../data/quotes';

// Bilag'on AI - bu haqiqiy AI/LLM emas, balki oddiy kalit so'z bo'yicha
// moslashtiruvchi (rule-based) yordamchi. Backend yoki API kaliti talab qilinmaydi,
// shuning uchun sayt to'liq oflayn va bepul ishlaydi.

const GREETINGS = ['salom', 'assalomu', 'alaykum', 'hey', 'hi', 'qalaysan'];
const THANKS = ['rahmat', 'tashakkur'];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zo'g'ʻ\s]/gi, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

export function generateAiResponse(userText: string): string {
  const lower = userText.toLowerCase();

  if (GREETINGS.some((g) => lower.includes(g))) {
    return `Salom! Men Bilag'on AI - senga ${currentTopic.title} mavzusida yordam beraman. Nima bilmoqchisan? 🦉`;
  }
  if (THANKS.some((t) => lower.includes(t))) {
    return `Arzimaydi! ${getRandomEncouragement()}`;
  }

  const questionWords = new Set(tokenize(userText));
  if (questionWords.size === 0) {
    return "Savolingni to'liqroq yozib ko'r, men senga yordam berishga harakat qilaman! 😊";
  }

  let bestScore = 0;
  let bestText = '';
  for (const card of currentTopic.learning) {
    const cardWords = new Set(tokenize(`${card.title} ${card.text} ${card.example}`));
    let score = 0;
    questionWords.forEach((w) => { if (cardWords.has(w)) score += 1; });
    if (score > bestScore) {
      bestScore = score;
      bestText = `${card.emoji} ${card.text}`;
    }
  }

  for (const q of currentTopic.quiz) {
    const qWords = new Set(tokenize(`${q.question} ${q.explanation}`));
    let score = 0;
    questionWords.forEach((w) => { if (qWords.has(w)) score += 1; });
    if (score > bestScore) {
      bestScore = score;
      bestText = `💡 ${q.explanation}`;
    }
  }

  if (bestScore >= 1) {
    return `${bestText}\n\n${getRandomEncouragement()}`;
  }

  return `Hmm, bu haqida "O'rganish" bo'limida ko'proq ma'lumot bor! Yoki menga ${currentTopic.title} haqida boshqacha savol ber. 🤔`;
}
