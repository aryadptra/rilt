<?php

namespace App\Http\Controllers;

use App\Models\Series;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeriesDetailController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $slug)
    {
        $series = Series::find($slug);

        if (!$series) {
            abort(404);
        }

        return Inertia::render('Series/Detail', [
            'series' => $series
        ]);

    }
}
