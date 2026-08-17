import { useEffect, useState } from 'react'
import { Reveal } from '@/components/site/reveal'
import api from '@/lib/api'

interface PartnerWidget {
  id: number
  title: string
}

export function PartnersSection() {
  const [partners, setPartners] = useState<PartnerWidget[]>([])

  useEffect(() => {
    api.get('/widgets', { params: { type: 'partner' } }).then((r) => setPartners(r.data.data ?? []))
  }, [])

  if (partners.length === 0) return null

  const row = [...partners, ...partners]

  return (
    <section id="research" className="relative py-16 sm:py-20">
      <div className="mx-content">
        <Reveal className="text-center">
          <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Dipercaya oleh pemimpin industri & mitra penelitian
          </p>
        </Reveal>

        <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-4 group-hover:[animation-play-state:paused]">
            {row.map((p, i) => (
              <div
                key={`${p.title}-${i}`}
                className="flex h-16 min-w-[180px] items-center justify-center gap-2.5 rounded-2xl border border-border bg-card px-6"
              >
                <span className="inline-flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground">
                  {p.title.charAt(0)}
                </span>
                <span className="font-display text-base font-semibold tracking-tight text-foreground/80">
                  {p.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
