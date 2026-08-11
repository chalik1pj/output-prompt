<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('slug', 150)->unique();
            $table->enum('degree_level', ['D3', 'S1', 'S2']);
            $table->enum('track', ['sarjana', 'vokasi', 'pascasarjana']);
            $table->string('short_description', 500);
            $table->text('full_description')->nullable();
            $table->string('accreditation', 50)->nullable();
            $table->string('badge_color', 20)->default('blue');
            $table->string('card_image_url', 500)->nullable();
            $table->string('icon_name', 50)->nullable();
            $table->json('competencies')->nullable();
            $table->json('careers')->nullable();
            $table->json('curriculum')->nullable();
            $table->json('closing_note')->nullable();
            $table->integer('display_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
