import { Award, BookOpen, Building2, Eye, Hourglass, MapPin, Network, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaSection } from '@/components/sections/cta'

const profilLinks = [
  { label: 'Sejarah Kampus', href: '/profil/sejarah', icon: Hourglass, desc: 'Perjalanan STIKOM Tunas Bangsa mendidik generasi muda sejak berdiri.' },
  { label: 'Visi & Misi', href: '/profil/visi-misi', icon: Eye, desc: 'Arah strategis dan nilai utama institusi dalam mewujudkan pendidikan berkualitas.' },
  { label: 'Struktur Organisasi', href: '/profil/struktur-organisasi', icon: Network, desc: 'Bagan kepemimpinan, unit kerja, dan manajemen kampus.' },
  { label: 'Akreditasi', href: '/profil/accreditation', icon: Award, desc: 'Status akreditasi institusi dan seluruh program studi oleh BAN-PT.' },
  { label: 'Dosen & Staff', href: '/profil/staff', icon: Users, desc: 'Profil tenaga pendidik profesional dan staf administrasi.' },
  { label: 'Fasilitas Kampus', href: '/profil/fasilitas-kampus', icon: Building2, desc: 'Sarana laboratorium, perpustakaan, dan infrastruktur pembelajaran.' },
  { label: 'Lokasi Kampus', href: '/profil/lokasi-kampus', icon: MapPin, desc: 'Peta lokasi, rute transportasi, dan informasi kampus.' },
]

export default function ProfilPage() {
  return (
    <>
      <PageHeader
        eyebrow="Profil Kampus"
        title="Mengenal STIKOM Tunas Bangsa"
        description="Institusi pendidikan tinggi teknologi terdepan di Pematangsiantar yang berkomitmen mencetak sumber daya manusia unggul dan berdaya saing global."
        variant="profil"
      />

      <section className="mx-content py-20">
        <SectionHeading
          eyebrow="Tentang Kami"
          title="Keunggulan & Identitas Institusi"
          description="Pelajari lebih dalam mengenai sejarah, kepemimpinan, dan fasilitas yang mendukung keunggulan akademis kami."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profilLinks.map((item, i) => (
            <Reveal key={item.href} delay={i * 0.05}>
              <Link to={item.href} className="group block h-full">
                <GlassCard hover className="h-full p-6 space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon className="size-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold">{item.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
