<?php

namespace App\Http\Controllers;


use App\Models\Tag;
use Illuminate\Http\Request;
use App\Http\Resources\ArticleItemResource;
use Inertia\Inertia;

class TagController extends Controller
{
    public function show(Tag $tag)
    {
        $articles = $tag->articles()->latest()->paginate(9);
        return Inertia::render('Tags/Show', [
            'tag' => $tag,
            'articles' => \App\Http\Resources\Article\ArticleItemResource::collection($articles),
        ]);
    }
}
