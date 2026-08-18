<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
header('Content-Type: application/json; charset=utf-8'); header('Cache-Control: public, max-age=300');
$slug = apiText($_GET, 'slug', 140);
try { $sql = "SELECT slug, title, excerpt, content, featured_image, featured_image_alt, seo_title, seo_description, published_at FROM posts WHERE is_active = 1 AND (status = 'published' OR (status = 'scheduled' AND published_at <= UTC_TIMESTAMP()))"; $parameters = []; if ($slug !== '') { $sql .= ' AND slug = :slug'; $parameters[':slug'] = $slug; } $sql .= ' ORDER BY published_at DESC'; $statement = apiPdo()->prepare($sql); $statement->execute($parameters); apiRespond(200, ['ok' => true, 'posts' => $statement->fetchAll(PDO::FETCH_ASSOC)]); } catch (Throwable $error) { apiRespond(500, ['ok' => false, 'posts' => []]); }
