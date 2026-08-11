import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { GlassCard } from '@/components/site/glass-card'
import api from '@/lib/api'

export default function PostFormPage() {
  const { id } = useParams<{ id?: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [contentType, setContentType] = useState('news')
  const [categoryName, setCategoryName] = useState('Berita Kampus')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [content, setContent] = useState('')
  const [isPublished, setIsPublished] = useState(true)
  const [tab, setTab] = useState<'write' | 'preview'>('write')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isEdit && id) {
      api.get(`/admin/posts/${id}`).then((res) => {
        const data = res.data.data
        setTitle(data.title)
        setContentType(data.content_type)
        setCategoryName(data.category_name || '')
        setThumbnailUrl(data.thumbnail_url || '')
        setContent(data.content || '')
        setIsPublished(data.is_published)
      }).catch(() => {
        setError('Gagal memuat data post.')
      })
    }
  }, [id, isEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const payload = {
      title,
      content_type: contentType,
      category_name: categoryName,
      thumbnail_url: thumbnailUrl || null,
      content,
      is_published: isPublished,
    }

    try {
      if (isEdit) {
        await api.put(`/admin/posts/${id}`, payload)
      } else {
        await api.post('/admin/posts', payload)
      }
      navigate('/admin-panel/post')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat menyimpan post.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin-panel/post')}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Daftar Post
        </button>
        <h1 className="font-display text-xl font-bold">
          {isEdit ? 'Edit Post' : 'Buat Post Baru'}
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
              Judul Post
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul post..."
              className="form-input"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Tipe Konten
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="form-input"
              >
                <option value="news">Berita Kampus</option>
                <option value="announcement">Pengumuman</option>
                <option value="kegiatan_akademik">Kegiatan Akademik</option>
                <option value="kegiatan_mahasiswa">Kegiatan Mahasiswa</option>
                <option value="prestasi_mahasiswa">Prestasi Mahasiswa</option>
                <option value="prestasi_dosen">Prestasi Dosen</option>
                <option value="prestasi_kampus">Prestasi Kampus</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Label Kategori (Opsional)
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="mis. Berita Utama, Pengumuman"
                className="form-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              URL Gambar Thumbnail
            </label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="/images/news-1.png atau https://..."
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
              Publikasikan Sekarang (Uncheck untuk simpan sebagai draft)
            </label>
          </div>
        </GlassCard>

        {/* Content Markdown Editor & Live Preview */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Konten (Markdown Format)
            </label>
            <div className="flex gap-1 rounded-lg bg-secondary p-1">
              <button
                type="button"
                onClick={() => setTab('write')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  tab === 'write' ? 'bg-background text-foreground shadow' : 'text-muted-foreground'
                }`}
              >
                Tulis Markdown
              </button>
              <button
                type="button"
                onClick={() => setTab('preview')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  tab === 'preview' ? 'bg-background text-foreground shadow' : 'text-muted-foreground'
                }`}
              >
                Preview Preview
              </button>
            </div>
          </div>

          {tab === 'write' ? (
            <textarea
              rows={12}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis artikel menggunakan sintaks Markdown (*bold*, # Title, - list, [link](url))..."
              className="form-input font-mono text-sm leading-relaxed"
            />
          ) : (
            <div className="min-h-[300px] rounded-xl border border-border bg-background p-4 prose prose-slate dark:prose-invert max-w-none text-sm">
              <ReactMarkdown>{content || '*Belum ada konten untuk dipreview.*'}</ReactMarkdown>
            </div>
          )}
        </GlassCard>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin-panel/post')}
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
            {loading ? 'Menyimpan...' : 'Simpan Post'}
          </button>
        </div>
      </form>
    </div>
  )
}
