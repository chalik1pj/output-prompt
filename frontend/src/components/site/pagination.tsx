import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface PaginationMeta {
  current_page: number
  last_page: number
  total: number
  per_page: number
}

interface PaginationProps {
  meta: PaginationMeta
  onPageChange: (page: number) => void
}

/**
 * Pagination sederhana yang konsisten dengan bahasa visual situs (border-border,
 * bg-card, gradient untuk halaman aktif). Dipakai di semua halaman listing yang
 * fetch dari endpoint ber-paginate() Laravel (posts, student-programs).
 */
export function Pagination({ meta, onPageChange }: PaginationProps) {
  if (meta.last_page <= 1) return null

  const pages = getPageRange(meta.current_page, meta.last_page)

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
    >
      <p className="text-sm text-muted-foreground">
        Menampilkan halaman <span className="font-semibold text-foreground">{meta.current_page}</span> dari{' '}
        <span className="font-semibold text-foreground">{meta.last_page}</span>
        {' '}({meta.total} total)
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Halaman sebelumnya"
          disabled={meta.current_page <= 1}
          onClick={() => onPageChange(meta.current_page - 1)}
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="size-4" />
        </button>

        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="px-1 text-sm text-muted-foreground">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              aria-current={p === meta.current_page ? 'page' : undefined}
              onClick={() => onPageChange(p)}
              className={`inline-flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                p === meta.current_page
                  ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                  : 'border border-border bg-card text-foreground hover:border-primary/40'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          aria-label="Halaman berikutnya"
          disabled={meta.current_page >= meta.last_page}
          onClick={() => onPageChange(meta.current_page + 1)}
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </nav>
  )
}

function getPageRange(current: number, last: number): (number | '...')[] {
  const delta = 1
  const range: (number | '...')[] = []
  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= current - delta && i <= current + delta)) {
      range.push(i)
    } else if (range[range.length - 1] !== '...') {
      range.push('...')
    }
  }
  return range
}
