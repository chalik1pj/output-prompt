<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lecturer;
use Illuminate\Http\Request;

class LecturerController extends Controller
{
    // Kolom yang aman diekspos ke publik -- SENGAJA tidak menyertakan `email`.
    // Email dosen sebelumnya bocor ke siapa pun tanpa login lewat endpoint ini
    // (Lecturer::get() mengembalikan semua kolom apa adanya, termasuk email).
    private const PUBLIC_FIELDS = ['id', 'program_id', 'name', 'position', 'photo_url', 'bio', 'is_certified'];

    public function index(Request $request)
    {
        $query = Lecturer::with('program:id,name')->orderBy('name');

        if ($request->filled('program')) {
            $query->whereHas('program', fn ($q) => $q->where('slug', $request->string('program')));
        }

        return response()->json(['data' => $query->get(self::PUBLIC_FIELDS)]);
    }

    public function show(Lecturer $lecturer)
    {
        // makeHidden (bukan only()) supaya relasi `program` yang di-load tetap
        // ikut ter-serialize -- only() cuma memfilter attribute milik model
        // sendiri, akan diam-diam menghapus relasi dari response JSON.
        return response()->json([
            'data' => $lecturer->load('program:id,name')->makeHidden('email'),
        ]);
    }
}
