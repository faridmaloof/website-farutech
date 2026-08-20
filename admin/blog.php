<?php
/**
 * Admin Panel - Gestión del Blog
 * Listado y gestión de posts del blog con filtros
 */

require_once __DIR__ . '/config.php';
require_auth();

$pageTitle = 'Blog';
include __DIR__ . '/includes/header.php';

$pdo = db();
$message = '';
$messageType = '';

// Handle delete action
if (isset($_GET['delete']) && csrf_verify($_GET['csrf'] ?? '')) {
    $id = (int)$_GET['delete'];
    $stmt = $pdo->prepare("DELETE FROM blog_posts WHERE id=?");
    $stmt->execute([$id]);
    $message = 'Post eliminado exitosamente';
    $messageType = 'success';
    // Redirect to avoid re-submission
    header('Location: /admin/blog.php?deleted=1');
    exit;
}

// Get filter parameters
$filterStatus = isset($_GET['status']) ? $_GET['status'] : 'all';
$filterCategory = isset($_GET['category']) ? (int)$_GET['category'] : 0;

// Build query
$where = [];
$params = [];

if ($filterStatus !== 'all') {
    $where[] = "p.status = ?";
    $params[] = $filterStatus;
}

if ($filterCategory > 0) {
    $where[] = "p.category_id = ?";
    $params[] = $filterCategory;
}

$whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

// Get all posts with author and category names
$query = "SELECT p.*, c.name as category_name, u.name as author_name 
          FROM blog_posts p 
          LEFT JOIN blog_categories c ON p.category_id = c.id 
          LEFT JOIN admin_users u ON p.admin_user_id = u.id 
          $whereClause
          ORDER BY p.created_at DESC";

$stmt = $pdo->prepare($query);
$stmt->execute($params);
$posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Get all categories for filter and dropdown
$categories = $pdo->query("SELECT id, name FROM blog_categories ORDER BY name")->fetchAll(PDO::FETCH_ASSOC);
?>

<?php if ($message || isset($_GET['deleted'])): ?>
<div class="alert alert-success">
    <?= $message ?: 'Post eliminado exitosamente' ?>
</div>
<?php endif; ?>

<div class="card">
    <div class="card-header">
        <h2>Entradas del Blog</h2>
        <a href="/admin/blog-edit.php" class="btn btn-primary">
            <i class="ti ti-plus"></i> Nuevo Post
        </a>
    </div>

    <!-- Filters -->
    <div class="filters" style="margin-bottom: 1rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <form method="GET" style="display: flex; gap: 0.5rem; align-items: center;">
            <select name="status" class="form-control" onchange="this.form.submit()">
                <option value="all" <?= $filterStatus === 'all' ? 'selected' : '' ?>>Todos los estados</option>
                <option value="published" <?= $filterStatus === 'published' ? 'selected' : '' ?>>Publicados</option>
                <option value="draft" <?= $filterStatus === 'draft' ? 'selected' : '' ?>>Borradores</option>
            </select>
            <select name="category" class="form-control" onchange="this.form.submit()">
                <option value="0">Todas las categorías</option>
                <?php foreach ($categories as $cat): ?>
                    <option value="<?= $cat['id'] ?>" <?= $filterCategory === $cat['id'] ? 'selected' : '' ?>>
                        <?= e($cat['name']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
            <a href="blog.php" class="btn btn-sm btn-secondary">Limpiar</a>
        </form>
    </div>

    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Categoría</th>
                    <th>Autor</th>
                    <th>Estado</th>
                    <th>Publicado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($posts)): ?>
                <tr>
                    <td colspan="7" style="text-align: center; color: #64748b; padding: 2rem;">
                        No hay entradas de blog registradas
                    </td>
                </tr>
                <?php else: ?>
                    <?php foreach ($posts as $post): ?>
                    <tr>
                        <td><?= e($post['id']) ?></td>
                        <td>
                            <strong><?= e($post['title']) ?></strong>
                            <?php if ($post['excerpt']): ?>
                            <br><small style="color: #64748b"><?= e(substr($post['excerpt'], 0, 80)) ?><?= strlen($post['excerpt']) > 80 ? '...' : '' ?></small>
                            <?php endif; ?>
                        </td>
                        <td><?= $post['category_name'] ? e($post['category_name']) : '<em style="color: #94a3b8">Sin categoría</em>' ?></td>
                        <td><?= $post['author_name'] ? e($post['author_name']) : '<em style="color: #94a3b8">Sin autor</em>' ?></td>
                        <td>
                            <?php if ($post['status'] === 'published'): ?>
                                <span class="badge published">Publicado</span>
                            <?php else: ?>
                                <span class="badge draft">Borrador</span>
                            <?php endif; ?>
                        </td>
                        <td><?= $post['published_at'] ? e($post['published_at']) : '—' ?></td>
                        <td>
                            <a href="/admin/blog-edit.php?id=<?= $post['id'] ?>" class="btn btn-sm btn-icon" title="Editar">
                                <i class="ti ti-edit"></i>
                            </a>
                            <a href="?delete=<?= $post['id'] ?>&csrf=<?= e(csrf_token()) ?>" 
                               class="btn btn-sm btn-icon btn-danger" 
                               onclick="return confirm('¿Eliminar este post? Esta acción no se puede deshacer.')"
                               title="Eliminar">
                                <i class="ti ti-trash"></i>
                            </a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <div style="margin-top: 1rem; color: #64748b; font-size: 0.875rem;">
        Total: <strong><?= count($posts) ?></strong> entradas
    </div>
</div>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.card-header h2 {
    margin: 0;
}

.form-control {
    width: auto;
    min-width: 150px;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
}

.form-control:focus {
    outline: none;
    border-color: #3FC1FF;
    box-shadow: 0 0 0 3px rgba(63, 193, 255, 0.1);
}

.btn-sm {
    padding: 4px 8px;
    font-size: 0.875rem;
}

.btn-icon {
    padding: 4px 8px;
}

.btn-danger {
    background: #dc2626;
    color: white;
}

.btn-danger:hover {
    background: #b91c1c;
}

.badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
}

.badge.published {
    background: #d1fae5;
    color: #065f46;
}

.badge.draft {
    background: #e2e8f0;
    color: #334155;
}

.alert {
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
}

.alert-success {
    background: #dcfce7;
    color: #16a34a;
    border: 1px solid #86efac;
}
</style>

<?php include __DIR__ . '/includes/footer.php'; ?>
