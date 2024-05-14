<?php

namespace App\Http\Controllers;

use App\Enums\SeriesStatus;
use App\Http\Requests\SeriesRequest;
use App\Http\Resources\Series\SeriesItemResource;
use App\Http\Resources\Series\SeriesTableResource;
use App\Http\Resources\Series\SeriesSingleResource;
use App\Models\Category;
use App\Models\Series;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SeriesController extends Controller implements HasMiddleware
{
    public $tags;
    public $categories;
    public $statuses;
    public function __construct()
    {
        $this->tags = Tag::select('id', 'name')->get();
        $this->categories = Category::select('id', 'name')->get();
        $this->statuses = collect(SeriesStatus::cases())->map(fn($status) => [
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
            new Middleware('auth', except: ['index']),
            new Middleware('hasRole', only: ['table', 'create', 'show'])
        ];
    }

    public function table(Request $request)
    {
        $series = Series::query()
            ->with([
                'author',
                'tags' => fn($query) => $query->select('name', 'slug', 'id'),
                'category' => fn($query) => $query->select('name', 'slug', 'id'),
            ])
            ->when(!$request->user()->hasAnyRoles(['admin']), fn($query) => $query->whereBelongsTo($request->user(), 'author'))
            ->latest()
            ->paginate(9);
        return Inertia::render('Series/Table', [
            'series' => SeriesTableResource::collection($series),
        ]);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $series = Series::query()
            ->select('title', 'teaser', 'slug', 'picture', 'user_id', 'created_at', 'id', 'status')
            ->wherePublished()
            ->latest()
            ->paginate(9);

        return Inertia::render('Series/Index', [
            'series' => SeriesItemResource::collection($series),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Series/Create', [
            'tags' => $this->tags,
            'categories' => $this->categories,
            'statuses' => $this->statuses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SeriesRequest $request)
    {
        $picture = $request->file('picture');
        $series = $request->user()->series()->create([
            'title' => $title = $request->title,
            'slug' => $slug = str($title)->slug(),
            'teaser' => $request->teaser,
            'category_id' => $request->category_id,
            'status' => $request->status,
            'body' => $request->body,
            'picture' => $request->hasFile('picture') ? $picture->storeAs('images/series', $slug . '.' . $picture->extension(), 'public') : null,
        ]);

        // Dapatkan path ke gambar yang disimpan
        $picturePath = $series->picture;

        // Buat URL lengkap ke gambar
        $pictureUrl = $picturePath ? asset('storage/' . $picturePath) : null;

        $series->tags()->attach($request->tags);

        return to_route('series.show', $series);
    }

    /**
     * Display the specified resource.
     */
    public function show(Series $series)
    {
        $relatedSeries = Series::query()
            ->select('id', 'title', 'slug', 'picture')
            ->where('id', '!=', $series->id) // Menggunakan where('id', '!=', ...) untuk membatasi series yang berbeda dari series saat ini
            ->where('category_id', $series->category_id) // Menggantikan whereBelongsTo dengan kondisi yang sesuai
            ->limit(10)
            ->get();

        $currentArticle = $series->load([
            'tags' => fn($query) => $query->select('name', 'slug'),
            'category' => fn($query) => $query->select('id', 'name', 'slug'),
        ]);

        $seriesResource = new SeriesSingleResource($currentArticle);

        return Inertia::render('Series/Show', [
            'series' => $seriesResource->additional([
                'related' => $relatedSeries,
            ]),
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Series $series)
    {
        return Inertia::render('Series/Edit', [
            'series' => $series->load([
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
    public function update(SeriesRequest $request, Series $series)
    {
        $picture = $request->file('picture');
        $series->update([
            'title' => $title = $request->title,
            'teaser' => $request->teaser,
            'category_id' => $request->category_id,
            'body' => $request->body,
            'status' => $request->status,
            'picture' => $request->hasFile('picture') ? $picture->storeAs('images/series', $series->slug . '.' . $picture->extension(), 'public') : $series->picture,
        ]);

        $series->tags()->sync($request->tags, true);

        return to_route('series.show', $series);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Series $series)
    {
        if ($series->picture) {
            Storage::delete($series->picture);
        }
        $series->tags()->detach();
        $series->delete();
        return back();
    }
}
