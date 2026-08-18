<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');

function respond(int $status, array $payload): never {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Método no permitido.']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = array_filter(array_map('trim', explode(',', getenv('FARUTECH_ALLOWED_ORIGINS') ?: 'https://www.farutech.com')));
if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    respond(403, ['ok' => false, 'message' => 'Origen no permitido.']);
}
if ($origin !== '') header("Access-Control-Allow-Origin: $origin");

$raw = file_get_contents('php://input');
$input = json_decode($raw ?: '', true);
if (!is_array($input)) respond(400, ['ok' => false, 'message' => 'Solicitud inválida.']);

function text(array $input, string $key, int $limit = 255): string {
    $value = trim((string)($input[$key] ?? ''));
    return mb_substr(strip_tags($value), 0, $limit);
}

$name = text($input, 'name', 120);
$email = text($input, 'email', 254);
$company = text($input, 'company', 160);
$projectType = text($input, 'projectType', 80);
$timeline = text($input, 'timeline', 80);
$budget = text($input, 'budget', 80);
$message = text($input, 'message', 4000);

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    respond(422, ['ok' => false, 'message' => 'Completa nombre, email y el contexto del proyecto.']);
}

try {
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', getenv('FARUTECH_DB_HOST'), getenv('FARUTECH_DB_NAME'));
    $pdo = new PDO($dsn, getenv('FARUTECH_DB_USER') ?: '', getenv('FARUTECH_DB_PASSWORD') ?: '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    $statement = $pdo->prepare('INSERT INTO contact_leads (name, email, company, project_type, timeline, budget, message, source_ip, created_at) VALUES (:name, :email, :company, :project_type, :timeline, :budget, :message, :source_ip, UTC_TIMESTAMP())');
    $statement->execute([
        ':name' => $name, ':email' => $email, ':company' => $company, ':project_type' => $projectType,
        ':timeline' => $timeline, ':budget' => $budget, ':message' => $message,
        ':source_ip' => substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45),
    ]);
    respond(201, ['ok' => true, 'message' => 'Recibimos tu consulta. Te responderemos pronto.']);
} catch (Throwable $error) {
    error_log('FaruTech contact endpoint: ' . $error->getMessage());
    respond(500, ['ok' => false, 'message' => 'No pudimos enviar la consulta. Inténtalo de nuevo o escríbenos por email.']);
}
