import { motion } from 'framer-motion';
import type { HeroIllustrationKey } from '../types';

interface IllustrationProps {
  size?: number;
}

function Base({ children, label, size = 240 }: IllustrationProps & { children: React.ReactNode; label: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

export function RoadIllustration(props: IllustrationProps) {
  return (
    <Base label="Yo'l va svetofor tasviri" {...props}>
      <rect x="0" y="150" width="240" height="90" fill="#94a3b8" />
      <rect x="0" y="150" width="240" height="10" fill="#cbd5e1" />
      <rect x="30" y="180" width="26" height="10" rx="3" fill="#fff" />
      <rect x="90" y="180" width="26" height="10" rx="3" fill="#fff" />
      <rect x="150" y="180" width="26" height="10" rx="3" fill="#fff" />
      <rect x="210" y="180" width="26" height="10" rx="3" fill="#fff" />
      <rect x="165" y="40" width="16" height="115" rx="4" fill="#475569" />
      <rect x="148" y="20" width="50" height="90" rx="14" fill="#1e293b" />
      <circle cx="173" cy="42" r="12" fill="#ef4444" />
      <circle cx="173" cy="66" r="12" fill="#facc15" />
      <circle cx="173" cy="90" r="12" fill="#22c55e" />
      <circle cx="60" cy="130" r="20" fill="#fbbf24" />
      <rect x="48" y="150" width="24" height="30" rx="6" fill="#0ea5e9" />
      <motion.circle cx="120" cy="120" r="6" fill="#fde68a" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
    </Base>
  );
}

export function FireIllustration(props: IllustrationProps) {
  return (
    <Base label="Yong'in xavfsizligi tasviri" {...props}>
      <rect x="40" y="120" width="160" height="100" rx="10" fill="#fde68a" />
      <path d="M40 120 L120 60 L200 120 Z" fill="#f87171" />
      <rect x="100" y="160" width="40" height="60" fill="#92400e" />
      <motion.g animate={{ scale: [1, 1.08, 1], y: [0, -4, 0] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ transformOrigin: '150px 150px' }}>
        <path d="M150 190 C130 170 140 150 150 130 C165 155 175 160 168 185 C165 198 155 200 150 190 Z" fill="#f97316" />
        <path d="M150 185 C140 172 145 160 150 148 C158 165 163 168 159 182 C157 190 152 190 150 185 Z" fill="#fde047" />
      </motion.g>
      <circle cx="70" cy="150" r="14" fill="#38bdf8" />
      <rect x="63" y="150" width="14" height="30" rx="4" fill="#0ea5e9" />
    </Base>
  );
}

export function ShieldIllustration(props: IllustrationProps) {
  return (
    <Base label="Internet xavfsizligi (qalqon) tasviri" {...props}>
      <circle cx="120" cy="120" r="100" fill="#ede9fe" />
      <path d="M120 40 L180 62 V120 C180 160 150 190 120 200 C90 190 60 160 60 120 V62 Z" fill="#8b5cf6" />
      <path d="M120 55 L166 72 V120 C166 152 143 176 120 185 C97 176 74 152 74 120 V72 Z" fill="#a78bfa" />
      <motion.path
        d="M100 118 L114 132 L142 100"
        stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.3, repeat: Infinity, repeatDelay: 2 }}
      />
      <circle cx="55" cy="70" r="8" fill="#38bdf8" />
      <circle cx="190" cy="90" r="6" fill="#fb6fbb" />
      <circle cx="185" cy="160" r="7" fill="#facc15" />
    </Base>
  );
}

export function RecycleIllustration(props: IllustrationProps) {
  return (
    <Base label="Chiqindilarni saralash tasviri" {...props}>
      <circle cx="120" cy="120" r="100" fill="#dcfce7" />
      <rect x="70" y="110" width="100" height="90" rx="12" fill="#22c55e" />
      <rect x="62" y="95" width="116" height="20" rx="8" fill="#16a34a" />
      <rect x="100" y="80" width="40" height="18" rx="6" fill="#16a34a" />
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '120px 145px' }}>
        <path d="M120 125 L132 145 L120 165 L108 145 Z" fill="white" opacity="0.9" />
        <circle cx="120" cy="145" r="26" fill="none" stroke="white" strokeWidth="5" strokeDasharray="14 10" />
      </motion.g>
      <circle cx="55" cy="60" r="10" fill="#fbbf24" />
      <circle cx="195" cy="70" r="8" fill="#38bdf8" />
      <circle cx="190" cy="180" r="9" fill="#fb6fbb" />
    </Base>
  );
}

export const illustrationMap: Record<HeroIllustrationKey, (props: IllustrationProps) => JSX.Element> = {
  road: RoadIllustration,
  fire: FireIllustration,
  shield: ShieldIllustration,
  recycle: RecycleIllustration,
};
