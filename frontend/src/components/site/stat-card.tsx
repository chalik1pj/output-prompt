import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import { AnimatedCounter } from '@/components/site/animated-counter'

interface StatCardProps {
  label: string
  value: number
  icon: LucideIcon
  accent?: 'primary' | 'accent' | 'success' | 'warning'
  suffix?: string
  /** Teks kecil di bawah angka, mis. "12 draft menunggu" */
  hint?: string
  /** Persentase perubahan opsional (mis. dibanding total post lain) */
  trend?: { value: number; label: string }
  loading?: boolean
}

const accentClasses: Record<NonNullable<StatCardProps['accent']>, string> = {
  primary: 'bg-primary/10 text-primary dark:bg-primary/15',
  accent: 'bg-accent/10 text-accent dark:bg-accent/15',
  success: 'bg-success/10 text-success',
  warning: 'bg-orange-500/10 text-orange-500',
}

export function StatCard({
  label,
  value,
  icon: Icon,
  accent = 'primary',
  suffix = '',
  hint,
  trend,
  loading,
}: StatCardProps) {
  return (
    <GlassCard className="p-6" hover>
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className={`flex size-9 items-center justify-center rounded-xl ${accentClasses[accent]}`}>
          <Icon className="size-4.5" />
        </span>
      </div>

      {loading ? (
        <div className="mt-4 h-9 w-20 animate-pulse rounded bg-secondary" />
      ) : (
        <p className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground">
          <AnimatedCounter value={value} suffix={suffix} duration={1.2} />
        </p>
      )}

      {hint && !loading && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}

      {trend && !loading && (
        <div
          className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
            trend.value >= 0 ? 'text-success' : 'text-destructive'
          }`}
        >
          {trend.value >= 0 ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
          {Math.abs(trend.value)}% {trend.label}
        </div>
      )}
    </GlassCard>
  )
}
