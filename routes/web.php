<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeriesController;
use App\Http\Controllers\TagController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');
Route::get('articles/table', [ArticleController::class, 'table'])->name('articles.table');
Route::resource('articles', ArticleController::class);
Route::get('tags/{tag:slug}', [TagController::class, 'show'])->name('tags.show');
Route::get('categories/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('dashboard', DashboardController::class)->name('dashboard')->middleware('auth');

Route::get('series/table', [SeriesController::class, 'table'])->name('series.table');
Route::resource('series', SeriesController::class);


require __DIR__ . '/auth.php';
