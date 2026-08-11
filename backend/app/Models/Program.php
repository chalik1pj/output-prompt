<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'degree_level',
        'track',
        'short_description',
        'full_description',
        'accreditation',
        'badge_color',
        'card_image_url',
        'icon_name',
        'competencies',
        'careers',
        'curriculum',
        'closing_note',
        'display_order',
        'is_published',
    ];

    protected $casts = [
        'competencies' => 'array',
        'careers' => 'array',
        'curriculum' => 'array',
        'closing_note' => 'array',
        'is_published' => 'boolean',
    ];

    public function lecturers(): HasMany
    {
        return $this->hasMany(Lecturer::class);
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'related_program_id');
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeTrack($query, string $track)
    {
        return $query->where('track', $track);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
