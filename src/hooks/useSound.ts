import { useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';

// Ovoz effektlari tashqi audio fayllarsiz, to'g'ridan-to'g'ri brauzerning
// Web Audio API yordamida "sintez qilinadi" - shuning uchun internetsiz ham ishlaydi.
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

interface Note {
  freq: number;
  start: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
}

function playTone(ctx: AudioContext, { freq, start, duration, type = 'sine', volume = 0.22 }: Note) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
  gain.gain.setValueAtTime(0, ctx.currentTime + start);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration + 0.05);
}

export function useSound() {
  const { state } = useApp();
  const mutedRef = useRef(state.settings.muted);
  mutedRef.current = state.settings.muted;

  const run = useCallback((sequence: Note[]) => {
    if (mutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    sequence.forEach((note) => playTone(ctx, note));
  }, []);

  const playClick = useCallback(() => {
    run([{ freq: 720, start: 0, duration: 0.09, type: 'triangle', volume: 0.15 }]);
  }, [run]);

  const playCorrect = useCallback(() => {
    run([
      { freq: 523.25, start: 0, duration: 0.14, type: 'sine' },
      { freq: 783.99, start: 0.1, duration: 0.22, type: 'sine' },
    ]);
  }, [run]);

  const playWrong = useCallback(() => {
    run([
      { freq: 300, start: 0, duration: 0.18, type: 'sawtooth', volume: 0.18 },
      { freq: 180, start: 0.12, duration: 0.22, type: 'sawtooth', volume: 0.18 },
    ]);
  }, [run]);

  const playVictory = useCallback(() => {
    run([
      { freq: 523.25, start: 0, duration: 0.15 },
      { freq: 659.25, start: 0.12, duration: 0.15 },
      { freq: 783.99, start: 0.24, duration: 0.15 },
      { freq: 1046.5, start: 0.36, duration: 0.4 },
    ]);
  }, [run]);

  const playCoin = useCallback(() => {
    run([
      { freq: 988, start: 0, duration: 0.08, type: 'square', volume: 0.14 },
      { freq: 1318, start: 0.06, duration: 0.14, type: 'square', volume: 0.14 },
    ]);
  }, [run]);

  const playWhoosh = useCallback(() => {
    run([{ freq: 200, start: 0, duration: 0.25, type: 'sine', volume: 0.1 }]);
  }, [run]);

  return { playClick, playCorrect, playWrong, playVictory, playCoin, playWhoosh };
}
