import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
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
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const saved = sessionStorage.getItem('admin_user')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem('admin_token')
  })
  const [isLoading, setIsLoading] = useState(false)

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
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`
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
    delete api.defaults.headers.common.Authorization
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
