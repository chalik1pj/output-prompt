import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, GraduationCap } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import api from '@/lib/api'

export default function StudentProgramListPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('scholarship')

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [provider, setProvider] = useState('')
  const [description, setDescription] = useState('')

  const fetchItems = () => {
    setLoading(true)
    api.get(`/admin/student-programs?program_type=${activeTab}`).then((res) => {
      setItems(res.data.data || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchItems()
  }, [activeTab])

  const openForm = (item?: any) => {
    if (item) {
      setEditing(item)
      setTitle(item.title)
      setProvider(item.provider || '')
      setDescription(item.description || '')
    } else {
      setEditing(null)
      setTitle('')
      setProvider('')
      setDescription('')
    }
    setShowModal(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      program_type: activeTab,
      title,
      provider,
      description,
    }

    if (editing) {
      await api.put(`/admin/student-programs/${editing.id}`, payload)
    } else {
      await api.post('/admin/student-programs', payload)
    }
    setShowModal(false)
    fetchItems()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus program mahasiswa ini?')) return
    await api.delete(`/admin/student-programs/${id}`)
    fetchItems()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Kelola Layanan Mahasiswa</h1>
          <p className="text-sm text-muted-foreground">Kelola beasiswa dan program pertukaran mahasiswa.</p>
        </div>
        <button
          onClick={() => openForm()}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Tambah Program
        </button>
      </div>

      <div className="flex border-b border-border gap-4">
        {[
          { type: 'scholarship', label: 'Beasiswa' },
          { type: 'exchange', label: 'Pertukaran & MBKM' },
        ].map((t) => (
          <button
            key={t.type}
            onClick={() => setActiveTab(t.type)}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === t.type ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <GlassCard className="overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">Memuat data...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">Belum ada data untuk kategori ini.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-secondary/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Nama Program</th>
                  <th className="px-6 py-3">Penyelenggara / Provider</th>
                  <th className="px-6 py-3">Deskripsi</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 font-semibold">{item.title}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-accent">{item.provider || '-'}</td>
                    <td className="px-6 py-4 text-xs text-muted-foreground max-w-md truncate">{item.description || '-'}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openForm(item)}
                        className="inline-flex p-2 rounded-lg border border-border hover:bg-secondary text-primary"
                      >
                        <Edit className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <GlassCard strong className="w-full max-w-md p-6 space-y-4">
            <h2 className="font-display text-xl font-bold">{editing ? 'Edit Program' : 'Tambah Program'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Nama Program</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Penyelenggara / Provider</label>
                <input type="text" value={provider} onChange={(e) => setProvider(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Deskripsi</label>
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="form-input text-sm" />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm rounded-xl border border-border">Batal</button>
                <button type="submit" className="px-4 py-2 text-sm rounded-xl bg-primary text-primary-foreground font-semibold">Simpan</button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
