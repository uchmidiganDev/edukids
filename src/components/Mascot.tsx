import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useSound } from '../hooks/useSound';

interface MascotProps {
  size?: number;
  message?: string;
  className?: string;
  floating?: boolean;
  talkOnClick?: boolean;
}

// Bilag'on - saytning do'stona va gapiradigan boyqush maskoti
export default function Mascot({ size = 160, message, className = '', floating = true, talkOnClick = true }: MascotProps) {
  const { bumpEasterEgg, unlockAchievement, pushToast } = useApp();
  const { speak } = useSpeechSynthesis();
  const { playClick } = useSound();

  const wrapperMotion = floating
    ? { animate: { y: [0, -14, 0] }, transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }
    : {};

  function handleClick() {
    if (!talkOnClick) return;
    playClick();
    if (message) speak(message);
    const count = bumpEasterEgg('mascot-click');
    if (count === 10) {
      unlockAchievement('mascot-lover');
      pushToast('achievement', "Yashirin yutuq ochildi! Bilag'onni 10 marta silading!", '🦉💕');
    }
  }

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="mb-3 max-w-[260px] rounded-3xl rounded-bl-none bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-chunky-sm dark:bg-slate-700 dark:text-white"
          role="status"
        >
          {message}
        </motion.div>
      )}
      <motion.svg
        {...wrapperMotion}
        width={size}
        height={size}
        viewBox="0 0 200 200"
        role="img"
        aria-label="Bilag'on - do'stona gapiradigan boyqush maskot. Bosing - u gapiradi!"
        onClick={handleClick}
        style={{ cursor: talkOnClick ? 'pointer' : 'default' }}
        tabIndex={talkOnClick ? 0 : undefined}
        onKeyDown={(e) => { if (talkOnClick && (e.key === 'Enter' || e.key === ' ')) handleClick(); }}
        whileHover={talkOnClick ? { scale: 1.05 } : undefined}
        whileTap={talkOnClick ? { scale: 0.95 } : undefined}
      >
        <motion.ellipse
          cx="46" cy="120" rx="20" ry="34" fill="#f59e0b"
          animate={{ rotate: [0, -12, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '46px 100px' }}
        />
        <motion.ellipse
          cx="154" cy="120" rx="20" ry="34" fill="#f59e0b"
          animate={{ rotate: [0, 12, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '154px 100px' }}
        />
        <ellipse cx="100" cy="115" rx="62" ry="66" fill="#fbbf24" />
        <ellipse cx="100" cy="128" rx="38" ry="42" fill="#fff7e6" />
        <ellipse cx="64" cy="140" rx="14" ry="22" fill="#f59e0b" />
        <ellipse cx="136" cy="140" rx="14" ry="22" fill="#f59e0b" />
        <path d="M62 58 L74 30 L86 60 Z" fill="#f59e0b" />
        <path d="M138 58 L126 30 L114 60 Z" fill="#f59e0b" />
        <circle cx="78" cy="92" r="26" fill="white" />
        <circle cx="122" cy="92" r="26" fill="white" />
        <motion.circle
          cx="80" cy="94" r="12" fill="#3b2b12"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
          style={{ transformOrigin: '80px 94px' }}
        />
        <motion.circle
          cx="120" cy="94" r="12" fill="#3b2b12"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
          style={{ transformOrigin: '120px 94px' }}
        />
        <circle cx="84" cy="89" r="3.5" fill="white" />
        <circle cx="124" cy="89" r="3.5" fill="white" />
        <path d="M92 108 L108 108 L100 122 Z" fill="#fb923c" />
        <path d="M84 178 L80 190 M84 178 L88 190" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
        <path d="M116 178 L112 190 M116 178 L120 190" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
        <circle cx="58" cy="108" r="8" fill="#fb6fbb" opacity="0.6" />
        <circle cx="142" cy="108" r="8" fill="#fb6fbb" opacity="0.6" />
      </motion.svg>
    </div>
  );
}
