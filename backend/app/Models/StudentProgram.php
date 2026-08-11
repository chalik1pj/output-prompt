<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentProgram extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'program_type',
        'name',
        'description',
        'requirements',
        'how_to_apply',
        'country',
        'scope',
        'icon_name',
        'logo_url',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('display_order');
    }
}
