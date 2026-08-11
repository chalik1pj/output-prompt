import { Trophy, Medal, Award } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { CtaSection } from '@/components/sections/cta'

const achievements = [
  { title: 'Juara 1 Hackathon Nasional Gemastik 2024', student: 'Tim Inovasi TI STIKOM', category: 'Teknologi Informasi', year: '2024' },
  { title: 'Medali Emas CTF Cyber Security Challenge', student: 'Rian Hidayat (S1 TI)', category: 'Keamanan Siber', year: '2024' },
  { title: 'Best UI/UX Design Product Competition', student: 'Siti Rahma & Tim', category: 'Desain Produk', year: '2023' },
  { title: 'Juara 2 Lomba Karya Tulis Ilmiah Nasional', student: 'Ahmad Fauzi (S1 SI)', category: 'Riset & Karya Tulis', year: '2023' },
]

export default function PrestasiMahasiswaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prestasi Mahasiswa"
        title="Banggakan Kampus di Kancah Nasional"
        description="Pencapaian dan kebanggaan mahasiswa STIKOM Tunas Bangsa dalam berbagai ajang kompetisi ilmiah, teknologi, dan olahraga."
        variant="prestasi"
      />

      <section className="mx-content py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {achievements.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <GlassCard className="p-6 flex items-start gap-4 h-full">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <Trophy className="size-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-primary">{item.category} • {item.year}</span>
                  <h3 className="font-display font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">Oleh: {item.student}</p>
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
