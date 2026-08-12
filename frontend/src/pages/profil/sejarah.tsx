import { Award, BarChart3, Building2, FileText, Rocket } from 'lucide-react'
import type { ComponentType } from 'react'
import { Breadcrumb } from '@/components/site/breadcrumb'
import { GradientButton } from '@/components/site/gradient-button'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const milestones = [
  {
    icon: Building2,
    year: 'Awal Mula',
    title: 'Dari Lembaga Pendidikan Komputer',
    description:
      'Kebutuhan tenaga kerja berbasis komputer tumbuh seiring bangkitnya sektor industri dan perdagangan di Pematangsiantar dan Sumatera Utara. Menjawab kebutuhan itu, yayasan pendiri mengembangkan lembaga pendidikan komputer yang kemudian tumbuh menjadi Akademi Manajemen Informatika Komputer Tunas Bangsa (AMIK Tunas Bangsa), menyelenggarakan program Diploma Tiga (D-III) dan meraih akreditasi B.',
  },
  {
    icon: FileText,
    year: '2014',
    title: 'Naik Jenjang ke Sarjana',
    description:
      'Tingginya minat masyarakat untuk melanjutkan ke jenjang sarjana mendorong dibukanya Sekolah Tinggi Ilmu Komputer (STIKOM) Tunas Bangsa. Izin penyelenggaraan program S1 terbit melalui SK Mendikbud RI Nomor 408/E/O/2014 tertanggal 11 September 2014, dengan dua program studi awal: Sistem Informasi dan Teknik Informatika.',
  },
  {
    icon: Award,
    year: '2016–2024',
    title: 'Pengakuan Mutu',
    description:
      'Komitmen pada kualitas akademik membuahkan hasil: program studi Sistem Informasi meraih akreditasi BAN-PT predikat Baik pada 2016, disusul Teknik Informatika pada 2024. Institusi turut mengantongi status akreditasi resmi dari BAN-PT sebagai bentuk pengakuan atas tata kelola dan mutu pendidikan.',
  },
  {
    icon: Rocket,
    year: 'Transformasi',
    title: 'Menuju Universitas Teknologi Siap Masa Depan',
    description:
      'Menjawab perkembangan ekonomi digital, STIKOM Tunas Bangsa memperluas cakupan keilmuan dari dua menjadi enam program studi — Teknik Informatika, Sistem Informasi, Teknik Komputer, Sains Data & AI, Keamanan Siber, dan Desain Produk Digital — dilengkapi laboratorium modern, hub inovasi startup, dan kemitraan industri aktif.',
  },
  {
    icon: BarChart3,
    year: 'Hari Ini',
    title: 'Mencetak Talenta Digital Terdepan',
    description:
      'Ribuan alumni STIKOM Tunas Bangsa kini berkarier di berbagai sektor teknologi, dengan tingkat keterserapan lulusan yang tinggi dalam enam bulan pertama setelah kelulusan. Kampus terus berinovasi untuk mencetak generasi pemimpin digital masa depan.',
  },
]

const breadcrumbItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Sejarah' },
]

export default function SejarahPage() {
  return (
    <>
      <PageHeader
        eyebrow="Profil · Sejarah"
        title="Perjalanan Kami Membentuk Masa Depan Teknologi"
        description="Dari ruang kelas kecil di Pematangsiantar hingga menjadi rumah bagi ribuan talenta digital — inilah cerita di balik STIKOM Tunas Bangsa."
        variant="sejarah"
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      >
        <GradientButton href="/programs" variant="outline">
          Jelajahi Program
        </GradientButton>
      </PageHeader>

      {/* Timeline */}
      <section className="mx-content py-20">
        <SectionHeading eyebrow="Jejak Langkah" title="Milestone Penting dalam Perjalanan Kami" />

        <div className="relative mt-16">
          <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 md:left-1/2 md:-translate-x-px md:block" />
          <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 md:hidden" />

          <div className="flex flex-col gap-12">
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0
              return (
                <Reveal key={m.year} delay={i * 0.08}>
                  <div className="relative flex items-start gap-6 md:items-center">
                    <div className="hidden w-full md:flex md:items-center md:gap-8">
                      <div className={`flex-1 ${isEven ? 'text-right' : ''}`}>
                        {isEven ? (
                          <div className="ml-auto max-w-md">
                            <TimelineCard icon={m.icon} year={m.year} title={m.title} description={m.description} />
                          </div>
                        ) : (
                          <div className="ml-auto max-w-md">
                            <span className="text-sm font-bold text-primary/40">{m.year}</span>
                          </div>
                        )}
                      </div>

                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-card shadow-lg shadow-primary/10 dark:border-accent/30">
                        <m.icon className="size-5 text-primary dark:text-accent" />
                      </div>

                      <div className="flex-1">
                        {!isEven ? (
                          <div className="max-w-md">
                            <TimelineCard icon={m.icon} year={m.year} title={m.title} description={m.description} />
                          </div>
                        ) : (
                          <div className="max-w-md">
                            <span className="text-sm font-bold text-primary/40">{m.year}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-5 md:hidden">
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-card shadow-lg shadow-primary/10 dark:border-accent/30">
                        <m.icon className="size-5 text-primary dark:text-accent" />
                      </div>
                      <div className="flex-1">
                        <TimelineCard icon={m.icon} year={m.year} title={m.title} description={m.description} />
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-content pb-20">
        <SectionHeading eyebrow="Galeri" title="Kenangan & Momen Penting" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { src: '/images/gallery-graduation.png', alt: 'Wisuda STIKOM Tunas Bangsa', caption: 'Hari wisuda — melepas lulusan siap berkarya' },
            { src: '/images/profil-campus.png', alt: 'Kampus STIKOM Tunas Bangsa', caption: 'Kampus STIKOM Tunas Bangsa di Pematangsiantar' },
          ].map((img, i) => (
            <Reveal key={img.src} delay={i * 0.05}>
              <div className="group overflow-hidden rounded-2xl border border-border/60">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="bg-card/80 px-5 py-3 backdrop-blur">
                  <p className="text-sm font-medium text-muted-foreground">{img.caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

function TimelineCard({
  year,
  title,
  description,
}: {
  icon: ComponentType<{ className?: string }>
  year: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary dark:bg-accent/15 dark:text-accent">
        {year}
      </span>
      <h3 className="mt-3 text-lg font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  )
}
