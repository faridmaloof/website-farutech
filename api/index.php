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
    switch (true) {
        // Public content endpoints
        case $endpoint === '/services':
            handleServices($method);
            break;
        case preg_match('/^\/services\/([a-z0-9-]+)$/', $endpoint, $matches):
            handleServiceBySlug($method, $matches[1]);
            break;
        case $endpoint === '/application-types':
            handleApplicationTypes($method);
            break;
        case $endpoint === '/contact-info':
            handleContactInfo($method);
            break;
        case $endpoint === '/locations':
            handleLocations($method);
            break;
        case $endpoint === '/blog/posts':
            handleBlogPosts($method);
            break;
        case preg_match('/^\/blog\/posts\/([a-z0-9-]+)$/', $endpoint, $matches):
            handleBlogPostBySlug($method, $matches[1]);
            break;
        case $endpoint === '/blog/categories':
            handleBlogCategories($method);
            break;
        
        // Existing endpoints
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
 * Handle GET /services - List all active services
 */
function handleServices(string $method): void
{
    if ($method !== 'GET') {
        Response::methodNotAllowed(['GET']);
    }
    
    $pdo = App\Config\Database::getInstance()->getConnection();
    $stmt = $pdo->query("SELECT id, slug, name, description FROM services WHERE is_active = 1 ORDER BY name");
    $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    Response::success($services);
}

/**
 * Handle GET /services/:slug - Get service by slug
 */
function handleServiceBySlug(string $method, string $slug): void
{
    if ($method !== 'GET') {
        Response::methodNotAllowed(['GET']);
    }
    
    $pdo = App\Config\Database::getInstance()->getConnection();
    $stmt = $pdo->prepare("
        SELECT s.id, s.slug, s.name, s.description, 
               COUNT(at.id) as application_types_count
        FROM services s
        LEFT JOIN application_types at ON s.id = at.service_id AND at.is_active = 1
        WHERE s.slug = ? AND s.is_active = 1
        GROUP BY s.id
    ");
    $stmt->execute([$slug]);
    $service = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$service) {
        Response::error('Service not found', [], 404);
    }
    
    // Get application types for this service
    $stmt = $pdo->prepare("SELECT id, name, description FROM application_types WHERE service_id = ? AND is_active = 1 ORDER BY name");
    $stmt->execute([$service['id']]);
    $service['application_types'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    Response::success($service);
}

/**
 * Handle GET /application-types - List all active application types
 */
function handleApplicationTypes(string $method): void
{
    if ($method !== 'GET') {
        Response::methodNotAllowed(['GET']);
    }
    
    $pdo = App\Config\Database::getInstance()->getConnection();
    $serviceId = isset($_GET['service_id']) ? (int)$_GET['service_id'] : null;
    
    if ($serviceId) {
        $stmt = $pdo->prepare("SELECT id, service_id, name, description FROM application_types WHERE service_id = ? AND is_active = 1 ORDER BY name");
        $stmt->execute([$serviceId]);
    } else {
        $stmt = $pdo->query("SELECT id, service_id, name, description FROM application_types WHERE is_active = 1 ORDER BY name");
    }
    
    $types = $stmt->fetchAll(PDO::FETCH_ASSOC);
    Response::success($types);
}

/**
 * Handle GET /contact-info - Get contact information
 */
function handleContactInfo(string $method): void
{
    if ($method !== 'GET') {
        Response::methodNotAllowed(['GET']);
    }
    
    $pdo = App\Config\Database::getInstance()->getConnection();
    $stmt = $pdo->query("SELECT phone, email, address, social_links FROM contact_info LIMIT 1");
    $contact = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$contact) {
        Response::error('Contact info not found', [], 404);
    }
    
    // Decode JSON social links
    $contact['social_links'] = json_decode($contact['social_links'] ?? '{}', true);
    
    Response::success($contact);
}

/**
 * Handle GET /locations - Get countries, states, cities
 */
function handleLocations(string $method): void
{
    if ($method !== 'GET') {
        Response::methodNotAllowed(['GET']);
    }
    
    $pdo = App\Config\Database::getInstance()->getConnection();
    
    $countryId = isset($_GET['country_id']) ? (int)$_GET['country_id'] : null;
    $stateId = isset($_GET['state_id']) ? (int)$_GET['state_id'] : null;
    
    if ($stateId) {
        // Get cities for a state
        $stmt = $pdo->prepare("SELECT id, name, timezone FROM cities WHERE state_id = ? ORDER BY name");
        $stmt->execute([$stateId]);
        $locations = ['cities' => $stmt->fetchAll(PDO::FETCH_ASSOC)];
    } elseif ($countryId) {
        // Get states for a country
        $stmt = $pdo->prepare("SELECT id, name, iso_code FROM states WHERE country_id = ? ORDER BY name");
        $stmt->execute([$countryId]);
        $locations = ['states' => $stmt->fetchAll(PDO::FETCH_ASSOC)];
    } else {
        // Get all countries
        $stmt = $pdo->query("SELECT id, iso2, name, calling_code FROM countries ORDER BY name");
        $locations = ['countries' => $stmt->fetchAll(PDO::FETCH_ASSOC)];
    }
    
    Response::success($locations);
}

/**
 * Handle GET /blog/posts - List published blog posts
 */
function handleBlogPosts(string $method): void
{
    if ($method !== 'GET') {
        Response::methodNotAllowed(['GET']);
    }
    
    $pdo = App\Config\Database::getInstance()->getConnection();
    
    $categoryId = isset($_GET['category_id']) ? (int)$_GET['category_id'] : null;
    $limit = isset($_GET['limit']) ? min((int)$_GET['limit'], 50) : 10;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
    
    $where = "p.status = 'published'";
    $params = [];
    
    if ($categoryId) {
        $where .= " AND p.category_id = ?";
        $params[] = $categoryId;
    }
    
    $stmt = $pdo->prepare("
        SELECT p.id, p.title, p.slug, p.excerpt, p.featured_image, 
               p.published_at, c.name as category_name, u.name as author_name
        FROM blog_posts p
        LEFT JOIN blog_categories c ON p.category_id = c.id
        LEFT JOIN admin_users u ON p.admin_user_id = u.id
        WHERE $where
        ORDER BY p.published_at DESC
        LIMIT ? OFFSET ?
    ");
    $stmt->execute([...$params, $limit, $offset]);
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    Response::success($posts);
}

/**
 * Handle GET /blog/posts/:slug - Get single blog post
 */
function handleBlogPostBySlug(string $method, string $slug): void
{
    if ($method !== 'GET') {
        Response::methodNotAllowed(['GET']);
    }
    
    $pdo = App\Config\Database::getInstance()->getConnection();
    $stmt = $pdo->prepare("
        SELECT p.*, c.name as category_name, c.slug as category_slug, 
               u.name as author_name
        FROM blog_posts p
        LEFT JOIN blog_categories c ON p.category_id = c.id
        LEFT JOIN admin_users u ON p.admin_user_id = u.id
        WHERE p.slug = ? AND p.status = 'published'
    ");
    $stmt->execute([$slug]);
    $post = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$post) {
        Response::error('Post not found', [], 404);
    }
    
    Response::success($post);
}

/**
 * Handle GET /blog/categories - List blog categories
 */
function handleBlogCategories(string $method): void
{
    if ($method !== 'GET') {
        Response::methodNotAllowed(['GET']);
    }
    
    $pdo = App\Config\Database::getInstance()->getConnection();
    $stmt = $pdo->query("SELECT id, name, slug, description FROM blog_categories ORDER BY name");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    Response::success($categories);
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
