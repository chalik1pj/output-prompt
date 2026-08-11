import { CalendarCheck, CheckCircle2, MessageCircle } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import { site } from '@/lib/site'

const steps = [
  { step: '01', title: 'Konsultasi Program', desc: 'Hubungi admin PMB via WhatsApp untuk konsultasi pemilihan program studi dan jalur masuk.' },
  { step: '02', title: 'Pengisian Formulir', desc: 'Isi formulir pendaftaran online di portal PMB resmi dan unggah kelengkapan berkas.' },
  { step: '03', title: 'Ujian / Seleksi', desc: 'Ikuti Tes Potensi Akademik (TPA) online atau jalur seleksi nilai rapot tanpa tes.' },
  { step: '04', title: 'Registrasi Ulang', desc: 'Lakukan pembayaran registrasi dan konfirmasi status sebagai mahasiswa baru.' },
]

export default function AdmissionsPage() {
  const whatsappNumber = site.phone.replace(/\D/g, '')
  const whatsappMessage = encodeURIComponent(
    'Halo Admin PMB STIKOM Tunas Bangsa, saya ingin bertanya mengenai prosedur pendaftaran mahasiswa baru.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Penerimaan Mahasiswa Baru"
        title="PMB Tahun Akademik 2025/2026"
        description="Pendaftaran mahasiswa baru jenjang Sarjana (S1), Diploma (D3), dan Magister (S2) telah resmi dibuka."
        variant="admissions"
      />

      <section className="mx-content py-20 space-y-16">
        {/* Registration Portal Link & Action */}
        <Reveal>
          <GlassCard strong className="p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-success/15 px-4 py-1.5 text-xs font-semibold text-success">
              <CalendarCheck className="size-4" />
              Gelombang I Masih Dibuka
            </span>
            <h2 className="font-display text-3xl font-extrabold">Daftar Online Melalui Portal PMB</h2>
            <p className="text-muted-foreground leading-relaxed">
              Anda dapat mendaftar langsung secara online melalui portal PMB atau menghubungi panitia penerimaan kami.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://pmb.stikomtunasbangsa.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                Buka Portal PMB Online
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-8 py-4 font-semibold text-success hover:bg-success/20 transition-all"
              >
                <MessageCircle className="size-5" />
                Chat Panitia PMB (WA)
              </a>
            </div>
          </GlassCard>
        </Reveal>

        {/* Steps */}
        <div className="space-y-8">
          <h2 className="font-display text-2xl font-bold text-center">4 Langkah Alur Pendaftaran</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.05}>
                <GlassCard className="p-6 h-full space-y-3">
                  <span className="font-display text-3xl font-extrabold text-primary">{s.step}</span>
                  <h3 className="font-display font-bold text-lg">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
