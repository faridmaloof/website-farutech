<?php
/**
 * Admin Panel - Configuración central
 * Sesión, conexión a BD (reutiliza api/config/Database.php) y helpers de auth.
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Cargar conexión compartida desde la API
$apiDbPath = dirname(__DIR__) . '/api/config/Database.php';
require_once $apiDbPath;

use App\Config\Database;

function db(): PDO {
    return Database::getInstance()->getConnection();
}

/** ¿El usuario está autenticado? */
function is_logged_in(): bool {
    return isset($_SESSION['admin_user_id']);
}

/** Redirige a login si no hay sesión. */
function require_auth(): void {
    if (!is_logged_in()) {
        header('Location: /admin/');
        exit;
    }
}

/** CSRF token por sesión. */
function csrf_token(): string {
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function csrf_verify(?string $token): bool {
    return $token && hash_equals($_SESSION['csrf'] ?? '', $token);
}

/** Escapa salida HTML. */
function e($value): string {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

/** Genera un slug legible desde un título. */
function slugify(string $text): string {
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    return trim($text, '-');
}
