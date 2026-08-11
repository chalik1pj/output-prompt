import { useEffect, useState } from 'react'
import { Megaphone, CalendarDays, ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import api from '@/lib/api'
import ReactMarkdown from 'react-markdown'

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/posts?content_type=announcement').then((res) => {
      setAnnouncements(res.data.data || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Pengumuman Resmi"
        title="Pengumuman & Pemberitahuan"
        description="Informasi penting mengenai administrasi akademik, jadwal registrasi, jadwal ujian, dan edaran pimpinan."
        variant="pengumuman"
      />

      <section className="mx-content py-20">
        <div className="mx-auto max-w-4xl space-y-6">
          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              Belum ada pengumuman resmi.
            </div>
          ) : (
            announcements.map((item, i) => (
              <Reveal key={item.id || item.slug} delay={i * 0.05}>
                <GlassCard className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      <Megaphone className="size-3.5" />
                      {item.category_name || 'Pengumuman'}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      {item.published_at_formatted || item.published_at}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold">{item.title}</h2>
                  <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-muted-foreground leading-relaxed">
                    <ReactMarkdown>{item.content || item.excerpt || ''}</ReactMarkdown>
                  </div>
                </GlassCard>
              </Reveal>
            ))
          )}
        </div>
      </section>
    </>
  )
}
