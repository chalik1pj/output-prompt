import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Search, Star } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import { Pagination } from '@/components/site/pagination'
import { TableShell } from '@/components/site/table-shell'
import { useConfirm } from '@/components/site/confirm-dialog'
import { useDebounce } from '@/hooks/use-debounce'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { useAdminList, useAdminDelete, useAdminUpdate } from '@/lib/admin-api/use-admin-resource'
import type { AdminPost } from '@/lib/admin-api/types'

const CONTENT_TYPES = [
  { value: '', label: 'Semua Tipe Konten' },
  { value: 'berita', label: 'Berita Kampus' },
  { value: 'pengumuman', label: 'Pengumuman' },
  { value: 'kegiatan_akademik', label: 'Kegiatan Akademik' },
  { value: 'kegiatan_mahasiswa', label: 'Kegiatan Mahasiswa' },
  { value: 'prestasi_kampus', label: 'Prestasi Kampus' },
  { value: 'prestasi_dosen', label: 'Prestasi Dosen' },
  { value: 'prestasi_mahasiswa', label: 'Prestasi Mahasiswa' },
]

const STATUS_BADGE: Record<string, string> = {
  published: 'bg-success/15 text-success',
  draft: 'bg-secondary text-muted-foreground',
  archived: 'bg-destructive/15 text-destructive',
}

function formatDate(value: string | null): string {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function PostListPage() {
  const { admin } = useAdminAuth()
  const confirm = useConfirm()
  const [page, setPage] = useState(1)
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 400)

  const params = useMemo(
    () => ({ page, per_page: 12, type: type || undefined, status: status || undefined, search: search || undefined }),
    [page, type, status, search]
  )

  const { data, isLoading, isFetching } = useAdminList<AdminPost>('admin/posts', 'posts', params)
  const deleteMutation = useAdminDelete('admin/posts', 'posts', 'Post berhasil dihapus.')
  const updateMutation = useAdminUpdate<AdminPost>('admin/posts', 'posts', 'Status post diperbarui.')

  const handleDelete = async (post: AdminPost) => {
    const ok = await confirm({
      title: `Hapus "${post.title}"?`,
      description: 'Tindakan ini tidak bisa dibatalkan.',
    })
    if (ok) deleteMutation.mutate(post.id)
  }

  const cycleStatus = (post: AdminPost) => {
    const next = post.status === 'draft' ? 'published' : post.status === 'published' ? 'archived' : 'draft'
    updateMutation.mutate({ id: post.id, payload: { status: next } })
  }

  const canEdit = (post: AdminPost) => admin?.role === 'super_admin' || post.author_id === admin?.id

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold">Kelola Post & Berita</h1>
          <p className="text-sm text-muted-foreground">Kelola seluruh berita, pengumuman, kegiatan, dan prestasi.</p>
        </div>
        <Link
          to="/admin-panel/post/new"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          Buat Post Baru
        </Link>
      </div>

      {/* Filters */}
      <GlassCard className="flex flex-col items-stretch gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari judul post..."
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

        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value)
            setPage(1)
          }}
          className="form-input w-full text-sm sm:w-56"
        >
          {CONTENT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            setPage(1)
          }}
          className="form-input w-full text-sm sm:w-40"
        >
          <option value="">Semua Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </GlassCard>

      <TableShell loading={isLoading} isEmpty={(data?.data.length ?? 0) === 0} columnCount={5} emptyMessage="Tidak ada post ditemukan untuk filter ini.">
        <thead className="border-b border-border bg-secondary/50 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-6 py-3">Judul</th>
            <th className="px-6 py-3">Tipe</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Tanggal</th>
            <th className="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data?.data.map((post) => (
            <tr key={post.id} className="transition-colors hover:bg-secondary/30">
              <td className="max-w-xs px-6 py-4 font-semibold">
                <div className="flex items-center gap-2">
                  {post.is_featured && <Star className="size-3.5 shrink-0 fill-accent text-accent" />}
                  <span className="truncate">{post.title}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="rounded-md bg-secondary px-2 py-1 font-mono text-xs">{post.content_type}</span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => canEdit(post) && cycleStatus(post)}
                  disabled={!canEdit(post)}
                  title={canEdit(post) ? 'Klik untuk ubah status' : 'Bukan post Anda'}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize transition-opacity ${STATUS_BADGE[post.status]} ${canEdit(post) ? 'hover:opacity-75' : 'cursor-not-allowed opacity-60'}`}
                >
                  {post.status}
                </button>
              </td>
              <td className="px-6 py-4 text-xs text-muted-foreground">{formatDate(post.published_at)}</td>
              <td className="space-x-2 px-6 py-4 text-right">
                {canEdit(post) ? (
                  <>
                    <Link
                      to={`/admin-panel/post/${post.id}`}
                      className="inline-flex rounded-lg border border-border p-2 text-primary hover:bg-secondary"
                    >
                      <Edit className="size-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post)}
                      className="inline-flex rounded-lg border border-destructive/30 p-2 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">Milik admin lain</span>
                )}
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
