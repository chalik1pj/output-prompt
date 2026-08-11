import { Eye, Target, Compass } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaSection } from '@/components/sections/cta'

const misiList = [
  'Menyelenggarakan pendidikan tinggi dibidang informatika dan komputer berstandar mutu nasional dan internasional.',
  'Melaksanakan penelitian inovatif yang memberikan kontribusi nyata bagi pengembangan ilmu pengetahuan dan teknologi.',
  'Melakukan pengabdian kepada masyarakat berbasis penerapan teknologi informasi untuk pemberdayaan masyarakat.',
  'Membangun jejaring kemitraan dengan dunia industri, pemerintah, dan perguruan tinggi nasional maupun internasional.',
]

export default function VisiMisiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visi & Misi"
        title="Arah Strategis & Nilai Utama"
        description="Panduan nilai dan tujuan jangka panjang STIKOM Tunas Bangsa dalam menyelenggarakan tridharma perguruan tinggi."
        variant="visi-misi"
      />

      <section className="mx-content py-20 space-y-16">
        {/* Visi */}
        <Reveal>
          <GlassCard strong className="p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto mb-6">
              <Eye className="size-8" />
            </div>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">Visi Institusi</span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold mt-3 leading-snug">
              "Menjadi Perguruan Tinggi Teknologi Terkemuka yang Unggul dalam Riset, Inovasi, dan Kewirausahaan Digital di Tingkat Nasional pada Tahun 2030."
            </h2>
          </GlassCard>
        </Reveal>

        {/* Misi */}
        <div className="max-w-4xl mx-auto space-y-6">
          <SectionHeading
            eyebrow="Misi Kami"
            title="4 Pilar Utama Pengabdian"
            description="Komitmen berkelanjutan kami dalam mewujudkan visi institusi."
          />

          <div className="grid gap-4 sm:grid-cols-2 mt-8">
            {misiList.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <GlassCard className="p-6 h-full flex items-start gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
