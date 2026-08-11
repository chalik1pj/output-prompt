<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Urutan penting: AdminSeeder & ProgramSeeder duluan (PostSeeder butuh
        // author_id dari admin yang sudah ada).
        $this->call([
            AdminSeeder::class,
            ProgramSeeder::class,
            LecturerSeeder::class,
            SiteWidgetSeeder::class,
            PostSeeder::class,
        ]);
    }
}
