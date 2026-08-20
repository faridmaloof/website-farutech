<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class HealthController extends BaseController
{
    /**
     * GET /api/health
     * Health check endpoint
     */
    public function check(Request $request, Response $response): Response
    {
        return $this->successResponse($response, [
            'status' => 'healthy',
            'timestamp' => date('c'),
            'version' => '1.0.0',
        ]);
    }
}
