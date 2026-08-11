import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GradientButton } from '@/components/site/gradient-button'
import { Logo } from '@/components/site/logo'
import { NavDropdown } from '@/components/site/nav-dropdown'
import { NavDropdownAkademik } from '@/components/site/nav-dropdown-akademik'
import { NavMobileItem } from '@/components/site/nav-mobile-item'
import { ThemeToggle } from '@/components/site/theme-toggle'
import { navLinks } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    const baseHref = href.split('#')[0]
    return pathname === baseHref || pathname.startsWith(baseHref + '/')
  }

  const isBlocked = (href: string) => {
    const [baseHref, hash] = href.split('#')
    const normalized = baseHref.replace(/\/$/, '') || '/'
    if (hash) return false
    return normalized === (pathname.replace(/\/$/, '') || '/')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center pt-3 sm:pt-4">
      <nav
        className={cn(
          'flex w-[calc(100%-2.5rem)] items-center justify-between gap-6 rounded-2xl px-3 py-2.5 transition-all duration-300 sm:w-[calc(100%-6rem)] lg:w-[calc(100%-14rem)]',
          scrolled
            ? 'glass-strong shadow-lg shadow-primary/5'
            : 'border border-transparent bg-transparent',
        )}
      >
        <Logo onDark={!scrolled} />

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            if ('akademikSubmenu' in link && link.akademikSubmenu && 'programSubmenu' in link) {
              return (
                <NavDropdownAkademik
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  akademikSubmenu={link.akademikSubmenu}
                  programSubmenu={link.programSubmenu}
                  isActive={isActive(link.href)}
                  isBlocked={isBlocked(link.href)}
                  isItemBlocked={isBlocked}
                />
              )
            }

            if ('submenu' in link && link.submenu) {
              return (
                <NavDropdown
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  submenu={link.submenu}
                  isActive={isActive(link.href)}
                  isBlocked={isBlocked(link.href)}
                  isItemBlocked={isBlocked}
                />
              )
            }

            const active = isActive(link.href)
            const blocked = isBlocked(link.href)

            if (blocked) {
              return (
                <span
                  key={link.href}
                  aria-disabled="true"
                  aria-current="page"
                  className="nav-item cursor-not-allowed px-3.5 py-2 text-sm font-medium text-primary/60"
                  data-active="true"
                >
                  <span className="nav-underline">{link.label}</span>
                </span>
              )
            }

            return (
              <Link
                key={link.href}
                to={link.href}
                data-active={active ? 'true' : 'false'}
                className={cn(
                  'nav-item px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span className="nav-underline">{link.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Cari"
            onClick={() => setSearchOpen((s) => !s)}
            className="hidden size-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:bg-secondary lg:inline-flex"
          >
            <Search className="size-4" />
          </button>

          <div className="hidden lg:inline-flex gap-2">
            <ThemeToggle />
          </div>

          <GradientButton href="/admissions" className="hidden lg:inline-flex">
            Daftar Sekarang
          </GradientButton>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 hidden justify-center lg:flex"
          >
            <div className="glass-strong flex w-[calc(100%-14rem)] items-center gap-3 rounded-2xl px-4 py-3 shadow-lg">
              <Search className="size-4 text-muted-foreground" />
              <input
                autoFocus
                type="search"
                placeholder="Cari program, berita, dan lainnya…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
                ESC
              </kbd>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 flex justify-center lg:hidden"
          >
            <div className="glass-strong flex max-h-[calc(100dvh-6rem)] w-[calc(100%-2.5rem)] flex-col gap-1 overflow-y-auto overscroll-contain rounded-2xl p-3 shadow-xl sm:w-[calc(100%-6rem)]">
              {navLinks.map((link) => (
                <NavMobileItem
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  submenu={'submenu' in link ? link.submenu : undefined}
                  akademikSubmenu={'akademikSubmenu' in link ? link.akademikSubmenu : undefined}
                  programSubmenu={'programSubmenu' in link ? link.programSubmenu : undefined}
                  isActive={isActive(link.href)}
                  isBlocked={isBlocked(link.href)}
                  isItemBlocked={isBlocked}
                  onNavigate={() => setOpen(false)}
                />
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
                <GradientButton href="/admissions" className="flex-1">
                  Daftar Sekarang
                </GradientButton>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
