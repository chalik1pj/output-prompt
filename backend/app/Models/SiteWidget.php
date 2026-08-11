<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteWidget extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'widget_type',
        'title',
        'subtitle',
        'quote',
        'value',
        'image_url',
        'link_url',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('display_order');
    }

    public function scopeOfType($query, string $type)
    {
        return $query->where('widget_type', $type);
    }
}
