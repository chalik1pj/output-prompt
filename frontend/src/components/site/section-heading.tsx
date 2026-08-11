import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
          <span className="size-1.5 rounded-full bg-accent" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          'font-display text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl',
          align === 'center' && 'max-w-3xl',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'text-base leading-relaxed text-slate-600 text-pretty dark:text-slate-300 sm:text-lg',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl',
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
