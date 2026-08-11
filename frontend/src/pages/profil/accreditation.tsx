import { Award, CheckCircle } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { CtaSection } from '@/components/sections/cta'

const accList = [
  { name: 'Institusi STIKOM Tunas Bangsa', status: 'Terakreditasi B', body: 'BAN-PT', year: '2022 - 2027' },
  { name: 'S1 Teknik Informatika', status: 'Terakreditasi B', body: 'LAM INFOKOM', year: '2023 - 2028' },
  { name: 'S1 Sistem Informasi', status: 'Terakreditasi B', statusBadge: 'B', body: 'LAM INFOKOM', year: '2023 - 2028' },
  { name: 'D3 Manajemen Informatika', status: 'Terakreditasi B', body: 'BAN-PT', year: '2021 - 2026' },
  { name: 'S2 Informatika Komputer', status: 'Terakreditasi B', body: 'LAM INFOKOM', year: '2024 - 2029' },
]

export default function AccreditationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Akreditasi"
        title="Jaminan Mutu & Legalitas"
        description="Seluruh program studi dan institusi STIKOM Tunas Bangsa terakreditasi resmi oleh BAN-PT dan LAM INFOKOM."
        variant="profil"
      />

      <section className="mx-content py-20">
        <div className="mx-auto max-w-4xl space-y-6">
          {accList.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.06}>
              <GlassCard className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Award className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Lembaga: {item.body} • Berlaku: {item.year}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                  <CheckCircle className="size-3.5" />
                  {item.status}
                </span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
