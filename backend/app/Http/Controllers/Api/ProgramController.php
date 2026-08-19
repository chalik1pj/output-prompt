<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $query = Program::published()->orderBy('display_order');

        if ($request->filled('track')) {
            $query->track($request->string('track'));
        }

        return response()->json([
            'data' => $query->get(),
        ]);
    }

    public function show(string $slug)
    {
        $program = Program::published()
            // Batasi kolom dosen yang ikut ter-eager-load -- sebelumnya
            // memuat SEMUA kolom termasuk `email`, bocor ke publik lewat
            // halaman detail program studi.
            ->with(['lecturers' => fn ($q) => $q->orderBy('name')->select('id', 'program_id', 'name', 'position', 'photo_url', 'bio', 'is_certified')])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json(['data' => $program]);
    }
}
