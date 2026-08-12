import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { achievements } from '@/lib/data'

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-40" />
      <div className="mx-content">
        <SectionHeading
          eyebrow="Prestasi"
          title="Penghargaan yang membanggakan"
          description="Pengakuan atas komitmen kami pada kualitas akademik, inovasi, dan dampak nyata bagi industri."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => {
            const Icon = a.icon
            return (
              <Reveal
                key={a.title}
                index={i % 3}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* decorative glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="size-7" />
                  </span>
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                    {a.year}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-balance text-foreground">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {a.description}
                </p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
