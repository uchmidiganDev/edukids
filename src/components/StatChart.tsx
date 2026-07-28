import { motion } from 'framer-motion';

export interface BarDatum {
  label: string;
  value: number;
  color: string;
  emoji?: string;
}

interface BarChartProps {
  data: BarDatum[];
  unit?: string;
}

// Oddiy, ochiq va bolalar uchun tushunarli gorizontal ustunli diagramma (bar chart).
// Har bir ustun to'g'ridan-to'g'ri (direct label) qiymati bilan belgilanadi - rangga bog'liq bo'lmagan holda ham o'qiladi.
export function BarChart({ data, unit = '' }: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="flex flex-col gap-3" role="img" aria-label="Statistik diagramma">
      {data.map((d, i) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-28 shrink-0 truncate text-sm font-semibold text-slate-600 dark:text-slate-300">
            {d.emoji && <span aria-hidden="true">{d.emoji} </span>}
            {d.label}
          </span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: d.color }}
              initial={{ width: 0 }}
              animate={{ width: `${(d.value / max) * 100}%` }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
            />
          </div>
          <span className="w-14 shrink-0 text-right text-sm font-extrabold text-slate-700 dark:text-white">
            {d.value}{unit}
          </span>
        </div>
      ))}
    </div>
  );
}

interface StatRingProps {
  percent: number;
  color: string;
  label: string;
}

// Doiraviy progress (masalan, o'rganish foizi) uchun kichik "stat ring"
export function StatRing({ percent, color, label }: StatRingProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, percent) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={110} height={110} viewBox="0 0 110 110" role="img" aria-label={`${label}: ${percent}%`}>
        <circle cx="55" cy="55" r={radius} fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-700" strokeWidth="10" />
        <motion.circle
          cx="55" cy="55" r={radius} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          transform="rotate(-90 55 55)"
        />
        <text x="55" y="60" textAnchor="middle" className="fill-slate-700 text-xl font-extrabold dark:fill-white">
          {Math.round(percent)}%
        </text>
      </svg>
      <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</span>
    </div>
  );
}
