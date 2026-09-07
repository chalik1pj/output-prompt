<?php

namespace Database\Seeders;

use App\Models\SiteWidget;
use Illuminate\Database\Seeder;

class SiteWidgetSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedTestimonials();
        $this->seedPartners();
        $this->seedStats();
        $this->seedGallery();
    }

    private function seedTestimonials(): void
    {
        $testimonials = [
            [
                'title' => 'Rani Wijaya',
                'subtitle' => "Software Engineer · Alumni '22",
                'quote' => 'Lab praktis dan mentoring STIKOM memberi saya kepercayaan diri untuk mendapatkan peran di perusahaan produk terkemuka segera setelah lulus.',
                'image_url' => '/images/avatar-rani.png',
                'display_order' => 1,
            ],
            [
                'title' => 'Budi Santoso',
                'subtitle' => 'Tahun Final · Sains Data',
                'quote' => 'Para profesor benar-benar peduli. Setiap proyek terasa seperti pekerjaan industri nyata, bukan hanya teori di slide.',
                'image_url' => '/images/avatar-budi.png',
                'display_order' => 2,
            ],
            [
                'title' => 'Clara Tanuwijaya',
                'subtitle' => "Product Designer · Alumni '21",
                'quote' => 'Program desain mengajarkan saya berpikir dalam sistem. Saya lulus dengan portofolio yang membuka setiap pintu.',
                'image_url' => '/images/avatar-clara.png',
                'display_order' => 3,
            ],
            [
                'title' => 'Dedi Kurniawan',
                'subtitle' => 'CTO · Mitra Industri',
                'quote' => 'Lulusan STIKOM siap berkontribusi sejak hari pertama. Mereka adalah antara karyawan terkuat di tim kami.',
                'image_url' => '/images/avatar-dedi.png',
                'display_order' => 4,
            ],
        ];

        foreach ($testimonials as $item) {
            SiteWidget::updateOrCreate(
                ['widget_type' => 'testimonial', 'title' => $item['title']],
                [...$item, 'widget_type' => 'testimonial', 'is_active' => true]
            );
        }
    }

    private function seedPartners(): void
    {
        $partners = [
            'NusaTech', 'ByteWorks', 'CloudNusantara', 'DataForge',
            'PixelLabs', 'Sinergi.ai', 'Garuda Cloud', 'Nexa Systems',
        ];

        foreach ($partners as $index => $name) {
            SiteWidget::updateOrCreate(
                ['widget_type' => 'partner', 'title' => $name],
                ['widget_type' => 'partner', 'display_order' => $index + 1, 'is_active' => true]
            );
        }
    }

    private function seedStats(): void
    {
        $stats = [
            ['title' => 'Mahasiswa Aktif', 'value' => 8200],
            ['title' => 'Alumni Dunia', 'value' => 15000],
            ['title' => 'Dosen Bersertifikat', 'value' => 180],
            ['title' => 'Publikasi Penelitian', 'value' => 640],
            ['title' => 'Perusahaan Mitra', 'value' => 120],
        ];

        foreach ($stats as $index => $item) {
            SiteWidget::updateOrCreate(
                ['widget_type' => 'campus_stat', 'title' => $item['title']],
                [
                    'widget_type' => 'campus_stat',
                    'value' => $item['value'],
                    'display_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        }
    }

    private function seedGallery(): void
    {
        $images = [
            ['title' => 'Modern computer laboratory', 'image_url' => '/images/gallery-lab.webp'],
            ['title' => 'Students collaborating', 'image_url' => '/images/gallery-students.webp'],
            ['title' => 'University library', 'image_url' => '/images/gallery-library.webp'],
            ['title' => 'Campus aerial view', 'image_url' => '/images/gallery-campus.webp'],
            ['title' => 'Lecture hall', 'image_url' => '/images/gallery-lecture.webp'],
            ['title' => 'Graduation ceremony', 'image_url' => '/images/gallery-graduation.webp'],
        ];

        foreach ($images as $index => $item) {
            SiteWidget::updateOrCreate(
                ['widget_type' => 'gallery_image', 'image_url' => $item['image_url']],
                [
                    'widget_type' => 'gallery_image',
                    'title' => $item['title'],
                    'display_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        }
    }
}
