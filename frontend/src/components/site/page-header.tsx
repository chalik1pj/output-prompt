import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export type PageHeaderVariant =
  | 'profil'
  | 'programs'
  | 'admissions'
  | 'news'
  | 'contact'
  | 'sejarah'
  | 'visi-misi'
  | 'struktur'
  | 'fasilitas'
  | 'lokasi'
  | 'logo'
  | 'kegiatan'
  | 'prestasi'
  | 'program-detail'
  | 'mahasiswa'
  | 'pertukaran'
  | 'beasiswa'
  | 'pengumuman'
  | 'default'

const variants: Record<PageHeaderVariant, ReactNode> = {
  profil: (
    <>
      <div className="animate-orb-1 absolute -left-24 -top-24 h-[32rem] w-[32rem] rounded-full bg-primary/30 blur-[120px] dark:bg-primary/20" />
      <div className="animate-orb-2 absolute right-0 top-1/2 h-[22rem] w-[28rem] -translate-y-1/2 rounded-full bg-accent/30 blur-[100px] dark:bg-accent/15" />
      <div className="animate-orb-3 absolute bottom-0 left-1/3 h-[16rem] w-[20rem] rounded-full bg-primary/15 blur-[80px] dark:bg-primary/10" />
    </>
  ),
  programs: (
    <>
      <div className="animate-orb-2 absolute left-1/2 top-0 h-[30rem] w-[44rem] -translate-x-1/3 rounded-full bg-gradient-to-br from-primary/35 to-accent/20 blur-[110px] dark:from-primary/20 dark:to-accent/12" />
      <div className="animate-orb-1 absolute right-8 top-8 h-[14rem] w-[18rem] rounded-full bg-accent/35 blur-[70px] dark:bg-accent/18" />
    </>
  ),
  admissions: (
    <>
      <div className="animate-orb-1 absolute -right-16 -top-16 h-[28rem] w-[36rem] rounded-full bg-accent/35 blur-[110px] dark:bg-accent/18" />
      <div className="animate-orb-2 absolute -bottom-8 left-0 h-[20rem] w-[32rem] rounded-full bg-primary/30 blur-[90px] dark:bg-primary/15" />
      <div className="animate-orb-3 absolute left-1/2 top-1/3 h-[14rem] w-[20rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[60px] dark:bg-primary/10" />
    </>
  ),
  news: (
    <>
      <div className="animate-orb-3 absolute -left-8 top-0 h-[22rem] w-[26rem] rounded-full bg-primary/28 blur-[90px] dark:bg-primary/15" />
      <div className="animate-orb-1 absolute bottom-0 right-0 h-[24rem] w-[30rem] rounded-full bg-accent/28 blur-[100px] dark:bg-accent/15" />
    </>
  ),
  contact: (
    <>
      <div className="animate-orb-2 absolute left-1/2 top-1/2 h-[36rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/25 via-accent/18 to-primary/12 blur-[120px] dark:from-primary/15 dark:via-accent/10 dark:to-primary/8" />
      <div className="animate-orb-3 absolute -right-8 -top-8 h-[18rem] w-[22rem] rounded-full bg-accent/28 blur-[80px] dark:bg-accent/12" />
    </>
  ),
  sejarah: (
    <>
      <div className="animate-orb-1 absolute -left-16 -top-16 h-[30rem] w-[34rem] rounded-full bg-primary/32 blur-[120px] dark:bg-primary/18" />
      <div className="animate-orb-2 absolute bottom-0 right-0 h-[20rem] w-[28rem] rounded-full bg-accent/25 blur-[100px] dark:bg-accent/12" />
      <div className="animate-orb-3 absolute left-2/3 top-1/4 h-[12rem] w-[16rem] rounded-full bg-primary/12 blur-[70px] dark:bg-primary/8" />
    </>
  ),
  'visi-misi': (
    <>
      <div className="animate-orb-2 absolute left-1/2 top-1/3 h-[34rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 blur-[130px] dark:from-primary/18 dark:via-accent/12 dark:to-primary/6" />
      <div className="animate-orb-1 absolute -left-12 bottom-0 h-[16rem] w-[22rem] rounded-full bg-accent/25 blur-[80px] dark:bg-accent/12" />
    </>
  ),
  struktur: (
    <>
      <div className="animate-orb-1 absolute -left-8 top-0 h-[26rem] w-[30rem] rounded-full bg-primary/28 blur-[100px] dark:bg-primary/16" />
      <div className="animate-orb-2 absolute -right-8 bottom-0 h-[26rem] w-[30rem] rounded-full bg-accent/28 blur-[100px] dark:bg-accent/14" />
    </>
  ),
  fasilitas: (
    <>
      <div className="animate-orb-1 absolute -right-12 -top-12 h-[30rem] w-[38rem] rounded-full bg-accent/30 blur-[110px] dark:bg-accent/16" />
      <div className="animate-orb-2 absolute -bottom-8 left-0 h-[22rem] w-[30rem] rounded-full bg-primary/28 blur-[90px] dark:bg-primary/14" />
      <div className="animate-orb-3 absolute left-1/3 top-1/3 h-[14rem] w-[18rem] rounded-full bg-primary/12 blur-[60px] dark:bg-primary/8" />
    </>
  ),
  lokasi: (
    <>
      <div className="animate-orb-2 absolute left-1/2 top-1/2 h-[32rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/22 via-accent/16 to-primary/10 blur-[110px] dark:from-primary/12 dark:via-accent/8 dark:to-primary/6" />
      <div className="animate-orb-3 absolute -right-8 -top-8 h-[16rem] w-[20rem] rounded-full bg-accent/24 blur-[70px] dark:bg-accent/10" />
    </>
  ),
  logo: (
    <>
      <div className="animate-orb-1 absolute left-1/2 top-0 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/26 to-accent/18 blur-[100px] dark:from-primary/14 dark:to-accent/10" />
      <div className="animate-orb-3 absolute -left-12 bottom-0 h-[18rem] w-[24rem] rounded-full bg-primary/18 blur-[80px] dark:bg-primary/10" />
    </>
  ),
  kegiatan: (
    <>
      <div className="animate-orb-1 absolute -left-12 -top-12 h-[28rem] w-[32rem] rounded-full bg-primary/26 blur-[110px] dark:bg-primary/15" />
      <div className="animate-orb-2 absolute bottom-0 right-0 h-[22rem] w-[28rem] rounded-full bg-accent/28 blur-[90px] dark:bg-accent/14" />
      <div className="animate-orb-3 absolute left-1/2 top-1/3 h-[14rem] w-[18rem] rounded-full bg-primary/12 blur-[70px] dark:bg-primary/8" />
    </>
  ),
  prestasi: (
    <>
      <div className="animate-orb-2 absolute left-1/4 top-0 h-[30rem] w-[40rem] rounded-full bg-gradient-to-br from-primary/32 to-accent/22 blur-[120px] dark:from-primary/18 dark:to-accent/12" />
      <div className="animate-orb-1 absolute -right-8 bottom-0 h-[20rem] w-[26rem] rounded-full bg-accent/30 blur-[80px] dark:bg-accent/15" />
    </>
  ),
  'program-detail': (
    <>
      <div className="animate-orb-2 absolute left-1/2 top-1/4 h-[32rem] w-[46rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/28 via-accent/18 to-primary/10 blur-[120px] dark:from-primary/16 dark:via-accent/10 dark:to-primary/6" />
      <div className="animate-orb-1 absolute -left-12 bottom-0 h-[18rem] w-[24rem] rounded-full bg-accent/24 blur-[80px] dark:bg-accent/12" />
      <div className="animate-orb-3 absolute right-8 top-8 h-[14rem] w-[18rem] rounded-full bg-primary/16 blur-[70px] dark:bg-primary/10" />
    </>
  ),
  mahasiswa: (
    <>
      <div className="animate-orb-1 absolute -left-8 -top-8 h-[26rem] w-[32rem] rounded-full bg-primary/26 blur-[100px] dark:bg-primary/14" />
      <div className="animate-orb-2 absolute bottom-0 right-0 h-[24rem] w-[30rem] rounded-full bg-accent/30 blur-[90px] dark:bg-accent/16" />
      <div className="animate-orb-3 absolute left-1/2 top-1/4 h-[14rem] w-[18rem] rounded-full bg-accent/12 blur-[70px] dark:bg-accent/8" />
    </>
  ),
  pertukaran: (
    <>
      <div className="animate-orb-2 absolute left-1/2 top-1/3 h-[34rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/28 via-accent/20 to-primary/10 blur-[120px] dark:from-primary/16 dark:via-accent/10 dark:to-primary/6" />
      <div className="animate-orb-1 absolute -right-12 bottom-0 h-[20rem] w-[26rem] rounded-full bg-accent/28 blur-[80px] dark:bg-accent/14" />
    </>
  ),
  beasiswa: (
    <>
      <div className="animate-orb-1 absolute -left-16 -top-16 h-[30rem] w-[36rem] rounded-full bg-accent/32 blur-[110px] dark:bg-accent/18" />
      <div className="animate-orb-2 absolute -bottom-8 right-0 h-[24rem] w-[32rem] rounded-full bg-primary/28 blur-[90px] dark:bg-primary/14" />
      <div className="animate-orb-3 absolute left-1/3 top-1/4 h-[14rem] w-[18rem] rounded-full bg-primary/14 blur-[60px] dark:bg-primary/8" />
    </>
  ),
  pengumuman: (
    <>
      <div className="animate-orb-3 absolute -left-8 top-0 h-[24rem] w-[28rem] rounded-full bg-primary/24 blur-[90px] dark:bg-primary/14" />
      <div className="animate-orb-1 absolute bottom-0 right-0 h-[22rem] w-[28rem] rounded-full bg-accent/26 blur-[90px] dark:bg-accent/14" />
    </>
  ),
  default: (
    <div className="animate-orb-1 absolute -top-32 left-1/2 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/28 via-accent/18 to-transparent blur-3xl dark:from-primary/18 dark:via-accent/10" />
  ),
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  variant = 'default',
  breadcrumb,
}: {
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
  variant?: PageHeaderVariant
  breadcrumb?: ReactNode
}) {
  return (
    <header className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-primary/[0.07] via-background to-accent/[0.06] dark:from-primary/[0.12] dark:via-background dark:to-accent/[0.08]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {variants[variant]}
      </div>

      {breadcrumb}

      <div className={`relative z-10 mx-content pb-16 ${breadcrumb ? 'pt-6' : 'pt-32 md:pt-40'}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </span>
          <h1 className="mt-6 text-balance font-sans text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/70 dark:text-muted-foreground">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </motion.div>
      </div>
    </header>
  )
}
