<?php

declare(strict_types=1);

namespace App\Http;

final class Request
{
    /** Lee y decodifica el body JSON de la petición. Nunca lanza excepción. */
    public static function jsonBody(): array
    {
        $raw = file_get_contents('php://input') ?: '';
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : [];
    }

    public static function method(): string
    {
        return $_SERVER['REQUEST_METHOD'] ?? 'GET';
    }

    public static function clientIp(): string
    {
        return $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    }

    public static function query(string $key, ?string $default = null): ?string
    {
        return isset($_GET[$key]) ? trim((string) $_GET[$key]) : $default;
    }
}
