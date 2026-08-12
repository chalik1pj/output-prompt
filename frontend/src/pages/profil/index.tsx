import { CtaSection } from '@/components/sections/cta'
import { StatsSection } from '@/components/sections/stats'
import { AnimatedCounter } from '@/components/site/animated-counter'
import { GlassCard } from '@/components/site/glass-card'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { campusHighlights, timeline } from '@/lib/data'

const missions = [
  'Memberikan pendidikan teknologi terapan berbasis proyek yang memenuhi kebutuhan nyata industri.',
  'Memajukan penelitian dan inovasi yang menyelesaikan masalah lokal dan global yang bermakna.',
  'Membangun kemitraan inklusif yang memperluas peluang bagi setiap mahasiswa.',
  'Membina pemimpin beretika dan berjiwa wirausaha yang siap untuk masa depan digital.',
]

export default function ProfilPage() {
  return (
    <>
      <PageHeader
        eyebrow="Profil Kami"
        title="Memelopori pendidikan teknologi sejak 2005"
        description="STIKOM Tunas Bangsa adalah universitas berfokus teknologi yang mempersiapkan generasi berikutnya dari insinyur, desainer, dan pemimpin digital melalui pembelajaran praktis dan kolaborasi industri."
        variant="profil"
      />

      {/* Vision & Mission */}
      <section className="mx-content py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full p-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary dark:text-accent">
                Visi Kami
              </span>
              <p className="mt-4 text-balance text-2xl font-semibold leading-snug text-foreground md:text-3xl">
                Menjadi universitas teknologi terkemuka yang membentuk inovator
                penggerak transformasi digital Indonesia.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full p-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary dark:text-accent">
                Misi Kami
              </span>
              <ul className="mt-4 space-y-4">
                {missions.map((m) => (
                  <li key={m} className="flex gap-3 text-slate-600 dark:text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* History image */}
      <section className="mx-content pb-8">
        <Reveal>
          <div className="relative aspect-[16/7] overflow-hidden rounded-3xl border border-border/60">
            <img
              src="/images/profil-campus.png"
              alt="Pintu masuk kampus STIKOM Tunas Bangsa"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-8 text-primary-foreground">
              <div>
                <AnimatedCounter value={20} suffix="+" className="text-3xl font-bold" />
                <p className="text-sm opacity-90">Tahun keunggulan</p>
              </div>
              <div>
                <AnimatedCounter value={6} className="text-3xl font-bold" />
                <p className="text-sm opacity-90">Program studi</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="mx-content py-20">
        <SectionHeading
          eyebrow="Perjalanan Kami"
          title="Dua dekade pertumbuhan dan inovasi"
          description="Dari ide berani hingga universitas teknologi yang berkembang pesat, inilah tonggak-tonggak yang membentuk kami."
        />
        <div className="relative mt-16">
          <div
            className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />
          <ol className="space-y-10">
            {timeline.map((item, i) => (
              <li key={item.year} className="relative md:grid md:grid-cols-2 md:gap-12">
                <Reveal
                  delay={i * 0.05}
                  className={i % 2 === 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}
                >
                  <div className="ml-12 md:ml-0">
                    <GlassCard className="p-6">
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary dark:bg-accent/10 dark:text-accent">
                        {item.year}
                      </span>
                      <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {item.description}
                      </p>
                    </GlassCard>
                  </div>
                </Reveal>
                <span
                  className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-accent md:left-1/2"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Campus highlights */}
      <section className="mx-content pb-20">
        <SectionHeading eyebrow="Sorotan Kampus" title="Kampus yang dibangun untuk para pencipta" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {campusHighlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.05}>
              <GlassCard className="h-full p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                  <h.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {h.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <StatsSection />
      <CtaSection />
    </>
  )
}
