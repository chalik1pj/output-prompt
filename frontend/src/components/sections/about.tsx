import { Compass, Rocket, Target } from 'lucide-react'
import { GradientButton } from '@/components/site/gradient-button'
import { Reveal } from '@/components/site/reveal'
import { campusHighlights } from '@/lib/data'
import { site } from '@/lib/site'

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-content">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Visual */}
          <Reveal className="relative order-last lg:order-first">
            <div className="absolute -bottom-6 -left-6 -z-10 size-48 rounded-full bg-primary/15 blur-3xl" />
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-xl">
              <img
                src="/images/profil-campus.png"
                alt="STIKOM Tunas Bangsa campus entrance"
                className="h-full w-full object-cover"
              />
            </div>
            {/* floating highlight card */}
            <div className="glass-strong absolute -bottom-6 right-4 hidden max-w-[220px] rounded-2xl p-4 shadow-lg sm:block">
              <p className="font-display text-3xl font-bold text-gradient">2005</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Pelopor pendidikan teknologi di Sumatera Utara sejak saat itu.
              </p>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-primary uppercase">
                <span className="size-1.5 rounded-full bg-accent" />
                Tentang {site.shortName}
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Universitas teknologi dibangun untuk masa depan
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
                Kami menggabungkan akademisi yang ketat dengan mentalitas startup. Mahasiswa kami
                tidak hanya belajar coding atau desain. Mereka belajar berpikir,
                membangun, dan memimpin di dunia yang dibentuk ulang oleh teknologi.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Reveal index={1} className="rounded-2xl border border-border bg-card p-5">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Compass className="size-5" />
                </span>
                <h3 className="mt-3 font-display font-bold text-foreground">Visi Kami</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Menjadi universitas teknologi terkemuka yang menghasilkan talenta digital
                  inovatif yang kompetitif secara global.
                </p>
              </Reveal>
              <Reveal index={2} className="rounded-2xl border border-border bg-card p-5">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Target className="size-5" />
                </span>
                <h3 className="mt-3 font-display font-bold text-foreground">Misi Kami</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Memberikan pendidikan terapan, memajukan penelitian, dan membangun
                  kemitraan berkelanjutan yang melayani masyarakat.
                </p>
              </Reveal>
            </div>

            <Reveal index={3} className="mt-6">
              <GradientButton href="/profil">
                Temukan cerita kami
                <Rocket className="size-4" />
              </GradientButton>
            </Reveal>
          </div>
        </div>

        {/* Campus highlights */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {campusHighlights.map((h, i) => (
            <Reveal
              key={h.title}
              index={i}
              className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                <h.icon className="size-5" />
              </span>
              <h3 className="mt-3 font-display text-sm font-bold text-foreground">{h.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {h.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
