import { ArrowLeftRight, GraduationCap, Medal, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'

const studentLinks = [
  { label: 'Kegiatan Mahasiswa', href: '/students/kegiatan-mahasiswa', icon: Users, desc: 'Organisasi kemahasiswaan, UKM, klub hobi, dan acara sosial kampus.' },
  { label: 'Prestasi Mahasiswa', href: '/students/prestasi-mahasiswa', icon: Medal, desc: 'Pencapaian mahasiswa dalam kompetisi akademik & non-akademik tingkat nasional/internasional.' },
  { label: 'Pertukaran Mahasiswa', href: '/students/pertukaran-mahasiswa', icon: ArrowLeftRight, desc: 'Program MBKM, pertukaran kampus, dan magang industri bersertifikat.' },
  { label: 'Beasiswa', href: '/students/beasiswa', icon: GraduationCap, desc: 'Peluang beasiswa prestasi, KIP-Kuliah, dan beasiswa kemitraan industri.' },
]

export default function StudentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kemahasiswaan"
        title="Kehidupan & Layanan Mahasiswa"
        description="Ruang ekspresi, pengembangan potensi diri, dan dukungan kesejahteraan bagi seluruh mahasiswa STIKOM Tunas Bangsa."
        variant="mahasiswa"
      />

      <section className="mx-content py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {studentLinks.map((item, i) => (
            <Reveal key={item.href} delay={i * 0.05}>
              <Link to={item.href} className="group block h-full">
                <GlassCard hover className="h-full p-6 space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <item.icon className="size-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{item.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
