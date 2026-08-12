import { Breadcrumb } from '@/components/site/breadcrumb'
import { GlassCard } from '@/components/site/glass-card'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const fasilitas = [
  {
    image: '/images/gallery-lab.png',
    title: 'Laboratorium Cerdas',
    badge: 'Lab',
    description:
      'Lab AI, IoT, networking, dan keamanan siber dengan peralatan setara standar enterprise, digunakan untuk praktikum dan proyek riset mahasiswa.',
  },
  {
    image: '/images/gallery-students.png',
    title: 'Hub Inovasi',
    badge: 'Startup',
    description:
      'Inkubator startup kampus tempat ide mahasiswa dikembangkan menjadi produk nyata, lengkap dengan mentoring dari praktisi industri.',
  },
  {
    image: '/images/gallery-lecture.png',
    title: 'Kelas Global',
    badge: 'Akademik',
    description:
      'Ruang kelas hybrid yang terhubung dengan mitra internasional untuk kuliah tamu dan kolaborasi lintas negara.',
  },
  {
    image: '/images/gallery-campus.png',
    title: 'Ruang Kolaboratif',
    badge: 'Ruang Kolaborasi',
    description: 'Studio terbuka dan maker space yang dirancang untuk kerja tim lintas program studi.',
  },
  {
    image: '/images/gallery-library.png',
    title: 'Perpustakaan Digital',
    badge: 'Akademik',
    description:
      'Akses koleksi buku fisik dan digital, jurnal ilmiah, serta ruang baca tenang untuk riset mandiri.',
  },
  {
    image: '/images/gallery-graduation.png',
    title: 'Aula & Ruang Seminar',
    badge: 'Fasilitas',
    description: 'Ruang serbaguna untuk seminar, wisuda, dan kegiatan kemahasiswaan berskala besar.',
  },
]

const galleryPhotos = [
  { src: '/images/gallery-lab.png', caption: 'Laboratorium modern dengan peralatan enterprise' },
  { src: '/images/gallery-students.png', caption: 'Mahasiswa berkolaborasi di hub inovasi' },
  { src: '/images/gallery-library.png', caption: 'Perpustakaan digital dan ruang baca' },
  { src: '/images/gallery-campus.png', caption: 'Suasana kampus STIKOM Tunas Bangsa' },
  { src: '/images/gallery-lecture.png', caption: 'Kelas interaktif dengan fasilitas hybrid' },
  { src: '/images/gallery-graduation.png', caption: 'Hari wisuda — merayakan pencapaian bersama' },
]

const breadcrumbItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Fasilitas Kampus' },
]

export default function FasilitasKampusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Profil · Fasilitas Kampus"
        title="Ruang yang Dirancang untuk Berkarya"
        description="Dari laboratorium AI hingga studio kolaboratif — setiap sudut kampus kami dibangun untuk mendukung proses belajar dan berinovasi."
        variant="fasilitas"
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      {/* Facility Cards */}
      <section className="mx-content py-20">
        <SectionHeading
          eyebrow="Fasilitas Kami"
          title="Mendukung Pembelajaran Berkualitas"
          description="Setiap ruang dan peralatan dirancang untuk memberikan pengalaman belajar terbaik bagi mahasiswa."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fasilitas.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <GlassCard className="group h-full overflow-hidden p-0" hover>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-card/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur">
                    {f.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {f.description}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-content pb-20">
        <SectionHeading eyebrow="Galeri Kampus" title="Jelajahi Setiap Sudut Kampus" />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryPhotos.map((img, i) => (
            <Reveal key={img.src + i} delay={i * 0.04}>
              <div className="group overflow-hidden rounded-2xl border border-border/60">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="bg-card/80 px-4 py-2.5 backdrop-blur">
                  <p className="text-xs font-medium text-muted-foreground">{img.caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
