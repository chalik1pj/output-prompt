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
        setAdmin(null)
        setToken(null)
        sessionStorage.removeItem('admin_token')
        sessionStorage.removeItem('admin_user')
      })
      .finally(() => setIsLoading(false))
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
    await api.post('/admin/logout').catch(() => { })
    setAdmin(null)
    setToken(null)
    sessionStorage.removeItem('admin_token')
    sessionStorage.removeItem('admin_user')
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
