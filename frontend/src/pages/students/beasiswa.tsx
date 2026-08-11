import { GraduationCap, CheckCircle } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { CtaSection } from '@/components/sections/cta'

const scholarships = [
  { title: 'Beasiswa KIP-Kuliah Merdeka', desc: 'Bantuan biaya pendidikan penuh dan uang saku dari Kementerian Pendidikan bagi mahasiswa berprestasi dari keluarga kurang mampu.' },
  { title: 'Beasiswa Prestasi Akademik STIKOM', desc: 'Potongan UKT hingga 100% bagi calon mahasiswa dengan nilai rapot atau prestasi kejuaraan luar biasa.' },
  { title: 'Beasiswa Kemitraan Industri', desc: 'Beasiswa terikat dinas dari perusahaan mitra teknologi dengan jaminan langsung kerja setelah lulus.' },
]

export default function BeasiswaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bantuan Pendidikan"
        title="Program Beasiswa Kampus"
        description="Dukungan pendanaan pendidikan agar setiap anak bangsa berkesempatan meraih cita-cita di bidang teknologi."
        variant="beasiswa"
      />

      <section className="mx-content py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {scholarships.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <GlassCard className="p-6 space-y-4 h-full flex flex-col justify-between">
                <div>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/15 text-accent mb-4">
                    <GraduationCap className="size-6" />
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
