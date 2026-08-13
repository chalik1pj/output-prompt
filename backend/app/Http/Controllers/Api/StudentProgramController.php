<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StudentProgram;
use Illuminate\Http\Request;

class StudentProgramController extends Controller
{
    // GET /api/student-programs?type=beasiswa|pertukaran&per_page=6&page=1
    public function index(Request $request)
    {
        $request->validate([
            'type' => 'nullable|in:beasiswa,pertukaran',
            'per_page' => 'nullable|integer|min:1|max:50',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = StudentProgram::active();

        if ($request->filled('type')) {
            $query->where('program_type', $request->string('type'));
        }

        // paginate() (bukan get()) -- dibutuhkan untuk UI pagination di frontend
        // (lihat pages/students/beasiswa.tsx & pertukaran.tsx).
        return response()->json(
            $query->paginate($request->integer('per_page', 6))
        );
    }
}
