import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSound } from '../hooks/useSound';
import type { LucideIcon } from 'lucide-react';

interface NavCardProps {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  index?: number;
  done?: boolean;
}

// Bosh sahifadagi asosiy bo'limlarga o'tish kartochkasi
export default function NavCard({ to, icon: Icon, title, description, gradient, index = 0, done }: NavCardProps) {
  const { playClick } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        to={to}
        onClick={playClick}
        className={`relative flex h-full flex-col items-center gap-3 rounded-3xl bg-gradient-to-br ${gradient} p-6 text-center text-white shadow-chunky`}
      >
        {done && (
          <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow" aria-label="Bajarildi">
            ✅
          </span>
        )}
        <div className="rounded-full bg-white/25 p-4">
          <Icon size={36} aria-hidden="true" />
        </div>
        <h3 className="text-xl font-extrabold">{title}</h3>
        <p className="text-sm font-medium text-white/90">{description}</p>
      </Link>
    </motion.div>
  );
}
