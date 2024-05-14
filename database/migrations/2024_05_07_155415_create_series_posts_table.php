<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('series_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('series_group_id');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('body');
            $table->integer('order')->default(0);
            $table->integer('status')->default(\App\Enums\SeriesStatus::PREVIEW->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('series_posts');
    }
};
