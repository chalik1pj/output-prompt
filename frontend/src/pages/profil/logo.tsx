import { Download } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { GradientButton } from '@/components/site/gradient-button'

export default function LogoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Identitas Visual"
        title="Logo & Filosofi STIKOM"
        description="Filosofi bentuk, warna, dan penggunaan resmi logo STIKOM Tunas Bangsa Pematangsiantar."
        variant="logo"
      />

      <section className="mx-content py-20">
        <div className="mx-auto max-w-4xl space-y-12">
          <Reveal>
            <GlassCard strong className="p-8 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
              <img
                src="/images/stikom-emblem.png"
                alt="Logo STIKOM Tunas Bangsa"
                className="size-40 object-contain shrink-0"
              />
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold">Makna & Filosofi Emblem</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Bintang bersudut lima melambangkan Pancasila dan ketaqwaan, tunas tanaman melambangkan generasi muda yang siap berkembang, serta lingkaran gear komputasi melambangkan penguasaan teknologi informasi masa depan.
                </p>
                <div className="pt-2">
                  <a
                    href="/images/stikom-emblem.png"
                    download="stikom-emblem.png"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Download className="size-4" />
                    Unduh Logo PNG High-Res
                  </a>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  )
}
