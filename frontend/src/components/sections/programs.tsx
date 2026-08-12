import { useEffect, useState } from 'react'
import { GradientButton } from '@/components/site/gradient-button'
import { ProgramCard } from '@/components/site/program-card'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import api from '@/lib/api'

interface ProgramItem {
  id: number
  slug: string
  name: string
  degree_level: string
  track: 'sarjana' | 'vokasi' | 'pascasarjana'
  short_description: string
  card_image_url: string | null
  competencies: string[] | null
}

export function ProgramsSection() {
  const [programs, setPrograms] = useState<ProgramItem[]>([])

  useEffect(() => {
    api.get('/programs').then((r) => setPrograms(r.data.data ?? []))
  }, [])

  const sarjana = programs.filter((p) => p.track === 'sarjana')
  const additionalPrograms = programs.filter((p) => p.track !== 'sarjana')

  if (programs.length === 0) return null

  return (
    <section id="programs" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-secondary/40" />
      <div className="mx-content">
        <SectionHeading
          eyebrow="Program Studi"
          title="Program dirancang untuk ekonomi digital"
          description="Enam gelar sarjana yang selaras dengan industri, masing-masing menggabungkan fondasi kuat dengan pembelajaran berbasis proyek praktis."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sarjana.map((program, i) => (
            <Reveal key={program.slug} index={i % 3}>
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>

        {/* D3 & S2 Programs — separate sub-section */}
        {additionalPrograms.length > 0 && (
          <div className="mt-16">
            <SectionHeading
              eyebrow="Vokasi & Pascasarjana"
              title="Program Vokasi & Pascasarjana"
              description="Jalur pendidikan terapan dan riset lanjut untuk memperluas pilihan karier Anda."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {additionalPrograms.map((program, i) => (
                <Reveal key={program.slug} index={i}>
                  <ProgramCard program={program} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <Reveal className="mt-12 flex justify-center">
          <GradientButton href="/programs" variant="outline" size="lg">
            Lihat semua program
          </GradientButton>
        </Reveal>
      </div>
    </section>
  )
}
