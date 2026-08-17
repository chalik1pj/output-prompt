import { useEffect, useState } from 'react'
import api from '@/lib/api'
import type { PaginationMeta } from '@/components/site/pagination'

export interface StudentProgramItem {
  id: number
  program_type: 'beasiswa' | 'pertukaran'
  name: string
  description: string | null
  requirements: string | null
  how_to_apply: string | null
  country: string | null
  scope: string | null
  icon_name: string | null
  logo_url: string | null
}

interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  total: number
  per_page: number
}

export function usePaginatedStudentPrograms(type: 'beasiswa' | 'pertukaran', perPage = 6) {
  const [items, setItems] = useState<StudentProgramItem[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api
      .get<PaginatedResponse<StudentProgramItem>>('/student-programs', {
        params: { type, page, per_page: perPage },
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
  }, [type, page, perPage])

  const goToPage = (next: number) => {
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { items, meta, page, loading, goToPage }
}
