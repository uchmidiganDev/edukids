import { currentTopic } from '../../src/data/topics';

// Gemini bilan ishlaydigan umumiy (Vercel va Netlify uchun bir xil) mantiq.
// Bu fayl faqat server tomonida ishlaydi - API kaliti hech qachon brauzerga yuborilmaydi.

const GEMINI_MODEL = 'gemini-2.5-flash';

export interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

export interface AskAiResult {
  reply: string;
}

function buildTopicContext(): string {
  return currentTopic.learning
    .map((card) => `- ${card.title}: ${card.text}`)
    .join('\n');
}

function buildSystemPrompt(): string {
  return `Sen "Bilag'on" ismli do'stona AI yordamchisan. Sen "EduKids" nomli 6-12 yoshli bolalar uchun ta'lim platformasida ishlaysan.

Sening yagona vazifang - FAQAT "${currentTopic.title}" mavzusi bo'yicha bolalarga yordam berish.

QAT'IY QOIDALAR:
1. Faqat "${currentTopic.title}" mavzusiga oid savollarga javob ber (qoidalar, maslahatlar, misollar, sabab-oqibatlar).
2. Agar savol ushbu mavzuga aloqasi bo'lmasa (masalan: matematika, boy fanlari, uy vazifasi, o'yinlar, umumiy suhbat, siyosat, boshqa mavzular va h.k.), unga JAVOB BERMA. O'rniga muloyimlik bilan rad et va foydalanuvchini "${currentTopic.title}" haqida so'rashga taklif qil.
3. Javoblaring juda oddiy, qisqa (2-4 gap), 6-12 yoshli bolaga tushunarli bo'lsin.
4. Har doim o'zbek tilida (lotin yozuvida), mehribon, quvnoq va rag'batlantiruvchi ohangda yoz. Kerak bo'lsa emoji ishlat.
5. Hech qachon zararli, qo'rqinchli, yoshga mos bo'lmagan yoki shaxsiy ma'lumot so'raydigan kontent yaratma.

Mavzu bo'yicha asosiy ma'lumotlar (javoblaringni shularga tayangan holda ber):
${buildTopicContext()}`;
}

export async function askGemini(message: string, history: ChatTurn[] = []): Promise<AskAiResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY sozlanmagan (server muhit o\'zgaruvchisi topilmadi).');
  }
  const trimmed = message.trim().slice(0, 500);
  if (!trimmed) {
    throw new Error('Savol matni bo\'sh bo\'lishi mumkin emas.');
  }

  const contents = [
    ...history.slice(-6).map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text.slice(0, 500) }],
    })),
    { role: 'user', parts: [{ text: trimmed }] },
  ];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 500,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Gemini API xatosi (${response.status}): ${errText.slice(0, 300)}`);
  }

  interface GeminiResponse {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  }
  const data = (await response.json()) as GeminiResponse;
  const reply: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!reply) {
    throw new Error('Gemini javob qaytarmadi.');
  }

  return { reply: reply.trim() };
}
