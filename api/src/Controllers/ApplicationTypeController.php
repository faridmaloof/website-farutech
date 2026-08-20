<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Models\ApplicationType;

class ApplicationTypeController extends BaseController
{
    private ApplicationType $typeModel;
    
    public function __construct()
    {
        $this->typeModel = new ApplicationType();
    }
    
    /**
     * GET /api/application-types
     * Get all application types, optionally filtered by service
     */
    public function index(Request $request, Response $response): Response
    {
        try {
            $serviceId = $this->getQueryParam($request, 'service_id');
            $search = $this->getQueryParam($request, 'search');
            
            if ($search) {
                $types = $this->typeModel->search($search);
            } elseif ($serviceId) {
                $types = $this->typeModel->getAllByService((int) $serviceId);
            } else {
                $types = $this->typeModel->getAllGroupedByService();
            }
            
            return $this->successResponse($response, $types);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching application types: ' . $e->getMessage(), 500);
        }
    }
    
    /**
     * GET /api/application-types/{id}
     * Get application type by ID
     */
    public function show(Request $request, Response $response, array $args): Response
    {
        try {
            $id = (int) $args['id'];
            $type = $this->typeModel->getById($id);
            
            if (!$type) {
                return $this->errorResponse($response, 'Application type not found', 404);
            }
            
            return $this->successResponse($response, $type);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching application type: ' . $e->getMessage(), 500);
        }
    }
}
