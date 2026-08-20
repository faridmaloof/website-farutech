<?php

namespace App\Models;

class Service extends BaseModel
{
    protected string $table = 'services';
    
    /**
     * Get all active services with their application types count
     */
    public function getAllWithTypesCount(): array
    {
        $sql = "SELECT s.*, COUNT(at.id) as types_count 
                FROM {$this->table} s 
                LEFT JOIN application_types at ON s.id = at.service_id AND at.active = 1
                WHERE s.active = 1 
                GROUP BY s.id 
                ORDER BY s.order_position ASC, s.name ASC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    /**
     * Get service by slug with its application types
     */
    public function getBySlugWithTypes(string $slug): ?array
    {
        // Get service
        $service = $this->getBySlug($slug);
        if (!$service) {
            return null;
        }
        
        // Get application types for this service
        $typesModel = new ApplicationType();
        $types = $typesModel->getAllByService((int) $service['id']);
        
        $service['application_types'] = $types;
        
        return $service;
    }
    
    /**
     * Get services for homepage (featured or limited count)
     */
    public function getFeatured(int $limit = 6): array
    {
        $sql = "SELECT * FROM {$this->table} 
                WHERE active = 1 AND is_featured = 1 
                ORDER BY order_position ASC 
                LIMIT :limit";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
}
