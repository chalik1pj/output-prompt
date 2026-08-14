<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lecturer;
use Illuminate\Http\Request;

class LecturerController extends Controller
{
    public function index(Request $request)
    {
        $query = Lecturer::with('program:id,name')->orderBy('name');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->string('search').'%');
        }

        return response()->json($query->paginate($request->integer('per_page', 20)));
    }

    public function show(Lecturer $lecturer)
    {
        return response()->json(['data' => $lecturer->load('program:id,name')]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'program_id' => 'nullable|exists:programs,id',
            'name' => 'required|string|max:150',
            'position' => 'nullable|string|max:150',
            'photo_url' => ['nullable', 'max:500', 'regex:/^(https?:\/\/|\/)/'],
            'bio' => 'nullable|string',
            'email' => 'nullable|email|max:150',
            'is_certified' => 'boolean',
        ]);

        $lecturer = Lecturer::create($data);

        return response()->json(['data' => $lecturer], 201);
    }

    public function update(Request $request, Lecturer $lecturer)
    {
        $data = $request->validate([
            'program_id' => 'nullable|exists:programs,id',
            'name' => 'sometimes|string|max:150',
            'position' => 'nullable|string|max:150',
            'photo_url' => ['nullable', 'max:500', 'regex:/^(https?:\/\/|\/)/'],
            'bio' => 'nullable|string',
            'email' => 'nullable|email|max:150',
            'is_certified' => 'boolean',
        ]);

        $lecturer->update($data);

        return response()->json(['data' => $lecturer]);
    }

    public function destroy(Lecturer $lecturer)
    {
        $lecturer->delete();

        return response()->json(['message' => 'Data dosen dihapus.']);
    }
}
