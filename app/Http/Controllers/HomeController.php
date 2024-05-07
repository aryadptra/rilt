<?php

namespace App\Http\Controllers;

use App\Http\Resources\Article\ArticleItemResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $articles = Article::query()
            ->select('id', 'user_id', 'title', 'slug', 'teaser', 'created_at', 'status', 'picture')
            ->with(['tags'])
            ->limit(9)
            ->paginate(9);
        // return ArticleItemResource::collection($articles);
        return Inertia::render('Home', [
            'articles' => ArticleItemResource::collection($articles),
        ]);
    }
}
