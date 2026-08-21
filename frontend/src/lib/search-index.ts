export interface SearchItem {
  label: string
  href: string
  category: string
  description?: string
  keywords?: string[]
}

export const searchIndex: SearchItem[] = [
  // Beranda
  { label: 'Beranda', href: '/', category: 'Halaman Utama', keywords: ['home', 'awal'] },

  // Profil
  { label: 'Profil Kampus', href: '/profil', category: 'Profil', keywords: ['tentang', 'about'] },
  { label: 'Sejarah', href: '/profil/sejarah', category: 'Profil', keywords: ['riwayat', 'perjalanan', 'berdiri'] },
  { label: 'Visi & Misi', href: '/profil/visi-misi', category: 'Profil', keywords: ['tujuan', 'nilai'] },
  { label: 'Struktur Organisasi', href: '/profil/struktur-organisasi', category: 'Profil', keywords: ['organisasi', 'pimpinan', 'jabatan'] },
  { label: 'Akreditasi', href: '/profil/accreditation', category: 'Profil', keywords: ['ban-pt', 'akreditasi institusi', 'akreditasi prodi'] },
  { label: 'Dosen & Staff', href: '/profil/staff', category: 'Profil', keywords: ['pengajar', 'karyawan', 'tenaga kependidikan'] },
  { label: 'Fasilitas Kampus', href: '/profil/fasilitas-kampus', category: 'Profil', keywords: ['lab', 'laboratorium', 'gedung', 'ruang kelas'] },
  { label: 'Lokasi Kampus', href: '/profil/lokasi-kampus', category: 'Profil', keywords: ['alamat', 'peta', 'maps', 'denah'] },
  { label: 'Logo STIKOM', href: '/profil/logo', category: 'Profil', keywords: ['identitas visual', 'download logo'] },

  // Akademik & Program Studi
  { label: 'Program Studi', href: '/programs', category: 'Akademik', keywords: ['jurusan', 'prodi', 'fakultas'] },
  { label: 'Teknik Informatika', href: '/programs/teknik-informatika', category: 'Program Studi', keywords: ['s1', 'ti', 'informatika'] },
  { label: 'Sistem Informasi', href: '/programs/sistem-informasi', category: 'Program Studi', keywords: ['s1', 'si'] },
  { label: 'Manajemen Informatika', href: '/programs/manajemen-informatika', category: 'Program Studi', keywords: ['d3', 'diploma', 'vokasi'] },
  { label: 'Informatika Komputer (S2)', href: '/programs/informatika-komputer-s2', category: 'Program Studi', keywords: ['magister', 'pascasarjana', 's2'] },
  { label: 'Kegiatan Akademik', href: '/academics/kegiatan-akademik', category: 'Akademik', keywords: ['seminar', 'workshop', 'wisuda', 'kuliah tamu'] },
  { label: 'Prestasi Kampus', href: '/academics/prestasi-kampus', category: 'Akademik', keywords: ['penghargaan', 'kompetisi', 'juara'] },
  { label: 'Prestasi Dosen', href: '/academics/prestasi-dosen', category: 'Akademik', keywords: ['publikasi', 'riset dosen', 'sertifikasi dosen'] },

  // Mahasiswa
  { label: 'Kemahasiswaan', href: '/students', category: 'Mahasiswa', keywords: ['ukm', 'organisasi mahasiswa'] },
  { label: 'Kegiatan Mahasiswa', href: '/students/kegiatan-mahasiswa', category: 'Mahasiswa', keywords: ['ukm', 'event', 'festival'] },
  { label: 'Prestasi Mahasiswa', href: '/students/prestasi-mahasiswa', category: 'Mahasiswa', keywords: ['juara', 'lomba', 'kompetisi', 'olimpiade'] },
  { label: 'Pertukaran Mahasiswa', href: '/students/pertukaran-mahasiswa', category: 'Mahasiswa', keywords: ['exchange', 'mobilitas', 'magang', 'luar negeri'] },
  { label: 'Beasiswa', href: '/students/beasiswa', category: 'Mahasiswa', keywords: ['kip kuliah', 'bantuan biaya', 'scholarship'] },

  // Informasi
  { label: 'Berita', href: '/informations', category: 'Informasi', keywords: ['news', 'kabar', 'artikel'] },
  { label: 'Pengumuman', href: '/announcements', category: 'Informasi', keywords: ['edaran', 'jadwal', 'pemberitahuan'] },

  // Lainnya
  { label: 'Penerimaan Mahasiswa Baru', href: '/admissions', category: 'Pendaftaran', keywords: ['pmb', 'daftar', 'pendaftaran', 'admisi', 'biaya kuliah'] },
  { label: 'Kontak', href: '/contact', category: 'Lainnya', keywords: ['hubungi', 'whatsapp', 'email', 'alamat'] },
]

export function searchSite(query: string, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const scored = searchIndex
    .map((item) => {
      const haystacks = [item.label, item.category, item.description ?? '', ...(item.keywords ?? [])]
        .join(' ')
        .toLowerCase()

      if (!haystacks.includes(q)) return null

      let score = 3
      if (item.label.toLowerCase() === q) score = 0
      else if (item.label.toLowerCase().startsWith(q)) score = 1
      else if (item.label.toLowerCase().includes(q)) score = 2

      return { item, score }
    })
    .filter((x): x is { item: SearchItem; score: number } => x !== null)
    .sort((a, b) => a.score - b.score)

  return scored.slice(0, limit).map((x) => x.item)
}
