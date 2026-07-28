import { AnimatePresence, motion } from 'framer-motion';

// Ketma-ket to'g'ri javoblar sonini (combo) ko'rsatadigan chaqmoqli belgi
export default function ComboBadge({ combo }: { combo: number }) {
  return (
    <AnimatePresence>
      {combo >= 2 && (
        <motion.span
          key={combo}
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-400 to-candy-500 px-3 py-1 text-xs font-extrabold text-white shadow"
        >
          🔥 {combo}x Combo!
        </motion.span>
      )}
    </AnimatePresence>
  );
}
