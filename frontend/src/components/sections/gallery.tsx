import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { assetUrl } from '@/lib/utils'
import api from '@/lib/api'

interface GalleryWidget {
  id: number
  title: string | null
  image_url: string | null
}

export function GallerySection() {
  const [images, setImages] = useState<GalleryWidget[]>([])
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    api.get('/widgets', { params: { type: 'gallery_image' } }).then((r) => setImages(r.data.data ?? []))
  }, [])

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    if (active !== null) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close])

  if (images.length === 0) return null

  const activeImage = active !== null ? images[active] : null

  return (
    <section id="gallery" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-secondary/40" />
      <div className="mx-content">
        <SectionHeading
          eyebrow="Kehidupan Kampus"
          title="Kampus dirancang untuk menginspirasi"
          description="Jelajahi ruang-ruang di mana ide menjadi produk, dan mahasiswa menjadi profesional."
        />

        <Reveal className="mt-12">
          <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[200px] lg:grid-cols-4">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden rounded-2xl border border-border ${i % 3 === 0 ? 'row-span-2' : ''}`}
              >
                <img
                  src={assetUrl(img.image_url ?? '')}
                  alt={img.title ?? 'Foto kampus'}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {img.title && (
                  <span className="absolute bottom-3 left-3 translate-y-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {img.title}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground"
            >
              <X className="size-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl border border-border shadow-2xl"
            >
              <img
                src={assetUrl(activeImage.image_url ?? '')}
                alt={activeImage.title ?? 'Foto kampus'}
                className="size-full object-cover"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
