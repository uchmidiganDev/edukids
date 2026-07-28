import { useMemo } from 'react';

interface ParticleBackgroundProps {
  count?: number;
  className?: string;
  rainbow?: boolean;
}

// Fon uchun yaltiroq yulduzchalar - dekorativ zarrachalar qatlami
export default function ParticleBackground({ count = 24, className = '', rainbow = false }: ParticleBackgroundProps) {
  const stars = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 4 + Math.random() * 10,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      hue: Math.floor(Math.random() * 360),
    }))
  ), [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute animate-sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            fontSize: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            color: rainbow ? `hsl(${s.hue} 90% 70%)` : '#fde68a',
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
