import type { Handler } from '@netlify/functions';
import { askGemini, type ChatTurn } from '../../api/_lib/askAi.js';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Faqat POST so\'rovlar qo\'llab-quvvatlanadi.' }) };
  }

  try {
    const body = JSON.parse(event.body ?? '{}');
    const message: string = body?.message ?? '';
    const history: ChatTurn[] = Array.isArray(body?.history) ? body.history : [];

    const result = await askGemini(message, history);
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err) {
    const messageText = err instanceof Error ? err.message : 'Noma\'lum xatolik yuz berdi.';
    return { statusCode: 500, body: JSON.stringify({ error: messageText }) };
  }
};
