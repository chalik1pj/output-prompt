import { useMemo, useState } from 'react'
import { Breadcrumb } from '@/components/site/breadcrumb'
import { CategoryFilter } from '@/components/site/category-filter'
import { ListingCard, type ListingCardItem } from '@/components/site/listing-card'
import { PageHeader } from '@/components/site/page-header'
import { Pagination } from '@/components/site/pagination'
import { Reveal } from '@/components/site/reveal'
import { usePaginatedPosts } from '@/hooks/use-paginated-posts'

const categories = ['Semua', 'Publikasi Jurnal', 'Sertifikasi Dosen', 'Penghargaan Profesional', 'Riset & Pengabdian']
const prodiList = ['Semua Prodi', 'Teknik Informatika', 'Sistem Informasi']

const breadcrumbItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Akademik', href: '/programs' },
  { label: 'Prestasi Dosen' },
]

export default function PrestasiDosenPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [activeProdi, setActiveProdi] = useState('Semua Prodi')
  const { items, meta, loading, goToPage } = usePaginatedPosts<ListingCardItem>({
    type: 'prestasi_dosen',
    category: activeCategory === 'Semua' ? undefined : activeCategory,
  })

  // Filter prodi dilakukan di sisi klien pada halaman yang sedang tampil --
  // backend belum expose filter credited_program_text terpisah, jadi ini filter
  // sekunder di atas hasil per-halaman (bukan di atas seluruh dataset).
  const visibleItems = useMemo(
    () =>
      activeProdi === 'Semua Prodi'
        ? items
        : items.filter((i: any) => i.credited_program_text === activeProdi),
    [items, activeProdi]
  )

  return (
    <>
      <PageHeader
        eyebrow="Akademik · Prestasi Dosen"
        title="Dedikasi di Balik Setiap Kelas"
        description="Mengenal capaian riset, publikasi, dan penghargaan para pengajar yang membentuk kualitas pendidikan di STIKOM Tunas Bangsa."
        variant="prestasi"
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      <section className="mx-content py-12">
        <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
        <div className="mt-4">
          <CategoryFilter categories={prodiList} active={activeProdi} onChange={setActiveProdi} size="small" />
        </div>

        {loading ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : visibleItems.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            Belum ada prestasi di kategori dan program studi ini. Cek kembali nanti.
          </p>
        ) : (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleItems.map((item, i) => (
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
