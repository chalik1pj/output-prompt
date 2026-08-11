import { useEffect, useState } from 'react'
import { BookOpen, FileText, Users, Wrench } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import api from '@/lib/api'

export default function DashboardOverviewPage() {
  const [counts, setCounts] = useState({
    posts: 0,
    programs: 0,
    lecturers: 0,
    widgets: 0,
  })

  useEffect(() => {
    Promise.all([
      api.get('/admin/posts').catch(() => ({ data: { meta: { total: 0 } } })),
      api.get('/admin/programs').catch(() => ({ data: { data: [] } })),
      api.get('/admin/lecturers').catch(() => ({ data: { data: [] } })),
      api.get('/admin/widgets').catch(() => ({ data: { data: [] } })),
    ]).then(([p, prog, lec, w]) => {
      setCounts({
        posts: p.data.meta?.total || p.data.data?.length || 0,
        programs: prog.data.data?.length || 0,
        lecturers: lec.data.data?.length || 0,
        widgets: w.data.data?.length || 0,
      })
    })
  }, [])

  const cards = [
    { label: 'Total Posts & Berita', count: counts.posts, icon: FileText, color: 'text-primary' },
    { label: 'Program Studi', count: counts.programs, icon: BookOpen, color: 'text-accent' },
    { label: 'Dosen & Staff', count: counts.lecturers, icon: Users, color: 'text-success' },
    { label: 'Widget System', count: counts.widgets, icon: Wrench, color: 'text-purple-400' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Ringkasan Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Selamat datang di Panel Admin STIKOM Tunas Bangsa CMS.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <GlassCard key={c.label} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</span>
              <c.icon className={`size-5 ${c.color}`} />
            </div>
            <p className="font-display text-4xl font-extrabold">{c.count}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
