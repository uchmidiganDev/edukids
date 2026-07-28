import { useCallback, useEffect, useRef, useState } from 'react';

export interface GameEngineOptions {
  duration?: number;
  lives?: number;
}

// Barcha o'yinlar uchun umumiy dvigatel: taymer, ball, jon (lives) va holatlarni boshqaradi.
export function useGameEngine({ duration = 45, lives }: GameEngineOptions = {}) {
  const hasLives = typeof lives === 'number';
  const [timeLeft, setTimeLeft] = useState(duration);
  const [score, setScore] = useState(0);
  const [livesLeft, setLivesLeft] = useState(lives ?? 0);
  const [combo, setCombo] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return undefined;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const finish = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setFinished(true);
  }, []);

  const addScore = useCallback((delta: number) => {
    setScore((s) => Math.max(0, s + delta));
  }, []);

  const registerCorrect = useCallback((basePoints: number) => {
    setCombo((c) => {
      const next = c + 1;
      const bonus = next >= 3 ? Math.floor(basePoints * 0.5) : 0;
      setScore((s) => Math.max(0, s + basePoints + bonus));
      return next;
    });
  }, []);

  const registerWrong = useCallback((penalty: number) => {
    setCombo(0);
    setScore((s) => Math.max(0, s - penalty));
    if (hasLives) {
      setLivesLeft((l) => {
        const next = l - 1;
        if (next <= 0) {
          finish();
        }
        return Math.max(0, next);
      });
    }
  }, [hasLives, finish]);

  const start = useCallback(() => {
    setScore(0);
    setCombo(0);
    setTimeLeft(duration);
    setLivesLeft(lives ?? 0);
    setFinished(false);
    setRunning(true);
  }, [duration, lives]);

  return {
    timeLeft,
    duration,
    score,
    combo,
    livesLeft,
    hasLives,
    running,
    finished,
    addScore,
    registerCorrect,
    registerWrong,
    start,
    restart: start,
    finish,
  };
}
