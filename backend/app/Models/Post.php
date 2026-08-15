<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'content_type',
        'category',
        'category_color',
        'tags',
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image_url',
        'author_id',
        'related_program_id',
        'related_lecturer_id',
        'priority',
        'competition_level',
        'achievement_year',
        'attachment_url',
        'read_time_minutes',
        'event_date',
        'deadline',
        'credited_name',
        'credited_program_text',
        'credited_initials',
        'is_featured',
        'status',
        'published_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_featured' => 'boolean',
        'event_date' => 'date',
        'deadline' => 'date',
        'published_at' => 'datetime',
    ];

    public const NEWS_TYPES = ['berita', 'pengumuman', 'kegiatan_akademik', 'kegiatan_mahasiswa'];
    public const ACHIEVEMENT_TYPES = ['prestasi_kampus', 'prestasi_dosen', 'prestasi_mahasiswa'];

    public function author(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'author_id');
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class, 'related_program_id');
    }

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class, 'related_lecturer_id');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->where(function ($q) {
                $q->whereNull('published_at')->orWhere('published_at', '<=', now());
            });
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOfType($query, string|array $type)
    {
        return $query->whereIn('content_type', (array) $type);
    }
}
