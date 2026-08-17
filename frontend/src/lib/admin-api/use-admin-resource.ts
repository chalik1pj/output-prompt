import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import api from '@/lib/api'
import { useToast } from '@/components/site/toast'
import type { PaginatedResult } from '@/lib/admin-api/types'

interface ListParams {
  page?: number
  per_page?: number
  [key: string]: string | number | undefined
}

export function useAdminList<T>(resource: string, queryKey: string, params: ListParams) {
  return useQuery({
    queryKey: [queryKey, 'list', params],
    queryFn: async () => {
      const res = await api.get<PaginatedResult<T>>(`/${resource}`, { params })
      return res.data
    },
    placeholderData: keepPreviousData,
  })
}

export function useAdminDetail<T>(resource: string, queryKey: string, id: string | number | undefined) {
  return useQuery({
    queryKey: [queryKey, 'detail', id],
    queryFn: async () => {
      const res = await api.get<{ data: T }>(`/${resource}/${id}`)
      return res.data.data
    },
    enabled: id !== undefined,
  })
}

export function useAdminCreate<T, P = Partial<T>>(resource: string, queryKey: string, successMessage: string) {
  const qc = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationFn: async (payload: P) => {
      const res = await api.post<{ data: T }>(`/${resource}`, payload)
      return res.data.data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [queryKey] })
      toast.success(successMessage)
    },
    onError: (err: any) => {
      toast.error(extractErrorMessage(err))
    },
  })
}

export function useAdminUpdate<T, P = Partial<T>>(resource: string, queryKey: string, successMessage: string) {
  const qc = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationFn: async ({ id, payload }: { id: number | string; payload: P }) => {
      const res = await api.put<{ data: T }>(`/${resource}/${id}`, payload)
      return res.data.data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [queryKey] })
      toast.success(successMessage)
    },
    onError: (err: any) => {
      toast.error(extractErrorMessage(err))
    },
  })
}

export function useAdminDelete(resource: string, queryKey: string, successMessage: string) {
  const qc = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationFn: async (id: number | string) => {
      await api.delete(`/${resource}/${id}`)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [queryKey] })
      toast.success(successMessage)
    },
    onError: (err: any) => {
      toast.error(extractErrorMessage(err))
    },
  })
}

export function extractErrorMessage(err: any): string {
  const data = err?.response?.data
  if (data?.errors) {
    const firstError = Object.values(data.errors)[0]
    if (Array.isArray(firstError)) return firstError[0] as string
  }
  if (data?.message) return data.message
  if (err?.code === 'ECONNABORTED') return 'Server tidak merespons (timeout). Coba lagi.'
  if (err?.message === 'Network Error') return 'Tidak bisa terhubung ke server. Cek koneksi Anda.'
  return 'Terjadi kesalahan tak terduga. Coba lagi.'
}
