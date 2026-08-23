<?php

namespace App\Http\Controllers;

use App\Models\AdminSetting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    /** GET /api/admin/settings — configuración completa (solo admin). */
    public function show()
    {
        return response()->json(['data' => $this->settings()]);
    }

    /** PUT /api/admin/settings — actualiza y limpia la caché de política. */
    public function update(Request $request)
    {
        $data = $this->validate($request, [
            'registration_enabled' => 'required|boolean',
            'allowed_domains' => 'nullable|string|max:500',
            'require_email_confirmation' => 'required|boolean',
            'session_ttl_hours' => 'required|integer|min:1|max:168',
            'max_login_attempts' => 'required|integer|min:3|max:20',
        ]);

        $settings = AdminSetting::current();
        $settings->fill($data)->save();
        AdminSetting::flushCache();

        return response()->json([
            'message' => 'Configuración actualizada',
            'data' => $this->settings(),
        ]);
    }

    /** GET /api/settings/public — flags seguros para el frontend (sin auth). */
    public function publicPolicy()
    {
        $s = AdminSetting::current();

        return response()->json([
            'registration_enabled' => (bool) $s->registration_enabled,
            'require_email_confirmation' => (bool) $s->require_email_confirmation,
        ]);
    }

    private function settings(): array
    {
        $s = AdminSetting::current();

        return [
            'registration_enabled' => (bool) $s->registration_enabled,
            'allowed_domains' => $s->allowed_domains,
            'require_email_confirmation' => (bool) $s->require_email_confirmation,
            'session_ttl_hours' => (int) $s->session_ttl_hours,
            'max_login_attempts' => (int) $s->max_login_attempts,
        ];
    }
}
