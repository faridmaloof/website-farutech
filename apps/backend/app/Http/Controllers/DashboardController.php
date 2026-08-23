<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * GET /api/admin/dashboard/stats
     * Shape esperado por AdminDashboardPage.tsx (DashboardStats).
     */
    public function stats(Request $request)
    {
        $totalLeads = Lead::count();
        $wonLeads = Lead::where('status', 'WON')->count();

        return response()->json([
            'totalLeads' => $totalLeads,
            'newLeads' => Lead::where('status', 'NEW')->count(),
            'activeProjects' => 0,
            'conversionRate' => $totalLeads > 0 ? round(($wonLeads / $totalLeads) * 100, 1) : 0,
            'recentLeads' => Lead::query()
                ->latest('created_at')
                ->take(5)
                ->get(['id', 'name', 'email', 'status', 'created_at']),
        ]);
    }
}
