import { CalendarDays, Medal, ScrollText, Trophy } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { CtaSection } from '@/components/sections/cta'

const academicEvents = [
  { title: 'Seminar Nasional Teknologi Informasi & Komunikasi (SNASTIKOM)', date: '25 Oktober 2025', desc: 'Conference tahunan pemaparan hasil riset dosen dan mahasiswa tingkat nasional.' },
  { title: 'Workshop AI & Data Science bersama Industry Experts', date: '15 November 2025', desc: 'Pelatihan hands-on penggunaan LLM dan Machine Learning terapan.' },
  { title: 'Pameran Karya Tugas Akhir & Innovate Fest', date: '20 Desember 2025', desc: 'Showcase karya aplikasi, IoT, dan produk digital lulusan STIKOM.' },
]

export default function AcademicsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kegiatan Akademik"
        title="Agenda & Riset Kampus"
        description="Jadwal seminar ilmiah, workshop teknologi, dan publikasi riset civitas akademika STIKOM Tunas Bangsa."
        variant="kegiatan"
      />

      <section className="mx-content py-20">
        <div className="mx-auto max-w-4xl space-y-6">
          {academicEvents.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <GlassCard className="p-6 md:p-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                  <CalendarDays className="size-4" />
                  {item.date}
                </div>
                <h3 className="font-display font-bold text-xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
