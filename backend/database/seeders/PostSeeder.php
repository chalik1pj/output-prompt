<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    private const CATEGORY_COLORS = [
        'Acara' => 'blue',
        'Kemitraan' => 'purple',
        'Penelitian' => 'green',
        'Wisuda & Yudisium' => 'blue',
        'Seminar & Kuliah Tamu' => 'purple',
        'Workshop Teknologi' => 'orange',
        'Kerjasama Industri' => 'purple',
        'PMB' => 'green',
        'Kompetisi Mahasiswa' => 'orange',
        'Penghargaan Kelembagaan' => 'blue',
        'Kerjasama & Riset' => 'purple',
        'Publikasi Jurnal' => 'blue',
        'Sertifikasi Dosen' => 'green',
        'Penghargaan Profesional' => 'orange',
        'Riset & Pengabdian' => 'purple',
        'Unit Kegiatan Mahasiswa (UKM)' => 'blue',
        'Kegiatan Sosial & Pengabdian' => 'green',
        'Event Kampus' => 'purple',
        'Organisasi Mahasiswa' => 'orange',
        'Kompetisi Teknologi' => 'blue',
        'Olimpiade & Lomba Akademik' => 'purple',
        'Prestasi Olahraga & Seni' => 'orange',
        'Penghargaan Organisasi' => 'green',
        'Akademik' => 'blue',
        'Kemahasiswaan' => 'purple',
        'Penerimaan Mahasiswa Baru' => 'green',
        'Umum/Administratif' => 'gray',
    ];

    private const MONTHS = [
        'Jan' => '01', 'Feb' => '02', 'Mar' => '03', 'Apr' => '04',
        'Mei' => '05', 'Jun' => '06', 'Jul' => '07', 'Agu' => '08',
        'Sep' => '09', 'Okt' => '10', 'Nov' => '11', 'Des' => '12',
    ];

    public function run(): void
    {
        $authorId = Admin::where('role', 'super_admin')->value('id');

        $this->seedActivities('kegiatan_akademik', $this->kegiatanAkademik(), $authorId);
        $this->seedActivities('prestasi_kampus', $this->prestasiKampus(), $authorId);
        $this->seedActivities('prestasi_dosen', $this->prestasiDosen(), $authorId);
        $this->seedActivities('kegiatan_mahasiswa', $this->kegiatanMahasiswa(), $authorId);
        $this->seedActivities('prestasi_mahasiswa', $this->prestasiMahasiswa(), $authorId);
        $this->seedNews($authorId);
        $this->seedAnnouncements($authorId);
    }

    private function seedActivities(string $contentType, array $items, ?int $authorId): void
    {
        $isAchievement = str_starts_with($contentType, 'prestasi_');

        foreach ($items as $index => $item) {
            $isYearOnly = preg_match('/^\d{4}$/', $item['date']) === 1;

            Post::updateOrCreate(
                ['content_type' => $contentType, 'slug' => $item['slug']],
                [
                    'category' => $item['category'],
                    'category_color' => self::CATEGORY_COLORS[$item['category']] ?? 'blue',
                    'title' => $item['title'],
                    'excerpt' => $item['excerpt'],
                    'content' => $this->placeholderContent($item['excerpt']),
                    'featured_image_url' => $item['image'],
                    'author_id' => $authorId,
                    'achievement_year' => $isYearOnly ? $item['date'] : ($isAchievement ? substr($item['date'], -4) : null),
                    'credited_name' => $item['dosenName'] ?? null,
                    'credited_program_text' => $item['dosenProdi'] ?? null,
                    'credited_initials' => $item['dosenInitials'] ?? null,
                    'read_time_minutes' => 3,
                    'event_date' => $isYearOnly ? "{$item['date']}-01-01" : $this->parseIndoDate($item['date']),
                    'is_featured' => $index === 0,
                    'status' => 'published',
                    'published_at' => $isYearOnly ? "{$item['date']}-01-01 00:00:00" : $this->parseIndoDate($item['date']),
                ]
            );
        }
    }

    private function seedNews(?int $authorId): void
    {
        foreach ($this->news() as $index => $item) {
            preg_match('/\d+/', $item['readTime'], $m);

            Post::updateOrCreate(
                ['content_type' => 'berita', 'slug' => $item['slug']],
                [
                    'category' => $item['category'],
                    'category_color' => self::CATEGORY_COLORS[$item['category']] ?? 'blue',
                    'title' => $item['title'],
                    'excerpt' => $item['excerpt'],
                    'content' => $this->placeholderContent($item['excerpt']),
                    'featured_image_url' => $item['image'],
                    'author_id' => $authorId,
                    'read_time_minutes' => (int) ($m[0] ?? 3),
                    'event_date' => $this->parseIndoDate($item['date']),
                    'is_featured' => $index === 0,
                    'status' => 'published',
                    'published_at' => $this->parseIndoDate($item['date']),
                ]
            );
        }
    }

    private function seedAnnouncements(?int $authorId): void
    {
        foreach ($this->pengumuman() as $item) {
            Post::updateOrCreate(
                ['content_type' => 'pengumuman', 'slug' => $item['slug']],
                [
                    'category' => $item['category'],
                    'category_color' => self::CATEGORY_COLORS[$item['category']] ?? 'gray',
                    'title' => $item['title'],
                    'excerpt' => $item['excerpt'],
                    'content' => $this->placeholderContent($item['excerpt']),
                    'author_id' => $authorId,
                    'priority' => ($item['priority'] ?? null) === 'important' ? 'penting' : 'normal',
                    'deadline' => isset($item['deadline']) ? $this->parseIndoDate($item['deadline']) : null,
                    'read_time_minutes' => 2,
                    'status' => 'published',
                    'published_at' => $this->parseIndoDate($item['date']),
                ]
            );
        }
    }

    private function placeholderContent(string $excerpt): string
    {
        return '<p>'.e($excerpt).'</p>'
            .'<p><em>[DRAFT] Konten lengkap artikel ini belum ditulis -- data seed hanya '
            .'memuat ringkasan dari sumber asli. Tim editorial harap melengkapi isi '
            .'sebenarnya lewat admin panel sebelum dipublikasikan ke publik.</em></p>';
    }

    private function parseIndoDate(string $date): string
    {
        [$day, $monName, $year] = explode(' ', trim($date));
        $month = self::MONTHS[$monName] ?? '01';

        return sprintf('%s-%s-%02d', $year, $month, (int) $day);
    }

    private function kegiatanAkademik(): array
    {
        return [
            ['slug' => 'wisuda-periode-2025', 'title' => 'Wisuda Periode I Tahun Akademik 2024/2025', 'excerpt' => 'Sebanyak 320 lulusan dari berbagai program studi diwisuda dalam upacara yang dihadiri pejabat daerah dan mitra industri.', 'category' => 'Wisuda & Yudisium', 'date' => '15 Jun 2025', 'image' => '/images/gallery-graduation.png'],
            ['slug' => 'seminar-ai-nasional', 'title' => 'Seminar Nasional Artificial Intelligence & Big Data', 'excerpt' => 'Menghadirkan pembicara dari Google Indonesia dan Tokopedia, membahas tren AI terkini dan peluang karier di bidang data.', 'category' => 'Seminar & Kuliah Tamu', 'date' => '22 Mei 2025', 'image' => '/images/news-1.png'],
            ['slug' => 'workshop-cybersecurity', 'title' => 'Workshop Cybersecurity: Ethical Hacking Hands-on', 'excerpt' => 'Pelatihan intensif dua hari bersertifikat yang memberikan pengalaman praktis penetration testing dan analisis kerentanan.', 'category' => 'Workshop Teknologi', 'date' => '10 Apr 2025', 'image' => '/images/program-cybersecurity.png'],
            ['slug' => 'kerjasama-cloudnusantara', 'title' => 'Penandatanganan MoU dengan CloudNusantara', 'excerpt' => 'Kerjasama strategis membuka jalur magang, sertifikasi cloud, dan laboratorium bersama untuk mahasiswa STIKOM.', 'category' => 'Kerjasama Industri', 'date' => '28 Mar 2025', 'image' => '/images/news-2.png'],
            ['slug' => 'pmb-2025', 'title' => 'Pembukaan Pendaftaran Mahasiswa Baru TA 2025/2026', 'excerpt' => 'STIKOM Tunas Bangsa membuka gelombang pertama penerimaan mahasiswa baru dengan beasiswa bagi lulusan terbaik.', 'category' => 'PMB', 'date' => '01 Feb 2025', 'image' => '/images/profil-campus.png'],
        ];
    }

    private function prestasiKampus(): array
    {
        return [
            ['slug' => 'juara-gemastik-2024', 'title' => 'Juara 1 Gemastik XVI Kategori Keamanan Siber', 'excerpt' => 'Tim mahasiswa STIKOM berhasil meraih medali emas di ajang kompetisi teknologi informasi tingkat nasional yang diselenggarakan Kemendikbud.', 'category' => 'Kompetisi Mahasiswa', 'date' => '2024', 'image' => '/images/news-1.png'],
            ['slug' => 'akreditasi-unggul-2023', 'title' => 'Raih Akreditasi Unggul BAN-PT', 'excerpt' => 'Program studi unggulan berhasil meraih peringkat akreditasi tertinggi, membuktikan komitmen terhadap mutu pendidikan.', 'category' => 'Penghargaan Kelembagaan', 'date' => '2023', 'image' => '/images/gallery-lecture.png'],
            ['slug' => 'top-10-kampus-teknologi', 'title' => 'Masuk Top 10 Kampus Teknologi Terbaik di Sumatera', 'excerpt' => 'Pemeringkatan independen menempatkan STIKOM Tunas Bangsa di jajaran sepuluh besar perguruan tinggi teknologi regional.', 'category' => 'Penghargaan Kelembagaan', 'date' => '2023', 'image' => '/images/profil-campus.png'],
            ['slug' => 'startup-inkubasi-2024', 'title' => 'Lima Startup Inkubasi Raih Pendanaan Awal', 'excerpt' => 'Startup binaan pusat inovasi kampus berhasil memperoleh pendanaan dari investor teknologi nasional.', 'category' => 'Kerjasama & Riset', 'date' => '2024', 'image' => '/images/news-3.png'],
        ];
    }

    private function prestasiDosen(): array
    {
        return [
            ['slug' => 'publikasi-jurnal-ai-internasional', 'title' => 'Paper Diterima di IEEE International Conference on AI', 'excerpt' => 'Riset tentang deep learning untuk analisis citra medis dipresentasikan di konferensi AI internasional bergengsi.', 'category' => 'Publikasi Jurnal', 'date' => '2024', 'image' => '/images/gallery-lab.png', 'dosenName' => 'Dr. Ahmad Fauzi, M.Kom.', 'dosenProdi' => 'Teknik Informatika', 'dosenInitials' => 'AF'],
            ['slug' => 'sertifikasi-dosen-2024', 'title' => 'Meraih Sertifikasi Dosen Profesional (Serdos)', 'excerpt' => 'Pengakuan atas kompetensi pedagogik, profesional, sosial, dan kepribadian dalam menjalankan tugas sebagai pendidik.', 'category' => 'Sertifikasi Dosen', 'date' => '2024', 'image' => '/images/gallery-lecture.png', 'dosenName' => 'Sari Dewi, S.Kom., M.Cs.', 'dosenProdi' => 'Sistem Informasi', 'dosenInitials' => 'SD'],
            ['slug' => 'penghargaan-peneliti-muda', 'title' => 'Penghargaan Peneliti Muda Terbaik Kopertis Wilayah I', 'excerpt' => 'Riset di bidang keamanan siber dan forensik digital mendapat pengakuan dari koordinator perguruan tinggi swasta.', 'category' => 'Penghargaan Profesional', 'date' => '2023', 'image' => '/images/news-3.png', 'dosenName' => 'Irfan Pratama, M.T.', 'dosenProdi' => 'Teknik Informatika', 'dosenInitials' => 'IP'],
            ['slug' => 'pengabdian-masyarakat-digitalisasi', 'title' => 'Program Digitalisasi UMKM di Pematangsiantar', 'excerpt' => 'Tim dosen mendampingi 50 pelaku UMKM dalam adopsi teknologi digital untuk meningkatkan daya saing usaha.', 'category' => 'Riset & Pengabdian', 'date' => '2024', 'image' => '/images/news-2.png', 'dosenName' => 'Rina Hariyati, M.Kom.', 'dosenProdi' => 'Sistem Informasi', 'dosenInitials' => 'RH'],
        ];
    }

    private function kegiatanMahasiswa(): array
    {
        return [
            ['slug' => 'ukm-robotika-juara', 'title' => 'UKM Robotika Tampil Gemilang di Robot Contest Regional', 'excerpt' => 'Tim robot STIKOM berhasil meraih juara 2 dalam kategori line-follower dan free-style di ajang kompetisi robot se-Sumatera Utara.', 'category' => 'Unit Kegiatan Mahasiswa (UKM)', 'date' => '20 Jun 2025', 'image' => '/images/gallery-lab.png'],
            ['slug' => 'bakti-sosial-desa-digital', 'title' => 'Bakti Sosial: Program Desa Digital Bersama Masyarakat', 'excerpt' => 'Mahasiswa STIKOM terjun langsung membantu digitalisasi administrasi desa dan pelatihan literasi digital bagi warga.', 'category' => 'Kegiatan Sosial & Pengabdian', 'date' => '05 Mei 2025', 'image' => '/images/news-2.png'],
            ['slug' => 'festival-teknologi-2025', 'title' => 'STIKOMFest 2025 — Festival Teknologi & Seni Kampus', 'excerpt' => 'Tiga hari penuh pameran proyek mahasiswa, lomba coding, pentas seni, dan bazar kuliner yang menyatukan seluruh civitas akademika.', 'category' => 'Event Kampus', 'date' => '18 Apr 2025', 'image' => '/images/news-1.png'],
            ['slug' => 'hima-si-workshop-ui-ux', 'title' => 'HIMA SI Gelar Workshop UI/UX Design untuk Pemula', 'excerpt' => 'Workshop interaktif selama satu hari mengajarkan dasar-dasar Figma dan prinsip desain antarmuka kepada mahasiswa lintas prodi.', 'category' => 'Organisasi Mahasiswa', 'date' => '02 Mar 2025', 'image' => '/images/program-design.png'],
            ['slug' => 'ukm-basket-turnamen', 'title' => 'Tim Basket UKM Melaju ke Final Turnamen Antar-Kampus', 'excerpt' => 'Setelah mengalahkan empat tim lawan, UKM Basket STIKOM berhasil melaju ke babak final turnamen se-kota Pematangsiantar.', 'category' => 'Unit Kegiatan Mahasiswa (UKM)', 'date' => '10 Feb 2025', 'image' => '/images/gallery-students.png'],
        ];
    }

    private function prestasiMahasiswa(): array
    {
        return [
            ['slug' => 'hackathon-nasional-juara-1', 'title' => 'Juara 1 Hackathon Nasional "Code for Indonesia"', 'excerpt' => 'Tim mahasiswa membangun aplikasi pemantau kualitas air berbasis IoT dan AI dalam sprint 48 jam.', 'category' => 'Kompetisi Teknologi', 'date' => '2025', 'image' => '/images/news-1.png', 'dosenName' => 'Tim InnoWater', 'dosenProdi' => 'Teknik Informatika', 'dosenInitials' => 'TI'],
            ['slug' => 'olimpiade-matematika-2024', 'title' => 'Medali Perak Olimpiade Matematika Nasional', 'excerpt' => 'Mahasiswa semester 4 meraih medali perak pada Olimpiade Matematika Perguruan Tinggi yang diikuti 200+ kampus se-Indonesia.', 'category' => 'Olimpiade & Lomba Akademik', 'date' => '2024', 'image' => '/images/gallery-lecture.png', 'dosenName' => 'Rizky Aditya', 'dosenProdi' => 'Teknik Informatika', 'dosenInitials' => 'RA'],
            ['slug' => 'juara-badminton-pomda', 'title' => 'Emas Badminton Ganda Putra POMDA Sumut', 'excerpt' => 'Pasangan ganda putra STIKOM mengalahkan finalis bertahan di final POMDA Sumatera Utara 2024.', 'category' => 'Prestasi Olahraga & Seni', 'date' => '2024', 'image' => '/images/gallery-students.png', 'dosenName' => 'Farhan & Dimas', 'dosenProdi' => 'Sistem Informasi', 'dosenInitials' => 'FD'],
            ['slug' => 'best-paper-mahasiswa-semnas', 'title' => 'Best Paper Award di Seminar Nasional Informatika', 'excerpt' => 'Paper tentang deteksi hoaks berbasis NLP terpilih sebagai makalah terbaik dari 150+ submission.', 'category' => 'Kompetisi Teknologi', 'date' => '2024', 'image' => '/images/gallery-lab.png', 'dosenName' => 'Siti Nurhaliza', 'dosenProdi' => 'Teknik Informatika', 'dosenInitials' => 'SN'],
            ['slug' => 'bem-award-2024', 'title' => 'BEM STIKOM Raih Penghargaan BEM Terbaik Kopertis I', 'excerpt' => 'Pengakuan atas program kerja inovatif dan kontribusi nyata BEM kepada mahasiswa dan masyarakat sekitar kampus.', 'category' => 'Penghargaan Organisasi', 'date' => '2024', 'image' => '/images/profil-campus.png', 'dosenName' => 'BEM STIKOM TB', 'dosenProdi' => 'Organisasi Mahasiswa', 'dosenInitials' => 'BM'],
        ];
    }

    private function news(): array
    {
        return [
            ['slug' => 'annual-hackathon-2025', 'title' => 'STIKOM Mengadakan Hackathon Tahunan Terbesar', 'excerpt' => 'Lebih dari 400 mahasiswa membangun solusi berbasis AI dalam sprint 48 jam, dibimbing oleh insinyur dari perusahaan mitra.', 'category' => 'Acara', 'date' => '12 Jun 2025', 'readTime' => '4 menit baca', 'image' => '/images/news-1.png'],
            ['slug' => 'strategic-tech-partnership', 'title' => 'Kemitraan Strategis Baru dengan Perusahaan Teknologi Terkemuka', 'excerpt' => 'Kesepakatan bersejarah membuka jalur magang dan program penelitian bersama untuk mahasiswa kami.', 'category' => 'Kemitraan', 'date' => '28 Mei 2025', 'readTime' => '3 menit baca', 'image' => '/images/news-2.png'],
            ['slug' => 'ai-robotics-lab-launch', 'title' => 'Lab Penelitian AI & Robotika Resmi Diluncurkan', 'excerpt' => 'Lab baru kami memberi mahasiswa akses praktis ke lengan robot industri dan komputasi AI canggih.', 'category' => 'Penelitian', 'date' => '09 Mei 2025', 'readTime' => '5 menit baca', 'image' => '/images/news-3.png'],
        ];
    }

    private function pengumuman(): array
    {
        return [
            ['slug' => 'jadwal-uts-gasal-2025', 'title' => 'Jadwal Ujian Tengah Semester Gasal 2025/2026', 'excerpt' => 'UTS dilaksanakan pada 6–17 Oktober 2025. Pastikan KRS sudah tervalidasi dan cek ruangan masing-masing di portal akademik.', 'category' => 'Akademik', 'date' => '01 Agu 2025', 'deadline' => '06 Okt 2025', 'priority' => 'important'],
            ['slug' => 'pendaftaran-beasiswa-kip-2025', 'title' => 'Pembukaan Pendaftaran Beasiswa KIP-Kuliah Tahap 2', 'excerpt' => 'Bagi mahasiswa yang memenuhi syarat, segera daftarkan diri melalui portal KIP-Kuliah sebelum batas waktu.', 'category' => 'Kemahasiswaan', 'date' => '28 Jul 2025', 'deadline' => '30 Sep 2025', 'priority' => 'important'],
            ['slug' => 'pmb-gelombang-2', 'title' => 'Penerimaan Mahasiswa Baru Gelombang 2 Telah Dibuka', 'excerpt' => 'Gelombang 2 PMB STIKOM Tunas Bangsa tahun akademik 2025/2026 resmi dibuka. Daftar online sekarang.', 'category' => 'Penerimaan Mahasiswa Baru', 'date' => '15 Jul 2025', 'deadline' => '30 Agu 2025'],
            ['slug' => 'libur-semester-gasal', 'title' => 'Pengumuman Libur Akhir Semester dan Jadwal Perkuliahan Baru', 'excerpt' => 'Perkuliahan semester gasal berakhir pada 20 Desember 2025. Semester genap dimulai 12 Januari 2026.', 'category' => 'Umum/Administratif', 'date' => '10 Jul 2025'],
            ['slug' => 'pelatihan-sertifikasi-cloud', 'title' => 'Pendaftaran Pelatihan & Sertifikasi Cloud Computing', 'excerpt' => 'Gratis untuk mahasiswa aktif STIKOM. Kuota terbatas 60 peserta, daftar segera melalui bagian kemahasiswaan.', 'category' => 'Kemahasiswaan', 'date' => '05 Jul 2025', 'deadline' => '25 Jul 2025'],
            ['slug' => 'wisuda-periode-2-2025', 'title' => 'Pendaftaran Wisuda Periode II Tahun 2025', 'excerpt' => 'Bagi mahasiswa yang telah menyelesaikan seluruh persyaratan kelulusan, segera daftarkan wisuda melalui portal.', 'category' => 'Akademik', 'date' => '01 Jul 2025', 'deadline' => '15 Agu 2025'],
        ];
    }
}
