<?php

namespace App\Models;

class BlogPost extends BaseModel
{
    protected string $table = 'blog_posts';
    
    /**
     * Get published blog posts with pagination
     */
    public function getPublished(int $page = 1, int $perPage = 10, ?int $categoryId = null): array
    {
        $offset = ($page - 1) * $perPage;
        
        $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug,
                       u.name as author_name
                FROM {$this->table} p
                LEFT JOIN blog_categories c ON p.category_id = c.id
                LEFT JOIN users u ON p.author_id = u.id
                WHERE p.status = 'published' AND p.published_at <= NOW()";
        
        if ($categoryId) {
            $sql .= " AND p.category_id = :category_id";
        }
        
        $sql .= " ORDER BY p.published_at DESC LIMIT :limit OFFSET :offset";
        
        $stmt = $this->db->prepare($sql);
        if ($categoryId) {
            $stmt->bindValue(':category_id', $categoryId, \PDO::PARAM_INT);
        }
        $stmt->bindValue(':limit', $perPage, \PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, \PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    /**
     * Get total count of published posts
     */
    public function getPublishedCount(?int $categoryId = null): int
    {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} 
                WHERE status = 'published' AND published_at <= NOW()";
        
        if ($categoryId) {
            $sql .= " AND category_id = :category_id";
        }
        
        $stmt = $this->db->prepare($sql);
        if ($categoryId) {
            $stmt->bindValue(':category_id', $categoryId, \PDO::PARAM_INT);
        }
        $stmt->execute();
        
        $result = $stmt->fetch();
        return (int) ($result['total'] ?? 0);
    }
    
    /**
     * Get post by slug with author and category details
     */
    public function getBySlugWithDetails(string $slug): ?array
    {
        $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug,
                       u.name as author_name, u.email as author_email
                FROM {$this->table} p
                LEFT JOIN blog_categories c ON p.category_id = c.id
                LEFT JOIN users u ON p.author_id = u.id
                WHERE p.slug = ? AND p.status = 'published' AND p.published_at <= NOW()";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$slug]);
        
        $result = $stmt->fetch();
        return $result ?: null;
    }
    
    /**
     * Get related posts
     */
    public function getRelated(int $postId, int $categoryId, int $limit = 3): array
    {
        $sql = "SELECT id, title, slug, excerpt, featured_image, published_at
                FROM {$this->table}
                WHERE category_id = :category_id 
                AND id != :post_id
                AND status = 'published' 
                AND published_at <= NOW()
                ORDER BY published_at DESC
                LIMIT :limit";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':category_id', $categoryId, \PDO::PARAM_INT);
        $stmt->bindValue(':post_id', $postId, \PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    /**
     * Get recent posts
     */
    public function getRecent(int $limit = 5): array
    {
        $sql = "SELECT id, title, slug, excerpt, featured_image, published_at
                FROM {$this->table}
                WHERE status = 'published' AND published_at <= NOW()
                ORDER BY published_at DESC
                LIMIT :limit";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
}
