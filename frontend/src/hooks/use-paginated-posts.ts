import { useEffect, useState } from 'react'
import api from '@/lib/api'
import type { PaginationMeta } from '@/components/site/pagination'

interface UsePaginatedPostsOptions {
  type: string
  category?: string
  perPage?: number
}

interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  total: number
  per_page: number
}

/**
 * Fetch paginated `posts` dari backend (GET /api/posts?type=...&category=...&page=...).
 * Dipakai di semua halaman kegiatan/prestasi/berita/pengumuman (7 dari 9 halaman yang
 * butuh pagination -- 2 sisanya, beasiswa & pertukaran, pakai use-paginated-student-programs).
 */
export function usePaginatedPosts<T = any>({ type, category, perPage = 9 }: UsePaginatedPostsOptions) {
  const [items, setItems] = useState<T[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPage(1)
  }, [type, category])

  useEffect(() => {
    setLoading(true)
    api
      .get<PaginatedResponse<T>>('/posts', {
        params: { type, category: category || undefined, page, per_page: perPage },
      })
      .then((res) => {
        setItems(res.data.data ?? [])
        setMeta({
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          total: res.data.total,
          per_page: res.data.per_page,
        })
      })
      .catch(() => {
        setItems([])
        setMeta(null)
      })
      .finally(() => setLoading(false))
  }, [type, category, page, perPage])

  const goToPage = (next: number) => {
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { items, meta, page, loading, goToPage }
}
