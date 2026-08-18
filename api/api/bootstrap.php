<?php
/**
 * FaruTech API — bootstrap.php
 * Autoloader manual (PSR-4-like, sin dependencia de Composer para
 * simplificar el despliegue en hosting compartido) + carga de entorno
 * + fábrica de conexión PDO.
 */

declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0'); // NUNCA mostrar errores en producción, se registran en log
ini_set('log_errors', '1');

// ---------------------------------------------------------------------------
// Autoloader: mapea el namespace App\ a api/src/
// ---------------------------------------------------------------------------
spl_autoload_register(function (string $class) {
    $prefix = 'App\\';
    if (strncmp($prefix, $class, strlen($prefix)) !== 0) {
        return;
    }
    $relative = substr($class, strlen($prefix));
    $file = __DIR__ . '/src/' . str_replace('\\', '/', $relative) . '.php';
    if (is_file($file)) {
        require $file;
    }
});

// ---------------------------------------------------------------------------
// Carga de variables de entorno desde .env (parser minimalista, sin libs externas)
// ---------------------------------------------------------------------------
function loadEnv(string $path): void
{
    if (!is_file($path)) {
        return;
    }
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }
        [$key, $value] = array_pad(explode('=', $line, 2), 2, '');
        $key = trim($key);
        $value = trim($value, " \t\n\r\0\x0B\"'");
        if ($key !== '') {
            putenv("{$key}={$value}");
            $_ENV[$key] = $value;
        }
    }
}

loadEnv(__DIR__ . '/.env');

function env(string $key, ?string $default = null): ?string
{
    $value = getenv($key);
    return $value === false ? $default : $value;
}

// ---------------------------------------------------------------------------
// Fábrica de conexión PDO (singleton simple)
// ---------------------------------------------------------------------------
function getDb(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = env('DB_HOST', 'localhost');
    $name = env('DB_NAME');
    $user = env('DB_USER');
    $pass = env('DB_PASS');
    $port = env('DB_PORT', '3306');

    $dsn = "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4";

    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}

// ---------------------------------------------------------------------------
// CORS — se llama al inicio de cada endpoint público
// ---------------------------------------------------------------------------
function applyCors(): void
{
    $origin = env('CORS_ORIGIN', '*');
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}
