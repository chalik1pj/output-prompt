import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { GlassCard } from '@/components/site/glass-card'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { site } from '@/lib/site'

const details = [
  {
    icon: MapPin,
    label: 'Kunjungi Kami',
    value: site.address,
  },
  {
    icon: Mail,
    label: 'Email Kami',
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: 'Telepon Kami',
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, '')}`,
  },
]

export default function ContactPage() {
  const whatsappNumber = site.phone.replace(/\D/g, '')
  const whatsappMessage = encodeURIComponent(
    'Halo Admin STIKOM Tunas Bangsa, saya ingin mendapatkan informasi lebih lanjut.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Kontak"
        title="Mari mulai percakapan"
        description="Ada pertanyaan tentang program, penerimaan, atau kemitraan? Tim kami siap membantu Anda mengambil langkah berikutnya."
        variant="contact"
      />

      <section className="mx-content py-20">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Details */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {details.map((d, i) => (
              <Reveal key={d.label} delay={i * 0.05}>
                <GlassCard className="flex items-start gap-4 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-accent text-primary-foreground">
                    <d.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-1 block font-medium transition-colors hover:text-secondary"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium">{d.value}</p>
                    )}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {/* Admin contact actions — BUTTONS ONLY, NO INPUT FORM PER SPEC */}
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <GlassCard className="relative overflow-hidden p-8 sm:p-10">
                <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative flex flex-col gap-8">
                  <div className="max-w-xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                      Admin STIKOM Tunas Bangsa
                    </p>
                    <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                      Hubungi admin melalui kanal resmi kami
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      Pilih cara komunikasi yang paling nyaman. Admin kami siap membantu
                      menjawab pertanyaan seputar penerimaan mahasiswa, program studi,
                      dan informasi kampus.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-success/25 bg-success/10 p-5 transition-all hover:-translate-y-1 hover:border-success/50 hover:bg-success/15"
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-success text-success-foreground">
                        <MessageCircle className="size-6" />
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="font-semibold">WhatsApp Admin</span>
                        <span className="text-sm text-muted-foreground">Chat langsung dengan admin</span>
                      </span>
                    </a>
                    <a
                      href={`mailto:${site.email}`}
                      className="group flex items-center gap-4 rounded-2xl border border-primary/25 bg-primary/10 p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/15"
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Mail className="size-6" />
                      </span>
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="font-semibold">Email Admin</span>
                        <span className="truncate text-sm text-muted-foreground">{site.email}</span>
                      </span>
                    </a>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>

        {/* Map */}
        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-3xl border border-border/60">
            <iframe
              title="Lokasi STIKOM Tunas Bangsa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11269.87000891339!2d99.05143000154948!3d2.9584607257701605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031845fb20caced%3A0x8cd208a8d0092aa1!2sAMIK%20dan%20STIKOM%20Tunas%20Bangsa%20Pematangsiantar!5e0!3m2!1sid!2sid!4v1785824439627!5m2!1sid!2sid"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.2]"
            />
          </div>
        </Reveal>
      </section>
    </>
  )
}
