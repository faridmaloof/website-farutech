<?php

namespace App\Middleware;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as Handler;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\Psr7\Factory\ResponseFactory;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware
{
    public function __invoke(Request $request, Handler $handler): Response
    {
        $authHeader = $request->getHeaderLine('Authorization');
        
        if (empty($authHeader)) {
            return $this->createJsonResponse(['error' => 'Authorization header required'], 401);
        }
        
        if (!preg_match('/Bearer\s+(\S+)/', $authHeader, $matches)) {
            return $this->createJsonResponse(['error' => 'Invalid authorization format'], 401);
        }
        
        $token = $matches[1];
        $config = require __DIR__ . '/../Config/config.php';
        
        try {
            $decoded = JWT::decode($token, new Key($config['jwt']['secret'], 'HS256'));
            
            // Add user info to request attributes
            $request = $request->withAttribute('user', [
                'id' => $decoded->sub,
                'email' => $decoded->email ?? null,
                'role' => $decoded->role ?? 'admin',
            ]);
            
            return $handler->handle($request);
        } catch (\Exception $e) {
            return $this->createJsonResponse(['error' => 'Invalid or expired token'], 401);
        }
    }
    
    private function createJsonResponse(array $data, int $status): Response
    {
        $responseFactory = new ResponseFactory();
        $response = $responseFactory->createResponse($status);
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
