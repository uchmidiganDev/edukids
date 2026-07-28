import { useCallback, useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

// Matnni ovozli o'qib berish (Web Speech API - Speech Synthesis).
// Eslatma: brauzer/qurilmada o'zbekcha ovoz mavjud bo'lmasligi mumkin -
// bunday holda mavjud bo'lgan eng yaqin ovoz bilan o'qiladi.
export function useSpeechSynthesis() {
  const { state } = useApp();
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    setSupported(true);

    function loadVoices() {
      voicesRef.current = window.speechSynthesis.getVoices();
    }
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const pickVoice = useCallback((): SpeechSynthesisVoice | undefined => {
    const voices = voicesRef.current;
    return (
      voices.find((v) => v.lang.toLowerCase().startsWith('uz')) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('ru')) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('tr')) ||
      voices[0]
    );
  }, []);

  const speak = useCallback((text: string) => {
    if (!supported || state.settings.muted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;
    utterance.pitch = 1.15;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [supported, state.settings.muted, pickVoice]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  return { speak, stop, speaking, supported };
}
