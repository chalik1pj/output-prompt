import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, Eye, Pencil, Save } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import { FormCheckbox, FormInput, FormSelect, FormTextarea, slugify } from '@/components/site/form-fields'
import { useAdminDetail, useAdminCreate, useAdminUpdate } from '@/lib/admin-api/use-admin-resource'
import type { AdminPost, ContentType } from '@/lib/admin-api/types'

const CONTENT_TYPES: { value: ContentType; label: string }[] = [
  { value: 'berita', label: 'Berita Kampus' },
  { value: 'pengumuman', label: 'Pengumuman' },
  { value: 'kegiatan_akademik', label: 'Kegiatan Akademik' },
  { value: 'kegiatan_mahasiswa', label: 'Kegiatan Mahasiswa' },
  { value: 'prestasi_kampus', label: 'Prestasi Kampus' },
  { value: 'prestasi_dosen', label: 'Prestasi Dosen' },
  { value: 'prestasi_mahasiswa', label: 'Prestasi Mahasiswa' },
]

const ACHIEVEMENT_TYPES: ContentType[] = ['prestasi_kampus', 'prestasi_dosen', 'prestasi_mahasiswa']
const PERSON_CREDIT_TYPES: ContentType[] = ['prestasi_dosen', 'prestasi_mahasiswa']

interface FormState {
  content_type: ContentType
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  featured_image_url: string
  priority: string
  competition_level: string
  achievement_year: string
  deadline: string
  event_date: string
  credited_name: string
  credited_program_text: string
  credited_initials: string
  read_time_minutes: string
  is_featured: boolean
  status: 'draft' | 'published' | 'archived'
}

const emptyForm: FormState = {
  content_type: 'berita',
  title: '',
  slug: '',
  category: '',
  excerpt: '',
  content: '',
  featured_image_url: '',
  priority: '',
  competition_level: '',
  achievement_year: '',
  deadline: '',
  event_date: '',
  credited_name: '',
  credited_program_text: '',
  credited_initials: '',
  read_time_minutes: '',
  is_featured: false,
  status: 'draft',
}

export default function PostFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const navigate = useNavigate()

  const { data: existing, isLoading: loadingDetail } = useAdminDetail<AdminPost>('admin/posts', 'posts', id)
  const createMutation = useAdminCreate<AdminPost>('admin/posts', 'posts', 'Post berhasil dibuat.')
  const updateMutation = useAdminUpdate<AdminPost>('admin/posts', 'posts', 'Perubahan berhasil disimpan.')

  const [form, setForm] = useState<FormState>(emptyForm)
  const [slugTouched, setSlugTouched] = useState(false)
  const [preview, setPreview] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (existing) {
      setForm({
        content_type: existing.content_type,
        title: existing.title,
        slug: existing.slug,
        category: existing.category ?? '',
        excerpt: existing.excerpt ?? '',
        content: existing.content ?? '',
        featured_image_url: existing.featured_image_url ?? '',
        priority: existing.priority ?? '',
        competition_level: existing.competition_level ?? '',
        achievement_year: existing.achievement_year ?? '',
        deadline: existing.deadline ?? '',
        event_date: existing.event_date ?? '',
        credited_name: existing.credited_name ?? '',
        credited_program_text: existing.credited_program_text ?? '',
        credited_initials: existing.credited_initials ?? '',
        read_time_minutes: existing.read_time_minutes?.toString() ?? '',
        is_featured: existing.is_featured,
        status: existing.status,
      })
      setSlugTouched(true)
    }
  }, [existing])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => {
      const next = { ...f, [key]: value }
      // Auto-generate slug dari title selama admin belum pernah mengedit slug manual.
      if (key === 'title' && !slugTouched) {
        next.slug = slugify(value as string)
      }
      return next
    })
  }

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.title.trim()) e.title = 'Judul wajib diisi.'
    if (!form.slug.trim()) e.slug = 'Slug wajib diisi.'
    else if (!/^[a-z0-9-]+$/.test(form.slug)) e.slug = 'Slug hanya boleh huruf kecil, angka, dan tanda strip.'
    if (!form.excerpt.trim()) e.excerpt = 'Ringkasan singkat membantu tampilan kartu di halaman publik.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    const payload = {
      content_type: form.content_type,
      title: form.title,
      slug: form.slug,
      category: form.category || null,
      excerpt: form.excerpt || null,
      content: form.content || null,
      featured_image_url: form.featured_image_url || null,
      priority: (form.priority || null) as 'normal' | 'penting' | null,
      competition_level: (form.competition_level || null) as AdminPost['competition_level'],
      achievement_year: form.achievement_year || null,
      deadline: form.deadline || null,
      event_date: form.event_date || null,
      credited_name: form.credited_name || null,
      credited_program_text: form.credited_program_text || null,
      credited_initials: form.credited_initials || null,
      read_time_minutes: form.read_time_minutes ? Number(form.read_time_minutes) : null,
      is_featured: form.is_featured,
      status: form.status,
    }

    if (isEdit) {
      await updateMutation.mutateAsync({ id: id!, payload })
    } else {
      const created = await createMutation.mutateAsync(payload)
      navigate(`/admin-panel/post/${created.id}`, { replace: true })
      return
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending
  const isAchievement = ACHIEVEMENT_TYPES.includes(form.content_type)
  const showPersonCredit = PERSON_CREDIT_TYPES.includes(form.content_type)
  const isAnnouncement = form.content_type === 'pengumuman'

  if (isEdit && loadingDetail) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-secondary" />
        <div className="h-96 animate-pulse rounded-3xl bg-secondary" />
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3">
        <Link to="/admin-panel/post" className="rounded-lg border border-border p-2 hover:bg-secondary">
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="font-display text-2xl font-bold">{isEdit ? 'Edit Post' : 'Buat Post Baru'}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="space-y-5 p-6">
            <FormSelect
              label="Jenis Konten"
              required
              value={form.content_type}
              onChange={(e) => update('content_type', e.target.value as ContentType)}
              disabled={isEdit}
              hint={isEdit ? 'Jenis konten tidak bisa diubah setelah dibuat.' : undefined}
            >
              {CONTENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </FormSelect>

            <FormInput
              label="Judul"
              required
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              error={errors.title}
              placeholder="Judul post yang menarik..."
            />

            <FormInput
              label="Slug (URL)"
              required
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true)
                update('slug', slugify(e.target.value))
              }}
              error={errors.slug}
              hint={`URL publik: /informations/${form.content_type}/${form.slug || '...'}`}
            />

            <FormTextarea
              label="Ringkasan Singkat (Excerpt)"
              required
              rows={2}
              value={form.excerpt}
              onChange={(e) => update('excerpt', e.target.value)}
              error={errors.excerpt}
              hint="Tampil di kartu listing, maksimal ~150 karakter."
            />

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Isi Lengkap (Markdown)
                </label>
                <button
                  type="button"
                  onClick={() => setPreview((p) => !p)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs font-medium hover:bg-secondary"
                >
                  {preview ? <Pencil className="size-3.5" /> : <Eye className="size-3.5" />}
                  {preview ? 'Tulis' : 'Pratinjau'}
                </button>
              </div>
              {preview ? (
                <div className="prose prose-slate dark:prose-invert min-h-[240px] max-w-none rounded-xl border border-border bg-background/60 p-4 text-sm">
                  <ReactMarkdown>{form.content || '*Belum ada konten...*'}</ReactMarkdown>
                </div>
              ) : (
                <textarea
                  value={form.content}
                  onChange={(e) => update('content', e.target.value)}
                  rows={12}
                  placeholder="Tulis isi lengkap artikel di sini (mendukung Markdown: **bold**, *italic*, ## Judul, - list, dst)..."
                  className="form-input font-mono text-sm"
                />
              )}
            </div>
          </GlassCard>

          {(isAchievement || showPersonCredit) && (
            <GlassCard className="space-y-5 p-6">
              <h2 className="font-display text-sm font-bold">Detail Prestasi</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormSelect
                  label="Tingkat Kompetisi"
                  value={form.competition_level}
                  onChange={(e) => update('competition_level', e.target.value)}
                >
                  <option value="">— Pilih —</option>
                  <option value="kampus">Kampus</option>
                  <option value="regional">Regional</option>
                  <option value="nasional">Nasional</option>
                  <option value="internasional">Internasional</option>
                </FormSelect>
                <FormInput
                  label="Tahun Prestasi"
                  value={form.achievement_year}
                  onChange={(e) => update('achievement_year', e.target.value)}
                  placeholder="2025"
                  maxLength={4}
                />
              </div>
              {showPersonCredit && (
                <div className="grid gap-4 sm:grid-cols-3">
                  <FormInput
                    label="Nama Dikreditkan"
                    value={form.credited_name}
                    onChange={(e) => update('credited_name', e.target.value)}
                    placeholder="Dr. Ahmad Fauzi / Tim InnoWater"
                  />
                  <FormInput
                    label="Program/Prodi"
                    value={form.credited_program_text}
                    onChange={(e) => update('credited_program_text', e.target.value)}
                    placeholder="Teknik Informatika"
                  />
                  <FormInput
                    label="Inisial (avatar)"
                    value={form.credited_initials}
                    onChange={(e) => update('credited_initials', e.target.value.toUpperCase().slice(0, 4))}
                    placeholder="AF"
                    maxLength={4}
                  />
                </div>
              )}
            </GlassCard>
          )}

          {isAnnouncement && (
            <GlassCard className="space-y-5 p-6">
              <h2 className="font-display text-sm font-bold">Detail Pengumuman</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormSelect label="Prioritas" value={form.priority} onChange={(e) => update('priority', e.target.value)}>
                  <option value="">Normal</option>
                  <option value="penting">Penting</option>
                </FormSelect>
                <FormInput
                  label="Batas Waktu (Deadline)"
                  type="date"
                  value={form.deadline}
                  onChange={(e) => update('deadline', e.target.value)}
                />
              </div>
            </GlassCard>
          )}
        </div>

        {/* Sidebar: publish settings */}
        <div className="space-y-6">
          <GlassCard className="space-y-4 p-6">
            <h2 className="font-display text-sm font-bold">Publikasi</h2>
            <FormSelect
              label="Status"
              value={form.status}
              onChange={(e) => update('status', e.target.value as FormState['status'])}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </FormSelect>
            <FormCheckbox
              id="is_featured"
              label="Jadikan konten unggulan"
              checked={form.is_featured}
              onChange={(v) => update('is_featured', v)}
            />
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {isSaving ? (
                <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : (
                <Save className="size-4" />
              )}
              {isEdit ? 'Simpan Perubahan' : 'Buat Post'}
            </button>
          </GlassCard>

          <GlassCard className="space-y-4 p-6">
            <h2 className="font-display text-sm font-bold">Media & Kategori</h2>
            <FormInput
              label="Kategori"
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              placeholder="Acara, Kemitraan, Penelitian, ..."
            />
            <FormInput
              label="URL Gambar Utama"
              value={form.featured_image_url}
              onChange={(e) => update('featured_image_url', e.target.value)}
              placeholder="/images/news-1.png atau https://..."
            />
            {form.featured_image_url && (
              <div className="overflow-hidden rounded-xl border border-border">
                <img src={form.featured_image_url} alt="Preview" className="aspect-video w-full object-cover" />
              </div>
            )}
            <FormInput
              label="Estimasi Waktu Baca (menit)"
              type="number"
              min={1}
              value={form.read_time_minutes}
              onChange={(e) => update('read_time_minutes', e.target.value)}
            />
            <FormInput
              label="Tanggal Kegiatan"
              type="date"
              value={form.event_date}
              onChange={(e) => update('event_date', e.target.value)}
            />
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
