import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { features } from '@/lib/data'

export function WhyChooseSection() {
  return (
    <section id="why" className="relative py-20 sm:py-28">
      <div className="mx-content">
        <SectionHeading
          eyebrow="Mengapa Memilih Kami"
          title="Semua yang Anda butuhkan untuk meluncurkan karir di tech"
          description="Dari akreditasi hingga tingkat kelulusan, kami fokus pada detail yang mengubah mahasiswa ambisius menjadi profesional siap industri."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            return (
              <Reveal
                key={feature.title}
                index={i % 3}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="relative h-36 overflow-hidden bg-secondary">
                  <img
                    src={feature.image || '/images/gallery-campus.png'}
                    alt=""
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                </div>

                <div className="p-6 pt-8">
                  <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
