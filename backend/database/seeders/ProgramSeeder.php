<?php

namespace Database\Seeders;

use App\Models\Program;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        $programs = [
            [
                'name' => 'Teknik Informatika',
                'slug' => 'teknik-informatika',
                'degree_level' => 'S1',
                'track' => 'sarjana',
                'short_description' => 'Kuasai rekayasa perangkat lunak, algoritma, dan sistem cerdas untuk membangun produk yang menggerakkan ekonomi digital.',
                'full_description' => 'Program studi ini membekali mahasiswa dengan fondasi kuat di bidang pemrograman, struktur data, dan pengembangan perangkat lunak, dipadukan dengan pembelajaran berbasis proyek nyata bersama mitra industri.',
                'accreditation' => 'BAN-PT',
                'badge_color' => 'blue',
                'icon_name' => 'code',
                'competencies' => ['Full-stack Development', 'Machine Learning', 'Cloud Computing'],
                'careers' => [
                    'Software Engineer / Full-stack Developer',
                    'Data Engineer',
                    'Cloud/DevOps Engineer',
                    'Peneliti/Akademisi bidang Ilmu Komputer',
                ],
                'curriculum' => [
                    ['label' => 'Semester Awal', 'description' => 'Dasar pemrograman, matematika komputasi, struktur data.'],
                    ['label' => 'Semester Menengah', 'description' => 'Rekayasa perangkat lunak, basis data, jaringan komputer.'],
                    ['label' => 'Semester Akhir', 'description' => 'Peminatan (AI/ML, Cloud, Keamanan), proyek industri, skripsi.'],
                ],
                'closing_note' => [
                    ['title' => 'Terakreditasi BAN-PT', 'body' => 'Program studi Teknik Informatika terakreditasi BAN-PT dengan predikat Baik, membuktikan standar mutu pendidikan yang terjaga.'],
                ],
                'display_order' => 1,
            ],
            [
                'name' => 'Sistem Informasi',
                'slug' => 'sistem-informasi',
                'degree_level' => 'S1',
                'track' => 'sarjana',
                'short_description' => 'Jembatani bisnis dan teknologi dengan merancang sistem berbasis data yang membantu organisasi membuat keputusan lebih cerdas.',
                'full_description' => 'Program studi ini memadukan pemahaman proses bisnis dengan kemampuan teknis pengembangan sistem informasi, mempersiapkan lulusan menjadi penghubung strategis antara kebutuhan organisasi dan solusi teknologi.',
                'accreditation' => 'BAN-PT',
                'badge_color' => 'purple',
                'icon_name' => 'bar-chart',
                'competencies' => ['Business Analytics', 'Sistem ERP', 'Data Warehousing'],
                'careers' => [
                    'Business Analyst / Systems Analyst',
                    'IT Consultant',
                    'Product Manager (bidang teknologi)',
                    'ERP Specialist',
                ],
                'curriculum' => [
                    ['label' => 'Semester Awal', 'description' => 'Dasar pemrograman, analisis proses bisnis, basis data.'],
                    ['label' => 'Semester Menengah', 'description' => 'Perancangan sistem informasi, manajemen proyek TI, business intelligence.'],
                    ['label' => 'Semester Akhir', 'description' => 'Peminatan (ERP, Data Analytics), kerja praktik, skripsi.'],
                ],
                'closing_note' => [
                    ['title' => 'Terakreditasi BAN-PT', 'body' => 'Program studi Sistem Informasi terakreditasi BAN-PT dengan predikat Baik.'],
                    ['title' => 'Kerjasama Industri', 'body' => 'Program studi menjalin kerjasama dengan mitra industri teknologi untuk mendukung program magang dan proyek riset terapan mahasiswa.'],
                ],
                'display_order' => 2,
            ],
            [
                'name' => 'Teknik Komputer',
                'slug' => 'computer-engineering',
                'degree_level' => 'S1',
                'track' => 'sarjana',
                'short_description' => 'Kombinasikan perangkat keras dan perangkat lunak untuk merekayasa sistem tertanam, perangkat IoT, dan platform komputasi generasi berikutnya.',
                'accreditation' => 'BAN-PT',
                'badge_color' => 'orange',
                'icon_name' => 'cpu',
                'competencies' => ['IoT & Tertanam', 'Robotika', 'Jaringan Komputer'],
                'display_order' => 3,
            ],
            [
                'name' => 'Sains Data & AI',
                'slug' => 'data-science',
                'degree_level' => 'S1',
                'track' => 'sarjana',
                'short_description' => 'Ubah data mentah menjadi wawasan dan kecerdasan menggunakan statistik, machine learning, dan peralatan AI modern.',
                'accreditation' => 'BAN-PT',
                'badge_color' => 'green',
                'icon_name' => 'brain-circuit',
                'competencies' => ['Deep Learning', 'Big Data', 'Analitik Prediktif'],
                'display_order' => 4,
            ],
            [
                'name' => 'Keamanan Siber',
                'slug' => 'cybersecurity',
                'degree_level' => 'S1',
                'track' => 'sarjana',
                'short_description' => 'Lindungi organisasi dari ancaman yang berkembang dengan pelatihan praktis dalam operasi keamanan dan ethical hacking.',
                'accreditation' => 'BAN-PT',
                'badge_color' => 'red',
                'icon_name' => 'shield',
                'competencies' => ['Ethical Hacking', 'Keamanan Jaringan', 'Forensik Digital'],
                'display_order' => 5,
            ],
            [
                'name' => 'Desain Produk Digital',
                'slug' => 'digital-product-design',
                'degree_level' => 'S1',
                'track' => 'sarjana',
                'short_description' => 'Ciptakan pengalaman digital yang menyenangkan dan berpusat pada manusia melalui riset UX, desain interaksi, dan prototyping.',
                'accreditation' => 'BAN-PT',
                'badge_color' => 'pink',
                'icon_name' => 'palette',
                'competencies' => ['Riset UX', 'Desain Interaksi', 'Sistem Desain'],
                'display_order' => 6,
            ],
            [
                'name' => 'Manajemen Informatika',
                'slug' => 'manajemen-informatika',
                'degree_level' => 'D3',
                'track' => 'vokasi',
                'short_description' => 'Tempuh pendidikan vokasi terapan dan siap kerja lebih cepat di bidang teknologi informasi dan manajemen data.',
                'full_description' => 'Program Diploma Tiga (D3) Manajemen Informatika berfokus pada keterampilan praktis: administrasi sistem, pengembangan aplikasi skala kecil-menengah, serta pengelolaan data untuk mendukung operasional bisnis — dirancang agar lulusan siap memasuki dunia kerja dalam waktu studi yang lebih singkat.',
                'accreditation' => 'BAN-PT',
                'badge_color' => 'blue',
                'icon_name' => 'database',
                'competencies' => ['Aplikasi Terapan', 'Basis Data', 'Siap Kerja'],
                'careers' => [
                    'IT Support / Junior Programmer',
                    'Staff Administrasi Sistem Informasi',
                    'Data Entry & Database Administrator Pemula',
                    'Wirausaha bidang jasa TI',
                ],
                'curriculum' => [
                    ['label' => 'Semester Awal', 'description' => 'Dasar pemrograman, aplikasi perkantoran, pengantar basis data.'],
                    ['label' => 'Semester Menengah', 'description' => 'Pengembangan aplikasi terapan, jaringan dasar, praktik kerja lapangan.'],
                    ['label' => 'Semester Akhir', 'description' => 'Proyek akhir/tugas akhir, sertifikasi kompetensi.'],
                ],
                'closing_note' => [
                    ['title' => 'Keunggulan Jalur Vokasi', 'body' => 'Penekanan pada praktik langsung (lebih banyak jam praktikum dibanding teori), peluang magang industri, serta opsi melanjutkan ke jenjang S1 (lintas jalur) bagi lulusan yang ingin melanjutkan studi.'],
                ],
                'display_order' => 7,
            ],
            [
                'name' => 'Informatika Komputer',
                'slug' => 'informatika-komputer-s2',
                'degree_level' => 'S2',
                'track' => 'pascasarjana',
                'short_description' => 'Perdalam riset dan keahlian lanjut di bidang ilmu komputer untuk menjadi pemimpin inovasi teknologi masa depan.',
                'full_description' => 'Program Magister (S2) Informatika Komputer dirancang bagi lulusan S1 yang ingin memperdalam kompetensi di bidang kecerdasan buatan, rekayasa perangkat lunak lanjut, atau keamanan siber, melalui riset terbimbing dan kolaborasi dengan industri maupun institusi riset.',
                'accreditation' => 'BAN-PT',
                'badge_color' => 'purple',
                'icon_name' => 'graduation-cap',
                'competencies' => ['Riset AI Lanjut', 'Rekayasa Perangkat Lunak', 'Keamanan Siber'],
                'careers' => [
                    'Peneliti / Akademisi (Dosen)',
                    'IT Manager / Solution Architect',
                    'Konsultan Teknologi Senior',
                    'Peneliti di Lembaga Riset Pemerintah/Swasta',
                ],
                'curriculum' => [
                    ['label' => 'Semester 1–2', 'description' => 'Mata kuliah inti pascasarjana, metodologi penelitian lanjut.'],
                    ['label' => 'Semester 3', 'description' => 'Peminatan riset, publikasi ilmiah.'],
                    ['label' => 'Semester 4', 'description' => 'Tesis dan sidang akhir.'],
                ],
                'closing_note' => [
                    ['title' => 'Syarat Pendaftaran', 'body' => [
                        'Lulusan S1 bidang Ilmu Komputer/Informatika atau bidang terkait.',
                        'IPK minimum sesuai ketentuan kampus.',
                        'Mengikuti seleksi/wawancara akademik.',
                    ]],
                ],
                'display_order' => 8,
            ],
        ];

        foreach ($programs as $program) {
            Program::updateOrCreate(['slug' => $program['slug']], $program);
        }
    }
}
