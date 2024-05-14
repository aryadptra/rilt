<?php

namespace App\Models;

use App\Enums\SeriesStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Series extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $with = ['author', 'tags'];
    protected $casts = [
        'status' => SeriesStatus::class,
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class)->select('name', 'slug');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id')->select('id', 'name', 'username');
    }

    public function scopeWherePublished($query)
    {
        return $query->where('status', SeriesStatus::PUBLISHED);
    }
}
