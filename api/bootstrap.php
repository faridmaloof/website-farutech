<?php
declare(strict_types=1);

function apiRespond(int $status, array $payload): never { http_response_code($status); echo json_encode($payload, JSON_UNESCAPED_UNICODE); exit; }
function apiInput(): array { $input = json_decode(file_get_contents('php://input') ?: '', true); return is_array($input) ? $input : []; }
function apiText(array $input, string $key, int $limit = 255): string { return mb_substr(trim(strip_tags((string)($input[$key] ?? ''))), 0, $limit); }
function apiPdo(): PDO {
  $host = getenv('FARUTECH_DB_HOST'); $name = getenv('FARUTECH_DB_NAME');
  if (!$host || !$name) throw new RuntimeException('Database configuration missing.');
  return new PDO("mysql:host=$host;dbname=$name;charset=utf8mb4", getenv('FARUTECH_DB_USER') ?: '', getenv('FARUTECH_DB_PASSWORD') ?: '', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_EMULATE_PREPARES => false]);
}
function apiRequirePost(): void { if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Allow: POST'); apiRespond(405, ['ok' => false, 'message' => 'Método no permitido.']); } }
function apiRequireAdmin(): void { $token = substr((string)($_SERVER['HTTP_AUTHORIZATION'] ?? ''), 7); if (!hash_equals((string)getenv('FARUTECH_ADMIN_TOKEN'), $token) || $token === '') apiRespond(401, ['ok' => false, 'message' => 'No autorizado.']); }
