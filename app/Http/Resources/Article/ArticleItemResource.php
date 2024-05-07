<?php

namespace App\Http\Resources\Article;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ArticleItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'teaser' => $this->teaser,
            'slug' => $this->slug,
            'created_at' => $this->created_at->format('Y') == now()->format('Y') ? $this->created_at->format('d M') : $this->created_at->format('d M, Y'),
            'picture' => $this->picture ? Storage::url($this->picture) : null,
            // 'picture' => $this->picture ? asset($this->picture) : null,
            'tags' => $this->tags->map(fn($tag) => [
                'name' => $tag->name,
                'slug' => $tag->slug,
            ]),
            'author' => [
                'name' => $this->author->name,
                'username' => $this->author->username,
            ],
            'status' => $this->status,
        ];
    }
}
