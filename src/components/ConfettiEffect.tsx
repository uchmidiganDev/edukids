import { useMemo } from 'react';

const COLORS = ['#f59e0b', '#0ea5e9', '#f0429c', '#22c55e', '#8b5cf6', '#facc15'];

interface ConfettiEffectProps {
  active: boolean;
  count?: number;
}

// `active` true bo'lganda ekranga konfetti (rangli qog'ozchalar) yog'diradi
export default function ConfettiEffect({ active, count = 70 }: ConfettiEffectProps) {
  const pieces = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.2 + Math.random() * 1.6,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 8,
      rotate: Math.random() * 360,
    }))
  ), [count, active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 animate-confettiFall rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.4,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
