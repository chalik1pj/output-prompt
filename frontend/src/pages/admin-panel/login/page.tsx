import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { Logo } from '@/components/site/logo'
import { GlassCard } from '@/components/site/glass-card'

export default function AdminLoginPage() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login(email, password)
      const from = (location.state as any)?.from?.pathname || '/admin-panel/dashboard'
      navigate(from, { replace: true })
    } catch (err: any) {
      if (err.response?.status === 429) {
        setError('Terlalu banyak percobaan login, coba lagi dalam 1 menit.')
      } else {
        setError('Email atau password salah.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-50" />

      <GlassCard strong className="relative z-10 w-full max-w-md p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <h1 className="font-display mt-6 text-2xl font-bold">Admin CMS Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">Masuk untuk mengelola situs STIKOM Tunas Bangsa</p>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            <AlertCircle className="size-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email"
                className="form-input !pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Pasword"
                className="form-input !pl-10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Masuk ke Dashboard'}
            {!loading && <ArrowRight className="size-4" />}
          </button>
        </form>
      </GlassCard>
    </div>
  )
}
