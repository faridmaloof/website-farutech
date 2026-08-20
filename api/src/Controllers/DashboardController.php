<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Models\Lead;

class DashboardController extends BaseController
{
    private Lead $leadModel;
    
    public function __construct()
    {
        $this->leadModel = new Lead();
    }
    
    /**
     * GET /api/admin/dashboard/stats
     * Get dashboard statistics (requires auth)
     */
    public function stats(Request $request, Response $response): Response
    {
        try {
            // Get lead statistics
            $leadStats = $this->leadModel->getStatistics();
            
            // Get recent leads
            $recentLeads = $this->leadModel->getRecent(5);
            
            return $this->successResponse($response, [
                'leads' => $leadStats,
                'recent_leads' => $recentLeads,
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching dashboard stats: ' . $e->getMessage(), 500);
        }
    }
}
