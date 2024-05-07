<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\Article\ArticleItemResource;
use App\Http\Resources\Article\ArticleSingleResource;
use App\Http\Resources\Article\ArticleTableResource;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller implements HasMiddleware
{
    public $tags;
    public $categories;
    public $statuses;
    public function __construct()
    {
        $this->tags = Tag::select('id', 'name')->get();
        $this->categories = Category::select('id', 'name')->get();
        $this->statuses = collect(ArticleStatus::cases())->map(fn($status) => [
            'id' => $status->value,
            'name' => str($status->label())->ucfirst(),
        ]);
    }

    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('auth', except: ['show', 'index']),
            new Middleware('hasRole', only: ['table', 'create'])
        ];
    }

    public function table(Request $request)
    {
        $articles = Article::query()
            ->with([
                'author',
                'tags' => fn($query) => $query->select('name', 'slug', 'id'),
                'category' => fn($query) => $query->select('name', 'slug', 'id'),
            ])
            ->when(!$request->user()->hasAnyRoles(['admin']), fn($query) => $query->whereBelongsTo($request->user(), 'author'))
            ->latest()
            ->paginate(9);
        return Inertia::render('Article/Table', [
            'articles' => ArticleTableResource::collection($articles),
        ]);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::query()
            ->select('title', 'teaser', 'slug', 'picture', 'user_id', 'created_at', 'id', 'status')
            ->wherePublished()
            ->latest()
            ->paginate(9);

        return Inertia::render('Article/Index', [
            'articles' => ArticleItemResource::collection($articles),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Article/Create', [
            'tags' => $this->tags,
            'categories' => $this->categories,
            'statuses' => $this->statuses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $picture = $request->file('picture');
        $article = $request->user()->articles()->create([
            'title' => $title = $request->title,
            'slug' => $slug = str($title)->slug(),
            'teaser' => $request->teaser,
            'category_id' => $request->category_id,
            'status' => $request->status,
            'body' => $request->body,
            'picture' => $request->hasFile('picture') ? $picture->storeAs('images/articles', $slug . '.' . $picture->extension()) : null,
        ]);

        $article->tags()->attach($request->tags);

        return to_route('articles.show', $article);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        $articles = Article::query()
            ->select('id', 'title', 'slug')
            ->whereNot('id', $article->id)
            ->whereBelongsTo($article->category)
            ->limit(10)
            ->get();
        $currentArticle = $article->load([
            'tags' => fn($query) => $query->select('name', 'slug'),
            'category' => fn($query) => $query->select('id', 'name', 'slug'),
        ]);
        return Inertia::render('Article/Show', [
            'article' => (new ArticleSingleResource($currentArticle))->additional([
                'related' => $articles,
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        return Inertia::render('Article/Edit', [
            'article' => $article->load([
                'tags' => fn($query) => $query->select('id', 'name'),
                'category' => fn($query) => $query->select('id', 'name'),
            ]),
            'statuses' => $this->statuses,
            'tags' => $this->tags,
            'categories' => $this->categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleRequest $request, Article $article)
    {
        $picture = $request->file('picture');
        $article->update([
            'title' => $title = $request->title,
            'teaser' => $request->teaser,
            'category_id' => $request->category_id,
            'body' => $request->body,
            'status' => $request->status,
            'picture' => $request->hasFile('picture') ? $picture->storeAs('images/articles', $article->slug . '.' . $picture->extension()) : $article->picture,
        ]);

        $article->tags()->sync($request->tags, true);

        return to_route('articles.show', $article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        if ($article->picture) {
            Storage::delete($article->picture);
        }
        $article->tags()->detach();
        $article->delete();
        return back();
    }
}
