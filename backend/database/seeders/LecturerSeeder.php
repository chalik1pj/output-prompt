<?php

namespace Database\Seeders;

use App\Models\Lecturer;
use App\Models\Program;
use Illuminate\Database\Seeder;

class LecturerSeeder extends Seeder
{
    public function run(): void
    {
        $lecturers = [
            [
                'name' => 'Dr. Ahmad Fauzi, M.Kom.',
                'program_slug' => 'teknik-informatika',
                'position' => 'Dosen Tetap',
                'is_certified' => true,
            ],
            [
                'name' => 'Sari Dewi, S.Kom., M.Cs.',
                'program_slug' => 'sistem-informasi',
                'position' => 'Dosen Tetap',
                'is_certified' => true,
            ],
            [
                'name' => 'Irfan Pratama, M.T.',
                'program_slug' => 'teknik-informatika',
                'position' => 'Dosen Tetap',
                'is_certified' => true,
            ],
            [
                'name' => 'Rina Hariyati, M.Kom.',
                'program_slug' => 'sistem-informasi',
                'position' => 'Dosen Tetap',
                'is_certified' => false,
            ],
        ];

        foreach ($lecturers as $item) {
            $program = Program::where('slug', $item['program_slug'])->first();

            Lecturer::updateOrCreate(
                ['name' => $item['name']],
                [
                    'program_id' => $program?->id,
                    'position' => $item['position'],
                    'is_certified' => $item['is_certified'],
                ]
            );
        }
    }
}
