import { Building2, Laptop, Library, Shield, Wifi } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { CtaSection } from '@/components/sections/cta'

const facilities = [
  { title: 'Laboratorium Komputer & AI', desc: 'Dilengkapi PC spesifikasi tinggi, GPU cluster untuk riset Machine Learning, dan akses internet gigabit.', image: '/images/gallery-lab.png' },
  { title: 'Perpustakaan Digital', desc: 'Koleksi ribuan jurnal ilmiah terindeks Scopus, e-book teknologi, dan ruang baca ber-AC yang nyaman.', image: '/images/gallery-library.png' },
  { title: 'Ruang Kuliah Multimedia', desc: 'Seluruh ruang kelas dilengkapi proyektor smart, audio sound system, dan fasilitas hybrid learning.', image: '/images/gallery-lecture.png' },
  { title: 'Gedung Kampus Modern', desc: 'Arsitektur kampus futuristik yang ramah lingkungan dengan fasilitas aksesibilitas lengkap.', image: '/images/gallery-campus.png' },
  { title: 'Auditorium & Student Hall', desc: 'Ruang serbaguna untuk seminar nasional, workshop teknologi, dan kegiatan seni budaya mahasiswa.', image: '/images/gallery-graduation.png' },
  { title: 'Student Lounge & Coworking', desc: 'Area diskusi kolaboratif mahasiswa dengan fasilitas Wi-Fi high speed 24 jam.', image: '/images/gallery-students.png' },
]

export default function FasilitasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fasilitas"
        title="Sarana & Prasarana Kampus"
        description="Dukungan sarana fisik dan digital modern untuk menciptakan ekosistem pembelajaran yang kondusif dan produktif."
        variant="fasilitas"
      />

      <section className="mx-content py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((fac, i) => (
            <Reveal key={fac.title} delay={i * 0.05}>
              <GlassCard className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <img src={fac.image} alt={fac.title} className="size-full object-cover" />
                </div>
                <div className="p-6 space-y-2 flex-1">
                  <h3 className="font-display font-bold text-lg">{fac.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{fac.desc}</p>
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
