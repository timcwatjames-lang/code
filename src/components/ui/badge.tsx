import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-gray-800 text-gray-300': variant === 'default',
          'bg-violet-500/10 text-violet-400': variant === 'primary',
          'bg-emerald-500/10 text-emerald-400': variant === 'success',
          'bg-amber-500/10 text-amber-400': variant === 'warning',
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
