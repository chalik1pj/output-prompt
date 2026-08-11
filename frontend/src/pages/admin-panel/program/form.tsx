import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import api from '@/lib/api'

export default function ProgramFormPage() {
  const { id } = useParams<{ id?: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [degreeLevel, setDegreeLevel] = useState('S1')
  const [track, setTrack] = useState('sarjana')
  const [shortDescription, setShortDescription] = useState('')
  const [fullDescription, setFullDescription] = useState('')
  const [accreditation, setAccreditation] = useState('BAN-PT')
  const [badgeColor, setBadgeColor] = useState('blue')
  const [competencies, setCompetencies] = useState('')
  const [careers, setCareers] = useState('')
  const [isPublished, setIsPublished] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isEdit && id) {
      api.get(`/admin/programs/${id}`).then((res) => {
        const p = res.data.data
        setName(p.name)
        setDegreeLevel(p.degree_level)
        setTrack(p.track)
        setShortDescription(p.short_description || '')
        setFullDescription(p.full_description || '')
        setAccreditation(p.accreditation || 'BAN-PT')
        setBadgeColor(p.badge_color || 'blue')
        setCompetencies(Array.isArray(p.competencies) ? p.competencies.join(', ') : '')
        setCareers(Array.isArray(p.careers) ? p.careers.join(', ') : '')
        setIsPublished(p.is_published)
      }).catch(() => setError('Gagal memuat data prodi.'))
    }
  }, [id, isEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const payload = {
      name,
      degree_level: degreeLevel,
      track,
      short_description: shortDescription,
      full_description: fullDescription || null,
      accreditation,
      badge_color: badgeColor,
      competencies: competencies ? competencies.split(',').map((s) => s.trim()) : [],
      careers: careers ? careers.split(',').map((s) => s.trim()) : [],
      is_published: isPublished,
    }

    try {
      if (isEdit) {
        await api.put(`/admin/programs/${id}`, payload)
      } else {
        await api.post('/admin/programs', payload)
      }
      navigate('/admin-panel/program')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal menyimpan program studi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin-panel/program')}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Daftar Program
        </button>
        <h1 className="font-display text-xl font-bold">
          {isEdit ? 'Edit Program Studi' : 'Tambah Program Studi Baru'}
        </h1>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <GlassCard className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Nama Program Studi
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="mis. Teknik Informatika"
              className="form-input"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Jenjang
              </label>
              <input
                type="text"
                required
                value={degreeLevel}
                onChange={(e) => setDegreeLevel(e.target.value)}
                placeholder="mis. S1, D3, S2"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Jalur Track
              </label>
              <select value={track} onChange={(e) => setTrack(e.target.value)} className="form-input">
                <option value="sarjana">Sarjana</option>
                <option value="vokasi">Vokasi</option>
                <option value="pascasarjana">Pascasarjana</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Akreditasi
              </label>
              <input
                type="text"
                value={accreditation}
                onChange={(e) => setAccreditation(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Deskripsi Singkat
            </label>
            <textarea
              rows={3}
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="form-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Deskripsi Lengkap
            </label>
            <textarea
              rows={6}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="form-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Kompetensi Utama (pisahkan dengan koma)
            </label>
            <input
              type="text"
              value={competencies}
              onChange={(e) => setCompetencies(e.target.value)}
              placeholder="mis. Full-stack, Machine Learning, Cloud"
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Peluang Karir (pisahkan dengan koma)
            </label>
            <input
              type="text"
              value={careers}
              onChange={(e) => setCareers(e.target.value)}
              placeholder="mis. Software Engineer, Data Scientist"
              className="form-input"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="is_published"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="size-4 rounded border-border text-primary"
            />
            <label htmlFor="is_published" className="text-sm font-medium">
              Aktif / Tampilkan di Situs Publik
            </label>
          </div>
        </GlassCard>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin-panel/program')}
            className="rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="size-4" />
            {loading ? 'Menyimpan...' : 'Simpan Program'}
          </button>
        </div>
      </form>
    </div>
  )
}
