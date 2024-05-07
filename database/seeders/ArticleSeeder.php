<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buat 5 pengguna dan masing-masing memiliki 15 artikel
        User::factory(5)->hasArticles(15)->create()->each(function ($user) {
            // Menautkan role 'writer' ke user
            $user->roles()->attach(2); // ID untuk peran 'writer'
        });

        Article::each(function ($article) {
            $tags = Tag::get()->random(rand(1, 3));
            $article->tags()->attach($tags->pluck('id'));
        });
    }
}
