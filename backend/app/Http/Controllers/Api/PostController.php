<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'type' => 'nullable|string',
            'category' => 'nullable|string|max:80',
            'featured' => 'nullable|boolean',
            'per_page' => 'nullable|integer|min:1|max:50',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = Post::published()->latest('published_at');

        if ($request->filled('type')) {
            $types = array_intersect(
                explode(',', (string) $request->string('type')),
                array_merge(Post::NEWS_TYPES, Post::ACHIEVEMENT_TYPES)
            );
            if (empty($types)) {
                return response()->json(['data' => [], 'meta' => ['total' => 0]]);
            }
            $query->ofType($types);
        }

        if ($request->filled('category')) {
            $query->where('category', $request->string('category'));
        }

        if ($request->boolean('featured')) {
            $query->featured();
        }

        return response()->json(
            $query->paginate($request->integer('per_page', 9))
        );
    }

    public function show(Request $request, string $contentType, string $slug)
    {
        $validTypes = array_merge(Post::NEWS_TYPES, Post::ACHIEVEMENT_TYPES);
        if (! in_array($contentType, $validTypes, true)) {
            abort(404);
        }

        $post = Post::published()
            ->with(['author:id,name,avatar_url', 'program:id,name,slug', 'lecturer:id,name,photo_url'])
            ->where('content_type', $contentType)
            ->where('slug', $slug)
            ->firstOrFail();

        $related = Post::published()
            ->where('id', '!=', $post->id)
            ->where('content_type', $post->content_type)
            ->when($post->category, fn ($q) => $q->where('category', $post->category))
            ->latest('published_at')
            ->limit(3)
            ->get(['id', 'content_type', 'category', 'category_color', 'title', 'slug', 'excerpt', 'featured_image_url', 'published_at', 'read_time_minutes']);

        return response()->json([
            'data' => $post,
            'related' => $related,
        ]);
    }
}
