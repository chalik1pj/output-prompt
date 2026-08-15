<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{
    private const CONTENT_TYPES = [
        'berita', 'pengumuman', 'kegiatan_akademik', 'kegiatan_mahasiswa',
        'prestasi_kampus', 'prestasi_dosen', 'prestasi_mahasiswa',
    ];

    public function index(Request $request)
    {
        $query = Post::query()->with('author:id,name')->latest('updated_at');

        if ($request->filled('type')) {
            $query->where('content_type', $request->string('type'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('search')) {
            $query->where('title', 'like', '%'.$request->string('search').'%');
        }

        return response()->json(
            $query->paginate($request->integer('per_page', 15))
        );
    }

    public function show(Post $post)
    {
        return response()->json(['data' => $post->load('author:id,name')]);
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules($request, isUpdate: false));

        if (empty($data['slug'])) {
            $data['slug'] = $this->generateUniqueSlug($data['title'], $data['content_type']);
        }

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

        $data = $request->validate($this->rules($request, isUpdate: true, post: $post));

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

    private function rules(Request $request, bool $isUpdate, ?Post $post = null): array
    {
        $req = $isUpdate ? 'sometimes' : 'required';
        $contentType = $request->input('content_type', $post?->content_type);

        return [
            'content_type' => "{$req}|in:".implode(',', self::CONTENT_TYPES),
            'category' => 'nullable|string|max:80',
            'category_color' => 'nullable|string|max:20',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:40',
            'title' => "{$req}|string|max:250",
            'slug' => [
                'nullable', 'string', 'max:250', 'alpha_dash',
                Rule::unique('posts')
                    ->where(fn ($q) => $q->where('content_type', $contentType))
                    ->ignore($post?->id),
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
            'deadline' => 'nullable|date',
            'credited_name' => 'nullable|string|max:150',
            'credited_program_text' => 'nullable|string|max:150',
            'credited_initials' => 'nullable|string|max:5',
            'is_featured' => 'boolean',
            'status' => "{$req}|in:draft,published,archived",
        ];
    }

    private function generateUniqueSlug(string $title, string $contentType): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $i = 1;
        while (Post::where('content_type', $contentType)->where('slug', $slug)->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }

    private function authorizePostOwner(Request $request, Post $post): void
    {
        $admin = $request->user();

        if ($admin->role !== 'super_admin' && $post->author_id !== $admin->id) {
            abort(Response::HTTP_FORBIDDEN, 'Anda tidak berwenang mengubah post milik admin lain.');
        }
    }
}
