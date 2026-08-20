<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Models\Lead;

class LeadController extends BaseController
{
    private Lead $leadModel;
    
    public function __construct()
    {
        $this->leadModel = new Lead();
    }
    
    /**
     * POST /api/leads
     * Create a new lead (public form submission)
     */
    public function store(Request $request, Response $response): Response
    {
        try {
            $data = $this->getParsedBody($request);
            
            // Validate required fields
            $required = ['name', 'email', 'message'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    return $this->errorResponse($response, "Field '{$field}' is required", 400);
                }
            }
            
            // Validate email format
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                return $this->errorResponse($response, 'Invalid email format', 400);
            }
            
            // Set default values
            $leadData = [
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'company' => $data['company'] ?? null,
                'service_id' => $data['service_id'] ?? null,
                'message' => $data['message'],
                'country_id' => $data['country_id'] ?? null,
                'status' => 'new',
                'created_at' => date('Y-m-d H:i:s'),
            ];
            
            $leadId = $this->leadModel->create($leadData);
            
            return $this->successResponse($response, [
                'id' => $leadId,
                'message' => 'Lead created successfully',
            ], 201);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error creating lead: ' . $e->getMessage(), 500);
        }
    }
}
