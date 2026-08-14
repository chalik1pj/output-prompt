import { useEffect, useMemo, useState } from 'react'
import { Plus, Edit, Trash2, Search, ShieldCheck, X } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import { Pagination } from '@/components/site/pagination'
import { TableShell } from '@/components/site/table-shell'
import { useConfirm } from '@/components/site/confirm-dialog'
import { FormCheckbox, FormInput, FormSelect, FormTextarea } from '@/components/site/form-fields'
import { useDebounce } from '@/hooks/use-debounce'
import api from '@/lib/api'
import {
  useAdminList,
  useAdminCreate,
  useAdminUpdate,
  useAdminDelete,
} from '@/lib/admin-api/use-admin-resource'
import type { AdminLecturer } from '@/lib/admin-api/types'

interface FormState {
  program_id: string
  name: string
  position: string
  photo_url: string
  bio: string
  email: string
  is_certified: boolean
}

const emptyForm: FormState = { program_id: '', name: '', position: '', photo_url: '', bio: '', email: '', is_certified: false }

export default function LecturerListPage() {
  const confirm = useConfirm()
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 400)
  const [programs, setPrograms] = useState<{ id: number; name: string }[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<AdminLecturer | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    api.get('/programs').then((res) => setPrograms(res.data.data ?? []))
  }, [])

  const params = useMemo(() => ({ page, per_page: 12, search: search || undefined }), [page, search])
  const { data, isLoading, isFetching } = useAdminList<AdminLecturer>('admin/lecturers', 'lecturers', params)
  const createMutation = useAdminCreate<AdminLecturer>('admin/lecturers', 'lecturers', 'Dosen berhasil ditambahkan.')
  const updateMutation = useAdminUpdate<AdminLecturer>('admin/lecturers', 'lecturers', 'Data dosen diperbarui.')
  const deleteMutation = useAdminDelete('admin/lecturers', 'lecturers', 'Data dosen dihapus.')

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setErrors({})
    setModalOpen(true)
  }

  const openEdit = (lecturer: AdminLecturer) => {
    setEditing(lecturer)
    setForm({
      program_id: lecturer.program_id?.toString() ?? '',
      name: lecturer.name,
      position: lecturer.position ?? '',
      photo_url: lecturer.photo_url ?? '',
      bio: lecturer.bio ?? '',
      email: lecturer.email ?? '',
      is_certified: lecturer.is_certified,
    })
    setErrors({})
    setModalOpen(true)
  }

  const handleDelete = async (lecturer: AdminLecturer) => {
    const ok = await confirm({ title: `Hapus data dosen "${lecturer.name}"?` })
    if (ok) deleteMutation.mutate(lecturer.id)
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setErrors({ name: 'Nama dosen wajib diisi.' })
      return
    }
    const payload = {
      program_id: form.program_id ? Number(form.program_id) : null,
      name: form.name,
      position: form.position || null,
      photo_url: form.photo_url || null,
      bio: form.bio || null,
      email: form.email || null,
      is_certified: form.is_certified,
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
          <h1 className="font-display text-2xl font-bold">Kelola Dosen</h1>
          <p className="text-sm text-muted-foreground">Data dosen yang ditampilkan di halaman detail program studi.</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          Tambah Dosen
        </button>
      </div>

      <GlassCard className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari nama dosen..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value)
              setPage(1)
            }}
            className="form-input !pl-9 text-sm"
          />
          {isFetching && !isLoading && (
            <div className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          )}
        </div>
      </GlassCard>

      <TableShell loading={isLoading} isEmpty={(data?.data.length ?? 0) === 0} columnCount={5} emptyMessage="Belum ada data dosen.">
        <thead className="border-b border-border bg-secondary/50 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-6 py-3">Nama</th>
            <th className="px-6 py-3">Jabatan</th>
            <th className="px-6 py-3">Program Studi</th>
            <th className="px-6 py-3">Sertifikasi</th>
            <th className="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data?.data.map((lect) => (
            <tr key={lect.id} className="transition-colors hover:bg-secondary/30">
              <td className="px-6 py-4 font-semibold">{lect.name}</td>
              <td className="px-6 py-4 text-sm text-muted-foreground">{lect.position || '-'}</td>
              <td className="px-6 py-4 text-sm text-muted-foreground">{lect.program?.name || '-'}</td>
              <td className="px-6 py-4">
                {lect.is_certified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success">
                    <ShieldCheck className="size-3" /> Bersertifikat
                  </span>
                )}
              </td>
              <td className="space-x-2 px-6 py-4 text-right">
                <button onClick={() => openEdit(lect)} className="inline-flex rounded-lg border border-border p-2 text-primary hover:bg-secondary">
                  <Edit className="size-4" />
                </button>
                <button onClick={() => handleDelete(lect)} className="inline-flex rounded-lg border border-destructive/30 p-2 text-destructive hover:bg-destructive/10">
                  <Trash2 className="size-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableShell>

      {data && data.last_page > 1 && (
        <Pagination
          meta={{ current_page: data.current_page, last_page: data.last_page, total: data.total, per_page: data.per_page }}
          onPageChange={setPage}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">{editing ? 'Edit Dosen' : 'Tambah Dosen'}</h2>
              <button onClick={() => setModalOpen(false)}><X className="size-5" /></button>
            </div>
            <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
              <FormInput label="Nama Lengkap (+ Gelar)" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} placeholder="Dr. Ahmad Fauzi, M.Kom." />
              <FormInput label="Jabatan" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="Dosen Tetap / Kepala Program Studi" />
              <FormSelect label="Program Studi" value={form.program_id} onChange={(e) => setForm({ ...form, program_id: e.target.value })}>
                <option value="">— Tidak terikat —</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </FormSelect>
              <FormInput label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <FormInput label="URL Foto" value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} placeholder="/images/... atau https://..." />
              <FormTextarea label="Biografi Singkat" rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              <FormCheckbox id="is_certified" label="Dosen bersertifikat" checked={form.is_certified} onChange={(v) => setForm({ ...form, is_certified: v })} />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setModalOpen(false)} className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary">Batal</button>
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
