<?php

namespace App\Enums;

enum SeriesStatus: int
{
    case UNPUBLISHED = 0;
    case PREVIEW = 1;
    case PUBLISHED = 2;

    public function label(): string
    {
        return match ($this) {
            self::UNPUBLISHED => 'unpublished',
            self::PREVIEW => 'preview',
            self::PUBLISHED => 'published',
        };
    }
}
