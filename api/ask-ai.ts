import type { VercelRequest, VercelResponse } from '@vercel/node';
import { askGemini, type ChatTurn } from './_lib/askAi.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Faqat POST so\'rovlar qo\'llab-quvvatlanadi.' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const message: string = body?.message ?? '';
    const history: ChatTurn[] = Array.isArray(body?.history) ? body.history : [];

    const result = await askGemini(message, history);
    res.status(200).json(result);
  } catch (err) {
    const messageText = err instanceof Error ? err.message : 'Noma\'lum xatolik yuz berdi.';
    res.status(500).json({ error: messageText });
  }
}
