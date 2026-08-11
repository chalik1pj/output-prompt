import { useEffect, useState } from 'react'
import { Plus, Trash2, ShieldAlert } from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { GlassCard } from '@/components/site/glass-card'
import api from '@/lib/api'

export default function AdminListPage() {
  const { admin: currentUser } = useAdminAuth()
  const [admins, setAdmins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'super_admin' | 'editor'>('editor')

  const fetchAdmins = () => {
    setLoading(true)
    api.get('/admin/users').then((res) => {
      setAdmins(res.data.data || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => {
    if (currentUser?.role === 'super_admin') {
      fetchAdmins()
    }
  }, [currentUser])

  if (currentUser?.role !== 'super_admin') {
    return (
      <div className="p-12 text-center text-destructive space-y-2">
        <ShieldAlert className="size-12 mx-auto" />
        <h2 className="font-display text-xl font-bold">Akses Ditolak</h2>
        <p className="text-sm">Halaman ini hanya dapat diakses oleh Super Admin.</p>
      </div>
    )
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post('/admin/users', { name, email, password, role })
    setShowModal(false)
    setName('')
    setEmail('')
    setPassword('')
    fetchAdmins()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus akun admin ini?')) return
    await api.delete(`/admin/users/${id}`)
    fetchAdmins()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Kelola Akun Admin</h1>
          <p className="text-sm text-muted-foreground">Kelola pengguna panel admin dan hak akses (super_admin only).</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Tambah Admin
        </button>
      </div>

      <GlassCard className="overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">Memuat data admin...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-secondary/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {admins.map((u) => (
                  <tr key={u.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 font-semibold">{u.name}</td>
                    <td className="px-6 py-4 text-xs font-mono">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        u.role === 'super_admin' ? 'bg-purple-500/20 text-purple-300' : 'bg-secondary text-muted-foreground'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {u.id !== currentUser?.id && (
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="inline-flex p-2 rounded-lg border border-destructive/30 hover:bg-destructive/10 text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <GlassCard strong className="w-full max-w-md p-6 space-y-4">
            <h2 className="font-display text-xl font-bold">Tambah Admin Baru</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Nama Lengkap</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value as any)} className="form-input">
                  <option value="editor">Editor</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm rounded-xl border border-border">Batal</button>
                <button type="submit" className="px-4 py-2 text-sm rounded-xl bg-primary text-primary-foreground font-semibold">Simpan Admin</button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
