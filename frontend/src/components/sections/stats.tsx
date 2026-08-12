import { useEffect, useState } from 'react'
import { AnimatedCounter } from '@/components/site/animated-counter'
import { Reveal } from '@/components/site/reveal'
import { statIconMap } from '@/lib/data'
import api from '@/lib/api'
import { BarChart3 } from 'lucide-react'

interface StatWidget {
  id: number
  title: string
  value: number
}

export function StatsSection() {
  const [stats, setStats] = useState<StatWidget[]>([])

  useEffect(() => {
    api.get('/widgets', { params: { type: 'campus_stat' } }).then((r) => setStats(r.data.data ?? []))
  }, [])

  if (stats.length === 0) return null

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-content">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary to-accent p-8 shadow-2xl shadow-primary/20 sm:p-12">
          {/* decorative grid glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-8 text-center text-primary-foreground sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, i) => {
              const Icon = statIconMap[stat.title] ?? BarChart3
              return (
                <Reveal key={stat.title} index={i} className="flex flex-col items-center">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <Icon className="size-6" />
                  </span>
                  <p className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix="+" />
                  </p>
                  <p className="mt-1 text-sm font-medium text-primary-foreground/80">
                    {stat.title}
                  </p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
