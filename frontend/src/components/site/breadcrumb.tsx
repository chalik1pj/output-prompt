import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type BreadcrumbItem = {
  label: string
  href?: string
}

/**
 * Breadcrumb navigation bar rendered above the PageHeader.
 * The last item is treated as the current page (no link).
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="relative z-10 mx-content pt-24 md:pt-28"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-muted-foreground/50"
                />
              )}
              {isLast || !item.href ? (
                <span className="font-medium text-foreground/80">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="transition-colors duration-200 hover:text-foreground"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
