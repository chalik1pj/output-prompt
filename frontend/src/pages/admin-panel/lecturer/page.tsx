import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Users } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import api from '@/lib/api'

export default function LecturerListPage() {
  const [lecturers, setLecturers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any>(null)

  const [name, setName] = useState('')
  const [nidn, setNidn] = useState('')
  const [title, setTitle] = useState('')
  const [expertise, setExpertise] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  const fetchLecturers = () => {
    setLoading(true)
    api.get('/admin/lecturers').then((res) => {
      setLecturers(res.data.data || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchLecturers()
  }, [])

  const openForm = (lec?: any) => {
    if (lec) {
      setEditing(lec)
      setName(lec.name)
      setNidn(lec.nidn || '')
      setTitle(lec.title || '')
      setExpertise(Array.isArray(lec.expertise) ? lec.expertise.join(', ') : '')
      setPhotoUrl(lec.photo_url || '')
    } else {
      setEditing(null)
      setName('')
      setNidn('')
      setTitle('')
      setExpertise('')
      setPhotoUrl('')
    }
    setShowModal(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      name,
      nidn,
      title,
      expertise: expertise ? expertise.split(',').map((s) => s.trim()) : [],
      photo_url: photoUrl || null,
    }

    if (editing) {
      await api.put(`/admin/lecturers/${editing.id}`, payload)
    } else {
      await api.post('/admin/lecturers', payload)
    }
    setShowModal(false)
    fetchLecturers()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus dosen ini?')) return
    await api.delete(`/admin/lecturers/${id}`)
    fetchLecturers()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Kelola Dosen & Staff</h1>
          <p className="text-sm text-muted-foreground">Kelola profil dosen, NIDN, dan kepakaran.</p>
        </div>
        <button
          onClick={() => openForm()}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Tambah Dosen
        </button>
      </div>

      <GlassCard className="overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">Memuat data dosen...</div>
        ) : lecturers.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">Belum ada dosen terdaftar.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-secondary/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Nama Dosen</th>
                  <th className="px-6 py-3">NIDN</th>
                  <th className="px-6 py-3">Jabatan</th>
                  <th className="px-6 py-3">Bidang Keahlian</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {lecturers.map((lec) => (
                  <tr key={lec.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 font-semibold flex items-center gap-3">
                      <img src={lec.photo_url || '/images/avatar-budi.png'} alt={lec.name} className="size-8 rounded-full object-cover" />
                      {lec.name}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono">{lec.nidn}</td>
                    <td className="px-6 py-4 text-xs">{lec.title || '-'}</td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">
                      {Array.isArray(lec.expertise) ? lec.expertise.join(', ') : '-'}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openForm(lec)}
                        className="inline-flex p-2 rounded-lg border border-border hover:bg-secondary text-primary"
                      >
                        <Edit className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(lec.id)}
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
            <h2 className="font-display text-xl font-bold">{editing ? 'Edit Dosen' : 'Tambah Dosen'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Nama Lengkap & Gelar</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">NIDN</label>
                <input type="text" required value={nidn} onChange={(e) => setNidn(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Jabatan / Judul</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Keahlian (pisahkan koma)</label>
                <input type="text" value={expertise} onChange={(e) => setExpertise(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Foto URL</label>
                <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="form-input" />
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
