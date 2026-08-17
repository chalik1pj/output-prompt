export interface PaginatedResult<T> {
  data: T[]
  current_page: number
  last_page: number
  total: number
  per_page: number
}

export type ContentType =
  | 'berita'
  | 'pengumuman'
  | 'kegiatan_akademik'
  | 'kegiatan_mahasiswa'
  | 'prestasi_kampus'
  | 'prestasi_dosen'
  | 'prestasi_mahasiswa'

export interface AdminPost {
  id: number
  content_type: ContentType
  category: string | null
  category_color: string
  tags: string[] | null
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  featured_image_url: string | null
  author_id: number | null
  related_program_id: number | null
  related_lecturer_id: number | null
  priority: 'normal' | 'penting' | null
  competition_level: 'kampus' | 'regional' | 'nasional' | 'internasional' | null
  achievement_year: string | null
  read_time_minutes: number | null
  event_date: string | null
  deadline: string | null
  credited_name: string | null
  credited_program_text: string | null
  credited_initials: string | null
  is_featured: boolean
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  updated_at: string
}

export interface AdminProgram {
  id: number
  name: string
  slug: string
  degree_level: 'D3' | 'S1' | 'S2'
  track: 'sarjana' | 'vokasi' | 'pascasarjana'
  short_description: string
  full_description: string | null
  accreditation: string | null
  badge_color: string
  card_image_url: string | null
  icon_name: string | null
  competencies: string[] | null
  careers: string[] | null
  display_order: number
  is_published: boolean
}

export interface AdminLecturer {
  id: number
  program_id: number | null
  program?: { id: number; name: string } | null
  name: string
  position: string | null
  photo_url: string | null
  bio: string | null
  email: string | null
  is_certified: boolean
}

export type WidgetType = 'testimonial' | 'partner' | 'gallery_image' | 'campus_stat'

export interface AdminWidget {
  id: number
  widget_type: WidgetType
  title: string | null
  subtitle: string | null
  quote: string | null
  value: number | null
  image_url: string | null
  link_url: string | null
  display_order: number
  is_active: boolean
}

export interface AdminStudentProgram {
  id: number
  program_type: 'beasiswa' | 'pertukaran'
  name: string
  description: string | null
  requirements: string | null
  how_to_apply: string | null
  country: string | null
  scope: string | null
  icon_name: string | null
  logo_url: string | null
  is_active: boolean
  display_order: number
}

export interface AdminAccount {
  id: number
  name: string
  email: string
  role: 'super_admin' | 'editor'
  avatar_url: string | null
}

export interface DashboardStats {
  posts: {
    total: number
    published: number
    draft: number
    by_content_type: Record<string, number>
  }
  programs: { total: number; published: number }
  lecturers: number
  admins: number
}

export interface RecentPost {
  id: number
  content_type: ContentType
  title: string
  status: AdminPost['status']
  author_id: number | null
  author?: { name: string } | null
  updated_at: string
}
