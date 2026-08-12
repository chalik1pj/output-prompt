import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface NewsCardItem {
  content_type: string
  slug: string
  title: string
  excerpt?: string | null
  featured_image_url?: string | null
  category?: string | null
  published_at?: string | null
  read_time_minutes?: number | null
}

function formatDate(value?: string | null): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

/**
 * Kartu berita/pengumuman/kegiatan/prestasi -- link SELALU menyertakan
 * `content_type` (bukan cuma slug), karena backend butuh keduanya untuk
 * GET /api/posts/{contentType}/{slug}. Lihat DESIGN.md §11.
 */
export function NewsCard({ item }: { item: NewsCardItem }) {
  const linkTo = `/informations/${item.content_type}/${item.slug}`

  return (
    <Link
      to={linkTo}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={item.featured_image_url || '/images/news-1.png'}
          alt={item.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.category && (
          <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
            {item.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {formatDate(item.published_at)}
          </span>
          {item.read_time_minutes ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {item.read_time_minutes} menit baca
            </span>
          ) : null}
        </div>
        <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-tight text-balance">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {item.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Baca Selengkapnya
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
