<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->enum('content_type', [
                'berita',
                'pengumuman',
                'kegiatan_akademik',
                'kegiatan_mahasiswa',
                'prestasi_kampus',
                'prestasi_dosen',
                'prestasi_mahasiswa',
            ]);
            $table->string('category', 80)->nullable();
            $table->string('category_color', 20)->default('blue');
            $table->json('tags')->nullable();
            $table->string('title', 250);
            $table->string('slug', 250);
            $table->string('excerpt', 500)->nullable();
            $table->mediumText('content')->nullable();
            $table->string('featured_image_url', 500)->nullable();
            $table->foreignId('author_id')->nullable()->constrained('admins')->nullOnDelete();
            $table->foreignId('related_program_id')->nullable()->constrained('programs')->nullOnDelete();
            $table->foreignId('related_lecturer_id')->nullable()->constrained('lecturers')->nullOnDelete();
            $table->enum('priority', ['normal', 'penting'])->nullable();
            $table->enum('competition_level', ['kampus', 'regional', 'nasional', 'internasional'])->nullable();
            $table->string('achievement_year', 4)->nullable();
            $table->string('attachment_url', 500)->nullable();
            $table->smallInteger('read_time_minutes')->unsigned()->nullable();
            $table->date('event_date')->nullable();
            $table->date('deadline')->nullable();
            $table->string('credited_name', 150)->nullable();
            $table->string('credited_program_text', 150)->nullable();
            $table->string('credited_initials', 5)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->unique(['content_type', 'slug'], 'uq_posts_type_slug');
            $table->index(['content_type', 'status', 'published_at'], 'idx_posts_listing');
            $table->index('is_featured', 'idx_posts_featured');
            $table->index('related_program_id', 'idx_posts_program');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
