import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, GraduationCap, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import { useRef } from 'react'
import { GradientButton } from '@/components/site/gradient-button'
import { site } from '@/lib/site'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute left-0 right-0 top-0 z-0 h-[122%] w-full"
      >
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full"
        >
          <img
            src="/images/hero-campus-wide.png"
            alt="Kampus teknologi STIKOM Tunas Bangsa yang megah saat blue hour"
            className="size-full object-cover object-center"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-tr from-[#0b1120] via-[#0b1120]/80 to-[#0b1120]/20" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0b1120]/50 via-transparent to-[#0b1120]/75" />

      <div className="relative z-10 w-full mx-content">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur"
          >
            <Sparkles className="size-3.5 text-cyan-300" />
            Universitas Teknologi Siap Masa Depan
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            Bentuk masa depan dengan{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              teknologi yang berarti
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/80 text-pretty sm:text-lg"
          >
            {site.name} memberdayakan generasi berikutnya dari insinyur, desainer, dan
            pemimpin digital melalui pembelajaran praktis, lab kelas dunia, dan kolaborasi
            industri nyata. {site.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <GradientButton href="/admissions" size="lg">
              Daftar Sekarang
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </GradientButton>
            <GradientButton
              href="/programs"
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/5 text-white backdrop-blur hover:bg-white/15 hover:text-white"
            >
              Jelajahi Program
            </GradientButton>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-cyan-300">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-none text-white">Terakreditasi</p>
                <p className="mt-1 text-xs text-white/70">Program BAN-PT</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-green-300">
                <TrendingUp className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-none text-white">94% Terserap</p>
                <p className="mt-1 text-xs text-white/70">dalam 6 bulan</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-blue-300">
                <GraduationCap className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-none text-white">15,000+</p>
                <p className="mt-1 text-xs text-white/70">Alumni di dunia</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  )
}
