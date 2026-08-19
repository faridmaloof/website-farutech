<?php
/**
 * API de Contacto - FaruTech
 * Maneja el envío de formularios de contacto y newsletter
 * 
 * Principios SOLID:
 * - Single Responsibility: Cada clase tiene una única responsabilidad
 * - Open/Closed: Abierto para extensión, cerrado para modificación
 * - Liskov Substitution: Las clases hijas pueden sustituir a las padres
 * - Interface Segregation: Interfaces específicas por función
 * - Dependency Inversion: Dependencia de abstracciones, no implementaciones
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

/**
 * Interface para validadores (Interface Segregation)
 */
interface ValidatorInterface {
    public function validate(array $data): array;
}

/**
 * Interface para repositorios de datos (Dependency Inversion)
 */
interface RepositoryInterface {
    public function save(array $data): bool;
}

/**
 * Validador de formularios (Single Responsibility)
 */
class ContactValidator implements ValidatorInterface {
    private array $errors = [];
    
    public function validate(array $data): array {
        $this->errors = [];
        
        // Validar nombre
        if (empty($data['name']) || strlen(trim($data['name'])) < 2) {
            $this->errors['name'] = 'El nombre es requerido (mínimo 2 caracteres)';
        }
        
        // Validar email
        if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $this->errors['email'] = 'Email inválido';
        }
        
        // Validar teléfono (opcional pero con formato si se proporciona)
        if (!empty($data['phone']) && !preg_match('/^[+]?[0-9\s\-()]{8,20}$/', $data['phone'])) {
            $this->errors['phone'] = 'Formato de teléfono inválido';
        }
        
        // Validar tipo de servicio
        $validServices = ['desarrollo-software', 'plataformas-saas', 'soluciones-empresariales', 'ia-automatizacion', 'ux-engineering', 'otro'];
        if (empty($data['service']) || !in_array($data['service'], $validServices)) {
            $this->errors['service'] = 'Servicio inválido';
        }
        
        // Validar presupuesto
        $validBudgets = ['<5M', '5M-10M', '10M-20M', '20M-50M', '>50M'];
        if (empty($data['budget']) || !in_array($data['budget'], $validBudgets)) {
            $this->errors['budget'] = 'Rango de presupuesto inválido';
        }
        
        // Validar timeline
        $validTimelines = ['inmediato', '1-3 meses', '3-6 meses', '6+ meses'];
        if (empty($data['timeline']) || !in_array($data['timeline'], $validTimelines)) {
            $this->errors['timeline'] = 'Timeline inválido';
        }
        
        // Validar mensaje
        if (empty($data['message']) || strlen(trim($data['message'])) < 10) {
            $this->errors['message'] = 'El mensaje es requerido (mínimo 10 caracteres)';
        }
        
        // Validar términos
        if (empty($data['terms'])) {
            $this->errors['terms'] = 'Debes aceptar los términos y política de privacidad';
        }
        
        return $this->errors;
    }
    
    public function hasErrors(): bool {
        return !empty($this->errors);
    }
    
    public function getErrors(): array {
        return $this->errors;
    }
}

/**
 * Validador de Newsletter (Open/Closed - extiende sin modificar)
 */
class NewsletterValidator implements ValidatorInterface {
    private array $errors = [];
    
    public function validate(array $data): array {
        $this->errors = [];
        
        if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $this->errors['email'] = 'Email inválido';
        }
        
        if (empty($data['consent'])) {
            $this->errors['consent'] = 'Debes aceptar recibir comunicaciones';
        }
        
        return $this->errors;
    }
    
    public function hasErrors(): bool {
        return !empty($this->errors);
    }
    
    public function getErrors(): array {
        return $this->errors;
    }
}

/**
 * Repositorio MySQL (implementación concreta)
 */
class MySQLRepository implements RepositoryInterface {
    private PDO $pdo;
    private string $table;
    
    public function __construct(string $table) {
        $this->table = $table;
        $this->pdo = $this->getConnection();
    }
    
    /**
     * Obtener conexión PDO (Dependency Inversion)
     */
    private function getConnection(): PDO {
        $host = getenv('DB_HOST') ?: 'localhost';
        $dbname = getenv('DB_NAME') ?: 'farutech_leads';
        $username = getenv('DB_USER') ?: 'root';
        $password = getenv('DB_PASS') ?: '';
        
        try {
            $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
            $pdo = new PDO($dsn, $username, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
            return $pdo;
        } catch (PDOException $e) {
            error_log("Error de conexión: " . $e->getMessage());
            throw new Exception('Error de conexión a la base de datos');
        }
    }
    
    /**
     * Guardar datos de forma segura con prepared statements
     */
    public function save(array $data): bool {
        try {
            $columns = implode(', ', array_keys($data));
            $placeholders = ':' . implode(', :', array_keys($data));
            
            $sql = "INSERT INTO {$this->table} ($columns, created_at) VALUES ($placeholders, NOW())";
            $stmt = $this->pdo->prepare($sql);
            
            foreach ($data as $key => $value) {
                $stmt->bindValue(":$key", $value, $this->getPDOType($value));
            }
            
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log("Error al guardar: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Determinar el tipo PDO para binding
     */
    private function getPDOType($value): int {
        if (is_int($value)) {
            return PDO::PARAM_INT;
        } elseif (is_bool($value)) {
            return PDO::PARAM_BOOL;
        } elseif (is_null($value)) {
            return PDO::PARAM_NULL;
        }
        return PDO::PARAM_STR;
    }
}

/**
 * Servicio de Contacto (orquestra validación y guardado)
 */
class ContactService {
    private ValidatorInterface $validator;
    private RepositoryInterface $repository;
    
    public function __construct(ValidatorInterface $validator, RepositoryInterface $repository) {
        $this->validator = $validator;
        $this->repository = $repository;
    }
    
    public function process(array $data): array {
        // Validar datos
        $errors = $this->validator->validate($data);
        
        if (!empty($errors)) {
            return [
                'success' => false,
                'errors' => $errors,
                'message' => 'Datos inválidos'
            ];
        }
        
        // Sanitizar datos
        $sanitized = [
            'name' => htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8'),
            'email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL),
            'phone' => !empty($data['phone']) ? htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8') : null,
            'company' => !empty($data['company']) ? htmlspecialchars(trim($data['company']), ENT_QUOTES, 'UTF-8') : null,
            'service' => htmlspecialchars($data['service'], ENT_QUOTES, 'UTF-8'),
            'budget' => htmlspecialchars($data['budget'], ENT_QUOTES, 'UTF-8'),
            'timeline' => htmlspecialchars($data['timeline'], ENT_QUOTES, 'UTF-8'),
            'message' => htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8'),
            'source' => !empty($data['source']) ? htmlspecialchars($data['source'], ENT_QUOTES, 'UTF-8') : 'website',
            'newsletter' => !empty($data['newsletter']) ? 1 : 0,
        ];
        
        // Guardar en BD
        $saved = $this->repository->save($sanitized);
        
        if (!$saved) {
            return [
                'success' => false,
                'message' => 'Error al guardar los datos'
            ];
        }
        
        // Enviar notificación por email (opcional)
        // $this->sendNotification($sanitized);
        
        return [
            'success' => true,
            'message' => '¡Gracias! Nos pondremos en contacto pronto.',
            'data' => $sanitized
        ];
    }
}

/**
 * Servicio de Newsletter
 */
class NewsletterService {
    private ValidatorInterface $validator;
    private RepositoryInterface $repository;
    
    public function __construct(ValidatorInterface $validator, RepositoryInterface $repository) {
        $this->validator = $validator;
        $this->repository = $repository;
    }
    
    public function subscribe(array $data): array {
        $errors = $this->validator->validate($data);
        
        if (!empty($errors)) {
            return [
                'success' => false,
                'errors' => $errors,
                'message' => 'Datos inválidos'
            ];
        }
        
        $sanitized = [
            'email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL),
            'source' => !empty($data['source']) ? htmlspecialchars($data['source'], ENT_QUOTES, 'UTF-8') : 'website',
            'interests' => !empty($data['interests']) ? json_encode($data['interests']) : null,
        ];
        
        // Verificar si ya existe
        // (implementación opcional)
        
        $saved = $this->repository->save($sanitized);
        
        if (!$saved) {
            return [
                'success' => false,
                'message' => 'Error al suscribirse'
            ];
        }
        
        return [
            'success' => true,
            'message' => '¡Gracias por suscribirte!'
        ];
    }
}

/**
 * Handler principal
 */
try {
    // Obtener JSON del request
    $input = file_get_contents('php://input');
    $jsonData = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('JSON inválido');
    }
    
    // Determinar tipo de formulario
    $formType = $jsonData['type'] ?? 'contact';
    
    if ($formType === 'newsletter') {
        // Procesar newsletter
        $validator = new NewsletterValidator();
        $repository = new MySQLRepository('newsletter_subscribers');
        $service = new NewsletterService($validator, $repository);
        $response = $service->subscribe($jsonData);
    } else {
        // Procesar contacto
        $validator = new ContactValidator();
        $repository = new MySQLRepository('contact_leads');
        $service = new ContactService($validator, $repository);
        $response = $service->process($jsonData);
    }
    
    http_response_code($response['success'] ? 200 : 400);
    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error interno del servidor',
        'details' => getenv('APP_DEBUG') ? $e->getMessage() : null
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}
