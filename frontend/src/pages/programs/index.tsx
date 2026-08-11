import { useEffect, useState } from 'react'
import { CtaSection } from '@/components/sections/cta'
import { WhyChooseSection } from '@/components/sections/why-choose'
import { GlassCard } from '@/components/site/glass-card'
import { PageHeader } from '@/components/site/page-header'
import { ProgramCard } from '@/components/site/program-card'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import api from '@/lib/api'

const steps = [
  {
    step: '01',
    title: 'Fondasi',
    description: 'Dasar komputasi inti, matematika, dan pemecahan masalah.',
  },
  {
    step: '02',
    title: 'Spesialisasi',
    description: 'Mata kuliah pilihan mendalam yang selaras dengan jalur karir pilihan Anda.',
  },
  {
    step: '03',
    title: 'Proyek Nyata',
    description: 'Proyek akhir industri, magang, dan pekerjaan klien langsung.',
  },
  {
    step: '04',
    title: 'Peluncuran',
    description: 'Penempatan karir, portofolio, dan dukungan inkubasi startup.',
  },
]

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([])

  useEffect(() => {
    api.get('/programs').then((res) => {
      setPrograms(res.data.data || [])
    }).catch(() => {})
  }, [])

  const sarjanaPrograms = programs.filter((p) => p.track === 'sarjana' || p.degree_level === 'S1')
  const otherPrograms = programs.filter((p) => p.track !== 'sarjana' && p.degree_level !== 'S1')

  return (
    <>
      <PageHeader
        eyebrow="Program Studi"
        title="Gelar yang dirancang untuk ekonomi digital"
        description="Program sarjana, vokasi, dan pascasarjana yang selaras dengan industri, masing-masing menggabungkan fondasi kuat dengan pembelajaran berbasis proyek praktis dan kolaborasi industri nyata."
        variant="programs"
      />

      <section className="mx-content py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sarjanaPrograms.map((program, i) => (
            <Reveal key={program.slug} delay={i * 0.05}>
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>

        {otherPrograms.length > 0 && (
          <div className="mt-16">
            <SectionHeading
              eyebrow="Vokasi & Pascasarjana"
              title="Program Vokasi & Pascasarjana"
              description="Jalur pendidikan terapan dan riset lanjut untuk memperluas pilihan karier Anda."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {otherPrograms.map((program, i) => (
                <Reveal key={program.slug} delay={i * 0.05}>
                  <ProgramCard program={program} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Learning journey */}
      <section className="mx-content pb-20">
        <SectionHeading
          eyebrow="Cara Anda Belajar"
          title="Dari fondasi hingga peluncuran"
          description="Setiap program mengikuti perjalanan empat tahap yang teruji, dirancang untuk mengubah rasa ingin tahu menjadi karir."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.05}>
              <GlassCard className="h-full p-6">
                <span className="bg-gradient-to-br from-secondary to-accent bg-clip-text text-4xl font-extrabold text-transparent">
                  {s.step}
                </span>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <WhyChooseSection />
      <CtaSection />
    </>
  )
}
