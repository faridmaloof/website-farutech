<?php
/**
 * Response Utility
 * 
 * Implements Single Responsibility Principle (SRP)
 * Handles JSON response formatting
 */

namespace App\Src;

class Response
{
    /**
     * Send JSON response
     */
    public static function json(array $data, int $statusCode = 200): void
    {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        
        echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Send success response
     */
    public static function success(array $data, int $statusCode = 200): void
    {
        self::json([
            'success' => true,
            ...$data
        ], $statusCode);
    }

    /**
     * Send error response
     */
    public static function error(string $message, array $errors = [], int $statusCode = 400): void
    {
        self::json([
            'success' => false,
            'error' => $message,
            'errors' => $errors
        ], $statusCode);
    }

    /**
     * Send method not allowed response
     */
    public static function methodNotAllowed(array $allowedMethods = []): void
    {
        header('Allow: ' . implode(', ', $allowedMethods));
        self::error('Method not allowed', ['method' => 'This endpoint does not support this HTTP method'], 405);
    }
}
