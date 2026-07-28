import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Info } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { getDailyTip } from '../data/quotes';
import { generateAiResponse } from '../utils/aiAssistant';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSound } from '../hooks/useSound';
import Mascot from '../components/Mascot';
import BigButton from '../components/BigButton';

interface ChatMessage {
  id: number;
  from: 'user' | 'ai';
  text: string;
}

// Bekend (Gemini) javob bermasa (masalan GitHub Pages'da - u yerda serverless funksiya yo'q,
// yoki tarmoq/kalit xatosi bo'lsa), oddiy kalit-so'z asosidagi yordamchiga muloyimlik bilan o'tamiz.
async function askBackend(message: string, history: ChatMessage[]): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const response = await fetch('/api/ask-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history: history.slice(-6).map((m) => ({ role: m.from === 'ai' ? 'model' : 'user', text: m.text })),
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) return null;
    const data = await response.json();
    return typeof data?.reply === 'string' ? data.reply : null;
  } catch {
    return null;
  }
}

export default function AskAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, from: 'ai', text: `Salom! Men Bilag'on AI 🦉. Menga ${currentTopic.title} haqida savol ber, javob berishga harakat qilaman!` },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const { speak } = useSpeechSynthesis();
  const { listening, transcript, supported: micSupported, start, stop } = useSpeechRecognition();
  const { playClick } = useSound();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  useEffect(() => {
    if (transcript) setInput(transcript);
  }, [transcript]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;
    playClick();
    const userMsg: ChatMessage = { id: Date.now(), from: 'user', text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setThinking(true);

    const backendReply = await askBackend(trimmed, messages);
    const reply = backendReply ?? generateAiResponse(trimmed);

    setThinking(false);
    setMessages((m) => [...m, { id: Date.now() + 1, from: 'ai', text: reply }]);
    speak(reply.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, ''));
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <Mascot size={90} talkOnClick={false} />
        <h1 className="text-3xl font-extrabold text-slate-700 dark:text-white">✨ Bilag'on AI Yordamchi</h1>
        <p className="flex items-center gap-1 text-xs text-slate-400">
          <Info size={14} /> Faqat "{currentTopic.title}" mavzusi bo'yicha savol ber!
        </p>
        <div className="mt-2 rounded-2xl bg-grape-50 px-4 py-2 text-sm font-semibold text-grape-700 dark:bg-slate-800 dark:text-grape-200">
          💡 Bugungi maslahat: {getDailyTip()}
        </div>
      </div>

      <div className="flex h-[420px] flex-col gap-3 overflow-y-auto rounded-3xl bg-white p-5 shadow-chunky-sm dark:bg-slate-800">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2 text-sm font-medium ${
              m.from === 'ai'
                ? 'self-start bg-bubble-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100'
                : 'self-end bg-sunny-400 text-white'
            }`}
          >
            {m.text}
          </motion.div>
        ))}
        {thinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex max-w-[85%] items-center gap-1 self-start rounded-2xl bg-bubble-100 px-4 py-3 dark:bg-slate-700"
            aria-label="Bilag'on o'ylayapti..."
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-bubble-500"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
        className="flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Savolingizni yozing..."
          disabled={thinking}
          className="flex-1 rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-sunny-400 focus:outline-none disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          aria-label="Savol matni"
        />
        {micSupported && (
          <button
            type="button"
            onClick={() => (listening ? stop() : start())}
            disabled={thinking}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-chunky-sm transition disabled:opacity-60 ${listening ? 'animate-pulse bg-candy-500 text-white' : 'bg-white text-slate-600 dark:bg-slate-700 dark:text-white'}`}
            aria-label={listening ? "Ovoz yozib olishni to'xtatish" : 'Ovoz orqali yozish'}
          >
            <Mic size={20} />
          </button>
        )}
        <BigButton type="submit" icon={Send} variant="primary" disabled={thinking}>Yubor</BigButton>
      </form>
    </div>
  );
}
