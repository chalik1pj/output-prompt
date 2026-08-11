import { ArrowRight, CalendarCheck, PhoneCall } from 'lucide-react'
import { GradientButton } from '@/components/site/gradient-button'
import { Reveal } from '@/components/site/reveal'

export function CtaSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-content">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-primary px-6 py-14 text-center shadow-2xl shadow-primary/25 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto max-w-2xl text-primary-foreground">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur">
                <CalendarCheck className="size-3.5" />
                Penerimaan dibuka untuk 2025/2026
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
                Masa depan Anda di teknologi dimulai di sini
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/85 text-pretty sm:text-lg">
                Bergabunglah dengan ribuan mahasiswa membangun karir yang bermakna. Daftar
                hari ini dan ambil langkah pertama menuju gelar yang siap masa depan.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <GradientButton
                  href="/admissions"
                  size="lg"
                  className="bg-background text-primary shadow-lg hover:bg-background/90"
                >
                  Mulai pendaftaran Anda
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </GradientButton>
                <GradientButton
                  href="/contact"
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-primary-foreground hover:bg-white/10"
                >
                  <PhoneCall className="size-4" />
                  Hubungi penerimaan
                </GradientButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
