<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            Post::latest()->paginate($request->integer('per_page', 15))
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'content_type' => 'required|in:berita,pengumuman,kegiatan_akademik,kegiatan_mahasiswa,prestasi_kampus,prestasi_dosen,prestasi_mahasiswa',
            'category' => 'nullable|string|max:80',
            'category_color' => 'nullable|string|max:20',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:40',
            'title' => 'required|string|max:250',
            'slug' => [
                'required', 'string', 'max:250', 'alpha_dash',
                Rule::unique('posts')->where(fn ($q) => $q->where('content_type', $request->input('content_type'))),
            ],
            'excerpt' => 'nullable|string|max:500',
            'content' => 'nullable|string',
            'featured_image_url' => ['nullable', 'max:500', 'regex:/^(https?:\/\/|\/)/'],
            'related_program_id' => 'nullable|exists:programs,id',
            'related_lecturer_id' => 'nullable|exists:lecturers,id',
            'priority' => 'nullable|in:normal,penting',
            'competition_level' => 'nullable|in:kampus,regional,nasional,internasional',
            'achievement_year' => 'nullable|digits:4',
            'read_time_minutes' => 'nullable|integer|min:1|max:120',
            'event_date' => 'nullable|date',
            'is_featured' => 'boolean',
            'status' => 'required|in:draft,published,archived',
        ]);

        $data['author_id'] = $request->user()->id;
        if ($data['status'] === 'published') {
            $data['published_at'] = now();
        }

        $post = Post::create($data);

        return response()->json(['data' => $post], 201);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorizePostOwner($request, $post);

        $data = $request->validate([
            'title' => 'sometimes|string|max:250',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'nullable|string',
            'featured_image_url' => ['nullable', 'max:500', 'regex:/^(https?:\/\/|\/)/'],
            'status' => 'sometimes|in:draft,published,archived',
            'is_featured' => 'boolean',
        ]);

        if (($data['status'] ?? null) === 'published' && $post->status !== 'published') {
            $data['published_at'] = now();
        }

        $post->update($data);

        return response()->json(['data' => $post]);
    }

    public function destroy(Request $request, Post $post)
    {
        $this->authorizePostOwner($request, $post);

        $post->delete();

        return response()->json(['message' => 'Post dihapus.']);
    }

    private function authorizePostOwner(Request $request, Post $post): void
    {
        $admin = $request->user();

        if ($admin->role !== 'super_admin' && $post->author_id !== $admin->id) {
            abort(Response::HTTP_FORBIDDEN, 'Anda tidak berwenang mengubah post milik admin lain.');
        }
    }
}
