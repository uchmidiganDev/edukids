import { Home } from 'lucide-react';
import Mascot from '../components/Mascot';
import BigButton from '../components/BigButton';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-4 text-center">
      <Mascot size={140} message="Voy! Bu sahifani topa olmadim..." />
      <h1 className="text-3xl font-extrabold text-slate-700 dark:text-white">404 - Sahifa topilmadi</h1>
      <p className="max-w-md text-slate-600 dark:text-slate-300">
        Siz izlagan sahifa mavjud emas. Keling, bosh sahifaga qaytamiz!
      </p>
      <BigButton to="/" icon={Home} variant="primary">Bosh sahifaga qaytish</BigButton>
    </div>
  );
}
