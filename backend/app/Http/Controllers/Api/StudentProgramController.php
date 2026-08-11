<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StudentProgram;
use Illuminate\Http\Request;

class StudentProgramController extends Controller
{
    public function index(Request $request)
    {
        $query = StudentProgram::active();

        if ($request->filled('type')) {
            $query->where('program_type', $request->string('type'));
        }

        return response()->json(['data' => $query->get()]);
    }
}
