<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Firebase\JWT\JWT;
use App\Helpers\Database;
use PDO;

class AuthController extends BaseController
{
    private PDO $db;
    
    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }
    
    /**
     * POST /api/auth/login
     * Authenticate user and return JWT token
     */
    public function login(Request $request, Response $response): Response
    {
        try {
            $data = $this->getParsedBody($request);
            
            // Validate required fields
            if (empty($data['email']) || empty($data['password'])) {
                return $this->errorResponse($response, 'Email and password are required', 400);
            }
            
            // Find user by email
            $stmt = $this->db->prepare("SELECT id, email, password, name, role, active FROM users WHERE email = ?");
            $stmt->execute([$data['email']]);
            $user = $stmt->fetch();
            
            if (!$user) {
                return $this->errorResponse($response, 'Invalid credentials', 401);
            }
            
            // Check if user is active
            if (!$user['active']) {
                return $this->errorResponse($response, 'Account is disabled', 403);
            }
            
            // Verify password
            if (!password_verify($data['password'], $user['password'])) {
                return $this->errorResponse($response, 'Invalid credentials', 401);
            }
            
            // Generate JWT token
            $config = require __DIR__ . '/../Config/config.php';
            $issuedAt = time();
            
            $payload = [
                'iat' => $issuedAt,
                'exp' => $issuedAt + $config['jwt']['expires'],
                'iss' => $config['jwt']['issuer'],
                'aud' => $config['jwt']['audience'],
                'sub' => $user['id'],
                'email' => $user['email'],
                'name' => $user['name'],
                'role' => $user['role'] ?? 'admin',
            ];
            
            $token = JWT::encode($payload, $config['jwt']['secret'], 'HS256');
            
            return $this->successResponse($response, [
                'token' => $token,
                'expires_in' => $config['jwt']['expires'],
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'name' => $user['name'],
                    'role' => $user['role'] ?? 'admin',
                ]
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error during login: ' . $e->getMessage(), 500);
        }
    }
    
    /**
     * GET /api/auth/me
     * Get current authenticated user
     */
    public function me(Request $request, Response $response): Response
    {
        try {
            $user = $request->getAttribute('user');
            
            if (!$user) {
                return $this->errorResponse($response, 'Unauthorized', 401);
            }
            
            return $this->successResponse($response, $user);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching user: ' . $e->getMessage(), 500);
        }
    }
}
