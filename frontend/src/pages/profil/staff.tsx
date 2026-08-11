import { useEffect, useState } from 'react'
import { Mail, GraduationCap } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { GlassCard } from '@/components/site/glass-card'
import { Reveal } from '@/components/site/reveal'
import api from '@/lib/api'

export default function StaffPage() {
  const [lecturers, setLecturers] = useState<any[]>([])

  useEffect(() => {
    api.get('/lecturers').then((res) => {
      setLecturers(res.data.data || [])
    }).catch(() => {})
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Tenaga Pendidik"
        title="Dosen & Staf Pengajar"
        description="Tenaga pendidik berkualifikasi tinggi, peneliti berpengalaman, dan praktisi industri yang siap membimbing perjalanan akademis Anda."
        variant="profil"
      />

      <section className="mx-content py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {lecturers.map((lec, i) => (
            <Reveal key={lec.id || lec.nidn} delay={i * 0.05}>
              <GlassCard className="flex flex-col items-center text-center p-6 space-y-4 h-full">
                <img
                  src={lec.photo_url || lec.photo || '/images/avatar-budi.png'}
                  alt={lec.name}
                  className="size-24 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h3 className="font-display font-bold text-base">{lec.name}</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">{lec.title || lec.position || 'Dosen Pengajar'}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">NIDN: {lec.nidn}</p>
                </div>
                {lec.expertise && (
                  <div className="flex flex-wrap gap-1 justify-center pt-2">
                    {lec.expertise.map((exp: string) => (
                      <span key={exp} className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {exp}
                      </span>
                    ))}
                  </div>
                )}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
