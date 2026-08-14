import { useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Plus, Trash2, ShieldCheck, X } from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { GlassCard } from '@/components/site/glass-card'
import { TableShell } from '@/components/site/table-shell'
import { useConfirm } from '@/components/site/confirm-dialog'
import { FormInput, FormSelect } from '@/components/site/form-fields'
import api from '@/lib/api'
import { useAdminCreate, useAdminDelete, extractErrorMessage } from '@/lib/admin-api/use-admin-resource'
import { useToast } from '@/components/site/toast'
import type { AdminAccount } from '@/lib/admin-api/types'

interface FormState {
  name: string
  email: string
  password: string
  password_confirmation: string
  role: 'super_admin' | 'editor'
}

const emptyForm: FormState = { name: '', email: '', password: '', password_confirmation: '', role: 'editor' }

export default function AdminListPage() {
  const { admin: currentUser } = useAdminAuth()
  const confirm = useConfirm()
  const toast = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admins', 'list'],
    queryFn: async () => (await api.get<{ data: AdminAccount[] }>('/admin/admins')).data.data,
    enabled: currentUser?.role === 'super_admin',
  })

  const createMutation = useAdminCreate<AdminAccount>('admin/admins', 'admins', 'Akun admin berhasil dibuat.')
  const deleteMutation = useAdminDelete('admin/admins', 'admins', 'Akun admin dihapus.')

  if (currentUser && currentUser.role !== 'super_admin') {
    return <Navigate to="/admin-panel/dashboard" replace />
  }

  const isLastSuperAdmin = (data?.filter((a) => a.role === 'super_admin').length ?? 0) <= 1

  const handleDelete = async (account: AdminAccount) => {
    if (account.id === currentUser?.id) {
      toast.error('Anda tidak bisa menghapus akun sendiri.')
      return
    }
    const ok = await confirm({ title: `Hapus akun "${account.name}"?`, description: account.email })
    if (ok) deleteMutation.mutate(account.id)
  }

  const handleSubmit = async () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Nama wajib diisi.'
    if (!form.email.trim()) e.email = 'Email wajib diisi.'
    if (form.password.length < 10) e.password = 'Password minimal 10 karakter.'
    if (form.password !== form.password_confirmation) e.password_confirmation = 'Konfirmasi password tidak cocok.'
    setErrors(e)
    if (Object.keys(e).length > 0) return

    try {
      await createMutation.mutateAsync(form)
      setModalOpen(false)
      setForm(emptyForm)
      refetch()
    } catch (err) {
      setErrors({ email: extractErrorMessage(err) })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Kelola Akun Admin</h1>
          <p className="text-sm text-muted-foreground">Khusus Super Admin — kelola akses tim editorial.</p>
        </div>
        <button
          onClick={() => {
            setForm(emptyForm)
            setErrors({})
            setModalOpen(true)
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          Tambah Admin
        </button>
      </div>

      <TableShell loading={isLoading} isEmpty={(data?.length ?? 0) === 0} columnCount={4} emptyMessage="Belum ada akun admin.">
        <thead className="border-b border-border bg-secondary/50 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-6 py-3">Nama</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data?.map((acc) => (
            <tr key={acc.id} className="transition-colors hover:bg-secondary/30">
              <td className="px-6 py-4 font-semibold">
                {acc.name} {acc.id === currentUser?.id && <span className="text-xs font-normal text-muted-foreground">(Anda)</span>}
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground">{acc.email}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${acc.role === 'super_admin' ? 'bg-accent/15 text-accent' : 'bg-secondary text-muted-foreground'}`}>
                  {acc.role === 'super_admin' && <ShieldCheck className="size-3" />}
                  {acc.role === 'super_admin' ? 'Super Admin' : 'Editor'}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => handleDelete(acc)}
                  disabled={acc.id === currentUser?.id || (acc.role === 'super_admin' && isLastSuperAdmin)}
                  title={acc.role === 'super_admin' && isLastSuperAdmin ? 'Tidak bisa menghapus super_admin terakhir' : undefined}
                  className="inline-flex rounded-lg border border-destructive/30 p-2 text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-30"
                >
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
              <h2 className="font-display text-lg font-bold">Tambah Akun Admin</h2>
              <button onClick={() => setModalOpen(false)}><X className="size-5" /></button>
            </div>
            <div className="space-y-4">
              <FormInput label="Nama Lengkap" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
              <FormInput label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
              <FormSelect label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as FormState['role'] })}>
                <option value="editor">Editor — hanya bisa kelola post miliknya sendiri</option>
                <option value="super_admin">Super Admin — akses penuh</option>
              </FormSelect>
              <FormInput label="Password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} hint="Minimal 10 karakter." />
              <FormInput label="Konfirmasi Password" type="password" required value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })} error={errors.password_confirmation} />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setModalOpen(false)} className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary">Batal</button>
              <button onClick={handleSubmit} disabled={createMutation.isPending} className="rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">
                {createMutation.isPending ? 'Menyimpan...' : 'Buat Akun'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
