import { useState } from 'react'
import { CategoryFilter } from '@/components/site/category-filter'
import { NewsCard, type NewsCardItem } from '@/components/site/news-card'
import { PageHeader } from '@/components/site/page-header'
import { Pagination } from '@/components/site/pagination'
import { Reveal } from '@/components/site/reveal'
import { usePaginatedPosts } from '@/hooks/use-paginated-posts'

const categories = ['Semua', 'Acara', 'Kemitraan', 'Penelitian']

export default function InformationsPage() {
  const [active, setActive] = useState('Semua')
  // type=berita -> hanya kategori "Berita" (terpisah dari Pengumuman yang
  // punya halaman /announcements sendiri, lihat lib/site.ts).
  const { items, meta, loading, goToPage } = usePaginatedPosts<NewsCardItem>({
    type: 'berita',
    category: active === 'Semua' ? undefined : active,
    perPage: 9,
  })

  return (
    <>
      <PageHeader
        eyebrow="Informasi & Berita"
        title="Kabar & Seputar Kampus"
        description="Berita terbaru, kegiatan akademik, rilis riset, dan prestasi civitas akademika STIKOM Tunas Bangsa."
        variant="news"
      />

      <section className="mx-content py-12">
        <CategoryFilter categories={categories} active={active} onChange={setActive} />

        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">Belum ada berita di kategori ini.</div>
        ) : (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Reveal key={item.slug} delay={i * 0.05}>
                  <NewsCard item={item} />
                </Reveal>
              ))}
            </div>
            {meta && <Pagination meta={meta} onPageChange={goToPage} />}
          </>
        )}
      </section>
    </>
  )
}
