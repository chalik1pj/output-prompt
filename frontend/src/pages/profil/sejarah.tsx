import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { CtaSection } from '@/components/sections/cta'

const timeline = [
  {
    year: '1999',
    title: 'Pendirian AMIK Tunas Bangsa',
    desc: 'Langkah awal berdirinya lembaga pendidikan tinggi komputer di Pematangsiantar untuk memenuhi kebutuhan tenaga ahli TI daerah.',
  },
  {
    year: '2003',
    title: 'Pengembangan STIKOM Tunas Bangsa',
    desc: 'Transformasi menjadi Sekolah Tinggi Manajemen Informatika dan Komputer dengan pembukaan program Sarjana (S1).',
  },
  {
    year: '2015',
    title: 'Akreditasi BAN-PT & Lab Modern',
    desc: 'Raihan akreditasi institusi B serta modernisasi sarana laboratorium dan infrastruktur jaringan kampus.',
  },
  {
    year: '2022',
    title: 'Pembukaan Program Magister (S2)',
    desc: 'Peluncuran program Pascasarjana Magister Informatika Komputer dan penguatan kerjasama industri skala nasional.',
  },
]

export default function SejarahPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sejarah"
        title="Jejak Langkah & Perjalanan Kampus"
        description="Perjalanan panjang STIKOM Tunas Bangsa dalam mendedikasikan diri bagi kemajuan pendidikan teknologi informasi di Indonesia."
        variant="sejarah"
      />

      <section className="mx-content py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          <Reveal>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="font-display text-2xl font-bold">Latar Belakang Berdirinya Kampus</h2>
              <p className="text-muted-foreground leading-relaxed">
                STIKOM Tunas Bangsa Pematangsiantar didirikan atas kesadaran akan pentingnya penguasaan teknologi informasi dan komunikasi di era globalisasi. Sejak awal berdirinya, institusi kami konsisten melahirkan lulusan berintegritas, terampil, dan siap menghadapi tantangan dunia kerja modern.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold">Milestone Perkembangan</h2>
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.08}>
                  <GlassCard className="flex flex-col sm:flex-row items-start gap-4 p-6">
                    <span className="font-display text-2xl font-extrabold text-primary shrink-0">
                      {item.year}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-lg">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
