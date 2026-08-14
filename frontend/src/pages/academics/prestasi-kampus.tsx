import { Trophy } from 'lucide-react'
import { useState } from 'react'
import { AnimatedCounter } from '@/components/site/animated-counter'
import { Breadcrumb } from '@/components/site/breadcrumb'
import { CategoryFilter } from '@/components/site/category-filter'
import { GlassCard } from '@/components/site/glass-card'
import { ListingCard, type ListingCardItem } from '@/components/site/listing-card'
import { PageHeader } from '@/components/site/page-header'
import { Pagination } from '@/components/site/pagination'
import { Reveal } from '@/components/site/reveal'
import { usePaginatedPosts } from '@/hooks/use-paginated-posts'

const categories = ['Semua', 'Kompetisi Mahasiswa', 'Penghargaan Kelembagaan', 'Kerjasama & Riset']

const statsData = [
  { label: 'Penghargaan Diterima', value: 48, suffix: '+' },
  { label: 'Kompetisi Dimenangkan', value: 32, suffix: '+' },
  { label: 'Kerjasama Riset', value: 15, suffix: '+' },
]

const breadcrumbItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Akademik', href: '/programs' },
  { label: 'Prestasi Kampus' },
]

export default function PrestasiKampusPage() {
  const [active, setActive] = useState('Semua')
  const { items, meta, loading, goToPage } = usePaginatedPosts<ListingCardItem>({
    type: 'prestasi_kampus',
    category: active === 'Semua' ? undefined : active,
  })

  return (
    <>
      <PageHeader
        eyebrow="Akademik · Prestasi Kampus"
        title="Pencapaian yang Membanggakan"
        description="Setiap penghargaan adalah bukti komitmen kami terhadap kualitas pendidikan dan kontribusi bagi masyarakat."
        variant="prestasi"
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      <section className="mx-content py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {statsData.map((stat, i) => (
            <Reveal key={stat.label} index={i}>
              <GlassCard className="flex flex-col items-center p-6 text-center" hover>
                <Trophy className="mb-3 size-8 text-primary dark:text-accent" />
                <span className="text-3xl font-extrabold text-foreground">
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="mx-content py-12">
        <CategoryFilter categories={categories} active={active} onChange={setActive} />

        {loading ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            Belum ada prestasi di kategori ini. Cek kembali nanti.
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
