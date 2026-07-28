import { motion } from 'framer-motion';
import { AVATARS } from '../data/avatars';

interface AvatarPickerProps {
  selected: string;
  onSelect: (id: string) => void;
}

// Bolalar uchun rang-barang avatar tanlash paneli
export default function AvatarPicker({ selected, onSelect }: AvatarPickerProps) {
  return (
    <div className="grid grid-cols-5 gap-3" role="radiogroup" aria-label="Avatar tanlash">
      {AVATARS.map((a) => (
        <motion.button
          key={a.id}
          type="button"
          onClick={() => onSelect(a.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          role="radio"
          aria-checked={selected === a.id}
          aria-label={a.label}
          title={a.label}
          className={`flex aspect-square items-center justify-center rounded-2xl text-3xl shadow-sm transition ${
            selected === a.id ? 'bg-sunny-300 ring-4 ring-sunny-500' : 'bg-white hover:bg-slate-50 dark:bg-slate-700'
          }`}
        >
          {a.emoji}
        </motion.button>
      ))}
    </div>
  );
}
