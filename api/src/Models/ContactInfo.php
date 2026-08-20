<?php

namespace App\Models;

class ContactInfo extends BaseModel
{
    protected string $table = 'contact_info';
    
    /**
     * Get the primary contact information (single record)
     */
    public function getPrimary(): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE is_primary = 1 LIMIT 1");
        $stmt->execute();
        
        $result = $stmt->fetch();
        return $result ?: null;
    }
    
    /**
     * Get social media links
     */
    public function getSocialMedia(): array
    {
        $contact = $this->getPrimary();
        if (!$contact) {
            return [];
        }
        
        return [
            'facebook' => $contact['facebook'] ?? null,
            'twitter' => $contact['twitter'] ?? null,
            'linkedin' => $contact['linkedin'] ?? null,
            'instagram' => $contact['instagram'] ?? null,
            'github' => $contact['github'] ?? null,
            'youtube' => $contact['youtube'] ?? null,
        ];
    }
    
    /**
     * Update social media links
     */
    public function updateSocialMedia(array $socialData): bool
    {
        $primary = $this->getPrimary();
        if (!$primary) {
            return false;
        }
        
        return $this->update($primary['id'], $socialData);
    }
}
