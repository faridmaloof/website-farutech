<?php

namespace App\Models;

class Location extends BaseModel
{
    protected string $table = 'countries';
    
    /**
     * Get all locations in hierarchical structure
     */
    public function getAllHierarchical(): array
    {
        $sql = "SELECT c.id as country_id, c.name as country_name, c.code as country_code,
                       s.id as state_id, s.name as state_name, s.code as state_code,
                       ci.id as city_id, ci.name as city_name
                FROM {$this->table} c
                LEFT JOIN states s ON c.id = s.country_id AND s.active = 1
                LEFT JOIN cities ci ON s.id = ci.state_id AND ci.active = 1
                WHERE c.active = 1
                ORDER BY c.name ASC, s.name ASC, ci.name ASC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        
        $results = $stmt->fetchAll();
        
        // Build hierarchical structure
        $countries = [];
        foreach ($results as $row) {
            $countryId = $row['country_id'];
            
            if (!isset($countries[$countryId])) {
                $countries[$countryId] = [
                    'id' => $row['country_id'],
                    'name' => $row['country_name'],
                    'code' => $row['country_code'],
                    'states' => []
                ];
            }
            
            if ($row['state_id']) {
                $stateId = $row['state_id'];
                
                if (!isset($countries[$countryId]['states'][$stateId])) {
                    $countries[$countryId]['states'][$stateId] = [
                        'id' => $row['state_id'],
                        'name' => $row['state_name'],
                        'code' => $row['state_code'],
                        'cities' => []
                    ];
                }
                
                if ($row['city_id']) {
                    $countries[$countryId]['states'][$stateId]['cities'][] = [
                        'id' => $row['city_id'],
                        'name' => $row['city_name']
                    ];
                }
            }
        }
        
        // Convert to indexed arrays
        foreach ($countries as &$country) {
            $states = [];
            foreach ($country['states'] as $state) {
                $state['cities'] = array_values($state['cities']);
                $states[] = $state;
            }
            $country['states'] = $states;
        }
        
        return array_values($countries);
    }
    
    /**
     * Get countries list
     */
    public function getCountries(): array
    {
        $sql = "SELECT id, name, code FROM {$this->table} WHERE active = 1 ORDER BY name ASC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    
    /**
     * Get states by country ID
     */
    public function getStatesByCountry(int $countryId): array
    {
        $sql = "SELECT id, name, code FROM states 
                WHERE country_id = :country_id AND active = 1 
                ORDER BY name ASC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['country_id' => $countryId]);
        return $stmt->fetchAll();
    }
    
    /**
     * Get cities by state ID
     */
    public function getCitiesByState(int $stateId): array
    {
        $sql = "SELECT id, name FROM cities 
                WHERE state_id = :state_id AND active = 1 
                ORDER BY name ASC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['state_id' => $stateId]);
        return $stmt->fetchAll();
    }
}
