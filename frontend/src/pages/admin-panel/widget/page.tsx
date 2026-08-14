import { useMemo, useState } from 'react'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import { TableShell } from '@/components/site/table-shell'
import { useConfirm } from '@/components/site/confirm-dialog'
import { FormInput, FormTextarea } from '@/components/site/form-fields'
import {
  useAdminList,
  useAdminCreate,
  useAdminUpdate,
  useAdminDelete,
} from '@/lib/admin-api/use-admin-resource'
import type { AdminWidget, WidgetType } from '@/lib/admin-api/types'

const TABS: { type: WidgetType; label: string }[] = [
  { type: 'campus_stat', label: 'Statistik Kampus' },
  { type: 'partner', label: 'Mitra Industri' },
  { type: 'testimonial', label: 'Testimoni' },
  { type: 'gallery_image', label: 'Galeri Kampus' },
]

interface FormState {
  title: string
  subtitle: string
  quote: string
  value: string
  image_url: string
  link_url: string
  display_order: string
}

const emptyForm: FormState = { title: '', subtitle: '', quote: '', value: '', image_url: '', link_url: '', display_order: '0' }

export default function WidgetListPage() {
  const confirm = useConfirm()
  const [activeTab, setActiveTab] = useState<WidgetType>('campus_stat')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<AdminWidget | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  // widget_type -> `type` (bug lama: parameter salah, filter tidak pernah aktif)
  const params = useMemo(() => ({ type: activeTab, per_page: 30 }), [activeTab])
  const { data, isLoading } = useAdminList<AdminWidget>('admin/widgets', 'widgets', params)
  const createMutation = useAdminCreate<AdminWidget>('admin/widgets', 'widgets', 'Widget berhasil ditambahkan.')
  const updateMutation = useAdminUpdate<AdminWidget>('admin/widgets', 'widgets', 'Widget diperbarui.')
  const deleteMutation = useAdminDelete('admin/widgets', 'widgets', 'Widget dihapus.')

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (w: AdminWidget) => {
    setEditing(w)
    setForm({
      title: w.title ?? '',
      subtitle: w.subtitle ?? '',
      quote: w.quote ?? '',
      value: w.value?.toString() ?? '',
      image_url: w.image_url ?? '',
      link_url: w.link_url ?? '',
      display_order: w.display_order?.toString() ?? '0',
    })
    setModalOpen(true)
  }

  const handleDelete = async (w: AdminWidget) => {
    const ok = await confirm({ title: `Hapus "${w.title || 'widget ini'}"?` })
    if (ok) deleteMutation.mutate(w.id)
  }

  const handleSubmit = async () => {
    const payload = {
      widget_type: activeTab,
      title: form.title || null,
      subtitle: form.subtitle || null,
      quote: form.quote || null,
      value: form.value ? Number(form.value) : null,
      image_url: form.image_url || null,
      link_url: form.link_url || null,
      display_order: Number(form.display_order) || 0,
      is_active: true,
    }
    if (editing) {
      await updateMutation.mutateAsync({ id: editing.id, payload })
    } else {
      await createMutation.mutateAsync(payload)
    }
    setModalOpen(false)
  }

  const isSaving = createMutation.isPending || updateMutation.isPending

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Kelola Widget Situs</h1>
          <p className="text-sm text-muted-foreground">Statistik kampus, mitra industri, testimoni, dan galeri.</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          Tambah Widget
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.type}
            onClick={() => setActiveTab(t.type)}
            className={`shrink-0 border-b-2 pb-3 text-sm font-semibold transition-colors ${
              activeTab === t.type ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <TableShell loading={isLoading} isEmpty={(data?.data.length ?? 0) === 0} columnCount={4} emptyMessage="Belum ada data untuk kategori ini.">
        <thead className="border-b border-border bg-secondary/50 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-6 py-3">Judul / Nama</th>
            <th className="px-6 py-3">{activeTab === 'campus_stat' ? 'Nilai' : activeTab === 'testimonial' ? 'Kutipan' : 'Detail'}</th>
            <th className="px-6 py-3">Urutan</th>
            <th className="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data?.data.map((w) => (
            <tr key={w.id} className="transition-colors hover:bg-secondary/30">
              <td className="px-6 py-4 font-semibold">{w.title || '(Galeri)'}</td>
              <td className="max-w-xs truncate px-6 py-4 text-xs text-muted-foreground">
                {activeTab === 'campus_stat' ? (
                  <span className="font-mono font-bold text-accent">{w.value ?? '-'}</span>
                ) : activeTab === 'testimonial' ? (
                  w.quote
                ) : (
                  w.subtitle || w.link_url || '-'
                )}
              </td>
              <td className="px-6 py-4 text-xs text-muted-foreground">{w.display_order}</td>
              <td className="space-x-2 px-6 py-4 text-right">
                <button onClick={() => openEdit(w)} className="inline-flex rounded-lg border border-border p-2 text-primary hover:bg-secondary">
                  <Edit className="size-4" />
                </button>
                <button onClick={() => handleDelete(w)} className="inline-flex rounded-lg border border-destructive/30 p-2 text-destructive hover:bg-destructive/10">
                  <Trash2 className="size-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableShell>

      {modalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">{editing ? 'Edit' : 'Tambah'} {TABS.find((t) => t.type === activeTab)?.label}</h2>
              <button onClick={() => setModalOpen(false)}><X className="size-5" /></button>
            </div>
            <div className="space-y-4">
              <FormInput
                label={activeTab === 'testimonial' ? 'Nama' : activeTab === 'gallery_image' ? 'Judul Foto' : 'Judul / Nama'}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              {activeTab === 'campus_stat' && (
                <FormInput label="Nilai Angka" type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
              )}

              {activeTab === 'testimonial' && (
                <>
                  <FormInput label="Peran / Jabatan" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="Software Engineer · Alumni '22" />
                  <FormTextarea label="Kutipan Testimoni" rows={3} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
                  <FormInput label="URL Foto" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
                </>
              )}

              {activeTab === 'partner' && (
                <>
                  <FormInput label="URL Logo" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
                  <FormInput label="URL Tautan (opsional)" value={form.link_url} onChange={(e) => setForm({ ...form, link_url: e.target.value })} />
                </>
              )}

              {activeTab === 'gallery_image' && (
                <FormInput label="URL Foto" required value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="/images/gallery-xxx.png" />
              )}

              <FormInput label="Urutan Tampil" type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setModalOpen(false)} className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary">Batal</button>
              <button onClick={handleSubmit} disabled={isSaving} className="rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
