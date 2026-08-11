import { Link } from 'react-router-dom'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  onDark = false,
}: {
  className?: string
  onDark?: boolean
}) {
  return (
    <Link to="/" className={cn('group flex items-center gap-2.5', className)}>
      <span className="relative inline-flex size-9 items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <img
          src="/images/stikom-emblem.png"
          alt={`Logo ${site.name}`}
          width={128}
          height={128}
          className="size-full object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-base font-bold tracking-tight transition-colors',
            onDark ? 'text-white' : 'text-foreground',
          )}
        >
          {site.shortName}
        </span>
        <span
          className={cn(
            'text-[10px] font-medium tracking-wide uppercase transition-colors',
            onDark ? 'text-white/70' : 'text-muted-foreground',
          )}
        >
          Tunas Bangsa
        </span>
      </span>
    </Link>
  )
}
