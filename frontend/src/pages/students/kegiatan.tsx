import { Users, Calendar, Award } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { CtaSection } from '@/components/sections/cta'

const ukmList = [
  { title: 'BEM STIKOM Tunas Bangsa', category: 'Organisasi Utama', desc: 'Badan Eksekutif Mahasiswa wadah aspirasi dan kepemimpinan.' },
  { title: 'UKM Computer Club (TB-CC)', category: 'Minat Bakat & TI', desc: 'Komunitas coding, cybersecurity, dan riset software development.' },
  { title: 'UKM Olahraga & Seni', category: 'Minat Bakat', desc: 'Pengembangan bakat seni musik, tari daerah, futsal, dan basket.' },
  { title: 'UKM Mapala & Sosial', category: 'Pengabdian', desc: 'Kegiatan pencinta alam, kepedulian lingkungan, dan aksi sosial.' },
]

export default function KegiatanMahasiswaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kegiatan Mahasiswa"
        title="Organisasi & Komunitas Kampus"
        description="Jelajahi berbagai Unit Kegiatan Mahasiswa (UKM) untuk melatih kepemimpinan, soft skills, dan jejaring pertemanan."
        variant="mahasiswa"
      />

      <section className="mx-content py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ukmList.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <GlassCard className="p-6 space-y-4 h-full flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{item.category}</span>
                  <h3 className="font-display font-bold text-lg mt-1">{item.title}</h3>
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
