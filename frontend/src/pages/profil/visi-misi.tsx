import { BookOpen, GraduationCap, Handshake, Lightbulb, Search, Shield, Sparkles } from 'lucide-react'
import { Breadcrumb } from '@/components/site/breadcrumb'
import { GlassCard } from '@/components/site/glass-card'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const misiItems = [
  {
    icon: BookOpen,
    number: '01',
    title: 'Pendidikan Terapan',
    description:
      'Menyelenggarakan pembelajaran berbasis proyek nyata yang memadukan teori dengan praktik industri di setiap program studi.',
  },
  {
    icon: Search,
    number: '02',
    title: 'Riset & Inovasi',
    description:
      'Mendorong penelitian terapan di bidang kecerdasan buatan, keamanan siber, dan rekayasa perangkat lunak yang berdampak nyata bagi masyarakat.',
  },
  {
    icon: Handshake,
    number: '03',
    title: 'Kemitraan Berkelanjutan',
    description:
      'Membangun kolaborasi jangka panjang dengan mitra industri, pemerintah, dan institusi pendidikan dalam maupun luar negeri.',
  },
  {
    icon: GraduationCap,
    number: '04',
    title: 'Pengembangan SDM Unggul',
    description:
      'Mencetak lulusan yang profesional, berdaya saing, dan berintegritas tinggi, sekaligus mengembangkan kompetensi dosen dan tenaga kependidikan secara berkelanjutan.',
  },
]

const tujuan = [
  'Menghasilkan lulusan siap kerja dengan tingkat keterserapan tinggi di industri teknologi.',
  'Menjadi rujukan riset teknologi terapan di Sumatera Utara.',
  'Memperluas akses pendidikan teknologi berkualitas bagi masyarakat.',
]

const nilaiInti = [
  {
    icon: Lightbulb,
    title: 'Inovasi',
    description: 'Mendorong ide-ide segar dan solusi kreatif dalam setiap aspek pendidikan dan penelitian.',
  },
  {
    icon: Shield,
    title: 'Integritas',
    description: 'Menjunjung tinggi kejujuran, etika, dan tanggung jawab di seluruh aktivitas akademik.',
  },
  {
    icon: Handshake,
    title: 'Kolaborasi',
    description: 'Membangun sinergi antara mahasiswa, dosen, industri, dan masyarakat untuk dampak yang lebih besar.',
  },
  {
    icon: Sparkles,
    title: 'Dampak Nyata',
    description: 'Menghasilkan luaran yang terukur dan bermanfaat langsung bagi masyarakat dan dunia industri.',
  },
]

const breadcrumbItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Visi & Misi' },
]

export default function VisiMisiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Profil · Visi & Misi"
        title="Arah yang Kami Tuju, Langkah yang Kami Ambil"
        description="Visi dan misi yang menjadi kompas setiap keputusan akademik, riset, dan kemitraan yang kami bangun."
        variant="visi-misi"
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      {/* Visi */}
      <section className="mx-content py-20">
        <SectionHeading eyebrow="Visi Kami" title="Tujuan Jangka Panjang" />
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-background to-accent/[0.06] p-10 text-center shadow-sm dark:border-accent/20 dark:from-primary/[0.10] dark:via-background dark:to-accent/[0.08] md:p-14">
              <span className="absolute -left-4 -top-4 text-[8rem] font-bold leading-none text-primary/8 dark:text-accent/10" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="relative z-10">
                <p className="font-display text-2xl font-bold leading-snug tracking-tight text-foreground md:text-3xl lg:text-4xl">
                  Menjadi universitas teknologi terkemuka yang menghasilkan talenta digital inovatif dan kompetitif secara global.
                </p>
              </blockquote>
              <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Misi */}
      <section className="mx-content pb-20">
        <SectionHeading eyebrow="Misi Kami" title="Langkah Nyata yang Kami Tempuh" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {misiItems.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.06}>
              <GlassCard className="relative h-full p-7" hover>
                <span className="absolute right-5 top-5 text-sm font-bold text-foreground/15">{m.number}</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                  <m.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{m.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tujuan */}
      <section className="mx-content pb-20">
        <SectionHeading eyebrow="Tujuan" title="Sasaran Strategis Kami" />
        <div className="mx-auto mt-12 max-w-2xl">
          <Reveal>
            <GlassCard className="p-8">
              <ul className="space-y-5">
                {tujuan.map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary dark:bg-accent/15 dark:text-accent">
                      {i + 1}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Nilai Inti */}
      <section className="mx-content pb-20">
        <SectionHeading eyebrow="Nilai Inti" title="Prinsip yang Kami Jalani Setiap Hari" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {nilaiInti.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.06}>
              <GlassCard className="h-full p-6 text-center" hover>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 dark:from-primary/20 dark:to-accent/20">
                  <n.icon className="h-7 w-7 text-primary dark:text-accent" />
                </div>
                <h3 className="mt-4 text-base font-bold text-foreground">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{n.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
