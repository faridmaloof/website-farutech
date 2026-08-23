<?php
namespace App\Http\Controllers;

use App\Models\Lead;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class LeadController extends Controller
{
    public function index()
    {
        $leads = Lead::with(['service', 'location', 'user'])
            ->when(request('status'), fn($q) => $q->where('status', request('status')))
            ->when(request('priority'), fn($q) => $q->where('priority', request('priority')))
            ->when(request('service_id'), fn($q) => $q->where('service_id', request('service_id')))
            ->latest('created_at')
            ->paginate(20);

        return response()->json([
            'data' => $leads->items(),
            'meta' => [
                'total' => $leads->total(),
                'per_page' => $leads->perPage(),
                'current_page' => $leads->currentPage(),
                'last_page' => $leads->lastPage(),
            ]
        ]);
    }

    public function store(StoreLeadRequest $request)
    {
        $validated = $request->validated();
        
        $lead = Lead::create($validated);

        // Cache invalidation for CRM dashboards
        Cache::forget('crm_dashboard_stats');

        // Dispatch notification job
        if ($lead->assigned_to) {
            \App\Jobs\SendLeadNotification::dispatch($lead->assigned_to, $lead->id);
        }

        return response()->json([
            'message' => 'Lead creado exitosamente',
            'data' => $lead->load(['service', 'location'])
        ], 201);
    }

    public function show(Lead $lead)
    {
        return response()->json($lead->load(['service', 'location', 'notes', 'user']));
    }

    public function update(UpdateLeadRequest $request, Lead $lead)
    {
        $validated = $request->validated();

        $lead->update($validated);

        // Dispatch update notification job
        if ($lead->assigned_to) {
            \App\Jobs\SendLeadUpdateNotification::dispatch($lead->assigned_to, $lead->id);
        }

        // Invalidate cache
        Cache::forget('crm_dashboard_stats');

        return response()->json([
            'message' => 'Lead actualizado exitosamente',
            'data' => $lead->fresh()
        ]);
    }

    public function destroy(Lead $lead)
    {
        $lead->notes()->delete();
        $lead->delete();

        Cache::forget('crm_dashboard_stats');

        return response()->json(['message' => 'Lead eliminado exitosamente'], 204);
    }

    public function stats()
    {
        $stats = Lead::selectRaw("
            status, 
            priority, 
            COUNT(*) as total,
            COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END as recent")
        )
        ->groupBy('status', 'priority')
        ->get()
        ->keyBy('status', 'priority');

        return response()->json($stats);
    }

    public function convertToClosedWon(Lead $lead)
    {
        $lead->status = 'closed_won';
        $lead->conversion_value = $lead->conversion_value ?? 0;
        $lead->save();

        // Emitir evento para analytics
        \Event::dispatch(new \App\Events\LeadStatusChanged($lead, 'closed_won'));

        return response()->json([
            'message' => 'Lead convertido a CERRADO',
            'data' => $lead->fresh()
        ]);
    }
}