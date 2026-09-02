import { AnimatePresence, motion } from 'framer-motion'
import { LayoutGrid, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { integratedApps } from '@/lib/site'
import { cn } from '@/lib/utils'

/* ─── Spring / easing constants (Emil-style) ─── */
const EASE_OUT_STRONG = [0.23, 1, 0.32, 1] as const
const SPRING_POP = { type: 'spring' as const, stiffness: 420, damping: 28, mass: 0.85 }

/* ─── Single App Icon (isolated for perf) ─── */
function AppIcon({
  app,
  index,
  onNavigate,
}: {
  app: (typeof integratedApps)[number]
  index: number
  onNavigate: () => void
}) {
  return (
    <motion.a
      href={app.href}
      onClick={(e) => {
        if (app.href === '#') e.preventDefault()
        onNavigate()
      }}
      className="group flex flex-col items-center gap-2.5 rounded-2xl p-3 transition-colors duration-200 hover:bg-secondary/70 dark:hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-primary"
      /* Stagger in from below with spring */
      initial={{ opacity: 0, transform: 'translateY(12px) scale(0.92)' }}
      animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
      transition={{
        delay: index * 0.04,
        ...SPRING_POP,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon square — double-bezel structure */}
      <div
        className="relative flex size-[3.25rem] items-center justify-center rounded-[0.875rem] text-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 group-hover:shadow-[0_4px_14px_-3px_rgba(0,0,0,0.22)]"
        style={{ backgroundColor: app.color }}
      >
        {/* Inner refraction highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-[0.875rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]" />
        <span className="relative select-none text-xl font-bold leading-none tracking-tight">
          {app.initial}
        </span>
      </div>
      {/* Label */}
      <span className="text-[0.7rem] font-medium leading-tight text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
        {app.name}
      </span>
    </motion.a>
  )
}

/* ─── Desktop Popover ─── */
function DesktopPopover({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  /* Close on click outside */
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={ref}
          /* Origin-aware: scale from top-right where trigger lives */
          className="absolute right-0 top-full z-50 mt-3 w-[22rem] origin-top-right"
          initial={{ opacity: 0, transform: 'scale(0.92)' }}
          animate={{ opacity: 1, transform: 'scale(1)' }}
          exit={{ opacity: 0, transform: 'scale(0.95)' }}
          transition={{
            duration: 0.2,
            ease: EASE_OUT_STRONG,
          }}
        >
          {/* Outer shell (double-bezel) */}
          <div className="rounded-[1.25rem] bg-background/40 p-[3px] ring-1 ring-border/60 dark:bg-white/[0.04] dark:ring-white/[0.08]">
            {/* Inner core — glass surface */}
            <div className="glass-strong rounded-[calc(1.25rem-3px)] p-2.5">
              {/* Header */}
              <div className="mb-2 flex items-center justify-between px-2 pt-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Aplikasi Kampus
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Tutup"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-3 gap-1">
                {integratedApps.map((app, i) => (
                  <AppIcon key={app.name} app={app} index={i} onNavigate={onClose} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

/* ─── Mobile Full-Screen Modal ─── */
function MobileModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  /* Lock scroll while open */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT_STRONG }}
        >
          {/* Backdrop — heavy blur */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-2xl dark:bg-background/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            className="relative flex flex-1 flex-col px-6 pt-6 pb-8"
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, transform: 'translateY(12px)' }}
            transition={{
              duration: 0.35,
              ease: EASE_OUT_STRONG,
            }}
          >
            {/* Header with close */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <motion.h2
                  className="font-display text-xl font-bold tracking-tight text-foreground"
                  initial={{ opacity: 0, transform: 'translateY(8px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  transition={{ delay: 0.08, duration: 0.3, ease: EASE_OUT_STRONG }}
                >
                  Aplikasi Kampus
                </motion.h2>
                <motion.p
                  className="mt-1 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.14, duration: 0.3 }}
                >
                  Akses layanan terintegrasi STIKOM
                </motion.p>
              </div>

              {/* Morphing close button */}
              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Tutup"
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:bg-secondary"
                initial={{ opacity: 0, transform: 'rotate(-90deg) scale(0.7)' }}
                animate={{ opacity: 1, transform: 'rotate(0deg) scale(1)' }}
                exit={{ opacity: 0, transform: 'rotate(90deg) scale(0.7)' }}
                transition={SPRING_POP}
                whileTap={{ scale: 0.9 }}
              >
                <X className="size-5" />
              </motion.button>
            </div>

            {/* App grid — 3 columns, generous spacing */}
            <div className="mx-auto grid w-full max-w-sm grid-cols-3 gap-3">
              {integratedApps.map((app, i) => (
                <motion.a
                  key={app.name}
                  href={app.href}
                  onClick={(e) => {
                    if (app.href === '#') e.preventDefault()
                    onClose()
                  }}
                  className="group flex flex-col items-center gap-3 rounded-2xl p-4 transition-colors duration-200 active:bg-secondary/60 dark:active:bg-white/[0.06]"
                  initial={{ opacity: 0, transform: 'translateY(16px) scale(0.88)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                  transition={{
                    delay: 0.12 + i * 0.045,
                    ...SPRING_POP,
                  }}
                  whileTap={{ scale: 0.92 }}
                >
                  {/* Icon — larger on mobile for touch */}
                  <div
                    className="relative flex size-16 items-center justify-center rounded-[1.125rem] text-white shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2)] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-active:scale-95"
                    style={{ backgroundColor: app.color }}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[1.125rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]" />
                    <span className="relative select-none text-2xl font-bold leading-none tracking-tight">
                      {app.initial}
                    </span>
                  </div>
                  {/* Label */}
                  <span className="text-xs font-medium leading-tight text-muted-foreground">
                    {app.name}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Bottom decorative line */}
            <motion.div
              className="mx-auto mt-auto w-10 rounded-full border-t-[3px] border-muted-foreground/20 pt-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.4, ease: EASE_OUT_STRONG }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

/* ─── Main Export ─── */
export function AppLauncher() {
  const [desktopOpen, setDesktopOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeDesktop = useCallback(() => setDesktopOpen(false), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      {/* Desktop trigger + popover */}
      <div className="relative hidden lg:block">
        <button
          type="button"
          aria-label="Aplikasi Kampus"
          aria-expanded={desktopOpen}
          onClick={() => setDesktopOpen((o) => !o)}
          className={cn(
            'inline-flex size-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-all duration-200 hover:bg-secondary',
            desktopOpen && 'bg-secondary text-primary',
          )}
        >
          <LayoutGrid className="size-4" />
        </button>
        <DesktopPopover open={desktopOpen} onClose={closeDesktop} />
      </div>

      {/* Mobile trigger */}
      <button
        type="button"
        aria-label="Aplikasi Kampus"
        onClick={() => setMobileOpen(true)}
        className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:bg-secondary lg:hidden"
      >
        <LayoutGrid className="size-4" />
      </button>

      {/* Mobile full-screen modal (portalled to body-level by fixed positioning) */}
      <MobileModal open={mobileOpen} onClose={closeMobile} />
    </>
  )
}
