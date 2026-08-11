import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NewsCard({ item }: { item: any }) {
  const title = item.title
  const slug = item.slug
  const image = item.image || item.thumbnail_url || '/images/news-1.png'
  const category = item.category || item.category_name || 'Berita'
  const date = item.date || item.published_at_formatted || item.published_at || '10 Agt 2025'
  const readTime = item.readTime || item.read_time || '4 mnt baca'
  const excerpt = item.excerpt || item.summary || item.meta_description || ''
  const linkTo = slug ? `/informations/${slug}` : '/informations'

  return (
    <Link
      to={linkTo}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={image}
          alt={title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
          {category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {readTime}
          </span>
        </div>
        <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-tight text-balance">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Baca Selengkapnya
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
