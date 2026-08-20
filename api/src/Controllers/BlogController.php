<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Models\BlogPost;
use App\Models\BlogCategory;

class BlogController extends BaseController
{
    private BlogPost $postModel;
    private BlogCategory $categoryModel;
    
    public function __construct()
    {
        $this->postModel = new BlogPost();
        $this->categoryModel = new BlogCategory();
    }
    
    /**
     * GET /api/blog/posts
     * Get published blog posts with pagination
     */
    public function index(Request $request, Response $response): Response
    {
        try {
            $page = (int) $this->getQueryParam($request, 'page', 1);
            $perPage = (int) $this->getQueryParam($request, 'per_page', 10);
            $categoryId = $this->getQueryParam($request, 'category_id');
            
            if ($categoryId) {
                $categoryId = (int) $categoryId;
            }
            
            $posts = $this->postModel->getPublished($page, $perPage, $categoryId);
            $total = $this->postModel->getPublishedCount($categoryId);
            
            return $this->successResponse($response, [
                'posts' => $posts,
                'pagination' => [
                    'current_page' => $page,
                    'per_page' => $perPage,
                    'total' => $total,
                    'total_pages' => ceil($total / $perPage),
                ]
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching blog posts: ' . $e->getMessage(), 500);
        }
    }
    
    /**
     * GET /api/blog/posts/{slug}
     * Get single blog post by slug
     */
    public function show(Request $request, Response $response, array $args): Response
    {
        try {
            $slug = $args['slug'];
            $post = $this->postModel->getBySlugWithDetails($slug);
            
            if (!$post) {
                return $this->errorResponse($response, 'Blog post not found', 404);
            }
            
            // Get related posts
            $related = [];
            if ($post['category_id']) {
                $related = $this->postModel->getRelated((int) $post['id'], (int) $post['category_id']);
            }
            
            return $this->successResponse($response, [
                'post' => $post,
                'related' => $related,
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching blog post: ' . $e->getMessage(), 500);
        }
    }
    
    /**
     * GET /api/blog/categories
     * Get all blog categories
     */
    public function categories(Request $request, Response $response): Response
    {
        try {
            $categories = $this->categoryModel->getAllWithPostCount();
            return $this->successResponse($response, $categories);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching categories: ' . $e->getMessage(), 500);
        }
    }
    
    /**
     * GET /api/blog/categories/{slug}
     * Get category by slug with posts
     */
    public function categoryShow(Request $request, Response $response, array $args): Response
    {
        try {
            $slug = $args['slug'];
            $category = $this->categoryModel->getBySlugWithCount($slug);
            
            if (!$category) {
                return $this->errorResponse($response, 'Category not found', 404);
            }
            
            return $this->successResponse($response, $category);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching category: ' . $e->getMessage(), 500);
        }
    }
    
    /**
     * GET /api/blog/recent
     * Get recent blog posts
     */
    public function recent(Request $request, Response $response): Response
    {
        try {
            $limit = (int) $this->getQueryParam($request, 'limit', 5);
            $posts = $this->postModel->getRecent($limit);
            return $this->successResponse($response, $posts);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching recent posts: ' . $e->getMessage(), 500);
        }
    }
}
