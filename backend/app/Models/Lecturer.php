<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lecturer extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'program_id',
        'name',
        'position',
        'photo_url',
        'bio',
        'email',
        'is_certified',
    ];

    protected $casts = [
        'is_certified' => 'boolean',
        'created_at' => 'datetime',
    ];

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'related_lecturer_id');
    }
}
