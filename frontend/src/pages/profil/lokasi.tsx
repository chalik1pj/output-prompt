import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { site } from '@/lib/site'

export default function LokasiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Lokasi Kampus"
        title="Temukan STIKOM Tunas Bangsa"
        description="Kampus kami terletak secara strategis di pusat kota Pematangsiantar, mudah diakses melalui sarana transportasi umum."
        variant="lokasi"
      />

      <section className="mx-content py-20 space-y-12">
        <div className="grid gap-6 md:grid-cols-3">
          <GlassCard className="p-6 space-y-3">
            <MapPin className="size-6 text-primary" />
            <h3 className="font-display font-bold">Alamat Kampus</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{site.address}</p>
          </GlassCard>
          <GlassCard className="p-6 space-y-3">
            <Phone className="size-6 text-primary" />
            <h3 className="font-display font-bold">Telepon Resmi</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{site.phone}</p>
          </GlassCard>
          <GlassCard className="p-6 space-y-3">
            <Mail className="size-6 text-primary" />
            <h3 className="font-display font-bold">Email Layanan</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{site.email}</p>
          </GlassCard>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe
              title="Peta Lokasi Kampus"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11269.87000891339!2d99.05143000154948!3d2.9584607257701605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031845fb20caced%3A0x8cd208a8d0092aa1!2sAMIK%20dan%20STIKOM%20Tunas%20Bangsa%20Pematangsiantar!5e0!3m2!1sid!2sid!4v1785824439627!5m2!1sid!2sid"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  )
}
