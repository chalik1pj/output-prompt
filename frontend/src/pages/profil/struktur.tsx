
import { Breadcrumb } from '@/components/site/breadcrumb'
import { GlassCard } from '@/components/site/glass-card'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

type OrgNode = {
  title: string
  name?: string
  description: string
  level: 'top' | 'mid' | 'unit'
}

const topLeader: OrgNode = {
  title: 'Ketua STIKOM Tunas Bangsa',
  name: 'Pimpinan Institusi',
  description: 'Pimpinan tertinggi yang bertanggung jawab atas seluruh kegiatan akademik, operasional, dan strategis institusi.',
  level: 'top',
}

const wakilKetua: OrgNode[] = [
  {
    title: 'Wakil Ketua I',
    name: 'Bidang Akademik & Kurikulum',
    description: 'Mengelola pengembangan kurikulum, penjadwalan akademik, serta peningkatan mutu pembelajaran.',
    level: 'mid',
  },
  {
    title: 'Wakil Ketua II',
    name: 'Bidang Administrasi & Keuangan',
    description: 'Mengawasi administrasi umum, pengelolaan keuangan, dan infrastruktur kampus.',
    level: 'mid',
  },
  {
    title: 'Wakil Ketua III',
    name: 'Bidang Kemahasiswaan & Kerjasama',
    description: 'Membina kegiatan kemahasiswaan, pengembangan karir lulusan, dan kerja sama eksternal.',
    level: 'mid',
  },
]

const prodiList: OrgNode[] = [
  { title: 'Kaprodi Teknik Informatika', description: 'Mengelola program studi dan kurikulum Teknik Informatika.', level: 'unit' },
  { title: 'Kaprodi Sistem Informasi', description: 'Mengelola program studi dan kurikulum Sistem Informasi.', level: 'unit' },
  { title: 'Kaprodi Teknik Komputer', description: 'Mengelola program studi dan kurikulum Teknik Komputer.', level: 'unit' },
  { title: 'Kaprodi Sains Data & AI', description: 'Mengelola program studi dan kurikulum Sains Data & AI.', level: 'unit' },
  { title: 'Kaprodi Keamanan Siber', description: 'Mengelola program studi dan kurikulum Keamanan Siber.', level: 'unit' },
  { title: 'Kaprodi Desain Produk Digital', description: 'Mengelola program studi dan kurikulum Desain Produk Digital.', level: 'unit' },
]

const unitPendukung: OrgNode[] = [
  { title: 'Lembaga Penjaminan Mutu (LPM)', description: 'Mengawasi standar mutu akademik internal dan eksternal serta akreditasi.', level: 'unit' },
  { title: 'Lembaga Penelitian & Pengabdian (LPPM)', description: 'Mengelola riset terapan dan program pengabdian kepada masyarakat.', level: 'unit' },
  { title: 'Biro Administrasi Akademik (BAAK)', description: 'Menyediakan layanan administrasi akademik dan kemahasiswaan.', level: 'unit' },
]

const breadcrumbItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Struktur Organisasi' },
]

function OrgCard({ node, className }: { node: OrgNode; className?: string }) {
  const colorMap = {
    top: 'border-primary/40 bg-gradient-to-br from-primary/[0.08] to-accent/[0.06] dark:from-primary/[0.14] dark:to-accent/[0.08]',
    mid: 'border-primary/25 bg-card/90',
    unit: 'border-border/60 bg-card/80',
  }

  return (
    <div
      className={cn(
        'rounded-2xl border p-5 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-lg hover:shadow-primary/5',
        colorMap[node.level],
        className,
      )}
    >
      {/* Initials avatar */}
      <div
        className={cn(
          'mx-auto flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold',
          node.level === 'top'
            ? 'bg-gradient-to-br from-primary to-accent text-white'
            : node.level === 'mid'
              ? 'bg-primary/15 text-primary dark:bg-accent/20 dark:text-accent'
              : 'bg-secondary text-muted-foreground',
        )}
      >
        {node.title
          .split(' ')
          .map((w) => w[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()}
      </div>
      <h3 className="mt-3 text-center text-sm font-bold text-foreground">{node.title}</h3>
      {node.name && (
        <p className="mt-0.5 text-center text-xs font-medium text-primary dark:text-accent">{node.name}</p>
      )}
      <p className="mt-2 text-center text-xs leading-relaxed text-slate-600 dark:text-slate-300">
        {node.description}
      </p>
    </div>
  )
}

function ConnectorLine() {
  return (
    <div className="mx-auto h-8 w-0.5 bg-gradient-to-b from-primary/40 to-accent/30 dark:from-primary/30 dark:to-accent/20" />
  )
}

export default function StrukturOrganisasiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Profil · Struktur Organisasi"
        title="Tata Kelola yang Menopang Setiap Keputusan"
        description="Struktur kepemimpinan STIKOM Tunas Bangsa dirancang untuk tata kelola yang transparan, akuntabel, dan berorientasi pada kualitas akademik."
        variant="struktur"
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      {/* Org Chart */}
      <section className="mx-content py-20">
        <SectionHeading
          eyebrow="Bagan Organisasi"
          title="Hierarki Kepemimpinan Institusi"
        />

        <div className="mt-16">
          {/* Level 1: Ketua */}
          <Reveal>
            <div className="mx-auto max-w-sm">
              <OrgCard node={topLeader} />
            </div>
          </Reveal>

          <ConnectorLine />

          {/* Level 2: Wakil Ketua */}
          <Reveal delay={0.1}>
            {/* Horizontal connector bar — desktop only */}
            <div className="mx-auto hidden max-w-3xl md:block">
              <div className="mx-auto h-0.5 w-2/3 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 dark:from-primary/15 dark:via-accent/20 dark:to-primary/15" />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {wakilKetua.map((wk) => (
                <OrgCard key={wk.title} node={wk} />
              ))}
            </div>
          </Reveal>

          <ConnectorLine />

          {/* Level 3: Program Studi */}
          <Reveal delay={0.2}>
            <div className="mb-6">
              <h3 className="text-center text-sm font-bold uppercase tracking-wide text-muted-foreground">
                Ketua Program Studi
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {prodiList.map((p, i) => (
                <Reveal key={p.title} delay={0.2 + i * 0.04}>
                  <OrgCard node={p} />
                </Reveal>
              ))}
            </div>
          </Reveal>

          <ConnectorLine />

          {/* Level 3: Unit Pendukung */}
          <Reveal delay={0.35}>
            <div className="mb-6">
              <h3 className="text-center text-sm font-bold uppercase tracking-wide text-muted-foreground">
                Unit Pendukung
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {unitPendukung.map((u, i) => (
                <Reveal key={u.title} delay={0.35 + i * 0.04}>
                  <OrgCard node={u} />
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Informasi Tambahan */}
      <section className="mx-content pb-20">
        <Reveal>
          <GlassCard className="mx-auto max-w-2xl p-8 text-center">
            <h3 className="text-lg font-bold text-foreground">Dokumen Resmi</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Untuk informasi lebih lengkap mengenai struktur organisasi dan tata kerja,
              silakan hubungi Biro Administrasi Akademik atau kunjungi halaman kontak kami.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-secondary"
              >
                Hubungi Kami
              </a>
            </div>
          </GlassCard>
        </Reveal>
      </section>
    </>
  )
}
