<?php

namespace App\Models;

class BlogCategory extends BaseModel
{
    protected string $table = 'blog_categories';
    
    /**
     * Get all categories with post count
     */
    public function getAllWithPostCount(): array
    {
        $sql = "SELECT c.*, COUNT(p.id) as post_count
                FROM {$this->table} c
                LEFT JOIN blog_posts p ON c.id = p.category_id 
                    AND p.status = 'published' AND p.published_at <= NOW()
                WHERE c.active = 1
                GROUP BY c.id
                ORDER BY c.name ASC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    /**
     * Get category by slug with post count
     */
    public function getBySlugWithCount(string $slug): ?array
    {
        $sql = "SELECT c.*, COUNT(p.id) as post_count
                FROM {$this->table} c
                LEFT JOIN blog_posts p ON c.id = p.category_id 
                    AND p.status = 'published' AND p.published_at <= NOW()
                WHERE c.slug = ? AND c.active = 1
                GROUP BY c.id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$slug]);
        
        $result = $stmt->fetch();
        return $result ?: null;
    }
}
