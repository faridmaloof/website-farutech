<?php

namespace App\Models;

use App\Helpers\Database;
use PDO;

class BaseModel
{
    protected PDO $db;
    protected string $table;
    
    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }
    
    /**
     * Get all records with optional filters
     */
    public function getAll(array $filters = [], string $orderBy = 'id', string $order = 'ASC'): array
    {
        $sql = "SELECT * FROM {$this->table}";
        $where = $this->buildWhereClause($filters);
        
        if (!empty($where)) {
            $sql .= " WHERE " . $where;
        }
        
        $sql .= " ORDER BY {$orderBy} {$order}";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($filters);
        
        return $stmt->fetchAll();
    }
    
    /**
     * Get single record by ID
     */
    public function getById(int $id): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE id = ?");
        $stmt->execute([$id]);
        
        $result = $stmt->fetch();
        return $result ?: null;
    }
    
    /**
     * Get single record by slug
     */
    public function getBySlug(string $slug): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE slug = ? AND active = 1");
        $stmt->execute([$slug]);
        
        $result = $stmt->fetch();
        return $result ?: null;
    }
    
    /**
     * Create new record
     */
    public function create(array $data): int
    {
        $columns = implode(', ', array_keys($data));
        $placeholders = ':' . implode(', :', array_keys($data));
        
        $sql = "INSERT INTO {$this->table} ({$columns}) VALUES ({$placeholders})";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($data);
        
        return (int) $this->db->lastInsertId();
    }
    
    /**
     * Update record by ID
     */
    public function update(int $id, array $data): bool
    {
        $set = [];
        foreach (array_keys($data) as $column) {
            $set[] = "{$column} = :{$column}";
        }
        $setClause = implode(', ', $set);
        
        $sql = "UPDATE {$this->table} SET {$setClause} WHERE id = :id";
        $data['id'] = $id;
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($data);
    }
    
    /**
     * Delete record by ID
     */
    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare("DELETE FROM {$this->table} WHERE id = ?");
        return $stmt->execute([$id]);
    }
    
    /**
     * Soft delete (set active = 0)
     */
    public function softDelete(int $id): bool
    {
        $stmt = $this->db->prepare("UPDATE {$this->table} SET active = 0 WHERE id = ?");
        return $stmt->execute([$id]);
    }
    
    /**
     * Count records with optional filters
     */
    public function count(array $filters = []): int
    {
        $sql = "SELECT COUNT(*) as total FROM {$this->table}";
        $where = $this->buildWhereClause($filters);
        
        if (!empty($where)) {
            $sql .= " WHERE " . $where;
        }
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($filters);
        
        $result = $stmt->fetch();
        return (int) ($result['total'] ?? 0);
    }
    
    /**
     * Build WHERE clause from filters
     */
    protected function buildWhereClause(array $filters): string
    {
        if (empty($filters)) {
            return '';
        }
        
        $conditions = [];
        foreach (array_keys($filters) as $column) {
            $conditions[] = "{$column} = :{$column}";
        }
        
        return implode(' AND ', $conditions);
    }
}
