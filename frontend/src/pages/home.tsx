import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, Users, BookOpen, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GradientButton } from '@/components/site/gradient-button'
import { site } from '@/lib/site'
import api from '@/lib/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function HomePage() {
  const [stats, setStats] = useState<Array<{ title: string; value: number }>>([])
  const [programs, setPrograms] = useState<any[]>([])
  const [partners, setPartners] = useState<any[]>([])

  useEffect(() => {
    api.get('/widgets?type=campus_stat').then((r) => setStats(r.data.data))
    api.get('/programs').then((r) => setPrograms(r.data.data))
    api.get('/widgets?type=partner').then((r) => setPartners(r.data.data))
  }, [])

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-mesh" />
        {/* Orbs */}
        <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-primary/10 blur-3xl animate-orb-1" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-accent/10 blur-3xl animate-orb-2" />

        <div className="relative mx-content flex flex-col items-center pt-20 pb-24 text-center lg:pt-32 lg:pb-36">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            Pendaftaran 2025/2026 Dibuka
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="font-display max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Bentuk Masa Depan{' '}
            <span className="text-gradient">Digital</span> Anda
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            {site.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <GradientButton href="/programs" size="lg">
              Jelajahi Program
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </GradientButton>
            <GradientButton href="/admissions" variant="outline" size="lg">
              Daftar Sekarang
            </GradientButton>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats counter ─── */}
      {stats.length > 0 && (
        <section className="border-y border-border bg-secondary/30">
          <div className="mx-content grid grid-cols-2 gap-6 py-12 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center"
              >
                <span className="font-display text-3xl font-extrabold text-gradient lg:text-4xl">
                  {stat.value.toLocaleString('id-ID')}+
                </span>
                <span className="mt-1 text-sm text-muted-foreground">{stat.title}</span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Programs ─── */}
      {programs.length > 0 && (
        <section className="mx-content py-24">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Program Studi
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Temukan Jalur Anda
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {programs.map((prog: any, i: number) => (
              <motion.div
                key={prog.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <Link
                  to={`/programs/${prog.slug}`}
                  className="group glass flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: `var(--badge-${prog.badge_color}, var(--secondary))`,
                        color: 'var(--primary-foreground)',
                      }}
                    >
                      {prog.degree_level}
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{prog.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {prog.short_description}
                  </p>
                  {prog.competencies?.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {prog.competencies.slice(0, 3).map((c: string) => (
                        <span
                          key={c}
                          className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Partners marquee ─── */}
      {partners.length > 0 && (
        <section className="border-y border-border bg-secondary/20 py-12">
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            Dipercaya oleh pemimpin industri
          </p>
          <div className="relative overflow-hidden">
            <div className="flex animate-[scroll_30s_linear_infinite] gap-16 whitespace-nowrap">
              {[...partners, ...partners].map((p: any, i: number) => (
                <span
                  key={`${p.title}-${i}`}
                  className="font-display text-xl font-bold text-muted-foreground/40"
                >
                  {p.title}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
        <div className="relative mx-content flex flex-col items-center py-32 text-center">
          <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Siap Memulai Perjalanan Anda?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Bergabunglah dengan ribuan mahasiswa yang membangun karier masa depan bersama STIKOM Tunas Bangsa.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <GradientButton href="/admissions" size="lg">
              Daftar Sekarang
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </GradientButton>
            <GradientButton href="/contact" variant="outline" size="lg">
              Hubungi Kami
            </GradientButton>
          </div>
        </div>
      </section>
    </>
  )
}
