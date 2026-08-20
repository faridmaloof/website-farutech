<?php

namespace Tests;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Lumen\Testing\DatabaseMigrations;

class BlogApiTest extends TestCase
{
    use DatabaseMigrations;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::create([
            'name' => 'Admin Test',
            'email' => 'admin-'.uniqid().'@farutech.test',
            'password' => Hash::make('secret'),
            'role' => 'admin',
            'is_active' => true,
        ]);
    }

    public function test_public_index_lists_only_published_posts()
    {
        $this->seedBlogFixture();

        $this->get('/api/blog/posts');

        $this->seeStatusCode(200);
        $this->assertTrue($this->response->getData(true)['success']);
    }

    public function test_public_index_filters_by_category()
    {
        $this->seedBlogFixture();

        $this->get('/api/blog/posts?category=desarrollo-software');

        $this->seeStatusCode(200);
        $data = $this->response->getData(true);
        $this->assertCount(1, $data['data']);
    }

    public function test_public_show_returns_404_for_draft()
    {
        $this->seedBlogFixture();

        $this->get('/api/blog/posts/borrador-no-publicado');

        $this->seeStatusCode(404);
    }

    public function test_categories_index()
    {
        BlogCategory::create([
            'name' => 'Test Cat',
            'slug' => 'test-cat-'.uniqid(),
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $this->get('/api/blog/categories');

        $this->seeStatusCode(200);
        $this->assertTrue($this->response->getData(true)['success']);
    }

    public function test_admin_can_create_scheduled_post()
    {
        $this->actingAs($this->admin);

        $this->post('/api/admin/blog', [
            'title' => 'Post programado',
            'content' => '<p>Contenido de prueba</p>',
            'status' => 'scheduled',
            'scheduled_for' => now()->addDay()->toDateTimeString(),
        ]);

        $this->seeStatusCode(201);
        $this->assertSame('scheduled', $this->response->getData(true)['data']['status']);
    }

    public function test_admin_can_update_post()
    {
        $this->seedBlogFixture();
        $post = BlogPost::where('slug', 'post-publicado-1')->first();

        $this->actingAs($this->admin);

        $this->put('/api/admin/blog/'.$post->id, [
            'title' => 'Título actualizado',
            'content' => '<p>Nuevo contenido</p>',
            'status' => 'published',
        ]);

        $this->seeStatusCode(200);
        $this->assertEquals('Título actualizado', $this->response->getData(true)['data']['title']);
    }

    public function test_admin_can_delete_post()
    {
        $this->actingAs($this->admin);

        $post = BlogPost::create([
            'title' => 'Para borrar',
            'slug' => 'para-borrar',
            'content' => 'x',
            'author_id' => $this->admin->id,
            'status' => 'draft',
        ]);

        $this->delete('/api/admin/blog/'.$post->id);

        $this->seeStatusCode(200);
        $this->assertNull(BlogPost::find($post->id));
    }

    public function test_admin_routes_require_authentication()
    {
        $this->post('/api/admin/blog', [
            'title' => 'Sin auth',
            'content' => 'x',
            'status' => 'draft',
        ]);

        $this->seeStatusCode(401);
    }

    protected function seedBlogFixture()
    {
        $category = BlogCategory::create([
            'name' => 'Desarrollo de Software',
            'slug' => 'desarrollo-software',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        BlogPost::create([
            'title' => 'Post publicado 1',
            'slug' => 'post-publicado-1',
            'content' => 'Contenido del post 1',
            'author_id' => $this->admin->id,
            'category_id' => $category->id,
            'status' => 'published',
            'published_at' => now()->subDay(),
        ]);

        BlogPost::create([
            'title' => 'Post publicado 2',
            'slug' => 'post-publicado-2',
            'content' => 'Contenido del post 2',
            'author_id' => $this->admin->id,
            'status' => 'published',
            'published_at' => now()->subHours(2),
        ]);

        BlogPost::create([
            'title' => 'Borrador no publicado',
            'slug' => 'borrador-no-publicado',
            'content' => 'Contenido del borrador',
            'author_id' => $this->admin->id,
            'status' => 'draft',
        ]);
    }
}