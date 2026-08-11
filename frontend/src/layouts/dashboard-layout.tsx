import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  BookOpen,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  ShieldAlert,
  Users,
  Wrench,
  Sun,
  Moon,
} from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { useTheme } from '@/lib/theme-provider'
import { Logo } from '@/components/site/logo'
import { cn } from '@/lib/utils'

export default function DashboardLayout() {
  const { admin, logout } = useAdminAuth()
  const { resolved, setTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin-panel/login')
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin-panel/dashboard', icon: LayoutDashboard },
    { label: 'Posts & Berita', href: '/admin-panel/post', icon: FileText },
    { label: 'Program Studi', href: '/admin-panel/program', icon: BookOpen },
    { label: 'Dosen & Staff', href: '/admin-panel/lecturer', icon: Users },
    { label: 'Widget Site', href: '/admin-panel/widget', icon: Wrench },
    { label: 'Kemahasiswaan', href: '/admin-panel/student-program', icon: GraduationCap },
  ]

  if (admin?.role === 'super_admin') {
    navItems.push({ label: 'Kelola Admin', href: '/admin-panel/admin', icon: ShieldAlert })
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-card/60 backdrop-blur flex flex-col justify-between p-4">
        <div className="space-y-6">
          <div className="px-2 pt-2">
            <Logo />
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }: { isActive: boolean }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold shadow-md'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  )
                }
              >
                <item.icon className="size-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Footer info & Logout */}
        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{admin?.name}</p>
              <p className="text-xs text-muted-foreground uppercase">{admin?.role}</p>
            </div>
            <button
              type="button"
              onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full border border-border hover:bg-secondary"
            >
              {resolved === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/20 transition-colors"
          >
            <LogOut className="size-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Admin View */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
