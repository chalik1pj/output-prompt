import { useQuery } from '@tanstack/react-query'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { BookOpen, FileText, GraduationCap, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GlassCard } from '@/components/site/glass-card'
import { StatCard } from '@/components/site/stat-card'
import api from '@/lib/api'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import type { DashboardStats, RecentPost } from '@/lib/admin-api/types'

const CONTENT_TYPE_LABELS: Record<string, string> = {
  berita: 'Berita',
  pengumuman: 'Pengumuman',
  kegiatan_akademik: 'Kegiatan Akademik',
  kegiatan_mahasiswa: 'Kegiatan Mahasiswa',
  prestasi_kampus: 'Prestasi Kampus',
  prestasi_dosen: 'Prestasi Dosen',
  prestasi_mahasiswa: 'Prestasi Mahasiswa',
}

const PIE_COLORS = ['#2563eb', '#06b6d4', '#22c55e', '#f97316', '#a855f7', '#ec4899', '#64748b']

const STATUS_BADGE: Record<string, string> = {
  published: 'bg-success/15 text-success',
  draft: 'bg-secondary text-muted-foreground',
  archived: 'bg-destructive/15 text-destructive',
}

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'Baru saja'
  if (mins < 60) return `${mins} menit lalu`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} jam lalu`
  const days = Math.floor(hours / 24)
  return `${days} hari lalu`
}

export default function DashboardOverviewPage() {
  const { admin } = useAdminAuth()

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => (await api.get<{ data: DashboardStats }>('/admin/dashboard/stats')).data.data,
  })

  const { data: recent, isLoading: recentLoading } = useQuery({
    queryKey: ['dashboard', 'recent-posts'],
    queryFn: async () => (await api.get<{ data: RecentPost[] }>('/admin/dashboard/recent-posts')).data.data,
  })

  const { data: trend } = useQuery({
    queryKey: ['dashboard', 'trend'],
    queryFn: async () => {
      const res = await api.get<{ data: { date: string; total: number }[] }>('/admin/dashboard/trend')
      return res.data.data.map((d) => ({
        ...d,
        label: new Date(d.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
      }))
    },
  })

  const byType = stats
    ? Object.entries(stats.posts.by_content_type).map(([key, value]) => ({
        name: CONTENT_TYPE_LABELS[key] ?? key,
        value,
      }))
    : []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Halo, {admin?.name?.split(' ')[0] ?? 'Admin'} 👋</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ringkasan aktivitas & statistik konten STIKOM Tunas Bangsa CMS.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Post"
          value={stats?.posts.total ?? 0}
          icon={FileText}
          accent="primary"
          hint={`${stats?.posts.published ?? 0} published · ${stats?.posts.draft ?? 0} draft`}
          loading={statsLoading}
        />
        <StatCard
          label="Program Studi"
          value={stats?.programs.total ?? 0}
          icon={BookOpen}
          accent="accent"
          hint={`${stats?.programs.published ?? 0} aktif tayang`}
          loading={statsLoading}
        />
        <StatCard
          label="Dosen Terdaftar"
          value={stats?.lecturers ?? 0}
          icon={GraduationCap}
          accent="success"
          loading={statsLoading}
        />
        {admin?.role === 'super_admin' && (
          <StatCard
            label="Akun Admin"
            value={stats?.admins ?? 0}
            icon={ShieldCheck}
            accent="warning"
            loading={statsLoading}
          />
        )}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <h2 className="font-display text-base font-bold">Post Dipublikasikan · 14 Hari Terakhir</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend ?? []}>
                <defs>
                  <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fill="url(#trendFill)"
                  name="Post"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="font-display text-base font-bold">Distribusi Jenis Konten</h2>
          <div className="mt-2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byType} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
                  {byType.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {byType.map((t, i) => (
              <div key={t.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 shrink-0 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="truncate">{t.name}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent Activity */}
      <GlassCard className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-border p-6 pb-4">
          <h2 className="font-display text-base font-bold">Aktivitas Terbaru</h2>
          <Link to="/admin-panel/post" className="text-xs font-semibold text-primary hover:underline">
            Lihat semua
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-secondary/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Judul</th>
                <th className="px-6 py-3">Jenis</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Penulis</th>
                <th className="px-6 py-3">Diubah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-4 w-full animate-pulse rounded bg-secondary" />
                        </td>
                      ))}
                    </tr>
                  ))
                : recent?.map((post) => (
                    <tr key={post.id} className="transition-colors hover:bg-secondary/30">
                      <td className="max-w-xs truncate px-6 py-4 font-medium">
                        <Link to={`/admin-panel/post/${post.id}`} className="hover:text-primary">
                          {post.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {CONTENT_TYPE_LABELS[post.content_type] ?? post.content_type}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[post.status]}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">{post.author?.name ?? '-'}</td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">{timeAgo(post.updated_at)}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {!recentLoading && recent?.length === 0 && (
            <p className="p-12 text-center text-sm text-muted-foreground">Belum ada aktivitas.</p>
          )}
        </div>
      </GlassCard>
    </div>
  )
}
