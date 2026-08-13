import type { LucideIcon } from 'lucide-react'
import {
  Check,
  ClipboardList,
  FileSearch,
  FileText,
  GraduationCap,
  Handshake,
  Hourglass,
  Send,
  UserCheck,
} from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Send,
  UserCheck,
  GraduationCap,
  ClipboardList,
  FileSearch,
  Check,
  Hourglass,
  Handshake,
}

export type StepItem = {
  icon: string
  title: string
  description: string
}

/**
 * Komponen "proses 4 langkah" yang dipakai berulang (Admissions, Pertukaran
 * Mahasiswa, Beasiswa) untuk konsistensi visual. Port dari
 * 08-referensi-source-asli/components/site/steps-process.tsx.
 */
export function StepsProcess({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string
  title: string
  steps: StepItem[]
}) {
  return (
    <section className="mx-content py-20">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = iconMap[step.icon] ?? FileText
          return (
            <Reveal key={step.title} delay={i * 0.05}>
              <GlassCard className="relative h-full p-6">
                <span className="absolute right-5 top-5 text-sm font-bold text-foreground/30">
                  0{i + 1}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </GlassCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
