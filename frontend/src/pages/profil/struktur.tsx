import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { CtaSection } from '@/components/sections/cta'

const leadership = [
  { role: 'Ketua STIKOM Tunas Bangsa', name: 'Dr. H. Ahmad Sudrajat, M.Kom.', desc: 'Penanggung jawab utama operasional & pengembang akademis institusi.' },
  { role: 'Wakil Ketua I (Akademik)', name: 'Dra. Rina Karlina, M.T.', desc: 'Mengoordinasikan kegiatan pengajaran, kurikulum, dan akreditasi.' },
  { role: 'Wakil Ketua II (Keuangan & Umum)', name: 'Bambang Hartono, S.E., M.M.', desc: 'Pengelolaan anggaran, sarana prasarana, dan SDM kampus.' },
  { role: 'Wakil Ketua III (Kemahasiswaan)', name: 'Nurul Huda, M.Kom.', desc: 'Pembinaan organisasi kemahasiswaan, beasiswa, dan alumni.' },
]

export default function StrukturPage() {
  return (
    <>
      <PageHeader
        eyebrow="Struktur Organisasi"
        title="Kepemimpinan & Tata Kelola"
        description="Jajaran pimpinan dan tata kelola organisasi yang mendorong tercapainya keunggulan akademik STIKOM Tunas Bangsa."
        variant="struktur"
      />

      <section className="mx-content py-20">
        <div className="mx-auto max-w-4xl space-y-12">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-center mb-8">Pimpinan Institusi</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {leadership.map((item, i) => (
                <GlassCard key={item.role} className="p-6 space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{item.role}</span>
                  <h3 className="font-display text-lg font-bold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
