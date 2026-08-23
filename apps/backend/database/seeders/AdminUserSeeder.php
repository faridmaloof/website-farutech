<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Administrador Principal',
                'email' => 'admin@farutech.com',
                'password' => Hash::make('Admin@123456'),
                'role' => 'admin',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Editor de Contenido',
                'email' => 'editor@farutech.com',
                'password' => Hash::make('Editor@123456'),
                'role' => 'editor',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Visualizador',
                'email' => 'viewer@farutech.com',
                'password' => Hash::make('Viewer@123456'),
                'role' => 'viewer',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
