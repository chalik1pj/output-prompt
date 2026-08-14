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
import type { AdminStudentProgram } from '@/lib/admin-api/types'

const TABS: { type: 'beasiswa' | 'pertukaran'; label: string }[] = [
  { type: 'beasiswa', label: 'Beasiswa' },
  { type: 'pertukaran', label: 'Pertukaran Mahasiswa' },
]

interface FormState {
  name: string
  description: string
  requirements: string
  how_to_apply: string
  country: string
  scope: string
  logo_url: string
  display_order: string
}

const emptyForm: FormState = { name: '', description: '', requirements: '', how_to_apply: '', country: '', scope: '', logo_url: '', display_order: '0' }

export default function StudentProgramListPage() {
  const confirm = useConfirm()
  const [activeTab, setActiveTab] = useState<'beasiswa' | 'pertukaran'>('beasiswa')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<AdminStudentProgram | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const params = useMemo(() => ({ type: activeTab, per_page: 20 }), [activeTab])
  const { data, isLoading } = useAdminList<AdminStudentProgram>('admin/student-programs', 'student-programs', params)
  const createMutation = useAdminCreate<AdminStudentProgram>('admin/student-programs', 'student-programs', 'Program berhasil ditambahkan.')
  const updateMutation = useAdminUpdate<AdminStudentProgram>('admin/student-programs', 'student-programs', 'Program diperbarui.')
  const deleteMutation = useAdminDelete('admin/student-programs', 'student-programs', 'Program dihapus.')

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setErrors({})
    setModalOpen(true)
  }

  const openEdit = (item: AdminStudentProgram) => {
    setEditing(item)
    setForm({
      name: item.name,
      description: item.description ?? '',
      requirements: item.requirements ?? '',
      how_to_apply: item.how_to_apply ?? '',
      country: item.country ?? '',
      scope: item.scope ?? '',
      logo_url: item.logo_url ?? '',
      display_order: item.display_order?.toString() ?? '0',
    })
    setErrors({})
    setModalOpen(true)
  }

  const handleDelete = async (item: AdminStudentProgram) => {
    const ok = await confirm({ title: `Hapus "${item.name}"?` })
    if (ok) deleteMutation.mutate(item.id)
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setErrors({ name: 'Nama program wajib diisi.' })
      return
    }
    const payload = {
      program_type: activeTab,
      name: form.name,
      description: form.description || null,
      requirements: form.requirements || null,
      how_to_apply: form.how_to_apply || null,
      country: form.country || null,
      scope: form.scope || null,
      logo_url: form.logo_url || null,
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
          <h1 className="font-display text-2xl font-bold">Kelola Beasiswa & Pertukaran</h1>
          <p className="text-sm text-muted-foreground">Program yang tampil di halaman Mahasiswa, dipaginasi di sisi publik.</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          Tambah Program
        </button>
      </div>

      <div className="flex gap-4 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.type}
            onClick={() => setActiveTab(t.type)}
            className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${activeTab === t.type ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <TableShell loading={isLoading} isEmpty={(data?.data.length ?? 0) === 0} columnCount={4} emptyMessage="Belum ada program di kategori ini.">
        <thead className="border-b border-border bg-secondary/50 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-6 py-3">Nama Program</th>
            <th className="px-6 py-3">{activeTab === 'pertukaran' ? 'Negara / Cakupan' : 'Deskripsi'}</th>
            <th className="px-6 py-3">Urutan</th>
            <th className="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data?.data.map((item) => (
            <tr key={item.id} className="transition-colors hover:bg-secondary/30">
              <td className="px-6 py-4 font-semibold">{item.name}</td>
              <td className="max-w-xs truncate px-6 py-4 text-xs text-muted-foreground">
                {activeTab === 'pertukaran' ? [item.scope, item.country].filter(Boolean).join(' · ') || '-' : item.description}
              </td>
              <td className="px-6 py-4 text-xs text-muted-foreground">{item.display_order}</td>
              <td className="space-x-2 px-6 py-4 text-right">
                <button onClick={() => openEdit(item)} className="inline-flex rounded-lg border border-border p-2 text-primary hover:bg-secondary">
                  <Edit className="size-4" />
                </button>
                <button onClick={() => handleDelete(item)} className="inline-flex rounded-lg border border-destructive/30 p-2 text-destructive hover:bg-destructive/10">
                  <Trash2 className="size-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableShell>

      {modalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">{editing ? 'Edit' : 'Tambah'} {activeTab === 'beasiswa' ? 'Beasiswa' : 'Program Pertukaran'}</h2>
              <button onClick={() => setModalOpen(false)}><X className="size-5" /></button>
            </div>
            <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
              <FormInput label="Nama Program" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
              <FormTextarea label="Deskripsi" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              {activeTab === 'pertukaran' && (
                <div className="grid grid-cols-2 gap-4">
                  <FormInput label="Negara" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Jepang, Malaysia, ..." />
                  <FormInput label="Cakupan" value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })} placeholder="Internasional / Nasional" />
                </div>
              )}
              <FormTextarea label="Persyaratan (satu baris = satu syarat)" rows={4} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} hint="Tiap baris baru akan ditampilkan sebagai poin terpisah di halaman publik." />
              <FormTextarea label="Cara Mendaftar" rows={2} value={form.how_to_apply} onChange={(e) => setForm({ ...form, how_to_apply: e.target.value })} />
              <FormInput label="URL Logo" value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} />
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
