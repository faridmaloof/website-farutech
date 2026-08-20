<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Models\Service;

class ServiceController extends BaseController
{
    private Service $serviceModel;
    
    public function __construct()
    {
        $this->serviceModel = new Service();
    }
    
    /**
     * GET /api/services
     * Get all active services
     */
    public function index(Request $request, Response $response): Response
    {
        try {
            $services = $this->serviceModel->getAllWithTypesCount();
            return $this->successResponse($response, $services);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching services: ' . $e->getMessage(), 500);
        }
    }
    
    /**
     * GET /api/services/{slug}
     * Get service by slug with application types
     */
    public function show(Request $request, Response $response, array $args): Response
    {
        try {
            $slug = $args['slug'];
            $service = $this->serviceModel->getBySlugWithTypes($slug);
            
            if (!$service) {
                return $this->errorResponse($response, 'Service not found', 404);
            }
            
            return $this->successResponse($response, $service);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching service: ' . $e->getMessage(), 500);
        }
    }
    
    /**
     * GET /api/services/featured
     * Get featured services for homepage
     */
    public function featured(Request $request, Response $response): Response
    {
        try {
            $limit = (int) $this->getQueryParam($request, 'limit', 6);
            $services = $this->serviceModel->getFeatured($limit);
            return $this->successResponse($response, $services);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching featured services: ' . $e->getMessage(), 500);
        }
    }
}
