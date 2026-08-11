import { ArrowLeftRight, CheckCircle2, Globe2 } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { CtaSection } from '@/components/sections/cta'

const programs = [
  { title: 'Program MBKM Kampus Merdeka', desc: 'Hak belajar 3 semester di luar program studi, termasuk magang industri bersertifikat dan studi independen.' },
  { title: 'Pertukaran Mahasiswa Merdeka (PMM)', desc: 'Kesempatan belajar selama 1 semester di perguruan tinggi negeri/swasta unggulan di seluruh Indonesia.' },
  { title: 'Magang Industri Bersertifikat (MSIB)', desc: 'Pengalaman kerja langsung di perusahaan teknologi terkemuka dengan konversi hingga 20 SKS.' },
]

export default function PertukaranMahasiswaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pertukaran & MBKM"
        title="Perluas Wawasan & Pengalaman"
        description="Program mobilitas mahasiswa, magang industri, dan kuliah di kampus mitra seluruh Indonesia."
        variant="pertukaran"
      />

      <section className="mx-content py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {programs.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <GlassCard className="p-6 space-y-4 h-full flex flex-col justify-between">
                <div>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                    <ArrowLeftRight className="size-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mt-2">{item.desc}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
