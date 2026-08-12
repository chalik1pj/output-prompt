import { Check, Download, X } from 'lucide-react'
import { Breadcrumb } from '@/components/site/breadcrumb'
import { GlassCard } from '@/components/site/glass-card'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const logoVariants = [
  {
    title: 'Logo Utama (Full Color)',
    description: 'Untuk penggunaan di atas latar terang.',
    bgClass: 'bg-white',
    imgClass: '',
  },
  {
    title: 'Logo Monokrom Putih',
    description: 'Untuk penggunaan di atas latar gelap atau berwarna.',
    bgClass: 'bg-gradient-to-br from-slate-800 to-slate-900',
    imgClass: 'brightness-0 invert',
  },
  {
    title: 'Logo Monokrom Gelap',
    description: 'Alternatif untuk latar terang minimalis.',
    bgClass: 'bg-slate-50',
    imgClass: 'brightness-0',
  },
  {
    title: 'Emblem / Lambang',
    description: 'Versi ikon tanpa wordmark, untuk favicon atau ruang sempit.',
    bgClass: 'bg-gradient-to-br from-primary/10 to-accent/10',
    imgClass: '',
  },
]

const dosRules = [
  'Gunakan logo dengan ruang kosong (clear space) minimal di sekelilingnya.',
  'Gunakan varian monokrom putih di atas background gelap atau foto.',
  'Gunakan ukuran minimal yang memastikan keterbacaan logo.',
  'Gunakan logo dari file resmi yang disediakan.',
]

const dontsRules = [
  'Mengubah warna logo di luar varian resmi.',
  'Meregangkan, memutar, atau mendistorsi proporsi logo.',
  'Menambahkan efek bayangan atau gradasi tambahan pada logo.',
  'Menempatkan logo di atas background dengan kontras rendah.',
]

const downloadFormats = ['PNG (Transparan)', 'SVG (Vektor)', 'PDF (Cetak)']

const breadcrumbItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Logo STIKOM' },
]

export default function LogoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Profil · Logo STIKOM"
        title="Identitas Visual STIKOM Tunas Bangsa"
        description="Gunakan logo resmi kami dengan tepat — panduan warna, tata letak, dan unduhan aset untuk keperluan media maupun kemitraan."
        variant="logo"
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      {/* Logo Showcase */}
      <section className="mx-content py-20">
        <SectionHeading
          eyebrow="Varian Logo"
          title="Tampilan Resmi di Berbagai Latar"
          description="Setiap varian dirancang untuk konteks penggunaan yang berbeda. Pastikan Anda memilih varian yang tepat."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {logoVariants.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <GlassCard className="h-full overflow-hidden p-0" hover>
                <div className={`flex items-center justify-center ${v.bgClass} p-10`}>
                  <div className="relative h-24 w-24">
                    <img
                      src="/images/stikom-emblem.png"
                      alt={v.title}
                      className={`size-full object-contain ${v.imgClass}`}
                    />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-foreground">{v.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {v.description}
                  </p>
                  <button
                    type="button"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur transition-all duration-200 hover:border-primary/50 hover:bg-secondary"
                  >
                    <Download className="size-3" />
                    Unduh
                  </button>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Do's & Don'ts */}
      <section className="mx-content pb-20">
        <SectionHeading eyebrow="Panduan Penggunaan" title="Do's & Don'ts" />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full p-7">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success/15 text-success">
                  <Check className="size-4" />
                </span>
                <h3 className="text-base font-bold text-success">Boleh</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {dosRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                    <span className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{rule}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full p-7">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/15 text-destructive">
                  <X className="size-4" />
                </span>
                <h3 className="text-base font-bold text-destructive">Tidak Boleh</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {dontsRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-3">
                    <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <span className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{rule}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Download Assets */}
      <section className="mx-content pb-20">
        <SectionHeading
          eyebrow="Unduhan"
          title="Unduh Aset Logo Resmi"
          description="Tersedia dalam berbagai format untuk keperluan digital maupun cetak."
        />

        <div className="mx-auto mt-12 max-w-lg">
          <Reveal>
            <GlassCard className="p-8">
              <div className="flex flex-col gap-3">
                {downloadFormats.map((format) => (
                  <button
                    key={format}
                    type="button"
                    className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-5 py-3.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-secondary"
                  >
                    <span>{format}</span>
                    <Download className="size-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Dengan mengunduh, Anda menyetujui penggunaan logo sesuai panduan di atas.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  )
}
