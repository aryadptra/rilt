<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $user = User::factory()->create([
            'name' => 'Arya Dwi Putra',
            'email' => 'arya@aryadwiputra.com',
        ]);

        // Membuat role 'admin' dan 'writer'
        $roles = collect([
            ['name' => 'admin'],
            ['name' => 'writer'],
        ])->map(function ($role) {
            return Role::create($role);
        });

        // Menautkan role 'admin' ke user
        $user->roles()->attach($roles->first()->id);
    }
}
