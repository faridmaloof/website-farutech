<?php

namespace App\Middleware;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as Handler;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\Psr7\Factory\ResponseFactory;

class CorsMiddleware
{
    public function __invoke(Request $request, Handler $handler): Response
    {
        $config = require __DIR__ . '/../Config/config.php';
        $allowedOrigins = $config['cors']['allowed_origins'];
        $origin = $request->getHeaderLine('Origin');
        
        $responseFactory = new ResponseFactory();
        
        // Handle preflight OPTIONS request
        if ($request->getMethod() === 'OPTIONS') {
            $response = $responseFactory->createResponse(200);
            $response = $response->withHeader('Access-Control-Allow-Origin', $this->getAllowedOrigin($origin, $allowedOrigins));
            $response = $response->withHeader('Access-Control-Allow-Methods', implode(', ', $config['cors']['allowed_methods']));
            $response = $response->withHeader('Access-Control-Allow-Headers', implode(', ', $config['cors']['allowed_headers']));
            $response = $response->withHeader('Access-Control-Max-Age', '3600');
            return $response;
        }
        
        // Process the request
        $response = $handler->handle($request);
        
        // Add CORS headers to response
        $response = $response->withHeader('Access-Control-Allow-Origin', $this->getAllowedOrigin($origin, $allowedOrigins));
        $response = $response->withHeader('Access-Control-Allow-Credentials', 'true');
        $response = $response->withHeader('Access-Control-Expose-Headers', 'Content-Type, Authorization');
        
        return $response;
    }
    
    private function getAllowedOrigin(string $origin, array $allowedOrigins): string
    {
        if (in_array($origin, $allowedOrigins)) {
            return $origin;
        }
        // Default to first allowed origin if no match
        return $allowedOrigins[0] ?? '*';
    }
}
