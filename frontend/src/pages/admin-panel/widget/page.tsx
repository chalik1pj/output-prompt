import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Wrench } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import api from '@/lib/api'

export default function WidgetListPage() {
  const [widgets, setWidgets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('campus_stat')

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [subtitle, setSubtitle] = useState('')

  const fetchWidgets = () => {
    setLoading(true)
    api.get(`/admin/widgets?widget_type=${activeTab}`).then((res) => {
      setWidgets(res.data.data || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchWidgets()
  }, [activeTab])

  const openForm = (w?: any) => {
    if (w) {
      setEditing(w)
      setTitle(w.title)
      setValue(w.value || '')
      setSubtitle(w.subtitle || '')
    } else {
      setEditing(null)
      setTitle('')
      setValue('')
      setSubtitle('')
    }
    setShowModal(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      widget_type: activeTab,
      title,
      value: value ? Number(value) : null,
      subtitle,
    }

    if (editing) {
      await api.put(`/admin/widgets/${editing.id}`, payload)
    } else {
      await api.post('/admin/widgets', payload)
    }
    setShowModal(false)
    fetchWidgets()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus widget ini?')) return
    await api.delete(`/admin/widgets/${id}`)
    fetchWidgets()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Kelola Widget Situs</h1>
          <p className="text-sm text-muted-foreground">Kelola statistik kampus, mitra, dan testimoni.</p>
        </div>
        <button
          onClick={() => openForm()}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Tambah Widget
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-4">
        {[
          { type: 'campus_stat', label: 'Statistik Kampus' },
          { type: 'partner', label: 'Mitra Industri' },
          { type: 'testimonial', label: 'Testimoni' },
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
          <div className="p-12 text-center text-muted-foreground">Memuat widget...</div>
        ) : widgets.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">Belum ada data untuk kategori ini.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-secondary/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Judul / Nama</th>
                  <th className="px-6 py-3">Nilai (Value)</th>
                  <th className="px-6 py-3">Subtitle / Peran</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {widgets.map((w) => (
                  <tr key={w.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 font-semibold">{w.title}</td>
                    <td className="px-6 py-4 font-mono font-bold text-accent">{w.value ?? '-'}</td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">{w.subtitle || '-'}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openForm(w)}
                        className="inline-flex p-2 rounded-lg border border-border hover:bg-secondary text-primary"
                      >
                        <Edit className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(w.id)}
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
            <h2 className="font-display text-xl font-bold">{editing ? 'Edit Widget' : 'Tambah Widget'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Judul / Nama</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" />
              </div>
              {activeTab === 'campus_stat' && (
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Nilai Angka (Value)</label>
                  <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="form-input" />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Subtitle / Peran</label>
                <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="form-input" />
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
