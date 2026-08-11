<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            Program::orderBy('display_order')->paginate($request->integer('per_page', 20))
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:150',
            'slug' => ['required', 'string', 'max:150', 'alpha_dash', Rule::unique('programs')],
            'degree_level' => 'required|in:D3,S1,S2',
            'track' => 'required|in:sarjana,vokasi,pascasarjana',
            'short_description' => 'required|string|max:500',
            'full_description' => 'nullable|string',
            'accreditation' => 'nullable|string|max:50',
            'badge_color' => 'nullable|string|max:20',
            'card_image_url' => ['nullable', 'max:500', 'regex:/^(https?:\/\/|\/)/'],
            'icon_name' => 'nullable|string|max:50',
            'competencies' => 'nullable|array',
            'careers' => 'nullable|array',
            'curriculum' => 'nullable|array',
            'curriculum.*.label' => 'required_with:curriculum|string|max:100',
            'curriculum.*.description' => 'required_with:curriculum|string',
            'closing_note' => 'nullable|array',
            'closing_note.*.title' => 'required_with:closing_note|string|max:150',
            'display_order' => 'nullable|integer',
            'is_published' => 'boolean',
        ]);

        $program = Program::create($data);

        return response()->json(['data' => $program], 201);
    }

    public function update(Request $request, Program $program)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:150',
            'slug' => ['sometimes', 'string', 'max:150', 'alpha_dash', Rule::unique('programs')->ignore($program->id)],
            'degree_level' => 'sometimes|in:D3,S1,S2',
            'track' => 'sometimes|in:sarjana,vokasi,pascasarjana',
            'short_description' => 'sometimes|string|max:500',
            'full_description' => 'nullable|string',
            'accreditation' => 'nullable|string|max:50',
            'card_image_url' => ['nullable', 'max:500', 'regex:/^(https?:\/\/|\/)/'],
            'competencies' => 'nullable|array',
            'careers' => 'nullable|array',
            'curriculum' => 'nullable|array',
            'closing_note' => 'nullable|array',
            'display_order' => 'nullable|integer',
            'is_published' => 'boolean',
        ]);

        $program->update($data);

        return response()->json(['data' => $program]);
    }

    public function destroy(Program $program)
    {
        $program->delete();

        return response()->json(['message' => 'Program studi dihapus.']);
    }
}
