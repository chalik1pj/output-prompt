import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CalendarDays, ChevronRight, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import api from '@/lib/api'

export default function InformationDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    api.get(`/posts/${slug}`).then((res) => {
      setPost(res.data.data)
    }).catch(() => {
      setPost(null)
    }).finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="mx-content flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-3xl font-bold">Berita Tidak Ditemukan</h1>
        <p className="mt-2 text-muted-foreground">Artikel berita yang Anda cari tidak tersedia.</p>
        <div className="mt-6">
          <Link to="/informations" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
            Lihat Berita Lainnya
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow={post.category_name || 'Berita Kampus'}
        title={post.title}
        variant="news"
        breadcrumb={
          <div className="mx-content pt-28">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary">Beranda</Link>
              <ChevronRight className="size-3" />
              <Link to="/informations" className="hover:text-primary">Informasi</Link>
              <ChevronRight className="size-3" />
              <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
            </nav>
          </div>
        }
      />

      <section className="mx-content py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4 text-primary" />
              {post.published_at_formatted || post.published_at}
            </span>
            {post.author_name && (
              <span className="flex items-center gap-2">
                <User className="size-4 text-primary" />
                {post.author_name}
              </span>
            )}
          </div>

          {post.thumbnail_url && (
            <div className="overflow-hidden rounded-3xl border border-border">
              <img src={post.thumbnail_url} alt={post.title} className="w-full max-h-[450px] object-cover" />
            </div>
          )}

          {/* Render Markdown Content using react-markdown per user requirement */}
          <Reveal>
            <div className="prose prose-slate dark:prose-invert max-w-none leading-relaxed">
              <ReactMarkdown>{post.content || post.excerpt || ''}</ReactMarkdown>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
