export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-primary-400 dark:bg-primary-600 ${className}`}
    />
  );
}
