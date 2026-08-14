import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import { Pagination } from '@/components/site/pagination'
import { TableShell } from '@/components/site/table-shell'
import { useConfirm } from '@/components/site/confirm-dialog'
import { useDebounce } from '@/hooks/use-debounce'
import { useAdminList, useAdminDelete } from '@/lib/admin-api/use-admin-resource'
import type { AdminProgram } from '@/lib/admin-api/types'

export default function ProgramListPage() {
  const confirm = useConfirm()
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 400)

  const params = useMemo(() => ({ page, per_page: 12, search: search || undefined }), [page, search])
  const { data, isLoading, isFetching } = useAdminList<AdminProgram>('admin/programs', 'programs', params)
  const deleteMutation = useAdminDelete('admin/programs', 'programs', 'Program studi dihapus.')

  const handleDelete = async (program: AdminProgram) => {
    const ok = await confirm({
      title: `Hapus "${program.name}"?`,
      description: 'Dosen & post yang terhubung akan kehilangan referensi ke program ini (tidak ikut terhapus).',
    })
    if (ok) deleteMutation.mutate(program.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Kelola Program Studi</h1>
          <p className="text-sm text-muted-foreground">Kelola kurikulum, deskripsi, dan informasi prodi.</p>
        </div>
        <Link
          to="/admin-panel/program/new"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          Tambah Prodi Baru
        </Link>
      </div>

      <GlassCard className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari nama program studi..."
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

      <TableShell loading={isLoading} isEmpty={(data?.data.length ?? 0) === 0} columnCount={5} emptyMessage="Belum ada program studi yang cocok.">
        <thead className="border-b border-border bg-secondary/50 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-6 py-3">Nama Program</th>
            <th className="px-6 py-3">Jenjang</th>
            <th className="px-6 py-3">Jalur</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data?.data.map((prog) => (
            <tr key={prog.id} className="transition-colors hover:bg-secondary/30">
              <td className="px-6 py-4 font-semibold">{prog.name}</td>
              <td className="px-6 py-4">
                <span className="rounded-md bg-secondary px-2.5 py-1 font-mono text-xs">{prog.degree_level}</span>
              </td>
              <td className="px-6 py-4 text-xs capitalize text-muted-foreground">{prog.track}</td>
              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    prog.is_published ? 'bg-success/15 text-success' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {prog.is_published ? 'Tayang' : 'Tersembunyi'}
                </span>
              </td>
              <td className="space-x-2 px-6 py-4 text-right">
                <Link
                  to={`/admin-panel/program/${prog.id}`}
                  className="inline-flex rounded-lg border border-border p-2 text-primary hover:bg-secondary"
                >
                  <Edit className="size-4" />
                </Link>
                <button
                  onClick={() => handleDelete(prog)}
                  className="inline-flex rounded-lg border border-destructive/30 p-2 text-destructive hover:bg-destructive/10"
                >
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
    </div>
  )
}
