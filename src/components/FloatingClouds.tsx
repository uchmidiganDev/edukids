interface CloudProps {
  className?: string;
  style?: React.CSSProperties;
}

function Cloud({ className, style }: CloudProps) {
  return (
    <svg className={className} style={style} width="120" height="60" viewBox="0 0 120 60" aria-hidden="true">
      <ellipse cx="30" cy="40" rx="28" ry="18" fill="white" />
      <ellipse cx="60" cy="28" rx="34" ry="24" fill="white" />
      <ellipse cx="92" cy="40" rx="26" ry="17" fill="white" />
      <rect x="20" y="38" width="80" height="18" rx="9" fill="white" />
    </svg>
  );
}

// Fon uchun sekin harakatlanuvchi bulutlar - dekorativ, screen-readerlarga ko'rinmaydi
export default function FloatingClouds({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <Cloud className="absolute top-[8%] opacity-70 animate-driftRight" style={{ animationDelay: '0s' }} />
      <Cloud className="absolute top-[22%] opacity-50 animate-driftRight" style={{ animationDelay: '-15s', width: 80, height: 40 }} />
      <Cloud className="absolute top-[45%] opacity-60 animate-driftLeft" style={{ animationDelay: '-8s' }} />
      <Cloud className="absolute top-[65%] opacity-40 animate-driftRight" style={{ animationDelay: '-25s', width: 90, height: 45 }} />
    </div>
  );
}
