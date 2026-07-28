import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSound } from '../hooks/useSound';
import type { LucideIcon } from 'lucide-react';

const variants = {
  primary: 'bg-sunny-400 hover:bg-sunny-500 text-white',
  secondary: 'bg-bubble-400 hover:bg-bubble-500 text-white',
  success: 'bg-leafy-500 hover:bg-leafy-600 text-white',
  danger: 'bg-candy-500 hover:bg-candy-600 text-white',
  purple: 'bg-grape-500 hover:bg-grape-600 text-white',
  white: 'bg-white hover:bg-slate-50 text-slate-700',
};

interface Ripple {
  id: number;
  x: number;
  y: number;
}

type ConflictingHandlers = 'onClick' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd';

interface BigButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingHandlers> {
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  to?: string;
  variant?: keyof typeof variants;
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
  playSound?: boolean;
}

// Bolalar uchun katta, yumaloq, "bosiladigan" tugma - suzuvchi (ripple) effekt bilan. `to` berilsa router Link bo'ladi.
export default function BigButton({
  children,
  onClick,
  to,
  variant = 'primary',
  icon: Icon,
  className = '',
  disabled = false,
  type = 'button',
  playSound = true,
  ...rest
}: BigButtonProps) {
  const { playClick } = useSound();
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const classes = `relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-3xl px-8 py-4 text-lg font-extrabold shadow-chunky transition-all active:translate-y-1.5 active:shadow-none disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${className}`;

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    if (playSound) playClick();
    onClick?.(e);
  };

  const rippleLayer = (
    <AnimatePresence>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/50"
          style={{ left: r.x, top: r.y, translateX: '-50%', translateY: '-50%' }}
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{ width: 220, height: 220, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </AnimatePresence>
  );

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.05 },
    whileTap: disabled ? {} : { scale: 0.96 },
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={classes} onClick={handleClick} {...(rest as Record<string, unknown>)}>
          {rippleLayer}
          {Icon && <Icon size={22} aria-hidden="true" />}
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
      {...rest}
    >
      {rippleLayer}
      {Icon && <Icon size={22} aria-hidden="true" />}
      {children}
    </motion.button>
  );
}
