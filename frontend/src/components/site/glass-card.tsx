import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type GlassCardProps = {
  children: ReactNode
  className?: string
  /** stronger blur / opacity for elevated surfaces */
  strong?: boolean
  hover?: boolean
}

export function GlassCard({ children, className, strong, hover }: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? 'glass-strong' : 'glass',
        'rounded-3xl shadow-sm',
        hover &&
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10',
        className,
      )}
    >
      {children}
    </div>
  )
}
