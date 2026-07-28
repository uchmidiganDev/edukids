import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Mascot from './Mascot';

// Lottie (lottie-web) hajmi katta bo'lgani uchun asosiy JS to'plamini
// og'irlashtirmasligi uchun faqat shu yerda, lazy tarzda yuklanadi
const LottieStar = lazy(() => import('./LottieStar'));

// Sayt birinchi marta ochilganda ko'rinadigan qisqa yuklanish animatsiyasi
export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-sunny-200 via-bubble-100 to-candy-100"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="relative">
        <Suspense fallback={<div style={{ width: 110, height: 110 }} />}>
          <LottieStar size={110} />
        </Suspense>
        <div className="absolute inset-0 flex items-center justify-center">
          <Mascot size={90} floating talkOnClick={false} />
        </div>
      </div>
      <p className="font-rounded mt-4 text-lg font-bold text-slate-600">EduKids yuklanmoqda...</p>
    </motion.div>
  );
}
