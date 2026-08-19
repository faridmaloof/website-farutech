<?php
/**
 * API Entry Point - Router
 * 
 * Handles all API requests for leads and newsletter subscriptions
 * Follows SOLID principles with clear separation of concerns
 */

// Enable error reporting for development (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Never display errors to users
ini_set('log_errors', 1);

// Set headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CORS Configuration
$allowedOrigins = [
    'https://farutech.com',
    'https://www.farutech.com',
    'http://localhost:4321',
    'http://localhost:3000'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: {$origin}");
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Autoloader
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $baseDir = __DIR__ . '/';
    
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    
    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';
    
    if (file_exists($file)) {
        require $file;
    }
});

// Import classes
use App\Src\Response;
use App\Src\LeadRepository;
use App\Src\LeadService;

// Get request method and URI
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = '/api';

// Remove base path from URI
$endpoint = str_replace($basePath, '', $requestUri);
$endpoint = rtrim($endpoint, '/');

// Route handling
try {
    switch ($endpoint) {
        case '/contact':
            handleContact($method);
            break;
            
        case '/newsletter':
            handleNewsletter($method);
            break;
            
        case '/health':
            handleHealthCheck();
            break;
            
        default:
            Response::error('Endpoint not found', ['endpoint' => $endpoint], 404);
    }
} catch (\Exception $e) {
    error_log("API Error: " . $e->getMessage());
    Response::error('Internal server error', [], 500);
}

/**
 * Handle contact form submission
 */
function handleContact(string $method): void
{
    if ($method !== 'POST') {
        Response::methodNotAllowed(['POST']);
    }

    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        Response::error('Invalid JSON', [], 400);
    }

    // Initialize service
    $repository = new LeadRepository();
    $service = new LeadService($repository);

    // Process lead
    $result = $service->processLead($input ?? []);

    if ($result['success']) {
        Response::success([
            'lead_id' => $result['lead_id'],
            'lead_score' => $result['lead_score'],
            'lead_quality' => $result['lead_quality'],
            'message' => 'Thank you! We will contact you soon.'
        ], 201);
    } else {
        Response::error('Validation failed', $result['errors'], 400);
    }
}

/**
 * Handle newsletter subscription
 */
function handleNewsletter(string $method): void
{
    if ($method !== 'POST') {
        Response::methodNotAllowed(['POST']);
    }

    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (json_last_error() !== JSON_ERROR_NONE || empty($input['email'])) {
        Response::error('Invalid request', ['email' => 'Email is required'], 400);
    }

    // Initialize service
    $repository = new LeadRepository();
    $service = new LeadService($repository);

    // Process subscription
    $source = $input['source'] ?? 'website';
    $result = $service->processSubscription($input['email'], $source);

    if ($result['success']) {
        Response::success([
            'subscriber_id' => $result['subscriber_id'],
            'message' => 'Successfully subscribed to our newsletter!'
        ], 201);
    } else {
        Response::error('Subscription failed', $result['errors'], 400);
    }
}

/**
 * Handle health check endpoint
 */
function handleHealthCheck(): void
{
    Response::success([
        'status' => 'healthy',
        'timestamp' => date('c'),
        'version' => '1.0.0'
    ]);
}
