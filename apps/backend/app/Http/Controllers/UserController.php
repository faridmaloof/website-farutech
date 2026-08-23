<?php

namespace App\Http\Controllers;

use App\Models\AdminSetting;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * Gestión de usuarios desde /admin. La creación está condicionada por
 * admin_settings.registration_enabled (doble control junto al auto-registro).
 */
class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => User::query()
                ->orderBy('id')
                ->get(['id', 'name', 'email', 'role', 'is_active', 'email_verified_at', 'last_login_at']),
        ]);
    }

    public function store(Request $request)
    {
        if (! AdminSetting::current()->registration_enabled) {
            return response()->json([
                'message' => 'Creación de usuarios deshabilitada en Configuración.',
            ], 403);
        }

        $data = $this->validate($request, [
            'name' => 'required|string|max:120',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,editor,viewer',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => strtolower($data['email']),
            'password' => password_hash($data['password'], PASSWORD_BCRYPT),
            'role' => $data['role'],
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        return response()->json([
            'message' => 'Usuario creado',
            'data' => $user->only(['id', 'name', 'email', 'role', 'is_active']),
        ], 201);
    }

    public function toggleStatus(Request $request, User $user)
    {
        if ($request->user()->id === $user->id) {
            return response()->json(['message' => 'No puedes desactivar tu propia cuenta'], 422);
        }

        $user->forceFill(['is_active' => ! $user->is_active])->save();

        return response()->json(['data' => $user->only(['id', 'is_active'])]);
    }
}
