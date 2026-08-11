import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

function degreeBadgeClass(degree: string) {
  if (degree?.startsWith('D3'))
    return 'border-teal-400/30 bg-teal-500/20 text-teal-100'
  if (degree?.startsWith('S2'))
    return 'border-purple-400/30 bg-purple-500/20 text-purple-100'
  return 'border-white/20 bg-black/30 text-white'
}

export function ProgramCard({ program }: { program: any }) {
  const title = program.title || program.name
  const slug = program.slug
  const image = program.image || program.card_image_url || '/images/hero-campus.png'
  const degree = program.degree || program.degree_level || 'S1'
  const description = program.description || program.short_description
  const highlights = program.highlights || program.competencies || []

  return (
    <Link
      to={`/programs/${slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={image}
          alt={`Ilustrasi program ${title}`}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <span className={cn(
          'absolute right-3 top-3 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur',
          degreeBadgeClass(degree),
        )}>
          {degree}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold tracking-tight">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {description}
        </p>

        {highlights.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {highlights.slice(0, 3).map((h: string) => (
              <span
                key={h}
                className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Selengkapnya
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
