<?php

namespace App\Models;

class Lead extends BaseModel
{
    protected string $table = 'leads';
    
    /**
     * Get leads with pagination and filters
     */
    public function getWithFilters(int $page = 1, int $perPage = 20, array $filters = []): array
    {
        $offset = ($page - 1) * $perPage;
        
        $sql = "SELECT l.*, s.name as service_name, c.name as country_name
                FROM {$this->table} l
                LEFT JOIN services s ON l.service_id = s.id
                LEFT JOIN countries c ON l.country_id = c.id
                WHERE 1=1";
        
        $params = [];
        
        if (!empty($filters['status'])) {
            $sql .= " AND l.status = :status";
            $params['status'] = $filters['status'];
        }
        
        if (!empty($filters['service_id'])) {
            $sql .= " AND l.service_id = :service_id";
            $params['service_id'] = $filters['service_id'];
        }
        
        if (!empty($filters['date_from'])) {
            $sql .= " AND l.created_at >= :date_from";
            $params['date_from'] = $filters['date_from'];
        }
        
        if (!empty($filters['date_to'])) {
            $sql .= " AND l.created_at <= :date_to";
            $params['date_to'] = $filters['date_to'];
        }
        
        $sql .= " ORDER BY l.created_at DESC LIMIT :limit OFFSET :offset";
        
        $stmt = $this->db->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue(":{$key}", $value);
        }
        $stmt->bindValue(':limit', $perPage, \PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, \PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    /**
     * Get count with filters
     */
    public function getCountWithFilters(array $filters = []): int
    {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} WHERE 1=1";
        
        $params = [];
        
        if (!empty($filters['status'])) {
            $sql .= " AND status = :status";
            $params['status'] = $filters['status'];
        }
        
        if (!empty($filters['service_id'])) {
            $sql .= " AND service_id = :service_id";
            $params['service_id'] = $filters['service_id'];
        }
        
        if (!empty($filters['date_from'])) {
            $sql .= " AND created_at >= :date_from";
            $params['date_from'] = $filters['date_from'];
        }
        
        if (!empty($filters['date_to'])) {
            $sql .= " AND created_at <= :date_to";
            $params['date_to'] = $filters['date_to'];
        }
        
        $stmt = $this->db->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue(":{$key}", $value);
        }
        $stmt->execute();
        
        $result = $stmt->fetch();
        return (int) ($result['total'] ?? 0);
    }
    
    /**
     * Update lead status
     */
    public function updateStatus(int $id, string $status): bool
    {
        return $this->update($id, ['status' => $status]);
    }
    
    /**
     * Get recent leads for dashboard
     */
    public function getRecent(int $limit = 10): array
    {
        $sql = "SELECT l.*, s.name as service_name
                FROM {$this->table} l
                LEFT JOIN services s ON l.service_id = s.id
                ORDER BY l.created_at DESC
                LIMIT :limit";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    /**
     * Get leads statistics
     */
    public function getStatistics(): array
    {
        $sql = "SELECT 
                    COUNT(*) as total,
                    SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count,
                    SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) as contacted_count,
                    SUM(CASE WHEN status = 'qualified' THEN 1 ELSE 0 END) as qualified_count,
                    SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) as converted_count
                FROM {$this->table}";
        
        $stmt = $this->db->query($sql);
        return $stmt->fetch() ?: [];
    }
}
