<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password_hash',
        'role',
        'avatar_url',
    ];

    protected $hidden = [
        'password_hash',
    ];

    /**
     * Laravel's Authenticatable expects a `password` attribute for guards;
     * this maps it to the `password_hash` column used in the given schema.
     */
    public function getAuthPassword(): string
    {
        return $this->password_hash;
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'author_id');
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }
}
