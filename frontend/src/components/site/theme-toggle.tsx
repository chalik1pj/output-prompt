import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/theme-provider'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolved, setTheme } = useTheme()
  const isDark = resolved === 'dark'

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:bg-secondary',
        className,
      )}
    >
      {isDark ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  )
}
