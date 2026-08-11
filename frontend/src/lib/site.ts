export type NavLink =
  | { label: string; href: string }
  | { label: string; href: string; submenu: Array<{ label: string; href: string; icon: string }> }
  | { label: string; href: string; akademikSubmenu: Array<{ label: string; href: string; icon: string }>; programSubmenu: Array<{ label: string; href: string; icon: string }> }

export const site = {
  name: 'STIKOM Tunas Bangsa',
  shortName: 'STIKOM',
  tagline: 'Berinovasi. Bangun. Pimpin.',
  description: 'Universitas teknologi visioner membentuk inovator, insinyur, dan pemimpin digital masa depan.',
  email: 'admissions@stikomtb.ac.id',
  phone: '+62 622 100 200',
  address: 'Jl. Sudirman Blok A No. 1–3, Pematangsiantar, Sumatera Utara, Indonesia',
  mapQuery: 'STIKOM Tunas Bangsa Pematangsiantar',
  social: {
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
    facebook: 'https://facebook.com',
  },
}

export const navLinks: NavLink[] = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Profil',
    href: '/profil',
    submenu: [
      { label: 'Sejarah', href: '/profil/sejarah', icon: 'Hourglass' },
      { label: 'Visi & Misi', href: '/profil/visi-misi', icon: 'Eye' },
      { label: 'Struktur Organisasi', href: '/profil/struktur-organisasi', icon: 'Network' },
      { label: 'Tugas dan Wewenang', href: '/profil/organization', icon: 'Briefcase' },
      { label: 'Akreditasi Institusi', href: '/profil/accreditation', icon: 'Award' },
      { label: 'Akreditasi Prodi', href: '/profil/accreditation', icon: 'BadgeCheck' },
      { label: 'Dosen', href: '/profil/staff', icon: 'User' },
      { label: 'Staff', href: '/profil/staff', icon: 'Users' },
      { label: 'Fasilitas Kampus', href: '/profil/fasilitas-kampus', icon: 'Building2' },
      { label: 'Lokasi Kampus', href: '/profil/lokasi-kampus', icon: 'MapPin' },
      { label: 'Logo STIKOM', href: '/profil/logo', icon: 'Image' },
    ],
  },
  {
    label: 'Akademik',
    href: '/programs',
    akademikSubmenu: [
      { label: 'Kegiatan Akademik', href: '/academics/kegiatan-akademik', icon: 'CalendarDays' },
      { label: 'Panduan Akademik/Mahasiswa', href: '/programs#guide', icon: 'BookOpen' },
      { label: 'Peraturan Akademik', href: '/programs/regulation', icon: 'Scale' },
      { label: 'Prestasi Kampus', href: '/academics/prestasi-kampus', icon: 'Trophy' },
      { label: 'Prestasi Dosen', href: '/academics/prestasi-dosen', icon: 'Medal' },
      { label: 'Sertifikasi & Kompensi Dosen', href: '/programs/professorial-certification', icon: 'ScrollText' },
      { label: 'Kampus Berdampak', href: '/programs#campus-impact', icon: 'Sprout' },
      { label: 'Statistik PMB', href: 'https://pmb.stikomtunasbangsa.ac.id/', icon: 'BarChart3' },
    ],
    programSubmenu: [
      { label: 'Teknik Informatika', href: '/programs/teknik-informatika', icon: 'Cpu' },
      { label: 'Sistem Informasi', href: '/programs/sistem-informasi', icon: 'Database' },
      { label: 'Manajemen Informatika (D3)', href: '/programs/manajemen-informatika', icon: 'Wrench' },
      { label: 'Informatika Komputer (S2)', href: '/programs/informatika-komputer-s2', icon: 'GraduationCap' },
    ]
  },
  {
    label: 'Mahasiswa',
    href: '/students',
    submenu: [
      { label: 'Kegiatan Mahasiswa', href: '/students/kegiatan-mahasiswa', icon: 'Users' },
      { label: 'Prestasi Mahasiswa', href: '/students/prestasi-mahasiswa', icon: 'Medal' },
      { label: 'Pertukaran Mahasiswa', href: '/students/pertukaran-mahasiswa', icon: 'ArrowLeftRight' },
      { label: 'Beasiswa', href: '/students/beasiswa', icon: 'GraduationCap' },
    ]
  },
  {
    label: 'Informasi',
    href: '/informations',
    submenu: [
      { label: 'Berita', href: '/informations', icon: 'Newspaper' },
      { label: 'Pengumuman', href: '/announcements', icon: 'Megaphone' },
    ]
  },
  { label: 'Kontak', href: '/contact' },
]
