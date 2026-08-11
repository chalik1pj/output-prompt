<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lecturer;
use Illuminate\Http\Request;

class LecturerController extends Controller
{
    public function index(Request $request)
    {
        $query = Lecturer::with('program')->orderBy('name');

        if ($request->filled('program')) {
            $query->whereHas('program', fn ($q) => $q->where('slug', $request->string('program')));
        }

        return response()->json(['data' => $query->get()]);
    }

    public function show(Lecturer $lecturer)
    {
        return response()->json(['data' => $lecturer->load('program')]);
    }
}
