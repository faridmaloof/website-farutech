<?php
/**
 * Lead Repository
 * 
 * Implements Dependency Inversion Principle (DIP)
 * Handles all database operations for leads
 */

namespace App\Src;

use PDO;
use App\Config\Database;

class LeadRepository
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Save a new lead to the database
     */
    public function saveLead(array $data): int
    {
        $sql = "INSERT INTO leads (
            name, email, phone, company, position, service_interest, 
            budget_range, project_timeline, message, source, ip_address, user_agent
        ) VALUES (:name, :email, :phone, :company, :position, :service_interest, 
                  :budget_range, :project_timeline, :message, :source, :ip_address, :user_agent)";

        $stmt = $this->db->prepare($sql);
        
        $stmt->execute([
            ':name' => $this->sanitize($data['name']),
            ':email' => $this->sanitize($data['email']),
            ':phone' => $this->sanitize($data['phone'] ?? null),
            ':company' => $this->sanitize($data['company'] ?? null),
            ':position' => $this->sanitize($data['position'] ?? null),
            ':service_interest' => $this->sanitize($data['service_interest']),
            ':budget_range' => $this->sanitize($data['budget_range'] ?? null),
            ':project_timeline' => $this->sanitize($data['project_timeline'] ?? null),
            ':message' => $this->sanitize($data['message']),
            ':source' => $this->sanitize($data['source'] ?? 'website'),
            ':ip_address' => $this->getIpAddress(),
            ':user_agent' => $this->sanitize($_SERVER['HTTP_USER_AGENT'] ?? null)
        ]);

        return (int) $this->db->lastInsertId();
    }

    /**
     * Save newsletter subscription
     */
    public function saveSubscriber(string $email, string $source = 'website'): int
    {
        $sql = "INSERT INTO newsletter_subscribers (email, source, subscribed_at) 
                VALUES (:email, :source, NOW())
                ON DUPLICATE KEY UPDATE updated_at = NOW()";

        $stmt = $this->db->prepare($sql);
        
        $stmt->execute([
            ':email' => $this->sanitize($email),
            ':source' => $this->sanitize($source)
        ]);

        return (int) $this->db->lastInsertId();
    }

    /**
     * Get lead by ID
     */
    public function getLeadById(int $id): ?array
    {
        $sql = "SELECT * FROM leads WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
        
        $result = $stmt->fetch();
        return $result ?: null;
    }

    /**
     * Check if email exists in subscribers
     */
    public function emailExistsInSubscribers(string $email): bool
    {
        $sql = "SELECT COUNT(*) as count FROM newsletter_subscribers WHERE email = :email";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':email' => $this->sanitize($email)]);
        
        $result = $stmt->fetch();
        return $result['count'] > 0;
    }

    /**
     * Sanitize input data
     */
    private function sanitize(?string $data): ?string
    {
        if ($data === null || trim($data) === '') {
            return null;
        }
        
        return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
    }

    /**
     * Get client IP address
     */
    private function getIpAddress(): string
    {
        $ipKeys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
        
        foreach ($ipKeys as $key) {
            if (!empty($_SERVER[$key])) {
                $ip = explode(',', $_SERVER[$key])[0];
                if (filter_var($ip, FILTER_VALIDATE_IP)) {
                    return $ip;
                }
            }
        }
        
        return '0.0.0.0';
    }
}
