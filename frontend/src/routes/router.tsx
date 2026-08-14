import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import PublicLayout from '@/layouts/public-layout'
import DashboardLayout from '@/layouts/dashboard-layout'
import { RequireAdminAuth } from '@/pages/admin-panel/middleware'

// Lazy-loaded Public Pages
const HomePage = lazy(() => import('@/pages/home'))
const ProfilPage = lazy(() => import('@/pages/profil'))
const SejarahPage = lazy(() => import('@/pages/profil/sejarah'))
const VisiMisiPage = lazy(() => import('@/pages/profil/visi-misi'))
const StrukturPage = lazy(() => import('@/pages/profil/struktur'))
const AccreditationPage = lazy(() => import('@/pages/profil/accreditation'))
const StaffPage = lazy(() => import('@/pages/profil/staff'))
const FasilitasPage = lazy(() => import('@/pages/profil/fasilitas'))
const LokasiPage = lazy(() => import('@/pages/profil/lokasi'))
const LogoPage = lazy(() => import('@/pages/profil/logo'))

const ProgramsPage = lazy(() => import('@/pages/programs'))
const ProgramDetailPage = lazy(() => import('@/pages/programs/detail'))

const ContactPage = lazy(() => import('@/pages/contact'))
const InformationsPage = lazy(() => import('@/pages/informations'))
const InformationDetailPage = lazy(() => import('@/pages/informations/detail'))
const AnnouncementsPage = lazy(() => import('@/pages/announcements'))

const StudentsPage = lazy(() => import('@/pages/students'))
const KegiatanMahasiswaPage = lazy(() => import('@/pages/students/kegiatan'))
const PrestasiMahasiswaPage = lazy(() => import('@/pages/students/prestasi'))
const PertukaranMahasiswaPage = lazy(() => import('@/pages/students/pertukaran'))
const BeasiswaPage = lazy(() => import('@/pages/students/beasiswa'))

const KegiatanAkademikPage = lazy(() => import('@/pages/academics/kegiatan'))
const PrestasiKampusPage = lazy(() => import('@/pages/academics/prestasi-kampus'))
const PrestasiDosenPage = lazy(() => import('@/pages/academics/prestasi-dosen'))
const AdmissionsPage = lazy(() => import('@/pages/admissions'))
const NotFound = lazy(() => import('@/pages/not-found'))

// Lazy-loaded Admin Pages
const AdminLoginPage = lazy(() => import('@/pages/admin-panel/login/page'))
const DashboardOverviewPage = lazy(() => import('@/pages/admin-panel/dashboard/page'))
const PostListPage = lazy(() => import('@/pages/admin-panel/post/page'))
const PostFormPage = lazy(() => import('@/pages/admin-panel/post/form'))
const ProgramListPage = lazy(() => import('@/pages/admin-panel/program/page'))
const ProgramFormPage = lazy(() => import('@/pages/admin-panel/program/form'))
const LecturerListPage = lazy(() => import('@/pages/admin-panel/lecturer/page'))
const WidgetListPage = lazy(() => import('@/pages/admin-panel/widget/page'))
const StudentProgramListPage = lazy(() => import('@/pages/admin-panel/student-program/page'))
const AdminListPage = lazy(() => import('@/pages/admin-panel/admin/page'))

function SuspenseWrap({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <SuspenseWrap><HomePage /></SuspenseWrap> },
      { path: 'profil', element: <SuspenseWrap><ProfilPage /></SuspenseWrap> },
      { path: 'profil/sejarah', element: <SuspenseWrap><SejarahPage /></SuspenseWrap> },
      { path: 'profil/visi-misi', element: <SuspenseWrap><VisiMisiPage /></SuspenseWrap> },
      { path: 'profil/struktur-organisasi', element: <SuspenseWrap><StrukturPage /></SuspenseWrap> },
      { path: 'profil/organization', element: <SuspenseWrap><StrukturPage /></SuspenseWrap> },
      { path: 'profil/accreditation', element: <SuspenseWrap><AccreditationPage /></SuspenseWrap> },
      { path: 'profil/staff', element: <SuspenseWrap><StaffPage /></SuspenseWrap> },
      { path: 'profil/fasilitas-kampus', element: <SuspenseWrap><FasilitasPage /></SuspenseWrap> },
      { path: 'profil/lokasi-kampus', element: <SuspenseWrap><LokasiPage /></SuspenseWrap> },
      { path: 'profil/logo', element: <SuspenseWrap><LogoPage /></SuspenseWrap> },

      { path: 'programs', element: <SuspenseWrap><ProgramsPage /></SuspenseWrap> },
      { path: 'programs/:slug', element: <SuspenseWrap><ProgramDetailPage /></SuspenseWrap> },

      { path: 'contact', element: <SuspenseWrap><ContactPage /></SuspenseWrap> },
      { path: 'informations', element: <SuspenseWrap><InformationsPage /></SuspenseWrap> },
      { path: 'informations/:contentType/:slug', element: <SuspenseWrap><InformationDetailPage /></SuspenseWrap> },
      { path: 'announcements', element: <SuspenseWrap><AnnouncementsPage /></SuspenseWrap> },

      { path: 'students', element: <SuspenseWrap><StudentsPage /></SuspenseWrap> },
      { path: 'students/kegiatan-mahasiswa', element: <SuspenseWrap><KegiatanMahasiswaPage /></SuspenseWrap> },
      { path: 'students/prestasi-mahasiswa', element: <SuspenseWrap><PrestasiMahasiswaPage /></SuspenseWrap> },
      { path: 'students/pertukaran-mahasiswa', element: <SuspenseWrap><PertukaranMahasiswaPage /></SuspenseWrap> },
      { path: 'students/beasiswa', element: <SuspenseWrap><BeasiswaPage /></SuspenseWrap> },

      { path: 'academics/kegiatan-akademik', element: <SuspenseWrap><KegiatanAkademikPage /></SuspenseWrap> },
      { path: 'academics/prestasi-kampus', element: <SuspenseWrap><PrestasiKampusPage /></SuspenseWrap> },
      { path: 'academics/prestasi-dosen', element: <SuspenseWrap><PrestasiDosenPage /></SuspenseWrap> },

      { path: 'admissions', element: <SuspenseWrap><AdmissionsPage /></SuspenseWrap> },

      { path: '*', element: <SuspenseWrap><NotFound /></SuspenseWrap> },
    ],
  },
  {
    path: 'admin-panel/login',
    element: <SuspenseWrap><AdminLoginPage /></SuspenseWrap>,
  },
  {
    element: <RequireAdminAuth />,
    children: [
      {
        path: 'admin-panel',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <SuspenseWrap><DashboardOverviewPage /></SuspenseWrap> },
          { path: 'post', element: <SuspenseWrap><PostListPage /></SuspenseWrap> },
          { path: 'post/new', element: <SuspenseWrap><PostFormPage /></SuspenseWrap> },
          { path: 'post/:id', element: <SuspenseWrap><PostFormPage /></SuspenseWrap> },
          { path: 'program', element: <SuspenseWrap><ProgramListPage /></SuspenseWrap> },
          { path: 'program/new', element: <SuspenseWrap><ProgramFormPage /></SuspenseWrap> },
          { path: 'program/:id', element: <SuspenseWrap><ProgramFormPage /></SuspenseWrap> },
          { path: 'lecturer', element: <SuspenseWrap><LecturerListPage /></SuspenseWrap> },
          { path: 'widget', element: <SuspenseWrap><WidgetListPage /></SuspenseWrap> },
          { path: 'student-program', element: <SuspenseWrap><StudentProgramListPage /></SuspenseWrap> },
          { path: 'admin', element: <SuspenseWrap><AdminListPage /></SuspenseWrap> },
        ],
      },
    ],
  },
])
