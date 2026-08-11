import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Award, BookOpen, Briefcase, CheckCircle2, ChevronRight, GraduationCap } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { GradientButton } from '@/components/site/gradient-button'
import { CtaSection } from '@/components/sections/cta'
import api from '@/lib/api'

export default function ProgramDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [program, setProgram] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    api.get(`/programs/${slug}`).then((res) => {
      setProgram(res.data.data)
    }).catch(() => {
      setProgram(null)
    }).finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!program) {
    return (
      <div className="mx-content flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-3xl font-bold">Program Tidak Ditemukan</h1>
        <p className="mt-2 text-muted-foreground">Program studi yang Anda cari tidak tersedia.</p>
        <div className="mt-6">
          <GradientButton href="/programs">Lihat Semua Program</GradientButton>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow={`Program ${program.degree_level || 'S1'}`}
        title={program.name}
        description={program.short_description}
        variant="program-detail"
        breadcrumb={
          <div className="mx-content pt-28">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary">Beranda</Link>
              <ChevronRight className="size-3" />
              <Link to="/programs" className="hover:text-primary">Program Studi</Link>
              <ChevronRight className="size-3" />
              <span className="text-foreground">{program.name}</span>
            </nav>
          </div>
        }
      />

      <section className="mx-content py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main info */}
          <div className="space-y-12 lg:col-span-2">
            {program.full_description && (
              <Reveal>
                <h2 className="font-display text-2xl font-bold">Tentang Program Studi</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                  {program.full_description}
                </p>
              </Reveal>
            )}

            {program.competencies?.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-bold">Kompetensi Utama</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {program.competencies.map((comp: string, i: number) => (
                    <GlassCard key={i} className="flex items-center gap-3 p-4">
                      <CheckCircle2 className="size-5 shrink-0 text-accent" />
                      <span className="font-medium">{comp}</span>
                    </GlassCard>
                  ))}
                </div>
              </Reveal>
            )}

            {program.curriculum?.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-bold">Struktur Kurikulum</h2>
                <div className="mt-6 space-y-4">
                  {program.curriculum.map((curr: any, i: number) => (
                    <GlassCard key={i} className="p-6">
                      <h3 className="font-display font-semibold text-primary">
                        {curr.label || curr.semester || `Semester ${i + 1}`}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {curr.description || curr.courses}
                      </p>
                    </GlassCard>
                  ))}
                </div>
              </Reveal>
            )}

            {program.careers?.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-bold">Peluang Karir Lulusan</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {program.careers.map((car: string, i: number) => (
                    <GlassCard key={i} className="flex items-center gap-3 p-4">
                      <Briefcase className="size-5 shrink-0 text-primary" />
                      <span className="font-medium">{car}</span>
                    </GlassCard>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Reveal>
              <GlassCard strong className="p-6 space-y-6">
                <div className="border-b border-border pb-4">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Jenjang</span>
                  <p className="font-display text-xl font-bold mt-1">{program.degree_level}</p>
                </div>

                <div className="border-b border-border pb-4">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Akreditasi</span>
                  <p className="font-display text-xl font-bold mt-1 text-accent">{program.accreditation || 'BAN-PT'}</p>
                </div>

                <div>
                  <GradientButton href="/admissions" className="w-full">
                    Daftar Sekarang
                  </GradientButton>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
