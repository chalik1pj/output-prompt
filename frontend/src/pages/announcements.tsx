import { useEffect, useState } from 'react'
import { Megaphone, CalendarDays } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { sanitizeHtml } from '@/lib/sanitize'
import api from '@/lib/api'

interface Announcement {
  id: number
  slug: string
  category: string | null
  title: string
  content: string | null
  excerpt: string | null
  published_at: string | null
}

function formatDate(value?: string | null): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // type=pengumuman -- satu-satunya content_type yang dipetakan ke halaman ini
    // (lihat DESIGN.md §11).
    api
      .get('/posts', { params: { type: 'pengumuman', per_page: 20 } })
      .then((res) => setAnnouncements(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
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
            <div className="py-16 text-center text-muted-foreground">Belum ada pengumuman resmi.</div>
          ) : (
            announcements.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.05}>
                <GlassCard className="space-y-4 p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      <Megaphone className="size-3.5" />
                      {item.category || 'Pengumuman'}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      {formatDate(item.published_at)}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold">{item.title}</h2>
                  <div
                    className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.content ?? item.excerpt ?? '') }}
                  />
                </GlassCard>
              </Reveal>
            ))
          )}
        </div>
      </section>
    </>
  )
}
