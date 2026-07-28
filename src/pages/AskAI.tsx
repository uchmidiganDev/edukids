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

export default function AskAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, from: 'ai', text: `Salom! Men Bilag'on AI 🦉. Menga ${currentTopic.title} haqida savol ber, javob berishga harakat qilaman!` },
  ]);
  const [input, setInput] = useState('');
  const { speak } = useSpeechSynthesis();
  const { listening, transcript, supported: micSupported, start, stop } = useSpeechRecognition();
  const { playClick } = useSound();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (transcript) setInput(transcript);
  }, [transcript]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    playClick();
    const userMsg: ChatMessage = { id: Date.now(), from: 'user', text: trimmed };
    const reply = generateAiResponse(trimmed);
    const aiMsg: ChatMessage = { id: Date.now() + 1, from: 'ai', text: reply };
    setMessages((m) => [...m, userMsg, aiMsg]);
    setInput('');
    speak(reply.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, ''));
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <Mascot size={90} talkOnClick={false} />
        <h1 className="text-3xl font-extrabold text-slate-700 dark:text-white">✨ Bilag'on AI Yordamchi</h1>
        <p className="flex items-center gap-1 text-xs text-slate-400">
          <Info size={14} /> Bu oddiy dasturlashtirilgan yordamchi - internetga ulanish shart emas!
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
          className="flex-1 rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-sunny-400 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          aria-label="Savol matni"
        />
        {micSupported && (
          <button
            type="button"
            onClick={() => (listening ? stop() : start())}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-chunky-sm transition ${listening ? 'animate-pulse bg-candy-500 text-white' : 'bg-white text-slate-600 dark:bg-slate-700 dark:text-white'}`}
            aria-label={listening ? "Ovoz yozib olishni to'xtatish" : 'Ovoz orqali yozish'}
          >
            <Mic size={20} />
          </button>
        )}
        <BigButton type="submit" icon={Send} variant="primary">Yubor</BigButton>
      </form>
    </div>
  );
}
