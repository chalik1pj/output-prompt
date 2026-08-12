import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NewsCard, type NewsCardItem } from '@/components/site/news-card'
import { Reveal } from '@/components/site/reveal'
import api from '@/lib/api'

export function InformatiosSection() {
  const [news, setNews] = useState<NewsCardItem[]>([])

  useEffect(() => {
    api
      .get('/posts', { params: { type: 'berita', per_page: 3 } })
      .then((r) => setNews(r.data.data ?? []))
  }, [])

  if (news.length === 0) return null

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-content">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-primary uppercase">
              <span className="size-1.5 rounded-full bg-accent" />
              Informasi Terbaru
            </span>
            <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Apa yang terjadi di STIKOM
            </h2>
          </Reveal>
          <Reveal>
            <Link
              to="/informations"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
            >
              Lihat semua informasi
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {news.map((item, i) => (
            <Reveal key={item.slug} index={i}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
