import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700':
            variant === 'default',
          'bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-600/25':
            variant === 'primary',
          'bg-gray-700 text-gray-100 hover:bg-gray-600':
            variant === 'secondary',
          'border border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800':
            variant === 'outline',
          'bg-transparent text-gray-300 hover:bg-gray-800': variant === 'ghost',
          'bg-red-600 text-white hover:bg-red-500': variant === 'danger',
        },
        {
          'h-9 px-3 text-sm': size === 'sm',
          'h-10 px-4 text-sm': size === 'md',
          'h-12 px-6 text-base': size === 'lg',
        },
        className,
      )}
      {...props}
    />
  )
}
