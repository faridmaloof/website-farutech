<?php

declare(strict_types=1);

namespace App\Http;

final class Response
{
    public static function json(array $payload, int $status = 200): never
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($payload, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public static function success(string $message, array $data = []): never
    {
        self::json(['success' => true, 'message' => $message, 'data' => $data], 200);
    }

    public static function error(string $message, array $errors = [], int $status = 422): never
    {
        self::json(['success' => false, 'message' => $message, 'errors' => $errors], $status);
    }
}
