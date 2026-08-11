import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/site/logo'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from '@/components/site/social-icons'
import { site } from '@/lib/site'

const quickLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil Kampus', href: '/profil' },
  { label: 'Informasi & Berita', href: '/informations' },
  { label: 'Pengumuman', href: '/announcements' },
  { label: 'Hubungi Kami', href: '/contact' },
]

const programLinks = [
  { label: 'Teknik Informatika', href: '/programs/teknik-informatika' },
  { label: 'Sistem Informasi', href: '/programs/sistem-informasi' },
  { label: 'Manajemen Informatika', href: '/programs/manajemen-informatika' },
  { label: 'Informatika Komputer (S2)', href: '/programs/informatika-komputer-s2' },
]

const socials = [
  { label: 'Instagram', href: site.social.instagram, icon: InstagramIcon },
  { label: 'LinkedIn', href: site.social.linkedin, icon: LinkedinIcon },
  { label: 'YouTube', href: site.social.youtube, icon: YoutubeIcon },
  { label: 'Facebook', href: site.social.facebook, icon: FacebookIcon },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-secondary/40">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-40" />
      <div className="relative mx-content py-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.9fr_1.1fr_1.35fr] lg:gap-8">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-sm font-bold tracking-wide uppercase">
              Tautan Cepat
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-sm font-bold tracking-wide uppercase">
              Program Studi
            </h3>
            <ul className="flex flex-col gap-2.5">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + map */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-sm font-bold tracking-wide uppercase">
              Hubungi Kami
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-primary" />
                <a href={`tel:${site.phone}`} className="hover:text-primary">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-primary" />
                <a href={`mailto:${site.email}`} className="hover:text-primary">
                  {site.email}
                </a>
              </li>
            </ul>
            <div className="overflow-hidden rounded-2xl border border-border bg-background/60 shadow-sm">
              <iframe
                title="Campus location map"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11269.87000891339!2d99.05143000154948!3d2.9584607257701605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031845fb20caced%3A0x8cd208a8d0092aa1!2sAMIK%20dan%20STIKOM%20Tunas%20Bangsa%20Pematangsiantar!5e0!3m2!1sid!2sid!4v1785824439627!5m2!1sid!2sid`}
                className="h-32 w-full grayscale-[0.3]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
