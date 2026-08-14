import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CalendarDays, ChevronRight, Clock, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { NewsCard, type NewsCardItem } from '@/components/site/news-card'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import api from '@/lib/api'

interface PostDetail {
  id: number
  content_type: string
  category: string | null
  title: string
  excerpt: string | null
  content: string | null
  featured_image_url: string | null
  read_time_minutes: number | null
  published_at: string | null
  author: { name: string } | null
  program: { name: string; slug: string } | null
  lecturer: { name: string } | null
}

function formatDate(value?: string | null): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function InformationDetailPage() {
  const { contentType, slug } = useParams<{ contentType: string; slug: string }>()
  const [post, setPost] = useState<PostDetail | null>(null)
  const [related, setRelated] = useState<NewsCardItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!contentType || !slug) return
    setLoading(true)
    api
      .get(`/posts/${contentType}/${slug}`)
      .then((res) => {
        setPost(res.data.data)
        setRelated(res.data.related ?? [])
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false))
  }, [contentType, slug])

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
        <p className="mt-2 text-muted-foreground">Artikel yang Anda cari tidak tersedia atau sudah dihapus.</p>
        <div className="mt-6">
          <Link to="/informations" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
            Lihat Informasi Lainnya
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow={post.category || 'Informasi Kampus'}
        title={post.title}
        variant="news"
        breadcrumb={
          <div className="mx-content pt-28">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary">Beranda</Link>
              <ChevronRight className="size-3" />
              <Link to="/informations" className="hover:text-primary">Informasi</Link>
              <ChevronRight className="size-3" />
              <span className="max-w-[200px] truncate text-foreground">{post.title}</span>
            </nav>
          </div>
        }
      />

      <section className="mx-content py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex flex-wrap items-center gap-6 border-b border-border pb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4 text-primary" />
              {formatDate(post.published_at)}
            </span>
            {post.read_time_minutes ? (
              <span className="flex items-center gap-2">
                <Clock className="size-4 text-primary" />
                {post.read_time_minutes} menit baca
              </span>
            ) : null}
            {post.author?.name && (
              <span className="flex items-center gap-2">
                <User className="size-4 text-primary" />
                {post.author.name}
              </span>
            )}
          </div>

          {post.featured_image_url && (
            <div className="overflow-hidden rounded-3xl border border-border">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="max-h-[450px] w-full object-cover"
              />
            </div>
          )}

          {post.excerpt && (
            <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          )}

          <Reveal>
            <div className="prose prose-slate dark:prose-invert max-w-none leading-relaxed">
              <ReactMarkdown>{post.content ?? ''}</ReactMarkdown>
            </div>
          </Reveal>

          {(post.program || post.lecturer) && (
            <div className="flex flex-wrap gap-3 border-t border-border pt-6">
              {post.program && (
                <Link
                  to={`/programs/${post.program.slug}`}
                  className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
                >
                  Program terkait: {post.program.name}
                </Link>
              )}
              {post.lecturer && (
                <span className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                  Dosen terkait: {post.lecturer.name}
                </span>
              )}
            </div>
          )}
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-5xl">
            <h2 className="font-display text-xl font-bold">Berita Terkait</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <NewsCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
