import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { resolveNavIcon } from '@/components/site/nav-icons'
import { cn } from '@/lib/utils'

export function NavMobileItem({
  label,
  href,
  submenu,
  akademikSubmenu,
  programSubmenu,
  isActive,
  isBlocked,
  isItemBlocked,
  onNavigate,
}: {
  label: string
  href: string
  submenu?: Array<{ label: string; href: string; icon: string }>
  akademikSubmenu?: Array<{ label: string; href: string; icon: string }>
  programSubmenu?: Array<{ label: string; href: string; icon: string }>
  isActive: boolean
  isBlocked: boolean
  isItemBlocked: (href: string) => boolean
  onNavigate: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  const rowBase =
    'flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200'

  const renderSubItem = (item: { label: string; href: string; icon: string }, i: number, textSize = 'text-sm') => {
    const Icon = resolveNavIcon(item.icon)
    const blocked = isItemBlocked(item.href)

    if (blocked) {
      return (
        <span
          key={`${item.href}-${i}`}
          aria-disabled="true"
          aria-current="page"
          className={`flex cursor-not-allowed items-center gap-2.5 rounded-lg px-3 py-2 ${textSize} text-muted-foreground/50`}
        >
          <Icon aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground/40" />
          <span className="truncate">{item.label}</span>
        </span>
      )
    }

    return (
      <Link
        key={`${item.href}-${i}`}
        to={item.href}
        onClick={onNavigate}
        className={`group flex items-center gap-2.5 rounded-lg px-3 py-1.5 ${textSize} text-slate-600 transition-colors duration-200 hover:bg-secondary hover:text-primary dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-foreground`}
      >
        <Icon
          aria-hidden="true"
          className="size-3.5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary dark:group-hover:text-accent"
        />
        <span className="truncate">{item.label}</span>
      </Link>
    )
  }

  // Special case: Akademik with two columns stacked on mobile
  if (akademikSubmenu?.length && programSubmenu?.length) {
    return (
      <div className="flex flex-col">
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((e) => !e)}
          className={cn(
            rowBase,
            isActive
              ? 'bg-secondary text-primary'
              : 'text-slate-600 hover:bg-secondary hover:text-foreground dark:text-slate-300 dark:hover:bg-white/10',
          )}
        >
          <span>{label}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'size-4 shrink-0 transition-transform duration-300 ease-out',
              expanded && 'rotate-180',
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="ml-3 mt-1 flex flex-col gap-3 border-l border-border pl-3">
                <div className="flex flex-col gap-0.5">
                  <div className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Akademik
                  </div>
                  {akademikSubmenu.map((item, i) => renderSubItem(item, i, 'text-xs'))}
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Program Studi
                  </div>
                  {programSubmenu.map((item, i) => renderSubItem(item, i, 'text-xs'))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    )
  }

  if (submenu?.length) {
    return (
      <div className="flex flex-col">
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((e) => !e)}
          className={cn(
            rowBase,
            isActive
              ? 'bg-secondary text-primary'
              : 'text-slate-600 hover:bg-secondary hover:text-foreground dark:text-slate-300 dark:hover:bg-white/10',
          )}
        >
          <span>{label}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'size-4 shrink-0 transition-transform duration-300 ease-out',
              expanded && 'rotate-180',
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
                {submenu.map((item, i) => renderSubItem(item, i))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    )
  }

  if (isBlocked) {
    return (
      <span
        aria-disabled="true"
        aria-current="page"
        className={cn(rowBase, 'cursor-not-allowed bg-secondary/60 text-muted-foreground/60')}
      >
        {label}
      </span>
    )
  }

  return (
    <Link
      to={href}
      onClick={onNavigate}
      className={cn(
        rowBase,
        isActive
          ? 'bg-secondary text-primary'
          : 'text-slate-600 hover:bg-secondary hover:text-foreground dark:text-slate-300 dark:hover:bg-white/10',
      )}
    >
      {label}
    </Link>
  )
}
