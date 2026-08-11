import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { resolveNavIcon } from '@/components/site/nav-icons'
import { cn } from '@/lib/utils'

type AkademikDropdownProps = {
  label: string
  href: string
  akademikSubmenu: Array<{ label: string; href: string; icon: string }>
  programSubmenu: Array<{ label: string; href: string; icon: string }>
  isActive: boolean
  isBlocked?: boolean
  isItemBlocked?: (href: string) => boolean
  className?: string
}

export function NavDropdownAkademik({
  label,
  href,
  akademikSubmenu,
  programSubmenu,
  isActive,
  isBlocked = false,
  isItemBlocked,
  className,
}: AkademikDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const renderItem = (item: { label: string; href: string; icon: string }, i: number) => {
    const Icon = resolveNavIcon(item.icon)
    const blocked = isItemBlocked?.(item.href) ?? false

    if (blocked) {
      return (
        <span
          key={`${item.href}-${i}`}
          aria-disabled="true"
          aria-current="page"
          className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground/50"
        >
          <Icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground/40" />
          <span className="truncate text-xs">{item.label}</span>
        </span>
      )
    }

    return (
      <Link
        key={`${item.href}-${i}`}
        to={item.href}
        role="menuitem"
        onClick={() => setIsOpen(false)}
        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-600 transition-colors duration-200 hover:bg-secondary hover:text-primary focus-visible:bg-secondary focus-visible:text-primary focus-visible:outline-none dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-foreground"
      >
        <Icon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary dark:group-hover:text-accent"
        />
        <span className="truncate">{item.label}</span>
      </Link>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-current={isBlocked ? 'page' : undefined}
        data-open={isOpen ? 'true' : 'false'}
        data-active={isActive ? 'true' : 'false'}
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          'nav-item flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors duration-200',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground',
          className,
        )}
      >
        <span className="nav-underline">{label}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-3.5 shrink-0 transition-transform duration-300 ease-out',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-50 w-[35rem] pt-2"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-popover/95 p-1.5 shadow-xl shadow-primary/5 backdrop-blur-md dark:border-white/10">
              <div className="flex">
                {/* Left column: Akademik */}
                <div className="flex flex-1 flex-col">
                  <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Akademik
                  </div>
                  <div className="flex flex-col gap-0.5 px-1.5 pb-1.5">
                    {akademikSubmenu.map((item, i) => renderItem(item, i))}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px bg-border/50" />

                {/* Right column: Program Studi */}
                <div className="flex flex-1 flex-col">
                  <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Program Studi
                  </div>
                  <div className="flex flex-col gap-0.5 px-1.5 pb-1.5">
                    {programSubmenu.map((item, i) => renderItem(item, i))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
