<?php

namespace App\Models;

class ApplicationType extends BaseModel
{
    protected string $table = 'application_types';
    
    /**
     * Get all application types for a specific service
     */
    public function getAllByService(int $serviceId): array
    {
        $sql = "SELECT * FROM {$this->table} 
                WHERE service_id = :service_id AND active = 1 
                ORDER BY order_position ASC, name ASC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['service_id' => $serviceId]);
        
        return $stmt->fetchAll();
    }
    
    /**
     * Get application types grouped by service
     */
    public function getAllGroupedByService(): array
    {
        $sql = "SELECT s.id as service_id, s.name as service_name, s.slug as service_slug,
                       at.id as type_id, at.name as type_name, at.slug as type_slug, at.description
                FROM {$this->table} at
                JOIN services s ON at.service_id = s.id
                WHERE at.active = 1 AND s.active = 1
                ORDER BY s.order_position ASC, at.order_position ASC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        
        $results = $stmt->fetchAll();
        
        // Group by service
        $grouped = [];
        foreach ($results as $row) {
            $serviceId = $row['service_id'];
            
            if (!isset($grouped[$serviceId])) {
                $grouped[$serviceId] = [
                    'id' => $row['service_id'],
                    'name' => $row['service_name'],
                    'slug' => $row['service_slug'],
                    'types' => []
                ];
            }
            
            $grouped[$serviceId]['types'][] = [
                'id' => $row['type_id'],
                'name' => $row['type_name'],
                'slug' => $row['type_slug'],
                'description' => $row['description']
            ];
        }
        
        return array_values($grouped);
    }
    
    /**
     * Search application types by keyword
     */
    public function search(string $keyword): array
    {
        $sql = "SELECT at.*, s.name as service_name, s.slug as service_slug
                FROM {$this->table} at
                JOIN services s ON at.service_id = s.id
                WHERE (at.name LIKE :keyword OR at.description LIKE :keyword)
                AND at.active = 1 AND s.active = 1
                ORDER BY at.name ASC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['keyword' => "%{$keyword}%"]);
        
        return $stmt->fetchAll();
    }
}
