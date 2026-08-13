import { cn } from '@/lib/utils'

export function CategoryFilter({
  categories,
  active,
  onChange,
  size = 'default',
}: {
  categories: string[]
  active: string
  onChange: (cat: string) => void
  /** 'small' produces compact chips for secondary filters */
  size?: 'default' | 'small'
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={cn(
            'rounded-full border font-medium transition-colors',
            size === 'small' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
            active === cat
              ? size === 'small'
                ? 'border-primary/30 bg-primary/10 text-primary dark:bg-accent/15 dark:text-accent'
                : 'border-transparent bg-gradient-to-r from-secondary to-accent text-primary-foreground'
              : 'border-border bg-card/60 text-muted-foreground hover:text-foreground'
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
