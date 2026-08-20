import { ArrowRight, Search, SearchX } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchSite } from '@/lib/search-index'

interface SiteSearchProps {
  /** Dipanggil setelah navigasi (mis. untuk menutup dropdown/menu pemanggil). */
  onNavigate?: () => void
  /** Dipanggil saat user menekan Escape. */
  onClose?: () => void
  autoFocus?: boolean
  placeholder?: string
  className?: string
  /** Kelas tambahan untuk kotak input (mis. "glass-strong shadow-lg" di dropdown desktop). */
  boxClassName?: string
}

/**
 * Pencarian situs sepenuhnya client-side -- mencocokkan query terhadap
 * lib/search-index.ts (daftar statis halaman & konten tetap), TIDAK memanggil API
 * backend sama sekali. Dipakai di dua tempat: dropdown search desktop (navbar.tsx)
 * dan menu mobile (hamburger) supaya pencarian tetap tersedia di layar kecil.
 */
export function SiteSearch({ onNavigate, onClose, autoFocus, placeholder, className, boxClassName }: SiteSearchProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => searchSite(query), [query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const goTo = (href: string) => {
    navigate(href)
    setQuery('')
    onNavigate?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      if (query) {
        setQuery('')
      } else {
        onClose?.()
      }
      return
    }
    if (results.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const target = results[activeIndex]
      if (target) goTo(target.href)
    }
  }

  return (
    <div className={className}>
      <div className={`flex items-center gap-3 rounded-2xl border border-border bg-background/60 px-4 py-3 ${boxClassName ?? ''}`}>
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          autoFocus={autoFocus}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? 'Cari program, halaman, dan lainnya…'}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
          ESC
        </kbd>
      </div>

      {query.trim() && (
        <div className="mt-2 max-h-80 overflow-y-auto rounded-2xl border border-border bg-background/95 shadow-lg backdrop-blur">
          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
              <SearchX className="size-6 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                Tidak ada hasil untuk &ldquo;{query}&rdquo;
              </p>
            </div>
          ) : (
            <ul className="py-1.5">
              {results.map((item, i) => (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => goTo(item.href)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors ${
                      i === activeIndex ? 'bg-secondary' : 'hover:bg-secondary/60'
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-medium text-foreground">{item.label}</span>
                      <span className="block text-xs text-muted-foreground">{item.category}</span>
                    </span>
                    <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
