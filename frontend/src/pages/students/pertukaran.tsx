import { ArrowLeftRight, Globe2 } from 'lucide-react'
import { Breadcrumb } from '@/components/site/breadcrumb'
import { CtaSection } from '@/components/sections/cta'
import { GlassCard } from '@/components/site/glass-card'
import { PageHeader } from '@/components/site/page-header'
import { Pagination } from '@/components/site/pagination'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { StepsProcess, type StepItem } from '@/components/site/steps-process'
import { usePaginatedStudentPrograms } from '@/hooks/use-paginated-student-programs'

const steps: StepItem[] = [
  { icon: 'FileText', title: 'Cek Kelayakan', description: 'Pastikan IPK dan semester Anda memenuhi syarat minimum program tujuan.' },
  { icon: 'Send', title: 'Daftar & Unggah Berkas', description: 'Kirim formulir pendaftaran, transkrip nilai, dan surat rekomendasi dosen.' },
  { icon: 'UserCheck', title: 'Seleksi Kampus Mitra', description: 'Berkas diteruskan dan diseleksi oleh kampus/perusahaan mitra tujuan.' },
  { icon: 'Globe2', title: 'Berangkat & Konversi SKS', description: 'Ikuti program di lokasi tujuan, nilai dikonversi ke transkrip STIKOM.' },
]

const breadcrumbItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Mahasiswa', href: '/students/kegiatan-mahasiswa' },
  { label: 'Pertukaran Mahasiswa' },
]

export default function PertukaranMahasiswaPage() {
  const { items, meta, loading, goToPage } = usePaginatedStudentPrograms('pertukaran')

  return (
    <>
      <PageHeader
        eyebrow="Mahasiswa · Pertukaran"
        title="Perluas Wawasan Lintas Kampus dan Negara"
        description="Program mobilitas mahasiswa, magang industri bersertifikat, dan kuliah di kampus mitra dalam maupun luar negeri."
        variant="pertukaran"
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      <section className="mx-content py-12">
        <SectionHeading eyebrow="Program Tersedia" title="Pilihan Program Pertukaran & Mobilitas" />

        {loading ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">Belum ada program pertukaran yang diterbitkan.</p>
        ) : (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.05}>
                  <GlassCard className="flex h-full flex-col p-6" hover>
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-accent/15 dark:text-accent">
                      <ArrowLeftRight className="size-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground">{item.name}</h3>
                    {(item.country || item.scope) && (
                      <span className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        <Globe2 className="size-3" />
                        {[item.scope, item.country].filter(Boolean).join(' · ')}
                      </span>
                    )}
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
            {meta && <Pagination meta={meta} onPageChange={goToPage} />}
          </>
        )}
      </section>

      <StepsProcess eyebrow="Alur Pendaftaran" title="Cara Mengikuti Program Pertukaran" steps={steps} />

      <CtaSection />
    </>
  )
}
