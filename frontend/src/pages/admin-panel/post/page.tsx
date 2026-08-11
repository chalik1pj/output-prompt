import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import api from '@/lib/api'

export default function PostListPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<string>('')
  const [search, setSearch] = useState('')

  const fetchPosts = () => {
    setLoading(true)
    const url = filterType ? `/admin/posts?content_type=${filterType}` : '/admin/posts'
    api.get(url).then((res) => {
      setPosts(res.data.data || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchPosts()
  }, [filterType])

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus post ini?')) return
    await api.delete(`/admin/posts/${id}`)
    fetchPosts()
  }

  const handleTogglePublish = async (post: any) => {
    await api.put(`/admin/posts/${post.id}`, {
      is_published: !post.is_published,
    })
    fetchPosts()
  }

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Kelola Post & Berita</h1>
          <p className="text-sm text-muted-foreground">Kelola seluruh berita, pengumuman, dan prestasi.</p>
        </div>
        <Link
          to="/admin-panel/post/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-4" />
          Buat Post Baru
        </Link>
      </div>

      {/* Filters */}
      <GlassCard className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari judul..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 text-sm"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="form-input w-full sm:w-56 text-sm"
        >
          <option value="">Semua Tipe Konten</option>
          <option value="news">Berita Kampus</option>
          <option value="announcement">Pengumuman</option>
          <option value="kegiatan_akademik">Kegiatan Akademik</option>
          <option value="kegiatan_mahasiswa">Kegiatan Mahasiswa</option>
          <option value="prestasi_mahasiswa">Prestasi Mahasiswa</option>
          <option value="prestasi_dosen">Prestasi Dosen</option>
          <option value="prestasi_kampus">Prestasi Kampus</option>
        </select>
      </GlassCard>

      {/* Table */}
      <GlassCard className="overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">Memuat data post...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">Tidak ada post ditemukan.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
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
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 font-semibold max-w-xs truncate">{post.title}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-secondary px-2 py-1 text-xs font-mono">
                        {post.content_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          post.is_published ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {post.is_published ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                        {post.is_published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">{post.published_at_formatted || post.published_at}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        to={`/admin-panel/post/${post.id}`}
                        className="inline-flex p-2 rounded-lg border border-border hover:bg-secondary text-primary"
                      >
                        <Edit className="size-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="inline-flex p-2 rounded-lg border border-destructive/30 hover:bg-destructive/10 text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
