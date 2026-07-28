// Yuklanish paytida ko'rsatiladigan "skeleton" (soyabon) placeholder
export default function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-700/50 ${className}`}
      aria-hidden="true"
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-chunky-sm dark:bg-slate-800">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}
