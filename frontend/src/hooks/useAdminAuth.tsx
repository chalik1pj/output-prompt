import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

export interface AdminUser {
  id: number
  name: string
  email: string
  role: 'super_admin' | 'editor'
  avatar_url: string | null
}

interface AdminAuthState {
  admin: AdminUser | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthState | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()

  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const saved = sessionStorage.getItem('admin_user')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('admin_token'))

  // BUG YANG DIPERBAIKI: sebelumnya, admin/role yang tersimpan di sessionStorage
  // langsung dipercaya begitu saja setiap kali halaman di-reload -- tidak pernah
  // divalidasi ulang ke server. Kalau token sudah kedaluwarsa/dicabut, atau role
  // admin baru saja diubah oleh super_admin lain, UI tetap menampilkan data LAMA
  // (mis. sidebar "Kelola Admin" tetap muncul walau role sudah diturunkan jadi
  // editor) sampai ada request lain yang kebetulan gagal dengan 401. Sekarang
  // divalidasi eksplisit lewat GET /admin/me setiap kali provider ini mount.
  const [isLoading, setIsLoading] = useState(() => !!sessionStorage.getItem('admin_token'))

  useEffect(() => {
    const existingToken = sessionStorage.getItem('admin_token')
    if (!existingToken) {
      setIsLoading(false)
      return
    }

    api
      .get('/admin/me')
      .then((res) => {
        const freshUser = res.data.data
        setAdmin(freshUser)
        sessionStorage.setItem('admin_user', JSON.stringify(freshUser))
      })
      .catch(() => {
        // Token tidak valid lagi -- bersihkan state lokal. Interceptor 401 di
        // lib/api.ts juga akan redirect, ini jaga-jaga di level context.
        setAdmin(null)
        setToken(null)
        sessionStorage.removeItem('admin_token')
        sessionStorage.removeItem('admin_user')
      })
      .finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await api.post('/admin/login', { email, password })
      const newToken = res.data.token
      const newUser = res.data.data

      setToken(newToken)
      setAdmin(newUser)
      sessionStorage.setItem('admin_token', newToken)
      sessionStorage.setItem('admin_user', JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await api.post('/admin/logout').catch(() => {})
    setAdmin(null)
    setToken(null)
    sessionStorage.removeItem('admin_token')
    sessionStorage.removeItem('admin_user')
    // Bersihkan cache React Query -- tanpa ini, kalau admin lain login di
    // browser/tab yang sama, sisa data cache milik sesi sebelumnya (posts,
    // stats dashboard, dst) bisa sempat tampil sebelum re-fetch selesai.
    queryClient.clear()
  }

  return (
    <AdminAuthContext.Provider value={{ admin, token, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
