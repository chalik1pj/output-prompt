import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import api from '@/lib/api'

export default function ProgramListPage() {
  const [programs, setPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPrograms = () => {
    setLoading(true)
    api.get('/admin/programs').then((res) => {
      setPrograms(res.data.data || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchPrograms()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus program studi ini?')) return
    await api.delete(`/admin/programs/${id}`)
    fetchPrograms()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Kelola Program Studi</h1>
          <p className="text-sm text-muted-foreground">Kelola kurikulum, deskripsi, dan informasi prodi.</p>
        </div>
        <Link
          to="/admin-panel/program/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Tambah Prodi Baru
        </Link>
      </div>

      <GlassCard className="overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">Memuat data program studi...</div>
        ) : programs.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">Belum ada program studi.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-secondary/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Nama Program</th>
                  <th className="px-6 py-3">Jenjang</th>
                  <th className="px-6 py-3">Jalur</th>
                  <th className="px-6 py-3">Akreditasi</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {programs.map((prog) => (
                  <tr key={prog.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 font-semibold">{prog.name}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-mono">
                        {prog.degree_level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs capitalize text-muted-foreground">{prog.track}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-accent">{prog.accreditation || 'BAN-PT'}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        to={`/admin-panel/program/${prog.id}`}
                        className="inline-flex p-2 rounded-lg border border-border hover:bg-secondary text-primary"
                      >
                        <Edit className="size-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(prog.id)}
                        className="inline-flex p-2 rounded-lg border border-destructive/30 hover:bg-destructive/10 text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
