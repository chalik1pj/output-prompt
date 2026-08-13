import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface ListingCardItem {
  content_type: string
  slug: string
  title: string
  excerpt?: string | null
  featured_image_url?: string | null
  category?: string | null
  published_at?: string | null
  read_time_minutes?: number | null
  competition_level?: string | null
  credited_name?: string | null
  credited_program_text?: string | null
  credited_initials?: string | null
}

function formatDate(value?: string | null): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

/**
 * Kartu listing generik -- dipakai di semua halaman kegiatan/prestasi (akademik &
 * mahasiswa). Beda dari NewsCard (khusus berita) karena mendukung baris identitas
 * "dikreditkan ke" (dosen/tim mahasiswa berprestasi) dan badge tingkat kompetisi.
 * Port dari 08-referensi-source-asli/components/site/listing-card.tsx.
 */
export function ListingCard({ item }: { item: ListingCardItem }) {
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
        {item.competition_level && (
          <span className="absolute right-4 top-4 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold capitalize text-white backdrop-blur">
            {item.competition_level}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {item.credited_name && (
          <div className="mb-3 flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">
              {item.credited_initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.credited_name}</p>
              {item.credited_program_text && (
                <p className="text-xs text-muted-foreground">{item.credited_program_text}</p>
              )}
            </div>
          </div>
        )}

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
