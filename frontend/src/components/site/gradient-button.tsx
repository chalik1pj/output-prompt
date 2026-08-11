import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type GradientButtonProps = {
  children: ReactNode
  href?: string
  className?: string
  variant?: 'solid' | 'outline'
  size?: 'default' | 'lg'
} & Omit<ComponentProps<'a'>, 'href'>

export function GradientButton({
  children,
  href = '#',
  className,
  variant = 'solid',
  size = 'default',
  ...props
}: GradientButtonProps) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
  const sizes = {
    default: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }
  const variants = {
    solid:
      'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5',
    outline:
      'border border-border bg-background/60 text-foreground backdrop-blur hover:border-primary/50 hover:bg-secondary hover:-translate-y-0.5',
  }

  return (
    <Link
      to={href}
      className={cn(base, sizes[size], variants[variant], className)}
      {...(props as any)}
    >
      {children}
    </Link>
  )
}
