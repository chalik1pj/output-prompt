import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { SectionHeading } from '@/components/site/section-heading'
import api from '@/lib/api'

interface TestimonialWidget {
  id: number
  title: string // nama
  subtitle: string | null // peran/jabatan
  quote: string | null
  image_url: string | null
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialWidget[]>([])
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    api.get('/widgets', { params: { type: 'testimonial' } }).then((r) => setTestimonials(r.data.data ?? []))
  }, [])

  const paginate = useCallback(
    (next: number) => {
      setDir(next)
      setIndex((i) => (i + next + testimonials.length) % testimonials.length)
    },
    [testimonials.length]
  )

  useEffect(() => {
    if (testimonials.length === 0) return
    const id = setInterval(() => paginate(1), 6000)
    return () => clearInterval(id)
  }, [paginate, testimonials.length])

  if (testimonials.length === 0) return null

  const active = testimonials[index]

  return (
    <section className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-40" />
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading
          eyebrow="Testimoni"
          title="Dicintai oleh mahasiswa, alumni & mitra"
        />

        <div className="relative mt-12">
          <div className="glass-strong overflow-hidden rounded-[2rem] p-8 shadow-xl sm:p-12">
            <Quote className="size-10 text-primary/30" />
            <div className="relative min-h-[180px] sm:min-h-[150px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.blockquote
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <p className="font-display text-xl font-medium leading-relaxed text-balance sm:text-2xl">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                  <footer className="mt-6 flex items-center gap-3">
                    <span className="relative inline-flex size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/30">
                      <img
                        src={active.image_url || '/images/avatar-rani.png'}
                        alt={`Foto ${active.title}`}
                        className="size-full object-cover"
                      />
                    </span>
                    <div>
                      <p className="font-semibold leading-none">{active.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{active.subtitle}</p>
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => paginate(-1)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDir(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-primary' : 'w-2 bg-border'
                    }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => paginate(1)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-secondary"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
