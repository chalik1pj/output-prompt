<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::updateOrCreate(
            ['email' => 'admin@stikomtb.ac.id'],
            [
                'name' => 'Super Admin',
                'password_hash' => Hash::make('ChangeThisPassword123!'),
                'role' => 'super_admin',
            ]
        );
    }
}
