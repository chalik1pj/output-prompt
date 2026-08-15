<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Admin::orderBy('name')->get()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:150',
            'email' => 'required|email|max:150|unique:admins,email',
            'password' => ['required', 'confirmed', Password::min(10)->uncompromised()],
            'role' => 'required|in:super_admin,editor',
        ]);

        $admin = Admin::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password_hash' => Hash::make($data['password']),
            'role' => $data['role'],
        ]);

        return response()->json(['data' => $admin], 201);
    }

    public function update(Request $request, Admin $admin)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:150',
            'role' => 'sometimes|in:super_admin,editor',
            'password' => ['sometimes', 'confirmed', Password::min(10)->uncompromised()],
        ]);

        if (
            $admin->id === $request->user()->id
            && ($data['role'] ?? null) === 'editor'
            && Admin::where('role', 'super_admin')->count() <= 1
        ) {
            abort(Response::HTTP_UNPROCESSABLE_ENTITY, 'Tidak bisa menurunkan role super_admin terakhir.');
        }

        if (isset($data['password'])) {
            $data['password_hash'] = Hash::make($data['password']);
            unset($data['password']);
        }

        $admin->update($data);

        return response()->json(['data' => $admin]);
    }

    public function destroy(Request $request, Admin $admin)
    {
        if ($admin->id === $request->user()->id) {
            abort(Response::HTTP_UNPROCESSABLE_ENTITY, 'Tidak bisa menghapus akun sendiri.');
        }

        if ($admin->role === 'super_admin' && Admin::where('role', 'super_admin')->count() <= 1) {
            abort(Response::HTTP_UNPROCESSABLE_ENTITY, 'Tidak bisa menghapus super_admin terakhir.');
        }

        $admin->tokens()->delete();
        $admin->delete();

        return response()->json(['message' => 'Akun admin dihapus.']);
    }
}
