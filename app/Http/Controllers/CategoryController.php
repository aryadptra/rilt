<?php

namespace App\Http\Controllers;

use App\Http\Resources\Article\ArticleItemResource;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show(Category $category)
    {
        $articles = Article::query()
            ->select('id', 'user_id', 'title', 'slug', 'teaser', 'created_at', 'picture')
            ->where('category_id', $category->id)
            ->with(['tags'])
            ->limit(10)
            ->paginate(9);
        return Inertia::render('Categories/Show', [
            'articles' => ArticleItemResource::collection($articles),
            'category' => $category
        ]);
    }
}
