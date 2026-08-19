import { AboutSection } from '@/components/sections/about'
import { AchievementsSection } from '@/components/sections/achievements'
import { CtaSection } from '@/components/sections/cta'
import { GallerySection } from '@/components/sections/gallery'
import { Hero } from '@/components/sections/hero'
import { InformatiosSection } from '@/components/sections/informations'
import { PartnersSection } from '@/components/sections/partners'
import { ProgramsSection } from '@/components/sections/programs'
import { StatsSection } from '@/components/sections/stats'
import { TestimonialsSection } from '@/components/sections/testimonials'
import { WhyChooseSection } from '@/components/sections/why-choose'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProgramsSection />
      <WhyChooseSection />
      <StatsSection />
      <AchievementsSection />
      <GallerySection />
      <InformatiosSection />
      <TestimonialsSection />
      <CtaSection />
      <PartnersSection />
    </>
  )
}
