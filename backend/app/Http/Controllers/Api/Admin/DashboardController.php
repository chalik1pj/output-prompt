<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Lecturer;
use App\Models\Post;
use App\Models\Program;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'data' => [
                'posts' => [
                    'total' => Post::count(),
                    'published' => Post::where('status', 'published')->count(),
                    'draft' => Post::where('status', 'draft')->count(),
                    'by_content_type' => Post::selectRaw('content_type, count(*) as total')
                        ->groupBy('content_type')
                        ->pluck('total', 'content_type'),
                ],
                'programs' => [
                    'total' => Program::count(),
                    'published' => Program::where('is_published', true)->count(),
                ],
                'lecturers' => Lecturer::count(),
                'admins' => Admin::count(),
            ],
        ]);
    }

    public function recentPosts(Request $request)
    {
        return response()->json([
            'data' => Post::with('author:id,name')
                ->latest('updated_at')
                ->limit($request->integer('limit', 10))
                ->get(['id', 'content_type', 'title', 'status', 'author_id', 'updated_at']),
        ]);
    }
}
