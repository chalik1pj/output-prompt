import { Clock, ExternalLink, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { Breadcrumb } from '@/components/site/breadcrumb'
import { GlassCard } from '@/components/site/glass-card'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { site } from '@/lib/site'

const contactInfo = [
  { icon: MapPin, label: 'Alamat', value: site.address },
  { icon: Phone, label: 'Telepon', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, label: 'Jam Operasional', value: 'Senin–Jumat, 08.00–16.00 WIB' },
]

const breadcrumbItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Lokasi Kampus' },
]

export default function LokasiKampusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Profil · Lokasi Kampus"
        title="Temukan Kami di Jantung Pematangsiantar"
        description="Kampus kami mudah dijangkau dan berada di kawasan strategis Pematangsiantar, Sumatera Utara."
        variant="lokasi"
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />

      {/* Map + Contact Info */}
      <section className="mx-content py-20">
        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-border/60 shadow-sm">
              <iframe
                title="Lokasi STIKOM Tunas Bangsa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11269.87000891339!2d99.05143000154948!3d2.9584607257701605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031845fb20caced%3A0x8cd208a8d0092aa1!2sAMIK%20dan%20STIKOM%20Tunas%20Bangsa%20Pematangsiantar!5e0!3m2!1sid!2sid!4v1785824439627!5m2!1sid!2sid"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[300px] grayscale-[0.2] lg:min-h-[480px]"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-5 lg:col-span-2">
            {contactInfo.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <GlassCard className="flex items-start gap-4 p-5" hover>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 dark:from-primary/20 dark:to-accent/20">
                    <c.icon className="h-5 w-5 text-primary dark:text-accent" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {c.label}
                    </p>
                    {c.href ? (
                      <a href={c.href} className="mt-1 block text-sm font-medium text-foreground transition-colors hover:text-primary">
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-foreground">{c.value}</p>
                    )}
                  </div>
                </GlassCard>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35"
              >
                <ExternalLink className="h-4 w-4" />
                Buka di Google Maps
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Petunjuk Akses */}
      <section className="mx-content pb-20">
        <SectionHeading eyebrow="Petunjuk Akses" title="Cara Menuju Kampus" />
        <div className="mx-auto mt-12 max-w-2xl">
          <Reveal>
            <GlassCard className="p-8">
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-accent/15">
                    <Navigation className="h-4 w-4 text-primary dark:text-accent" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Lokasi Strategis</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      Berjarak singkat dari pusat Kota Pematangsiantar, mudah diakses kendaraan pribadi maupun transportasi umum.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-accent/15">
                    <MapPin className="h-4 w-4 text-primary dark:text-accent" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Area Parkir</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      Tersedia area parkir yang memadai untuk mahasiswa, staf, dan tamu kampus.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  )
}
