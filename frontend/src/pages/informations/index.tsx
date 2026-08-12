import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/site/page-header'
import { NewsCard, type NewsCardItem } from '@/components/site/news-card'
import { Reveal } from '@/components/site/reveal'
import api from '@/lib/api'

export default function InformationsPage() {
  const [news, setNews] = useState<NewsCardItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // type=berita -> hanya kategori "Berita" (terpisah dari Pengumuman yang
    // punya halaman /announcements sendiri, lihat lib/site.ts).
    api
      .get('/posts', { params: { type: 'berita', per_page: 9 } })
      .then((res) => setNews(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Informasi & Berita"
        title="Kabar & Seputar Kampus"
        description="Berita terbaru, kegiatan akademik, rilis riset, dan prestasi civitas akademika STIKOM Tunas Bangsa."
        variant="news"
      />

      <section className="mx-content py-20">
        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : news.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">Belum ada berita yang diterbitkan.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.05}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
