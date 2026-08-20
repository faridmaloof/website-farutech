<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Models\ContactInfo;

class ContactInfoController extends BaseController
{
    private ContactInfo $contactModel;
    
    public function __construct()
    {
        $this->contactModel = new ContactInfo();
    }
    
    /**
     * GET /api/contact-info
     * Get primary contact information
     */
    public function index(Request $request, Response $response): Response
    {
        try {
            $contact = $this->contactModel->getPrimary();
            
            if (!$contact) {
                return $this->errorResponse($response, 'Contact information not found', 404);
            }
            
            // Format the response
            $formatted = [
                'phone' => $contact['phone'] ?? null,
                'email' => $contact['email'] ?? null,
                'address' => $contact['address'] ?? null,
                'city' => $contact['city'] ?? null,
                'country' => $contact['country'] ?? null,
                'social_media' => $this->contactModel->getSocialMedia(),
            ];
            
            return $this->successResponse($response, $formatted);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching contact info: ' . $e->getMessage(), 500);
        }
    }
}
