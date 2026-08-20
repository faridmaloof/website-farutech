<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use Illuminate\Http\Request;

class BlogCategoryController extends Controller
{
    /**
     * List active blog categories with published post counts.
     */
    public function index(Request $request)
    {
        $categories = BlogCategory::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->withCount(['posts' => function ($q) {
                $q->published();
            }])
            ->get(['id', 'name', 'slug', 'description']);

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * Show a single category with its published posts.
     */
    public function show(Request $request, string $slug)
    {
        $category = BlogCategory::query()
            ->where('is_active', true)
            ->where('slug', $slug)
            ->first();

        if (! $category) {
            return response()->json(['success' => false, 'message' => 'Categoría no encontrada'], 404);
        }

        $posts = $category->posts()
            ->published()
            ->with(['author:id,name'])
            ->orderByDesc('published_at')
            ->paginate($request->integer('per_page', 9) ?: 9);

        return response()->json([
            'success' => true,
            'data' => [
                'category' => ['id' => $category->id, 'name' => $category->name, 'slug' => $category->slug, 'description' => $category->description],
                'posts' => collect($posts->items())->map(fn ($post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'excerpt' => $post->excerpt,
                    'featured_image' => $post->featured_image,
                    'published_at' => optional($post->published_at)->toIso8601String(),
                    'views_count' => (int) $post->views_count,
                    'author' => $post->author ? ['id' => $post->author->id, 'name' => $post->author->name] : null,
                ]),
            ],
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
        ]);
    }
}