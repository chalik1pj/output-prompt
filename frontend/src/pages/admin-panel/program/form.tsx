import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Save, X } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import { FormCheckbox, FormInput, FormSelect, FormTextarea, slugify } from '@/components/site/form-fields'
import { useAdminDetail, useAdminCreate, useAdminUpdate } from '@/lib/admin-api/use-admin-resource'
import type { AdminProgram } from '@/lib/admin-api/types'

interface FormState {
  name: string
  slug: string
  degree_level: 'D3' | 'S1' | 'S2'
  track: 'sarjana' | 'vokasi' | 'pascasarjana'
  short_description: string
  full_description: string
  accreditation: string
  card_image_url: string
  icon_name: string
  competencies: string[]
  careers: string[]
  display_order: string
  is_published: boolean
}

const emptyForm: FormState = {
  name: '',
  slug: '',
  degree_level: 'S1',
  track: 'sarjana',
  short_description: '',
  full_description: '',
  accreditation: 'BAN-PT',
  card_image_url: '',
  icon_name: '',
  competencies: [],
  careers: [],
  display_order: '0',
  is_published: true,
}

/** Input tag sederhana -- ketik lalu Enter untuk menambah item ke array. */
function TagListInput({
  label,
  hint,
  items,
  onChange,
}: {
  label: string
  hint?: string
  items: string[]
  onChange: (items: string[]) => void
}) {
  const [draft, setDraft] = useState('')

  const add = () => {
    if (draft.trim()) {
      onChange([...items, draft.trim()])
      setDraft('')
    }
  }

  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
          placeholder="Ketik lalu Enter..."
          className="form-input text-sm"
        />
        <button type="button" onClick={add} className="shrink-0 rounded-xl border border-border px-3 hover:bg-secondary">
          <Plus className="size-4" />
        </button>
      </div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {items.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium"
            >
              {item}
              <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProgramFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const navigate = useNavigate()

  const { data: existing, isLoading: loadingDetail } = useAdminDetail<AdminProgram>('admin/programs', 'programs', id)
  const createMutation = useAdminCreate<AdminProgram>('admin/programs', 'programs', 'Program studi berhasil dibuat.')
  const updateMutation = useAdminUpdate<AdminProgram>('admin/programs', 'programs', 'Perubahan berhasil disimpan.')

  const [form, setForm] = useState<FormState>(emptyForm)
  const [slugTouched, setSlugTouched] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name,
        slug: existing.slug,
        degree_level: existing.degree_level,
        track: existing.track,
        short_description: existing.short_description,
        full_description: existing.full_description ?? '',
        accreditation: existing.accreditation ?? '',
        card_image_url: existing.card_image_url ?? '',
        icon_name: existing.icon_name ?? '',
        competencies: existing.competencies ?? [],
        careers: existing.careers ?? [],
        display_order: existing.display_order?.toString() ?? '0',
        is_published: existing.is_published,
      })
      setSlugTouched(true)
    }
  }, [existing])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => {
      const next = { ...f, [key]: value }
      if (key === 'name' && !slugTouched) next.slug = slugify(value as string)
      return next
    })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Nama program wajib diisi.'
    if (!form.slug.trim()) e.slug = 'Slug wajib diisi.'
    if (!form.short_description.trim()) e.short_description = 'Deskripsi singkat wajib diisi (tampil di kartu listing).'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    const payload = {
      name: form.name,
      slug: form.slug,
      degree_level: form.degree_level,
      track: form.track,
      short_description: form.short_description,
      full_description: form.full_description || null,
      accreditation: form.accreditation || null,
      card_image_url: form.card_image_url || null,
      icon_name: form.icon_name || null,
      competencies: form.competencies.length ? form.competencies : null,
      careers: form.careers.length ? form.careers : null,
      display_order: Number(form.display_order) || 0,
      is_published: form.is_published,
    }

    if (isEdit) {
      await updateMutation.mutateAsync({ id: id!, payload })
    } else {
      const created = await createMutation.mutateAsync(payload)
      navigate(`/admin-panel/program/${created.id}`, { replace: true })
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending

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
        <Link to="/admin-panel/program" className="rounded-lg border border-border p-2 hover:bg-secondary">
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="font-display text-2xl font-bold">{isEdit ? 'Edit Program Studi' : 'Tambah Program Studi'}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="space-y-5 p-6">
            <FormInput label="Nama Program" required value={form.name} onChange={(e) => update('name', e.target.value)} error={errors.name} />
            <FormInput
              label="Slug (URL)"
              required
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true)
                update('slug', slugify(e.target.value))
              }}
              error={errors.slug}
              hint={`URL publik: /programs/${form.slug || '...'}`}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormSelect label="Jenjang" value={form.degree_level} onChange={(e) => update('degree_level', e.target.value as FormState['degree_level'])}>
                <option value="D3">D3 (Diploma)</option>
                <option value="S1">S1 (Sarjana)</option>
                <option value="S2">S2 (Magister)</option>
              </FormSelect>
              <FormSelect label="Jalur" value={form.track} onChange={(e) => update('track', e.target.value as FormState['track'])}>
                <option value="sarjana">Sarjana</option>
                <option value="vokasi">Vokasi</option>
                <option value="pascasarjana">Pascasarjana</option>
              </FormSelect>
            </div>
            <FormTextarea
              label="Deskripsi Singkat"
              required
              rows={2}
              value={form.short_description}
              onChange={(e) => update('short_description', e.target.value)}
              error={errors.short_description}
              hint="Tampil di kartu listing program studi."
            />
            <FormTextarea
              label="Deskripsi Lengkap"
              rows={6}
              value={form.full_description}
              onChange={(e) => update('full_description', e.target.value)}
              hint="Tampil di halaman detail program studi."
            />
          </GlassCard>

          <GlassCard className="space-y-5 p-6">
            <h2 className="font-display text-sm font-bold">Kompetensi & Prospek Karier</h2>
            <TagListInput label="Kompetensi Utama" items={form.competencies} onChange={(v) => update('competencies', v)} />
            <TagListInput label="Prospek Karier" items={form.careers} onChange={(v) => update('careers', v)} />
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="space-y-4 p-6">
            <h2 className="font-display text-sm font-bold">Publikasi</h2>
            <FormCheckbox id="is_published" label="Tayangkan di situs publik" checked={form.is_published} onChange={(v) => update('is_published', v)} />
            <FormInput
              label="Urutan Tampil"
              type="number"
              value={form.display_order}
              onChange={(e) => update('display_order', e.target.value)}
              hint="Angka lebih kecil tampil lebih dulu."
            />
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {isSaving ? <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <Save className="size-4" />}
              {isEdit ? 'Simpan Perubahan' : 'Buat Program'}
            </button>
          </GlassCard>

          <GlassCard className="space-y-4 p-6">
            <h2 className="font-display text-sm font-bold">Media & Metadata</h2>
            <FormInput label="Akreditasi" value={form.accreditation} onChange={(e) => update('accreditation', e.target.value)} />
            <FormInput label="URL Gambar Kartu" value={form.card_image_url} onChange={(e) => update('card_image_url', e.target.value)} placeholder="/images/program-xxx.png" />
            {form.card_image_url && (
              <div className="overflow-hidden rounded-xl border border-border">
                <img src={form.card_image_url} alt="Preview" className="aspect-video w-full object-cover" />
              </div>
            )}
            <FormInput label="Nama Ikon (Lucide)" value={form.icon_name} onChange={(e) => update('icon_name', e.target.value)} placeholder="code, database, cpu, ..." />
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
