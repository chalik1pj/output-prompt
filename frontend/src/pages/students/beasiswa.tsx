import { GraduationCap } from 'lucide-react'
import { Breadcrumb } from '@/components/site/breadcrumb'
import { CtaSection } from '@/components/sections/cta'
import { GlassCard } from '@/components/site/glass-card'
import { GradientButton } from '@/components/site/gradient-button'
import { PageHeader } from '@/components/site/page-header'
import { Pagination } from '@/components/site/pagination'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { StepsProcess, type StepItem } from '@/components/site/steps-process'
import { usePaginatedStudentPrograms } from '@/hooks/use-paginated-student-programs'

const steps: StepItem[] = [
  { icon: 'FileText', title: 'Siapkan Berkas', description: 'Kumpulkan transkrip nilai, surat keterangan tidak mampu/prestasi, dan KTP/KK.' },
  { icon: 'Send', title: 'Ajukan Online', description: 'Isi formulir pendaftaran beasiswa melalui portal akademik sebelum tenggat waktu.' },
  { icon: 'UserCheck', title: 'Seleksi & Wawancara', description: 'Tim beasiswa meninjau berkas dan dapat memanggil untuk sesi wawancara.' },
  { icon: 'GraduationCap', title: 'Pengumuman & Pencairan', description: 'Penerima diumumkan resmi, beasiswa dicairkan sesuai skema masing-masing program.' },
]

const breadcrumbItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Mahasiswa', href: '/students/kegiatan-mahasiswa' },
  { label: 'Beasiswa' },
]

export default function BeasiswaPage() {
  const { items, meta, loading, goToPage } = usePaginatedStudentPrograms('beasiswa')

  return (
    <>
      <PageHeader
        eyebrow="Mahasiswa · Beasiswa"
        title="Wujudkan Pendidikan Tanpa Batas Biaya"
        description="Beragam skema beasiswa bagi mahasiswa berprestasi maupun yang membutuhkan bantuan biaya pendidikan."
        variant="beasiswa"
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      {/* Daftar beasiswa -- database-driven & berpaginasi */}
      <section className="mx-content py-12">
        <SectionHeading eyebrow="Program Tersedia" title="Pilihan Beasiswa STIKOM Tunas Bangsa" />

        {loading ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">Belum ada program beasiswa yang diterbitkan.</p>
        ) : (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.05}>
                  <GlassCard className="flex h-full flex-col p-6" hover>
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-accent/15 dark:text-accent">
                      <GraduationCap className="size-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground">{item.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                    {item.requirements && (
                      <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
                        {item.requirements
                          .split('\n')
                          .filter(Boolean)
                          .slice(0, 3)
                          .map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                              {req}
                            </li>
                          ))}
                      </ul>
                    )}
                  </GlassCard>
                </Reveal>
              ))}
            </div>
            {meta && <Pagination meta={meta} onPageChange={goToPage} />}
          </>
        )}
      </section>

      <StepsProcess eyebrow="Alur Pengajuan" title="Cara Mendaftar Beasiswa" steps={steps} />

      <section className="mx-content pb-20">
        <Reveal className="flex justify-center">
          <GradientButton href="/contact">Konsultasi dengan Bagian Kemahasiswaan</GradientButton>
        </Reveal>
      </section>

      <CtaSection />
    </>
  )
}
