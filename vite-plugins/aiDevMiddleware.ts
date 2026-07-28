import type { Plugin } from 'vite';

// `npm run dev` paytida /api/ask-ai so'rovini to'g'ridan-to'g'ri Vite dev-serverida
// ishlaydi qilish uchun kichik plugin (Vercel/Netlify CLI kerak emas).
export function aiDevMiddleware(): Plugin {
  return {
    name: 'edukids-ai-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/ask-ai', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Faqat POST so'rovlar qo'llab-quvvatlanadi." }));
          return;
        }

        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const body = JSON.parse(Buffer.concat(chunks).toString('utf-8') || '{}');

          // Shared mantiqni dinamik import qilamiz - shunda .env o'zgarishlari ham qayta yuklanadi
          const { askGemini } = await import('../api/_lib/askAi');
          const result = await askGemini(body?.message ?? '', Array.isArray(body?.history) ? body.history : []);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        } catch (err) {
          const messageText = err instanceof Error ? err.message : "Noma'lum xatolik yuz berdi.";
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: messageText }));
        }
      });
    },
  };
}
