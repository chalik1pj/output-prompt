<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentProgram;
use Illuminate\Http\Request;

class StudentProgramController extends Controller
{
    public function index(Request $request)
    {
        $query = StudentProgram::orderBy('program_type')->orderBy('display_order');

        if ($request->filled('type')) {
            $query->where('program_type', $request->string('type'));
        }

        return response()->json($query->paginate($request->integer('per_page', 20)));
    }

    public function show(StudentProgram $studentProgram)
    {
        return response()->json(['data' => $studentProgram]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'program_type' => 'required|in:beasiswa,pertukaran',
            'name' => 'required|string|max:200',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'how_to_apply' => 'nullable|string',
            'country' => 'nullable|string|max:100',
            'scope' => 'nullable|string|max:50',
            'icon_name' => 'nullable|string|max:50',
            'logo_url' => ['nullable', 'max:500', 'regex:/^(https?:\/\/|\/)/'],
            'display_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $program = StudentProgram::create($data);

        return response()->json(['data' => $program], 201);
    }

    public function update(Request $request, StudentProgram $studentProgram)
    {
        $data = $request->validate([
            'program_type' => 'sometimes|in:beasiswa,pertukaran',
            'name' => 'sometimes|string|max:200',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'how_to_apply' => 'nullable|string',
            'country' => 'nullable|string|max:100',
            'scope' => 'nullable|string|max:50',
            'logo_url' => ['nullable', 'max:500', 'regex:/^(https?:\/\/|\/)/'],
            'display_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $studentProgram->update($data);

        return response()->json(['data' => $studentProgram]);
    }

    public function destroy(StudentProgram $studentProgram)
    {
        $studentProgram->delete();

        return response()->json(['message' => 'Program mahasiswa dihapus.']);
    }
}
