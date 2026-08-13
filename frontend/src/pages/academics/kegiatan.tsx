import { useState } from 'react'
import { Breadcrumb } from '@/components/site/breadcrumb'
import { CategoryFilter } from '@/components/site/category-filter'
import { ListingCard, type ListingCardItem } from '@/components/site/listing-card'
import { PageHeader } from '@/components/site/page-header'
import { Pagination } from '@/components/site/pagination'
import { Reveal } from '@/components/site/reveal'
import { usePaginatedPosts } from '@/hooks/use-paginated-posts'

const categories = [
  'Semua',
  'Wisuda & Yudisium',
  'Seminar & Kuliah Tamu',
  'Workshop Teknologi',
  'Kerjasama Industri',
  'PMB',
]

const breadcrumbItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Akademik', href: '/programs' },
  { label: 'Kegiatan Akademik' },
]

export default function KegiatanAkademikPage() {
  const [active, setActive] = useState('Semua')
  const { items, meta, loading, goToPage } = usePaginatedPosts<ListingCardItem>({
    type: 'kegiatan_akademik',
    category: active === 'Semua' ? undefined : active,
  })

  return (
    <>
      <PageHeader
        eyebrow="Akademik · Kegiatan"
        title="Dinamika Akademik Sepanjang Tahun"
        description="Seminar, workshop, kuliah tamu, hingga wisuda — dokumentasi lengkap aktivitas akademik kampus kami."
        variant="kegiatan"
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      <section className="mx-content py-12">
        <CategoryFilter categories={categories} active={active} onChange={setActive} />

        {loading ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            Belum ada kegiatan di kategori ini. Cek kembali nanti.
          </p>
        ) : (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Reveal key={item.slug} delay={i * 0.05}>
                  <ListingCard item={item} />
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
